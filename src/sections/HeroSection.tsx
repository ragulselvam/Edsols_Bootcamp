import React from 'react';
import {
  Calendar,
  Users2,
  Sun,
  ArrowRight,
  Play,
  BrainCircuit,
  Bot,
  Wifi,
  Cpu,
} from 'lucide-react';

interface HeroSectionProps {
  onRegisterClick?: () => void;
  onExploreClick?: () => void;
  onKitSelect?: (kitId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onRegisterClick,
  onExploreClick,
  onKitSelect,
}) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92dvh] sm:min-h-screen pt-20 pb-12 sm:pt-24 sm:pb-16 flex flex-col justify-center items-center overflow-hidden bg-white"
    >
      {/* =================================================================== */}
      {/* BACKGROUND ACCENTS & CYBER GLOW                                    */}
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center">
          
          {/* =============================================================== */}
          {/* LEFT COLUMN: Main Typography, Actions & 3 Feature Badges        */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center text-left">
            {/* Small Uppercase Pill Tag */}
            <div className="text-[11px] sm:text-xs font-mono font-bold tracking-widest text-rose-600 uppercase mb-2 sm:mb-3">
              AI • ROBOTICS • IOT • INNOVATION
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.3rem] font-black tracking-tight text-slate-900 leading-[1.04] font-display">
              BUILD THE <br />
              TECHNOLOGY OF <br />
              <span className="gradient-text-edsols">TOMORROW.</span>
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

          {/* =============================================================== */}
          {/* RIGHT COLUMN: Realistic Robotics & AI Lab Desk with Floating Badges */}
          {/* =============================================================== */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center items-center w-full relative">
            <div className="relative w-full max-w-[620px] aspect-[4/3] rounded-[32px] sm:rounded-[36px] overflow-visible select-none group">
              
              {/* Soft Pink Background Shape Aura */}
              <div className="absolute -top-6 -right-6 w-[88%] h-[88%] rounded-full bg-gradient-to-bl from-rose-200/40 via-pink-100/20 to-transparent -z-10 blur-xl pointer-events-none" />

              {/* Main Laboratory Hardware Photography Container */}
              <div className="w-full h-full rounded-[28px] sm:rounded-[32px] overflow-hidden bg-white border-2 border-slate-200/90 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.12)] relative">
                <img
                  src="/Header_img/hero_robot_desk_studio.jpg"
                  alt="Students Robotics and AI Computer Vision Engineering Desk"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Subtle Gradient Overlay for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* =========================================================== */}
              {/* 4 FLOATING INTERACTIVE BADGES OVER THE STAGE               */}
              {/* =========================================================== */}
              
              {/* Badge 1: AI / Computer Vision (Top Left above laptop screen) */}
              <div
                onClick={() => onKitSelect?.('dofbot')}
                className="absolute top-4 left-4 xs:top-6 xs:left-6 sm:top-8 sm:left-8 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-indigo-50/95 backdrop-blur-md border border-indigo-200/90 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <BrainCircuit className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-indigo-950 font-display">
                  AI / Computer Vision
                </span>
              </div>

              {/* Badge 2: Robotics (Middle Left above rover) */}
              <div
                onClick={() => onKitSelect?.('superbit')}
                className="absolute top-24 left-2 xs:top-28 xs:left-3 sm:top-32 sm:left-4 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-rose-50/95 backdrop-blur-md border border-rose-200/90 shadow-lg shadow-rose-500/10 hover:shadow-rose-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Bot className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-rose-950 font-display">
                  Robotics
                </span>
              </div>

              {/* Badge 3: IoT (Lower Left near wheels) */}
              <div
                onClick={() => onKitSelect?.('iot-smart-home')}
                className="absolute bottom-20 left-6 xs:bottom-24 xs:left-8 sm:bottom-28 sm:left-10 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-cyan-50/95 backdrop-blur-md border border-cyan-200/90 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-cyan-600 text-white flex items-center justify-center shadow-xs">
                  <Wifi className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-cyan-950 font-display">
                  IoT
                </span>
              </div>

              {/* Badge 4: Hardware Kits (Bottom Right near microcontroller boards) */}
              <div
                onClick={() => onExploreClick?.()}
                className="absolute bottom-16 right-4 xs:bottom-20 xs:right-6 sm:bottom-24 sm:right-8 z-20 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-emerald-50/95 backdrop-blur-md border border-emerald-200/90 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Cpu className="w-4 h-4 stroke-[2.5]" />
                </div>
                <span className="text-xs font-bold text-emerald-950 font-display">
                  Hardware Kits
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
