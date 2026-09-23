import React, { useState } from 'react';
import {
  Code2,
  Bot,
  BrainCircuit,
  Network,
  Zap,
  Lightbulb,
  Binary,
  Sparkles,
  Wrench,
  Users2,
  MessageSquareCode,
  Layers,
  Award,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlowingCard } from '../components/visual/GlowingCard';
import { BrandLogo } from '../components/common/BrandLogo';
import { skillsData } from '../data/skills';

export const SkillsSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-rose-600" />,
    Bot: <Bot className="w-5 h-5 text-rose-600" />,
    BrainCircuit: <BrainCircuit className="w-5 h-5 text-rose-600" />,
    Network: <Network className="w-5 h-5 text-rose-600" />,
    Zap: <Zap className="w-5 h-5 text-rose-600" />,
    Lightbulb: <Lightbulb className="w-5 h-5 text-rose-600" />,
    Binary: <Binary className="w-5 h-5 text-rose-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-rose-600" />,
    Wrench: <Wrench className="w-5 h-5 text-slate-700" />,
    Users2: <Users2 className="w-5 h-5 text-rose-600" />,
    MessageSquareCode: <MessageSquareCode className="w-5 h-5 text-rose-600" />,
    Layers: <Layers className="w-5 h-5 text-rose-600" />,
  };

  const displayedSkills = showAll ? skillsData : skillsData.slice(0, 4);

  return (
    <section id="skills" className="relative py-24 sm:py-32 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Future-Ready Competencies"
          badgeVariant="blue"
          title="SKILLS THAT GO"
          highlightText="BEYOND THE CLASSROOM"
          subtitle="We cultivate the technical rigor, computational intuition, and collaborative habits demanded by premier global universities and high-growth engineering careers."
        />

        {/* Dynamic Technology Skills Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {displayedSkills.map((skill) => (
            <GlowingCard
              key={skill.id}
              glowColor="blue"
              techCorners
              className="p-5 sm:p-6 group flex flex-col justify-between bg-white border border-slate-200/90 shadow-edsols-card transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-rose-300 group-hover:scale-110 transition-all">
                    {iconMap[skill.icon]}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {skill.level}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed font-medium">
                  {skill.summary}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-1">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Impact:</span>
                <span className="text-[11px] text-slate-700 font-semibold leading-snug">
                  {skill.realWorldApplication}
                </span>
              </div>
            </GlowingCard>
          ))}
        </div>

        {/* Show More / Show Less Toggle */}
        <div className="mt-8 mb-16 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/40 shadow-sm font-semibold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer"
          >
            <span>{showAll ? 'Show Fewer Skills' : `Show All ${skillsData.length} Competencies (${skillsData.length - 4} More)`}</span>
            {showAll ? (
              <ChevronUp className="w-4 h-4 text-rose-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-rose-600" />
            )}
          </button>
        </div>

        {/* Certificate of Completion Showcase Banner */}
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-xl overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-rose-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-rose-300 font-bold">
                  Official Credentialing & Verified Portfolio
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Official EDSOLS Bootcamp Certificate of Completion
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                Graduates receive an official, cryptographically verifiable certificate detailing their completed engineering hours, mastery across Robotics, IoT, and Computer Vision, and their Demo Day capstone invention score.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  Verified Engineering Portfolio
                </span>
                <span className="flex items-center gap-1.5 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-rose-400" />
                  Demonstrated Hardware Fluency
                </span>
              </div>
            </div>

            {/* Visual Credential Badge */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-slate-800/90 border border-rose-500/30 shadow-2xl text-center flex flex-col items-center max-w-xs w-full">
                <div className="mb-4">
                  <BrandLogo theme="dark" size="sm" showTagline={false} />
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 border border-rose-500/40 flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-rose-400" />
                </div>
                <span className="text-sm font-bold text-white">
                  Official Innovation Credential
                </span>
                <span className="text-xs text-slate-400 font-mono mt-1">
                  Robotics · IoT · AI Mastery
                </span>
                <span className="mt-3 inline-block text-[10px] font-mono text-rose-300 bg-rose-500/15 px-2.5 py-1 rounded-full border border-rose-500/30 font-bold">
                  ISSUED AT DEMO DAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
