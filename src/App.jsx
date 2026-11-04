import React, { useState, useEffect, useRef } from 'react';
import ModelStage from './components/ModelStage';
import SpecsPicker from './components/SpecsPicker';
import DitherTransition from './components/DitherTransition';

const SPRITES = [
  'data:image/gif;base64,R0lGODlhDQAHAPABAAAAAP///yH5BAEAAAAALAAAAAANAAcAAAIVhB+ZhwFu4HNwvXtXtZRiXEWMQkIFADs=',
  'data:image/gif;base64,R0lGODlhJQAMAPABAAAAAP///yH5BAEAAAAALAAAAAAlAAwAAAI+hI+pF+uvQoNLTjrvha2bbWnMh1ijJwGhuaqq92ZxjKYk03ZZWrvgKrOZXCfKQ0Y0KhOipfMGfRpBUmcIUAAAOw==',
  'data:image/gif;base64,R0lGODlhCQAMAPABAAAAAP///yH5BAEAAAAALAAAAAAJAAwAAAIVhINht9p/UgJuRduqRVnOjnEit2kFADs=',
  'data:image/gif;base64,R0lGODlhNgARAPABAAAAAP///yH5BAEAAAAALAAAAAA2ABEAAAJohI+py23hopwrQJouxnqD7kUgF1KjWU7gWaWShbCK7D4d/T21Ax/4ReuJgBDhx0IE+oQ9ZFOXSxZztmPzyqQqnUnbdjktIqtWsWZcpvp0Z6g4anzPni2tdxk7oUtTqKufEofTsLeTUAAAOw==',
  'data:image/gif;base64,R0lGODlhGAAIAPABAAAAAP///yH5BAEAAAAALAAAAAAYAAgAAAIjhGOpy4ntYJTgSQuxChx1XTldyG2kV4YVuj6lp6LvOh3pWAAAOw==',
  'data:image/gif;base64,R0lGODlhHAAQAPABAAAAAP///yH5BAEAAAAALAAAAAAcABAAAAI5hI+Zoe3KnmxxWhPqnXq/7lEhki0jBnTlmK0Y06ZfLKMr/B6lFu3VXovxUj3SLac66ng+CNHFAVkKADs=',
  'data:image/gif;base64,R0lGODlhHAAJAPABAAAAAP///yH5BAEAAAAALAAAAAAcAAkAAAIrhB+ni7nhIDPQgWSvxjTbClKbRiqeiEZX9aBkJsIfGzMYKJ9w+dCtPQkuCgA7',
  'data:image/gif;base64,R0lGODlhGAAKAPABAAAAAP///yH5BAEAAAAALAAAAAAYAAoAAAIqDI5hmNyuHIhyNfsqnFry62GMElHUN2ElSh6LccJtarLue5droouQaCkAADs=',
  'data:image/gif;base64,R0lGODlhDgAGAPABAAAAAP///yH5BAEAAAAALAAAAAAOAAYAAAIQDG4Huay/EHzMUWiDRVrPAgA7',
  'data:image/gif;base64,R0lGODlhJgAUAPABAAAAAP///yH5BAEAAAAALAAAAAAmABQAAAJWhGOpm8i/HHxBTmZvyxrUHnHaBx7ieEJkabJeqkrw5r42OEfv6pBW3jD9WrfTz7dDKIsVXrCZaRJ90mSvV2tRdYfsUqGEymrYTpjcxQF1qyzO40bHFwUAOw==',
  'data:image/gif;base64,R0lGODlhCwAKAPABAAAAAP///yH5BAEAAAAALAAAAAALAAoAAAIUDI5nCcuuXpssJhOyxrJOfnXQWAAAOw==',
  'data:image/gif;base64,R0lGODlhCgAPAPABAAAAAP///yH5BAEAAAAALAAAAAAKAA8AAAIdhBGnF437oEsq0XVxyxG5mFmVsXWkyaCnem0lUAAAOw==',
  'data:image/gif;base64,R0lGODlhCQAIAPABAAAAAP///yH5BAEAAAAALAAAAAAJAAgAAAIRjANwmNasmEuqVRrvoxJuWgAAOw==',
  'data:image/gif;base64,R0lGODlhDAAKAPABAAAAAP///yH5BAEAAAAALAAAAAAMAAoAAAIXDIJwmqaflmMT2vqy3pzGjDjYR1lcUAAAOw==',
  'data:image/gif;base64,R0lGODlhCQAJAPABAAAAAP///yH5BAEAAAAALAAAAAAJAAkAAAIThBGnmBYPIWupMXfoywg7q4BGAQA7',
  'data:image/gif;base64,R0lGODlhIgAIAPABAAAAAP///yH5BAEAAAAALAAAAAAiAAgAAAItRB52wO2cnjQwUgWd1RvdG22f9iTeAkpheVad26IsYmLjTNNuxk+VDyQFh4ACADs='
];

