import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  Sparkles,
  Cpu,
  Layers,
  Bot,
  Radio,
} from 'lucide-react';

export interface ShowcaseItem {
  id: string;
  image: string;
  badgeText: string;
  brand: string;
  highlightTitle: string;
  subtitle: string;
  tags: string[];
  shortName: string;
  shortCategory: string;
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: 'robodog',
    image: '/Header_img/Robotic_Dog_Stage.jpg',
    badgeText: 'Quadruped Locomotion',
    brand: 'Bionic',
    highlightTitle: 'Robot Dog',
    subtitle: 'Bio-Inspired Dynamic Gait & Balance Control',
    tags: ['12-DOF Servos', 'Gait Planning', 'Dynamic Balance'],
    shortName: 'RoboDog',
    shortCategory: 'Bionic Pet',
  },
  {
    id: 'jetbot',
    image: '/Header_img/Picture1.png',
    badgeText: 'AI Vision Robot',
    brand: 'NVIDIA',
    highlightTitle: 'JetBot',
    subtitle: 'Computer Vision & Autonomous Obstacle Avoidance',
    tags: ['Computer Vision', 'AI', 'Autonomous Robotics'],
    shortName: 'JetBot',
    shortCategory: 'AI Vision',
  },
  {
    id: 'jetracer',
    image: '/Header_img/Jetracer.jpg',
    badgeText: 'AI Autonomous Racing',
    brand: 'NVIDIA',
    highlightTitle: 'JetRacer',
    subtitle: 'High-Speed Autonomous AI Track Navigation',
    tags: ['Deep Learning', 'DonkeyCar', 'Ackermann Steering'],
    shortName: 'JetRacer',
    shortCategory: 'AI Racing',
  },
  {
    id: 'dofbot',
    image: '/Header_img/dofbot_3d_stage.jpg',
    badgeText: '6-Axis Robotic Arm',
    brand: 'DOBOT',
    highlightTitle: 'Robotic Arm',
    subtitle: 'Precision Kinematics & Computer Vision Manipulation',
    tags: ['6-DOF Servos', 'OpenCV Vision', 'Inverse Kinematics'],
    shortName: 'DOBOT',
    shortCategory: 'Robotic Arm',
  },
  {
    id: 'smartcar',
    image: '/Header_img/Smart_Car.png',
    badgeText: 'STEM Autonomous Rover',
    brand: 'Micro:bit',
    highlightTitle: 'Smart Car',
    subtitle: 'Ultrasonic Obstacle Avoidance & Line Tracking',
    tags: ['Micro:bit V2', 'Ultrasonic Telemetry', 'RGB Lighting'],
    shortName: 'Smart Car',
    shortCategory: 'STEM Rover',
  },
  {
    id: 'buildingbit',
    image: '/Header_img/building-bit-robot.jpg',
    badgeText: 'Modular Mechanical STEM',
    brand: '16-in-1',
    highlightTitle: 'Building:bit',
    subtitle: 'Structural Engineering & Multi-Servo Mechanisms',
    tags: ['350+ Bricks', 'Super:bit Board', 'Servo Motors'],
    shortName: 'Building:bit',
    shortCategory: '16-in-1 Kit',
  },
  {
    id: 'smartdoor',
    image: '/Header_img/Smart_Door.png',
    badgeText: 'Connected Smart Home',
    brand: 'IoT',
    highlightTitle: 'Smart Access',
    subtitle: 'RFID Security & Automated Sensor Telemetry',
    tags: ['RFID Access', 'Motorized Gate', 'Sensor Network'],
    shortName: 'Smart Access',
    shortCategory: 'IoT & Security',
  },
  {
    id: 'ai-robot-lab',
    image: '/Header_img/hero_robot_ai_lab.jpg',
    badgeText: 'Autonomous AI Platform',
    brand: 'NVIDIA & EDSOLS',
    highlightTitle: 'Edge AI Robot',
    subtitle: 'Embedded Computer Vision & Neural Network Telemetry',
    tags: ['Edge AI', 'Neural Networks', 'LiDAR Telemetry'],
    shortName: 'AI Robot',
    shortCategory: 'Edge AI Lab',
  },
];

