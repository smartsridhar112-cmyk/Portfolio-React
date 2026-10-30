import React from 'react';
import { 
  Code2, 
  Server, 
  Network, 
  Atom, 
  FileCode, 
  Layout, 
  Palette, 
  Sparkles, 
  Boxes, 
  Database, 
  GitBranch, 
  Github 
} from 'lucide-react';

const iconMap = {
  Code2,
  Server,
  Network,
  Atom,
  FileCode,
  Layout,
  Palette,
  Sparkles,
  Boxes,
  Database,
  GitBranch,
  Github
};

const SkillBadge = ({ skill, className = "" }) => {
  const IconComponent = iconMap[skill.icon] || Code2;

  const getTechColor = (name) => {
    switch (name) {
      case 'Python':
        return 'from-yellow-500/20 to-blue-500/20 border-yellow-500/30 text-yellow-300';
      case 'Django':
      case 'Django REST Framework':
        return 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-300';
      case 'React':
        return 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300';
      case 'JavaScript':
        return 'from-amber-500/20 to-yellow-500/20 border-amber-500/30 text-amber-300';
      case 'Tailwind CSS':
        return 'from-sky-500/20 to-cyan-500/20 border-sky-500/30 text-sky-300';
      case 'MySQL':
        return 'from-blue-500/20 to-indigo-500/20 border-blue-500/30 text-blue-300';
      case 'Git':
      case 'GitHub':
        return 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300';
      default:
        return 'from-cyan-500/20 to-indigo-500/20 border-cyan-500/30 text-cyan-300';
    }
  };

  const colorClasses = getTechColor(skill.name);

  return (
    <div 
      className={`skill-badge group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800/80 hover:-translate-y-1 hover:shadow-glow-sm cursor-default ${className}`}
    >
      <div className={`p-2 rounded-lg bg-gradient-to-br border ${colorClasses} transition-transform duration-300 group-hover:scale-110`}>
        <IconComponent size={20} />
      </div>
      <div>
        <p className="font-semibold text-slate-100 text-sm tracking-wide group-hover:text-cyan-300 transition-colors">
          {skill.name}
        </p>
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          {skill.category}
        </span>
      </div>
    </div>
  );
};

export default SkillBadge;
