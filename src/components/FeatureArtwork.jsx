import React, { useEffect, useRef } from 'react';

export function FeatureArtwork({ type, theme = 'dark' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);
    ctx.scale(2, 2);

    let angle = 0;

    const render = () => {
      const w = width / 2;
      const h = height / 2;
      ctx.clearRect(0, 0, w, h);

      angle += 0.015;
      const strokeColor = theme === 'light' ? '#333333' : '#d2d2d2';
      const accentColor = theme === 'light' ? '#666666' : '#777777';
      const glowColor = theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.15)';

      ctx.save();
      ctx.translate(w / 2, h / 2);

      if (type === 'rocket') {
        // 3D wireframe rocket
        const floatY = Math.sin(angle * 1.5) * 8;
        ctx.translate(0, floatY);
        ctx.rotate(-0.25 + Math.sin(angle) * 0.05);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.5;

        // Rocket Body
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.bezierCurveTo(24, -20, 24, 30, 16, 50);
        ctx.lineTo(-16, 50);
        ctx.bezierCurveTo(-24, 30, -24, -20, 0, -60);
        ctx.stroke();

        // Porthole Window
        ctx.beginPath();
        ctx.arc(0, -10, 10, 0, Math.PI * 2);
        ctx.stroke();

        // Inner Rings
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.ellipse(0, 15, 18, 5, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Left Fin
        ctx.strokeStyle = strokeColor;
        ctx.beginPath();
        ctx.moveTo(-20, 20);
        ctx.lineTo(-42, 55);
        ctx.lineTo(-16, 50);
        ctx.stroke();

        // Right Fin
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(42, 55);
        ctx.lineTo(16, 50);
        ctx.stroke();

        // Flame Thrust particles
        ctx.fillStyle = theme === 'light' ? '#e11d48' : '#f43f5e';
        const flameLen = 20 + Math.sin(angle * 8) * 10;
        ctx.beginPath();
        ctx.moveTo(-10, 52);
        ctx.lineTo(0, 52 + flameLen);
        ctx.lineTo(10, 52);
        ctx.fill();
      } else if (type === 'grass') {
        // Stylized natural grass & digital sprouts
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.8;

        const bladeCount = 7;
        for (let i = -bladeCount / 2; i <= bladeCount / 2; i++) {
          const sway = Math.sin(angle + i * 0.4) * (14 + Math.abs(i) * 3);
          const rootX = i * 14;
          const rootY = 45;
          const tipX = rootX + sway * 1.5;
          const tipY = -35 - (4 - Math.abs(i)) * 6;

          ctx.beginPath();
          ctx.moveTo(rootX, rootY);
          ctx.quadraticCurveTo(rootX + sway * 0.5, 5, tipX, tipY);
          ctx.stroke();

          // Flower / node bud on center blades
          if (Math.abs(i) <= 1) {
            ctx.fillStyle = theme === 'light' ? '#16a34a' : '#4ade80';
            ctx.beginPath();
            ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // Base ground line
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.moveTo(-70, 45);
        ctx.lineTo(70, 45);
        ctx.stroke();
      } else if (type === 'speech') {
        // Chat speech bubble with animated typing dots
        const floatY = Math.sin(angle * 1.2) * 5;
        ctx.translate(0, floatY);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;

        // Rounded bubble
        const bx = -50, by = -35, bw = 100, bh = 65, r = 12;
        ctx.beginPath();
        ctx.moveTo(bx + r, by);
        ctx.lineTo(bx + bw - r, by);
        ctx.quadraticCurveTo(bx + bw, by, bx + bw, by + r);
        ctx.lineTo(bx + bw, by + bh - r);
        ctx.quadraticCurveTo(bx + bw, by + bh, bx + bw - r, by + bh);
        ctx.lineTo(bx + 30, by + bh);
        ctx.lineTo(bx + 15, by + bh + 16);
        ctx.lineTo(bx + 15, by + bh);
        ctx.lineTo(bx + r, by + bh);
        ctx.quadraticCurveTo(bx, by + bh, bx, by + bh - r);
        ctx.lineTo(bx, by + r);
        ctx.quadraticCurveTo(bx, by, bx + r, by);
        ctx.stroke();

        // 3 Chat Indicator Dots
        const dotOffset = Math.sin(angle * 4) * 4;
        ctx.fillStyle = strokeColor;
        for (let d = -1; d <= 1; d++) {
          const dy = Math.sin(angle * 3 + d * 1.2) * 4;
          ctx.beginPath();
          ctx.arc(d * 18, -3 + dy, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (type === 'lock') {
        // High-security padlock wireframe
        const floatY = Math.sin(angle) * 5;
        ctx.translate(0, floatY);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;

        // Shackle
        ctx.beginPath();
        ctx.arc(0, -18, 22, Math.PI, 0, false);
        ctx.lineTo(22, 5);
        ctx.moveTo(-22, -18);
        ctx.lineTo(-22, 5);
        ctx.stroke();

        // Body Box
        ctx.strokeRect(-36, 5, 72, 52);

        // Keyhole
        ctx.fillStyle = strokeColor;
        ctx.beginPath();
        ctx.arc(0, 24, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-3, 27);
        ctx.lineTo(3, 27);
        ctx.lineTo(5, 42);
        ctx.lineTo(-5, 42);
        ctx.fill();

        // Security shield aura
        ctx.strokeStyle = accentColor;
        ctx.beginPath();
        ctx.arc(0, 25, 45 + Math.sin(angle * 2) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
      frameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frameId);
  }, [type, theme]);

  return (
    <div className="relative w-full h-[240px] sm:h-[300px] flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[320px] max-h-[300px] pointer-events-none select-none"
      />
    </div>
  );
}
