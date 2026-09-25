import React from 'react';
import { Calendar, Clock, ArrowRight, Users2, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { scheduleConfig } from '../data/schedule';

interface ScheduleSectionProps {
  onSelectMonthAndRegister: (month: 'Dussehra BootCamp' | 'Special BootCamp', batch?: 'Morning' | 'Afternoon') => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSelectMonthAndRegister,
}) => {
  const months = [
    { key: 'october', data: scheduleConfig.october, value: 'Dussehra BootCamp' as const },
    { key: 'november', data: scheduleConfig.november, value: 'Special BootCamp' as const },
  ];

  return (
    <section id="schedule" className="relative py-16 sm:py-24 md:py-32 bg-white">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-rose-100/35 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Flexible Cohort Scheduling"
          badgeVariant="blue"
          title="CHOOSE YOUR"
          highlightText="BATCH"
          subtitle="Both Dussehra BootCamp and Special BootCamp cohorts are currently open for registration. Choose the batch time slot that best fits your weekend routine."
        />

        {/* 2 Large Cohort Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-8 sm:mb-12">
          {months.map(({ key, data, value }) => (
            <div
              key={key}
              className="relative rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-edsols-card p-5 sm:p-8 md:p-10 flex flex-col justify-between transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10 group"
            >
              {/* Top Status & Month Title */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-rose-600 flex-shrink-0" />
                    <span className="font-display text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                      {data.monthName.toUpperCase()} {data.year}
                    </span>
                  </div>

                  {/* Strictly OPEN FOR REGISTRATION badge */}
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 px-2.5 sm:px-3 py-1 rounded-full shadow-xs">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    OPEN FOR REGISTRATION
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 sm:mb-6 font-medium">
                  {data.description}
                </p>

                {/* Cohort Meta Tags */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6 sm:mb-8 text-xs font-mono text-slate-700">
                  <span className="bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
                    <Clock className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    {data.days}
                  </span>
                  <span className="bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 font-semibold text-[11px] sm:text-xs">
                    <Users2 className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    {data.targetAudience}
                  </span>
                </div>

                {/* Batch Slots (Morning & Afternoon) */}
                <div className="space-y-3 sm:space-y-4">
                  <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Available Weekend Time Slots:
                  </span>

                  {/* Morning Batch */}
                  <div
                    onClick={() => onSelectMonthAndRegister(value, 'Morning')}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 cursor-pointer group/batch shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover/batch:text-rose-600 transition-colors">
                          {data.morning.label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {data.morning.tag}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs font-mono text-slate-600 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-rose-600 flex-shrink-0" />
                        <span>Timing: <strong className="text-slate-900">{data.morning.timing}</strong></span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-600 group-hover/batch:translate-x-1 transition-transform self-end sm:self-auto">
                      Select Batch →
                    </span>
                  </div>

                  {/* Afternoon Batch */}
                  <div
                    onClick={() => onSelectMonthAndRegister(value, 'Afternoon')}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 cursor-pointer group/batch shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover/batch:text-rose-600 transition-colors">
                          {data.afternoon.label}
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {data.afternoon.tag}
                        </span>
                      </div>
                      <div className="text-[11px] sm:text-xs font-mono text-slate-600 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-rose-600 flex-shrink-0" />
                        <span>Timing: <strong className="text-slate-900">{data.afternoon.timing}</strong></span>
                      </div>
                    </div>

                    <span className="text-xs font-mono font-bold text-rose-600 group-hover/batch:translate-x-1 transition-transform self-end sm:self-auto">
                      Select Batch →
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onSelectMonthAndRegister(value)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full font-bold uppercase tracking-wider text-xs sm:text-sm shadow-md shadow-rose-500/25 py-3 sm:py-3.5"
                >
                  Register for {data.monthName} →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Assurance Box */}
        <div className="max-w-3xl mx-auto text-center p-4 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-mono text-slate-600 font-medium">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>Need custom timing or private school cohort arrangements?</span>
            </div>
            <a href="#register" className="text-rose-600 underline hover:text-rose-700 font-bold">
              Contact our admissions desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
