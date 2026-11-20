import { AMBIENT_TRACKS } from '../utils/soundEngine';

export default function FloatingDock({
  mode,
  onModeChange,
  lang,
  onLangChange,
  showCode,
  onToggleCode,
  soundOn,
  soundTrack,
  onToggleSound,
  onNextTrack,
}) {
  const currentTrack = AMBIENT_TRACKS.find((t) => t.id === soundTrack) || AMBIENT_TRACKS[0];

  return (
    <div className="floating-dock" role="toolbar" aria-label="Experience controls">
      <button
        type="button"
        className={`dock-btn ${showCode ? 'active' : ''}`}
        onClick={onToggleCode}
        title="Inspect live architecture & telemetry"
      >
        <span style={{ fontFamily: 'var(--font-mono)' }}>&lt;/&gt;</span>
        <span>Code</span>
      </button>

      <div className="dock-divider" />

      <div className="dock-seg" role="group" aria-label="Experience Mode">
        <button
          type="button"
          className={mode === 'site' ? 'active' : ''}
          onClick={() => onModeChange('site')}
        >
          Site
        </button>
        <button
          type="button"
          className={mode === 'story' ? 'active' : ''}
          onClick={() => onModeChange('story')}
        >
          Story
        </button>
      </div>

      <div className="dock-seg" role="group" aria-label="Language">
        <button
          type="button"
          className={lang === 'en' ? 'active' : ''}
          onClick={() => onLangChange('en')}
        >
          EN
        </button>
        <button
          type="button"
          className={lang === 'bn' ? 'active' : ''}
          onClick={() => onLangChange('bn')}
        >
          BN
        </button>
      </div>

      <div className="dock-divider" />

      <button
        type="button"
        className={`dock-btn ${soundOn ? 'active' : ''}`}
        onClick={() => onToggleSound()}
        title={`Play/pause ambient soundtrack (${currentTrack.label} — ${currentTrack.mood})`}
      >
        <span>{soundOn ? '❚❚' : '▶'}</span>
        <span style={{ maxWidth: '108px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {currentTrack.label}
        </span>
      </button>

      <button
        type="button"
        className="dock-btn"
        onClick={onNextTrack}
        title="Switch ambient track"
        aria-label="Switch ambient track"
        style={{ paddingInline: '0.5rem' }}
      >
        ↻
      </button>
    </div>
  );
}
