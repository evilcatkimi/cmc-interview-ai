const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Mic = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}>
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10a7 7 0 0 0 14 0M12 17v5" />
  </svg>
);
export const Sparkle = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}>
    <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z" />
  </svg>
);
export const Chart = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 20h18M7 20v-7M12 20V6M17 20v-10" /></svg>
);
export const Check = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M4 12.5l5 5L20 6.5" /></svg>
);
export const Play = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M7 4.5v15l13-7.5z" /></svg>
);
export const Next = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M5 12h13M13 6l6 6-6 6" /></svg>
);
export const Reset = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>
);
export const User = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
);
export const Doc = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h4M9 13h6M9 17h4" /></svg>
);
export const Bulb = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 1 4 10.5V16H8v-2.5A6 6 0 0 1 12 3z" /></svg>
);
export const Radar = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4.5" /><path d="M12 12l6-4" /></svg>
);
export const Trend = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 17l5.5-6 4 3.5L21 6" /><path d="M15 6h6v6" /></svg>
);
export const Target = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /></svg>
);
export const Tag = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M3 12V4h8l9 9-8 8-9-9z" /><circle cx="7.5" cy="7.5" r="1.3" /></svg>
);
export const Up = (p) => (
  <svg viewBox="0 0 24 24" {...s} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
);
export const Stop = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}><rect x="6" y="6" width="12" height="12" rx="2.5" /></svg>
);
