import { useEffect, useRef } from "react";

const COLORS = [
  "#a855f7", // purple
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#22d3ee", // light cyan
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  color: string;
  opacity: number;
  life: number;
  maxLife: number;
}

interface TrailPoint {
  x: number;
  y: number;
  timestamp: number;
}

export default function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    const particles: Particle[] = [];
    const trail: TrailPoint[] = [];
    const TRAIL_MAX = 12;
    const TRAIL_DURATION = 180; // ms

    let mouseX = -1000;
    let mouseY = -1000;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnParticles = (x: number, y: number) => {
      const count = 4 + Math.floor(Math.random() * 3); // 4-6
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        const maxLife = 600 + Math.random() * 300; // 600-900ms
        const maxRadius = 2 + Math.random() * 4; // 2-6px
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: maxRadius,
          maxRadius,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: 1,
          life: 0,
          maxLife,
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const px = e.clientX;
      const py = e.clientY;

      // Only spawn if cursor has moved meaningfully
      const dx = px - mouseX;
      const dy = py - mouseY;
      if (dx * dx + dy * dy > 16) {
        spawnParticles(px, py);
      }

      mouseX = px;
      mouseY = py;

      // Update trail
      trail.push({ x: px, y: py, timestamp: performance.now() });
      if (trail.length > TRAIL_MAX) trail.shift();
    };

    const drawParticle = (p: Particle) => {
      const progress = p.life / p.maxLife;
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      p.opacity = 1 - eased;
      p.radius = p.maxRadius * (1 - eased * 0.5);

      if (p.opacity <= 0) return;

      ctx.save();
      ctx.globalAlpha = p.opacity * 0.9;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 20 + p.radius * 4;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawTrail = () => {
      const now = performance.now();
      const alive = trail.filter((pt) => now - pt.timestamp < TRAIL_DURATION);

      for (let i = 0; i < alive.length; i++) {
        const pt = alive[i];
        const age = now - pt.timestamp;
        const opacity = (1 - age / TRAIL_DURATION) * 0.55;
        const radius = 1.5 + (i / alive.length) * 2.5;

        const color = COLORS[i % COLORS.length];
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.shadowColor = color;
        ctx.shadowBlur = 12;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    };

    const animate = (_timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawTrail();

      const dt = 16; // ~60fps delta approximation
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Apply gravity and drag
        p.vx *= 0.97;
        p.vy = p.vy * 0.97 + 0.04; // slight gravity
        p.x += p.vx;
        p.y += p.vy;

        drawParticle(p);
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      tabIndex={-1}
      aria-label="Cursor effect canvas"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
}
