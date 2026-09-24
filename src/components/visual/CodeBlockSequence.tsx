import React, { useState } from 'react';
import {
  ArrowUp,
  CornerUpRight,
  Eye,
  Play,
  GripVertical,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CodeBlock {
  id: string;
  label: string;
  iconType: 'move' | 'turn' | 'detect' | 'start';
  bgGradient: string;
  colorName: string;
  shadowColor: string;
  correctSlot: number; // 1-indexed (1, 2, 3, 4)
}

const ALL_BLOCKS: CodeBlock[] = [
  {
    id: 'move',
    label: 'Move Forward',
    iconType: 'move',
    bgGradient: 'from-[#8b5cf6] to-[#7c3aed]', // Purple
    colorName: '#8b5cf6',
    shadowColor: 'rgba(139, 92, 246, 0.35)',
    correctSlot: 2,
  },
  {
    id: 'turn',
    label: 'Turn Right',
    iconType: 'turn',
    bgGradient: 'from-[#f43f5e] to-[#e11d48]', // Pink / Rose
    colorName: '#f43f5e',
    shadowColor: 'rgba(244, 63, 94, 0.35)',
    correctSlot: 4,
  },
  {
    id: 'detect',
    label: 'Detect Object',
    iconType: 'detect',
    bgGradient: 'from-[#06b6d4] to-[#0284c7]', // Cyan / Blue
    colorName: '#06b6d4',
    shadowColor: 'rgba(6, 182, 212, 0.35)',
    correctSlot: 3,
  },
  {
    id: 'start',
    label: 'Start',
    iconType: 'start',
    bgGradient: 'from-[#10b981] to-[#059669]', // Emerald Green
    colorName: '#10b981',
    shadowColor: 'rgba(16, 185, 129, 0.35)',
    correctSlot: 1,
  },
];

export const CodeBlockSequence: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  // Slots 1 to 4: null or block id
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null]);
  const [isDriving, setIsDriving] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Check if all 4 slots are filled
  const allFilled = slots.every((s) => s !== null);
  // Correct sequence is: Start (slot 1), Move Forward (slot 2), Detect Object (slot 3), Turn Right (slot 4)
  const isCorrectSequence =
    slots[0] === 'start' &&
    slots[1] === 'move' &&
    slots[2] === 'detect' &&
    slots[3] === 'turn';

  // Trigger robot run when sequence is complete
  const handleRunCode = (customSlots?: (string | null)[]) => {
    const activeSlots = customSlots || slots;
    if (activeSlots.every((s) => s !== null)) {
      setIsDriving(true);
      setShowCelebration(true);
    }
  };

  // Place a block in the first available empty slot
  const handlePlaceBlock = (blockId: string) => {
    const emptyIndex = slots.findIndex((s) => s === null);
    if (emptyIndex === -1) return;

    const newSlots = [...slots];
    newSlots[emptyIndex] = blockId;
    setSlots(newSlots);

    // If this fills the last slot, trigger run
    if (newSlots.every((s) => s !== null)) {
      setTimeout(() => {
        handleRunCode(newSlots);
      }, 300);
    }
  };

  // Remove block from a specific slot
  const handleRemoveFromSlot = (slotIndex: number) => {
    if (slots[slotIndex] === null) return;
    const newSlots = [...slots];
    newSlots[slotIndex] = null;
    setSlots(newSlots);
    setIsDriving(false);
    setShowCelebration(false);
  };

  // Reset everything
  const handleReset = () => {
    setSlots([null, null, null, null]);
    setIsDriving(false);
    setShowCelebration(false);
  };

  // Quick auto-arrange to see robot drive
  const handleAutoSolve = () => {
    const solved = ['start', 'move', 'detect', 'turn'];
    setSlots(solved);
    setTimeout(() => {
      setIsDriving(true);
      setShowCelebration(true);
    }, 200);
  };

  // Render block icon helper
  const renderIcon = (type: CodeBlock['iconType']) => {
    switch (type) {
      case 'move':
        return <ArrowUp className="w-4 h-4 text-white stroke-[2.5]" />;
      case 'turn':
        return <CornerUpRight className="w-4 h-4 text-white stroke-[2.5]" />;
      case 'detect':
        return <Eye className="w-4 h-4 text-white stroke-[2.5]" />;
      case 'start':
        return <Play className="w-4 h-4 text-white fill-white stroke-[2]" />;
    }
  };

  return (
    <div
      className={`relative w-full max-w-[620px] mx-auto select-none flex flex-col items-center ${className}`}
      role="region"
      aria-label="Help the Robot code block sequence activity"
    >
      {/* Top Floating Instruction Pill */}
      <div className="w-full flex items-center justify-between mb-3 px-1 sm:px-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/95 text-slate-700 border border-slate-200/90 shadow-sm">
          <span className="text-base leading-none">💡</span>
          <span className="font-semibold text-slate-800">
            Arrange the blocks to move the robot!
          </span>
        </div>

        {/* Reset / Solve Shortcut */}
        <div className="flex items-center gap-2">
          {slots.some((s) => s !== null) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:text-rose-600 transition-all cursor-pointer"
              title="Reset blocks"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {!allFilled && (
            <button
              type="button"
              onClick={handleAutoSolve}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
              title="Auto-fill correct sequence"
            >
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Auto-Fill</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="relative w-full rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-4 sm:p-6 overflow-hidden">
        {/* Soft Background Radial Lighting */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-radial from-rose-100/30 via-pink-50/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-center">
          
          {/* ============================================================== */}
          {/* LEFT: AVAILABLE CODE BLOCKS DOCK (4 cols)                      */}
          {/* ============================================================== */}
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-slate-600">
                Code Blocks
              </span>
              <span className="text-[10px] text-slate-600 font-medium">
                Tap to place
              </span>
            </div>

            <div className="space-y-2">
              {ALL_BLOCKS.map((block) => {
                const isUsed = slots.includes(block.id);
                return (
                  <button
                    key={block.id}
                    type="button"
                    disabled={isUsed}
                    onClick={() => handlePlaceBlock(block.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs text-white transition-all duration-200 text-left shadow-sm ${
                      isUsed
                        ? 'opacity-25 scale-95 pointer-events-none bg-slate-200 text-slate-400 shadow-none'
                        : `bg-gradient-to-r ${block.bgGradient} hover:scale-[1.03] active:scale-[0.98] cursor-pointer hover:shadow-md`
                    }`}
                    style={{
                      boxShadow: isUsed ? 'none' : `0 4px 12px ${block.shadowColor}`,
                    }}
                    title={`Place ${block.label} in next empty slot`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                        {renderIcon(block.iconType)}
                      </div>
                      <span className="tracking-wide">{block.label}</span>
                    </div>

                    <GripVertical className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONNECTOR ARROW (Decorative in center) */}
          <div className="hidden md:flex md:col-span-1 justify-center items-center">
            <div className="flex flex-col items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12 H18 M14 7 L19 12 L14 17"
                  stroke="#94a3b8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
          </div>

          {/* ============================================================== */}
          {/* CENTER: NUMBERED CODE SEQUENCE SLOTS (4 cols)                 */}
          {/* ============================================================== */}
          <div className="md:col-span-3 flex flex-col gap-2">
            <div className="px-1 text-[11px] font-mono font-bold tracking-wider uppercase text-slate-600">
              Program Steps
            </div>

            <div className="bg-slate-50/70 p-2.5 rounded-2xl border border-slate-200/80 space-y-2">
              {[0, 1, 2, 3].map((slotIdx) => {
                const slottedId = slots[slotIdx];
                const block = slottedId
                  ? ALL_BLOCKS.find((b) => b.id === slottedId)
                  : null;

                return (
                  <div key={slotIdx} className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-600 w-3 text-center">
                      {slotIdx + 1}
                    </span>

                    <div className="flex-1">
                      {block ? (
                        <div
                          onClick={() => handleRemoveFromSlot(slotIdx)}
                          className={`flex items-center justify-between px-3 py-1.5 rounded-xl text-white font-bold text-xs bg-gradient-to-r ${block.bgGradient} shadow-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all`}
                          title="Click to remove from slot"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="scale-90">{renderIcon(block.iconType)}</span>
                            <span className="truncate">{block.label}</span>
                          </div>
                          <span className="text-[10px] opacity-75">✕</span>
                        </div>
                      ) : (
                        <div className="h-8 rounded-xl border-2 border-dashed border-slate-200 bg-white flex items-center justify-center text-[11px] text-slate-400 font-mono">
                          Slot {slotIdx + 1}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT: ANIMATED 3D ROVER ROBOT & CELEBRATION (4 cols)          */}
          {/* ============================================================== */}
          <div className="md:col-span-4 flex flex-col items-center justify-center relative min-h-[190px] pt-4">
            
            {/* Pop-up Celebration Speech Bubble */}
            <div
              className={`absolute top-0 z-30 transition-all duration-500 ease-out transform ${
                showCelebration
                  ? 'opacity-100 scale-100 -translate-y-2'
                  : 'opacity-0 scale-75 pointer-events-none'
              }`}
            >
              <div className="relative bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-2xl shadow-lg shadow-rose-500/25 flex flex-col items-center">
                <span>{isCorrectSequence ? 'Great!' : 'Awesome!'}</span>
                <span className="text-[11px] font-semibold text-rose-100">
                  {isCorrectSequence ? 'Code Complete! 🎉' : 'Program Running! 🚀'}
                </span>
                {/* Speech tail pointing down */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rotate-45" />
              </div>
            </div>

            {/* Illustrated 3D Claymorphic Rover Robot SVG */}
            <div
              className={`relative transition-transform duration-700 ease-in-out ${
                isDriving ? 'translate-x-6 sm:translate-x-8' : 'translate-x-0'
              }`}
            >
              <svg
                width="160"
                height="130"
                viewBox="0 0 160 130"
                className="overflow-visible"
              >
                <defs>
                  {/* Robot Chassis Gradient */}
                  <linearGradient id="robot-chassis" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="40%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>

                  {/* Robot Face Screen Gradient */}
                  <linearGradient id="robot-face" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>

                  {/* Wheel Tire Gradient */}
                  <linearGradient id="robot-tire" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#475569" />
                    <stop offset="50%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#0f172a" />
                  </linearGradient>

                  {/* Soft Clay Shadow */}
                  <filter id="robot-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#0f172a" floodOpacity="0.16" />
                  </filter>
                </defs>

                {/* Ground Shadow */}
                <ellipse cx="80" cy="116" rx="60" ry="8" fill="#0f172a" opacity="0.08" />

                {/* Left/Rear Wheels */}
                <g className={isDriving ? 'animate-spin' : ''} style={{ transformOrigin: '42px 98px' }}>
                  <rect x="34" y="86" width="16" height="24" rx="6" fill="url(#robot-tire)" />
                  <ellipse cx="42" cy="98" rx="4" ry="7" fill="#64748b" />
                </g>

                <g className={isDriving ? 'animate-spin' : ''} style={{ transformOrigin: '118px 98px' }}>
                  <rect x="110" y="86" width="16" height="24" rx="6" fill="url(#robot-tire)" />
                  <ellipse cx="118" cy="98" rx="4" ry="7" fill="#64748b" />
                </g>

                {/* Robot Main Blue Chassis Base */}
                <rect
                  x="44"
                  y="72"
                  width="72"
                  height="30"
                  rx="12"
                  fill="url(#robot-chassis)"
                  filter="url(#robot-shadow)"
                />

                {/* Front Bumper & Sensor LEDs */}
                <circle cx="58" cy="88" r="3.5" fill="#facc15" />
                <circle cx="102" cy="88" r="3.5" fill="#facc15" />

                {/* Robot Head / Screen Housing */}
                <rect
                  x="48"
                  y="34"
                  width="64"
                  height="42"
                  rx="14"
                  fill="url(#robot-chassis)"
                  filter="url(#robot-shadow)"
                />

                {/* Dark Visor Screen */}
                <rect
                  x="53"
                  y="39"
                  width="54"
                  height="32"
                  rx="10"
                  fill="url(#robot-face)"
                />

                {/* Expressive Cute Animated Eyes */}
                {isDriving || showCelebration ? (
                  // Happy Smiling Eyes (^ ^)
                  <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none">
                    <path d="M 64 57 Q 70 48 76 57" />
                    <path d="M 84 57 Q 90 48 96 57" />
                  </g>
                ) : (
                  // Curious Big Round Eyes (👀)
                  <g>
                    {/* Left Eye */}
                    <ellipse cx="70" cy="55" rx="6" ry="7" fill="#ffffff" />
                    <circle cx="71" cy="55" r="4" fill="#0284c7" />
                    <circle cx="72" cy="53" r="1.5" fill="#ffffff" />

                    {/* Right Eye */}
                    <ellipse cx="90" cy="55" rx="6" ry="7" fill="#ffffff" />
                    <circle cx="91" cy="55" r="4" fill="#0284c7" />
                    <circle cx="92" cy="53" r="1.5" fill="#ffffff" />
                  </g>
                )}

                {/* Yellow Flag on Antenna Mast */}
                <g>
                  {/* Antenna Post */}
                  <line x1="38" y1="78" x2="38" y2="40" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="38" cy="40" r="2.5" fill="#f59e0b" />
                  {/* Waving Flag */}
                  <path
                    d="M 38 40 Q 24 36 22 46 Q 30 52 38 48 Z"
                    fill="#f59e0b"
                    className={isDriving ? 'animate-bounce' : ''}
                  />
                </g>

                {/* Front Wheels (Chunky 3D tires in foreground) */}
                <g className={isDriving ? 'animate-spin' : ''} style={{ transformOrigin: '54px 106px' }}>
                  <rect x="44" y="94" width="20" height="24" rx="7" fill="url(#robot-tire)" filter="url(#robot-shadow)" />
                  <ellipse cx="54" cy="106" rx="5" ry="7" fill="#94a3b8" />
                  <circle cx="54" cy="106" r="2.5" fill="#334155" />
                </g>

                <g className={isDriving ? 'animate-spin' : ''} style={{ transformOrigin: '106px 106px' }}>
                  <rect x="96" y="94" width="20" height="24" rx="7" fill="url(#robot-tire)" filter="url(#robot-shadow)" />
                  <ellipse cx="106" cy="106" rx="5" ry="7" fill="#94a3b8" />
                  <circle cx="106" cy="106" r="2.5" fill="#334155" />
                </g>

                {/* Cute Traffic Cone ⚠️ on side */}
                <g transform="translate(18, 92) scale(0.9)">
                  <polygon points="12,0 3,24 21,24" fill="#f97316" />
                  <polygon points="10,6 6,14 18,14" fill="#ffffff" />
                  <rect x="0" y="23" width="24" height="4" rx="1.5" fill="#ea580c" />
                </g>
              </svg>
            </div>

            {/* Run / Drive Status Button */}
            <div className="mt-2 text-center">
              {allFilled ? (
                <button
                  type="button"
                  onClick={() => handleRunCode()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-md shadow-emerald-500/25 hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>{isDriving ? 'Run Again ↺' : 'Run Code ▶'}</span>
                </button>
              ) : (
                <span className="text-[11px] font-mono text-slate-500">
                  {`Fill all slots (${slots.filter((s) => s !== null).length}/4)`}
                </span>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
