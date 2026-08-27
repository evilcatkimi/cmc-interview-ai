import {
  RadialBarChart, RadialBar, PolarAngleAxis,
  RadarChart, Radar, PolarGrid, PolarRadiusAxis,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { Up } from './Icons';

const verdictOf = (s) => {
  if (s >= 80) return { label: 'Strong hire', bg: '#e8f7f4', fg: '#0b7c70', note: 'Above the bar for Senior. Recommend advancing to the final panel.' };
  if (s >= 66) return { label: 'Hire', bg: '#eaf2fe', fg: '#0f47b0', note: 'Meets level expectations — confirm system design depth before closing.' };
  if (s >= 52) return { label: 'Leaning hire', bg: '#fdf5e7', fg: '#a5741a', note: 'Promising, but evidence is still thin in one or two competencies.' };
  return { label: 'Assessing', bg: '#f1f4f9', fg: '#5b6b85', note: 'Not enough signal yet — keep the conversation going.' };
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="tip">
      <div style={{ opacity: .6 }}>{label}</div>
      {payload.map((p) => (
        <div className="tip-r" key={p.dataKey}>
          <span className="sw" style={{ background: p.color || p.stroke, height: 6, width: 6, borderRadius: 99 }} />
          <span className="tip-k">{p.name}</span>
          <span className="tip-v">{Math.round(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

export default function ScorePanel({ overall, scores, competencies, history, delta, started }) {
  const v = verdictOf(overall);
  const radarData = competencies.map((c) => ({
    subject: c.short, value: Math.round(scores[c.key]), bar: 76,
  }));

  return (
    <>
      <div className="card">
        <div className="card-head">
          <span className="card-title">Live candidate score</span>
          <span className="spacer" />
          <span className="note">{started ? 'weighted · 0–100' : 'CV screening baseline'}</span>
        </div>

        <div className="score-hero">
          <div className="gauge">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                data={[{ value: overall }]} innerRadius="80%" outerRadius="100%"
                barSize={8} startAngle={90} endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: '#eaeff7' }} dataKey="value" cornerRadius={8}
                  fill="#1257cf" isAnimationActive={false} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="gauge-c">
              <div>
                <div className="gauge-v">{Math.round(overall)}</div>
                <div className="gauge-k">OVERALL</div>
              </div>
            </div>
          </div>

          <div className="verdict">
            <span className="vbadge" style={{ background: v.bg, color: v.fg }}>{v.label}</span>
            <div className="vnote">{v.note}</div>
            {delta > 0.5 && <div className="vdelta"><Up /> +{delta.toFixed(1)} on this answer</div>}
          </div>
        </div>

        <div className="bars">
          {competencies.map((c) => (
            <div key={c.key}>
              <div className="bar-k">
                <span className="bar-name">{c.label}</span>
                <span className="bar-v">{Math.round(scores[c.key])}</span>
              </div>
              <div className="bar-t">
                <div className="bar-f" style={{ width: `${scores[c.key]}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Score trajectory</span>
          <span className="spacer" />
          <span className="note">{history.length ? <>live sampling · <strong>{Math.round(overall)}</strong> now</> : 'awaiting first answer'}</span>
        </div>
        {history.length === 0 ? (
          <div className="chart-empty">The trajectory is plotted while the candidate speaks.</div>
        ) : (
        <div className="chart" style={{ height: 128 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history} margin={{ top: 6, right: 14, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1257cf" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#1257cf" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#eef2f8" vertical={false} />
              <XAxis dataKey="t" interval={0} tickLine={false} axisLine={false} tickMargin={6} />
              <YAxis domain={[30, 100]} ticks={[30, 65, 100]} width={34} tickLine={false} axisLine={false} />
              <Tooltip content={<Tip />} cursor={{ stroke: '#c9d6ea' }} />
              <Area type="monotone" dataKey="overall" name="Overall" stroke="#1257cf" strokeWidth={2} fill="url(#g)" dot={false}
                activeDot={{ r: 3.5, strokeWidth: 0 }} isAnimationActive={false} />
              <Area type="monotone" dataKey="english" name="English" stroke="#0f9d8f" strokeWidth={1.8} fill="none" dot={false} isAnimationActive={false} />
              <Area type="monotone" dataKey="technical" name="Technical" stroke="#6d5ce0" strokeWidth={1.8} fill="none" dot={false} isAnimationActive={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        )}
        {history.length > 0 && (
        <div className="legend">
          <span className="legend-i"><span className="sw" style={{ background: '#1257cf' }} />Overall</span>
          <span className="legend-i"><span className="sw" style={{ background: '#0f9d8f' }} />English</span>
          <span className="legend-i"><span className="sw" style={{ background: '#6d5ce0' }} />Technical</span>
        </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">
          <span className="card-title">Competency radar</span>
          <span className="spacer" />
          <span className="note">grey = role benchmark</span>
        </div>
        <div className="chart" style={{ height: 212 }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} outerRadius="70%">
              <PolarGrid stroke="#e8edf5" />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="Role bar" dataKey="bar" stroke="#a9b7cb" strokeWidth={1.2} strokeDasharray="3 3" fill="#dfe6f0" fillOpacity={0.55} isAnimationActive={false} />
              <Radar name="Candidate" dataKey="value" stroke="#1257cf" fill="#2a76e8" fillOpacity={0.28} strokeWidth={1.8} isAnimationActive={false} />
              <Tooltip content={<Tip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
