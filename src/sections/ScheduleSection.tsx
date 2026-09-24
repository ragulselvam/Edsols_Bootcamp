import React from 'react';
import { Calendar, Clock, ArrowRight, Users2, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/common/Button';
import { scheduleConfig } from '../data/schedule';

interface ScheduleSectionProps {
  onSelectMonthAndRegister: (month: 'October 2026' | 'November 2026', batch?: 'Morning' | 'Afternoon') => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  onSelectMonthAndRegister,
}) => {
  const months = [
    { key: 'october', data: scheduleConfig.october, value: 'October 2026' as const },
    { key: 'november', data: scheduleConfig.november, value: 'November 2026' as const },
  ];

  return (
    <section id="schedule" className="relative py-24 sm:py-32 bg-white">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-radial from-rose-100/35 via-transparent to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badgeText="Flexible Cohort Scheduling"
          badgeVariant="blue"
          title="CHOOSE YOUR"
          highlightText="BATCH"
          subtitle="Both October and November 2026 cohorts are currently open for registration. Choose the month and batch time slot that best fits your weekend routine."
        />

        {/* 2 Large Cohort Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {months.map(({ key, data, value }) => (
            <div
              key={key}
              className="relative rounded-3xl bg-white border border-slate-200/90 shadow-edsols-card p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10 group"
            >
              {/* Top Status & Month Title */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-rose-600" />
                    <span className="font-display text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {data.monthName.toUpperCase()} {data.year}
                    </span>
                  </div>

                  {/* Strictly OPEN FOR REGISTRATION badge */}
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                    OPEN FOR REGISTRATION
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
                  {data.description}
                </p>

                {/* Cohort Meta Tags */}
                <div className="flex flex-wrap items-center gap-3 mb-8 text-xs font-mono text-slate-700">
                  <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-rose-600" />
                    {data.days}
                  </span>
                  <span className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-1.5 font-semibold">
                    <Users2 className="w-3.5 h-3.5 text-rose-600" />
                    {data.targetAudience}
                  </span>
                </div>

                {/* Batch Slots (Morning & Afternoon) */}
                <div className="space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                    Available Weekend Time Slots:
                  </span>

                  {/* Morning Batch */}
                  <div
                    onClick={() => onSelectMonthAndRegister(value, 'Morning')}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group/batch shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover/batch:text-rose-600 transition-colors">
                          {data.morning.label}
                        </span>
                        <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {data.morning.tag}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-rose-600" />
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
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-rose-300 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group/batch shadow-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover/batch:text-rose-600 transition-colors">
                          {data.afternoon.label}
                        </span>
                        <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {data.afternoon.tag}
                        </span>
                      </div>
                      <div className="text-xs font-mono text-slate-600 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-rose-600" />
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
              <div className="mt-8 pt-6 border-t border-slate-100">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => onSelectMonthAndRegister(value)}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="w-full font-bold uppercase tracking-wider text-sm shadow-md shadow-rose-500/25"
                >
                  Register for {data.monthName} →
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Assurance Box */}
        <div className="max-w-3xl mx-auto text-center p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 font-medium">
            <Sparkles className="w-4 h-4 text-rose-600" />
            <span>Need custom timing or private school cohort arrangements?</span>
            <a href="#register" className="text-rose-600 underline hover:text-rose-700 font-bold">
              Contact our admissions desk
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
