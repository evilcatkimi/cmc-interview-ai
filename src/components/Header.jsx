const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

export default function Header({ candidate, elapsed, live, stageLabel }) {
  return (
    <header className="header">
      <div className="brand">
        <img src={`${import.meta.env.BASE_URL}cmc-logo.jpeg`} alt="CMC Global" />
        <div>
          <div className="brand-title">Interview Copilot</div>
          <div className="brand-sub">CMC GLOBAL · TALENT INTELLIGENCE</div>
        </div>
      </div>

      <div className="hsep" />

      <div className="hmeta">
        <div className="hmeta-item">
          <div className="hmeta-k">Session</div>
          <div className="hmeta-v mono">CMC-2026-0841</div>
        </div>
        <div className="hmeta-item">
          <div className="hmeta-k">Current stage</div>
          <div className="hmeta-v">{stageLabel}</div>
        </div>
        <div className="hmeta-item">
          <div className="hmeta-k">Elapsed</div>
          <div className="hmeta-v mono">{fmt(elapsed)}</div>
        </div>
      </div>

      <div className="hright">
        <span className={`rec ${live ? 'on' : ''}`}>
          <span className="dot" /> {live ? 'RECORDING' : 'STANDBY'}
        </span>
        <div className="hcand">
          <div className="hcand-av">{candidate.avatar}</div>
          <div>
            <div className="hcand-n">{candidate.name}</div>
            <div className="hcand-r">{candidate.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
