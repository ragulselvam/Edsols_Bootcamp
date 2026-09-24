import React, { useState } from 'react';
import { Compass, Cpu, Wifi, Rocket, CheckCircle2, Award, Calendar, ArrowRight } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { learningJourney, WeekJourney } from '../data/journey';

interface JourneySectionProps {
  onRegisterClick: () => void;
}

export const JourneySection: React.FC<JourneySectionProps> = ({ onRegisterClick }) => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const activeWeek: WeekJourney = learningJourney[activeWeekIndex];

  const getWeekIcon = (phase: string) => {
    switch (phase) {
      case 'DISCOVER':
        return <Compass className="w-5 h-5 text-rose-600" />;
      case 'BUILD':
        return <Cpu className="w-5 h-5 text-rose-600" />;
      case 'CONNECT':
        return <Wifi className="w-5 h-5 text-rose-600" />;
      case 'CREATE':
        return <Rocket className="w-5 h-5 text-rose-600" />;
      default:
        return <Compass className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <section id="journey" className="relative py-24 sm:py-32 bg-white">
      {/* Dynamic Background */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="4-Week Accelerated Curriculum"
          badgeVariant="blue"
          title="FOUR WEEKS."
          highlightText="FROM CURIOUS TO CREATOR."
          subtitle="A carefully engineered 4-stage progression that takes school students from absolute beginners to confident builders of autonomous robots and AI systems."
        />

        {/* 4-Step Interactive Timeline Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {learningJourney.map((week, idx) => {
            const isActive = activeWeekIndex === idx;
            return (
              <button
                key={week.weekNumber}
                onClick={() => setActiveWeekIndex(idx)}
                className={`relative p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer overflow-hidden border ${
                  isActive
                    ? 'bg-white border-rose-400 shadow-md shadow-rose-500/10 -translate-y-1'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {/* Active Indicator Top Glow */}
                {isActive && (
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-600 via-rose-500 to-slate-900" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-white text-slate-500 border border-slate-200'
                    }`}
                  >
                    {week.weekNumber}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    {getWeekIcon(week.phase)}
                  </div>
                </div>

                <div className="font-display font-black text-lg text-slate-900 tracking-tight">
                  {week.phase}
                </div>

                <div className="text-xs text-slate-500 mt-1 truncate font-medium">
                  {week.visualTag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Week Deep-Dive Showcase Deck */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-edsols-card transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Summary & Activities (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                  {activeWeek.weekNumber} · {activeWeek.phase} PHASE
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-rose-600" />
                  2 Weekend Sessions (6 Hours of Lab)
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {activeWeek.theme}
                </h3>
                <p className="text-sm font-bold text-rose-600 mt-1 font-mono">
                  {activeWeek.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {activeWeek.description}
                </p>
              </div>

              {/* Hands-on Activities */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3">
                  Hands-on Lab Experiments:
                </h4>
                <div className="space-y-2.5">
                  {activeWeek.handsOnActivities.map((act, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="h-5 w-5 rounded-lg bg-rose-100 text-rose-700 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs text-slate-700 font-medium">{act}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Key Topics & Week Milestone Deliverable (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Syllabus Topics */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold mb-3 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-rose-600" /> Core Technical Modules:
                </h4>
                <ul className="space-y-2">
                  {activeWeek.keyTopics.map((topic, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 mt-0.5 flex-shrink-0" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestone Deliverable Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50/50 to-pink-50/30 border border-rose-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-rose-600" />
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-800 font-bold">
                    Week Milestone Deliverable:
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-snug">
                  {activeWeek.deliverable}
                </p>
                <div className="mt-4 pt-3 border-t border-rose-200 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Verified by Mentor
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onRegisterClick}
                    icon={<ArrowRight className="w-3 h-3" />}
                    className="text-xs py-1.5 px-3"
                  >
                    Enroll Cohort
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
