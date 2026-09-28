import React from 'react';
import {
  Calendar,
  Users2,
  Sun,
  ArrowRight,
  Play,
  GraduationCap,
  Box,
  Users,
  BarChart3,
  ChevronDown,
} from 'lucide-react';
import { RobotShowcaseGallery } from '../components/visual/RobotShowcaseGallery';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  onKitSelect?: (kitId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
}) => {
  const handleScrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] sm:min-h-screen lg:h-screen lg:min-h-[640px] lg:max-h-[960px] pt-16 sm:pt-20 lg:pt-16 pb-3 sm:pb-4 flex flex-col justify-between items-center overflow-hidden bg-white"
    >
      {/* =================================================================== */}
      {/* BACKGROUND GRAPHICS & ACCENTS                                       */}
      {/* =================================================================== */}

      {/* Top-Right Cyber Glowing Ring Arc & Dot Matrix */}
      <div className="absolute top-0 right-0 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-full h-full rounded-full bg-gradient-to-bl from-rose-200/40 via-pink-100/20 to-transparent blur-2xl" />
        <div className="absolute top-10 right-10 w-72 h-72 rounded-full border border-rose-200/50 -z-10" />
        <div className="absolute top-4 right-4 w-[380px] h-[380px] rounded-full border border-rose-300/30 -z-10" />
      </div>

      {/* Subtle Dot Matrix Pattern on Bottom-Left & Top-Right */}
      <div
        className="absolute top-32 left-6 w-28 h-28 opacity-25 pointer-events-none -z-10 hidden sm:block"
        style={{
          backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div
        className="absolute bottom-24 right-6 w-32 h-32 opacity-25 pointer-events-none -z-10 hidden sm:block"
        style={{
          backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* =================================================================== */}
      {/* HERO MAIN 2-COLUMN CONTAINER                                        */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex-1 flex flex-col justify-center py-2 sm:py-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 xl:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Typography, Description, Actions & Feature Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Small Uppercase Pill Tag */}
            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-rose-600 uppercase mb-1.5 sm:mb-2">
              AI • ROBOTICS • IOT • INNOVATION
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-black tracking-tight text-slate-900 leading-[1.05] font-display">
              BUILD THE <br className="hidden xs:inline" />
              TECHNOLOGY <br className="hidden xs:inline" />
              <span className="gradient-text-edsols">OF TOMORROW.</span>
            </h1>

            {/* Subhead */}
            <p className="mt-2 text-base xs:text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Intelligence at the Edge for Young Innovators
            </p>

            {/* Description Paragraph */}
            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl">
              Learn by building real autonomous systems, computer vision, smart automation, and IoT hardware. A hands-on <span className="text-rose-600 font-bold">Robotics, IoT & AI Bootcamp</span> by EDSOLS for students to invent their future.
            </p>

            {/* CTA Buttons */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={onRegisterClick}
                className="px-5 sm:px-7 py-3 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-md shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Bootcamps</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="px-4 sm:px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border-2 border-slate-200/90 hover:border-slate-300 shadow-xs transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Play className="w-2 h-2 ml-0.5 fill-current" />
                </span>
                <span>View Hardware Kits</span>
              </button>
            </div>

            {/* 3 Key Spec Pill Matrix */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
              {/* Card 1: Weekend Program */}
              <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-center gap-2.5 hover:border-rose-300 transition-all">
                <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-100 text-rose-600 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Weekend Program</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5 font-display">(Sat & Sun)</div>
                </div>
              </div>

              {/* Card 2: Progressive Tracks */}
              <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-center gap-2.5 hover:border-cyan-300 transition-all">
                <div className="p-1.5 rounded-lg bg-cyan-50 border border-cyan-100 text-cyan-600 flex-shrink-0">
                  <Users2 className="w-3.5 h-3.5 text-cyan-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Progressive Tracks</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5 font-display">Ages 6+ & 12+</div>
                </div>
              </div>

              {/* Card 3: Morning & Afternoon Batches */}
              <div className="bg-white p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-slate-200/90 shadow-xs flex items-center gap-2.5 hover:border-amber-300 transition-all">
                <div className="p-1.5 rounded-lg bg-amber-50 border border-amber-100 text-amber-600 flex-shrink-0">
                  <Sun className="w-3.5 h-3.5 text-amber-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Morning & Afternoon</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-0.5 font-display">Batches Available</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Robot Hardware Stage + Thumbnails */}
          <div className="lg:col-span-7 flex justify-center items-center w-full">
            <RobotShowcaseGallery />
          </div>
        </div>
      </div>

      {/* =================================================================== */}
      {/* BOTTOM SOCIAL PROOF & HIGHLIGHT BAR                                 */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="pt-3 sm:pt-3.5 pb-1 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-slate-700">
          
          {/* Left: Avatar Cluster + Count */}
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-black text-slate-900 leading-tight">2,000+</div>
              <div className="text-[10px] font-semibold text-slate-500">Students Building the Future</div>
            </div>
          </div>

          {/* Middle: 4 Key Pillars */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-[11px] xl:text-xs">
            <div className="flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
              <span>Hands-on Learning</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-cyan-600 stroke-[2.5]" />
              <span>Real Hardware Projects</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
              <span>Expert Mentorship</span>
            </div>

            <div className="flex items-center gap-1.5">
              <BarChart3 className="w-3.5 h-3.5 text-rose-600 stroke-[2.5]" />
              <span>Industry-Relevant Curriculum</span>
            </div>
          </div>

          {/* Right: Scroll to Explore Button */}
          <button
            type="button"
            onClick={() => handleScrollTo('overview')}
            className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer group"
          >
            <span className="w-6 h-6 rounded-full border border-slate-200 group-hover:border-rose-300 group-hover:bg-rose-50 flex items-center justify-center transition-all">
              <ChevronDown className="w-3 h-3 text-rose-600 stroke-[2.5] animate-bounce" />
            </span>
            <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
          </button>
        </div>
      </div>
    </section>
  );
};
