import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Camera, Sparkles, Cpu, Layers } from 'lucide-react';

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

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'jetbot',
    image: '/Header_img/Picture1.png',
    badgeText: 'AI Vision Robot',
    brand: 'NVIDIA',
    highlightTitle: 'JetBot',
    subtitle: 'AI Vision & Autonomous Robotics',
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
    image: '/Header_img/dofbot-robotic-arm.jpg',
    badgeText: '6-Axis Robotic Arm',
    brand: 'DOFBOT',
    highlightTitle: 'AI Arm',
    subtitle: 'Precision Kinematics & Computer Vision Manipulation',
    tags: ['6-DOF Servos', 'OpenCV', 'Inverse Kinematics'],
    shortName: 'DOFBOT',
    shortCategory: 'Robotic Arm',
  },
  {
    id: 'robodog',
    image: '/Header_img/Robotic_Dog.jpg',
    badgeText: 'Quadruped Locomotion',
    brand: 'Bionic',
    highlightTitle: 'Robot Dog',
    subtitle: 'Bio-Inspired Dynamic Gait & Balance Control',
    tags: ['12-DOF Servos', 'Gait Planning', 'Dynamic Balance'],
    shortName: 'RoboDog',
    shortCategory: 'Bionic Pet',
  },
  {
    id: 'smartcar',
    image: '/Header_img/Smart_Car.png',
    badgeText: 'STEM Autonomous Rover',
    brand: 'Micro:bit',
    highlightTitle: 'Tiny:bit',
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
];

export const RobotShowcaseGallery: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Auto-switch image every 5 seconds (5000ms), continuously looping forever
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % showcaseItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

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
        return <Camera className="w-4 h-4 text-cyan-600" />;
      case 'dofbot':
        return <Sparkles className="w-4 h-4 text-rose-600" />;
      case 'jetracer':
      case 'robodog':
        return <Cpu className="w-4 h-4 text-indigo-600" />;
      default:
        return <Layers className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div
      className={`w-full max-w-[680px] mx-auto flex flex-col items-center select-none ${className}`}
      role="region"
      aria-label="Robotics Hardware Photo Collection"
    >
      {/* =================================================================== */}
      {/* MAIN GALLERY CONTAINER: FEATURED CARD + THUMBNAILS STACK            */}
      {/* =================================================================== */}
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* LEFT / CENTER: LARGE FEATURED IMAGE CARD (approx 7.5 cols on desktop) */}
        <div className="md:col-span-8 flex flex-col justify-between rounded-3xl bg-white/95 backdrop-blur-sm border-2 border-slate-200/90 shadow-[0_12px_36px_-10px_rgba(15,23,42,0.08)] p-5 sm:p-6 transition-all duration-300 relative overflow-hidden">
          
          {/* Subtle Ambient Radial Lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-radial from-rose-100/40 via-sky-50/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

          {/* Top Header: Category Badge */}
          <div className="flex items-center justify-between mb-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-cyan-50/80 border border-cyan-100/90 text-cyan-700 text-xs font-bold shadow-xs">
              {renderBadgeIcon(currentItem.id)}
              <span>{currentItem.badgeText}</span>
            </div>

            <span className="text-[11px] font-mono font-bold text-slate-400">
              0{currentIndex + 1} / 0{showcaseItems.length}
            </span>
          </div>

          {/* Center: FIXED-HEIGHT Visual Image Stage (object-contain ensures zero layout shift) */}
          <div className="relative w-full h-[240px] sm:h-[270px] flex items-center justify-center py-2 px-3 overflow-hidden">
            <img
              key={currentItem.id}
              src={currentItem.image}
              alt={`${currentItem.brand} ${currentItem.highlightTitle}`}
              className="max-h-full max-w-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out transform"
              loading="eager"
            />
          </div>

          {/* Bottom Info: Title, Subtitle, and Feature Tags */}
          <div className="mt-2 pt-3 border-t border-slate-100 flex flex-col gap-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
              {currentItem.brand}{' '}
              <span className="gradient-text-accent">
                {currentItem.highlightTitle}
              </span>
            </h3>

            <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug">
              {currentItem.subtitle}
            </p>

            {/* Feature Tag Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
              {currentItem.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100/80 text-slate-700 border border-slate-200/60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: THUMBNAIL CARDS STACK (approx 4 cols on desktop) */}
        <div className="md:col-span-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[460px] pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
          {showcaseItems.map((item, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(index)}
                aria-label={`Show ${item.brand} ${item.highlightTitle}`}
                className={`flex-shrink-0 w-[140px] md:w-full flex items-center gap-2.5 p-2 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-50/70 border-2 border-rose-400 shadow-sm scale-[1.02]'
                    : 'bg-white/90 hover:bg-slate-50 border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Thumbnail Square */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border border-slate-100 p-1 flex items-center justify-center flex-shrink-0 shadow-xs">
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Thumbnail Labels */}
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs font-black truncate leading-tight ${
                      isActive ? 'text-rose-600' : 'text-slate-800'
                    }`}
                  >
                    {item.shortName}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 truncate mt-0.5">
                    {item.shortCategory}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* =================================================================== */}
      {/* BOTTOM CONTROLS: PREV / NEXT BUTTONS + DOT INDICATORS               */}
      {/* =================================================================== */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous product"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:text-rose-600 hover:shadow-md flex items-center justify-center text-slate-700 transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-1.5 px-2">
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
                    ? 'w-6 h-2 bg-rose-500 shadow-xs'
                    : 'w-2 h-2 bg-rose-200 hover:bg-rose-300'
                }`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next product"
          className="w-8 h-8 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:text-rose-600 hover:shadow-md flex items-center justify-center text-slate-700 transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
