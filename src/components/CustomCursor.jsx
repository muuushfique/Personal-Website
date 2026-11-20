import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target.closest('a, button, [data-cursor-label], [data-cursor="hide"], .fill');
      if (!target) {
        setHovering(false);
        setLabel('');
        setHidden(false);
        return;
      }

      if (target.getAttribute('data-cursor') === 'hide') {
        setHidden(true);
        return;
      }
      setHidden(false);

      const customLabel = target.getAttribute('data-cursor-label') || '';
      setLabel(customLabel);
      setHovering(true);

      if (target.classList.contains('fill')) {
        const rect = target.getBoundingClientRect();
        target.style.setProperty('--fx', `${((e.clientX - rect.left) / rect.width) * 100}%`);
        target.style.setProperty('--fy', `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  return (
    <div
      className={`custom-cursor ${hovering ? 'hovering' : ''} ${label ? 'has-label' : ''}`}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        opacity: hidden ? 0 : 1,
      }}
      aria-hidden="true"
    >
      {label ? <div className="custom-cursor-pill">{label} ↗</div> : <div className="custom-cursor-dot" />}
    </div>
  );
}
