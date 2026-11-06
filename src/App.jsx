import React, { useState, useEffect, useRef } from 'react';
import ModelStage from './components/ModelStage';

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
    id: 'student',
    name: 'Максим Ковалёв, 10 «Б» класс',
    url: '#download',
    site: 'Капитан сборной, СШ №19',
    avatar: '/assets/testimonial-context-56-DN7bvU5l.png',
    paragraphs: [
      'В приложении всё просто: собрали свою команду 10-х классов, выиграли школьный этап по волейболу и вышли на район. В следующую субботу играем дерби против 7-й гимназии. Теперь субботы ждём всей параллелью!'
    ]
  },
  {
    id: 'teacher',
    name: 'Алексей Николаевич Крюков',
    url: '#download',
    site: 'Учитель физкультуры высшей категории',
    avatar: '/assets/testimonial-preservetube-56-DjHsNEJ4.png',
    paragraphs: [
      'Главный плюс — ноль бумажной волокиты. Списки классов подгружены автоматически, протокол матча заполняется прямо у сетки на телефоне. Договориться об игре с соседней школой теперь занимает ровно 30 секунд.'
    ]
  },
  {
    id: 'deputy',
    name: 'Елена Викторовна Макаренко',
    url: '#download',
    site: 'Зам. директора по воспитательной работе',
    avatar: '/assets/testimonial-kvm-56-BZ6qXm7o.png',
    paragraphs: [
      'Шестой школьный день перестал быть формальностью. Ученики сами выбирают события: кто на районную лигу в спортзал, кто на IT-квиз или мастер-класс. Реальная посещаемость выросла в разы, и всё прозрачно для руководства.'
    ]
  }
];

