import React, { useState } from 'react';
import { Star, Mail, Send, ShieldCheck } from 'lucide-react';

const QUOTES = [
  'Simplicity is the soul of efficiency.',
  'Privacy is not something that I’m merely entitled to, it’s an absolute prerequisite.',
  'If you think technology can solve your security problems, then you don’t understand the problems and you don’t understand the technology.',
  'Software is like sex: it’s better when it’s free.',
  'No KYC, no drama, just raw compute.'
];

export default function Footer() {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [quote] = useState(() => QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  return (
    <footer className="w-full mt-20 pt-10 pb-16 border-t border-white/10 bg-[#121212] text-center text-xs font-mono text-kyun-text">
      <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
        {/* Policy / Docs Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-[#aaa]">
          <a href="#tos" className="hover:text-white transition-colors">Terms of Service</a>
          <span className="opacity-40">•</span>
          <a href="#aup" className="hover:text-white transition-colors">Acceptable Use Policy</a>
          <span className="opacity-40">•</span>
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="opacity-40">•</span>
          <a href="#faqs" className="hover:text-white transition-colors">Frequently Asked Questions</a>
          <span className="opacity-40">•</span>
          <a href="#canary" className="hover:text-white transition-colors">Canary</a>
          <span className="opacity-40">•</span>
          <a href="#pgp" className="hover:text-white transition-colors">PGP</a>
          <span className="opacity-40">•</span>
          <a
            href="http://kyunnnckhnkl6oevonhwbltenwbgxwxf54mcpvmicphmaeqr5ourgqyd.onion/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            Tor (.onion)
          </a>
        </div>

        {/* Social & Contact Row */}
        <div className="flex items-center justify-center gap-5 relative">
          {/* X / Twitter */}
          <a
            href="https://x.com/kyunhost"
            target="_blank"
            rel="noopener noreferrer"
            title="X/Twitter"
            className="p-2 rounded bg-[#1e1e1e] hover:bg-[#282828] text-white border border-white/10 transition-colors flex items-center justify-center"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* Matrix */}
          <a
            href="https://matrix.to/#/#chat:kyun.sh"
            target="_blank"
            rel="noopener noreferrer"
            title="Matrix Community"
            className="p-2 rounded bg-[#1e1e1e] hover:bg-[#282828] text-white border border-white/10 transition-colors font-bold text-xs"
          >
            [M]
          </a>

          {/* Email with tooltip */}
          <div className="relative">
            <button
              onClick={() => setActiveTooltip(activeTooltip === 'email' ? null : 'email')}
              title="Email"
              className="p-2 rounded bg-[#1e1e1e] hover:bg-[#282828] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
            {activeTooltip === 'email' && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-[#181818] border border-white/20 rounded shadow-xl text-left z-50 text-[11px]">
                <div className="font-bold text-white mb-1">Email Contact:</div>
                <div className="text-emerald-400 mb-1 select-all">hello@kyun.sh</div>
                <div className="text-kyun-textDark text-[10px]">
                  (news & updates). For tech support, please use the live chat in the bottom-left corner.
                </div>
              </div>
            )}
          </div>

          {/* Telegram with tooltip */}
          <div className="relative">
            <button
              onClick={() => setActiveTooltip(activeTooltip === 'tg' ? null : 'tg')}
              title="Telegram"
              className="p-2 rounded bg-[#1e1e1e] hover:bg-[#282828] text-white border border-white/10 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
            {activeTooltip === 'tg' && (
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 p-3 bg-[#181818] border border-white/20 rounded shadow-xl text-left z-50 text-[11px]">
                <div className="font-bold text-white mb-1">Telegram:</div>
                <a
                  href="https://t.me/channelkyun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline block mb-1"
                >
                  @channelkyun (Official News)
                </a>
                <div className="text-kyun-textDark text-[10px]">
                  We do not do technical support via Telegram for security reasons.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KYCnot.me Rating Badge */}
        <a
          href="https://kycnot.me/service/kyun"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-3 py-1.5 bg-[#1e1e1e] border border-white/15 rounded text-xs text-kyun-textFocus hover:border-white/30 transition-colors"
        >
          <div className="flex items-center gap-1.5 font-bold tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>KYCnot.me</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400 font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>5.0 / 5.0</span>
          </div>
        </a>

        {/* Legal Corporate Info */}
        <div className="text-[11px] text-kyun-textDark leading-relaxed">
          <p>Kyun SRL / 51514103 / J2025021445009</p>
          <p>Bv. Constantin Brancoveanu, Nr. 116, Bl. M2/III, Et. 3, Ap. 138, Bucharest, Romania</p>
        </div>

        {/* Dynamic bottom quote */}
        <p className="text-xs italic text-kyun-textDark max-w-md border-t border-white/5 pt-4">
          "{quote}"
        </p>
      </div>
    </footer>
  );
}
