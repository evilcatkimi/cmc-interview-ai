import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Header from './components/Header';
import CandidatePanel from './components/CandidatePanel';
import Transcript from './components/Transcript';
import Suggestions from './components/Suggestions';
import ScorePanel from './components/ScorePanel';
import { Play, Next, Reset, Mic, Stop } from './components/Icons';
import {
  candidate, stages, script, competencies, baseScores, keywordBank,
} from './data/interviewData';

const GROWTH = 1.3; // scripted answers land the demo candidate around 85/100
const WEIGHTS = { english: 0.18, technical: 0.26, communication: 0.18, structure: 0.16, confidence: 0.10, culture: 0.12 };
const overallOf = (s) => Object.keys(WEIGHTS).reduce((a, k) => a + s[k] * WEIGHTS[k], 0);
const clock = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

// PHASES: idle → asking → awaiting → answering → analysing → ready(next question available) → done
export default function App() {
  const [messages, setMessages] = useState([]);
  const [phase, setPhase] = useState('idle');
  const [turn, setTurn] = useState(0);
  const [scores, setScores] = useState(baseScores);
  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState([]);
  const [suggestion, setSuggestion] = useState({ next: null, followUps: [] });
  const [suggLoading, setSuggLoading] = useState(false);
  const [hits, setHits] = useState(new Set());
  const [elapsed, setElapsed] = useState(0);
  const [gain, setGain] = useState(0);

  const timers = useRef([]);
  const track = (id) => { timers.current.push(id); return id; };
  const clearAll = () => { timers.current.forEach(clearTimeout); timers.current.forEach(clearInterval); timers.current = []; };
  useEffect(() => clearAll, []);

  useEffect(() => {
    if (phase === 'idle' || phase === 'done') return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const overall = useMemo(() => overallOf(scores), [scores]);
  const currentStage = phase === 'done' ? 99 : script[Math.min(turn, script.length - 1)].stage;

  /** stream text into the transcript, word by word */
  const stream = useCallback((role, text, { speed = 42, onTick, onDone } = {}) => {
    const words = text.split(' ');
    setMessages((m) => [...m, { role, text: '', time: clock(), streaming: true }]);
    let i = 0;
    const id = track(setInterval(() => {
      i += 1;
      const partial = words.slice(0, i).join(' ');
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { ...copy[copy.length - 1], text: partial, streaming: i < words.length };
        return copy;
      });
      onTick?.(i / words.length, partial);
      if (i >= words.length) { clearInterval(id); onDone?.(); }
    }, speed + (role === 'candidate' ? 6 : 0)));
  }, []);

  /** interviewer asks the question of `idx` */
  const ask = useCallback((idx, overrideText) => {
    const t = script[idx];
    setPhase('asking');
    setSuggestion({ next: null, followUps: [] });
    stream('interviewer', overrideText || t.question, {
      speed: 34,
      onDone: () => {
        setPhase('awaiting');
        track(setTimeout(() => setPhase('awaiting'), 200));
      },
    });
  }, [stream]);

  /** candidate answers turn `idx`; scores rise while the words arrive */
  const answer = useCallback((idx) => {
    const t = script[idx];
    const start = { ...scores };
    let lastPoint = 0;
    setGain(0);
    setPhase('answering');

    stream('candidate', t.answer, {
      speed: 46,
      onTick: (p, partial) => {
        const eased = 1 - Math.pow(1 - p, 1.7);
        const nextScores = {};
        competencies.forEach(({ key }) => {
          const jitter = Math.sin(p * 9 + key.length) * 0.7;
          nextScores[key] = Math.min(97, start[key] + t.delta[key] * GROWTH * eased + jitter * eased);
        });
        setScores(nextScores);
        setGain(overallOf(nextScores) - overallOf(start));

        const lower = partial.toLowerCase();
        setHits((prev) => {
          const found = keywordBank.filter((k) => lower.includes(k.toLowerCase()));
          if (found.every((k) => prev.has(k))) return prev;
          return new Set([...prev, ...found]);
        });

        if (p - lastPoint > 0.16 || p === 1) {
          lastPoint = p;
          setHistory((h) => [...h, {
            t: p === 1 ? `Q${idx + 1}` : '',
            overall: overallOf(nextScores),
            english: nextScores.english,
            technical: nextScores.technical,
          }]);
        }
      },
      onDone: () => {
        setPhase('analysing');
        setSuggLoading(true);
        track(setTimeout(() => {
          setSuggLoading(false);
          setSuggestion({ next: t.next, followUps: t.followUps });
          setInsights((v) => [t.insight, ...v].slice(0, 4));
          setPhase(t.next ? 'ready' : 'done');
        }, 1250));
      },
    });
  }, [scores, stream]);

  const primary = () => {
    if (phase === 'idle') return ask(0);
    if (phase === 'awaiting') return answer(turn);
    if (phase === 'ready') { const n = turn + 1; setTurn(n); return ask(n); }
  };

  const askFollowUp = (text) => {
    if (phase !== 'ready' && phase !== 'done') return;
    stream('interviewer', text, { speed: 34 });
    setSuggestion((s) => ({ ...s, followUps: s.followUps.filter((f) => f !== text) }));
  };

  const reset = () => {
    clearAll();
    setMessages([]); setPhase('idle'); setTurn(0); setScores(baseScores);
    setHistory([]); setInsights([]); setSuggestion({ next: null, followUps: [] });
    setSuggLoading(false); setHits(new Set()); setElapsed(0); setGain(0);
  };

  const busy = phase === 'asking' || phase === 'answering' || phase === 'analysing';
  const label = {
    idle: 'Start Interview',
    asking: 'Asking question…',
    awaiting: 'Capture Candidate Answer',
    answering: 'Transcribing…',
    analysing: 'Analysing response…',
    ready: 'Ask Next Question',
    done: 'Interview complete · scorecard ready',
  }[phase];
  const Icon = phase === 'idle' ? Play : phase === 'awaiting' ? Mic : phase === 'done' ? Stop : Next;

  return (
    <div className="app">
      <Header
        candidate={candidate}
        elapsed={elapsed}
        live={phase !== 'idle' && phase !== 'done'}
        stageLabel={phase === 'done' ? 'Completed' : stages.find((s) => s.id === currentStage).label}
      />

      <div className="workspace">
        <div className="col col-left col-scroll">
          <CandidatePanel
            candidate={candidate}
            stages={stages}
            currentStage={currentStage}
            keywordBank={keywordBank}
            hits={hits}
          />
        </div>

        <div className="col">
          <Transcript
            messages={messages}
            speaking={phase === 'answering'}
            candidateName={candidate.name}
            initials={candidate.avatar}
          />

          <div className="card">
            <div className="controls">
              <button className="btn btn-primary" onClick={primary} disabled={busy || phase === 'done'}>
                <Icon /> {label}
              </button>
              <button className="btn btn-ghost" onClick={reset}>
                <Reset /> Reset session
              </button>
            </div>
          </div>

          <Suggestions
            loading={suggLoading}
            insight={insights[0]}
            waiting={phase === 'asking' || phase === 'awaiting' || phase === 'answering'}
            next={suggestion.next}
            followUps={suggestion.followUps}
            onPick={askFollowUp}
          />
        </div>

        <div className="col col-scroll">
          <ScorePanel
            overall={overall}
            scores={scores}
            competencies={competencies}
            history={history}
            delta={gain}
            started={messages.length > 0}
          />
        </div>
      </div>
    </div>
  );
}
