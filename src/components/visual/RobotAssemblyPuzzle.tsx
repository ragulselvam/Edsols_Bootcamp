import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';

interface RobotAssemblyPuzzleProps {
  className?: string;
}

type RobotMood = 'idle' | 'looking' | 'smile' | 'wink' | 'super-happy';

interface ClickRipple {
  x: number;
  y: number;
  id: number;
}

export const RobotAssemblyPuzzle: React.FC<RobotAssemblyPuzzleProps> = ({
  className = '',
}) => {
  // Dynamic interactive robot state
  const [robotMood, setRobotMood] = useState<RobotMood>('smile');
  const [eyeOffset, setEyeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [antennaBlinking, setAntennaBlinking] = useState<boolean>(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState<number>(0);
  const [heartSparkle, setHeartSparkle] = useState<boolean>(false);
  
  // Physical rotation and lean towards click coordinate
  const [tilt, setTilt] = useState<{ rotateZ: number; translateX: number; translateY: number }>({
    rotateZ: 0,
    translateX: 0,
    translateY: 0,
  });

  // Click pulse indicator at clicked point
  const [clickRipple, setClickRipple] = useState<ClickRipple | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLDivElement>(null);
  const actionTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    actionTimerRef.current.forEach(clearTimeout);
    actionTimerRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  // Gaze, Rotate, and Smile towards clicked position anywhere in surrounding area
  const handleInteractionClick = (clientX: number, clientY: number, customSpeech?: string) => {
    clearTimers();
    const nextCount = clickCount + 1;
    setClickCount(nextCount);

    // Calculate relative click coordinate from robot center
    if (!robotRef.current || !containerRef.current) return;
    const robotRect = robotRef.current.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    const robotCenterX = robotRect.left + robotRect.width / 2;
    const robotCenterY = robotRect.top + robotRect.height / 2;

    const dx = clientX - robotCenterX;
    const dy = clientY - robotCenterY;
    const dist = Math.hypot(dx, dy);

    // Click visual ripple at exact spot
    const rippleX = clientX - containerRect.left;
    const rippleY = clientY - containerRect.top;
    setClickRipple({ x: rippleX, y: rippleY, id: Date.now() });

    // 1. Calculate realistic body tilt & gaze
    const maxAngle = 15; // degrees
    const rotateZ = Math.max(-maxAngle, Math.min(maxAngle, (dx / 220) * maxAngle));
    const translateX = Math.max(-12, Math.min(12, (dx / 220) * 12));
    const translateY = Math.max(-10, Math.min(10, (dy / 220) * 10));

    // 2. Calculate eye gaze direction
    const eyeX = Math.max(-8, Math.min(8, (dx / 180) * 8));
    const eyeY = Math.max(-6, Math.min(6, (dy / 180) * 6));

    // Apply rotation & eye gaze
    setTilt({ rotateZ, translateX, translateY });
    setEyeOffset({ x: eyeX, y: eyeY });
    setRobotMood('looking');

    // 3. "Blow the light": Blink antenna tip & collar light below antenna!
    setAntennaBlinking(true);
    setHeartSparkle(true);

    // Speech bubble message
    if (customSpeech) {
      setSpeechBubble(customSpeech);
    } else if (dist < 60) {
      const speeches = [
        'Beep Boop! 🤖 Hello!',
        'All Systems Online! ⚡',
        'Ready to Code! 🚀',
        'I Love Robotics! ✨',
      ];
      setSpeechBubble(speeches[nextCount % speeches.length]);
    } else {
      const directionWords = [];
      if (dy < -40) directionWords.push('Up');
      if (dy > 40) directionWords.push('Down');
      if (dx < -40) directionWords.push('Left');
      if (dx > 40) directionWords.push('Right');
      const dirText = directionWords.length > 0 ? directionWords.join('-') : 'Here';
      setSpeechBubble(`Looking ${dirText}! 👀 ✨`);
    }

    // 4. After 350ms: Transition into happy smile while still facing the point!
    const tSmile = setTimeout(() => {
      setRobotMood('super-happy');
    }, 320);

    // 5. "Make to normal position": Return back to center upright position after ~1300ms
    const tReset = setTimeout(() => {
      setTilt({ rotateZ: 0, translateX: 0, translateY: 0 });
      setEyeOffset({ x: 0, y: 0 });
      setAntennaBlinking(false);
      setHeartSparkle(false);
      setRobotMood('smile');
      setSpeechBubble(null);
      setClickRipple(null);
    }, 1350);

    actionTimerRef.current.push(tSmile, tReset);
  };

  // Natural eye blink every 3 seconds when resting
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setRobotMood((prev) => {
        if (prev === 'smile' || prev === 'idle') {
          setTimeout(() => {
            setRobotMood('smile');
          }, 180);
          return 'idle';
        }
        return prev;
      });
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={(e) => handleInteractionClick(e.clientX, e.clientY)}
      className={`relative w-full max-w-[640px] aspect-[1.12/1] sm:aspect-[1.18/1] select-none flex items-center justify-center bg-transparent cursor-crosshair ${className}`}
      role="region"
      aria-label="Interactive AI Robot Visual"
      title="Click anywhere around the robot to see it rotate, look, smile, and blink its antenna light!"
    >
      {/* Visual Ripple Marker at exact click coordinate */}
      {clickRipple && (
        <div
          key={clickRipple.id}
          className="absolute w-8 h-8 rounded-full border-2 border-sky-400 bg-sky-300/30 animate-ping pointer-events-none z-30"
          style={{
            left: clickRipple.x - 16,
            top: clickRipple.y - 16,
          }}
        />
      )}

      {/* ===================================================================== */}
      {/* 1. FLOATING COMPONENT: HEAD (TOP RIGHT)                                */}
      {/* ===================================================================== */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleInteractionClick(e.clientX, e.clientY, 'Head Module! 🧠');
        }}
        className="absolute top-[3%] right-[22%] sm:right-[24%] flex flex-col items-center z-20 cursor-pointer animate-float-slow group"
        title="Head Module: Vision & AI"
      >
        <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#ff5a79] text-white text-[10px] sm:text-xs font-black shadow-sm mb-1 uppercase tracking-wider group-hover:scale-105 transition-transform">
          Head
        </div>

        <div className="w-[68px] h-[56px] sm:w-[80px] sm:h-[66px] relative drop-shadow-md group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 80 66" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="head-outer-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>
              <linearGradient id="antenna-stem" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
            </defs>

            {/* Blue Antenna */}
            <path d="M 40 10 L 40 3" stroke="url(#antenna-stem)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="3" r="3" fill="#38bdf8" />

            {/* White glossy rounded head */}
            <rect
              x="6"
              y="10"
              width="68"
              height="52"
              rx="16"
              fill="url(#head-outer-grad)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
            />
            <rect x="2" y="27" width="5" height="16" rx="2.5" fill="#94a3b8" />
            <rect x="73" y="27" width="5" height="16" rx="2.5" fill="#94a3b8" />

            {/* Dark Visor Screen */}
            <rect x="14" y="16" width="52" height="38" rx="11" fill="#0f172a" />

            {/* Glowing Cyan Smiling Arch Eyes */}
            <path d="M 23 35 Q 29 26 35 35" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 45 35 Q 51 26 57 35" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
            <path d="M 37 42 Q 40 46 43 42" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. FLOATING COMPONENT: ARM (TOP LEFT)                                  */}
      {/* ===================================================================== */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleInteractionClick(e.clientX, e.clientY, 'Robotic Arm! 🦾');
        }}
        className="absolute top-[16%] left-[6%] sm:left-[10%] flex flex-col items-center z-20 cursor-pointer animate-float-medium group"
        title="Robotic Arm: Gripper & Kinematics"
      >
        <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#f59e0b] text-white text-[10px] sm:text-xs font-black shadow-sm mb-1 uppercase tracking-wider group-hover:scale-105 transition-transform">
          Arm
        </div>

        <div className="w-[74px] h-[74px] sm:w-[90px] sm:h-[90px] relative drop-shadow-md group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="arm-white" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="elbow-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </linearGradient>
            </defs>

            <circle cx="28" cy="74" r="8" fill="#334155" />
            <circle cx="28" cy="74" r="5" fill="#64748b" />

            <path d="M 28 74 Q 42 62 60 48" stroke="url(#arm-white)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="60" cy="48" r="9.5" fill="url(#elbow-gold)" stroke="#b45309" strokeWidth="0.8" />
            <ellipse cx="58" cy="45" rx="3.5" ry="2" fill="#fef08a" opacity="0.8" />

            <path d="M 60 48 Q 55 30 50 18" stroke="url(#arm-white)" strokeWidth="12" strokeLinecap="round" />
            <circle cx="50" cy="16" r="6" fill="#1e293b" />
            <path d="M 46 14 Q 40 8 46 3 Q 50 8 49 13" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
            <path d="M 54 14 Q 60 8 54 3 Q 50 8 51 13" fill="#0f172a" stroke="#334155" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* Floating secondary arm connector */}
      <div className="absolute top-[28%] right-[16%] sm:right-[18%] w-10 h-10 sm:w-12 sm:h-12 pointer-events-none opacity-80 animate-float-slow z-15">
        <svg viewBox="0 0 50 50" className="w-full h-full overflow-visible drop-shadow-sm">
          <path d="M 12 36 L 36 14" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <path d="M 12 36 L 36 14" stroke="#e2e8f0" strokeWidth="6" strokeLinecap="round" />
          <circle cx="12" cy="36" r="5" fill="#334155" />
          <circle cx="36" cy="14" r="5" fill="#0284c7" />
        </svg>
      </div>

      {/* ===================================================================== */}
      {/* 3. FLOATING COMPONENT: BATTERY (BOTTOM LEFT)                           */}
      {/* ===================================================================== */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleInteractionClick(e.clientX, e.clientY, 'Power Core! ⚡ 100%');
        }}
        className="absolute bottom-[6%] left-[10%] sm:left-[14%] flex flex-col items-center z-20 cursor-pointer animate-float-medium group"
        title="Battery Pack: 100% Charged"
      >
        <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#8b5cf6] text-white text-[10px] sm:text-xs font-black shadow-sm mb-1 uppercase tracking-wider group-hover:scale-105 transition-transform">
          Battery
        </div>

        <div className="w-[58px] h-[66px] sm:w-[70px] sm:h-[80px] relative drop-shadow-md group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 70 80" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="battery-body" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="60%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <linearGradient id="lightning-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="40%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
            </defs>

            <rect x="18" y="4" width="10" height="7" rx="2" fill="#94a3b8" />
            <rect x="42" y="4" width="10" height="7" rx="2" fill="#ef4444" />

            <rect x="10" y="10" width="50" height="60" rx="9" fill="url(#battery-body)" stroke="#475569" strokeWidth="1" />
            <rect x="12" y="12" width="46" height="6" rx="2" fill="#64748b" opacity="0.3" />

            <polygon
              points="38,22 24,42 35,42 32,60 48,36 37,36"
              fill="url(#lightning-gold)"
              stroke="#ca8a04"
              strokeWidth="0.8"
              className="drop-shadow-sm"
            />
          </svg>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 4. FLOATING COMPONENT: WHEEL (BOTTOM RIGHT)                           */}
      {/* ===================================================================== */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          handleInteractionClick(e.clientX, e.clientY, 'Wheel Motor! 🏎️');
        }}
        className="absolute bottom-[6%] right-[10%] sm:right-[14%] flex flex-col items-center z-20 cursor-pointer animate-float-medium group"
        title="Wheel Motor: Differential Drive"
      >
        <div className="px-2.5 sm:px-3 py-0.5 rounded-full bg-[#00b4d8] text-white text-[10px] sm:text-xs font-black shadow-sm mb-1 uppercase tracking-wider group-hover:scale-105 transition-transform">
          Wheel
        </div>

        <div className="w-[54px] h-[74px] sm:w-[66px] sm:h-[86px] relative drop-shadow-md group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 80 100" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="floating-wheel-rubber" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569" />
                <stop offset="45%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              <linearGradient id="floating-wheel-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="60%" stopColor="#00b4d8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>
            </defs>

            {/* Rubber Tire */}
            <ellipse
              cx="40"
              cy="50"
              rx="24"
              ry="44"
              fill="url(#floating-wheel-rubber)"
              stroke="#0f172a"
              strokeWidth="2.5"
            />

            {/* Tread notches */}
            <path d="M 20 22 L 24 24" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 18 36 L 23 38" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 18 50 L 23 50" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 18 64 L 23 62" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 20 78 L 24 76" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />

            {/* Cyan Hub */}
            <ellipse
              cx="42"
              cy="50"
              rx="14"
              ry="30"
              fill="url(#floating-wheel-cyan)"
              stroke="#0369a1"
              strokeWidth="1.5"
            />

            {/* Center Axle Bearing */}
            <ellipse cx="42" cy="50" rx="7" ry="16" fill="#0f172a" />
            <circle cx="42" cy="50" r="3.5" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 5. CENTRAL ROBOT (ROTATES & LOOKS TOWARDS CLICK POINT)                 */}
      {/* ===================================================================== */}
      <div
        ref={robotRef}
        className="relative z-20 flex flex-col items-center cursor-pointer select-none"
        style={{
          transform: `translate3d(${tilt.translateX}px, ${tilt.translateY}px, 0) rotate(${tilt.rotateZ}deg)`,
          transition: 'transform 320ms cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
        title="I can look in any direction you click!"
      >
        {/* Ground shadow under robot */}
        <div className="absolute -bottom-4 w-48 sm:w-60 h-8 bg-slate-900/10 rounded-full blur-md pointer-events-none -z-10" />

        {/* Speech Bubble / Expression Balloon above robot */}
        {speechBubble && (
          <div className="absolute -top-10 sm:-top-12 z-35 px-3.5 py-1.5 rounded-2xl bg-white/95 border-2 border-sky-300 text-sky-950 text-xs sm:text-sm font-black shadow-lg flex items-center gap-1.5 animate-bounce" style={{ animationDuration: '1.2s' }}>
            <MessageCircle className="w-3.5 h-3.5 text-sky-500 fill-sky-100 flex-shrink-0" />
            <span>{speechBubble}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-sky-300 rotate-45" />
          </div>
        )}

        {/* 3D Robot Character Container */}
        <div className="w-52 h-52 sm:w-64 sm:h-64 relative flex items-center justify-center">
          
          {/* Main Robot SVG */}
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              {/* Glossy White Robot Body Gradient */}
              <linearGradient id="main-robot-white" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </linearGradient>

              {/* Lower Body Blue Accent */}
              <linearGradient id="accent-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              {/* Wheels Tread Gradient */}
              <linearGradient id="wheel-tread-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="70%" stopColor="#1e293b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Antenna Glowing Aura */}
              <radialGradient id="antenna-glow-radial">
                <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ============================================================== */}
            {/* TWO CONSTANT SYMMETRICAL WHEELS (LEFT & RIGHT)                 */}
            {/* ============================================================== */}
            {/* 1. Left Wheel (Constant) */}
            <g id="left-wheel">
              <ellipse cx="44" cy="144" rx="14" ry="24" fill="url(#wheel-tread-dark)" />
              <ellipse cx="45" cy="144" rx="7" ry="15" fill="#00b4d8" />
              <ellipse cx="45" cy="144" rx="3.5" ry="8" fill="#1e293b" />
            </g>

            {/* 2. Right Wheel (Constant) */}
            <g id="right-wheel">
              <ellipse cx="156" cy="144" rx="14" ry="24" fill="url(#wheel-tread-dark)" />
              <ellipse cx="155" cy="144" rx="7" ry="15" fill="#00b4d8" />
              <ellipse cx="155" cy="144" rx="3.5" ry="8" fill="#1e293b" />
            </g>

            {/* Main Robot Torso / Chassis */}
            <rect
              x="54"
              y="108"
              width="92"
              height="48"
              rx="16"
              fill="url(#main-robot-white)"
              stroke="#cbd5e1"
              strokeWidth="1.2"
              className="drop-shadow-sm"
            />

            {/* Chest Cyan Accent Pill with glowing energy pulse bars */}
            <rect x="86" y="122" width="28" height="8" rx="4" fill="url(#accent-cyan)" />
            <g opacity="0.9">
              <line x1="92" y1="126" x2="95" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="98" y1="126" x2="102" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              <line x1="105" y1="126" x2="108" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* Head Connector Neck */}
            <rect x="88" y="98" width="24" height="12" rx="4" fill="#94a3b8" />

            {/* Robot Head Enclosure */}
            <rect
              x="52"
              y="38"
              width="96"
              height="68"
              rx="22"
              fill="url(#main-robot-white)"
              stroke="#cbd5e1"
              strokeWidth="1.4"
              className="drop-shadow-md"
            />

            {/* Ear knobs on Head */}
            <rect x="46" y="60" width="7" height="22" rx="3.5" fill="#94a3b8" />
            <rect x="147" y="60" width="7" height="22" rx="3.5" fill="#94a3b8" />

            {/* ============================================================== */}
            {/* ANTENNA + LIGHT BELOW IN ANTENNA (BLINKING INTERACTION)        */}
            {/* ============================================================== */}
            {/* 1. Light Below Antenna (Collar / Ring Beacon on Head) */}
            <g id="light-below-antenna">
              {antennaBlinking && (
                <ellipse
                  cx="100"
                  cy="38"
                  rx="16"
                  ry="7"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="2.5"
                  className="animate-ping"
                />
              )}
              <ellipse
                cx="100"
                cy="38"
                rx="8"
                ry="3.5"
                fill={antennaBlinking ? '#facc15' : '#0284c7'}
                stroke={antennaBlinking ? '#ca8a04' : '#0369a1'}
                strokeWidth="1"
                className="transition-colors duration-200"
              />
              <ellipse
                cx="100"
                cy="37.5"
                rx="4"
                ry="1.8"
                fill={antennaBlinking ? '#ffffff' : '#38bdf8'}
              />
            </g>

            {/* 2. Antenna Stem */}
            <path d="M 100 38 L 100 24" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />

            {/* 3. Antenna Light Beacon on Tip */}
            <g id="antenna-tip-beacon">
              {antennaBlinking && (
                <circle cx="100" cy="22" r="12" fill="url(#antenna-glow-radial)" opacity="0.8" className="animate-pulse" />
              )}
              <circle
                cx="100"
                cy="22"
                r="4.5"
                fill={antennaBlinking ? '#facc15' : '#38bdf8'}
                stroke={antennaBlinking ? '#ca8a04' : '#0284c7'}
                strokeWidth="1"
                className="transition-colors duration-200"
              />
              <circle cx="98.5" cy="20.5" r="1.5" fill="#ffffff" />
            </g>

            {/* Dark Visor Screen */}
            <rect x="63" y="46" width="74" height="52" rx="15" fill="#0f172a" />

            {/* ============================================================== */}
            {/* ROBOT EYES & MOUTH (EXPRESSIONS & EYE MOVEMENT)                 */}
            {/* ============================================================== */}

            {/* STATE 1: LOOKING AT CLICKED SPOT (DYNAMIC EYE GAZE) */}
            {robotMood === 'looking' && (
              <g className="transition-transform duration-200 ease-out" style={{ transform: `translate(${eyeOffset.x}px, ${eyeOffset.y}px)` }}>
                <ellipse cx="80" cy="68" rx="6.5" ry="8" fill="#38bdf8" />
                <circle cx="78" cy="65" r="2.5" fill="#ffffff" />
                <ellipse cx="120" cy="68" rx="6.5" ry="8" fill="#38bdf8" />
                <circle cx="118" cy="65" r="2.5" fill="#ffffff" />
                <circle cx="100" cy="84" r="3.5" fill="#38bdf8" />
              </g>
            )}

            {/* STATE 2: SUPER-HAPPY SMILE (SMILING WHILE LOOKING AT POINT) */}
            {robotMood === 'super-happy' && (
              <g
                stroke="#38bdf8"
                strokeWidth="3.8"
                strokeLinecap="round"
                fill="none"
                className="transition-transform duration-200 ease-out"
                style={{ transform: `translate(${eyeOffset.x * 0.5}px, ${eyeOffset.y * 0.5}px)` }}
              >
                <path d="M 73 72 Q 82 58 91 72" />
                <path d="M 109 72 Q 118 58 127 72" />
                {/* Big happy open smile */}
                <path d="M 92 82 Q 100 94 108 82" />
              </g>
            )}

            {/* STATE 3: WINK (EASTER EGG) */}
            {robotMood === 'wink' && (
              <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 74 72 Q 82 66 90 72" />
                <g fill="#38bdf8" stroke="none">
                  <ellipse cx="118" cy="68" rx="6.5" ry="8" />
                  <circle cx="116" cy="65" r="2.5" fill="#ffffff" />
                </g>
                <path d="M 94 81 Q 102 88 107 80" />
              </g>
            )}

            {/* STATE 4: NORMAL FRIENDLY SMILE (RESTING POSTURE) */}
            {robotMood === 'smile' && (
              <g stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" fill="none">
                <path d="M 75 73 Q 83 62 90 73" />
                <path d="M 110 73 Q 117 62 125 73" />
                <path d="M 95 82 Q 100 87 105 82" />
              </g>
            )}

            {/* STATE 5: QUICK NATURAL BLINK (EVERY 3 SECONDS) */}
            {robotMood === 'idle' && (
              <g stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" fill="none">
                <line x1="74" y1="72" x2="91" y2="72" />
                <line x1="109" y1="72" x2="126" y2="72" />
                <path d="M 96 82 Q 100 86 104 82" />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Sparkles on click */}
      {heartSparkle && (
        <div className="absolute inset-0 pointer-events-none z-35 overflow-hidden">
          <Sparkles className="absolute top-[22%] left-[46%] w-6 h-6 text-amber-400 animate-ping" />
          <Sparkles className="absolute top-[38%] right-[28%] w-5 h-5 text-rose-400 animate-pulse" />
          <Sparkles className="absolute bottom-[28%] left-[32%] w-6 h-6 text-sky-400 animate-bounce" />
        </div>
      )}
    </div>
  );
};
