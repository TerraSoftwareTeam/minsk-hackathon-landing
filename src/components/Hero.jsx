import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Shield, Zap } from 'lucide-react';

export default function Hero({ onExploreSpecs }) {
  // Sparkle generator for hero
  const [sparkles] = useState(() =>
    Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${(i * 19) % 95}%`,
      top: `${(i * 23) % 85}%`,
      delay: `${(i * 0.4) % 3}s`,
      size: `${(i % 3) + 2}px`,
    }))
  );

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden pt-4 pb-16 px-4 md:px-8">
      {/* Background Pixel Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {sparkles.map((s) => (
          <div
            key={s.id}
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
            }}
            className="absolute bg-white/40 dark:bg-white/30 rounded-full animate-pulse pointer-events-none"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <div className="mb-4">
            <h1 className="kyun-hero-title font-pixel text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-1">
              Welcome
            </h1>
            <p className="text-xl sm:text-2xl text-kyun-textFocus/60 font-mono tracking-wide">
              to your new home
            </p>
          </div>

          <p className="text-base sm:text-lg text-kyun-text max-w-xl leading-relaxed mb-6">
            Private cloud for humans and agents. Kyun gives you one-click-deploy apps,
            virtual machines, containers, and hot-attachable block storage without
            KYC, enterprise theater, or surprise bills.
          </p>

          {/* Quick Highlight Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg mb-7">
            <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] border border-white/10 p-2.5 rounded-sm flex items-center gap-2 text-xs font-mono text-kyun-textFocus">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>No KYC Ever</span>
            </div>
            <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] border border-white/10 p-2.5 rounded-sm flex items-center gap-2 text-xs font-mono text-kyun-textFocus">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Monero Accepted</span>
            </div>
            <div className="bg-[#1a1a1a] dark:bg-[#1a1a1a] border border-white/10 p-2.5 rounded-sm flex items-center gap-2 text-xs font-mono text-kyun-textFocus col-span-2 sm:col-span-1">
              <Terminal className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Instant Deploy</span>
            </div>
          </div>

          {/* Price Callout Banner */}
          <div className="bg-black/60 border border-white/15 px-4 py-3 rounded-md flex flex-wrap items-center justify-between gap-4 w-full max-w-xl mb-7 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-sm font-mono text-kyun-textFocus">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>
                From <strong className="text-white">$1.85/mo</strong> for containers,{' '}
                <strong className="text-white">$2.90/mo</strong> for VMs
              </span>
            </div>
            <button
              onClick={onExploreSpecs}
              className="text-xs font-mono text-[#aaa] hover:text-white flex items-center gap-1 group transition-colors cursor-pointer"
            >
              Configure <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#specs"
              onClick={onExploreSpecs}
              className="px-6 py-3 bg-[#2a2a2a] hover:bg-[#333] border border-white/20 text-white font-mono text-sm uppercase tracking-wider rounded transition-all shadow-lg hover:border-white/40 flex items-center gap-2"
            >
              <span>Build Machine</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#testimonials"
              className="px-5 py-3 text-kyun-text hover:text-white font-mono text-sm underline underline-offset-4 transition-colors"
            >
              Read Customer Reviews
            </a>
          </div>
        </div>

        {/* Right Character Art Column */}
        <div className="lg:col-span-5 flex items-center justify-center relative">
          <div className="relative w-full max-w-[340px] sm:max-w-[400px] flex items-center justify-center">
            {/* Retro Pixel Frame Backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-purple-500/10 to-transparent rounded-2xl filter blur-xl opacity-60" />

            <div className="relative border-2 border-white/20 bg-[#161616] p-4 shadow-2xl rounded-sm">
              {/* Corner Accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />

              {/* Kyoko GIF Pixel Artwork */}
              <img
                src="/assets/kyoko-DdSesS4Q.gif"
                alt="Kyoko mascot"
                className="w-full h-auto object-contain [image-rendering:pixelated] select-none"
                loading="eager"
              />

              <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-kyun-textDark">
                <span>KYOKO // AGENT-01</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
