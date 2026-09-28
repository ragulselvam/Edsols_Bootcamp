import React from 'react';
import { Calendar, Users2, Sun, ArrowRight } from 'lucide-react';
import { RobotShowcaseGallery } from '../components/visual/RobotShowcaseGallery';
// Preserved robot animation components for future reuse:
// import { RobotAssemblyPuzzle } from '../components/visual/RobotAssemblyPuzzle';
// import { RobotCommandLine } from '../components/visual/RobotCommandLine';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  onKitSelect?: (kitId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] sm:min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col justify-center items-center overflow-hidden bg-white"
    >
      {/* Soft Ambient Rose Glow */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[450px] bg-gradient-radial from-rose-100/35 via-pink-50/15 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          {/* LEFT COLUMN: Main Headline, Subhead, Description & Key Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.08] font-display">
              BUILD THE TECHNOLOGY{' '}
              <span className="gradient-text-edsols block mt-1 sm:mt-1.5">
                OF TOMORROW.
              </span>
            </h1>

            {/* Core Pillars */}
            <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm font-bold text-rose-600">
              <span>AI</span>
              <span className="text-slate-300">•</span>
              <span>ROBOTICS</span>
              <span className="text-slate-300">•</span>
              <span>IOT</span>
              <span className="text-slate-300">•</span>
              <span>INNOVATION</span>
            </div>

            <p className="mt-2 text-lg xs:text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Intelligence at the Edge for Young Innovators
            </p>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-700 font-bold leading-relaxed max-w-2xl">
              Learn by building real autonomous systems, computer vision, smart automation, and IoT hardware. A hands-on <span className="text-rose-600 font-black">Robotics, IoT & AI Bootcamp</span> by EDSOLS for students to invent their future.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRegisterClick}
                className="px-5 sm:px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/25 transition-all cursor-pointer flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Explore Bootcamps</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-slate-200 hover:border-slate-300 shadow-sm transition-all cursor-pointer"
              >
                View Hardware Kits
              </button>
            </div>

            {/* Key Specs Pill Matrix */}
            <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
              {/* Card 1: Weekend Program */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-rose-300 hover:shadow-md transition-all">
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Weekend Program</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5 font-display tracking-tight">(Sat & Sun)</div>
                </div>
              </div>

              {/* Card 2: Ages 6+ & 12+ */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-cyan-300 hover:shadow-md transition-all">
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex-shrink-0">
                  <Users2 className="w-4 h-4 text-cyan-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Progressive Tracks</div>
                  <div className="text-xs font-black text-slate-900 mt-0.5 font-display tracking-tight">Ages 6+ & 12+</div>
                </div>
              </div>

              {/* Card 3: Morning & Afternoon Batches */}
              <div className="bg-white p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-amber-300 hover:shadow-md transition-all">
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

          {/* RIGHT COLUMN: Robotics Photo Collection Gallery */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <RobotShowcaseGallery />
            {/*
              PRESERVED ROBOT ANIMATION COMPONENTS (HELD FOR LATER REUSE):
              <RobotAssemblyPuzzle />
              <RobotCommandLine />
            */}
          </div>
        </div>
      </div>
    </section>
  );
};
