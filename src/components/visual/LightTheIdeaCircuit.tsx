import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, RefreshCw, Zap } from 'lucide-react';

interface LightTheIdeaCircuitProps {
  className?: string;
}

export const LightTheIdeaCircuit: React.FC<LightTheIdeaCircuitProps> = ({
  className = '',
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [justConnected, setJustConnected] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Target snap position for Node 2 (middle interactive red node)
  const targetNode = { x: 265, y: 175 };
  // Node 1 (fixed red start node)
  const node1 = { x: 195, y: 78 };
  // Node 3 (fixed blue bottom node)
  const node3 = { x: 190, y: 250 };
  // Node 4 (fixed blue bottom-right node)
  const node4 = { x: 350, y: 260 };

  // Convert client pointer event coordinates to SVG coordinate system
  const getSvgCoordinates = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return { x: 0, y: 0 };
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const screenCTM = svg.getScreenCTM();
      if (!screenCTM) return { x: 0, y: 0 };
      const svgPt = pt.matrixTransform(screenCTM.inverse());
      return { x: svgPt.x, y: svgPt.y };
    },
    []
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isConnected) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setIsDragging(true);
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setDragPos(coords);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setDragPos(coords);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    if (dragPos) {
      // Check distance to target node
      const dist = Math.hypot(dragPos.x - targetNode.x, dragPos.y - targetNode.y);
      if (dist < 55) {
        completeCircuit();
      } else {
        setDragPos(null);
      }
    }
  };

  const completeCircuit = () => {
    setIsConnected(true);
    setJustConnected(true);
    setDragPos(null);
  };

  const resetCircuit = () => {
    setIsConnected(false);
    setJustConnected(false);
    setDragPos(null);
  };

  const toggleConnection = () => {
    if (isConnected) {
      resetCircuit();
    } else {
      completeCircuit();
    }
  };

  // Turn off justConnected burst flag after animation
  useEffect(() => {
    if (justConnected) {
      const timer = setTimeout(() => setJustConnected(false), 1800);
      return () => clearTimeout(timer);
    }
  }, [justConnected]);

  // Current interactive node coordinates
  const activeNodePos = isDragging && dragPos ? dragPos : targetNode;

  return (
    <div
      className={`relative w-full max-w-[560px] mx-auto select-none flex flex-col items-center ${className}`}
      role="region"
      aria-label="Light the Idea interactive circuit activity"
    >
      {/* Friendly Instruction & Status Badge */}
      <div className="w-full flex items-center justify-between mb-2 sm:mb-3 px-2">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-sm ${
            isConnected
              ? 'bg-amber-50 text-amber-900 border border-amber-200/90 shadow-amber-500/10'
              : 'bg-white/95 text-slate-700 border border-slate-200/90 shadow-slate-900/5 hover:border-rose-300'
          }`}
        >
          {isConnected ? (
            <>
              <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span className="font-semibold text-amber-800">
                You lit the idea! ✨
              </span>
            </>
          ) : (
            <>
              <span className="text-base leading-none">💡</span>
              <span className="text-slate-700 font-medium">
                Connect the wires to light the bulb!
              </span>
            </>
          )}
        </div>

        {/* Reset / Try Again Button */}
        {isConnected && (
          <button
            type="button"
            onClick={resetCircuit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm hover:text-rose-600 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-rose-500"
            aria-label="Try again and reset circuit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        )}
      </div>

      {/* Main Interactive Circuit Container */}
      <div className="relative w-full aspect-[540/330] rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-visible p-2 sm:p-4">
        {/* Soft Background Warm Glow when lit */}
        <div
          className={`absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none ${
            isConnected ? 'opacity-100 bg-gradient-radial from-amber-100/40 via-yellow-50/20 to-transparent' : 'opacity-0'
          }`}
        />

        <svg
          ref={svgRef}
          viewBox="0 0 540 330"
          className="w-full h-full overflow-visible touch-none"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <defs>
            {/* Battery 3D Gradients */}
            <linearGradient id="battery-body" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="40%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="battery-top" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="50%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>

            <linearGradient id="battery-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Glowing Bulb Filters & Gradients */}
            <radialGradient id="bulb-halo" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="bulb-lit-glass" x1="20%" y1="10%" x2="80%" y2="90%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="30%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>

            <linearGradient id="bulb-off-glass" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            <linearGradient id="screw-base" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#64748b" />
              <stop offset="70%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>

            {/* Metallic Node Ring Gradient */}
            <linearGradient id="node-rim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>

            {/* Drop Shadows */}
            <filter id="clay-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.15" />
            </filter>

            <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="node-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* ============================================================== */}
          {/* 1. LIGHT BULB GLOW HALO (Placed behind wires for clean bloom)   */}
          {/* ============================================================== */}
          {isConnected && (
            <g className="transition-opacity duration-500 ease-out">
              {/* Outer atmospheric aura */}
              <circle
                cx="445"
                cy="140"
                r="115"
                fill="url(#bulb-halo)"
                className="animate-pulse"
                style={{ animationDuration: '3s' }}
              />
              {/* Soft radial rays */}
              <g stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
                <line x1="445" y1="18" x2="445" y2="34" />
                <line x1="530" y1="65" x2="518" y2="76" />
                <line x1="560" y1="140" x2="542" y2="140" />
                <line x1="360" y1="65" x2="372" y2="76" />
                <line x1="335" y1="140" x2="352" y2="140" />
              </g>
            </g>
          )}

          {/* ============================================================== */}
          {/* 2. CIRCUIT WIRES                                               */}
          {/* ============================================================== */}

          {/* RED WIRE PATHS (Positive terminal -> Node 1 -> Node 2 -> Bulb) */}
          <g>
            {/* Segment A: Battery to Node 1 (always connected) */}
            <path
              d="M 108 142 C 140 142, 160 80, 195 78"
              fill="none"
              stroke="#e11d48"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Segment B: Node 1 to Node 2 (Interactive gap) */}
            {isConnected ? (
              // Connected Solid Path
              <>
                <path
                  d={`M ${node1.x} ${node1.y} C 230 ${node1.y}, 245 130, ${activeNodePos.x} ${activeNodePos.y}`}
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Electricity Beam Animation along Segment B */}
                <path
                  d={`M ${node1.x} ${node1.y} C 230 ${node1.y}, 245 130, ${activeNodePos.x} ${activeNodePos.y}`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                  className="anim-beam-dash"
                />
              </>
            ) : (
              // Incomplete Dashed Path
              <path
                d={`M ${node1.x} ${node1.y} C 230 ${node1.y}, 245 130, ${activeNodePos.x} ${activeNodePos.y}`}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="4"
                strokeDasharray="6 7"
                strokeLinecap="round"
                opacity="0.8"
              />
            )}

            {/* Segment C: Node 2 to Bulb socket */}
            {isConnected ? (
              <>
                <path
                  d={`M ${activeNodePos.x} ${activeNodePos.y} C 290 220, 360 170, 425 185`}
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                <path
                  d={`M ${activeNodePos.x} ${activeNodePos.y} C 290 220, 360 170, 425 185`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="6 10"
                  className="anim-beam-dash"
                />
              </>
            ) : (
              <path
                d="M 265 175 C 290 220, 360 170, 425 185"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="4"
                strokeDasharray="5 7"
                strokeLinecap="round"
                opacity="0.6"
              />
            )}
          </g>

          {/* BLUE WIRE PATHS (Negative terminal -> Node 3 -> Node 4 -> Bulb base) */}
          <g>
            {/* Segment D: Battery to Node 3 (always connected) */}
            <path
              d="M 108 190 C 135 190, 150 250, 190 250"
              fill="none"
              stroke="#0284c7"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Segment E: Node 3 to Node 4 */}
            <path
              d={`M ${node3.x} ${node3.y} C 230 250, 270 200, 310 230 C 330 245, 335 260, ${node4.x} ${node4.y}`}
              fill="none"
              stroke={isConnected ? '#0284c7' : '#38bdf8'}
              strokeWidth={isConnected ? 5 : 4}
              strokeDasharray={isConnected ? 'none' : '6 7'}
              strokeLinecap="round"
              opacity={isConnected ? 1 : 0.75}
            />

            {/* Segment F: Node 4 to Bulb bottom contact pin */}
            <path
              d={`M ${node4.x} ${node4.y} C 385 260, 415 255, 445 238`}
              fill="none"
              stroke={isConnected ? '#0284c7' : '#94a3b8'}
              strokeWidth={isConnected ? 5 : 4}
              strokeDasharray={isConnected ? 'none' : '5 6'}
              strokeLinecap="round"
              opacity={isConnected ? 1 : 0.6}
            />

            {/* Electricity pulse traveling along Blue wire when connected */}
            {isConnected && (
              <path
                d={`M 108 190 C 135 190, 150 250, 190 250 C 230 250, 270 200, 310 230 C 330 245, 335 260, ${node4.x} ${node4.y} C 385 260, 415 255, 445 238`}
                fill="none"
                stroke="#e0f2fe"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 10"
                className="anim-beam-dash"
              />
            )}
          </g>

          {/* ============================================================== */}
          {/* 3. BATTERY (3D Illustrated on Left)                           */}
          {/* ============================================================== */}
          <g className="anim-float-gentle" style={{ transformOrigin: '70px 170px' }}>
            {/* Battery Body Shadow */}
            <rect
              x="26"
              y="118"
              width="86"
              height="96"
              rx="18"
              fill="#0f172a"
              opacity="0.12"
              transform="translate(0, 8)"
            />

            {/* Battery Main Case */}
            <rect
              x="26"
              y="118"
              width="86"
              height="96"
              rx="18"
              fill="url(#battery-body)"
              filter="url(#clay-shadow)"
            />

            {/* Battery Gloss Highlight */}
            <rect
              x="30"
              y="122"
              width="78"
              height="28"
              rx="14"
              fill="url(#battery-highlight)"
            />

            {/* Golden Top Cap with Terminals */}
            <rect
              x="33"
              y="106"
              width="72"
              height="18"
              rx="7"
              fill="url(#battery-top)"
              filter="url(#node-shadow)"
            />

            {/* Top Terminals */}
            <g>
              {/* Positive Terminal (+) */}
              <circle cx="48" cy="103" r="7" fill="#334155" />
              <circle cx="48" cy="103" r="5" fill="#e11d48" />
              <rect x="45.5" y="102" width="5" height="2" fill="#ffffff" rx="1" />
              <rect x="47" y="100.5" width="2" height="5" fill="#ffffff" rx="1" />

              {/* Negative Terminal (-) */}
              <circle cx="90" cy="103" r="7" fill="#334155" />
              <circle cx="90" cy="103" r="5" fill="#0284c7" />
              <rect x="87.5" y="102" width="5" height="2" fill="#ffffff" rx="1" />
            </g>

            {/* Terminal Wire Connection Studs on side */}
            <circle cx="108" cy="142" r="6" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
            <circle cx="108" cy="190" r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

            {/* 3D Lightning Bolt on Battery Front */}
            <g transform="translate(69, 166) scale(1.15)">
              <path
                d="M -2 -14 L 6 -14 L -1 -1 L 5 -1 L -7 14 L -3 3 L -8 3 Z"
                fill="#fbbf24"
                stroke="#f59e0b"
                strokeWidth="1"
                filter={isConnected ? 'url(#soft-glow)' : undefined}
                className={isConnected ? 'animate-pulse' : ''}
              />
            </g>

            {/* Subtle Label */}
            <text
              x="69"
              y="204"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="9"
              fontFamily="Space Grotesk, sans-serif"
              fontWeight="bold"
              letterSpacing="1.5"
            >
              EDS-12V
            </text>
          </g>

          {/* ============================================================== */}
          {/* 4. FIXED NODES (Node 1, Node 3, Node 4)                       */}
          {/* ============================================================== */}
          {/* Node 1: Red Top Node */}
          <g transform={`translate(${node1.x}, ${node1.y})`} filter="url(#node-shadow)">
            <circle cx="0" cy="0" r="13" fill="url(#node-rim)" />
            <circle cx="0" cy="0" r="9" fill="#ffffff" />
            <circle cx="0" cy="0" r="6" fill="#e11d48" />
          </g>

          {/* Node 3: Blue Bottom Node */}
          <g transform={`translate(${node3.x}, ${node3.y})`} filter="url(#node-shadow)">
            <circle cx="0" cy="0" r="13" fill="url(#node-rim)" />
            <circle cx="0" cy="0" r="9" fill="#ffffff" />
            <circle cx="0" cy="0" r="6" fill="#0284c7" />
          </g>

          {/* Node 4: Blue Right Node */}
          <g transform={`translate(${node4.x}, ${node4.y})`} filter="url(#node-shadow)">
            <circle cx="0" cy="0" r="13" fill="url(#node-rim)" />
            <circle cx="0" cy="0" r="9" fill="#ffffff" />
            <circle cx="0" cy="0" r="6" fill="#0284c7" />
          </g>

          {/* ============================================================== */}
          {/* 5. INTERACTIVE NODE 2 (The draggable / clickable connection)    */}
          {/* ============================================================== */}
          <g
            transform={`translate(${activeNodePos.x}, ${activeNodePos.y})`}
            onPointerDown={handlePointerDown}
            onClick={toggleConnection}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleConnection();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={
              isConnected
                ? 'Circuit connected. Click to disconnect.'
                : 'Interactive circuit node. Click or drag to connect the wire and light the bulb.'
            }
            className="cursor-pointer group outline-none"
          >
            {/* Attention Pulse Ring when Disconnected */}
            {!isConnected && (
              <circle
                cx="0"
                cy="0"
                r="22"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                opacity="0.6"
                className="anim-pulse-ring pointer-events-none"
              />
            )}

            {/* Large tactile hit area */}
            <circle cx="0" cy="0" r="26" fill="transparent" />

            {/* Outer Metallic Bevel */}
            <circle
              cx="0"
              cy="0"
              r="17"
              fill="url(#node-rim)"
              filter="url(#node-shadow)"
              className="transition-transform group-hover:scale-110"
            />

            {/* Inner Ring */}
            <circle cx="0" cy="0" r="12" fill="#ffffff" />

            {/* Center Core: turns vibrant red when connected */}
            <circle
              cx="0"
              cy="0"
              r="8"
              fill={isConnected ? '#e11d48' : '#f43f5e'}
              className="transition-colors"
            />

            {/* Active Sparkle Center */}
            {isConnected && <circle cx="0" cy="0" r="3" fill="#ffffff" />}
          </g>

          {/* ============================================================== */}
          {/* 6. PLAYFUL HAND CURSOR POINTER (Disappears once connected)     */}
          {/* ============================================================== */}
          {!isConnected && !isDragging && (
            <g
              transform={`translate(${targetNode.x + 8}, ${targetNode.y + 12})`}
              className="pointer-events-none anim-float-delayed"
            >
              {/* Illustrated 3D Hand Cursor Icon */}
              <g filter="url(#node-shadow)">
                <path
                  d="M 12 2 C 10 2, 8 4, 8 7 L 8 18 C 6 18, 4 19, 4 22 C 4 24, 5 26, 7 28 L 13 36 C 15 38, 18 39, 21 39 L 27 39 C 31 39, 34 36, 34 32 L 34 23 C 34 21, 32 19, 30 19 L 29 19 L 29 17 C 29 15, 27 13, 25 13 L 24 13 L 24 11 C 24 9, 22 7, 20 7 L 16 7 L 16 7 L 16 7 L 16 7 Z"
                  fill="#ffffff"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Index Finger Tip highlight */}
                <ellipse cx="12" cy="7" rx="2.5" ry="3" fill="#e2e8f0" />
              </g>

              {/* "Click me" indicator ring */}
              <circle
                cx="0"
                cy="0"
                r="4"
                fill="#f43f5e"
                opacity="0.75"
                className="animate-ping"
              />
            </g>
          )}

          {/* ============================================================== */}
          {/* 7. LIGHT BULB (Illustrated on Right)                          */}
          {/* ============================================================== */}
          <g
            className="anim-float-gentle cursor-pointer group"
            style={{ transformOrigin: '445px 145px', animationDelay: '1s' }}
            onClick={toggleConnection}
            role="button"
            aria-label="Light Bulb. Click to toggle light."
          >
            {/* Bulb Screw Base Shadow */}
            <rect
              x="429"
              y="196"
              width="32"
              height="30"
              rx="4"
              fill="#0f172a"
              opacity="0.15"
              transform="translate(0, 4)"
            />

            {/* Screw Thread Base */}
            <g>
              {/* Metallic Base Block */}
              <rect x="429" y="196" width="32" height="28" rx="4" fill="url(#screw-base)" />

              {/* Thread Grooves */}
              <path
                d="M 429 202 Q 445 206 461 202 M 429 210 Q 445 214 461 210 M 429 218 Q 445 222 461 218"
                fill="none"
                stroke="#1e293b"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Bottom Contact Pin */}
              <ellipse cx="445" cy="226" rx="8" ry="4" fill="#0f172a" />
              <circle
                cx="445"
                cy="226"
                r="3"
                fill={isConnected ? '#38bdf8' : '#64748b'}
              />
            </g>

            {/* Glass Bulb Dome */}
            <path
              d="M 429 196 C 410 180, 385 150, 385 115 C 385 75, 412 45, 445 45 C 478 45, 505 75, 505 115 C 505 150, 480 180, 461 196 Z"
              fill={isConnected ? 'url(#bulb-lit-glass)' : 'url(#bulb-off-glass)'}
              stroke={isConnected ? '#f59e0b' : '#cbd5e1'}
              strokeWidth="2"
              filter="url(#clay-shadow)"
              className="transition-all duration-500"
            />

            {/* Specular Glass Highlight on Left Dome */}
            <path
              d="M 400 95 C 400 70, 420 56, 440 54"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              opacity={isConnected ? 0.75 : 0.6}
            />

            {/* Tungsten Filament */}
            <g>
              {/* Support Stems */}
              <line
                x1="437"
                y1="192"
                x2="439"
                y2="140"
                stroke={isConnected ? '#b45309' : '#94a3b8'}
                strokeWidth="1.5"
              />
              <line
                x1="453"
                y1="192"
                x2="451"
                y2="140"
                stroke={isConnected ? '#b45309' : '#94a3b8'}
                strokeWidth="1.5"
              />

              {/* Coiled Filament Loop */}
              <path
                d="M 439 140 C 439 116, 445 110, 445 110 C 445 110, 451 116, 451 140"
                fill="none"
                stroke={isConnected ? '#ffffff' : '#94a3b8'}
                strokeWidth={isConnected ? 3 : 2}
                strokeLinecap="round"
                filter={isConnected ? 'url(#soft-glow)' : undefined}
                className="transition-all duration-300"
              />

              {/* Filament Center Glow Node */}
              {isConnected && (
                <circle cx="445" cy="118" r="5" fill="#ffffff" filter="url(#soft-glow)" />
              )}
            </g>

            {/* Tiny Star Sparkles when Bulb is ON */}
            {isConnected && (
              <g className="animate-fade-in">
                {/* Sparkle 1 (Top Left) */}
                <path
                  d="M 368 55 L 372 45 L 376 55 L 386 59 L 376 63 L 372 73 L 368 63 L 358 59 Z"
                  fill="#f59e0b"
                  opacity="0.9"
                  className="animate-spin-slow"
                  style={{ transformOrigin: '372px 59px' }}
                />
                {/* Sparkle 2 (Top Right) */}
                <path
                  d="M 508 65 L 512 57 L 516 65 L 524 69 L 516 73 L 512 81 L 508 73 L 500 69 Z"
                  fill="#fbbf24"
                  opacity="0.95"
                  className="animate-bounce"
                  style={{ animationDuration: '2s' }}
                />
                {/* Sparkle 3 (Lower Right) */}
                <circle cx="512" cy="175" r="3.5" fill="#f59e0b" className="animate-pulse" />
                <circle cx="360" cy="130" r="2.5" fill="#fbbf24" className="animate-pulse" />
              </g>
            )}
          </g>
        </svg>

        {/* Small bottom hint for mobile/touch users */}
        <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-mono">
          <Zap className={`w-3 h-3 ${isConnected ? 'text-amber-500' : 'text-slate-400'}`} />
          <span>
            {isConnected
              ? 'Complete circuit! Electricity is powering the bulb.'
              : 'Tap or drag the red node to complete the circuit'}
          </span>
        </div>
      </div>
    </div>
  );
};
