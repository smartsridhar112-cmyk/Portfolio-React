import React, { useState, useRef } from 'react';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { useGsapTimeline } from '../hooks/useGsap';
import { Github, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const sectionRef = useRef(null);

  const categories = ['All', 'Full Stack', 'Web Application', 'Frontend & Animation'];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  useGsapTimeline((gsap, ScrollTrigger) => {
    gsap.from('.project-card-wrapper', {
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    });
  }, [activeFilter], sectionRef);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#060913] overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-0 w-80 h-80 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Portfolio Showcase"
          title="Featured Projects & Applications"
          subtitle="A showcase of real-world full-stack architectures, relational databases, REST APIs, and responsive user interfaces."
        />

        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-glow-sm scale-105'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <div key={project.id} className="project-card-wrapper">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0d1424] via-slate-900 to-[#0d1424] border border-cyan-500/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 shrink-0">
              <Github size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">Looking for more source code?</h4>
              <p className="text-xs text-slate-400 font-mono mt-1">
                Explore my repositories, commit activity, and backend experiments on GitHub.
              </p>
            </div>
          </div>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-white hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-md shrink-0"
          >
            <span>Visit GitHub Profile</span>
            <Sparkles size={16} className="text-cyan-400" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
