import { useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function StoryMode({
  lang,
  chapterIdx,
  onChangeChapter,
  onSwitchToSite,
}) {
  const storyCopy = PORTFOLIO_DATA[lang].story;
  const chapters = PORTFOLIO_DATA.en.story.chapters;
  const active = chapters[chapterIdx] || chapters[0];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        onChangeChapter(Math.min(chapters.length - 1, chapterIdx + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        onChangeChapter(Math.max(0, chapterIdx - 1));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [chapterIdx, chapters.length, onChangeChapter]);

  return (
    <div className="story-mode">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pointerEvents: 'auto' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-light)' }}>
          CHAPTER {active.index} / 09
        </span>
        <button type="button" className="menu-btn fill" onClick={onSwitchToSite}>
          <span>{storyCopy.skipSite} →</span>
        </button>
      </div>

      <div className="story-content">
        <p className="section-label" style={{ color: 'var(--accent-light)', marginBottom: '1rem' }}>
          {active.eyebrow}
        </p>
        <h1
          style={{
            fontSize: 'clamp(2.3rem, 5vw, 4.3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            marginBottom: '1.35rem',
          }}
        >
          {active.title}
        </h1>
        <p style={{ fontSize: 'var(--step-1)', color: 'var(--fg-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
          {active.body}
        </p>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            type="button"
            className="menu-btn"
            disabled={chapterIdx === 0}
            onClick={() => onChangeChapter(Math.max(0, chapterIdx - 1))}
            style={{ opacity: chapterIdx === 0 ? 0.35 : 1 }}
          >
            ← Prev
          </button>

          {active.isFinal ? (
            <button type="button" className="btn-primary" onClick={onSwitchToSite}>
              <span>Enter full portfolio ↗</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => onChangeChapter(Math.min(chapters.length - 1, chapterIdx + 1))}
            >
              <span>Next chapter ↓</span>
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          right: '1.75rem',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.55rem',
          pointerEvents: 'auto',
          zIndex: 20,
        }}
        aria-label="Chapter rail"
      >
        {chapters.map((c, idx) => (
          <button
            key={c.index}
            type="button"
            onClick={() => onChangeChapter(idx)}
            title={`Chapter ${c.index}`}
            style={{
              width: idx === chapterIdx ? '24px' : '12px',
              height: '3px',
              borderRadius: '2px',
              background: idx === chapterIdx ? '#5b5fe0' : 'rgba(238,236,232,0.28)',
              transition: 'width 0.25s ease, background-color 0.25s ease',
              marginLeft: 'auto',
            }}
          />
        ))}
      </div>

      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--fg-faint)' }}>
        {storyCopy.dragHint}
      </div>
    </div>
  );
}
