import { useEffect, useRef, useState } from 'react';
import { PORTFOLIO_DATA } from './data/portfolioData';
import { soundEngine } from './utils/soundEngine';
import ParticleCanvas from './components/ParticleCanvas';
import InteractiveDotFigure from './components/InteractiveDotFigure';
import DotMatrixNumber from './components/DotMatrixNumber';
import DotStage from './components/DotStage';
import CustomCursor from './components/CustomCursor';
import CodeOverlay from './components/CodeOverlay';
import EntryGate from './components/EntryGate';
import Navbar from './components/Navbar';
import MenuOverlay from './components/MenuOverlay';
import FloatingDock from './components/FloatingDock';
import StoryMode from './components/StoryMode';
import ChatWidget from './components/ChatWidget';

const SECTION_META = [
  { id: 'hero', label: '(00) Hero', theme: 'dark', shape: 'portrait' },
  { id: 'about', label: '(01) About me', theme: 'light', shape: 'globe' },
  { id: 'services', label: '(02) What I do', theme: 'light', shape: 'code' },
  { id: 'work', label: '(03) Selected work', theme: 'dark', shape: 'code' },
  { id: 'education', label: '(04) Education', theme: 'light', shape: 'orbit' },
  { id: 'experience', label: '(05) Experience', theme: 'dark', shape: 'globe' },
  { id: 'motto', label: 'My Motto', theme: 'dark', shape: 'shroud' },
  { id: 'testimonials', label: '(06) Voices & Honors', theme: 'light', shape: 'orbit' },
  { id: 'offClock', label: '(07) Off the clock · Music', theme: 'light', shape: 'wave' },
  { id: 'gaming', label: '(08) Gaming & Arena', theme: 'dark', shape: 'shroud' },
  { id: 'chat', label: 'Ask me anything', theme: 'light', shape: 'portrait' },
  { id: 'contact', label: '(09) Contact', theme: 'dark', shape: 'globe' },
];

