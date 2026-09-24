import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  ArrowUp,
  CornerUpRight,
  CornerUpLeft,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

export type BlockType = 'start' | 'forward' | 'turn-right' | 'turn-left';

interface BlockDefinition {
  type: BlockType;
  label: string;
  icon: React.ReactNode;
  bgGradient: string;
  shadowColor: string;
}

// 6-dot grip icon matching the reference image
const GripDotsIcon: React.FC<{ className?: string }> = ({ className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 10 16" className={`${className} fill-white/60 pointer-events-none flex-shrink-0`}>
    <circle cx="3" cy="3" r="1.4" />
    <circle cx="7" cy="3" r="1.4" />
    <circle cx="3" cy="8" r="1.4" />
    <circle cx="7" cy="8" r="1.4" />
    <circle cx="3" cy="13" r="1.4" />
    <circle cx="7" cy="13" r="1.4" />
  </svg>
);

// Color-coded code blocks matching the reference image:
// START: Green (#10b981 / #059669)
// MOVE FORWARD: Blue (#0284c7 / #0369a1)
// TURN RIGHT: Orange (#f97316 / #ea580c)
// TURN LEFT: Purple (#8b5cf6 / #7c3aed)
const BLOCK_DEFS: Record<BlockType, BlockDefinition> = {
  start: {
    type: 'start',
    label: 'START',
    icon: <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />,
    bgGradient: 'from-[#10b981] to-[#059669]',
    shadowColor: 'rgba(16, 185, 129, 0.4)',
  },
  forward: {
    type: 'forward',
    label: 'MOVE FORWARD',
    icon: <ArrowUp className="w-3.5 h-3.5 text-white stroke-[2.5]" />,
    bgGradient: 'from-[#0284c7] to-[#0369a1]',
    shadowColor: 'rgba(2, 132, 199, 0.4)',
  },
  'turn-right': {
    type: 'turn-right',
    label: 'TURN RIGHT',
    icon: <CornerUpRight className="w-3.5 h-3.5 text-white stroke-[2.5]" />,
    bgGradient: 'from-[#f97316] to-[#ea580c]',
    shadowColor: 'rgba(249, 115, 22, 0.4)',
  },
  'turn-left': {
    type: 'turn-left',
    label: 'TURN LEFT',
    icon: <CornerUpLeft className="w-3.5 h-3.5 text-white stroke-[2.5]" />,
    bgGradient: 'from-[#8b5cf6] to-[#7c3aed]',
    shadowColor: 'rgba(139, 92, 246, 0.4)',
  },
};

// 5x5 Grid Labels
const COL_LABELS = ['A', 'B', 'C', 'D', 'E'];
const ROW_LABELS = ['1', '2', '3', '4', '5'];

// Coordinates for A1 (Start) and C5 (Destination)
const START_COORD = { col: 0, row: 0 }; // A1
const DEST_COORD = { col: 2, row: 4 }; // C5

// Tile kinds matching the reference image:
type CellKind =
  | 'start' // A1
  | 'dest' // C5
  | 'cream' // Light warm cream ground
  | 'grass' // Bright lime-green grass
  | 'tree' // Green grass + 3D Pine Tree
  | 'rock' // Ground + 3D Grey Rock
  | 'tuft'; // Green grass + Grass blades tuft

interface CellConfig {
  col: number;
  row: number;
  kind: CellKind;
}

// Exactly matches the 25 cells of the attached reference image:
const GRID_CELLS: CellConfig[][] = [
  // Row 1 (idx 0)
  [
    { col: 0, row: 0, kind: 'start' }, // A1 (Start Robot)
    { col: 1, row: 0, kind: 'tree' }, // B1 (Tree)
    { col: 2, row: 0, kind: 'cream' }, // C1
    { col: 3, row: 0, kind: 'cream' }, // D1
    { col: 4, row: 0, kind: 'rock' }, // E1 (Rock)
  ],
  // Row 2 (idx 1)
  [
    { col: 0, row: 1, kind: 'cream' }, // A2 (Path down arrow)
    { col: 1, row: 1, kind: 'rock' }, // B2 (Rock)
    { col: 2, row: 1, kind: 'cream' }, // C2
    { col: 3, row: 1, kind: 'tuft' }, // D2 (Tuft)
    { col: 4, row: 1, kind: 'cream' }, // E2
  ],
  // Row 3 (idx 2)
  [
    { col: 0, row: 2, kind: 'grass' }, // A3 (Turn Left Corner)
    { col: 1, row: 2, kind: 'cream' }, // B3 (Path right arrow)
    { col: 2, row: 2, kind: 'grass' }, // C3 (Turn Right Corner)
    { col: 3, row: 2, kind: 'cream' }, // D3
    { col: 4, row: 2, kind: 'tree' }, // E3 (Tree)
  ],
  // Row 4 (idx 3)
  [
    { col: 0, row: 3, kind: 'tree' }, // A4 (Tree)
    { col: 1, row: 3, kind: 'tuft' }, // B4 (Tuft)
    { col: 2, row: 3, kind: 'cream' }, // C4 (Path down arrow)
    { col: 3, row: 3, kind: 'rock' }, // D4 (Rock)
    { col: 4, row: 3, kind: 'tuft' }, // E4 (Tuft)
  ],
  // Row 5 (idx 4)
  [
    { col: 0, row: 4, kind: 'tuft' }, // A5 (Tuft)
    { col: 1, row: 4, kind: 'cream' }, // B5
    { col: 2, row: 4, kind: 'dest' }, // C5 (Destination Flag 🚩)
    { col: 3, row: 4, kind: 'cream' }, // D5
    { col: 4, row: 4, kind: 'tree' }, // E5 (Tree)
  ],
];

// 3D Illustrated Pine Tree component matching screenshot
const PineTree3D: React.FC = () => (
  <svg viewBox="0 0 44 54" className="w-9 h-11 sm:w-10 sm:h-12 drop-shadow-sm overflow-visible pointer-events-none">
    {/* Trunk */}
    <rect x="19" y="40" width="6" height="8" rx="2" fill="#78350f" />
    
    {/* Bottom Tier Conical foliage */}
    <polygon points="22,22 6,42 38,42" fill="#15803d" />
    <polygon points="22,22 6,42 22,42" fill="#16a34a" />
    <polygon points="22,22 14,42 38,42" fill="#22c55e" opacity="0.6" />

    {/* Middle Tier Conical foliage */}
    <polygon points="22,12 10,28 34,28" fill="#16a34a" />
    <polygon points="22,12 10,28 22,28" fill="#22c55e" />
    <polygon points="22,12 18,28 34,28" fill="#4ade80" opacity="0.6" />

    {/* Top Tier Conical foliage */}
    <polygon points="22,2 14,17 30,17" fill="#22c55e" />
    <polygon points="22,2 14,17 22,17" fill="#4ade80" />
    <polygon points="22,2 20,17 30,17" fill="#86efac" opacity="0.7" />
  </svg>
);

// 3D Illustrated Grey Rock with grass base
const RockWithGrass3D: React.FC = () => (
  <svg viewBox="0 0 46 38" className="w-9 h-8 sm:w-10 sm:h-9 drop-shadow-xs pointer-events-none overflow-visible">
    {/* Small grass base */}
    <ellipse cx="23" cy="28" rx="17" ry="6" fill="#86efac" />
    <circle cx="10" cy="27" r="3" fill="#22c55e" />
    <circle cx="35" cy="27" r="3" fill="#22c55e" />
    <circle cx="21" cy="30" r="2.5" fill="#16a34a" />

    {/* 3D Grey Boulder */}
    <path
      d="M 14 28 C 7 26, 8 16, 15 11 C 21 6, 31 8, 36 14 C 41 19, 38 27, 33 29 Z"
      fill="#475569"
    />
    <path
      d="M 16 26 C 11 24, 12 17, 17 13 C 22 9, 29 11, 33 16 C 36 20, 34 25, 30 27 Z"
      fill="#64748b"
    />
    <path
      d="M 19 23 C 15 21, 16 16, 20 13 C 23 10, 28 12, 30 16 C 31 19, 30 23, 27 24 Z"
      fill="#94a3b8"
    />
    <ellipse cx="22" cy="15" rx="5" ry="3" fill="#cbd5e1" opacity="0.85" />
  </svg>
);

// 3D Grass Blades Tuft
const GrassTuft3D: React.FC = () => (
  <svg viewBox="0 0 28 24" className="w-6 h-5 sm:w-7 sm:h-6 pointer-events-none opacity-90">
    <path d="M 5 21 Q 7 10 10 5 Q 11 13 13 21" fill="#15803d" />
    <path d="M 12 21 Q 14 7 17 3 Q 18 12 20 21" fill="#22c55e" />
    <path d="M 18 21 Q 20 11 23 7 Q 24 14 25 21" fill="#16a34a" />
  </svg>
);

// 3D Red Destination Flag on green mound
const DestinationFlag3D: React.FC = () => (
  <div className="relative flex flex-col items-center justify-center -mt-2">
    <svg viewBox="0 0 46 54" className="w-10 h-12 sm:w-11 sm:h-13 drop-shadow-sm overflow-visible">
      {/* Green grass mound */}
      <ellipse cx="23" cy="46" rx="16" ry="6" fill="#86efac" />
      <ellipse cx="23" cy="45" rx="12" ry="4" fill="#4ade80" />
      
      {/* Mast */}
      <line x1="12" y1="46" x2="12" y2="6" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="12" cy="6" r="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
      
      {/* Waving Red Flag matching reference image */}
      <path
        d="M 12 8 C 22 5, 30 13, 42 9 C 42 22, 26 19, 12 25 Z"
        fill="#e11d48"
        stroke="#be123c"
        strokeWidth="1"
      />
      {/* Flag highlight crease */}
      <path
        d="M 23 7 C 27 12, 29 17, 27 22"
        fill="none"
        stroke="#fda4af"
        strokeWidth="1.5"
        opacity="0.7"
      />
    </svg>
  </div>
);

export const RobotPathPuzzle: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  // 4 Program slots: exactly as requested
  const [program, setProgram] = useState<(BlockType | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  // Live execution states
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [gameStatus, setGameStatus] = useState<
    'idle' | 'running' | 'success' | 'failed'
  >('idle');

  // Robot live position and angle (Initial: A1, facing DOWN = 90 deg)
  const [robotPos, setRobotPos] = useState<{ col: number; row: number }>(START_COORD);
  const [robotAngle, setRobotAngle] = useState<number>(90); // 90 = DOWN
  const [robotEyesHappy, setRobotEyesHappy] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const executionTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Clear all pending timeouts on unmount or reset
  const clearTimeouts = useCallback(() => {
    executionTimeoutsRef.current.forEach(clearTimeout);
    executionTimeoutsRef.current = [];
  }, []);

  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  // Reset robot to starting position A1 facing DOWN
  const resetRobot = useCallback(() => {
    clearTimeouts();
    setRobotPos(START_COORD);
    setRobotAngle(90); // 90 = DOWN
    setActiveStepIndex(null);
    setRobotEyesHappy(false);
    setGameStatus('idle');
    setStatusMessage('');
  }, [clearTimeouts]);

  // Add block to first available slot
  const handleAddBlock = (type: BlockType) => {
    if (gameStatus === 'running') return;
    const firstEmpty = program.findIndex((slot) => slot === null);
    if (firstEmpty === -1) return;

    const updated = [...program];
    updated[firstEmpty] = type;
    setProgram(updated);
    setGameStatus('idle');
    setStatusMessage('');
  };

  // Remove block from slot
  const handleRemoveBlock = (index: number) => {
    if (gameStatus === 'running') return;
    const updated = [...program];
    updated[index] = null;
    setProgram(updated);
    setGameStatus('idle');
    setStatusMessage('');
  };

  // Drag and drop onto slot
  const handleDropOnSlot = (slotIdx: number, typeStr: string) => {
    if (gameStatus === 'running') return;
    if (typeStr in BLOCK_DEFS) {
      const updated = [...program];
      updated[slotIdx] = typeStr as BlockType;
      setProgram(updated);
      setGameStatus('idle');
      setStatusMessage('');
    }
  };

  // Reset entire program
  const handleClearProgram = () => {
    if (gameStatus === 'running') return;
    setProgram([null, null, null, null]);
    resetRobot();
  };

  // Execute the program
  const handleRunProgram = () => {
    if (gameStatus === 'running') return;

    clearTimeouts();
    setRobotPos(START_COORD);
    setRobotAngle(90);
    setActiveStepIndex(null);
    setRobotEyesHappy(false);
    setGameStatus('running');
    setStatusMessage('');

    // Check if the program matches the intended sequence:
    // 1. START
    // 2. MOVE FORWARD
    // 3. TURN LEFT
    // 4. TURN RIGHT
    const isCorrect =
      program[0] === 'start' &&
      program[1] === 'forward' &&
      program[2] === 'turn-left' &&
      program[3] === 'turn-right';

    // Timeline execution helper
    const schedule = (fn: () => void, delayMs: number) => {
      const id = setTimeout(fn, delayMs);
      executionTimeoutsRef.current.push(id);
    };

    if (isCorrect) {
      // -------------------------------------------------------------
      // EXACT INTENDED SEQUENCE EXECUTION:
      // A1 -> A3 -> C3 -> C5
      // -------------------------------------------------------------

      // Step 1: START (at A1, no movement, robot wakes up & smiles)
      schedule(() => {
        setActiveStepIndex(0);
        setRobotEyesHappy(true);
      }, 300);

      // Step 2: MOVE FORWARD (A1 -> A2 -> A3)
      schedule(() => {
        setActiveStepIndex(1);
        setRobotEyesHappy(false);
        // Move A1 -> A2
        setRobotPos({ col: 0, row: 1 });
      }, 900);

      schedule(() => {
        // Move A2 -> A3
        setRobotPos({ col: 0, row: 2 });
      }, 1400);

      // Step 3: TURN LEFT (at A3, changes direction DOWN -> RIGHT, travels A3 -> B3 -> C3)
      schedule(() => {
        setActiveStepIndex(2);
        // Turn from DOWN (90) to RIGHT (0)
        setRobotAngle(0);
      }, 1900);

      schedule(() => {
        // Move A3 -> B3
        setRobotPos({ col: 1, row: 2 });
      }, 2350);

      schedule(() => {
        // Move B3 -> C3
        setRobotPos({ col: 2, row: 2 });
      }, 2800);

      // Step 4: TURN RIGHT (at C3, changes direction RIGHT -> DOWN, travels C3 -> C4 -> C5)
      schedule(() => {
        setActiveStepIndex(3);
        // Turn from RIGHT (0) to DOWN (90)
        setRobotAngle(90);
      }, 3300);

      schedule(() => {
        // Move C3 -> C4
        setRobotPos({ col: 2, row: 3 });
      }, 3750);

      schedule(() => {
        // Move C4 -> C5 (DESTINATION REACHED! 🚩)
        setRobotPos(DEST_COORD);
      }, 4200);

      // Success celebration!
      schedule(() => {
        setActiveStepIndex(null);
        setGameStatus('success');
        setRobotEyesHappy(true);
        setStatusMessage('Mission Complete! 🎉 You guided the robot to C5!');
      }, 4650);
    } else {
      // -------------------------------------------------------------
      // INCORRECT SEQUENCE: Fail gracefully & encourage try again
      // -------------------------------------------------------------
      schedule(() => {
        setActiveStepIndex(0);
        if (program[0] === 'start') {
          setRobotEyesHappy(true);
        } else {
          setRobotPos({ col: 0, row: 1 });
        }
      }, 400);

      schedule(() => {
        setActiveStepIndex(1);
        setRobotEyesHappy(false);
        if (program[1] === 'forward') {
          setRobotPos({ col: 0, row: 2 });
        } else {
          setRobotAngle(0);
        }
      }, 1000);

      schedule(() => {
        setActiveStepIndex(null);
        setGameStatus('failed');
        setStatusMessage('Almost there! 🤖 Try another sequence.');
      }, 1600);
    }
  };

  return (
    <div
      className={`relative w-full max-w-[880px] mx-auto select-none flex flex-col items-center ${className}`}
      role="region"
      aria-label="Robot Path Puzzle Activity"
    >
      {/* Outer Shell matching the attached reference image */}
      <div className="w-full rounded-[2rem] bg-[#f0f4f9] p-3.5 sm:p-5 md:p-6 border border-slate-200/80 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN: CODE BLOCKS & YOUR PROGRAM (md:col-span-5)        */}
          {/* ============================================================== */}
          <div className="md:col-span-5 flex flex-col gap-3.5 sm:gap-4 justify-between">
            
            {/* CARD 1: CODE BLOCKS */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm">
              <h3 className="text-sm font-extrabold text-[#0f172a] mb-2.5">
                Code Blocks
              </h3>

              {/* In the reference screenshot, order is: START, MOVE FORWARD, TURN RIGHT, TURN LEFT */}
              <div className="space-y-2">
                {(['start', 'forward', 'turn-right', 'turn-left'] as BlockType[]).map((type) => {
                  const def = BLOCK_DEFS[type];
                  return (
                    <button
                      key={type}
                      type="button"
                      draggable={gameStatus !== 'running'}
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', type);
                      }}
                      onClick={() => handleAddBlock(type)}
                      disabled={gameStatus === 'running'}
                      className={`w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-xl text-xs font-bold transition-all duration-200 text-left cursor-pointer active:scale-95 bg-gradient-to-r ${def.bgGradient} text-white hover:scale-[1.01] shadow-sm`}
                      style={{ boxShadow: `0 3px 10px ${def.shadowColor}` }}
                      title={`Add ${def.label} to program`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                          {def.icon}
                        </div>
                        <span className="truncate text-xs font-black tracking-wide">
                          {def.label}
                        </span>
                      </div>
                      <GripDotsIcon />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CARD 2: YOUR PROGRAM */}
            <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-sm font-extrabold text-[#0f172a] mb-2.5">
                  Your Program
                </h3>

                {/* 4 Program Slots */}
                <div className="space-y-2">
                  {[0, 1, 2, 3].map((slotIdx) => {
                    const slottedType = program[slotIdx];
                    const blockDef = slottedType ? BLOCK_DEFS[slottedType] : null;
                    const isActive = activeStepIndex === slotIdx;

                    return (
                      <div
                        key={slotIdx}
                        className="flex items-center gap-2.5"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => {
                          e.preventDefault();
                          const typeStr = e.dataTransfer.getData('text/plain');
                          handleDropOnSlot(slotIdx, typeStr);
                        }}
                      >
                        {/* Slot Number (1, 2, 3, 4) in bold grey font matching screenshot */}
                        <span className="font-extrabold text-xs text-slate-400 w-3 text-center flex-shrink-0">
                          {slotIdx + 1}
                        </span>

                        <div className="flex-1">
                          {blockDef ? (
                            <div
                              onClick={() => handleRemoveBlock(slotIdx)}
                              className={`flex items-center justify-between px-3 py-2 rounded-xl text-white font-black text-xs bg-gradient-to-r ${
                                blockDef.bgGradient
                              } shadow-sm cursor-pointer hover:opacity-90 active:scale-95 transition-all ${
                                isActive
                                  ? 'ring-2 ring-rose-400 scale-[1.02] shadow-md shadow-rose-500/30'
                                  : ''
                              }`}
                              title="Click to remove block"
                            >
                              <div className="flex items-center gap-2 truncate">
                                <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                  {blockDef.icon}
                                </div>
                                <span className="truncate tracking-wide">{blockDef.label}</span>
                              </div>
                              <GripDotsIcon />
                            </div>
                          ) : (
                            <div className="h-9 rounded-xl border border-dashed border-slate-200 bg-slate-50/50 flex items-center justify-center text-[11px] text-slate-300 font-semibold hover:border-slate-300 transition-colors">
                              Empty Slot
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Buttons: CLEAR & RUN */}
              <div className="mt-4 pt-1 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleClearProgram}
                  disabled={gameStatus === 'running'}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-xs text-slate-600 bg-[#edf2f7] hover:bg-[#e2e8f0] border border-slate-200/60 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>CLEAR</span>
                </button>

                <button
                  type="button"
                  onClick={handleRunProgram}
                  disabled={gameStatus === 'running'}
                  className="flex-[1.4] inline-flex items-center justify-center gap-2 py-2.5 rounded-xl font-black text-xs text-white uppercase tracking-wider bg-gradient-to-r from-[#ff2d55] to-[#f43f5e] hover:from-[#e11d48] hover:to-[#e11d48] active:scale-95 transition-all shadow-md shadow-rose-500/35 disabled:opacity-50 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-white text-white" />
                  <span>{gameStatus === 'running' ? 'RUNNING...' : 'RUN'}</span>
                </button>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: 5 × 5 GRID BOARD (md:col-span-7)                */}
          {/* ============================================================== */}
          <div className="md:col-span-7 bg-white p-3.5 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col items-center justify-between">
            
            {/* Board Container */}
            <div className="w-full max-w-[420px] mx-auto">
              
              {/* Column Headers (A, B, C, D, E) */}
              <div className="grid grid-cols-5 pl-5 sm:pl-6 pb-2 text-center">
                {COL_LABELS.map((colName) => (
                  <span
                    key={colName}
                    className="font-black text-xs sm:text-sm text-[#0f172a]"
                  >
                    {colName}
                  </span>
                ))}
              </div>

              {/* Row Grid with Row Labels (1 to 5) */}
              <div className="flex flex-row items-center gap-2 w-full">
                
                {/* Left Row Labels (1, 2, 3, 4, 5) */}
                <div className="flex flex-col justify-around h-full py-2 w-4 sm:w-5 text-center flex-shrink-0">
                  {ROW_LABELS.map((rowLabel) => (
                    <span
                      key={rowLabel}
                      className="font-black text-xs sm:text-sm text-[#0f172a] h-[18%] flex items-center justify-center"
                    >
                      {rowLabel}
                    </span>
                  ))}
                </div>

                {/* 5x5 Grid Board Container */}
                <div className="relative flex-1 aspect-square">
                  
                  {/* Grid Cells: 5 rows x 5 cols */}
                  <div className="grid grid-cols-5 grid-rows-5 gap-1.5 sm:gap-2 w-full h-full">
                    {GRID_CELLS.flat().map((cell) => {
                      const isStart = cell.col === 0 && cell.row === 0; // A1
                      const isDest = cell.col === 2 && cell.row === 4; // C5

                      return (
                        <div
                          key={`${cell.col}-${cell.row}`}
                          className={`relative w-full h-full rounded-2xl flex items-center justify-center transition-all ${
                            isStart
                              ? 'bg-[#cceaff] border border-[#a8d5fc] shadow-[0_3px_0_#98cbfa]' // Light Blue A1
                              : isDest
                              ? 'bg-[#ffd3db] border border-[#fbc0cb] shadow-[0_3px_0_#f2adb9]' // Light Pink C5
                              : cell.kind === 'cream'
                              ? 'bg-[#faebd7] border border-[#f2ddc2] shadow-[0_3px_0_#ebd2b4]' // Warm Cream
                              : 'bg-[#b7ea67] border border-[#a5dc50] shadow-[0_3px_0_#97cc43]' // Bright Grass
                          }`}
                        >
                          {/* Blue START badge on A1 */}
                          {isStart && (
                            <div className="absolute -bottom-2.5 z-20 pointer-events-none">
                              <span className="px-2 py-0.5 rounded-md bg-[#0091ff] text-[9px] font-black text-white shadow-sm uppercase tracking-wide">
                                START
                              </span>
                            </div>
                          )}

                          {/* Pink DESTINATION badge on C5 */}
                          {isDest && (
                            <>
                              <DestinationFlag3D />
                              <div className="absolute -bottom-2.5 z-20 pointer-events-none">
                                <span className="px-2 py-0.5 rounded-md bg-[#ff2460] text-[8px] sm:text-[9px] font-black text-white shadow-sm uppercase tracking-wide whitespace-nowrap">
                                  DESTINATION
                                </span>
                              </div>
                            </>
                          )}

                          {/* 3D Pine Tree */}
                          {cell.kind === 'tree' && <PineTree3D />}

                          {/* 3D Rock with Grass */}
                          {cell.kind === 'rock' && <RockWithGrass3D />}

                          {/* 3D Grass Blades Tuft */}
                          {cell.kind === 'tuft' && <GrassTuft3D />}

                          {/* ======================================================= */}
                          {/* PATH OVERLAYS EXACTLY AS IN THE REFERENCE SCREENSHOT:   */}
                          {/* ======================================================= */}

                          {/* 1. Downward blue dashed arrow on A2 pointing to A3 */}
                          {cell.col === 0 && cell.row === 1 && (
                            <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none p-1 overflow-visible">
                              {/* White backing for contrast */}
                              <line
                                x1="20"
                                y1="0"
                                x2="20"
                                y2="28"
                                stroke="#ffffff"
                                strokeWidth="6"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Blue dashed arrow shaft */}
                              <line
                                x1="20"
                                y1="0"
                                x2="20"
                                y2="28"
                                stroke="#0091ff"
                                strokeWidth="3.5"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Arrow Head */}
                              <polygon points="20,38 12,26 28,26" fill="#0091ff" stroke="#ffffff" strokeWidth="1.5" />
                            </svg>
                          )}

                          {/* 2. Purple 90-degree corner turning DOWN -> RIGHT on A3 */}
                          {cell.col === 0 && cell.row === 2 && (
                            <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none p-1 overflow-visible">
                              {/* White outer stroke */}
                              <path
                                d="M 20 0 L 20 18 Q 20 25 27 25 L 42 25"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Purple inner pipe */}
                              <path
                                d="M 20 0 L 20 18 Q 20 25 27 25 L 42 25"
                                fill="none"
                                stroke="#8b5cf6"
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {/* 3. Horizontal blue dashed arrow going RIGHT on B3 */}
                          {cell.col === 1 && cell.row === 2 && (
                            <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none p-1 overflow-visible">
                              {/* White backing */}
                              <line
                                x1="0"
                                y1="20"
                                x2="28"
                                y2="20"
                                stroke="#ffffff"
                                strokeWidth="6"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Blue dashed line */}
                              <line
                                x1="0"
                                y1="20"
                                x2="28"
                                y2="20"
                                stroke="#0091ff"
                                strokeWidth="3.5"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Arrow Head pointing right */}
                              <polygon points="38,20 26,12 26,28" fill="#0091ff" stroke="#ffffff" strokeWidth="1.5" />
                            </svg>
                          )}

                          {/* 4. Orange 90-degree corner turning RIGHT -> DOWN on C3 */}
                          {cell.col === 2 && cell.row === 2 && (
                            <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none p-1 overflow-visible">
                              {/* White outer stroke */}
                              <path
                                d="M 0 20 L 15 20 Q 22 20 22 27 L 22 42"
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              {/* Orange inner pipe */}
                              <path
                                d="M 0 20 L 15 20 Q 22 20 22 27 L 22 42"
                                fill="none"
                                stroke="#f97316"
                                strokeWidth="4.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}

                          {/* 5. Downward blue dashed arrow on C4 into C5 */}
                          {cell.col === 2 && cell.row === 3 && (
                            <svg viewBox="0 0 40 40" className="w-full h-full pointer-events-none p-1 overflow-visible">
                              {/* White backing */}
                              <line
                                x1="20"
                                y1="0"
                                x2="20"
                                y2="28"
                                stroke="#ffffff"
                                strokeWidth="6"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Blue dashed line */}
                              <line
                                x1="20"
                                y1="0"
                                x2="20"
                                y2="28"
                                stroke="#0091ff"
                                strokeWidth="3.5"
                                strokeDasharray="5 3.5"
                                strokeLinecap="round"
                              />
                              {/* Arrow Head */}
                              <polygon points="20,38 12,26 28,26" fill="#0091ff" stroke="#ffffff" strokeWidth="1.5" />
                            </svg>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* ===================================================== */}
                  {/* LIVE ANIMATED 3D ROBOT ROVER OVERLAY                 */}
                  {/* ===================================================== */}
                  <div
                    className="absolute z-30 pointer-events-none flex items-center justify-center transition-all duration-350 ease-in-out"
                    style={{
                      width: '20%',
                      height: '20%',
                      left: `${robotPos.col * 20}%`,
                      top: `${robotPos.row * 20}%`,
                    }}
                  >
                    <div
                      className="w-11 h-11 sm:w-13 sm:h-13 flex items-center justify-center transition-transform duration-300 ease-out drop-shadow-md"
                      style={{
                        transform: `rotate(${robotAngle - 90}deg)`, // 90 deg = Facing DOWN
                      }}
                    >
                      {/* Cute 3D Illustrated Robot SVG matching reference image */}
                      <svg viewBox="0 0 64 64" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="puzzle-head-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="70%" stopColor="#f8fafc" />
                            <stop offset="100%" stopColor="#e2e8f0" />
                          </linearGradient>

                          <linearGradient id="puzzle-body-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#38bdf8" />
                            <stop offset="50%" stopColor="#0284c7" />
                            <stop offset="100%" stopColor="#0369a1" />
                          </linearGradient>

                          <linearGradient id="puzzle-wheel-tread" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>

                        {/* Left & Right Treads / Wheels */}
                        <rect x="6" y="9" width="7" height="15" rx="3.5" fill="url(#puzzle-wheel-tread)" />
                        <rect x="51" y="9" width="7" height="15" rx="3.5" fill="url(#puzzle-wheel-tread)" />
                        <rect x="6" y="39" width="7" height="15" rx="3.5" fill="url(#puzzle-wheel-tread)" />
                        <rect x="51" y="39" width="7" height="15" rx="3.5" fill="url(#puzzle-wheel-tread)" />

                        {/* Blue Chassis Base */}
                        <rect x="11" y="15" width="42" height="34" rx="10" fill="url(#puzzle-body-blue)" />
                        
                        {/* Little white light / chest emblem */}
                        <rect x="25" y="42" width="14" height="4" rx="2" fill="#ffffff" opacity="0.9" />

                        {/* White Head Enclosure */}
                        <rect
                          x="14"
                          y="11"
                          width="36"
                          height="28"
                          rx="9"
                          fill="url(#puzzle-head-grad)"
                          stroke="#cbd5e1"
                          strokeWidth="1.2"
                        />

                        {/* Dark Visor Screen */}
                        <rect x="18" y="15" width="28" height="19" rx="6" fill="#0f172a" />

                        {/* Cute Eyes */}
                        {robotEyesHappy ? (
                          <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" fill="none">
                            <path d="M 22 25 Q 26 19 30 25" />
                            <path d="M 34 25 Q 38 19 42 25" />
                          </g>
                        ) : (
                          <g>
                            <ellipse cx="25" cy="24.5" rx="3.8" ry="4.5" fill="#38bdf8" />
                            <circle cx="26.5" cy="23.5" r="1.5" fill="#ffffff" />

                            <ellipse cx="39" cy="24.5" rx="3.8" ry="4.5" fill="#38bdf8" />
                            <circle cx="40.5" cy="23.5" r="1.5" fill="#ffffff" />
                          </g>
                        )}

                        {/* Little Antenna with round green tip */}
                        <line x1="32" y1="11" x2="32" y2="4" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="32" cy="4" r="3" fill="#10b981" stroke="#059669" strokeWidth="0.8" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* Bottom Status Feedback message */}
            <div className="w-full mt-3 text-center min-h-[22px]">
              {statusMessage ? (
                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    gameStatus === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {gameStatus === 'success' && <Sparkles className="w-3.5 h-3.5 text-emerald-600" />}
                  <span>{statusMessage}</span>
                </div>
              ) : (
                <span className="text-[11px] font-bold text-slate-400">
                  Target Route: A1 ↓ A3 → C3 ↓ C5 🚩
                </span>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
