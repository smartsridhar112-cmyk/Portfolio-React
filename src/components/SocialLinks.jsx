import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

const SocialLinks = ({ className = "", iconSize = 20, showLabels = false }) => {
  const links = [
    {
      name: "GitHub",
      href: personalInfo.github,
      icon: Github,
      label: "GitHub Profile",
      color: "hover:text-white hover:border-slate-400 hover:shadow-cyan-500/20"
    },
    {
      name: "LinkedIn",
      href: personalInfo.linkedin,
      icon: Linkedin,
      label: "LinkedIn Profile",
      color: "hover:text-[#0077b5] hover:border-[#0077b5]/50 hover:shadow-blue-500/20"
    },
    {
      name: "Email",
      href: `mailto:${personalInfo.email}`,
      icon: Mail,
      label: "Send Email",
      color: "hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-cyan-500/20"
    }
  ];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((item) => {
        const IconComponent = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className={`flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
          >
            <IconComponent size={iconSize} />
            {showLabels && <span className="text-sm font-medium pr-1">{item.name}</span>}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;

