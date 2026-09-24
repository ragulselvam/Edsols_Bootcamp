import React from 'react';
import { Calendar, Users2, Sun } from 'lucide-react';
import { RobotAssemblyPuzzle } from '../components/visual/RobotAssemblyPuzzle';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  onKitSelect?: (kitId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col justify-center items-center overflow-hidden bg-white"
    >
      {/* Soft Ambient Rose Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[450px] bg-gradient-radial from-rose-100/35 via-pink-50/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* LEFT COLUMN: Main Headline, Subhead, Description & Key Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-display">
              BUILD. CODE.{' '}
              <span className="gradient-text-edsols block mt-1 sm:mt-2">
                CREATE.
              </span>
            </h1>

            <p className="mt-4 text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Intelligence at the Edge for Young Innovators
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-700 font-bold leading-relaxed max-w-2xl">
              A hands-on <span className="text-rose-600 font-black">Robotics, IoT & AI Bootcamp</span> for students in Grades 6–12 by EDSOLS. Learn practical engineering through real hardware kits, computer vision, smart automation, and capstone inventions.
            </p>

            {/* Key Specs Pill Matrix */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {/* Card 1: Weekend Program */}
              <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-rose-300 hover:shadow-md transition-all">
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Weekend Program</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5 font-display tracking-tight">(Sat & Sun)</div>
                </div>
              </div>

              {/* Card 2: Designed for Grades 6-12 */}
              <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex-shrink-0">
                  <Users2 className="w-4 h-4 text-cyan-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Designed for</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5 font-display tracking-tight">Grades 6–12</div>
                </div>
              </div>

              {/* Card 3: Morning & Afternoon Batches */}
              <div className="bg-white/95 p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-amber-300 hover:shadow-md transition-all">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex-shrink-0">
                  <Sun className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Morning &</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5 font-display tracking-tight">Afternoon Batches</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Robot Visual with Gaze & Rotate on Click */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <RobotAssemblyPuzzle />
          </div>
        </div>
      </div>
    </section>
  );
};
