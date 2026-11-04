import React, { useState, useEffect, useRef } from 'react';

export default function Header({ onOpenAuth, activeNav = 'home', onNavSelect }) {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Falling Sakura / Star Petal particles in header banner
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
      vx: Math.random() * 0.8 + 0.2,
      vy: Math.random() * 0.8 + 0.5,
      color: Math.random() > 0.4 ? 'rgba(255, 183, 197, 0.7)' : 'rgba(255, 255, 255, 0.6)',
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        if (p.x > width) p.x = 0;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
        ctx.restore();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Scroll interpolation factor (0 = top, 1 = scrolled >= 150px)
  const factor = Math.min(1, scrollY / 150);

  // Dynamic values
  const headerHeight = 200 - factor * 70; // 200px -> 130px
  const brandHeight = 110 - factor * 45; // 110px -> 65px
  const brandWidth = Math.min(650 + factor * 250, window.innerWidth - 32);
  const logoHeight = 56 - factor * 16; // 56px -> 40px
  const navTop = Math.max(75, 165 - factor * 90);

  const navItems = [
    { id: 'home', label: 'home', href: '#' },
    { id: 'services', label: 'services', href: '#services' },
    { id: 'docs', label: 'docs', href: '#docs' },
  ];

  return (
    <>
      {/* 1. System Status Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-[30px] z-[10000] bg-[#111] border-b-2 border-[#555] px-4 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <a
            href="https://status.kyun.sh"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#999] hover:text-[#fff] transition-colors truncate"
          >
            All systems operational <span className="opacity-50 text-[10px] hidden sm:inline">(status.kyun.sh)</span>
          </a>
        </div>
        <div className="text-[11px] text-[#777] hidden md:block">
          Privacy-First Cloud Hosting
        </div>
      </div>

      {/* 2. Starry Header Background */}
      <header
        style={{ height: `${headerHeight}px` }}
        className="fixed top-[30px] left-0 right-0 z-[9990] select-none pointer-events-none transition-all duration-75 overflow-hidden shadow-nav"
      >
        <div
          className="absolute inset-0 bg-[#0f0f0f] bg-center bg-cover opacity-90"
          style={{
            backgroundImage: "url('/assets/bg22-DmlcjCcj.gif')",
            backgroundRepeat: 'repeat-x',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      </header>

      {/* 3. Center Brand Box */}
      <div
        style={{
          width: `${brandWidth}px`,
          height: `${brandHeight}px`,
          top: `${38 + factor * 2}px`,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[9995] border-2 border-[#aaa] bg-black overflow-hidden shadow-2xl transition-all duration-75 select-none"
      >
        {/* Banner Pixel Art Background */}
        <div
          className="absolute inset-0 opacity-60 bg-repeat-x bg-center"
          style={{
            backgroundImage: "url('/assets/regular-D_k10KAs.gif')",
            backgroundSize: 'auto 100%',
          }}
        />

        {/* Falling Cherry Blossom Particles Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* KYUN! Logo Typography with Glow */}
        <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
          <div
            style={{ fontSize: `${logoHeight}px`, lineHeight: 1 }}
            className="font-pixel font-bold text-white tracking-widest drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] filter"
          >
            KYUN!
          </div>
        </div>
      </div>

      {/* 4. Retro Navigation Bar */}
      <nav
        style={{
          width: `${brandWidth}px`,
          top: `${navTop}px`,
        }}
        className="fixed left-1/2 -translate-x-1/2 z-[9998] bg-[#111] border-2 border-[#777] h-[30px] flex items-center justify-between px-2 sm:px-4 font-pixel text-xs sm:text-sm shadow-lg select-none"
      >
        <div className="flex items-center space-x-4 sm:space-x-8 mx-auto">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  if (item.href.startsWith('#')) {
                    onNavSelect?.(item.id);
                  }
                }}
                className={`transition-all duration-150 uppercase tracking-wider px-2 py-0.5 ${
                  isActive
                    ? 'text-white font-bold drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]'
                    : 'text-[#777] hover:text-[#bbb]'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          {/* Account Trigger */}
          <button
            onClick={onOpenAuth}
            className="text-[#777] hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all uppercase tracking-wider px-2 py-0.5 cursor-pointer font-pixel"
          >
            account
          </button>
        </div>
      </nav>

      {/* Spacer to push body content under the fixed header */}
      <div className="h-[210px] w-full pointer-events-none" />
    </>
  );
}
