import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolio';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['home', 'about', 'projects', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#05070e]/85 backdrop-blur-xl border-b border-slate-800/80 shadow-lg shadow-black/40 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="group flex items-center gap-2 text-lg sm:text-xl font-mono font-bold tracking-wider text-white"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-black font-extrabold shadow-glow-sm group-hover:scale-105 transition-transform">
              <Terminal size={18} />
            </div>
            <span>
              SRIDHAR<span className="text-cyan-400">.M</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 rounded-full p-1.5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-semibold shadow-glow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono font-semibold text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-500 hover:text-black transition-all duration-300 shadow-glow-sm"
            >
              Let's Connect
              <ArrowUpRight size={15} />
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070b16]/95 backdrop-blur-2xl border-b border-slate-800 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-sm font-mono font-medium flex items-center justify-between ${
                    isActive
                      ? 'bg-cyan-500 text-black font-semibold'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-black"></span>}
                </a>
              );
            })}
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="mt-4 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-mono font-bold text-sm"
            >
              Contact Me
              <ArrowUpRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
