import { useEffect, useState } from 'react';
import { CODE_SNIPPETS } from '../data/portfolioData';

export default function CodeOverlay({ open, activeSection, theme, dhakaTime, onClose }) {
  const [fps, setFps] = useState(60);
  const [domCount, setDomCount] = useState(0);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!open) return;
    setDomCount(document.querySelectorAll('*').length);
    setViewport({ w: window.innerWidth, h: window.innerHeight });

    let frames = 0;
    let last = performance.now();
    let rafId = 0;

    const loop = (now) => {
      frames += 1;
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [open, activeSection]);

  if (!open) return null;

  const snippet = CODE_SNIPPETS[activeSection] || CODE_SNIPPETS.hero;

  return (
    <>
      <div className="code-overlay-grid" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="code-overlay-col" />
        ))}
      </div>

      <aside className="code-telemetry-card" aria-label="Live Developer Inspector">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <span style={{ color: '#a9abff', fontWeight: 700 }}>&lt;/&gt; LIVE ARCHITECTURE TELEMETRY</span>
          <button
            onClick={onClose}
            style={{ color: '#eeece8', padding: '0.2rem 0.5rem', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px' }}
          >
            ESC
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.9rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>FPS</div>
            <div style={{ color: '#3ddc84', fontWeight: 700 }}>{fps}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>PARTICLES</div>
            <div style={{ fontWeight: 700 }}>1,150</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>DOM NODES</div>
            <div style={{ fontWeight: 700 }}>{domCount}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>THEME</div>
            <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{theme}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>VIEWPORT</div>
            <div style={{ fontWeight: 700 }}>{viewport.w}×{viewport.h}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.45rem', borderRadius: '6px' }}>
            <div style={{ opacity: 0.6, fontSize: '0.65rem' }}>DHAKA</div>
            <div style={{ fontWeight: 700 }}>{dhakaTime}</div>
          </div>
        </div>

        <div style={{ opacity: 0.65, marginBottom: '0.35rem' }}>
          Active module: <strong style={{ color: '#a9abff' }}>{snippet.file}</strong>
        </div>
        <pre
          style={{
            background: '#07070b',
            padding: '0.75rem',
            borderRadius: '6px',
            overflowX: 'auto',
            lineHeight: 1.45,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <code>{snippet.lines}</code>
        </pre>
      </aside>
    </>
  );
}
