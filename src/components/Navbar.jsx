import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Navbar({ lang, scrolled, onOpenMenu }) {
  const copy = PORTFOLIO_DATA[lang].nav;
  const personal = PORTFOLIO_DATA.personal;

  return (
    <header className={`topbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="brand-cluster">
        <a href="#top" className="brand-name">
          {personal.brand}
        </a>
        <span className="brand-role">{personal.roleShort}</span>
        <span className="live-pill">
          <span className="live-dot" aria-hidden="true" />
          {copy.availability}
        </span>
      </div>

      <nav className="nav-right" aria-label="Primary navigation">
        <div className="nav-links">
          {copy.links.map((item) => (
            <a key={item.href} href={item.href} className="t-link">
              {item.label}
            </a>
          ))}
        </div>
        <button type="button" className="menu-btn fill" onClick={onOpenMenu}>
          <span>{copy.menuBtn}</span>
          <span className="menu-dots" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>
    </header>
  );
}
