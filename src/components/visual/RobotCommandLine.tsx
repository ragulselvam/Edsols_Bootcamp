import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  Wifi,
  BatteryCharging,
  Radio,
  Volume2,
  VolumeX,
  ChevronRight,
  Send,
  MessageCircle,
} from 'lucide-react';

interface TerminalLog {
  id: string;
  type: 'cmd' | 'info' | 'success' | 'warn' | 'sensor' | 'system';
  text: string;
  timestamp: string;
}

type RobotActionState =
  | 'idle'
  | 'moving-forward'
  | 'moving-backward'
  | 'turning-right'
  | 'turning-left'
  | 'scanning'
  | 'beeping'
  | 'dancing'
  | 'grabbing';

export const RobotCommandLine: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  // Terminal logs state
  const [logs, setLogs] = useState<TerminalLog[]>([
    {
      id: 'init-1',
      type: 'system',
      text: 'EDSOLS Edge Robotics Engine [v2.4.1-bootcamp]',
      timestamp: '00:00:01',
    },
    {
      id: 'init-2',
      type: 'info',
      text: 'Hardware linked: ESP32-S3 + Dual Motor Driver + AI Vision Cam',
      timestamp: '00:00:02',
    },
    {
      id: 'init-3',
      type: 'success',
      text: "System Ready. Type 'help' or click a command below to run.",
      timestamp: '00:00:03',
    },
  ]);

  // Input & Command History
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);

  // Sound toggle (Web Audio API synth)
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Robot physical and visual state
  const [actionState, setActionState] = useState<RobotActionState>('idle');
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [ledColor, setLedColor] = useState<string>('#38bdf8'); // default cyan
  const [antennaBlinking, setAntennaBlinking] = useState(false);
  const [telemetry, setTelemetry] = useState({
    distanceCm: 48,
    headingDeg: 0,
    motorL: 0,
    motorR: 0,
    batteryV: 12.4,
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const actionTimerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Sound Synthesizer using Web Audio API
  const playChirp = useCallback((freq = 580, type: OscillatorType = 'sine', duration = 0.12) => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch {
      // AudioContext policy safe fallback
    }
  }, [soundEnabled]);

  // Auto-scroll terminal buffer to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      actionTimerRef.current.forEach(clearTimeout);
    };
  }, []);

  const getTimestamp = () => {
    const d = new Date();
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
  };

  const addLog = (type: TerminalLog['type'], text: string) => {
    setLogs((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        type,
        text,
        timestamp: getTimestamp(),
      },
    ]);
  };

  const resetTimers = () => {
    actionTimerRef.current.forEach(clearTimeout);
    actionTimerRef.current = [];
  };

  // Robot command executor
  const executeCommand = (cmdRaw: string) => {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    // Add command to log
    addLog('cmd', `$ ${cmd}`);

    // Update command history
    setHistory((prev) => [cmd, ...prev.filter((c) => c !== cmd)]);
    setHistoryIdx(-1);
    setInputValue('');

    const lower = cmd.toLowerCase();

    // 1. HELP COMMAND
    if (lower === 'help' || lower === 'help()' || lower === '?') {
      playChirp(440, 'sine', 0.1);
      addLog('info', '━━━━━━━━ AVAILABLE ROBOT COMMANDS ━━━━━━━━');
      addLog('info', '• robot.scan()           - Lidar radar & camera vision sweep');
      addLog('info', '• robot.move(cm)         - Drive chassis forward');
      addLog('info', '• robot.backward(cm)     - Drive chassis backward');
      addLog('info', '• robot.turn_right(deg)  - Pivot steering right');
      addLog('info', '• robot.turn_left(deg)   - Pivot steering left');
      addLog('info', '• robot.beep()           - Pulsed acoustic chime & antenna flash');
      addLog('info', '• robot.dance()          - Celebrate with edge motion sequence');
      addLog('info', '• robot.arm.grab()       - Articulate servo gripper');
      addLog('info', '• robot.led(color)       - Change antenna LED (cyan, rose, amber, green)');
      addLog('info', '• robot.speak("msg")     - Show speech expression');
      addLog('info', '• status                 - Live hardware telemetry report');
      addLog('info', '• clear                  - Wipe terminal screen');
      addLog('info', '• reset                  - Return robot to home coordinates');
      addLog('info', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return;
    }

    // 2. CLEAR COMMAND
    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      return;
    }

    // 3. RESET COMMAND
    if (lower === 'reset' || lower === 'robot.reset()') {
      resetTimers();
      setActionState('idle');
      setSpeechBubble(null);
      setLedColor('#38bdf8');
      setAntennaBlinking(false);
      setTelemetry({
        distanceCm: 48,
        headingDeg: 0,
        motorL: 0,
        motorR: 0,
        batteryV: 12.4,
      });
      playChirp(320, 'triangle', 0.2);
      addLog('system', '[RESET] Robot returned to home coordinate (0, 0) | Heading: 0°');
      return;
    }

    // 4. STATUS / TELEMETRY
    if (lower === 'status' || lower === 'status()' || lower === 'telemetry') {
      playChirp(520, 'sine', 0.15);
      addLog('info', '┌── ROBOT TELEMETRY REPORT ──────────┐');
      addLog('info', `│ Battery: 98% (12.4V LiPo 3S)       │`);
      addLog('info', `│ Ultrasonic Sensor: ${telemetry.distanceCm} cm range        │`);
      addLog('info', `│ Heading: ${telemetry.headingDeg}° | IMU: Level             │`);
      addLog('info', `│ Left Motor: ${telemetry.motorL} RPM | Right: ${telemetry.motorR} RPM  │`);
      addLog('info', `│ ESP32-S3 Core Temp: 36.8°C         │`);
      addLog('info', '└── ALL SUBSYSTEMS NOMINAL ──────────┘');
      return;
    }

    // 5. SCAN COMMAND
    if (lower.includes('scan') || lower === 'radar') {
      resetTimers();
      setActionState('scanning');
      setAntennaBlinking(true);
      playChirp(720, 'sine', 0.25);
      addLog('sensor', '[VISION] Activating LiDAR sweep & AI camera feed...');
      
      const t1 = setTimeout(() => {
        const detectedDist = Math.floor(25 + Math.random() * 30);
        setTelemetry((prev) => ({ ...prev, distanceCm: detectedDist }));
        playChirp(880, 'sine', 0.15);
        addLog(
          'success',
          `[TARGET DETECTED] Obstacle at ${detectedDist}cm | Conf: 99.2% | Path Clear: ALT-RIGHT`
        );
      }, 700);

      const t2 = setTimeout(() => {
        setActionState('idle');
        setAntennaBlinking(false);
      }, 1600);

      actionTimerRef.current.push(t1, t2);
      return;
    }

    // 6. MOVE FORWARD
    if (
      lower.includes('move') ||
      lower.includes('forward') ||
      lower === 'fwd' ||
      lower.includes('drive')
    ) {
      resetTimers();
      setActionState('moving-forward');
      setTelemetry((prev) => ({
        ...prev,
        motorL: 140,
        motorR: 140,
        distanceCm: Math.max(12, prev.distanceCm - 15),
      }));
      playChirp(400, 'square', 0.18);
      addLog('info', '[MOTOR] Motors engaged: L=140rpm, R=140rpm -> Advancing +25cm');

      const t1 = setTimeout(() => {
        playChirp(600, 'sine', 0.1);
        addLog('success', '[MOTOR] Velocity reached | Position locked [OK]');
        setTelemetry((prev) => ({ ...prev, motorL: 0, motorR: 0 }));
      }, 700);

      const t2 = setTimeout(() => {
        setActionState('idle');
      }, 1400);

      actionTimerRef.current.push(t1, t2);
      return;
    }

    // 7. MOVE BACKWARD
    if (lower.includes('backward') || lower.includes('back') || lower === 'rev') {
      resetTimers();
      setActionState('moving-backward');
      setTelemetry((prev) => ({
        ...prev,
        motorL: -120,
        motorR: -120,
        distanceCm: prev.distanceCm + 20,
      }));
      playChirp(350, 'sawtooth', 0.2);
      addLog('warn', '[MOTOR] Reverse gear engaged: Backing up 20cm [BEEP-BEEP]');

      const t1 = setTimeout(() => {
        setTelemetry((prev) => ({ ...prev, motorL: 0, motorR: 0 }));
        setActionState('idle');
      }, 1200);

      actionTimerRef.current.push(t1);
      return;
    }

    // 8. TURN RIGHT
    if (lower.includes('turn_right') || lower.includes('right') || lower === 'turn right') {
      resetTimers();
      setActionState('turning-right');
      const newHeading = (telemetry.headingDeg + 45) % 360;
      setTelemetry((prev) => ({
        ...prev,
        headingDeg: newHeading,
        motorL: 100,
        motorR: -100,
      }));
      playChirp(480, 'sine', 0.15);
      addLog('info', `[STEERING] Differential yaw rotation: +45° -> Heading: ${newHeading}°`);

      const t1 = setTimeout(() => {
        setTelemetry((prev) => ({ ...prev, motorL: 0, motorR: 0 }));
        setActionState('idle');
        addLog('success', '[STEERING] Rotation complete: Gyro stabilized');
      }, 900);

      actionTimerRef.current.push(t1);
      return;
    }

    // 9. TURN LEFT
    if (lower.includes('turn_left') || lower.includes('left') || lower === 'turn left') {
      resetTimers();
      setActionState('turning-left');
      const newHeading = (telemetry.headingDeg - 45 + 360) % 360;
      setTelemetry((prev) => ({
        ...prev,
        headingDeg: newHeading,
        motorL: -100,
        motorR: 100,
      }));
      playChirp(480, 'sine', 0.15);
      addLog('info', `[STEERING] Differential yaw rotation: -45° -> Heading: ${newHeading}°`);

      const t1 = setTimeout(() => {
        setTelemetry((prev) => ({ ...prev, motorL: 0, motorR: 0 }));
        setActionState('idle');
        addLog('success', '[STEERING] Rotation complete: Gyro stabilized');
      }, 900);

      actionTimerRef.current.push(t1);
      return;
    }

    // 10. BEEP / SOUND
    if (lower.includes('beep') || lower.includes('horn') || lower.includes('sound')) {
      resetTimers();
      setActionState('beeping');
      setAntennaBlinking(true);
      setSpeechBubble('BEEP BOOP! 🤖');
      playChirp(880, 'sine', 0.18);
      setTimeout(() => playChirp(1180, 'sine', 0.22), 120);
      addLog('success', '[AUDIO] 880Hz / 1180Hz piezoelectric tone generated [OK]');

      const t1 = setTimeout(() => {
        setActionState('idle');
        setAntennaBlinking(false);
        setSpeechBubble(null);
      }, 1200);

      actionTimerRef.current.push(t1);
      return;
    }

    // 11. DANCE
    if (lower.includes('dance') || lower.includes('party') || lower.includes('celebrate')) {
      resetTimers();
      setActionState('dancing');
      setAntennaBlinking(true);
      setSpeechBubble('Woohoo! 🎉💃');
      playChirp(600, 'triangle', 0.1);
      setTimeout(() => playChirp(800, 'triangle', 0.1), 150);
      setTimeout(() => playChirp(1000, 'triangle', 0.15), 300);
      addLog('success', '[ROUTINE] Executing celebratory kinematics routine! ✨');

      const t1 = setTimeout(() => {
        setActionState('idle');
        setAntennaBlinking(false);
        setSpeechBubble(null);
      }, 2200);

      actionTimerRef.current.push(t1);
      return;
    }

    // 12. ARM / GRAB
    if (lower.includes('arm') || lower.includes('grab') || lower.includes('claw')) {
      resetTimers();
      setActionState('grabbing');
      setSpeechBubble('Gripper Engaged! 🦾');
      playChirp(520, 'square', 0.16);
      addLog('info', '[SERVO] Bus Servo #1: Angle 45° | Bus Servo #2: Grip 100%');

      const t1 = setTimeout(() => {
        setActionState('idle');
        setSpeechBubble(null);
        addLog('success', '[SERVO] Object clamped with 1.8 Nm torque [OK]');
      }, 1500);

      actionTimerRef.current.push(t1);
      return;
    }

    // 13. LED COLOR
    if (lower.includes('led')) {
      let color = '#38bdf8';
      let name = 'Cyan';
      if (lower.includes('red') || lower.includes('rose')) {
        color = '#f43f5e';
        name = 'Rose Red';
      } else if (lower.includes('green') || lower.includes('emerald')) {
        color = '#10b981';
        name = 'Emerald Green';
      } else if (lower.includes('amber') || lower.includes('yellow')) {
        color = '#f59e0b';
        name = 'Amber Gold';
      } else if (lower.includes('purple') || lower.includes('violet')) {
        color = '#8b5cf6';
        name = 'Purple';
      }
      setLedColor(color);
      setAntennaBlinking(true);
      playChirp(680, 'sine', 0.12);
      addLog('success', `[HARDWARE] GPIO 14 RGB LED updated to ${name} (${color})`);

      const t1 = setTimeout(() => {
        setAntennaBlinking(false);
      }, 1000);
      actionTimerRef.current.push(t1);
      return;
    }

    // 14. SPEAK
    if (lower.includes('speak') || lower.includes('say')) {
      const match = cmd.match(/["'](.*?)["']/);
      const msg = match ? match[1] : cmd.replace(/^(robot\.speak|speak|say)\s*/i, '').trim() || 'Hello!';
      setSpeechBubble(msg);
      playChirp(750, 'sine', 0.15);
      addLog('info', `[VOICE] OLED Display: "${msg}"`);

      const t1 = setTimeout(() => {
        setSpeechBubble(null);
      }, 2000);
      actionTimerRef.current.push(t1);
      return;
    }

    // UNRECOGNIZED COMMAND
    playChirp(220, 'sawtooth', 0.2);
    addLog('warn', `bash: '${cmd}': command not found.`);
    addLog('info', "Tip: Type 'help' or click a quick command below (e.g. robot.scan(), robot.move())");
  };

  // Handle keyboard submission & history navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeCommand(inputValue);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = Math.min(historyIdx + 1, history.length - 1);
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputValue(history[nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Simple tab-completion for robot commands
      const completions = [
        'robot.scan()',
        'robot.move()',
        'robot.turn_right()',
        'robot.turn_left()',
        'robot.beep()',
        'robot.dance()',
        'robot.arm.grab()',
        'robot.led("rose")',
        'status',
        'help',
        'clear',
      ];
      const match = completions.find((c) => c.startsWith(inputValue.trim()));
      if (match) {
        setInputValue(match);
      }
    }
  };

  // Quick Command Chips list
  const QUICK_COMMANDS = [
    { label: 'robot.scan()', cmd: 'robot.scan()', icon: '📡', color: 'border-cyan-500/40 text-cyan-300 hover:bg-cyan-950/40' },
    { label: 'robot.move()', cmd: 'robot.move()', icon: '🏎️', color: 'border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40' },
    { label: 'turn_right()', cmd: 'robot.turn_right()', icon: '↷', color: 'border-amber-500/40 text-amber-300 hover:bg-amber-950/40' },
    { label: 'turn_left()', cmd: 'robot.turn_left()', icon: '↶', color: 'border-amber-500/40 text-amber-300 hover:bg-amber-950/40' },
    { label: 'robot.beep()', cmd: 'robot.beep()', icon: '📢', color: 'border-pink-500/40 text-pink-300 hover:bg-pink-950/40' },
    { label: 'robot.dance()', cmd: 'robot.dance()', icon: '🎉', color: 'border-purple-500/40 text-purple-300 hover:bg-purple-950/40' },
    { label: 'arm.grab()', cmd: 'robot.arm.grab()', icon: '🦾', color: 'border-rose-500/40 text-rose-300 hover:bg-rose-950/40' },
    { label: 'status', cmd: 'status', icon: '📊', color: 'border-slate-500/40 text-slate-300 hover:bg-slate-800/40' },
    { label: 'help', cmd: 'help', icon: '❓', color: 'border-sky-500/40 text-sky-300 hover:bg-sky-950/40' },
  ];

  return (
    <div
      className={`relative w-full max-w-[660px] mx-auto rounded-3xl bg-slate-950/95 backdrop-blur-2xl border-2 border-slate-800/80 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.45)] overflow-hidden flex flex-col ${className}`}
      role="region"
      aria-label="Interactive Robot Command Line Simulator"
    >
      {/* =================================================================== */}
      {/* 1. TERMINAL HEADER BAR                                              */}
      {/* =================================================================== */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 select-none">
        {/* Left: macOS Window Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => executeCommand('clear')}
            className="w-3 h-3 rounded-full bg-[#f43f5e] hover:opacity-80 transition-opacity cursor-pointer"
            title="Clear terminal screen"
          />
          <button
            type="button"
            onClick={() => executeCommand('status')}
            className="w-3 h-3 rounded-full bg-[#facc15] hover:opacity-80 transition-opacity cursor-pointer"
            title="Print telemetry status"
          />
          <button
            type="button"
            onClick={() => executeCommand('robot.dance()')}
            className="w-3 h-3 rounded-full bg-[#10b981] hover:opacity-80 transition-opacity cursor-pointer"
            title="Execute celebration routine"
          />

          <span className="ml-2 font-mono text-[11px] sm:text-xs text-slate-400 font-semibold tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-rose-500" />
            <span className="text-slate-200">edsols-robot-cli</span>
            <span className="text-slate-600 hidden sm:inline">v2.4 (bash/ros2)</span>
          </span>
        </div>

        {/* Right: Live Telemetry Badges & Sound Toggle */}
        <div className="flex items-center gap-2 font-mono text-[10px] sm:text-[11px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>ONLINE</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-slate-400">
            <BatteryCharging className="w-3 h-3 text-emerald-400" />
            <span>98%</span>
          </span>

          <button
            type="button"
            onClick={() => executeCommand('reset')}
            className="p-1 rounded-lg border border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700 transition-colors cursor-pointer"
            title="Reset robot & console"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className={`p-1 rounded-lg border transition-colors cursor-pointer ${
              soundEnabled
                ? 'border-rose-500/50 text-rose-400 bg-rose-950/30'
                : 'border-slate-800 text-slate-500 hover:text-slate-300'
            }`}
            title={soundEnabled ? 'Mute audio chirps' : 'Enable audio chirps'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* 2. TOP ZONE: ROBOT INTERACTIVE SIMULATOR ARENA                      */}
      {/* =================================================================== */}
      <div className="relative w-full h-[220px] sm:h-[240px] bg-gradient-to-b from-slate-900/60 to-slate-950/90 border-b border-slate-800/80 flex items-center justify-center overflow-hidden">
        {/* Engineering Blueprint Grid Background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.15) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Radar concentric sweep circles */}
        <div className="absolute w-72 h-72 rounded-full border border-sky-500/10 pointer-events-none animate-ping" style={{ animationDuration: '4s' }} />
        <div className="absolute w-48 h-48 rounded-full border border-sky-500/15 pointer-events-none" />

        {/* Top Left Arena HUD telemetry */}
        <div className="absolute top-2.5 left-3 z-10 flex flex-col gap-1 font-mono text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="text-slate-300">LIDAR:</span>
            <span className="text-cyan-400 font-bold">{telemetry.distanceCm} cm</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">HDG:</span>
            <span className="text-amber-400 font-bold">{telemetry.headingDeg}°</span>
          </div>
        </div>

        {/* Top Right Arena Status */}
        <div className="absolute top-2.5 right-3 z-10 flex flex-col items-end gap-1 font-mono text-[10px]">
          <span className="text-slate-400 flex items-center gap-1">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span className="text-slate-300">ESP32-S3</span>
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
            ACTION: <span className="text-rose-400 font-bold">{actionState}</span>
          </span>
        </div>

        {/* Radar Conical Sweep (when scanning) */}
        {actionState === 'scanning' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-15">
            <div className="w-64 h-64 rounded-full border-2 border-cyan-400/40 bg-cyan-500/10 animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-cyan-300 animate-ping" />
            {/* Target Detected Bounding Box */}
            <div className="absolute top-4 right-1/4 px-2 py-0.5 rounded bg-cyan-950/90 border border-cyan-400 text-cyan-300 text-[10px] font-mono animate-bounce">
              [TARGET @ {telemetry.distanceCm}cm]
            </div>
          </div>
        )}

        {/* Speech Bubble / Expression Balloon */}
        {speechBubble && (
          <div className="absolute top-3 z-30 px-3 py-1 rounded-2xl bg-white border-2 border-rose-400 text-slate-900 text-xs font-bold shadow-xl flex items-center gap-1.5 animate-bounce">
            <MessageCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            <span>{speechBubble}</span>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-rose-400 rotate-45" />
          </div>
        )}

        {/* Dancing Sparkles */}
        {actionState === 'dancing' && (
          <div className="absolute inset-0 pointer-events-none z-30">
            <Sparkles className="absolute top-6 left-12 w-5 h-5 text-amber-400 animate-ping" />
            <Sparkles className="absolute top-8 right-14 w-6 h-6 text-pink-400 animate-pulse" />
            <Sparkles className="absolute bottom-8 left-16 w-5 h-5 text-sky-400 animate-bounce" />
          </div>
        )}

        {/* ================================================================= */}
        {/* THE 3D ROBOT CHARACTER (PHYSICAL SIMULATION)                     */}
        {/* ================================================================= */}
        <div
          onClick={() => executeCommand('robot.beep()')}
          className={`relative z-20 flex flex-col items-center cursor-pointer select-none transition-all duration-300 ${
            actionState === 'moving-forward'
              ? '-translate-y-2 scale-105'
              : actionState === 'moving-backward'
              ? 'translate-y-2 scale-95'
              : actionState === 'turning-right'
              ? 'rotate-12 translate-x-2'
              : actionState === 'turning-left'
              ? '-rotate-12 -translate-x-2'
              : actionState === 'dancing'
              ? 'animate-bounce'
              : ''
          }`}
          title="Click robot or run commands from console below!"
        >
          {/* Ground Soft Shadow */}
          <div className="absolute -bottom-3 w-40 h-6 bg-cyan-500/15 rounded-full blur-md pointer-events-none" />

          {/* Robot SVG */}
          <div className="w-36 h-36 sm:w-40 sm:h-40 relative flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="cli-bot-white" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="65%" stopColor="#f8fafc" />
                  <stop offset="100%" stopColor="#e2e8f0" />
                </linearGradient>

                <linearGradient id="cli-accent-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                <linearGradient id="cli-wheel-dark" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#334155" />
                  <stop offset="70%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
              </defs>

              {/* Symmetrical Left Wheel */}
              <g id="cli-left-wheel" className={actionState.startsWith('moving') ? 'animate-spin-slow' : ''}>
                <ellipse cx="44" cy="144" rx="14" ry="24" fill="url(#cli-wheel-dark)" />
                <ellipse cx="45" cy="144" rx="7" ry="15" fill="#00b4d8" />
                <ellipse cx="45" cy="144" rx="3.5" ry="8" fill="#1e293b" />
              </g>

              {/* Symmetrical Right Wheel */}
              <g id="cli-right-wheel" className={actionState.startsWith('moving') ? 'animate-spin-slow' : ''}>
                <ellipse cx="156" cy="144" rx="14" ry="24" fill="url(#cli-wheel-dark)" />
                <ellipse cx="155" cy="144" rx="7" ry="15" fill="#00b4d8" />
                <ellipse cx="155" cy="144" rx="3.5" ry="8" fill="#1e293b" />
              </g>

              {/* Main Chassis Base */}
              <rect
                x="54"
                y="108"
                width="92"
                height="48"
                rx="16"
                fill="url(#cli-bot-white)"
                stroke="#cbd5e1"
                strokeWidth="1.2"
              />

              {/* Chest Light Pulse Bar */}
              <rect x="86" y="122" width="28" height="8" rx="4" fill="url(#cli-accent-cyan)" />
              <g opacity="0.9">
                <line x1="92" y1="126" x2="95" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="98" y1="126" x2="102" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                <line x1="105" y1="126" x2="108" y2="126" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Neck Connector */}
              <rect x="88" y="98" width="24" height="12" rx="4" fill="#94a3b8" />

              {/* Head Enclosure */}
              <rect
                x="52"
                y="38"
                width="96"
                height="68"
                rx="22"
                fill="url(#cli-bot-white)"
                stroke="#cbd5e1"
                strokeWidth="1.4"
              />

              {/* Side Sensors / Ears */}
              <rect x="46" y="60" width="7" height="22" rx="3.5" fill="#94a3b8" />
              <rect x="147" y="60" width="7" height="22" rx="3.5" fill="#94a3b8" />

              {/* Antenna Collar & Stem */}
              <g>
                {antennaBlinking && (
                  <ellipse cx="100" cy="38" rx="14" ry="6" fill="none" stroke={ledColor} strokeWidth="2" className="animate-ping" />
                )}
                <ellipse cx="100" cy="38" rx="8" ry="3.5" fill={antennaBlinking ? ledColor : '#0284c7'} />
                <path d="M 100 38 L 100 24" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                
                {/* Antenna Tip Beacon */}
                {antennaBlinking && (
                  <circle cx="100" cy="22" r="10" fill={ledColor} opacity="0.5" className="animate-pulse" />
                )}
                <circle cx="100" cy="22" r="4.5" fill={antennaBlinking ? ledColor : '#38bdf8'} stroke="#0284c7" strokeWidth="1" />
              </g>

              {/* Dark Visor Screen */}
              <rect x="63" y="46" width="74" height="52" rx="15" fill="#0f172a" />

              {/* Visor Eyes & Mouth (Reactive) */}
              {actionState === 'scanning' ? (
                // Scanning Eyes (Radar arcs)
                <g stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" fill="none">
                  <path d="M 72 68 Q 80 58 88 68" />
                  <path d="M 112 68 Q 120 58 128 68" />
                  <circle cx="100" cy="82" r="2.5" fill="#38bdf8" className="animate-ping" />
                </g>
              ) : actionState === 'dancing' || actionState === 'beeping' ? (
                // Super Happy Eyes (^ ^)
                <g stroke={ledColor} strokeWidth="3.6" strokeLinecap="round" fill="none">
                  <path d="M 73 70 Q 82 56 91 70" />
                  <path d="M 109 70 Q 118 56 127 70" />
                  <path d="M 92 82 Q 100 92 108 82" />
                </g>
              ) : (
                // Friendly resting smiling eyes
                <g stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" fill="none">
                  <path d="M 75 72 Q 83 62 90 72" />
                  <path d="M 110 72 Q 117 62 125 72" />
                  <path d="M 95 82 Q 100 87 105 82" />
                </g>
              )}
            </svg>
          </div>
        </div>

        {/* Interactive Click Tip on Arena */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-slate-900/80 border border-slate-800 text-[10px] text-slate-400 font-mono pointer-events-none">
          Click robot or execute commands below
        </div>
      </div>

      {/* =================================================================== */}
      {/* 3. TERMINAL LOG BUFFER (SCROLLABLE OUTPUT)                           */}
      {/* =================================================================== */}
      <div className="flex-1 min-h-[140px] max-h-[190px] overflow-y-auto px-4 py-3 font-mono text-xs space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-slate-950">
        {logs.map((log) => {
          switch (log.type) {
            case 'cmd':
              return (
                <div key={log.id} className="flex items-start gap-2 text-rose-400 font-bold">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-rose-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-100">{log.text}</span>
                </div>
              );
            case 'success':
              return (
                <div key={log.id} className="flex items-start gap-2 text-emerald-400">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="text-emerald-500 font-bold select-none">[OK]</span>
                  <span>{log.text}</span>
                </div>
              );
            case 'warn':
              return (
                <div key={log.id} className="flex items-start gap-2 text-amber-300">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="text-amber-500 font-bold select-none">[!]</span>
                  <span>{log.text}</span>
                </div>
              );
            case 'sensor':
              return (
                <div key={log.id} className="flex items-start gap-2 text-cyan-300">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="text-cyan-500 font-bold select-none">[SENS]</span>
                  <span>{log.text}</span>
                </div>
              );
            case 'system':
              return (
                <div key={log.id} className="flex items-start gap-2 text-indigo-300">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="text-indigo-400 font-bold select-none">[SYS]</span>
                  <span>{log.text}</span>
                </div>
              );
            default:
              return (
                <div key={log.id} className="flex items-start gap-2 text-slate-300">
                  <span className="text-slate-600 text-[10px] select-none">{log.timestamp}</span>
                  <span className="text-slate-500 select-none">│</span>
                  <span>{log.text}</span>
                </div>
              );
          }
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* =================================================================== */}
      {/* 4. QUICK COMMAND CHIPS BAR                                          */}
      {/* =================================================================== */}
      <div className="px-3 py-2 bg-slate-900/90 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none">
        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider pl-1 pr-1 flex-shrink-0 flex items-center gap-1">
          <Play className="w-2.5 h-2.5 text-rose-500 fill-rose-500" /> Quick:
        </span>
        {QUICK_COMMANDS.map((chip) => (
          <button
            key={chip.cmd}
            type="button"
            onClick={() => executeCommand(chip.cmd)}
            className={`flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium border transition-all active:scale-95 cursor-pointer bg-slate-950/80 ${chip.color}`}
            title={`Run ${chip.cmd}`}
          >
            <span>{chip.icon}</span>
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* =================================================================== */}
      {/* 5. INTERACTIVE CLI INPUT PROMPT                                     */}
      {/* =================================================================== */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-800/90 flex items-center gap-2">
        <span className="font-mono text-xs text-rose-500 font-bold select-none flex-shrink-0">
          edsols@bot:~$
        </span>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type command (e.g. robot.scan(), robot.move(), help)..."
          className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder-slate-600"
          spellCheck={false}
          autoComplete="off"
        />

        <button
          type="button"
          onClick={() => executeCommand(inputValue)}
          disabled={!inputValue.trim()}
          className="inline-flex items-center justify-center p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-30 disabled:hover:bg-rose-600 text-white transition-all cursor-pointer flex-shrink-0"
          title="Execute command (Enter)"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