export default function App() {
  const [activeModalTestimonial, setActiveModalTestimonial] = useState(null);
  const [activeNav, setActiveNav] = useState('home');

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

      l.style.fontSize = `${lerp(52, 34, bVal)}px`;
      l.style.letterSpacing = `${lerp(0.16, 0.1, bVal)}em`;

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

      // Determine active nav section based on scroll position
      const scrollPos = window.scrollY + 160;
      const secDownload = document.querySelector('[data-home-section-index="7"]');
      const secReviews = document.querySelector('[data-home-section-index="6"]');
      const secSolution = document.querySelector('[data-home-section-index="3"]');
      const secFormats = document.querySelector('[data-home-section-index="1"]');

      if (secDownload && scrollPos >= secDownload.offsetTop - 50) {
        setActiveNav('download');
      } else if (secReviews && scrollPos >= secReviews.offsetTop - 50) {
        setActiveNav('reviews');
      } else if (secSolution && scrollPos >= secSolution.offsetTop - 50) {
        setActiveNav('solution');
      } else if (secFormats && scrollPos >= secFormats.offsetTop - 50) {
        setActiveNav('formats');
      } else {
        setActiveNav('home');
      }
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

  // Smooth scroll helper with header offset
  const scrollToSection = (sectionIndex, navKey) => {
    setActiveNav(navKey);
    if (navKey === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(`[data-home-section-index="${sectionIndex}"]`);
    if (el) {
      const topBarHeight = window.innerWidth <= 1000 ? 110 : 130;
      const elTop = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elTop - topBarHeight),
        behavior: 'smooth',
      });
    }
  };

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
        <span
          ref={logoRef}
          className="_kyun_1f85j_71"
        >ЛІГА</span>
      </div>

      {/* Nav */}
      <nav ref={navRef} className="_nav_1f85j_83">
        <div className="_navInnerWrapper">
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'home' ? '_active_1f85j_119' : ''}`}
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(0, 'home');
            }}
          >
            Главная
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'formats' ? '_active_1f85j_119' : ''}`}
            href="#formats"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(1, 'formats');
            }}
          >
            Форматы
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'solution' ? '_active_1f85j_119' : ''}`}
            href="#solution"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(3, 'solution');
            }}
          >
            Решение
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'reviews' ? '_active_1f85j_119' : ''}`}
            href="#reviews"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(6, 'reviews');
            }}
          >
            Отзывы
          </a>
          <a
            className={`nou _link_1f85j_103 ${activeNav === 'download' ? '_active_1f85j_119' : ''}`}
            href="#download"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(7, 'download');
            }}
          >
            Скачать
          </a>
        </div>
      </nav>

      {/* Main Container */}
      <main className="_main_qtodh_1">
        <section className="text-left">
          <main className="_landing_1w2bm_1 relative overflow-hidden">
            {/* Section 0: Welcome Section */}
            <section
              className="_section_1w2bm_5 _welcomeSection_1w2bm_36 relative box-border flex flex-col justify-start overflow-hidden p-0"
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
                        АКТИВНАЯ СУББОТА
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                        ТУРНИРЫ И МАТЧИ
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
                        АКТИВНАЯ СУББОТА
                        <span className="_animDown_1w2bm_553" aria-hidden="true">
                          <span>^</span>
                          <span>^</span>
                          <span>^</span>
                        </span>
                        ТУРНИРЫ И МАТЧИ
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

              {/* Welcome Content & Product Overview */}
              <div className="relative z-6 mx-auto box-border flex w-full max-w-none md:max-w-330 flex-col items-start justify-start gap-6 px-4 md:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-12 pt-2 pb-8">
                <div className="relative z-7 box-border w-full min-w-0 lg:w-[640px] lg:max-w-[640px] lg:shrink-0">
                  <article className="prose _copyBlock_1w2bm_121 w-full max-w-[640px] text-left">
                    <div className="mb-4">
                      <div className="inline-block bg-white/10 text-white border border-white/20 px-3 py-1 text-xs font-mono uppercase tracking-wider mb-3">
                        Платформа 6-го школьного дня
                      </div>
                      <h1 className="_heroTitle_1w2bm_67">
                        Школьные турниры и полезная суббота
                      </h1>
                      <p className="text-base sm:text-lg text-[#ccc] leading-relaxed mt-2 max-w-[560px]">
                        Единая система спортивных турниров, матчей между школами и субботних активностей по всей Беларуси.
                      </p>
                    </div>

                    <p className="max-w-none text-base leading-relaxed text-[#aaa]">
                      Заявки команд за 10 секунд, электронные протоколы матчей и открытый рейтинг школ — прямо в смартфоне.
                    </p>

                    {/* Hero Download Buttons */}
                    <div className="mt-6 flex flex-wrap items-center gap-3">
                      <a
                        href="/liga.apk"
                        download="liga.apk"
                        className="nou"
                      >
                        <button
                          data-yakiniku="button"
                          className="relative control _loadingPhaseB_nf8qc_68 _button_nf8qc_17 bg-white text-black font-bold px-6 py-3 flex items-center gap-2 hover:bg-[#e0e0e0] transition-colors text-base shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                        >
                          <span className="_content_nf8qc_108 flex items-center gap-2.5">
                            <span className="text-base">⬇</span>
                            <span>Скачать .APK (24 MB)</span>
                          </span>
                        </button>
                      </a>

                      <div className="relative inline-block">
                        <button
                          disabled
                          data-yakiniku="button"
                          className="relative control _button_nf8qc_17 bg-[#1c1c1c] text-[#888] border border-[#333] px-4 py-3 cursor-not-allowed flex items-center gap-2 text-sm"
                        >
                          <span className="_content_nf8qc_108">App Store</span>
                        </button>
                        <span className="absolute -top-2.5 -right-2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-black/30 font-mono tracking-wider">
                          СКОРО
                        </span>
                      </div>

                      <div className="relative inline-block">
                        <button
                          disabled
                          data-yakiniku="button"
                          className="relative control _button_nf8qc_17 bg-[#1c1c1c] text-[#888] border border-[#333] px-4 py-3 cursor-not-allowed flex items-center gap-2 text-sm"
                        >
                          <span className="_content_nf8qc_108">Google Play</span>
                        </button>
                        <span className="absolute -top-2.5 -right-2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-black/30 font-mono tracking-wider">
                          СКОРО
                        </span>
                      </div>
                    </div>
                  </article>
                </div>

                <div className="relative z-6 hidden lg:flex min-h-0 w-full flex-grow self-stretch items-center justify-end pr-2">
                  <div className="relative flex flex-col gap-3 w-full max-w-[430px]">

                    {/* Match Card Preview */}
                    <div className="border border-white/20 bg-[#121212] p-5 shadow-2xl">
                      <div className="flex justify-between items-center text-xs font-mono text-[#aaa] mb-4 pb-2.5 border-b border-white/10">
                        <span className="uppercase tracking-wider">Суббота · 11:30 · Волейбол</span>
                        <span className="px-2 py-0.5 bg-white text-black font-bold text-[10px] tracking-wider">МАТЧ ДНЯ</span>
                      </div>
                      
                      <div className="flex justify-between items-center my-3 text-base font-bold text-white">
                        <div className="flex-1">
                          <div className="text-white text-lg font-bold">СШ № 19</div>
                          <div className="text-xs text-[#888] font-mono mt-0.5">Фрунзенский р-н</div>
                        </div>
                        <div className="px-3.5 py-1.5 bg-white/10 border border-white/20 text-white font-mono text-sm font-bold mx-3 tracking-widest">
                          2 : 1
                        </div>
                        <div className="flex-1 text-right">
                          <div className="text-white text-lg font-bold">Гимназия № 7</div>
                          <div className="text-xs text-[#888] font-mono mt-0.5">Партизанский р-н</div>
                        </div>
                      </div>

                      <div className="text-xs text-[#888] font-mono mt-4 pt-3 border-t border-white/10 flex justify-between items-center">
                        <span>Спортзал СШ № 19</span>
                        <span className="text-white font-medium">1/4 финала района</span>
                      </div>
                    </div>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                      <div className="border border-white/15 bg-[#121212] p-3.5">
                        <div className="text-2xl font-bold text-white">480+</div>
                        <div className="text-[11px] text-[#aaa] mt-1">Школ в системе</div>
                      </div>
                      <div className="border border-white/15 bg-[#121212] p-3.5">
                        <div className="text-2xl font-bold text-white">120k</div>
                        <div className="text-[11px] text-[#aaa] mt-1">Учеников</div>
                      </div>
                      <div className="border border-white/15 bg-[#121212] p-3.5">
                        <div className="text-2xl font-bold text-white">0</div>
                        <div className="text-[11px] text-[#aaa] mt-1">Бумаг и справок</div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

            {/* Dither Transition 0 -> 1 */}
            <DitherTransition fromTone="dark" toTone="dark" />

            {/* Section 1: Сквозные турниры (Dark Tone, 3D Rocket + Orbiting Satellites) */}
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
                    <h1>Турниры от школы до республики</h1>
                    <p className="text-base text-[#ccc] leading-relaxed mb-4">
                      Сквозная олимпийская система. Победа на внутришкольном этапе автоматически переводит сборную класса в сетку районных, а затем городских соревнований.
                    </p>

                    <div className="grid grid-cols-3 gap-2 my-4 font-mono text-xs">
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">01. Школа</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Отбор классов</div>
                      </div>
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">02. Район</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Дерби школ</div>
                      </div>
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">03. Финал</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Республика</div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 1 -> 2 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 2: Матчи между школами (Light Tone, 3D Grass + Orbiting Satellites) */}
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
                    <h1>Матчи между соседними школами</h1>
                    <p className="text-base text-[#333] leading-relaxed mb-4">
                      Каждая школа формирует сборные и может вызвать соперников из соседней школы на любую свободную субботу без бумажных согласований.
                    </p>

                    <div className="grid grid-cols-3 gap-2 my-4 font-mono text-xs">
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">01. Вызов</div>
                        <div className="text-[#666] text-[11px] mt-0.5">В приложении</div>
                      </div>
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">02. Зал</div>
                        <div className="text-[#666] text-[11px] mt-0.5">Согласование</div>
                      </div>
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">03. Рейтинг</div>
                        <div className="text-[#666] text-[11px] mt-0.5">Очки района</div>
                      </div>
                    </div>
                  </article>
                </div>
                <ModelStage model="grass" side="right" tone="light" />
              </div>
            </section>

            {/* Dither Transition 2 -> 3 (Light -> Dark) */}
            <DitherTransition fromTone="light" toTone="dark" />

            {/* Section 3: Было бесполезно -> Стало полезно (Dark Tone, Specs Picker + Comparison) */}
            <section
              data-home-background-section="true"
              data-home-section-index="3"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 37 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-350 md:px-5 md:py-12">
                <div className="_demoLayout_1w2bm_139 flex flex-col gap-9 md:grid md:gap-16 md:items-center">
                  {/* How it works — step flow */}
                  <div className="relative z-4 w-full">
                    <div className="mb-5 text-xs uppercase tracking-widest font-mono font-bold text-white">
                      // порядок проведения
                    </div>
                    <div className="flex flex-col">
                      {[
                        { step: '01', title: 'Создание события', desc: 'Преподаватель задаёт формат, дату и спортзал за 1 минуту.' },
                        { step: '02', title: 'Сбор команд', desc: 'Ученики подтверждают состав из готовых списков классов.' },
                        { step: '03', title: 'Судейство онлайн', desc: 'Счёт и фолы фиксируются с телефона прямо у площадки.' },
                        { step: '04', title: 'Итоги в рейтинг', desc: 'Очки автоматически уходят в сводную таблицу района.' },
                      ].map(({ step, title, desc }, i, arr) => (
                        <div key={step} className="flex gap-4 relative">
                          {i < arr.length - 1 && (
                            <div className="absolute left-[20px] top-11 bottom-0 w-px bg-white/15" />
                          )}
                          <div
                            className="flex-shrink-0 w-10 h-10 border border-white/20 bg-white/5 flex items-center justify-center font-mono font-bold text-sm text-white"
                          >{step}</div>
                          <div className="pb-6">
                            <div className="text-[15px] text-white font-bold leading-snug mb-0.5">{title}</div>
                            <div className="text-[13px] text-[#aaa] leading-relaxed">{desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-155 p-4 text-left lg:p-7 ml-auto">
                    <div className="inline-block bg-white/10 text-white border border-white/20 px-3 py-1 text-xs font-mono uppercase tracking-wider mb-3">
                      Автоматизация субботы
                    </div>
                    <h1>Организация без бумажной рутины</h1>
                    <p className="text-base text-[#ccc] leading-relaxed mb-4">
                      Подготовка матчей, регистрация команд и подведение итогов — всё в едином защищённом протоколе без бумажных ведомостей.
                    </p>
                    
                    <div className="flex flex-col gap-2.5 mt-4">
                      <div className="p-3 bg-white/5 border border-white/15">
                        <div className="text-white font-bold font-mono text-xs uppercase mb-0.5">
                          Электронный протокол матча
                        </div>
                        <p className="m-0 text-xs text-[#aaa] leading-relaxed">
                          Фиксация счёта, авторов голов и фолов со смартфона судьи в спортзале.
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/15">
                        <div className="text-white font-bold font-mono text-xs uppercase mb-0.5">
                          Автоматическая турнирная сетка
                        </div>
                        <p className="m-0 text-xs text-[#aaa] leading-relaxed">
                          Мгновенный переход победителей в следующий тур без ручного подсчёта.
                        </p>
                      </div>

                      <div className="p-3 bg-white/5 border border-white/15">
                        <div className="text-white font-bold font-mono text-xs uppercase mb-0.5">
                          Сквозной районный рейтинг
                        </div>
                        <p className="m-0 text-xs text-[#aaa] leading-relaxed">
                          Открытая статистика результатов классов, параллелей и школ района.
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 3 -> 4 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 4: Одиночные мероприятия (Light Tone, 3D Speech + Orbiting Satellites) */}
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
                    <h1>Субботние ивенты: не только спорт</h1>
                    <p className="text-base text-[#333] leading-relaxed mb-4">
                      Единая городская афиша мастер-классов, квизов, хакатонов и экскурсий от центров дополнительного образования, музеев и вузов.
                    </p>

                    <div className="grid grid-cols-3 gap-2 my-4 font-mono text-xs">
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">01. Афиша</div>
                        <div className="text-[#666] text-[11px] mt-0.5">События города</div>
                      </div>
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">02. Запись</div>
                        <div className="text-[#666] text-[11px] mt-0.5">В 1 касание</div>
                      </div>
                      <div className="border border-black/15 bg-black/5 p-2.5">
                        <div className="text-black font-bold text-sm">03. Вход</div>
                        <div className="text-[#666] text-[11px] mt-0.5">По QR-коду</div>
                      </div>
                    </div>
                  </article>
                </div>
                <ModelStage model="speech" side="right" tone="light" />
              </div>
            </section>

            {/* Dither Transition 4 -> 5 (Light -> Dark) */}
            <DitherTransition fromTone="light" toTone="dark" />

            {/* Section 5: Готовая база школы (Dark Tone, 3D Lock + Orbiting Satellites) */}
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
                    <h1>Все школы в единой защищённой базе</h1>
                    <p className="text-base text-[#ccc] leading-relaxed mb-4">
                      Списки учащихся и классов синхронизированы с государственной системой образования. Никаких сторонних паролей или сбора паспортов.
                    </p>

                    <div className="grid grid-cols-3 gap-2 my-4 font-mono text-xs">
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">01. Контур</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Только свои</div>
                      </div>
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">02. Вход</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Номер школы</div>
                      </div>
                      <div className="border border-white/15 bg-white/5 p-2.5">
                        <div className="text-white font-bold text-sm">03. Защита</div>
                        <div className="text-[#888] text-[11px] mt-0.5">Серверы в РБ</div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            {/* Dither Transition 5 -> 6 (Dark -> Light) */}
            <DitherTransition fromTone="dark" toTone="light" />

            {/* Section 6: Отзывы (Light Tone, Testimonials) */}
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
                    <h1 className="mt-0 mb-4 pl-0">Что говорят в школах</h1>
                    <p className="text-sm sm:text-base text-[#444]">
                      Реальные впечатления учеников, преподавателей физической культуры и школьного руководства о платформе «ЛІГА».
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
                              className="relative overflow-hidden _box_19lkn_1 prose _testimonialCard_1w2bm_360 _shortTestimonial_1w2bm_380"
                            >
                              <div className="_testimonialPreview_1w2bm_384">
                                <div className="_testimonialBody_1w2bm_392">
                                  <div className="_testimonialFlowShape_1w2bm_402"></div>
                                  {item.paragraphs.map((p, i) => (
                                    <p key={i} className="text-xs sm:text-sm leading-relaxed">{p}</p>
                                  ))}
                                </div>
                                <div className="_testimonialIdentity_1w2bm_411">
                                  <div className="_testimonialMeta_1w2bm_424">
                                    <strong>{item.name}</strong>
                                    <span>
                                      <span className="text-inherit opacity-75">
                                        {item.site}
                                      </span>
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

            {/* Section 7: Финальный блок (Dark Tone, CTA) */}
            <section
              data-home-background-section="true"
              data-home-section-index="7"
              data-home-section-tone="dark"
              className="_section_1w2bm_5 relative flex items-center overflow-hidden p-0 dark"
              style={{ '--section-z': 33 }}
            >
              <div className="relative z-4 mx-auto w-full box-border max-w-none px-0 py-10 md:max-w-330 md:px-5 md:py-12">
                <article className="prose _copyBlock_1w2bm_121 relative z-4 w-full max-w-none md:max-w-200 p-4 text-left lg:p-8 mx-auto flex flex-col gap-5 p-0 text-center">
                  <h1 className="m-0 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                    Сделайте субботу в вашей школе активной
                  </h1>
                  <p className="m-0 mx-auto max-w-xl text-base text-[#ccc] leading-relaxed">
                    Установите приложение «ЛІГА», соберите сборную своего класса и включайтесь в турниры своего района.
                  </p>
                  
                  {/* Three Download Buttons Repetition */}
                  <div className="m-0 mt-3 flex flex-wrap justify-center items-center gap-4">
                    <a
                      href="/liga.apk"
                      download="liga.apk"
                      className="nou"
                    >
                      <button
                        data-yakiniku="button"
                        className="relative control _loadingPhaseB_nf8qc_68 _button_nf8qc_17 bg-white text-black font-bold px-7 py-3.5 flex items-center gap-3 hover:bg-[#e0e0e0] transition-colors text-base shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      >
                        <span className="_content_nf8qc_108 flex items-center gap-2.5">
                          <span className="text-base">⬇</span>
                          <span>Скачать Android .APK (v1.2 · 24 MB)</span>
                        </span>
                      </button>
                    </a>

                    <div className="relative inline-block">
                      <button
                        disabled
                        data-yakiniku="button"
                        className="relative control _button_nf8qc_17 bg-[#1c1c1c] text-[#888] border border-[#333] px-5 py-3.5 cursor-not-allowed flex items-center gap-2 text-sm"
                      >
                        <span className="_content_nf8qc_108">App Store</span>
                      </button>
                      <span className="absolute -top-2.5 -right-2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-black/30 font-mono tracking-wider">
                        СКОРО
                      </span>
                    </div>

                    <div className="relative inline-block">
                      <button
                        disabled
                        data-yakiniku="button"
                        className="relative control _button_nf8qc_17 bg-[#1c1c1c] text-[#888] border border-[#333] px-5 py-3.5 cursor-not-allowed flex items-center gap-2 text-sm"
                      >
                        <span className="_content_nf8qc_108">Google Play</span>
                      </button>
                      <span className="absolute -top-2.5 -right-2 bg-white text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow border border-black/30 font-mono tracking-wider">
                        СКОРО
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          </main>
        </section>

        {/* Footer */}
        <div className="_col_1o6no_1">
          <footer className="_footer_113sd_1 mt-0 flex-col-center">
            <div className="text-xs text-[#888] space-x-2">
              <a href="#home">Главная</a>
              <i>•</i>
              <a href="#formats">Форматы</a>
              <i>•</i>
              <a href="#solution">Решение</a>
              <i>•</i>
              <a href="#reviews">Отзывы</a>
              <i>•</i>
              <a href="#download">Скачать</a>
            </div>

            <p className="_company_113sd_41 text-dark mt-4">
              «ЛІГА» — Единая платформа соревнований и полезных субботних мероприятий для школ
              <br />
              Минск, Республика Беларусь
            </p>
            <p className="_quote_113sd_34">"Суббота с реальной пользой и азартом для каждого ученика"</p>
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
    </div>
  );
}
