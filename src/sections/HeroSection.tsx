import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  onKitSelect?: (kitId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] sm:h-screen sm:h-[100dvh] pt-20 pb-10 sm:pt-24 sm:pb-12 flex flex-col justify-center items-center overflow-hidden bg-white"
    >
      {/* 100% Visible Engineering Tech Blueprint Grid across the entire Hero section */}
      <div className="absolute inset-0 hero-tech-grid pointer-events-none -z-10" />

      {/* Ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[520px] bg-gradient-radial from-rose-200/25 via-pink-100/15 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 right-[-5%] w-[450px] h-[450px] bg-gradient-radial from-rose-200/15 via-transparent to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.08] font-display">
            BUILD. CODE.{' '}
            <span className="gradient-text-edsols block mt-1 sm:mt-2">
              CREATE.
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
            Intelligence at the Edge for Young Innovators
          </p>

          <p className="mt-4 text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            A hands-on <span className="text-rose-600 font-semibold">Robotics, IoT & AI Bootcamp</span> for students in Grades 6–12 by EDSOLS. Learn practical engineering through real hardware kits, computer vision, smart automation, and capstone inventions.
          </p>

          {/* Key Specs Pill Matrix */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-slate-700">
            <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              Weekend Program (Sat & Sun)
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              Designed for Grades 6–12
            </span>
            <span className="bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              Morning & Afternoon Batches
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

