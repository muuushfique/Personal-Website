import { useEffect, useRef, useState } from 'react';

export default function InteractiveDotFigure({
  src,
  variant = 'editorial', // 'editorial' | 'omen'
  density = 4,
  burstSignal = 0,
  height = 560,
  className = '',
  ariaLabel = 'Interactive dot figure',
}) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const burstRef = useRef(burstSignal);
  const [imgBox, setImgBox] = useState({ left: 0, top: 0, width: 0, height: 0 });
  const [lens, setLens] = useState({ x: 0, y: 0, r: 0 });

  useEffect(() => {
    if (burstSignal === burstRef.current) return;
    burstRef.current = burstSignal;
    particlesRef.current.forEach((p) => {
      const angle = Math.random() * Math.PI * 2;
      const force = 10 + Math.random() * 26;
      p.vx += Math.cos(angle) * force;
      p.vy += Math.sin(angle) * force;
    });
  }, [burstSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId = 0;
    let alive = true;

    const pointer = { x: -9999, y: -9999, active: false, nx: 0, ny: 0 };

    const sampleImage = (img, width, heightPx) => {
      const off = document.createElement('canvas');
      const pad = 8;
      const targetW = Math.max(240, Math.floor(width));
      const targetH = Math.max(240, Math.floor(heightPx));
      off.width = targetW;
      off.height = targetH;
      const octx = off.getContext('2d');

      const imgRatio = img.width / img.height;
      const boxW = targetW - pad * 2;
      const boxH = targetH - pad * 2;
      const boxRatio = boxW / boxH;

      let drawW = boxW;
      let drawH = boxH;
      if (imgRatio > boxRatio) {
        drawW = boxW;
        drawH = boxW / imgRatio;
      } else {
        drawH = boxH;
        drawW = boxH * imgRatio;
      }

      const dx = (targetW - drawW) / 2;
      const dy = targetH - drawH; // align bottom cleanly so physique rises from bottom like reference

      setImgBox({ left: dx, top: dy, width: drawW, height: drawH });

      octx.clearRect(0, 0, targetW, targetH);
      octx.drawImage(img, dx, dy, drawW, drawH);

      const { data } = octx.getImageData(0, 0, targetW, targetH);
      const step = Math.max(3, density);
      const pts = [];

      for (let y = 0; y < targetH; y += step) {
        for (let x = 0; x < targetW; x += step) {
          const idx = (y * targetW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Strict transparent PNG alpha threshold — only physique/character shows
          if (a < 55) continue;

          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          if (lum < 0.05 && a < 180) continue;

          const depth = (lum - 0.5) * 38;
          let color;
          if (variant === 'omen') {
            if (b > r + 18 || lum > 0.62) {
              color = `rgba(169, 171, 255, ${0.48 + lum * 0.52})`;
            } else if (lum > 0.3) {
              color = `rgba(105, 109, 232, ${0.44 + lum * 0.52})`;
            } else {
              color = `rgba(210, 214, 255, ${0.26 + lum * 0.45})`;
            }
          } else {
            const alpha = Math.min(0.96, 0.25 + lum * 0.75);
            color =
              (x + y) % 13 === 0 && lum > 0.35
                ? `rgba(107, 112, 236, ${Math.min(1, alpha + 0.12)})`
                : `rgba(238, 236, 232, ${alpha})`;
          }

          pts.push({
            ox: x,
            oy: y,
            x: x + (Math.random() - 0.5) * 45,
            y: y + (Math.random() - 0.5) * 45,
            vx: 0,
            vy: 0,
            z: depth,
            size: variant === 'omen' ? 1.2 + lum * 1.4 : 1.05 + lum * 1.55,
            color,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      particlesRef.current = pts;
    };

    const img = new Image();
    img.src = src;

    let width = 520;
    let heightPx = height;

    const resizeAndSample = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(240, rect.width);
      heightPx = Math.max(240, rect.height || height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(heightPx * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (img.complete && img.naturalWidth > 0) {
        sampleImage(img, width, heightPx);
      }
    };

    img.onload = () => {
      if (alive) resizeAndSample();
    };
    resizeAndSample();
    window.addEventListener('resize', resizeAndSample);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.nx = (pointer.x / rect.width - 0.5) * 2;
      pointer.ny = (pointer.y / rect.height - 0.5) * 2;
      pointer.active = true;
      setLens({ x: pointer.x, y: pointer.y, r: variant === 'omen' ? 115 : 105 });
    };

    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.nx = 0;
      pointer.ny = 0;
      setLens((prev) => ({ ...prev, r: 0 }));
    };

    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      particlesRef.current.forEach((p) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const dist = Math.hypot(dx, dy) || 1;
        if (dist < 220) {
          const force = ((220 - dist) / 220) * 22;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
      });
    };

    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);

    let time = 0;
    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, heightPx);

      const pts = particlesRef.current;
      const tiltX = pointer.nx * 10;
      const tiltY = pointer.ny * 8;
      const revealR = variant === 'omen' ? 105 : 95;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const depthFactor = p.z / 30;
        const breath = Math.sin(time + p.phase) * (variant === 'omen' ? 1.2 : 0.6);
        const tx = p.ox + tiltX * depthFactor + breath * 0.35;
        const ty = p.oy + tiltY * depthFactor + breath;

        let alphaScale = 1;
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < revealR * revealR && dSq > 0.5) {
            const d = Math.sqrt(dSq);
            const push = ((revealR - d) / revealR) * 3.1;
            p.vx += (dx / d) * push;
            p.vy += (dy / d) * push;
            // Fade dots inside the reveal lens so the actual image shines cleanly through
            alphaScale = Math.max(0.08, d / revealR);
          }
        }

        p.vx += (tx - p.x) * 0.085;
        p.vy += (ty - p.y) * 0.085;
        p.vx *= 0.8;
        p.vy *= 0.8;
        p.x += p.vx;
        p.y += p.vy;

        ctx.globalAlpha = alphaScale;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeAndSample);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
    };
  }, [src, variant, density, height]);

  return (
    <div
      ref={wrapRef}
      className={`dot-figure-wrap ${className}`}
      style={{ position: 'relative', width: '100%', height: `${height}px` }}
    >
      {/* Real transparent PNG image revealed smoothly inside cursor lens */}
      {imgBox.width > 0 && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${imgBox.left}px`,
            top: `${imgBox.top}px`,
            width: `${imgBox.width}px`,
            height: `${imgBox.height}px`,
            objectFit: 'contain',
            pointerEvents: 'none',
            clipPath: `circle(${lens.r}px at ${lens.x - imgBox.left}px ${lens.y - imgBox.top}px)`,
            transition: 'clip-path 0.14s ease-out',
            filter: variant === 'omen' ? 'drop-shadow(0 0 24px rgba(91,95,224,0.45))' : 'contrast(1.04)',
          }}
        />
      )}

      <canvas
        ref={canvasRef}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          display: 'block',
          cursor: 'crosshair',
        }}
        aria-label={ariaLabel}
      />
    </div>
  );
}
