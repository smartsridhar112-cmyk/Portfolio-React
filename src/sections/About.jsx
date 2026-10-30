import React, { useRef } from 'react';
import {
  GraduationCap,
  Briefcase,
  CheckCircle,
  Layout,
  Server,
  Database,
  Zap
} from 'lucide-react';
import { personalInfo } from '../data/portfolio';
import { coreSkills, highlightCards } from '../data/skills';
import SectionHeading from '../components/SectionHeading';
import SkillBadge from '../components/SkillBadge';
import { useGsapTimeline } from '../hooks/useGsap';

const iconMap = {
  Layout,
  Server,
  Database,
  Zap
};

const About = () => {
  const aboutRef = useRef(null);

  useGsapTimeline((gsap, ScrollTrigger) => {
    gsap.from('.about-card', {
      scrollTrigger: {
        trigger: '.about-cards-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      y: 24,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out'
    });

    gsap.from('.skill-badge-item', {
      scrollTrigger: {
        trigger: '.skills-grid-container',
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      scale: 0.85,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: 'back.out(1.5)'
    });

    gsap.from('.timeline-item', {
      scrollTrigger: {
        trigger: '.timeline-container',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      x: -30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out'
    });
  }, [], aboutRef);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative py-24 md:py-32 bg-[#05070e] overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-blue-700/10 blur-[130px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="About Me"
          title="Passion for Clean Code & Practical Engineering"
          subtitle={personalInfo.about}
        />

        <div className="about-cards-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {highlightCards.map((card) => {
            const IconComponent = iconMap[card.icon] || Zap;
            return (
              <div
                key={card.id}
                className="about-card group relative p-6 rounded-2xl bg-gradient-to-b from-[#0e1424] to-[#080d19] border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 shadow-glow-sm">
                    <IconComponent size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400/80 mb-3">
                    {card.tagline}
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {card.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
                Technical Toolkit
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-1">
                Core Technologies & Frameworks
              </h3>
            </div>
            <p className="mt-2 md:mt-0 text-sm text-slate-400 max-w-md">
              Specialized in the Python ecosystem and modern reactive frontend tools.
            </p>
          </div>

          <div className="skills-grid-container grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {coreSkills.map((skill) => (
              <div key={skill.name} className="skill-badge-item">
                <SkillBadge skill={skill} />
              </div>
            ))}
          </div>
        </div>

        <div className="timeline-container grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="timeline-item p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25">
                <GraduationCap size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Education & Certification</h3>
                <p className="text-xs font-mono text-slate-400">Formal Academic & Technical Training</p>
              </div>
            </div>

            <div className="space-y-6">
              {personalInfo.education.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-cyan-500/30 group">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#05070e] border-2 border-cyan-400 group-hover:bg-cyan-400 transition-colors"></div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                    {item.year}
                  </span>
                  <h4 className="mt-2 text-base font-bold text-white">
                    {item.degree}
                  </h4>
                  <p className="text-xs font-medium text-slate-400 font-mono mt-0.5">
                    {item.institution}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-item p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/25">
                <Briefcase size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Professional Experience</h3>
                <p className="text-xs font-mono text-slate-400">Practical Development & Implementation</p>
              </div>
            </div>

            <div className="space-y-6">
              {personalInfo.experience.map((item, idx) => (
                <div key={idx} className="relative pl-6 border-l-2 border-blue-500/30 group">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#05070e] border-2 border-blue-400 group-hover:bg-blue-400 transition-colors"></div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-blue-950/80 border border-blue-500/30 text-blue-300">
                      {item.period}
                    </span>
                    <span className="text-xs font-mono text-slate-400">• {item.organization}</span>
                  </div>
                  <h4 className="mt-2 text-base font-bold text-white">
                    {item.role}
                  </h4>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
