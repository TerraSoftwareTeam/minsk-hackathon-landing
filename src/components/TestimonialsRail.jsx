import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 'context-coding',
    name: 'Context Coding',
    url: 'https://context-coding.com/',
    site: 'context-coding.com',
    avatar: '/assets/testimonial-context-56-DN7bvU5l.png',
    paragraphs: [
      'Kyun caters to the needs of the privacy-focused individuals. They are one of the few hosting platforms that will take Monero as payment. They make it super simple to do business, and support gets back to me almost instantly every time that I’ve needed them. They also have an impressive up-time which is tracked at their status page https://status.kyun.sh which is very handy for troubleshooting.',
      'I trust Kyun with my production web servers because of the support experiences and care I’ve received from them. Also, their prices are unbeatable when it comes to comparable VPS’s, and the entire vibe of their platform and team is just fun. It’s just a fun experience to be a customer of Kyun hosting.',
      'Another impressive thing about Kyun is that they are very transparent about their incidents (which are rare); they’ve logged their incidents right on the site for you to see what they’ve gone through. As an emerging and growing company, I was hesitant to join them, but I’ve been with Kyun for several years now, and they are my first reference to those who ask me about VPS hosting. Great job, Kyun!'
    ]
  },
  {
    id: 'preservetube',
    name: 'unknown',
    url: 'https://preservetube.com/',
    site: 'preservetube.com',
    avatar: '/assets/testimonial-preservetube-56-DjHsNEJ4.png',
    paragraphs: [
      'kyun is my favourite way to deploy vms. small test vms, bigger vms to handle data ingestion, or for letting it download a massive file for a whole month and then downloading it from the brick once it’s done. with the new mesa, i can even have openclaw running on kyun deploy new kyun vms for me. revolutionary.'
    ]
  },
  {
    id: 'kvm',
    name: 'kvm',
    url: 'https://elyria.cc/',
    site: 'elyria.cc',
    avatar: '/assets/testimonial-kvm-56-BZ6qXm7o.png',
    paragraphs: [
      'i flipping love kyun 🤤'
    ]
  }
];

export default function TestimonialsRail() {
  const [selectedReview, setSelectedReview] = useState(null);
  const railRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    let frameId;
    let speed = 0.6;

    const scroll = () => {
      if (!isPaused && rail) {
        rail.scrollLeft += speed;
        // Infinite wrap
        if (rail.scrollLeft >= rail.scrollWidth / 2) {
          rail.scrollLeft = 0;
        }
      }
      frameId = requestAnimationFrame(scroll);
    };

    frameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  // Duplicate items for continuous marquee
  const displayItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div id="testimonials" className="w-full py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center px-4 mb-10">
        <h2 className="text-3xl sm:text-4xl font-pixel font-bold tracking-tight text-white dark:text-white mb-3">
          People stay for a reason.
        </h2>
        <p className="text-sm sm:text-base text-kyun-text max-w-xl mx-auto font-sans leading-relaxed">
          The platform matters. The support, transparency, and feeling of being treated like a person matter too.
        </p>
      </div>

      {/* Testimonials Drag / Auto Marquee Rail */}
      <div
        ref={railRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-6 cursor-grab active:cursor-grabbing select-none"
      >
        {displayItems.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="flex-shrink-0 w-[300px] sm:w-[380px] bg-[#1a1a1a] border border-white/15 rounded-md p-6 flex flex-col justify-between shadow-xl transition-transform hover:-translate-y-1 hover:border-white/30"
          >
            <div>
              {/* Quote text snippet */}
              <p className="text-sm text-kyun-textFocus leading-relaxed line-clamp-4 font-sans mb-4">
                "{item.paragraphs[0]}"
              </p>
              {item.paragraphs.length > 1 || item.paragraphs[0].length > 180 ? (
                <button
                  onClick={() => setSelectedReview(item)}
                  className="text-xs font-mono text-[#aaa] hover:text-white underline underline-offset-2 mb-4 cursor-pointer"
                >
                  read full review
                </button>
              ) : null}
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
              <div className="flex flex-col text-left">
                <span className="text-sm font-bold text-white font-mono">{item.name}</span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-kyun-textDark hover:text-white flex items-center gap-1 transition-colors font-mono"
                >
                  {item.site} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <img
                src={item.avatar}
                alt={`${item.name} avatar`}
                className="w-10 h-10 rounded-full border border-white/20 object-cover bg-black select-none pointer-events-none"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Full Testimonial Modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-[10005] bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181818] border border-white/20 rounded-lg max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 p-1 text-[#888] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <img
                src={selectedReview.avatar}
                alt={selectedReview.name}
                className="w-12 h-12 rounded-full border border-white/20 bg-black"
              />
              <div>
                <h4 className="text-lg font-bold text-white font-mono">{selectedReview.name}</h4>
                <a
                  href={selectedReview.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-kyun-textDark hover:text-white flex items-center gap-1 font-mono"
                >
                  {selectedReview.site} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-kyun-textFocus font-sans leading-relaxed">
              {selectedReview.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-right">
              <button
                onClick={() => setSelectedReview(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded text-xs font-mono transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