const SPRITE_POSITIONS = [
  { left: '4%', top: '6%' },
  { left: '60.85%', top: '42.45%' },
  { left: '25.71%', top: '78.89%' },
  { left: '80.61%', top: '88.81%' },
  { left: '45.47%', top: '37.26%' },
  { left: '10.33%', top: '73.72%' },
  { left: '67.19%', top: '22.17%' },
  { left: '32.05%', top: '58.62%' },
  { left: '88.91%', top: '7.07%' },
  { left: '36.43%', top: '11.80%' },
  { left: '74.74%', top: '9.21%' },
  { left: '51.06%', top: '85.78%' },
  { left: '59.36%', top: '92.03%' },
  { left: '89.37%', top: '83.19%' },
  { left: '5.67%', top: '89.44%' },
  { left: '15.64%', top: '91.14%' }
];

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

export default function App() {
  const [activeModalTestimonial, setActiveModalTestimonial] = useState(null);
  const [activeNav, setActiveNav] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const headerRef = useRef(null);
  const brandRef = useRef(null);
  const logoRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Force authentic dark theme
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');

    let target = 0;
    let n = 0, r = 0, i = 0;
    let animId = null;
    let lastTime = null;

    const lerp = (start, end, p) => start + (end - start) * p;

    const updateDOM = (hVal, bVal, nVal) => {
      const h = headerRef.current;
      const b = brandRef.current;
      const l = logoRef.current;
      const nav = navRef.current;
      if (!h || !b || !l || !nav) return;

      b.style.transform = `translateX(-50%) translateY(${lerp(0, -40, bVal)}px)`;
      b.style.height = `${lerp(120, 70, bVal)}px`;
      b.style.width = `min(${lerp(650, 1000, bVal)}px, calc(100% - 30px))`;

      l.style.height = `${lerp(60, 48, bVal)}px`;

      nav.style.transform = `translateX(-50%) translateY(${lerp(0, -90, nVal)}px)`;
      nav.style.width = `min(${lerp(650, 1000, nVal)}px, calc(100% - 30px))`;

      // Header background firmly attached to the very top (0px)
      h.style.top = '0px';
      h.style.transform = 'none';
      const navRect = nav.getBoundingClientRect();
      const minH = lerp(230, 145, hVal);
      const targetH = Math.max(minH, navRect.bottom + 14);
      h.style.height = `${targetH}px`;
    };

    const step = (now) => {
      const dt = lastTime ? (now - lastTime) / 1000 : 0.016;
      lastTime = now;
      const u = 1 - Math.exp(-8 * dt);
      const d = 1 - Math.exp(-12 * dt);
      const f = 1 - Math.exp(-10 * dt);
      n += (target - n) * u;
      r += (target - r) * d;
      i += (target - i) * f;

      if (Math.abs(target - n) > 0.001 || Math.abs(target - r) > 0.001 || Math.abs(target - i) > 0.001) {
        updateDOM(n, r, i);
        animId = requestAnimationFrame(step);
      } else {
        n = target;
        r = target;
        i = target;
        updateDOM(n, r, i);
        animId = null;
        lastTime = null;
      }
    };

    let isMobile = window.innerWidth <= 1000;
    const onScroll = () => {
      target = isMobile ? 1 : Math.min(1, Math.max(0, window.scrollY) / 100);
      if (!animId) animId = requestAnimationFrame(step);
    };

    const onResize = () => {
      isMobile = window.innerWidth <= 1000;
      onScroll();
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div id="kyun_root">
      <div
        className="pageSweepTransition"
        style={{ width: '100vw', zIndex: 40, position: 'fixed', background: 'var(--main-bg)' }}
      ></div>

      {/* Header Banner Background */}
      <header ref={headerRef} className="_header_1f85j_9">
        <div className="_overlay_1f85j_24"></div>
      </header>

      {/* Center Brand Box */}
      <div ref={brandRef} className="_brand_1f85j_33">
        <div className="_bgC_1f85j_47">
          <span className="_bgs_1f85j_56"></span>
        </div>
        <img
          ref={logoRef}
          className="_kyun_1f85j_71"
          alt="Kyun logo"
          src="data:image/gif;base64,R0lGODlhKQAMAIABAP///4iIiCH5BAEKAAEALAAAAAApAAwAAAJLDBB5yYre4nlwImsexjBPZ4XXt33eaIriGZ4gSqomu3DsLdur7bbl+oI1SjRY63XDGTWxhTI3oiF7M6gnOP1RrCkdJcNwhlUdUKIAADs="
        />
      </div>

      {/* Nav */}
      <nav ref={navRef} className="_nav_1f85j_83">
        <div className="_navInnerWrapper">
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'home' ? '_active_1f85j_119' : ''}`}
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            home
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'services' ? '_active_1f85j_119' : ''}`}
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('services');
              document.querySelector('[data-home-section-index="3"]')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            services
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'docs' ? '_active_1f85j_119' : ''}`}
            href="#docs"
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('docs');
              document.querySelector('[data-home-section-index="1"]')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            docs
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'account' ? '_active_1f85j_119' : ''}`}
            href="#account"
            onClick={(e) => {
              e.preventDefault();
              setIsAuthOpen(true);
            }}
          >
            account
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="_main_qtodh_1">
        <section className="text-left">
          <main className="_landing_1w2bm_1 relative overflow-hidden">
            {/* Section 0: Welcome Section */}
            <section
              className="_section_1w2bm_5 _welcomeSection_1w2bm_36 relative box-border flex flex-col justify-end overflow-hidden p-0"
              style={{ '--section-z': 40 }}
            >
              {/* Marquee Ticker */}
              <div className="_sdlm_1w2bm_502">
                <span
                  className="_scrollPromptTrack_1w2bm_521 scroll-prompt-marquee"
                  style={{ '--marquee-distance': '2408px', '--marquee-duration': '84s' }}
                >
                  <span className="_scrollPromptGroup_1w2bm_537" aria-hidden="false">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="_scrollPromptUnit_1w2bm_543">
                        SCROLL DOWN
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                        LEARN MORE
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                      </span>
                    ))}
                  </span>
                  <span className="_scrollPromptGroup_1w2bm_537" aria-hidden="true">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <span key={i} className="_scrollPromptUnit_1w2bm_543">
                        SCROLL DOWN
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                        LEARN MORE
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* Background Pixel Sprites Field */}
              <div className="_welcomeSpriteField_1w2bm_98" aria-hidden="true">
                {SPRITE_POSITIONS.map((pos, idx) => (
                  <img
                    key={idx}
                    alt=""
                    className="_welcomeSprite_1w2bm_98"
                    src={SPRITES[idx % SPRITES.length]}
                    style={{ left: pos.left, top: pos.top }}
                  />
                ))}
              </div>

              {/* Welcome Content & Character */}
              <div className="relative z-6 mx-auto box-border flex h-full w-full max-w-[1600px] flex-col items-start justify-end gap-2 px-4 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
                <div className="relative z-7 box-border w-full min-w-0 pt-4 pb-12 lg:w-[600px] lg:max-w-[600px] lg:shrink-0 lg:pb-24">
                  <article className="prose _copyBlock_1w2bm_121 w-full max-w-[600px] text-left">
                    <div className="mb-4">
                      <h1 className="_heroTitle_1w2bm_67 pb-0 mb-0 max-w-none">Welcome</h1>
                      <p className="_subtitle_1w2bm_77">to your new home</p>
                    </div>
                    <p className="max-w-none">
                      Private cloud for humans and agents. Kyun gives you one-click-deploy apps,
                      virtual machines, containers, and hot-attachable block storage without KYC,
                      enterprise theater, or surprise bills.
                    </p>
                    <p className="_priceLine_1w2bm_82 max-w-none" data-testid="price-line">
                      <strong>
                        Start with compute from 1.60 EUR/mo, HDD storage from 5.00 EUR/TB/mo,
                        available in Netherlands, United States and Romania.
                      </strong>
                    </p>
                  </article>
                </div>

                <div className="relative z-6 -ml-4 -mr-8 hidden lg:flex min-h-0 w-full flex-grow self-stretch items-end justify-center lg:justify-end">
                  <div
                    className="relative flex h-full max-h-full w-full max-w-[800px] items-end justify-center lg:justify-end"
                    style={{ maxHeight: 'min(var(--welcome-section-height, 620px), 760px)' }}
                  >
                    <div
                      className="relative flex h-full max-h-full max-w-full items-end justify-center"
                      style={{ transform: 'translateY(-2px)' }}
                    >
                      <img
                        alt="Kyoko"
                        className="relative z-1 block max-w-none"
                        fetchPriority="high"
                        src="/assets/kyoko-DdSesS4Q.gif"
                        style={{
                          aspectRatio: '243 / 234',
                          width: 'calc(min(var(--welcome-section-height, 620px), 760px) * 1.03846)',
                          maxWidth: '100%',
                          height: 'auto',
                          objectFit: 'contain',
                          objectPosition: 'right bottom',
                          imageRendering: 'pixelated',
                          filter: 'var(--welcome-kyoko-filter, brightness(0.9) contrast(0.9) saturate(0.9))'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dither Transition 0 -> 1 */}
            <DitherTransition fromTone="dark" toTone="dark" />

            {/* Section 1: Pushing the envelope (Dark Tone, 3D Rocket + Orbiting Satellites) */}
            <section
              data-home-background-section="true"
              data-home-section-index="1"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 39 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16">
                <ModelStage model="rocket" side="left" mirror={true} tone="dark" />
                <div className="ml-auto flex-1 w-full max-w-none md:w-auto md:max-w-155">
                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7">
                    <h1>Pushing the envelope.</h1>
                    <p>
                      We poured stupid amounts of time into making Kyun the best cloud platform
                      we’ve ever used.
                    </p>
                    <p>
                      All of Kyun’s platform software is built from scratch, by us, for Kyun. One
                      coherent interface for managing all of your services.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 1 -> 2 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 2: Kyun is for the people (Light Tone, 3D Grass + Orbiting Satellites) */}
            <section
              data-home-background-section="true"
              data-home-section-index="2"
              data-home-section-tone="light"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 light"
              style={{ '--section-z': 38 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16">
                <div className="mr-auto text-left flex-1 w-full max-w-none md:w-auto md:max-w-155">
                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7">
                    <h1>Kyun is for the people.</h1>
                    <p>Kyun is not enterprise cloud, and we’re proud of that.</p>
                    <p>
                      No HR speak, no debt collectors. no pay-as-you-go bill waiting at the end of
                      the month.
                    </p>
                    <p>Made by real humans, for real humans. We’re keeping it real.</p>
                  </article>
                </div>
                <ModelStage model="grass" side="right" tone="light" />
              </div>
            </section>

            {/* Dither Transition 2 -> 3 (Light -> Dark) */}
            <DitherTransition fromTone="light" toTone="dark" />

            {/* Section 3: Only pay for what you need (Dark Tone, Specs Picker) */}
            <section
              data-home-background-section="true"
              data-home-section-index="3"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 37 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-350 md:px-5 md:py-12">
                <div className="_demoLayout_1w2bm_139 flex flex-col gap-9 md:grid md:gap-16 md:items-center">
                  <SpecsPicker />
                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7 ml-auto">
                    <h1>Only pay for what you need.</h1>
                    <p>Pick the machine you actually want. Fully customizable specs.</p>
                    <p>
                      Don't need a whole month? Want to downgrade? Get an automatic prorated refund
                      when you delete or downgrade any service.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 3 -> 4 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 4: We're there for you (Light Tone, 3D Speech + Orbiting Satellites) */}
            <section
              data-home-background-section="true"
              data-home-section-index="4"
              data-home-section-tone="light"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 light"
              style={{ '--section-z': 36 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16">
                <div className="mr-auto text-left flex-1 w-full max-w-none md:w-auto md:max-w-155">
                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7">
                    <h1>We’re there for you.</h1>
                    <p>
                      Something went wrong? Need help with a VM, container, Brick, or payment? Have
                      an idea that would make Kyun better?
                    </p>
                    <p>
                      Chat with Kyun from the corner of the page. Kyoko can help right away, and
                      humans can step in when you need us.
                    </p>
                    <p>
                      Don’t like AI? Turn on <strong>Ultra Private Mode</strong> and talk directly to
                      staff.
                    </p>
                  </article>
                </div>
                <ModelStage model="speech" side="right" tone="light" />
              </div>
            </section>

            {/* Dither Transition 4 -> 5 (Light -> Dark) */}
            <DitherTransition fromTone="light" toTone="dark" />

            {/* Section 5: Private, really private (Dark Tone, 3D Lock + Orbiting Satellites) */}
            <section
              data-home-background-section="true"
              data-home-section-index="5"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 35 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-16">
                <ModelStage model="lock" side="left" mirror={true} tone="dark" />
                <div className="ml-auto flex-1 w-full max-w-none md:w-auto md:max-w-155">
                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7 ml-auto">
                    <h1>Private, really private.</h1>
                    <p>
                      When we say Kyun is private, we mean it. We don’t collect or store anything
                      we don’t legitimately need, and we will <strong>never</strong> ask you for ID.
                    </p>
                    <p>
                      Kyun has first-class support for Monero, the most widely used private
                      cryptocurrency.
                    </p>
                    <p>And, since we’re an EU company, we’re also bound by the GDPR.</p>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 5 -> 6 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 6: People stay for a reason (Light Tone, Testimonials) */}
            <section
              data-home-background-section="true"
              data-home-section-index="6"
              data-home-section-tone="light"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 light"
              style={{ '--section-z': 34 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12">
                <div className="prose w-full py-7 text-center md:py-9">
                  <header className="_testimonialsHeader_1w2bm_295 mx-auto mb-8 max-w-170 md:mb-9">
                    <h1 className="mt-0 mb-6 pl-0">People stay for a reason.</h1>
                    <p>
                      The platform matters. The support, transparency, and feeling of being treated
                      like a person matter too.
                    </p>
                  </header>

                  <div className="_testimonialsRail_1w2bm_306">
                    <div className="_testimonialsTrack_1w2bm_341">
                      {[0, 1, 2].map((grpIdx) => (
                        <div
                          key={grpIdx}
                          className="_testimonialsGroup_1w2bm_352"
                          aria-hidden={grpIdx > 0 ? "true" : undefined}
                        >
                          {TESTIMONIALS.map((item) => (
                            <div
                              key={`${item.id}-${grpIdx}`}
                              data-yakiniku="box"
                              className={`relative overflow-hidden _box_19lkn_1 prose _testimonialCard_1w2bm_360 ${
                                item.id === 'kvm' ? '_shortTestimonial_1w2bm_380' : '_longTestimonial_1w2bm_376'
                              }`}
                            >
                              <div className="_testimonialPreview_1w2bm_384">
                                <div className={`_testimonialBody_1w2bm_392 ${item.paragraphs.length > 1 ? '_masked_1w2bm_397' : ''}`}>
                                  <div className="_testimonialFlowShape_1w2bm_402"></div>
                                  {item.paragraphs.map((p, i) => (
                                    <p key={i}>{p}</p>
                                  ))}
                                </div>
                                <div className="_testimonialIdentity_1w2bm_411">
                                  <div className="_testimonialMeta_1w2bm_424">
                                    <strong>{item.name}</strong>
                                    <span>
                                      <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-inherit"
                                      >
                                        {item.site}
                                      </a>
                                    </span>
                                  </div>
                                  <img
                                    className="_testimonialAvatar_1w2bm_441"
                                    src={item.avatar}
                                    alt={item.name}
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                              {item.paragraphs.length > 1 && (
                                <div className="_testimonialActionStrip_1w2bm_454 light">
                                  <button
                                    className="_showMore_1w2bm_464 _button_nf8qc_17"
                                    data-yakiniku="button"
                                    onClick={() => setActiveModalTestimonial(item)}
                                  >
                                    <span className="_content_nf8qc_108">read more</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Dither Transition 6 -> 7 (Light -> Dark) */}
            <DitherTransition fromTone="light" toTone="dark" />

            {/* Section 7: Start small. Stay in control (Dark Tone, CTA) */}
            <section
              data-home-background-section="true"
              data-home-section-index="7"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 33 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12">
                <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7 mx-auto flex flex-col gap-4 p-0 text-center">
                  <h1 className="m-0">Start small. Stay in control.</h1>
                  <p className="m-0 mx-auto">
                    Create only what you need today. Upgrade when the project grows. One monthly
                    price that stays the same until you choose to upgrade.
                  </p>
                  <p className="m-0 mt-3 flex flex-wrap justify-center gap-4">
                    <a className="nou" href="#services" onClick={() => setIsAuthOpen(true)}>
                      <button
                        data-yakiniku="button"
                        className="relative control _loadingPhaseB_nf8qc_68 _button_nf8qc_17"
                      >
                        <span className="_content_nf8qc_108">View Services</span>
                      </button>
                    </a>
                  </p>
                </article>
              </div>
            </section>
          </main>
        </section>

        {/* Footer */}
        <div className="_col_1o6no_1">
          <footer className="_footer_113sd_1 mt-0 flex-col-center">
            <div>
              <a href="/docs/tos">Terms of Service</a>
              <i></i>
              <a href="/docs/aup">Acceptable Use Policy</a>
              <i></i>
              <a href="/docs/privacypolicy">Privacy Policy</a>
              <br />
              <a href="/docs/faqs/">Frequently Asked Questions</a>
              <i></i>
              <a href="/canary.txt">Canary</a>
              <i></i>
              <a href="/keys">PGP</a>
              <i></i>
              <a href="http://kyunnnckhnkl6oevonhwbltenwbgxwxf54mcpvmicphmaeqr5ourgqyd.onion/">
                Tor
              </a>
            </div>

            <div className="_contacts_113sd_46 flex justify-center">
              <a href="https://x.com/kyunhost" target="_blank" rel="noopener noreferrer">
                <img
                  src="data:image/gif;base64,R0lGODlhCQAKAIABAHp6eoiIiCH+EUNyZWF0ZWQgd2l0aCBHSU1QACH5BAEKAAEALAAAAAAJAAoAAAIUhIN4AXnNGIwyqWvXfHdFMymhFRQAOw=="
                  alt="X/Twitter"
                />
              </a>
              <a href="https://matrix.to/#/#chat:kyun.sh" target="_blank" rel="noopener noreferrer">
                <img
                  src="data:image/gif;base64,R0lGODlhCQAKAIABAHp6eoiIiCH5BAEKAAEALAAAAAAJAAoAAAIVjG+gCGn6mpx0VovD27nzz4EYmFkFADs="
                  alt="Matrix"
                />
              </a>
              <a href="mailto:hello@kyun.sh">
                <img
                  src="data:image/gif;base64,R0lGODlhDAAIAIABAHp6eoiIiCH5BAEKAAEALAAAAAAMAAgAAAIUjI+pyw0fDpsTUWjtvbl4H0XgWAAAOw=="
                  alt="Email"
                />
              </a>
              <a href="https://t.me/channelkyun" target="_blank" rel="noopener noreferrer">
                <img
                  src="data:image/gif;base64,R0lGODlhCQAJAIABAHp6eoiIiCH5BAEKAAEALAAAAAAJAAkAAAITjI+pyw3qnGupWhqtrN1m30UAAOw="
                  alt="Telegram"
                />
              </a>
            </div>

            <a
              href="https://kycnot.me/service/kyun"
              target="_blank"
              rel="noopener noreferrer"
              className="nou"
            >
              <small className="bg-d h-8 flex px-2 border items-center gap-4 opacity-60 text-focus">
                <img
                  src="data:image/gif;base64,R0lGODlhMwAHAPAAAAAAAAAAACH5BAEKAAEALAAAAAAzAAcAAAJAjI+py+0PY4p0gYozwXzbzz1BqH0kaVYmmgUvebQxG25vVts6/2w5d0sNez1cb2ck/mS3pPL2y0iXTqZUWj0yCQA7"
                  alt="KYCnot.me"
                  style={{ width: '51px', height: '7px' }}
                />
                <span className="flex gap-2 items-center">
                  <img
                    src="data:image/gif;base64,R0lGODlhBQAFAPAAAAAAAAAAACH5BAEKAAEALAAAAAAFAAUAAAIMjI+py+0Po5y02lsKADs="
                    alt=""
                    style={{ width: '5px', height: '5px' }}
                  />
                  <span className="_kycnotmeScore_113sd_68">5.0</span>
                </span>
              </small>
            </a>

            <p className="_company_113sd_41 text-dark">
              Kyun SRL / 51514103 / J2025021445009
              <br />
              Bv. Constantin Brancoveanu, Nr. 116, Bl. M2/III, Et. 3, Ap. 138, Bucharest, Romania
            </p>
            <p className="_quote_113sd_34">"Privacy is a prerequisite for freedom"</p>
          </footer>
        </div>
      </main>

      {/* Testimonial Full Text Modal */}
      {activeModalTestimonial && (
        <div className="fixed inset-0 z-[10010] bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#f0f0f0] text-[#151515] border-2 border-[#777] max-w-lg w-full p-6 text-sm font-sans relative shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-black/10">
              <span className="font-bold text-base font-mix">{activeModalTestimonial.name}</span>
              <button
                onClick={() => setActiveModalTestimonial(null)}
                className="text-[#555] hover:text-black font-bold text-base cursor-pointer px-1"
              >
                ✕
              </button>
            </div>
            <div className="prose text-left max-h-[60vh] overflow-y-auto pr-2">
              {activeModalTestimonial.paragraphs.map((p, i) => (
                <p key={i} className="mb-3 text-[#222] leading-relaxed text-xs sm:text-sm font-mono">{p}</p>
              ))}
            </div>
            <div className="flex items-center justify-end gap-3 mt-4 pt-3 border-t border-black/10">
              <div className="text-right">
                <strong className="block text-sm">{activeModalTestimonial.name}</strong>
                <a
                  href={activeModalTestimonial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#555] underline"
                >
                  {activeModalTestimonial.site}
                </a>
              </div>
              <img
                className="w-12 h-12 image-pixelated border border-black/15"
                src={activeModalTestimonial.avatar}
                alt={activeModalTestimonial.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {isAuthOpen && (
        <div className="fixed inset-0 z-[10010] bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#181818] border border-white/20 rounded-md max-w-sm w-full p-6 text-xs font-mono text-white">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/10">
              <span className="font-bold uppercase tracking-wider">Account Access</span>
              <button
                onClick={() => setIsAuthOpen(false)}
                className="text-[#888] hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-kyun-text mb-4">
              Enter your master token to access your Kyun console. No KYC, no email, no tracking.
            </p>
            <input
              type="password"
              placeholder="kyn_sec_..."
              className="w-full bg-black border border-white/20 rounded px-3 py-2 text-xs mb-3 text-white focus:outline-none"
            />
            <button
              onClick={() => setIsAuthOpen(false)}
              className="w-full py-2 bg-white text-black font-bold uppercase rounded hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
