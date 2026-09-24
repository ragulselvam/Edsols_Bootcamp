import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Layers,
  CheckCircle2,
  ChevronRight,
  Zap,
  Play,
  Pause,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { hardwareKits, HardwareKit } from '../data/kits';

interface KitShowcaseSectionProps {
  selectedKitId?: string | null;
  onRegisterClick: () => void;
}

export const KitShowcaseSection: React.FC<KitShowcaseSectionProps> = ({
  onRegisterClick,
}) => {
  const [activeKitModal, setActiveKitModal] = useState<HardwareKit | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'robotics' | 'iot' | 'ai'>('all');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Filtered kits based on active category tab (showing all 6 hardware platforms)
  const filteredKits =
    activeTab === 'all'
      ? hardwareKits
      : hardwareKits.filter((k) => k.track.toLowerCase() === activeTab);

  const N = filteredKits.length;

  // Virtual items array for infinite wrapping carousel (3 sets: left buffer, center set, right buffer)
  const isInfinite = N > 1;
  const virtualKits = isInfinite
    ? [...filteredKits, ...filteredKits, ...filteredKits]
    : filteredKits;

  // Active virtual index in the middle set (starts at N)
  const [virtualIndex, setVirtualIndex] = useState(isInfinite ? N : 0);
  const [enableTransition, setEnableTransition] = useState(true);

  // Drag / Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // Container & Card dimensions for dead-center alignment
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardMeasureRef = useRef<HTMLDivElement>(null);

  // Real current kit index (0 to N - 1)
  const realCurrentIndex = isInfinite ? virtualIndex % N : 0;

  // Reset virtualIndex when category tab changes
  useEffect(() => {
    setVirtualIndex(isInfinite ? N : 0);
    setDragOffset(0);
    setEnableTransition(true);
  }, [activeTab, N, isInfinite]);

  // Dimension measurement on mount and resize
  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }
    if (cardMeasureRef.current) {
      setCardWidth(cardMeasureRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    const timeout = setTimeout(updateDimensions, 80);
    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [updateDimensions, activeTab, N]);

  // Dynamic gap between vertical cards
  const gap = containerWidth >= 1024 ? 28 : containerWidth >= 640 ? 20 : 16;

  // Symmetrical dead-center formula:
  // translateX = (containerWidth - cardWidth) / 2 - virtualIndex * (cardWidth + gap) + dragOffset
  const translateX =
    containerWidth > 0 && cardWidth > 0
      ? (containerWidth - cardWidth) / 2 - virtualIndex * (cardWidth + gap) + dragOffset
      : 0;

  // Handle infinite loop boundary resets silently without transition jump
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    // Only react to the transform transition of the track itself, not bubbling child transitions
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (!isInfinite) return;

    // If we reached right buffer (virtualIndex >= 2 * N), snap silently back to center set
    if (virtualIndex >= 2 * N) {
      setEnableTransition(false);
      setVirtualIndex((prev) => prev - N);
    }
    // If we reached left buffer (virtualIndex < N), snap silently to center set
    else if (virtualIndex < N) {
      setEnableTransition(false);
      setVirtualIndex((prev) => prev + N);
    }
  };

  // Re-enable CSS transitions right after silent snap
  useEffect(() => {
    if (!enableTransition) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setEnableTransition(true);
        });
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [enableTransition]);

  // Autoplay (every 5 seconds)
  useEffect(() => {
    if (
      !isPlaying ||
      isHovered ||
      isDragging ||
      activeKitModal !== null ||
      N <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isDragging, activeKitModal, N]);

  const handleNext = () => {
    if (N <= 1) return;
    setVirtualIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (N <= 1) return;
    setVirtualIndex((prev) => prev - 1);
  };

  const handleGoToRealIndex = (targetRealIndex: number) => {
    if (!isInfinite) {
      setVirtualIndex(targetRealIndex);
      return;
    }
    const currentReal = virtualIndex % N;
    const diff = targetRealIndex - currentReal;
    setVirtualIndex(virtualIndex + diff);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.touches[0].clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  // Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -40) {
      handleNext();
    } else if (dragOffset > 40) {
      handlePrev();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      if (dragOffset < -40) {
        handleNext();
      } else if (dragOffset > 40) {
        handlePrev();
      }
      setIsDragging(false);
      setDragStartX(null);
      setDragOffset(0);
    }
    setIsHovered(false);
  };

  return (
    <section
      id="kits"
      className="relative py-16 sm:py-24 bg-white w-full overflow-hidden"
    >
      {/* Background Lighting & Glow Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-radial from-rose-100/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <SectionHeader
          badgeText="Tangible Engineering Hardware"
          badgeVariant="blue"
          title="THE HARDWARE THEY"
          highlightText="ACTUALLY BUILD WITH"
          subtitle="No simulations. No passive learning. Students work hands-on with industrial-grade microcontrollers, 6-DOF robotic limbs, sensors, and IoT automation kits."
        />

        {/* Centered Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mx-auto">
          {[
            { id: 'all', label: 'All Hardware Kits' },
            { id: 'robotics', label: 'Robotics Kits' },
            { id: 'iot', label: 'Smart Home & Sensors' },
            { id: 'ai', label: 'AI Vision & Robotics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
              }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-500/25 border border-rose-500'
                  : 'bg-white text-slate-600 hover:text-rose-600 border border-slate-200 hover:border-rose-200 shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3-SLIDE CAROUSEL (Spans from margin start to margin end across 3 cards)     */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden select-none py-4"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          {/* Continuous Infinite Carousel Track */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex items-stretch ${
              isDragging || !enableTransition
                ? 'transition-none'
                : 'transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]'
            }`}
            style={{
              gap: `${gap}px`,
              transform: `translateX(${translateX}px)`,
            }}
          >
            {virtualKits.map((kit, vIdx) => {
              const isCenter = vIdx === virtualIndex;
              const distance = Math.abs(vIdx - virtualIndex);
              const isVisible = distance <= 1;

              return (
                <div
                  key={`${kit.id}-${vIdx}`}
                  ref={vIdx === 0 ? cardMeasureRef : null}
                  onClick={() => {
                    if (!isCenter && !isDragging) {
                      setVirtualIndex(vIdx);
                    }
                  }}
                  className={`group relative shrink-0 w-[86vw] max-w-[350px] xs:w-[84vw] xs:max-w-[390px] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-56px)/3)] rounded-[24px] sm:rounded-[32px] bg-white border p-4 xs:p-5 sm:p-7 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                    isCenter
                      ? 'border-rose-400/90 shadow-2xl shadow-rose-500/15 scale-100 opacity-100 z-20 cursor-default ring-2 ring-rose-400/20'
                      : isVisible
                      ? 'border-slate-200/90 shadow-md scale-100 opacity-70 hover:opacity-100 z-10 cursor-pointer hover:border-slate-300'
                      : 'opacity-0 scale-75 pointer-events-none invisible'
                  }`}
                >
                  <div className="flex flex-col">
                    {/* Badge Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-rose-700 uppercase bg-rose-50 px-3 py-0.5 sm:py-1 rounded-full border border-rose-200 shadow-xs truncate max-w-[70%]">
                        {kit.badge}
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {kit.track}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div className="min-h-[58px] sm:min-h-[72px] flex flex-col justify-start">
                      <h3
                        className={`text-lg xs:text-xl sm:text-2xl font-extrabold tracking-tight leading-snug font-display transition-colors ${
                          isCenter ? 'text-slate-900 group-hover:text-rose-600' : 'text-slate-800'
                        }`}
                      >
                        {kit.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono mt-1 font-semibold leading-relaxed line-clamp-2">
                        {kit.tagline}
                      </p>
                    </div>

                    {/* Product Image Frame */}
                    <div className="relative my-3 sm:my-4 h-44 xs:h-48 sm:h-56 rounded-2xl bg-slate-50/90 border border-slate-200/80 p-3 flex items-center justify-center overflow-hidden group-hover:border-rose-300 group-hover:bg-rose-50/20 transition-all duration-300 shadow-inner">
                      <img
                        src={kit.image}
                        alt={kit.fullName}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = kit.fallbackImage;
                        }}
                        className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        draggable={false}
                      />
                    </div>

                    {/* Core Engineering Modules */}
                    <div className="flex flex-col mt-1">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-2">
                        Core Engineering Modules:
                      </span>
                      <div className="space-y-1.5 sm:space-y-2 min-h-[110px] sm:min-h-[140px] flex flex-col justify-start">
                        {kit.highlightFeatures.slice(0, 4).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-slate-700 font-medium leading-relaxed"
                          >
                            <Zap className="w-3.5 h-3.5 text-rose-600 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-2">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Product Actions */}
                  <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2 sm:gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveKitModal(kit);
                      }}
                      className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-rose-600 hover:text-rose-700 font-mono tracking-wider transition-colors cursor-pointer"
                    >
                      <span>FULL SPECS</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <Button
                      variant={isCenter ? 'primary' : 'outline'}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRegisterClick();
                      }}
                      className="text-xs px-2.5 sm:px-3.5 py-1.5"
                    >
                      Join Bootcamp
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Apple-Style Navigation & Pagination Bar */}
          <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 sm:gap-4 px-2">
            {/* Auto-play Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all cursor-pointer flex-shrink-0"
              title={isPlaying ? 'Pause auto-slide' : 'Resume auto-slide'}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm max-w-[65vw] overflow-x-auto">
              {filteredKits.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGoToRealIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer flex-shrink-0 ${
                    realCurrentIndex === idx
                      ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-rose-600 shadow-sm shadow-rose-500/40'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-300 hover:bg-slate-400 hover:scale-125'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Index Counter */}
            <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2 sm:px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex-shrink-0">
              0{realCurrentIndex + 1} / 0{filteredKits.length}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HARDWARE DEEP DIVE MODAL                                                  */}
      {/* ========================================================================= */}
      {activeKitModal && (
        <Modal
          isOpen={!!activeKitModal}
          onClose={() => setActiveKitModal(null)}
          title={activeKitModal.fullName}
          badgeText={`${activeKitModal.track} Platform · Hands-On Hardware`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Top Grid: Image + Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="h-72 rounded-2xl bg-slate-50 border border-slate-200 p-3 flex items-center justify-center overflow-hidden">
                <img
                  src={activeKitModal.image}
                  alt={activeKitModal.fullName}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = activeKitModal.fallbackImage;
                  }}
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xl font-bold text-slate-900">
                  {activeKitModal.tagline}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {activeKitModal.overview}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  {activeKitModal.specs.map((spec, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                        {spec.label}
                      </span>
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Components Breakdown Table */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-rose-700 font-bold mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> Integrated Hardware Components:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeKitModal.components.map((comp, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{comp.name}</span>
                      <span className="text-[10px] font-mono text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {comp.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {comp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Applied Engineering Competencies */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Applied Engineering Competencies:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeKitModal.whatStudentsLearn.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-slate-700 font-medium flex items-start gap-1.5 leading-relaxed"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer buttons */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setActiveKitModal(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setActiveKitModal(null);
                  onRegisterClick();
                }}
              >
                Register For This Program
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};
