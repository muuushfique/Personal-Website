import { PORTFOLIO_DATA } from '../data/portfolioData';

const MENU_LINKS = [
  { num: '(01)', label: 'About', href: '#about' },
  { num: '(02)', label: 'What I Do', href: '#services' },
  { num: '(03)', label: 'Selected Work', href: '#work' },
  { num: '(04)', label: 'Education', href: '#education' },
  { num: '(05)', label: 'Experience', href: '#experience' },
  { num: '(06)', label: 'Voices & Honors', href: '#testimonials' },
  { num: '(07)', label: 'Off the Clock · Music', href: '#off-clock' },
  { num: '(08)', label: 'Gaming & Arena', href: '#gaming' },
  { num: '(09)', label: 'Contact', href: '#contact' },
];

export default function MenuOverlay({ open, onClose, dhakaTime, lang }) {
  if (!open) return null;
  const personal = PORTFOLIO_DATA.personal;
  const talkCta = PORTFOLIO_DATA[lang].nav.talkCta;

  const handleNav = (href) => {
    onClose();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Site Menu">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>{personal.fullName}</span>
        <a
          href={`mailto:${personal.email}`}
          className="t-link"
          style={{ color: '#a9abff' }}
        >
          {talkCta} <span className="link-arrow">↗</span>
        </a>
      </div>

      <div className="grid-12" style={{ alignItems: 'center', marginBlock: '2.5rem' }}>
        <nav style={{ gridColumn: '1 / 8' }} aria-label="Full screen navigation">
          {MENU_LINKS.map((item) => (
            <button
              key={item.href}
              type="button"
              className="menu-link-row"
              onClick={() => handleNav(item.href)}
              style={{ width: '100%', textAlign: 'left' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#8689f2' }}>
                {item.num}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div
          style={{
            gridColumn: '8 / 13',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '1rem',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 'min(300px, 100%)',
              aspectRatio: '4 / 5',
              borderRadius: '1rem',
              overflow: 'hidden',
              border: '1px solid rgba(238,236,232,0.16)',
            }}
          >
            <img
              src={personal.profileImage}
              alt={personal.fullName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%) contrast(1.08)' }}
            />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(238,236,232,0.55)' }}>
            {personal.location} · {dhakaTime}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.85rem', color: 'rgba(238,236,232,0.68)' }}>
          <span className="mini-globe" aria-hidden="true" />
          <span>{personal.workCity} ({personal.workHours}) · {personal.homeCity} {dhakaTime}</span>
        </div>

        <div style={{ display: 'flex', gap: '1.35rem', flexWrap: 'wrap' }}>
          {personal.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="t-link">
              {s.label} <span className="link-arrow">↗</span>
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: '#eeece8',
            color: '#0a0a0a',
            fontWeight: 700,
            fontSize: '1.1rem',
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
