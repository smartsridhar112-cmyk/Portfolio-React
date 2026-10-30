import React, { useState } from 'react';
import { ExternalLink, Github, CheckCircle2, ChevronRight, X } from 'lucide-react';

const ProjectCard = ({ project, index }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="project-card group flex flex-col justify-between rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0b0f19] border border-slate-800/80 overflow-hidden transition-all duration-500 hover:border-cyan-500/40 hover:shadow-glow-sm hover:-translate-y-1.5">
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-slate-950/40 to-transparent"></div>

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400">
              {project.category}
            </span>
            {project.featured && (
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-amber-500/10 backdrop-blur-md border border-amber-500/30 text-amber-300">
                Featured
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-7 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
              {project.title}
            </h3>
            <p className="mt-2.5 text-sm text-slate-400 leading-relaxed line-clamp-3">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/70 border border-slate-700/60 text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Details & Architecture
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>

            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source Code on GitHub"
                  className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <Github size={16} />
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target={project.demo.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  aria-label="View Project Demo"
                  className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-slate-900 border border-cyan-500/30 p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                {project.category}
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-white">
              {project.title}
            </h3>
            <p className="mt-2 text-sm text-cyan-400/90 font-mono">
              {project.subtitle}
            </p>

            <div className="my-5 rounded-xl overflow-hidden aspect-video border border-slate-800">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
              <p>{project.description}</p>

              <div>
                <h4 className="font-semibold text-white mb-2 text-base">Key Technical Implementations:</h4>
                <ul className="space-y-2">
                  {project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2 text-base">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-md text-xs font-mono bg-slate-800 border border-slate-700 text-cyan-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-slate-800 flex items-center justify-end gap-3">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              )}
              {project.demo && (
                <a
                  href={project.demo}
                  target={project.demo.startsWith('http') ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-sm font-semibold text-black hover:opacity-95 transition-opacity"
                >
                  <ExternalLink size={16} />
                  Live Preview
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
