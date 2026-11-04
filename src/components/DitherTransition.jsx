import React, { useEffect, useRef } from 'react';

const BAYER_8X8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export default function DitherTransition({ fromTone = 'dark', toTone = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const pixelSize = 4;
      const w = Math.max(1, Math.ceil(rect.width / pixelSize));
      const h = Math.max(1, Math.ceil(rect.height / pixelSize));

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = toTone === 'dark' ? '#151515' : '#eaeaea';

      for (let y = 0; y < h; y++) {
        const threshold = y / Math.max(1, h - 1);
        for (let x = 0; x < w; x++) {
          const matrixVal = (BAYER_8X8[y % 8][x % 8] + 0.5) / 64;
          if (threshold >= matrixVal) {
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    };

    render();
    window.addEventListener('resize', render);
    return () => window.removeEventListener('resize', render);
  }, [fromTone, toTone]);

  return (
    <div
      data-home-dither-transition="true"
      className={`${fromTone} relative h-14 w-full overflow-hidden md:h-18 select-none pointer-events-none`}
      style={{
        background: fromTone === 'dark' ? '#151515' : '#eaeaea',
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
