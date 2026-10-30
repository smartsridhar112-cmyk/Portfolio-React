import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Code, 
  ExternalLink, 
  X, 
  FileCheck 
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../data/portfolio';
import { coreSkills } from '../data/skills';
import { useGsapTimeline } from '../hooks/useGsap';

const Resume = () => {
  const [resumeExists, setResumeExists] = useState(false);
  const [checkingFile, setCheckingFile] = useState(true);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const resumeRef = useRef(null);

  const resumePath = '/full%20stack%20resume%20-3.pdf';

  useEffect(() => {
    fetch(resumePath, { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type');
        if (res.ok && contentType && contentType.includes('pdf')) {
          setResumeExists(true);
        } else {
          setResumeExists(false);
        }
      })
      .catch(() => {
        setResumeExists(false);
      })
      .finally(() => {
        setCheckingFile(false);
      });
  }, []);

  useGsapTimeline((gsap, ScrollTrigger) => {
    gsap.from('.resume-card', {
      scrollTrigger: {
        trigger: resumeRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  }, [], resumeRef);

  const handleDownload = (e) => {
    if (!resumeExists) {
      e.preventDefault();
      setShowSetupModal(true);
    }
  };

  const handleView = () => {
    if (resumeExists) {
      setPreviewModalOpen(true);
    } else {
      setShowSetupModal(true);
    }
  };

  return (
    <section 
      id="resume" 
      ref={resumeRef}
      className="relative py-24 md:py-32 bg-[#05070e] overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38rem] h-[38rem] rounded-full bg-cyan-600/10 blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Curriculum Vitae"
          title="My Resume"
          subtitle="Explore my education, skills, projects, training, and professional experience."
        />

        <div className="resume-card max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#0b0f19] border border-cyan-500/30 p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-glow-sm">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  Sridhar M — Full Stack Résumé
                </h3>
                <p className="text-xs font-mono text-cyan-400 mt-1">
                  Format: PDF • Updated 2026 • Python Full Stack Developer
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <button
                onClick={handleView}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-sm font-semibold text-white hover:border-cyan-400 hover:text-cyan-300 transition-all shadow-md"
              >
                <Eye size={16} />
                <span>View Resume</span>
              </button>

              <a
                href={resumeExists ? resumePath : '#'}
                download={resumeExists ? "Sridhar_M_Resume.pdf" : undefined}
                onClick={handleDownload}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-sm font-bold text-black hover:opacity-95 transition-all shadow-glow hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download size={16} />
                <span>Download PDF</span>
              </a>
            </div>
          </div>

          {!resumeExists && !checkingFile && (
            <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
              <AlertCircle size={18} className="shrink-0 text-amber-400 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold text-amber-300">Configurable Résumé Setup:</span> The file <code className="bg-amber-950/60 px-1.5 py-0.5 rounded text-amber-200 font-mono">public/resume.pdf</code> can be added directly to the project. Meanwhile, your comprehensive digital resume is fully accessible below.
                <button 
                  onClick={() => setShowSetupModal(true)}
                  className="ml-2 underline font-semibold text-white hover:text-amber-100"
                >
                  View Setup Details
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 space-y-8">
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-2xl font-black text-white">{personalInfo.name}</h4>
                  <p className="text-sm font-mono text-cyan-400 font-semibold">{personalInfo.role}</p>
                </div>
                <div className="text-xs font-mono text-slate-400 space-y-1 md:text-right">
                  <p>{personalInfo.location}</p>
                  <p>{personalInfo.email}</p>
                </div>
              </div>
              <p className="mt-4 text-xs md:text-sm text-slate-300 leading-relaxed pt-4 border-t border-slate-800">
                {personalInfo.about}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <h5 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
                  <GraduationCap size={18} />
                  Education & Training
                </h5>
                <div className="space-y-4">
                  {personalInfo.education.map((edu, idx) => (
                    <div key={idx} className="border-l-2 border-slate-800 pl-3">
                      <p className="text-sm font-bold text-white">{edu.degree}</p>
                      <p className="text-xs font-mono text-slate-400">{edu.institution} • {edu.year}</p>
                      <p className="text-xs text-slate-400 mt-1">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <h5 className="flex items-center gap-2 text-sm font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4">
                  <Code size={18} />
                  Technical Competencies
                </h5>
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((sk) => (
                    <span 
                      key={sk.name}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                    >
                      {sk.name}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-slate-800">
                  <p className="text-xs font-mono text-slate-400">
                    <strong className="text-white">Core Focus:</strong> Full-stack web application development, relational schema design, REST APIs, and modern responsive frontends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSetupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-cyan-500/40 p-6 md:p-8 shadow-2xl">
            <button
              onClick={() => setShowSetupModal(false)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FileCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Configuring Your Resume PDF</h3>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed">
              To enable 1-click direct downloading of your physical résumé document:
            </p>

            <ol className="mt-4 space-y-3 text-xs font-mono bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">1.</span>
                <span>Copy your finalized PDF file into:</span>
              </li>
              <li className="pl-4 text-cyan-300 break-all font-semibold">
                public/full stack resume -3.pdf
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">2.</span>
                <span>The website will automatically detect it and serve instant direct downloads and preview modal!</span>
              </li>
            </ol>

            <button
              onClick={() => setShowSetupModal(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-cyan-500 text-black font-semibold text-xs tracking-wider uppercase hover:opacity-90"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {previewModalOpen && resumeExists && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-4xl h-[85vh] rounded-2xl bg-slate-900 border border-cyan-500/30 overflow-hidden flex flex-col shadow-2xl">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <span className="text-sm font-mono text-cyan-400 font-medium">Resume Preview — Sridhar M</span>
              <button
                onClick={() => setPreviewModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <iframe 
              src={resumePath} 
              title="Resume Preview" 
              className="w-full flex-1 bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Resume;
