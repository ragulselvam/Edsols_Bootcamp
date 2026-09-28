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
      className="relative min-h-[95dvh] sm:min-h-screen pt-20 pb-10 sm:pt-24 sm:pb-12 flex flex-col justify-between items-center overflow-hidden bg-white"
    >
      {/* =================================================================== */}
      {/* BACKGROUND GRAPHICS & ACCENTS                                       */}
      {/* =================================================================== */}

      {/* Top-Right Cyber Glowing Ring Arc & Dot Matrix */}
      <div className="absolute top-0 right-0 w-[420px] sm:w-[600px] h-[420px] sm:h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-full h-full rounded-full bg-gradient-to-bl from-rose-200/40 via-pink-100/20 to-transparent blur-2xl" />
        <div className="absolute top-12 right-12 w-80 h-80 rounded-full border border-rose-200/50 -z-10" />
        <div className="absolute top-4 right-4 w-[420px] h-[420px] rounded-full border border-rose-300/30 -z-10" />
      </div>

      {/* Subtle Dot Matrix Pattern on Bottom-Left & Top-Right */}
      <div
        className="absolute top-36 left-8 w-32 h-32 opacity-25 pointer-events-none -z-10 hidden sm:block"
        style={{
          backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />
      <div
        className="absolute bottom-28 right-8 w-40 h-40 opacity-25 pointer-events-none -z-10 hidden sm:block"
        style={{
          backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)',
          backgroundSize: '16px 16px',
        }}
      />

      {/* =================================================================== */}
      {/* HERO MAIN 2-COLUMN CONTAINER                                        */}
      {/* =================================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 my-auto pt-4 sm:pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Typography, Description, Actions & Feature Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            {/* Small Uppercase Pill Tag */}
            <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-rose-600 uppercase mb-2 sm:mb-3">
              AI • ROBOTICS • IOT • INNOVATION
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-[4rem] font-black tracking-tight text-slate-900 leading-[1.04] font-display">
              BUILD THE <br />
              TECHNOLOGY <br />
              <span className="gradient-text-edsols">OF TOMORROW.</span>
            </h1>

            {/* Subhead */}
            <p className="mt-3 sm:mt-4 text-lg xs:text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Intelligence at the Edge for Young Innovators
            </p>

            {/* Description Paragraph */}
            <p className="mt-3 text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-xl">
              Learn by building real autonomous systems, computer vision, smart automation, and IoT hardware. A hands-on <span className="text-rose-600 font-bold">Robotics, IoT & AI Bootcamp</span> by EDSOLS for students to invent their future.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRegisterClick}
                className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Explore Bootcamps</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="px-5 sm:px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base border-2 border-slate-200/90 hover:border-slate-300 shadow-sm transition-all cursor-pointer flex items-center gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
                </span>
                <span>View Hardware Kits</span>
              </button>
            </div>

            {/* 3 Key Spec Pill Matrix */}
            <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Card 1: Weekend Program */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-rose-300 transition-all">
                <div className="p-2 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-rose-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Weekend Program</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 font-display">(Sat & Sun)</div>
                </div>
              </div>

              {/* Card 2: Progressive Tracks */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-cyan-300 transition-all">
                <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 flex-shrink-0">
                  <Users2 className="w-4 h-4 text-cyan-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Progressive Tracks</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 font-display">Ages 6+ & 12+</div>
                </div>
              </div>

              {/* Card 3: Morning & Afternoon Batches */}
              <div className="bg-white p-3 sm:p-3.5 rounded-2xl border-2 border-slate-200/90 shadow-sm flex items-center gap-3 hover:border-amber-300 transition-all">
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex-shrink-0">
                  <Sun className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black text-slate-900 leading-tight">Morning & Afternoon</div>
                  <div className="text-[11px] font-bold text-slate-500 mt-0.5 font-display">Batches Available</div>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8 sm:mt-10">
        <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-xs font-bold text-slate-700">
          
          {/* Left: Avatar Cluster + Count */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Student builder"
              />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">2,000+</div>
              <div className="text-[11px] font-semibold text-slate-500">Students Building the Future</div>
            </div>
          </div>

          {/* Middle: 4 Key Pillars */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-rose-600 stroke-[2.5]" />
              <span>Hands-on Learning</span>
            </div>

            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-cyan-600 stroke-[2.5]" />
              <span>Real Hardware Projects</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-rose-600 stroke-[2.5]" />
              <span>Expert Mentorship</span>
            </div>

            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-rose-600 stroke-[2.5]" />
              <span>Industry-Relevant Curriculum</span>
            </div>
          </div>

          {/* Right: Scroll to Explore Button */}
          <button
            type="button"
            onClick={() => handleScrollTo('overview')}
            className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500 hover:text-rose-600 transition-colors cursor-pointer group"
          >
            <span className="w-7 h-7 rounded-full border border-slate-200 group-hover:border-rose-300 group-hover:bg-rose-50 flex items-center justify-center transition-all">
              <ChevronDown className="w-3.5 h-3.5 text-rose-600 stroke-[2.5] animate-bounce" />
            </span>
            <span className="hidden sm:inline">SCROLL TO EXPLORE</span>
          </button>
        </div>
      </div>
    </section>
  );
};
