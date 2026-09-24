import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Code2,
  Bot,
  BrainCircuit,
  Network,
  Zap,
  Lightbulb,
  Binary,
  Sparkles,
  Wrench,
  Users2,
  MessageSquareCode,
  Layers,
  Award,
  ShieldCheck,
  Play,
  Pause,
  CheckCircle2,
  Target,
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { BrandLogo } from '../components/common/BrandLogo';
import { skillsData } from '../data/skills';

export const SkillsSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Icon lookup map
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-rose-600" />,
    Bot: <Bot className="w-5 h-5 text-rose-600" />,
    BrainCircuit: <BrainCircuit className="w-5 h-5 text-rose-600" />,
    Network: <Network className="w-5 h-5 text-rose-600" />,
    Zap: <Zap className="w-5 h-5 text-rose-600" />,
    Lightbulb: <Lightbulb className="w-5 h-5 text-rose-600" />,
    Binary: <Binary className="w-5 h-5 text-rose-600" />,
    Sparkles: <Sparkles className="w-5 h-5 text-rose-600" />,
    Wrench: <Wrench className="w-5 h-5 text-rose-600" />,
    Users2: <Users2 className="w-5 h-5 text-rose-600" />,
    MessageSquareCode: <MessageSquareCode className="w-5 h-5 text-rose-600" />,
    Layers: <Layers className="w-5 h-5 text-rose-600" />,
  };

  const N = skillsData.length;

  // Infinite wrapping carousel items (3 duplicate sets)
  const isInfinite = N > 1;
  const virtualSkills = isInfinite
    ? [...skillsData, ...skillsData, ...skillsData]
    : skillsData;

  // Virtual index in the middle set (starts at N)
  const [virtualIndex, setVirtualIndex] = useState(isInfinite ? N : 0);
  const [enableTransition, setEnableTransition] = useState(true);

  // Drag & Swipe State
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  // Dynamic measurements for dead-center positioning
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardMeasureRef = useRef<HTMLDivElement>(null);

  // Real current active index (0 to N - 1)
  const realCurrentIndex = isInfinite ? virtualIndex % N : 0;

  // Dimension measurement on mount and window resize
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
  }, [updateDimensions, N]);

  // Dynamic gap between cards
  const gap = containerWidth >= 1024 ? 28 : containerWidth >= 640 ? 20 : 16;

  // Symmetrical dead-center formula
  const translateX =
    containerWidth > 0 && cardWidth > 0
      ? (containerWidth - cardWidth) / 2 - virtualIndex * (cardWidth + gap) + dragOffset
      : 0;

  // Handle infinite loop boundary resets silently
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (!isInfinite) return;

    if (virtualIndex >= 2 * N) {
      setEnableTransition(false);
      setVirtualIndex((prev) => prev - N);
    } else if (virtualIndex < N) {
      setEnableTransition(false);
      setVirtualIndex((prev) => prev + N);
    }
  };

  // Re-enable transitions after silent snap
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
    if (!isPlaying || isHovered || isDragging || N <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setVirtualIndex((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, isDragging, N]);

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
    <section id="skills" className="relative py-16 sm:py-24 bg-white w-full overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-radial from-rose-100/40 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 text-center">
        <SectionHeader
          badgeText="Future-Ready Competencies"
          badgeVariant="blue"
          title="SKILLS THAT GO"
          highlightText="BEYOND THE CLASSROOM"
          subtitle="We cultivate the technical rigor, computational intuition, and collaborative habits demanded by premier global universities and high-growth engineering careers."
        />
      </div>

      {/* ========================================================================= */}
      {/* APPLE-STYLE CAROUSEL (Centered Vertical Cards & Peeking Preview Slides)    */}
      {/* ========================================================================= */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1580px] mx-auto overflow-hidden select-none py-4"
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
          {virtualSkills.map((skill, vIdx) => {
            const isCenter = vIdx === virtualIndex;

            return (
              <div
                key={`${skill.id}-${vIdx}`}
                ref={vIdx === 0 ? cardMeasureRef : null}
                onClick={() => {
                  if (!isCenter && !isDragging) {
                    setVirtualIndex(vIdx);
                  }
                }}
                className={`group relative shrink-0 w-[86vw] sm:w-[380px] md:w-[420px] lg:w-[440px] xl:w-[460px] rounded-[28px] sm:rounded-[32px] bg-white border p-6 sm:p-7 flex flex-col justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
                  isCenter
                    ? 'border-rose-400/80 shadow-2xl shadow-rose-500/15 scale-100 opacity-100 z-20 cursor-default ring-2 ring-rose-400/20'
                    : 'border-slate-200/80 shadow-md scale-[0.93] opacity-45 sm:opacity-55 hover:opacity-85 z-10 cursor-pointer hover:scale-[0.95]'
                }`}
              >
                <div className="flex flex-col">
                  {/* Top Row: Icon Container & Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200 group-hover:border-rose-300 group-hover:scale-110 transition-all shadow-xs">
                      {iconMap[skill.icon] || <Zap className="w-5 h-5 text-rose-600" />}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 shadow-xs">
                        {skill.level}
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {skill.category}
                      </span>
                    </div>
                  </div>

                  {/* Skill Title */}
                  <div className="min-h-[52px] flex items-center">
                    <h3
                      className={`text-xl sm:text-2xl font-extrabold tracking-tight font-display transition-colors ${
                        isCenter ? 'text-slate-900 group-hover:text-rose-600' : 'text-slate-800'
                      }`}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  {/* Summary Description */}
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-2 min-h-[56px]">
                    {skill.summary}
                  </p>

                  {/* Real-World Engineering Impact Highlight */}
                  <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 group-hover:border-rose-200/70 group-hover:bg-rose-50/15 transition-all">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Target className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                        Real-World Engineering Impact:
                      </span>
                    </div>
                    <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {skill.realWorldApplication}
                    </p>
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Industry Verified Pedagogy
                  </span>

                  <span className="text-[10px] font-mono font-bold text-rose-600 uppercase tracking-wider">
                    DEMO DAY EVALUATED
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Apple-Style Navigation & Pagination Bar */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Auto-play Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-full bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 shadow-sm transition-all cursor-pointer"
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
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm max-w-[80vw] overflow-x-auto">
            {skillsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleGoToRealIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer flex-shrink-0 ${
                  realCurrentIndex === idx
                    ? 'w-8 h-2.5 bg-rose-600 shadow-sm shadow-rose-500/40'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400 hover:scale-125'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide Index Counter */}
          <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
            {String(realCurrentIndex + 1).padStart(2, '0')} / {String(skillsData.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CERTIFICATE OF COMPLETION SHOWCASE BANNER                                 */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="relative rounded-3xl bg-gradient-to-r from-white via-rose-50/30 to-white border border-slate-200/90 p-8 sm:p-12 shadow-edsols-card hover:shadow-xl transition-all duration-300 overflow-hidden text-slate-900">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-rose-600" />
                <span className="text-xs font-mono uppercase tracking-widest text-rose-600 font-bold">
                  Official Credentialing & Verified Portfolio
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                Official EDSOLS Bootcamp Certificate of Completion
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                Graduates receive an official, cryptographically verifiable certificate detailing their completed engineering hours, mastery across Robotics, IoT, and Computer Vision, and their Demo Day capstone invention score.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-700">
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  Verified Engineering Portfolio
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-rose-600" />
                  Demonstrated Hardware Fluency
                </span>
              </div>
            </div>

            {/* Visual Credential Badge */}
            <div className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xl shadow-rose-500/5 text-center flex flex-col items-center max-w-xs w-full">
                <div className="mb-4">
                  <BrandLogo theme="light" size="sm" showTagline={false} />
                </div>
                <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center mb-2.5 shadow-xs">
                  <Award className="w-6 h-6 text-rose-600" />
                </div>
                <span className="text-sm font-bold text-slate-900">
                  Official Innovation Credential
                </span>
                <span className="text-xs text-slate-500 font-mono mt-1">
                  Robotics · IoT · AI Mastery
                </span>
                <span className="mt-3 inline-block text-[10px] font-mono text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 font-bold shadow-xs">
                  ISSUED AT DEMO DAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
