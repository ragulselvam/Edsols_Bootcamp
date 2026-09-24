import React from 'react';
import { Calendar, Clock, GraduationCap, Users2 } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlowingCard } from '../components/visual/GlowingCard';
import { bootcampData } from '../data/bootcamp';

export const OverviewSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Calendar: <Calendar className="w-6 h-6 text-rose-600" />,
    Clock: <Clock className="w-6 h-6 text-rose-600" />,
    GraduationCap: <GraduationCap className="w-6 h-6 text-rose-600" />,
    Users: <Users2 className="w-6 h-6 text-rose-600" />,
  };

  const glowColorMap: Record<string, 'blue' | 'cyan' | 'purple' | 'emerald'> = {
    '01': 'blue',
    '02': 'cyan',
    '03': 'purple',
    '04': 'emerald',
  };

  return (
    <section id="overview" className="relative py-24 sm:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Bootcamp Overview"
          badgeVariant="blue"
          title="One Month. Three Technologies."
          highlightText="Real Projects."
          subtitle="A comprehensive, weekend-based practical technology program designed specifically for young innovators in Grades 6–12 by EDSOLS. Students learn through direct experimentation, guided engineering builds, and creative challenge sprints."
        />

        {/* 4 Large Telemetry Statistic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bootcampData.stats.map((stat) => (
            <GlowingCard
              key={stat.number}
              glowColor={glowColorMap[stat.number] || 'blue'}
              className="p-6 sm:p-7 group flex flex-col justify-between bg-white border border-slate-200/90 shadow-edsols-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-3xl font-black text-slate-300 group-hover:text-rose-500/60 transition-colors">
                    {stat.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 group-hover:border-rose-300 transition-colors">
                    {iconMap[stat.iconName]}
                  </div>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight">
                  {stat.title}
                </h3>

                <p className="text-sm font-bold text-rose-600 mt-1">
                  {stat.subtitle}
                </p>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            </GlowingCard>
          ))}
        </div>
      </div>
    </section>
  );
};

