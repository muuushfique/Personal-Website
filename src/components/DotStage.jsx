import { useEffect, useRef } from 'react';

function getShapePoints(shape) {
  const pts = [];
  if (shape === 'browser') {
    for (let x = -130; x <= 130; x += 13) {
      for (let y = -80; y <= 80; y += 16) {
        const edge = Math.abs(x) >= 117 || Math.abs(y) >= 64 || y === -48;
        if (edge || (x > -90 && x < -20 && Math.abs(y) < 30)) {
          pts.push({ x, y, z: edge ? 10 : -14 });
        }
      }
    }
  } else if (shape === 'mobile') {
    for (let x = -56; x <= 56; x += 10) {
      for (let y = -105; y <= 105; y += 11) {
        const border = Math.abs(x) >= 46 || Math.abs(y) >= 94;
        const card = Math.abs(x) < 34 && (y === -35 || y === 10 || y === 55);
        if (border || card) pts.push({ x, y, z: border ? 14 : -10 });
      }
    }
  } else if (shape === 'gears') {
    for (let i = 0; i < 180; i++) {
      const a = (i / 180) * Math.PI * 2;
      const r = i % 2 === 0 ? 78 : 66;
      pts.push({ x: -38 + Math.cos(a) * r, y: -15 + Math.sin(a) * r, z: Math.sin(a * 4) * 16 });
      pts.push({ x: 64 + Math.cos(-a) * (r * 0.65), y: 42 + Math.sin(-a) * (r * 0.65), z: Math.cos(a * 4) * 14 });
    }
  } else if (shape === 'layers') {
    [-46, 0, 46].forEach((layerY, idx) => {
      for (let x = -90; x <= 90; x += 15) {
        for (let z = -60; z <= 60; z += 15) {
          pts.push({ x, y: layerY + idx * 4, z });
        }
      }
    });
  } else if (shape === 'gauge') {
    for (let i = 0; i <= 220; i++) {
      const a = Math.PI + (i / 220) * Math.PI;
      const r = 115;
      pts.push({ x: Math.cos(a) * r, y: 40 + Math.sin(a) * r, z: (i % 5) * 6 });
      if (i % 14 === 0) {
        pts.push({ x: Math.cos(a) * (r - 22), y: 40 + Math.sin(a) * (r - 22), z: 12 });
      }
    }
    for (let k = 0; k < 20; k++) {
      pts.push({ x: k * 4.5, y: 40 - k * 3.8, z: 22 });
    }
  } else {
    // cloud / pipeline
    for (let i = 0; i < 240; i++) {
      const a = (i / 240) * Math.PI * 2;
      pts.push({
        x: Math.cos(a) * 110 + Math.sin(a * 3) * 24,
        y: Math.sin(a) * 62 + Math.cos(a * 2) * 18,
        z: Math.sin(a * 5) * 32,
      });
    }
  }
  return pts;
}

export default function DotStage({ shape = 'browser' }) {
  const canvasRef = useRef(null);
  const shapeRef = useRef(shape);

  useEffect(() => {
    shapeRef.current = shape;
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let rafId = 0;
    let t = 0;

    const render = () => {
      t += 0.014;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(300, rect.width);
      const height = Math.max(220, rect.height);
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const pts = getShapePoints(shapeRef.current);
      const cos = Math.cos(Math.sin(t * 0.7) * 0.45);
      const sin = Math.sin(Math.sin(t * 0.7) * 0.45);
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const rx = p.x * cos - p.z * sin;
        const rz = p.x * sin + p.z * cos;
        const scale = 340 / (340 + rz);
        const sx = cx + rx * scale * (width / 460);
        const sy = cy + p.y * scale * (width / 460);

        ctx.fillStyle = i % 5 === 0 ? '#5b5fe0' : 'rgba(10, 10, 10, 0.72)';
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2 * scale, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-label={`Interactive 3D dot wireframe for ${shape}`}
    />
  );
}
