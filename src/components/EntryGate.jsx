import { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { AMBIENT_TRACKS } from '../utils/soundEngine';

export default function EntryGate({
  lang,
  onLangChange,
  onEnterMode,
  soundOn,
  soundTrack,
  onToggleSound,
}) {
  const [counter, setCounter] = useState(9);
  const [leaving, setLeaving] = useState(false);

  const copy = PORTFOLIO_DATA[lang].gate;

  useEffect(() => {
    if (counter <= 0) return;
    const id = setTimeout(() => setCounter((c) => Math.max(0, c - 1)), 55);
    return () => clearTimeout(id);
  }, [counter]);

  const handleSelect = (modeId) => {
    setLeaving(true);
    setTimeout(() => onEnterMode(modeId), 420);
  };

  return (
    <section className={`entry-gate ${leaving ? 'leaving' : ''}`} aria-label="Entry Gate">
      <div className="gate-top">
        <div className="gate-counter">
          {String(counter).padStart(3, '0')} {counter > 0 ? 'LOADING' : 'READY'}
        </div>

        <div className="dock-seg" role="group" aria-label="Language switch">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => onLangChange('en')}
            type="button"
          >
            EN
          </button>
          <button
            className={lang === 'bn' ? 'active' : ''}
            onClick={() => onLangChange('bn')}
            type="button"
          >
            BN
          </button>
        </div>
      </div>

      <div className="gate-center">
        <p className="gate-eyebrow">{copy.eyebrow}</p>
        <h1 className="gate-h1">{copy.heading}</h1>

        <div className="gate-cards">
          {copy.modes.map((m) => (
            <button
              key={m.id}
              type="button"
              className="gate-card"
              onClick={() => handleSelect(m.id)}
            >
              <div>
                <span className="gate-card-num">{m.index}</span>
                <h2 className="gate-card-title">{m.title}</h2>
                <p className="gate-card-desc">{m.subtitle}</p>
              </div>
              <div className="gate-card-foot">
                <span>{m.meta}</span>
                <span>Enter ↗</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="gate-bottom">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            className={`dock-btn ${soundOn ? 'active' : ''}`}
            onClick={() => onToggleSound()}
            style={{ border: '1px solid rgba(238,236,232,0.22)' }}
          >
            <span>{soundOn ? '❚❚ Mute' : '▶ Ambient'}</span>
          </button>
          <div className="dock-seg" style={{ flexWrap: 'wrap' }}>
            {AMBIENT_TRACKS.map((t) => (
              <button
                key={t.id}
                type="button"
                className={soundTrack === t.id ? 'active' : ''}
                onClick={() => onToggleSound(t.id)}
                title={t.mood}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
          <a className="t-link" href={`mailto:${PORTFOLIO_DATA.personal.email}`}>
            {PORTFOLIO_DATA.personal.email}
          </a>
          {PORTFOLIO_DATA.personal.socials.map((s) => (
            <a key={s.label} className="t-link" href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
