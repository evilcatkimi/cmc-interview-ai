import { Check } from './Icons';

export default function CandidatePanel({ candidate, stages, currentStage, keywordBank, hits }) {
  return (
    <>
      <div className="card">
        <div className="cand">
          <div className="cand-av">{candidate.avatar}</div>
          <div>
            <div className="cand-n">{candidate.name}</div>
            <div className="cand-r">{candidate.role}</div>
          </div>
        </div>
        <div className="cand-meta">{candidate.seniority} · {candidate.location} · {candidate.applied}</div>
        <div className="chips">
          {candidate.cv.map((c) => <span className="chip" key={c}>{c}</span>)}
        </div>
      </div>

      <div className="card">
        <div className="card-head"><span className="card-title">Interview flow</span></div>
        <div className="stages">
          {stages.map((s) => {
            const state = s.id < currentStage ? 'done' : s.id === currentStage ? 'active' : '';
            return (
              <div className={`stage ${state}`} key={s.id}>
                <span className="stage-n">{state === 'done' ? <Check /> : s.id}</span>
                <span>{s.label}</span>
                <span className="stage-w">{s.weight}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Signal keywords</span>
          <span className="spacer" />
          <span className="note"><strong>{hits.size}</strong>/{keywordBank.length}</span>
        </div>
        <div className="kws">
          {keywordBank.map((k) => <span className={`kw ${hits.has(k) ? 'hit' : ''}`} key={k}>{k}</span>)}
        </div>
      </div>
    </>
  );
}
