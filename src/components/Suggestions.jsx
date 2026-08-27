import { Bulb } from './Icons';

export default function Suggestions({ loading, insight, next, followUps, onPick, waiting }) {
  const empty = !loading && !next && !followUps.length && !insight;

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-title">Copilot suggestions</span>
        <span className="spacer" />
        <span className="note">{loading ? 'Analysing response…' : 'Click a follow-up to ask it'}</span>
      </div>

      <div className="sugg">
        {loading && (
          <>
            <div className="skel" style={{ width: '34%' }} />
            <div className="skel" style={{ width: '88%' }} />
            <div className="skel" style={{ width: '66%' }} />
            <div className="skel" style={{ width: '48%' }} />
          </>
        )}

        {!loading && !waiting && insight && (
          <div className="read"><Bulb /><span><b>AI read:</b> {insight}</span></div>
        )}

        {!loading && waiting && (
          <div className="lbl" style={{ margin: '2px 0 0' }}>Waiting for the candidate's answer…</div>
        )}

        {!loading && next && (
          <div className="nextq">
            <div className="lbl">Recommended next question</div>
            {next}
          </div>
        )}

        {!loading && followUps.length > 0 && (
          <div>
            <div className="lbl">Follow-ups worth asking</div>
            <div className="fus">
              {followUps.map((f, i) => (
                <button className="fu" key={f} style={{ animationDelay: `${i * 60}ms` }} onClick={() => onPick(f)}>
                  <span className="fu-n">{i + 1}.</span><span>{f}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {empty && (
          <div className="empty-p" style={{ padding: '2px 0 4px' }}>
            Suggestions appear as soon as the candidate starts answering.
          </div>
        )}
      </div>
    </div>
  );
}
