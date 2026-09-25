import React, { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  color: string;
  glowColor: string;
  alpha: number;
  type: 'code' | 'puzzle' | 'gear' | 'node' | 'spark';
  symbol?: string;
  rot: number;
  vRot: number;
  pulsePhase: number;
  pulseSpeed: number;
  size: number;
}

interface RippleBurst {
  x: number;
  y: number;
  r: number;
  maxR: number;
  color: string;
  alpha: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export const HeroFullBackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovered: false,
    };

    const ripples: RippleBurst[] = [];
    const sparkles: Sparkle[] = [];

    // EDSOLS brand color palette
    const colors = [
      { color: '#e11d48', glow: 'rgba(225, 29, 72, 0.35)', weight: 0.38 },   // Rose
      { color: '#f43f5e', glow: 'rgba(244, 63, 94, 0.30)', weight: 0.18 },   // Coral Rose
      { color: '#0284c7', glow: 'rgba(2, 132, 199, 0.32)', weight: 0.24 },   // Cyan/Blue
      { color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.30)', weight: 0.12 },  // Amber/Gold
      { color: '#8b5cf6', glow: 'rgba(139, 92, 246, 0.28)', weight: 0.08 },  // Violet
    ];

    const pickColor = () => {
      const r = Math.random();
      let acc = 0;
      for (const c of colors) {
        acc += c.weight;
        if (r <= acc) return c;
      }
      return colors[0];
    };

    // Coding & Robotics tokens for Ages 6+ & 12+
    const codeSymbols = ['{ }', '</>', '&&', '=>', 'fn()', '101', 'Bot', '⚡', 'AI', 'IoT', '++'];

    let particles: Particle[] = [];
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 40;
      if (w < 1024) return 70;
      return 100;
    };

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width || window.innerWidth;
      height = rect.height || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      particles = [];
      const count = getParticleCount();

      for (let i = 0; i < count; i++) {
        const colorData = pickColor();
        const rand = Math.random();

        let type: Particle['type'] = 'node';
        let symbol: string | undefined = undefined;
        let size = 2 + Math.random() * 2.5;

        if (rand < 0.22) {
          type = 'code';
          symbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
          size = 11 + Math.random() * 3;
        } else if (rand < 0.40) {
          type = 'puzzle';
          size = 7 + Math.random() * 4;
        } else if (rand < 0.54) {
          type = 'gear';
          size = 6 + Math.random() * 3;
        } else if (rand < 0.72) {
          type = 'spark';
          size = 2 + Math.random() * 2;
        }

        particles.push({
          x: Math.random() * (width || window.innerWidth),
          y: Math.random() * (height || window.innerHeight),
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          baseRadius: size,
          size,
          color: colorData.color,
          glowColor: colorData.glow,
          alpha: 0.35 + Math.random() * 0.5,
          type,
          symbol,
          rot: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.02,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.015 + Math.random() * 0.025,
        });
      }
    };

    handleResize();
    initParticles();

    // Mouse movement interaction
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovered = true;

      // Subtle trailing sparkles
      if (Math.random() < 0.3) {
        sparkles.push({
          x: mouse.targetX + (Math.random() - 0.5) * 12,
          y: mouse.targetY + (Math.random() - 0.5) * 12,
          vx: (Math.random() - 0.5) * 0.9,
          vy: (Math.random() - 0.5) * 0.9 - 0.3,
          size: 1.5 + Math.random() * 1.8,
          color: Math.random() < 0.6 ? '#e11d48' : '#0284c7',
          alpha: 0.85,
          life: 0,
          maxLife: 28 + Math.random() * 18,
        });
      }
    };

    const onMouseLeave = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // Touch support for mobile devices
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
        mouse.isHovered = true;
      }
    };

    const onTouchEnd = () => {
      mouse.isHovered = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    // Click produces expanding ripple wave and sparks
    const triggerBurst = (clickX: number, clickY: number) => {
      ripples.push({
        x: clickX,
        y: clickY,
        r: 6,
        maxR: 150 + Math.random() * 50,
        color: Math.random() < 0.65 ? 'rgba(225, 29, 72, 0.45)' : 'rgba(2, 132, 199, 0.45)',
        alpha: 0.6,
      });

      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.2 + Math.random() * 2.8;
        sparkles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2 + Math.random() * 2.2,
          color: Math.random() < 0.55 ? '#e11d48' : '#0284c7',
          alpha: 1,
          life: 0,
          maxLife: 35 + Math.random() * 20,
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      triggerBurst(e.clientX - rect.left, e.clientY - rect.top);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        triggerBurst(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(canvas);

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.015;

      // Smooth mouse interpolation
      if (mouse.isHovered) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Soft Ambient Aurora / Breathing Glows (Clean & Bright Website Theme)
      const glow1X = width * 0.45 + Math.sin(time * 0.35) * 70;
      const glow1Y = height * 0.4 + Math.cos(time * 0.28) * 45;
      const radius1 = Math.min(width, height) * 0.65;

      const grad1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, radius1);
      grad1.addColorStop(0, 'rgba(255, 241, 242, 0.7)');       // Soft Rose blush
      grad1.addColorStop(0.4, 'rgba(255, 245, 245, 0.45)');
      grad1.addColorStop(0.7, 'rgba(240, 249, 255, 0.3)');     // Sky tint
      grad1.addColorStop(1, 'transparent');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(glow1X, glow1Y, radius1, 0, Math.PI * 2);
      ctx.fill();

      // Secondary ambient glow in top-right
      const glow2X = width * 0.8 + Math.cos(time * 0.3) * 40;
      const glow2Y = height * 0.28 + Math.sin(time * 0.25) * 35;
      const radius2 = Math.min(width, height) * 0.45;

      const grad2 = ctx.createRadialGradient(glow2X, glow2Y, 5, glow2X, glow2Y, radius2);
      grad2.addColorStop(0, 'rgba(254, 243, 199, 0.35)');     // Warm amber shimmer
      grad2.addColorStop(0.5, 'rgba(255, 228, 230, 0.25)');
      grad2.addColorStop(1, 'transparent');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(glow2X, glow2Y, radius2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Mouse Glow Halo when hovering
      if (mouse.isHovered) {
        const mouseGlow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 110);
        mouseGlow.addColorStop(0, 'rgba(225, 29, 72, 0.12)');
        mouseGlow.addColorStop(0.6, 'rgba(2, 132, 199, 0.05)');
        mouseGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = mouseGlow;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 110, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Expanding Click Ripple Waves
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 3.2;
        const progress = rp.r / rp.maxR;
        rp.alpha = (1 - progress) * 0.45;

        if (rp.r >= rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = rp.color;
        ctx.lineWidth = 1.8 * (1 - progress);
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Update Particle Physics
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        // Bounce gently inside canvas bounds
        if (p.x < 15) { p.x = 15; p.vx *= -1; }
        if (p.x > width - 15) { p.x = width - 15; p.vx *= -1; }
        if (p.y < 15) { p.y = 15; p.vy *= -1; }
        if (p.y > height - 15) { p.y = height - 15; p.vy *= -1; }

        // Interactive cursor gentle magnetic interaction
        if (mouse.isHovered) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 130;

          if (dist < maxDist && dist > 1) {
            const force = (1 - dist / maxDist) * 3;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 0.35;
            p.y -= Math.sin(angle) * force * 0.35;
          }
        }
      }

      // 5. Constellation & Circuit Lines between nearby nodes
      ctx.lineWidth = 1;
      const maxConnect = width < 768 ? 85 : 120;

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < maxConnect * maxConnect) {
            const dist = Math.sqrt(d2);
            const lineAlpha = (1 - dist / maxConnect) * 0.20;

            ctx.strokeStyle = p1.color.startsWith('#e1') || p1.color.startsWith('#f4')
              ? `rgba(225, 29, 72, ${lineAlpha})`
              : `rgba(2, 132, 199, ${lineAlpha})`;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Subtle data transmission pulse along connection line
            if ((i + j) % 6 === 0) {
              const signalProgress = (time * 0.75 + (i * 0.18)) % 1;
              const sx = p1.x + (p2.x - p1.x) * signalProgress;
              const sy = p1.y + (p2.y - p1.y) * signalProgress;

              ctx.fillStyle = p1.color;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.4, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Interactive laser tether line from cursor to closest particles
      if (mouse.isHovered) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 105) {
            const lineAlpha = (1 - dist / 105) * 0.32;
            ctx.strokeStyle = `rgba(225, 29, 72, ${lineAlpha})`;
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 6. Draw Particles (Code Tokens, Puzzle Outlines, Gears, Circuit Nodes)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = Math.sin(time * 3 + p.pulsePhase);
        const dynamicAlpha = Math.max(0.25, Math.min(0.85, p.alpha + pulse * 0.15));

        ctx.save();
        ctx.globalAlpha = dynamicAlpha;

        if (p.type === 'puzzle') {
          // Delicate Jigsaw Puzzle piece outline (clean robotics block coding theme)
          const sz = p.size;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.strokeStyle = p.color;
          ctx.fillStyle = p.glowColor;
          ctx.lineWidth = 1.4;

          ctx.beginPath();
          ctx.moveTo(-sz, -sz);
          ctx.lineTo(-sz * 0.25, -sz);
          ctx.arc(0, -sz * 1.25, sz * 0.35, Math.PI, 0, false); // top tab
          ctx.lineTo(sz, -sz);
          ctx.lineTo(sz, sz);
          ctx.lineTo(sz * 0.25, sz);
          ctx.arc(0, sz * 0.75, sz * 0.35, 0, Math.PI, true);  // bottom indent
          ctx.lineTo(-sz, sz);
          ctx.closePath();

          ctx.fill();
          ctx.stroke();

        } else if (p.type === 'gear') {
          // Minimal 6-tooth robotics gear ring
          const r = p.size;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 1.2;

          ctx.beginPath();
          for (let tooth = 0; tooth < 6; tooth++) {
            const angle = (tooth * Math.PI) / 3;
            const x1 = Math.cos(angle - 0.2) * r;
            const y1 = Math.sin(angle - 0.2) * r;
            const x2 = Math.cos(angle - 0.15) * (r * 1.35);
            const y2 = Math.sin(angle - 0.15) * (r * 1.35);
            const x3 = Math.cos(angle + 0.15) * (r * 1.35);
            const y3 = Math.sin(angle + 0.15) * (r * 1.35);
            const x4 = Math.cos(angle + 0.2) * r;
            const y4 = Math.sin(angle + 0.2) * r;

            if (tooth === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.lineTo(x3, y3);
            ctx.lineTo(x4, y4);
          }
          ctx.closePath();
          ctx.stroke();

          // Center axle dot
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, r * 0.3, 0, Math.PI * 2);
          ctx.fill();

        } else if (p.type === 'code' && p.symbol) {
          // Crisp floating code and robotics text tokens
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot * 0.3);
          ctx.font = `600 ${Math.round(p.size)}px 'Space Grotesk', system-ui, -apple-system, sans-serif`;
          ctx.fillStyle = p.color;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, 0, 0);

        } else if (p.type === 'spark') {
          // 4-pointed glittering star
          const s = p.size;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -s * 1.5);
          ctx.quadraticCurveTo(0, 0, s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, s * 1.5);
          ctx.quadraticCurveTo(0, 0, -s * 1.5, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s * 1.5);
          ctx.fill();

        } else {
          // Glowing round circuit node with subtle halo
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
          halo.addColorStop(0, p.color);
          halo.addColorStop(0.4, p.glowColor);
          halo.addColorStop(1, 'transparent');

          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.85, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // 7. Render Trailing Sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const ratio = s.life / s.maxLife;
        s.alpha = 1 - ratio;

        if (s.life >= s.maxLife) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * (1 - ratio * 0.3), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
      canvas.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto cursor-default z-0"
      aria-hidden="true"
    />
  );
};
