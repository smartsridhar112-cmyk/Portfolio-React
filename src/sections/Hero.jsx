import React, { useRef, useState, useEffect } from 'react';
import { ArrowDown, Code2, Sparkles, Terminal, Send, Database, Layers, Server, Cpu } from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import SocialLinks from '../components/SocialLinks';
import PortraitCanvas from '../components/PortraitCanvas';
import { useGsapTimeline, prefersReducedMotion } from '../hooks/useGsap';

const Hero = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const contentWrapperRef = useRef(null);
  const stage1Ref = useRef(null);
  const stage2Ref = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useGsapTimeline((gsap, ScrollTrigger) => {
    if (prefersReducedMotion()) return;

    const isDesktop = window.innerWidth >= 1024;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
        const p = self.progress;

        if (imageWrapperRef.current && isDesktop) {
          gsap.set(imageWrapperRef.current, {
            x: `${-p * 12}%`,
            scale: 1 + p * 0.05
          });
        }

        if (stage1Ref.current) {
          if (p <= 0.15) {
            gsap.set(stage1Ref.current, { opacity: 1, x: 0, y: 0, scale: 1, pointerEvents: 'auto' });
          } else if (p < 0.40) {
            const factor = (p - 0.15) / 0.25;
            gsap.set(stage1Ref.current, {
              opacity: 1 - factor,
              x: 40 * factor,
              y: -25 * factor,
              scale: 1 - 0.04 * factor,
              pointerEvents: factor > 0.8 ? 'none' : 'auto'
            });
          } else {
            gsap.set(stage1Ref.current, { opacity: 0, pointerEvents: 'none' });
          }
        }

        if (stage2Ref.current) {
          if (p < 0.35) {
            gsap.set(stage2Ref.current, { opacity: 0, x: 30, pointerEvents: 'none' });
          } else if (p >= 0.35 && p <= 0.55) {
            const factor = (p - 0.35) / 0.20;
            gsap.set(stage2Ref.current, {
              opacity: factor,
              x: 30 * (1 - factor),
              scale: 0.96 + 0.04 * factor,
              pointerEvents: factor > 0.3 ? 'auto' : 'none'
            });
          } else if (p > 0.55 && p < 0.80) {
            gsap.set(stage2Ref.current, { opacity: 1, x: 0, scale: 1, pointerEvents: 'auto' });
          } else if (p >= 0.80 && p <= 0.98) {
            const factor = (p - 0.80) / 0.18;
            gsap.set(stage2Ref.current, {
              opacity: 1 - factor,
              x: 30 * factor,
              scale: 1 - 0.03 * factor,
              pointerEvents: 'none'
            });
          } else {
            gsap.set(stage2Ref.current, { opacity: 0, pointerEvents: 'none' });
          }
        }
      }
    });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(imageWrapperRef.current, { opacity: 0, x: -50, duration: 1.0 })
      .from('.hero-badge', { opacity: 0, y: 20, duration: 0.7 }, '-=0.6')
      .from('.hero-heading-1', { opacity: 0, y: 25, duration: 0.7 }, '-=0.5')
      .from('.hero-role', { opacity: 0, scale: 0.95, y: 15, duration: 0.7 }, '-=0.5')
      .from('.hero-desc', { opacity: 0, y: 15, duration: 0.7 }, '-=0.5')
      .from('.hero-actions', { opacity: 0, y: 15, duration: 0.6 }, '-=0.4')
      .from('.hero-socials', { opacity: 0, y: 10, duration: 0.5 }, '-=0.4');

    return () => {
      st.kill();
    };
  }, [], containerRef);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const elPos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elPos - offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" ref={containerRef} className="relative w-full bg-[#05070e] overflow-hidden">
      <div className="relative w-full h-[650px] overflow-hidden flex flex-col lg:flex-row items-center">

        <div
          ref={imageWrapperRef}
          className="absolute lg:relative left-0 top-8 w-full lg:w-1/2 h-full z-0 lg:z-10 flex items-center justify-center p-4 lg:p-8"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-[4/4] rounded-3xl overflow-hidden border-2 border-cyan-500/40 shadow-glow bg-slate-950 z-10">
            <PortraitCanvas
              scrollProgress={scrollProgress}
              initialFitMode="cover"
              scale={1.0}
              verticalFocus={0.2}
              horizontalFocus={0.5}
            />
          </div>

          <div className="absolute top-1/3 left-1/4 w-[28rem] h-[28rem] rounded-full bg-cyan-600/20 blur-[130px] pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#05070e] via-transparent to-[#05070e]/80 lg:hidden pointer-events-none"></div>
        </div>

        <div
          ref={contentWrapperRef}
          className="relative z-10 w-full lg:w-1/2 h-full flex flex-col justify-center items-start p-[10px] pt-20 lg:pt-[10px] overflow-hidden"
        >

          <div
            ref={stage1Ref}
            className="w-full flex flex-col items-start text-left p-[10px]"
          >
            <div className="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-cyan-300 bg-slate-950/80 backdrop-blur-md border border-cyan-500/40 shadow-glow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>HELLO, WORLD!</span>
            </div>

            <h1 className="hero-heading-1 mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-xl">
              Hi, I'm <span className="text-white hover:text-cyan-300 transition-colors">Sridhar</span>
            </h1>

            <div className="hero-role mt-2 text-xl sm:text-3xl lg:text-4xl font-extrabold drop-shadow-md">
              <span className="text-gradient-cyan">
                {personalInfo.role}
              </span>
            </div>

            <p className="hero-desc mt-4 text-sm sm:text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed font-light drop-shadow-sm">
              {personalInfo.tagline}
            </p>

            <div className="hero-actions mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => scrollTo('projects')}
                className="group relative inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:opacity-95 transition-all duration-300 shadow-glow hover:scale-105 active:scale-95"
              >
                <span>View Projects</span>
                <Terminal size={15} className="transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold text-white bg-slate-950/80 backdrop-blur-md border border-slate-700/80 hover:border-cyan-400 hover:text-cyan-300 hover:bg-slate-900/90 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Contact Me</span>
                <Send size={15} />
              </button>
            </div>

            <div className="hero-socials mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center gap-4 w-full">
              <SocialLinks iconSize={18} />
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-slate-950/70 px-3 py-1 rounded-full border border-slate-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{personalInfo.location}</span>
              </div>
            </div>

          </div>

          <div
            ref={stage2Ref}
            className="absolute inset-y-0 right-0 w-full flex flex-col justify-center items-start text-left p-[10px] opacity-0 pointer-events-none"
          >
            <div className="w-full flex flex-col items-start p-[10px]">

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 mb-3 shadow-glow-sm">
                <Sparkles size={13} className="text-cyan-400" />
                <span>FULL STACK ARCHITECTURE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-lg leading-tight">
                Engineering robust Python backends with expressive modern frontends.
              </h2>

              <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-md font-light leading-relaxed">
                From relational MySQL schema design and Django REST endpoints to reactive component states built with React and Tailwind CSS.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-lg">
                <div className="p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-cyan-500/30 text-left">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center mb-2">
                    <Server size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">Django REST</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">APIs & Authentication</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-sky-500/30 text-left">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center mb-2">
                    <Layers size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">React & Vite</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">Reactive Modern UI</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-blue-500/30 text-left">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center mb-2">
                    <Database size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">MySQL Database</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">Schemas & ORM Logic</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/90 backdrop-blur-xl border border-indigo-500/30 text-left">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center mb-2">
                    <Cpu size={16} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">GSAP Motion</h4>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">ScrollTrigger & Canvas</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="absolute bottom-4 right-[10px] z-20 flex items-center gap-2 pointer-events-none p-[10px]">
          <div className="w-20 h-1 rounded-full bg-slate-800/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-100"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300/80">
            <span>SCROLL</span>
            <ArrowDown size={11} className="animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
