import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolio';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-[#03050a] border-t border-slate-900 overflow-hidden pt-16 pb-12">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-900">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xl font-mono font-bold tracking-wider text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-extrabold shadow-glow-sm">
                <Terminal size={18} />
              </div>
              <span>
                SRIDHAR<span className="text-cyan-400">.M</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              {personalInfo.tagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {personalInfo.status}
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-semibold">
              Connect Directly
            </h4>
            <p className="text-xs text-slate-400 font-mono">
              {personalInfo.location} • {personalInfo.email}
            </p>
            <SocialLinks iconSize={18} showLabels={true} />
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-slate-400">
            Engineered with React, Vite, Tailwind CSS & GSAP
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
          >
            <span>Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
