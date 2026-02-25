const items = [
  '✦ Newcastle-based AI trainer',
  '✦ CPD Accreditation in progress',
  '✦ Community partnerships across the North East',
  '✦ 100+ people trained',
  '✦ BlackTech North East training partner',
  '✦ 20+ Jobs / Career Changes Supported',
  '✦ 5★ Average Rating',
  '✦ Working with local employment partners',
];

// Double for seamless loop
const TRACK = [...items, ...items];

export function SocialProofTicker() {
  return (
    <div
      aria-label="Social proof highlights"
      style={{
        position: 'relative',
        zIndex: 10,
        overflow: 'hidden',
        padding: '14px 0',
        borderTop:    '1px solid rgba(0,212,255,0.08)',
        borderBottom: '1px solid rgba(0,212,255,0.08)',
        background: 'rgba(5,10,20,0.6)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Fade edges */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(90deg, #050D1A, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: 'linear-gradient(270deg, #050D1A, transparent)',
        pointerEvents: 'none',
      }} />

      {/* Scrolling track */}
      <div className="ticker-track">
        {TRACK.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  );
}