function ProxHeading({ text }) {
  const [hoveredIdx, setHoveredIdx] = useState(-1);
  return (
    <h2
      style={{
        fontSize: 'var(--step-6)',
        fontWeight: 700,
        letterSpacing: '-0.035em',
        lineHeight: 1.02,
        marginBottom: '2.75rem',
      }}
      onMouseLeave={() => setHoveredIdx(-1)}
    >
      {text.split('').map((ch, idx) => {
        const dist = hoveredIdx === -1 ? 99 : Math.abs(idx - hoveredIdx);
        const offset = dist <= 2 ? -(3 - dist) * 5 : 0;
        const scale = dist <= 2 ? 1 + (3 - dist) * 0.045 : 1;
        return (
          <span
            key={idx}
            className="prox-char"
            onMouseEnter={() => setHoveredIdx(idx)}
            style={{
              transform: `translateY(${offset}px) scale(${scale})`,
              minWidth: ch === ' ' ? '0.28em' : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </h2>
  );
}

export default function App() {
  const initialParam =
    typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('v') : null;

  const [entered, setEntered] = useState(initialParam === 'site' || initialParam === 'story');
  const [mode, setMode] = useState(initialParam === 'story' ? 'story' : 'site');
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [soundTrack, setSoundTrack] = useState('mayabi');
  const [storyChapter, setStoryChapter] = useState(0);

  // Interactive section states
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [activeEduIdx, setActiveEduIdx] = useState(0);
  const [activeTestIdx, setActiveTestIdx] = useState(0);
  const [activeSpotifyIdx, setActiveSpotifyIdx] = useState(0);
  const [copiedId, setCopiedId] = useState(false);
  const [omenBurst, setOmenBurst] = useState(0);
  const [mottoBroken, setMottoBroken] = useState(false);
  const [nyTime, setNyTime] = useState('--:--');
  const [dhakaTime, setDhakaTime] = useState('--:--');

  const lensRef = useRef(null);

  // Live New York (Alpha FMC ET) & Dhaka (GMT+6) clocks
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        setNyTime(
          new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now)
        );
        setDhakaTime(
          new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Dhaka',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          }).format(now)
        );
      } catch {
        setNyTime('11:00');
        setDhakaTime('22:00');
      }
    };
    updateClock();
    const id = setInterval(updateClock, 15000);
    return () => clearInterval(id);
  }, []);

  // Sync HTML theme attribute
  useEffect(() => {
    const activeTheme = mode === 'story' ? 'dark' : theme;
    document.documentElement.setAttribute('data-theme', activeTheme);
  }, [theme, mode]);

  // Scroll listener & ESC handler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setShowCode(false);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  // Scroll-based theme & section observer
  useEffect(() => {
    if (!entered || mode !== 'site') return;
    const sections = document.querySelectorAll('[data-section]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sec = entry.target.getAttribute('data-section');
            const secTheme = entry.target.getAttribute('data-theme') || 'dark';
            setActiveSection(sec);
            setTheme(secTheme);
          }
        });
      },
      { rootMargin: '-38% 0px -38% 0px', threshold: 0.01 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [entered, mode]);

  const handleToggleSound = (requestedTrack) => {
    if (requestedTrack) {
      setSoundTrack(requestedTrack);
      const playing = soundEngine.toggle(requestedTrack);
      setSoundOn(playing);
    } else {
      const playing = soundEngine.toggle();
      setSoundOn(playing);
    }
  };

  const handleNextTrack = () => {
    const nextId = soundEngine.nextTrack();
    setSoundTrack(nextId);
    setSoundOn(true);
  };

  const handleEnterMode = (selectedMode) => {
    setMode(selectedMode);
    setEntered(true);
    soundEngine.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleModeSwitch = (nextMode) => {
    setMode(nextMode);
    soundEngine.click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyRiotId = () => {
    navigator.clipboard?.writeText('Sirius Black #Black');
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 1800);
  };

  // Resolve copy with clean fallback to English for detailed technical records
  const copy = PORTFOLIO_DATA[lang];
  const en = PORTFOLIO_DATA.en;
  const personal = PORTFOLIO_DATA.personal;

  const projects = copy.work.projects || en.work.projects;
  const activeProject = projects[activeProjectIdx] || projects[0];
  const services = copy.services.items;
  const activeService = services[activeServiceIdx] || services[0];
  const eduItems = copy.education.items || en.education.items;
  const roles = copy.experience.roles || en.experience.roles;
  const tools = copy.experience.tools || en.experience.tools;
  const testimonials = copy.testimonials.items || en.testimonials.items;
  const activeTest = testimonials[activeTestIdx] || testimonials[0];
  const awards = copy.testimonials.awards || en.testimonials.awards;
  const spotifyItems = copy.offClock.spotifyItems || en.offClock.spotifyItems;
  const activeSpotify = spotifyItems[activeSpotifyIdx] || spotifyItems[0];
  const gamingCopy = copy.gaming || en.gaming;
  const valorant = gamingCopy.valorant || en.gaming.valorant;
  const otherGames = gamingCopy.otherGames || en.gaming.otherGames;

  const currentMeta = SECTION_META.find((m) => m.id === activeSection) || SECTION_META[0];
  const storyChapters = en.story.chapters;
  const particleShape =
    mode === 'story' ? (storyChapters[storyChapter]?.shape || 'orbit') : currentMeta.shape;

  return (
    <>
      <CustomCursor />

      <ParticleCanvas
        shape={particleShape}
        theme={mode === 'story' ? 'dark' : theme}
        interactive={mode === 'story'}
        profileSrc={personal.profileCutout}
      />

      {!entered && (
        <EntryGate
          lang={lang}
          onLangChange={setLang}
          onEnterMode={handleEnterMode}
          soundOn={soundOn}
          soundTrack={soundTrack}
          onToggleSound={handleToggleSound}
        />
      )}

      {entered && (
        <div className="site-shell">
          {mode === 'site' && (
            <Navbar lang={lang} scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
          )}

          {mode === 'story' ? (
            <StoryMode
              lang={lang}
              chapterIdx={storyChapter}
              onChangeChapter={setStoryChapter}
              onSwitchToSite={() => handleModeSwitch('site')}
            />
          ) : (
            <main>
              {/* Persistent Edge Chrome */}
              <a href="#testimonials" className="left-tab">
                {copy.nav.nomineeBadge}
              </a>

              <div className="progress-rail" aria-label="Section progress">
                {SECTION_META.map((sec) => (
                  <span
                    key={sec.id}
                    className={`progress-dot ${activeSection === sec.id ? 'active' : ''}`}
                    title={sec.label}
                  />
                ))}
              </div>

              <div className="bottom-left-label">{currentMeta.label}</div>

              <button
                type="button"
                className={`fab-menu ${scrolled ? 'visible' : ''}`}
                onClick={() => setMenuOpen(true)}
                aria-label="Open full navigation menu"
              >
                =
              </button>

              {/* HERO (#top) — Exact Reference Proportions */}
              <section id="top" className="hero section" data-section="hero" data-theme="dark">
                <div className="container grid-12" style={{ alignItems: 'end' }}>
                  <div className="hero-clock-col">
                    <div className="hero-clock-row">
                      <div className="mini-globe" aria-hidden="true" />
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--fg)' }}>
                          {personal.workCity} {nyTime} ET
                        </div>
                        <div style={{ fontSize: '0.78rem' }}>
                          {personal.workHours} · {personal.homeCity} {dhakaTime}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-center-portrait" data-cursor="hide">
                    <div className="hero-dot-stage">
                      <InteractiveDotFigure
                        src={personal.profileCutout}
                        variant="editorial"
                        density={4}
                        height={600}
                        ariaLabel={`Interactive dot portrait of ${personal.fullName}`}
                      />
                    </div>
                  </div>

                  <div className="hero-right">
                    <div className="hero-arrow" aria-hidden="true">↘</div>
                    <h1 className="hero-h1">
                      {copy.hero.headlineLines[0]}
                      <br />
                      {copy.hero.headlineLines[1]}
                    </h1>
                    <p className="hero-sub">{copy.hero.subcopy}</p>

                    <div className="hero-actions">
                      <a href="#contact" className="btn-primary">
                        <span>{copy.hero.primaryCta}</span>
                      </a>
                      <a href="#work" className="t-link">
                        {copy.hero.secondaryCta} <span className="link-arrow">↘</span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* (01) ABOUT ME */}
              <section id="about" className="section" data-section="about" data-theme="light">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.about.index}</span>
                    <span className="section-label">{copy.about.label}</span>
                    <span className="sh-aside">{copy.about.aside}</span>
                  </div>

                  <div className="grid-12">
                    <p className="about-statement">
                      <span className="muted-text">{copy.about.statementLead}</span>
                      <span className="bold-text">{copy.about.statementBold}</span>
                      <span className="muted-text">{copy.about.statementTail}</span>
                    </p>

                    <div className="about-seal-col">
                      <div className="seal-spin" aria-hidden="true">
                        <svg viewBox="0 0 120 120">
                          <defs>
                            <path
                              id="sealPath"
                              d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                            />
                          </defs>
                          <text fontSize="8.5" fontWeight="700" letterSpacing="2.2">
                            <textPath href="#sealPath">{copy.about.sealText}</textPath>
                          </text>
                        </svg>
                        <span
                          style={{
                            position: 'absolute',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            color: 'var(--accent)',
                          }}
                        >
                          ★
                        </span>
                      </div>
                    </div>

                    <p className="about-bio-copy">{copy.about.bioFull}</p>
                  </div>

                  <div className="stats-grid">
                    {copy.about.stats.map((st) => (
                      <div key={st.label} className="stat-cell">
                        <div className="stat-value-row">
                          <DotMatrixNumber value={st.value} />
                          {st.unit && <span className="stat-unit">{st.unit}</span>}
                        </div>
                        <div className="stat-label">{st.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* (02) WHAT I DO & PROCESS */}
              <section id="services" className="section" data-section="services" data-theme="light">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.services.index}</span>
                    <span className="section-label">{copy.services.label}</span>
                    <span className="sh-aside">{copy.services.aside}</span>
                  </div>

                  <div className="ws-stage">
                    <div className="ws-copy">
                      <p className="ws-intro">{copy.services.intro}</p>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.85rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-text)', fontWeight: 700 }}>
                          {activeService.index}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--fg-muted)' }}>
                          Proficiency {activeService.proficiency}
                        </span>
                      </div>
                      <h3 className="ws-title">{activeService.title}</h3>
                      <p className="ws-desc">{activeService.description}</p>
                      <p className="ws-proof">{activeService.proof}</p>

                      <div className="ws-tags">
                        {activeService.tags.map((tag) => (
                          <span key={tag} className="pill-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ws-visual">
                      <DotStage shape={activeService.shape} />
                    </div>
                  </div>

                  <div className="ws-tabs" role="tablist" aria-label="Technical capabilities">
                    {services.map((srv, idx) => (
                      <button
                        key={srv.id}
                        type="button"
                        role="tab"
                        aria-selected={idx === activeServiceIdx}
                        className={`ws-tab ${idx === activeServiceIdx ? 'active' : ''}`}
                        onClick={() => setActiveServiceIdx(idx)}
                      >
                        <span className="ws-tab-idx">{srv.index}</span>
                        <span className="ws-tab-name">{srv.title}</span>
                      </button>
                    ))}
                  </div>

                  <div style={{ marginTop: '2rem', textAlign: 'right' }}>
                    <a href="#work" className="t-link">
                      {copy.services.skipLabel} <span className="link-arrow">↘</span>
                    </a>
                  </div>

                  {/* Process 01-06 */}
                  <div className="process-block">
                    <h3 className="process-heading">{copy.process.heading}</h3>
                    <div className="process-grid">
                      {copy.process.steps.map((step) => (
                        <div key={step.index} className="process-step">
                          <span>{step.index}</span>
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* (03) SELECTED WORK */}
              <section id="work" className="section" data-section="work" data-theme="dark">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.work.index}</span>
                    <span className="section-label">{copy.work.label}</span>
                    <span className="sh-aside">{copy.work.aside}</span>
                  </div>

                  <div className="work-stage">
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noreferrer"
                      className="work-preview"
                      data-cursor-label={copy.work.cursorLabel}
                    >
                      {activeProject.customVisual === 'enterprise-prosperity' ? (
                        <div className="enterprise-stage">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#a9abff' }}>
                              ALPHA FMC · NEW YORK · ENTERPRISE CLIENT
                            </span>
                            <span className="pill-tag" style={{ borderColor: '#5b5fe0', color: '#eeece8' }}>
                              Unqork + React
                            </span>
                          </div>
                          <div className="enterprise-grid-mock">
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>ENGINE</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>Pathway FIA</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Income Calculators</div>
                            </div>
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>ANALYTICS</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>Google Charts</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Live Annuity Curves</div>
                            </div>
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>DELIVERY</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>API &amp; PDF</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Automated Statements</div>
                            </div>
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', opacity: 0.75 }}>
                            PROSPERITY LIFE GROUP · PRODUCTION WORKFLOWS
                          </div>
                        </div>
                      ) : activeProject.customVisual === 'enterprise-farmfamily' ? (
                        <div className="enterprise-stage farm">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#3ddc84' }}>
                              ALPHA FMC · NEW YORK · CONTACT CENTER PORTAL
                            </span>
                            <span className="pill-tag" style={{ borderColor: '#3ddc84', color: '#eeece8' }}>
                              Unqork + React
                            </span>
                          </div>
                          <div className="enterprise-grid-mock">
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>FLOW 01</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>PLDC Auto</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Caller Verification</div>
                            </div>
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>FLOW 02</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>Auth Capture</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Step-3 Security</div>
                            </div>
                            <div className="enterprise-tile">
                              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', opacity: 0.65 }}>UI SYSTEM</div>
                              <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.3rem' }}>Linked Policies</div>
                              <div style={{ fontSize: '0.76rem', opacity: 0.72, marginTop: '0.2rem' }}>Header Meta Strip</div>
                            </div>
                          </div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', opacity: 0.75 }}>
                            FARM FAMILY INSURANCE · ENTERPRISE CCP
                          </div>
                        </div>
                      ) : activeProject.isCardGame ? (
                        <div className="card-game-stage">
                          <div className="playing-card-fan">
                            <div className="svg-card">
                              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>J♠</span>
                              <span style={{ alignSelf: 'center', fontSize: '2.2rem' }}>♠</span>
                              <span style={{ alignSelf: 'flex-end', fontWeight: 700, fontSize: '0.85rem' }}>3 PTS</span>
                            </div>
                            <div className="svg-card red">
                              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>9♥</span>
                              <span style={{ alignSelf: 'center', fontSize: '2.4rem' }}>♥</span>
                              <span style={{ alignSelf: 'flex-end', fontWeight: 700, fontSize: '0.85rem' }}>2 PTS</span>
                            </div>
                            <div className="svg-card">
                              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>A♣</span>
                              <span style={{ alignSelf: 'center', fontSize: '2.2rem' }}>♣</span>
                              <span style={{ alignSelf: 'flex-end', fontWeight: 700, fontSize: '0.85rem' }}>1 PT</span>
                            </div>
                          </div>
                          <div className="work-preview-overlay">
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#d4af37' }}>
                              BENGAL DYNASTY · 6 THEMES · 7TH CARD TRUMP
                            </span>
                            <span className="pill-tag" style={{ borderColor: '#d4af37', color: '#fdfaf2' }}>
                              React + GSAP
                            </span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <img src={activeProject.image} alt={activeProject.title} />
                          <div className="work-preview-overlay">
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#eeece8' }}>
                              {activeProject.url.replace('https://', '')}
                            </span>
                            <span
                              className="pill-tag"
                              style={{ background: 'rgba(10,10,10,0.65)', color: '#fff' }}
                            >
                              GitHub ↗
                            </span>
                          </div>
                        </>
                      )}
                    </a>

                    <div className="work-details">
                      <span className="work-counter">
                        {activeProject.index} / 0{projects.length} — {copy.work.eyebrow}
                      </span>
                      <h3 className="work-title">{activeProject.title}</h3>
                      <div className="work-meta">{activeProject.meta}</div>
                      <p className="work-summary">{activeProject.summary}</p>

                      <ul className="work-bullets">
                        {activeProject.achievements.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>

                      <div className="ws-tags">
                        {activeProject.metrics.map((m) => (
                          <span
                            key={m}
                            className="pill-tag"
                            style={{ borderColor: activeProject.accent, color: activeProject.accent }}
                          >
                            {m}
                          </span>
                        ))}
                      </div>

                      <div style={{ marginTop: '0.5rem' }}>
                        <a href={activeProject.url} target="_blank" rel="noreferrer" className="btn-primary">
                          <span>Inspect Repository ↗</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="work-selector-strip">
                    {projects.map((p, idx) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`work-slot-btn ${idx === activeProjectIdx ? 'active' : ''}`}
                        onClick={() => setActiveProjectIdx(idx)}
                      >
                        <span>{p.index}</span>
                        <strong>{p.title}</strong>
                      </button>
                    ))}
                  </div>

                  <div className="work-also">
                    <span>{copy.work.alsoLabel}</span>
                    {copy.work.alsoItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="t-link"
                        style={{ color: 'var(--fg)' }}
                      >
                        {item.name} <span className="link-arrow">↗</span>
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* (04) EDUCATIONAL JOURNEY — 3-PANEL ACCORDION */}
              <section id="education" className="section" data-section="education" data-theme="light">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.education.index}</span>
                    <span className="section-label">{copy.education.label}</span>
                    <span className="sh-aside">{copy.education.aside}</span>
                  </div>

                  <h2 className="acc-heading">{copy.education.heading}</h2>

                  <div className="acc-container">
                    {eduItems.map((edu, idx) => {
                      const isActive = idx === activeEduIdx;
                      return (
                        <div
                          key={edu.index}
                          className={`acc-panel ${isActive ? 'active' : ''}`}
                          onClick={() => setActiveEduIdx(idx)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && setActiveEduIdx(idx)}
                          aria-expanded={isActive}
                        >
                          {!isActive ? (
                            <>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', opacity: 0.7 }}>
                                {edu.index}
                              </span>
                              <div className="acc-collapsed-title">{edu.shortName}</div>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.65 }}>
                                {edu.period.split(' ')[0]}
                              </span>
                            </>
                          ) : (
                            <div className="acc-expanded-body">
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                                <div>
                                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', opacity: 0.85, marginBottom: '0.35rem' }}>
                                    {edu.period} · {edu.location}
                                  </div>
                                  <h3 style={{ fontSize: 'var(--step-4)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.08 }}>
                                    {edu.institution}
                                  </h3>
                                  <p style={{ fontSize: 'var(--step-1)', opacity: 0.92, marginTop: '0.25rem' }}>
                                    {edu.degree}
                                  </p>
                                </div>
                                <div className="acc-big-num">{edu.index}</div>
                              </div>

                              <div>
                                <p style={{ fontSize: '1.05rem', lineHeight: 1.55, marginBottom: '1.15rem', maxWidth: '52rem' }}>
                                  {edu.pitch}
                                </p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.25rem' }}>
                                  {edu.details.map((d, i) => (
                                    <li key={i} style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                                      • {d}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                                  {edu.tags.map((t) => (
                                    <span
                                      key={t}
                                      style={{
                                        fontSize: '0.76rem',
                                        padding: '0.32rem 0.8rem',
                                        borderRadius: '9999px',
                                        background: 'rgba(255,255,255,0.16)',
                                        fontWeight: 500,
                                      }}
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                                <span
                                  style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.78rem',
                                    padding: '0.38rem 0.85rem',
                                    borderRadius: '9999px',
                                    background: '#ffffff',
                                    color: '#1a1a1a',
                                    fontWeight: 700,
                                  }}
                                >
                                  {edu.badge}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* (05) EXPERIENCE & LEADERSHIP */}
              <section id="experience" className="section" data-section="experience" data-theme="dark">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.experience.index}</span>
                    <span className="section-label">{copy.experience.label}</span>
                    <span className="sh-aside">{copy.experience.aside}</span>
                  </div>

                  <div className="grid-12">
                    <div className="exp-left" style={{ paddingRight: '2rem' }}>
                      <p style={{ fontSize: 'var(--step-1)', color: 'var(--fg-muted)', lineHeight: 1.55, marginBottom: '1.75rem' }}>
                        {copy.experience.intro}
                      </p>
                      <a
                        href={personal.socials.find((s) => s.label === 'LinkedIn')?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="t-link"
                        style={{ color: 'var(--accent-light)' }}
                      >
                        {copy.experience.cta} <span className="link-arrow">↗</span>
                      </a>

                      <div style={{ marginTop: '3.5rem' }}>
                        <p className="section-label" style={{ marginBottom: '1rem' }}>
                          {copy.experience.toolsLabel}
                        </p>
                        <div className="tools-cloud">
                          {tools.map((t) => (
                            <span key={t} className="pill-tag fill">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="exp-right">
                      <p className="section-label" style={{ marginBottom: '1.25rem' }}>
                        {copy.experience.historyLabel}
                      </p>
                      {roles.map((r, idx) => (
                        <article key={idx} className="role-item">
                          <div>
                            <div className="role-period">{r.period}</div>
                            {r.isCurrent && <span className="role-now">Now</span>}
                          </div>
                          <div>
                            <h3 className="role-title">{r.title}</h3>
                            <div className="role-org">
                              {r.org} · <span style={{ color: 'var(--fg-muted)' }}>{r.meta}</span>
                            </div>
                            <ul className="role-bullets">
                              {r.bullets.map((b, bi) => (
                                <li key={bi}>{b}</li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* MY MOTTO + CURSOR LENS + BREAK IT */}
              <section
                id="motto"
                className={`motto-section section ${mottoBroken ? 'motto-broken' : ''}`}
                data-section="motto"
                data-theme="dark"
              >
                <div className="container">
                  <p className="section-label" style={{ marginBottom: '1.75rem' }}>
                    {copy.motto.eyebrow}
                  </p>

                  <div
                    ref={lensRef}
                    className="motto-lens-wrap"
                    onMouseMove={(e) => {
                      const rect = lensRef.current?.getBoundingClientRect();
                      if (!rect) return;
                      lensRef.current.style.setProperty('--lens-x', `${e.clientX - rect.left}px`);
                      lensRef.current.style.setProperty('--lens-y', `${e.clientY - rect.top}px`);
                      lensRef.current.style.setProperty('--lens-r', '145px');
                    }}
                    onMouseLeave={() => {
                      lensRef.current?.style.setProperty('--lens-r', '0px');
                    }}
                  >
                    <div className="motto-display">
                      <span className="motto-word">{copy.motto.topLine}</span>
                      <br />
                      <span className="motto-word" style={{ color: 'var(--accent)' }}>
                        {copy.motto.accentLine}
                      </span>
                    </div>

                    <div className="motto-display motto-secret" aria-hidden="true">
                      <span>{copy.motto.secretTop}</span>
                      <br />
                      <span style={{ color: '#3ddc84' }}>{copy.motto.secretAccent}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--fg-muted)', marginTop: '1.25rem', marginBottom: '2rem' }}>
                    {copy.motto.hoverHint}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="menu-btn fill"
                      onClick={() => setMottoBroken((b) => !b)}
                    >
                      <span>{mottoBroken ? copy.motto.restoreBtn : copy.motto.breakBtn}</span>
                    </button>
                    <button
                      type="button"
                      className="menu-btn fill"
                      onClick={() => setShowCode((c) => !c)}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)' }}>&lt;/&gt;</span>
                      <span>{copy.motto.codeBtn}</span>
                    </button>
                  </div>
                </div>
              </section>

              {/* (06) TESTIMONIALS & NATIONAL HONORS */}
              <section id="testimonials" className="section" data-section="testimonials" data-theme="light">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.testimonials.index}</span>
                    <span className="section-label">{copy.testimonials.label}</span>
                    <span className="sh-aside">{copy.testimonials.aside}</span>
                  </div>

                  <div className="grid-12" style={{ alignItems: 'center' }}>
                    <div className="test-avatars">
                      {testimonials.map((t, idx) => (
                        <button
                          key={t.id}
                          type="button"
                          className={`test-avatar-btn fill ${idx === activeTestIdx ? 'active' : ''}`}
                          onClick={() => setActiveTestIdx(idx)}
                        >
                          <span className="test-initials">{t.initials}</span>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{t.name}</div>
                            <div style={{ fontSize: '0.76rem', opacity: 0.78 }}>{t.role}</div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="test-quote-col">
                      <blockquote className="test-quote">
                        <span className="test-mark">“</span>
                        {activeTest.quote}
                        <span className="test-mark">”</span>
                      </blockquote>
                      <div style={{ fontWeight: 700, fontSize: '1.05rem' }}>{activeTest.name}</div>
                      <div style={{ color: 'var(--fg-muted)', fontSize: '0.9rem' }}>{activeTest.role}</div>
                    </div>

                    <div className="test-dots-col" aria-hidden="true">
                      “”
                    </div>
                  </div>

                  <div className="awards-strip">
                    {awards.map((a) => (
                      <div key={a.org} className="award-card">
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: 'var(--accent-text)', marginBottom: '0.35rem' }}>
                          {a.year}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.25rem' }}>{a.title}</div>
                        <div style={{ fontSize: '0.84rem', color: 'var(--fg-muted)', lineHeight: 1.45 }}>{a.org}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* (07) OFF THE CLOCK — MUSIC ONLY */}
              <section id="off-clock" className="section" data-section="offClock" data-theme="light">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.offClock.index}</span>
                    <span className="section-label">{copy.offClock.label}</span>
                    <span className="sh-aside">{copy.offClock.aside}</span>
                  </div>

                  <ProxHeading text={copy.offClock.heading} />

                  <div className="off-grid">
                    {/* Left: Live Spotify Player */}
                    <div className="off-spotify-col">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.85rem' }}>
                        <h3 style={{ fontSize: 'var(--step-2)', fontWeight: 700 }}>{copy.offClock.musicTitle}</h3>
                        <a
                          href={activeSpotify.url}
                          target="_blank"
                          rel="noreferrer"
                          className="t-link"
                          style={{ color: 'var(--accent-text)' }}
                        >
                          {copy.offClock.openSpotify} <span className="link-arrow">↗</span>
                        </a>
                      </div>

                      <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid var(--line-strong)', background: '#121212' }}>
                        <iframe
                          key={activeSpotify.embedUrl}
                          title={`Spotify player — ${activeSpotify.title}`}
                          src={activeSpotify.embedUrl}
                          width="100%"
                          height={activeSpotify.id === 'playlist' ? '352' : '152'}
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    {/* Right: Curated Track Rotation & Ambient Sync */}
                    <div className="off-gaming-col">
                      <p style={{ color: 'var(--fg-muted)', marginBottom: '1.35rem', fontSize: '0.96rem' }}>
                        {copy.offClock.musicSubtitle}
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                        {spotifyItems.map((sp, idx) => {
                          const isSelected = idx === activeSpotifyIdx;
                          const isAmbientPlaying = soundOn && soundTrack === sp.ambientId;
                          return (
                            <div
                              key={sp.id}
                              className={`spotify-tab ${isSelected ? 'active' : ''}`}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem 1.2rem',
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => setActiveSpotifyIdx(idx)}
                                style={{ textAlign: 'left', flex: 1 }}
                              >
                                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-muted)' }}>
                                  {sp.kind}
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '1.05rem', marginTop: '0.15rem' }}>{sp.title}</div>
                                <div style={{ fontSize: '0.82rem', color: 'var(--fg-muted)', marginTop: '0.15rem' }}>{sp.subtitle}</div>
                              </button>

                              <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                                <button
                                  type="button"
                                  className="pill-tag fill"
                                  onClick={() => {
                                    setActiveSpotifyIdx(idx);
                                    handleToggleSound(sp.ambientId);
                                  }}
                                  style={
                                    isAmbientPlaying
                                      ? { background: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
                                      : undefined
                                  }
                                >
                                  {isAmbientPlaying ? '❚❚ Playing' : '▶ Ambient'}
                                </button>
                                <a
                                  href={sp.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="pill-tag"
                                >
                                  Spotify ↗
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* (08) GAMING & ARENA — DEDICATED OMEN + VALORANT + FC 27 CHAPTER */}
              <section id="gaming" className="section" data-section="gaming" data-theme="dark">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{gamingCopy.index}</span>
                    <span className="section-label">{gamingCopy.label}</span>
                    <span className="sh-aside">{gamingCopy.aside}</span>
                  </div>

                  <div className="grid-12" style={{ alignItems: 'center', gap: '2rem' }}>
                    {/* Left: Huge Interactive Omen Dot Figure with Hover Photo Reveal */}
                    <div style={{ gridColumn: '1 / 7' }} className="exp-left" data-cursor="hide">
                      <InteractiveDotFigure
                        src="/images/omen-portrait.png"
                        variant="omen"
                        density={4}
                        burstSignal={omenBurst}
                        height={480}
                        ariaLabel="Interactive dot figure of Valorant Controller Omen"
                      />
                      <div style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(169,171,255,0.68)', letterSpacing: '0.14em', marginTop: '0.65rem' }}>
                        HOVER TO REVEAL OMEN · CLICK OR TRIGGER ABILITIES BELOW
                      </div>
                    </div>

                    {/* Right: IGN + Controller Abilities + FC 27 & 29 Card Game */}
                    <div style={{ gridColumn: '7 / 13' }} className="exp-right">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                        <img
                          src="/images/controller-icon.png"
                          alt="Controller Role"
                          style={{ width: '22px', height: '22px' }}
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a9abff', letterSpacing: '0.14em' }}>
                          {valorant.title} · {valorant.status} · {valorant.agent.toUpperCase()}
                        </span>
                      </div>

                      <h2 style={{ fontSize: 'var(--step-5)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.75rem' }}>
                        {valorant.ign}
                      </h2>

                      <button
                        type="button"
                        className="riot-id-pill"
                        onClick={() => {
                          handleCopyRiotId();
                          setOmenBurst((b) => b + 1);
                        }}
                        title="Click to copy Riot ID & pulse Omen particles"
                      >
                        <span>RIOT ID</span>
                        <strong>{valorant.ign}</strong>
                        <span style={{ opacity: 0.78, fontSize: '0.72rem' }}>
                          {copiedId ? '✓ Copied' : 'Copy'}
                        </span>
                      </button>

                      <p style={{ fontSize: '0.98rem', color: 'var(--fg-muted)', marginTop: '1.15rem', lineHeight: 1.6 }}>
                        {valorant.note}
                      </p>

                      <div className="abilities-row" style={{ flexWrap: 'wrap', marginBottom: '2.25rem' }}>
                        {valorant.abilities.map((ab) => (
                          <button
                            key={ab.name}
                            type="button"
                            className="ability-chip"
                            onClick={() => setOmenBurst((b) => b + 1)}
                            title={`Trigger ${ab.name} particle pulse`}
                          >
                            <img src={ab.icon} alt={ab.name} />
                            <span>
                              <strong>{ab.key}</strong> {ab.name}
                            </span>
                          </button>
                        ))}
                      </div>

                      <div className="game-subgrid">
                        {otherGames.map((g) => (
                          <div
                            key={g.title}
                            style={{
                              padding: '1.25rem',
                              borderRadius: 'var(--radius-s)',
                              border: '1px solid var(--line-strong)',
                              background: 'rgba(255,255,255,0.03)',
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--fg-muted)' }}>
                                {g.platform}
                              </span>
                              <span
                                style={{
                                  fontSize: '0.72rem',
                                  fontWeight: 700,
                                  padding: '0.2rem 0.6rem',
                                  borderRadius: '9999px',
                                  background: 'var(--accent)',
                                  color: '#fff',
                                }}
                              >
                                {g.badge}
                              </span>
                            </div>
                            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.35rem' }}>{g.title}</h4>
                            <p style={{ fontSize: '0.86rem', color: 'var(--fg-muted)', lineHeight: 1.5 }}>{g.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* AI CHAT SECTION */}
              <ChatWidget lang={lang} />

              {/* (08) CONTACT & FOOTER */}
              <section id="contact" className="section" data-section="contact" data-theme="dark">
                <div className="container">
                  <div className="sh">
                    <span className="sh-index">{copy.contact.index}</span>
                    <span className="section-label">{copy.contact.label}</span>
                    <span className="sh-aside">{copy.contact.aside}</span>
                  </div>

                  <div className="live-pill" style={{ marginBottom: '2rem' }}>
                    <span className="live-dot" aria-hidden="true" />
                    <span>{copy.contact.status}</span>
                  </div>

                  <div className="grid-12" style={{ alignItems: 'center', marginBottom: '3.5rem' }}>
                    <div style={{ gridColumn: '1 / 9' }} className="exp-left">
                      <h2
                        style={{
                          fontSize: 'clamp(2.8rem, 6.2vw, 5.8rem)',
                          fontWeight: 700,
                          letterSpacing: '-0.035em',
                          lineHeight: 1.02,
                          marginBottom: '2.5rem',
                        }}
                      >
                        {copy.contact.heading}
                      </h2>

                      <p className="section-label" style={{ marginBottom: '1.25rem' }}>
                        {copy.contact.timelineTitle}
                      </p>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '1.25rem' }}>
                        {copy.contact.steps.map((st) => (
                          <div key={st.num} style={{ borderTop: '1px solid var(--line-strong)', paddingTop: '0.9rem' }}>
                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-light)' }}>
                              {st.num}
                            </span>
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBlock: '0.4rem' }}>{st.title}</h4>
                            <p style={{ fontSize: '0.84rem', color: 'var(--fg-muted)', lineHeight: 1.45 }}>{st.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      style={{
                        gridColumn: '9 / 13',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                      className="exp-right"
                    >
                      <a
                        href={`mailto:${personal.email}?subject=${encodeURIComponent("Let's build something together")}`}
                        className="contact-cta-circle"
                      >
                        <span>{copy.contact.ctaText}</span>
                        <span>↗</span>
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.9rem' }}>
                    <a
                      href={`mailto:${personal.email}`}
                      className="pill-tag fill"
                      style={{ padding: '0.75rem 1.35rem', fontSize: '0.95rem' }}
                    >
                      {personal.email}
                    </a>
                    <a
                      href={`tel:${personal.phone}`}
                      className="pill-tag fill"
                      style={{ padding: '0.75rem 1.35rem', fontSize: '0.95rem' }}
                    >
                      {personal.phoneDisplay}
                    </a>
                    {personal.socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="pill-tag fill"
                        style={{ padding: '0.75rem 1.25rem', fontSize: '0.92rem' }}
                      >
                        {s.label} ↗
                      </a>
                    ))}
                  </div>

                  <footer className="footer-grid">
                    <div>
                      <div className="footer-col-label">{copy.contact.footerMeta.versionTitle}</div>
                      <div>{copy.contact.footerMeta.versionValue}</div>
                      <div style={{ color: 'var(--fg-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                        {personal.fullName}
                      </div>
                    </div>

                    <div>
                      <div className="footer-col-label">{copy.contact.footerMeta.timeTitle}</div>
                      <div>{personal.workCity} · {nyTime} ET</div>
                      <div style={{ color: 'var(--fg-muted)', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                        {personal.workHours} (Alpha FMC) · {personal.homeCity} {dhakaTime}
                      </div>
                    </div>

                    <div>
                      <div className="footer-col-label">{copy.contact.footerMeta.recognitionTitle}</div>
                      {copy.contact.footerMeta.recognitionItems.map((r) => (
                        <div key={r} style={{ color: 'var(--fg-muted)', marginBottom: '0.2rem' }}>
                          {r}
                        </div>
                      ))}
                    </div>

                    <div>
                      <div className="footer-col-label">DIRECT</div>
                      <a href={`mailto:${personal.email}`} className="t-link" style={{ display: 'block', marginBottom: '0.35rem' }}>
                        {personal.email}
                      </a>
                      <a href={`tel:${personal.phone}`} className="t-link" style={{ display: 'block' }}>
                        {personal.phoneDisplay}
                      </a>
                    </div>

                    <div>
                      <div className="footer-col-label">{copy.contact.footerMeta.socialsTitle}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', alignItems: 'flex-start' }}>
                        {personal.socials.map((s) => (
                          <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="t-link">
                            {s.label} <span className="link-arrow">↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </footer>
                </div>
              </section>
            </main>
          )}

          {!menuOpen && (
            <FloatingDock
              mode={mode}
              onModeChange={handleModeSwitch}
              lang={lang}
              onLangChange={setLang}
              showCode={showCode}
              onToggleCode={() => setShowCode((c) => !c)}
              soundOn={soundOn}
              soundTrack={soundTrack}
              onToggleSound={handleToggleSound}
              onNextTrack={handleNextTrack}
            />
          )}

          <MenuOverlay
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            dhakaTime={dhakaTime}
            lang={lang}
          />

          <CodeOverlay
            open={showCode}
            activeSection={activeSection}
            theme={theme}
            dhakaTime={dhakaTime}
            onClose={() => setShowCode(false)}
          />
        </div>
      )}
    </>
  );
}