export const RobotShowcaseGallery: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Auto-switch image every 5 seconds, continuously looping
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
  };

  const handleSelect = (index: number) => {
    setCurrentIndex(index);
  };

  const currentItem = showcaseItems[currentIndex];

  const renderBadgeIcon = (id: string) => {
    switch (id) {
      case 'jetbot':
        return <Camera className="w-3.5 h-3.5 text-cyan-600" />;
      case 'dofbot':
        return <Sparkles className="w-3.5 h-3.5 text-rose-600" />;
      case 'jetracer':
      case 'robodog':
        return <Cpu className="w-3.5 h-3.5 text-indigo-600" />;
      case 'smartcar':
        return <Bot className="w-3.5 h-3.5 text-blue-600" />;
      case 'smartdoor':
        return <Radio className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;
    if (diff < -40) {
      handleNext();
    } else if (diff > 40) {
      handlePrev();
    }
    setTouchStartX(null);
  };

  return (
    <div
      className={`w-full max-w-[800px] mx-auto select-none ${className}`}
      role="region"
      aria-label="Robotics Hardware Showcase Gallery"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* =================================================================== */}
      {/* MAIN 2-COLUMN STAGE: FEATURED CARD (LEFT) + THUMBNAILS LIST (RIGHT) */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
        
        {/* ================================================================= */}
        {/* LEFT / CENTER: MAIN FEATURED ROBOT CARD (approx 7 cols on desktop) */}
        {/* ================================================================= */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="md:col-span-7 lg:col-span-7 flex flex-col justify-between rounded-[24px] sm:rounded-[28px] bg-white border-2 border-slate-200/90 shadow-[0_12px_32px_-10px_rgba(15,23,42,0.08)] p-3.5 sm:p-4 lg:p-4.5 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-rose-100/50 via-pink-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Card Top Header: Category Badge & Index Counter */}
          <div className="flex items-center justify-between mb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-50/90 border border-cyan-100 text-cyan-700 text-[11px] sm:text-xs font-bold shadow-xs">
              {renderBadgeIcon(currentItem.id)}
              <span>{currentItem.badgeText}</span>
            </div>

            <span className="text-[11px] font-mono font-bold text-slate-400">
              {String(currentIndex + 1).padStart(2, '0')} / {String(showcaseItems.length).padStart(2, '0')}
            </span>
          </div>

          {/* Visual Image Stage with Navigation Chevrons */}
          <div className="relative w-full h-[190px] xs:h-[220px] sm:h-[240px] md:h-[250px] lg:h-[235px] xl:h-[250px] flex items-center justify-center p-1.5 overflow-hidden">
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous hardware"
              className="absolute left-1 xs:left-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-slate-200 shadow-md hover:border-rose-400 hover:text-rose-600 hover:scale-105 active:scale-95 flex items-center justify-center text-slate-700 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>

            {/* Centered Robot Image */}
            <img
              key={currentItem.id}
              src={currentItem.image}
              alt={`${currentItem.brand} ${currentItem.highlightTitle}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out transform"
              loading="eager"
            />

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next hardware"
              className="absolute right-1 xs:right-1.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-slate-200 shadow-md hover:border-rose-400 hover:text-rose-600 hover:scale-105 active:scale-95 flex items-center justify-center text-slate-700 transition-all cursor-pointer backdrop-blur-xs"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-1.5 my-1">
            {showcaseItems.map((item, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelect(index)}
                  aria-label={`Go to ${item.brand} ${item.highlightTitle}`}
                  className={`transition-all duration-300 cursor-pointer rounded-full ${
                    isActive
                      ? 'w-5 h-1.5 bg-rose-500 shadow-xs'
                      : 'w-1.5 h-1.5 bg-slate-200 hover:bg-rose-200'
                  }`}
                />
              );
            })}
          </div>

          {/* Bottom Information: Live Project Tag, Title, Subtitle, Feature Pills */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-600">
                LIVE PROJECT
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 font-display">
              {currentItem.brand}{' '}
              <span className="text-rose-600">
                {currentItem.highlightTitle}
              </span>
            </h3>

            <p className="text-xs font-semibold text-slate-600 leading-tight">
              {currentItem.subtitle}
            </p>

            {/* Feature Tag Pills */}
            <div className="flex flex-wrap items-center gap-1 mt-0.5">
              {currentItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT: THUMBNAILS LIST (approx 5 cols on desktop, scrollable)     */}
        {/* ================================================================= */}
        <div className="md:col-span-5 lg:col-span-5 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto max-h-[380px] lg:max-h-[410px] pb-1.5 md:pb-0 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {showcaseItems.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-label={`Show ${item.brand} ${item.highlightTitle}`}
                className={`flex-shrink-0 w-[135px] md:w-full flex items-center justify-between p-1.5 sm:p-2 rounded-xl sm:rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-50/90 border-2 border-rose-400 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300'
                }`}
              >
                {/* Left Thumbnail + Titles */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white border border-slate-100 p-0.5 sm:p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs sm:text-[13px] font-black truncate leading-tight ${
                        isActive ? 'text-rose-600' : 'text-slate-900'
                      }`}
                    >
                      {item.shortName}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 truncate mt-0.5">
                      {item.shortCategory}
                    </span>
                  </div>
                </div>

                {/* Right Arrow Circle */}
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ml-1 transition-all ${
                    isActive
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                >
                  <ChevronRight className="w-3 h-3 stroke-[2.5]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
