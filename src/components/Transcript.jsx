import { useEffect, useRef } from 'react';
import { Mic } from './Icons';

export default function Transcript({ messages, speaking, candidateName, initials }) {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const stick = () => { el.scrollTop = el.scrollHeight; };
    stick();
    const ro = new ResizeObserver(stick);
    ro.observe(el);
    Array.from(el.children).forEach((c) => ro.observe(c));
    return () => ro.disconnect();
  });

  return (
    <div className="card transcript-card">
      <div className="card-head">
        <span className="card-title">Live transcript</span>
        <span className="spacer" />
        <span className="note">{messages.length} turns · auto speaker diarisation</span>
      </div>

      {messages.length === 0 ? (
        <div className="empty">
          <div className="empty-inner">
            <div className="empty-icon"><Mic /></div>
            <div className="empty-t">Ready when you are</div>
            <div className="empty-p">
              Start the session and the copilot transcribes both speakers, suggests the
              next question, and scores the candidate live against the CMC competency framework.
            </div>
          </div>
        </div>
      ) : (
        <div className="transcript" ref={scrollRef}>
          <div className="transcript-pad" />
          {messages.map((m, i) => (
            <div className={`msg ${m.role}`} key={i}>
              <div className="msg-av">{m.role === 'candidate' ? initials : 'IV'}</div>
              <div style={{ minWidth: 0 }}>
                <div className="msg-meta">
                  <span className="msg-name">{m.role === 'candidate' ? candidateName : 'Interviewer'}</span>
                  <span className="mono">{m.time}</span>
                </div>
                <div className="bubble">{m.text}{m.streaming && <span className="caret" />}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mic-bar">
        <div className={`wave ${speaking ? '' : 'idle'}`}>
          {Array.from({ length: 9 }).map((_, i) => (
            <i key={i} style={{ animationDelay: `${i * 0.08}s` }} />
          ))}
        </div>
        <span>{speaking ? 'Listening — speech-to-text streaming' : 'Microphone idle'}</span>
        <span className="spacer" />
        <span className="mono" style={{ color: 'var(--ink-4)' }}>en-US · 48 kHz</span>
      </div>
    </div>
  );
}
