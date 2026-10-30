import React from 'react';

const SectionHeading = ({ badge, title, subtitle, centered = true, className = "" }) => {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? 'text-center' : 'text-left'} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono tracking-wider uppercase bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          {badge}
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-400 font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex items-center gap-2 ${centered ? 'justify-center' : 'justify-start'}`}>
        <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-glow-sm"></div>
        <div className="h-0.5 w-12 bg-gradient-to-l from-cyan-500 to-transparent"></div>
      </div>
    </div>
  );
};

export default SectionHeading;

