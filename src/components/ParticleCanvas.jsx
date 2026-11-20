import { useEffect, useRef } from 'react';

const COUNT = 1150;

function buildFormation(shape, portraitPoints) {
  const pts = new Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    const phi = Math.acos(1 - 2 * t);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;

    if (shape === 'portrait' && portraitPoints && portraitPoints.length > 0) {
      const p = portraitPoints[i % portraitPoints.length];
      pts[i] = { x: p.x, y: p.y, z: p.z, size: p.size };
    } else if (shape === 'globe') {
      const r = 185;
      pts[i] = {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.cos(phi),
        z: r * Math.sin(phi) * Math.sin(theta),
        size: 1.6,
      };
    } else if (shape === 'code') {
      const cols = 38;
      const col = i % cols;
      const row = Math.floor(i / cols);
      pts[i] = {
        x: (col - cols / 2) * 14,
        y: (row - COUNT / cols / 2) * 14,
        z: Math.sin(col * 0.4 + row * 0.3) * 42,
        size: 1.55,
      };
    } else if (shape === 'shroud') {
      const angle = t * Math.PI * 12;
      const rad = 60 + 160 * Math.sin(t * Math.PI);
      pts[i] = {
        x: Math.cos(angle) * rad,
        y: (t - 0.5) * 320,
        z: Math.sin(angle) * rad,
        size: 1.7,
      };
    } else if (shape === 'wave') {
      const x = (t - 0.5) * 560;
      const band = (i % 7) - 3;
      pts[i] = {
        x,
        y: band * 34 + Math.sin(x * 0.025 + band) * 48,
        z: Math.cos(x * 0.02 + band) * 55,
        size: 1.65,
      };
    } else {
      // 'orbit' / default constellation
      const r = 120 + (i % 5) * 34;
      pts[i] = {
        x: r * Math.cos(theta) * Math.sin(phi),
        y: r * Math.sin(theta) * Math.sin(phi) * 0.72,
        z: r * Math.cos(phi),
        size: 1.5,
      };
    }
  }
  return pts;
}

export default function ParticleCanvas({
  shape = 'portrait',
  theme = 'dark',
  interactive = false,
  profileSrc = '/images/profile.jpg',
}) {
  const canvasRef = useRef(null);
  const shapeRef = useRef(shape);
  const themeRef = useRef(theme);
  const portraitRef = useRef(null);
  const targetsRef = useRef(null);

  useEffect(() => {
    shapeRef.current = shape;
    targetsRef.current = buildFormation(shape, portraitRef.current);
  }, [shape]);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const img = new Image();
    img.src = profileSrc;
    img.onload = () => {
      const off = document.createElement('canvas');
      const size = 92;
      off.width = size;
      off.height = size;
      const octx = off.getContext('2d');
      octx.drawImage(img, 0, 0, size, size);
      const { data } = octx.getImageData(0, 0, size, size);
      const sampled = [];
      for (let y = 0; y < size; y += 2) {
        for (let x = 0; x < size; x += 2) {
          const idx = (y * size + x) * 4;
          const lum = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]) / 255;
          if (lum > 0.16) {
            sampled.push({
              x: (x - size / 2) * 3.8,
              y: (y - size / 2) * 3.8,
              z: (lum - 0.5) * 48,
              size: 1.1 + lum * 1.45,
            });
          }
        }
      }
      portraitRef.current = sampled;
      targetsRef.current = buildFormation(shapeRef.current, sampled);
    };
  }, [profileSrc]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    if (!targetsRef.current) {
      targetsRef.current = buildFormation(shapeRef.current, portraitRef.current);
    }

    const particles = Array.from({ length: COUNT }, (_, i) => {
      const tgt = targetsRef.current[i] || { x: 0, y: 0, z: 0, size: 1.5 };
      return {
        x: tgt.x + (Math.random() - 0.5) * 180,
        y: tgt.y + (Math.random() - 0.5) * 180,
        z: tgt.z,
        vx: 0,
        vy: 0,
        vz: 0,
        size: tgt.size,
      };
    });

    const pointer = { x: -9999, y: -9999 };
    let rotY = 0;
    let rotX = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (dragging) {
        rotY += (e.clientX - lastX) * 0.005;
        rotX += (e.clientY - lastY) * 0.005;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onPointerDown = (e) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      dragging = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    if (interactive) {
      canvas.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointerup', onPointerUp);
    }

    let rafId = 0;
    let time = 0;

    const tick = () => {
      time += 0.008;
      ctx.clearRect(0, 0, w, h);

      const isLight = themeRef.current === 'light';
      const anchorX = interactive ? w * 0.62 : w * 0.23;
      const anchorY = interactive ? h * 0.5 : h * 0.44;
      const cosY = Math.cos(rotY + Math.sin(time * 0.4) * 0.25);
      const sinY = Math.sin(rotY + Math.sin(time * 0.4) * 0.25);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const targets = targetsRef.current;

      for (let i = 0; i < COUNT; i++) {
        const p = particles[i];
        const t = targets[i];

        p.vx += (t.x - p.x) * 0.042;
        p.vy += (t.y - p.y) * 0.042;
        p.vz += (t.z - p.z) * 0.042;
        p.vx *= 0.84;
        p.vy *= 0.84;
        p.vz *= 0.84;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Rotate in 3D
        const rx = p.x * cosY - p.z * sinY;
        const rz1 = p.x * sinY + p.z * cosY;
        const ry = p.y * cosX - rz1 * sinX;
        const rz = p.y * sinX + rz1 * cosX;

        const persp = 540 / (540 + rz);
        let sx = anchorX + rx * persp;
        let sy = anchorY + ry * persp;

        // Pointer repulsion
        const dx = sx - pointer.x;
        const dy = sy - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 8100 && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const push = ((90 - dist) / 90) * 16;
          sx += (dx / dist) * push;
          sy += (dy / dist) * push;
        }

        const alpha = isLight
          ? Math.max(0.08, Math.min(0.28, persp * 0.22))
          : Math.max(0.14, Math.min(0.55, persp * 0.42));

        ctx.fillStyle =
          i % 7 === 0
            ? `rgba(91, 95, 224, ${alpha + 0.18})`
            : isLight
              ? `rgba(10, 10, 10, ${alpha})`
              : `rgba(238, 236, 232, ${alpha})`;

        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(0.8, t.size * persp), 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`particle-canvas ${interactive ? 'interactive' : ''}`}
      aria-hidden="true"
    />
  );
}
