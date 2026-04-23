/* ============================================================
   StarCanvas — Noche Estrellada Mágica
   Partículas de estrellas animadas que reaccionan al cursor
   ============================================================ */
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  color: string;
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const starsRef = useRef<Star[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "255,240,200",
      "255,220,180",
      "240,200,255",
      "200,220,255",
      "255,255,255",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.15 + 0.02,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouse);
    resize();

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.01;

      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed * 100 + star.twinkleOffset);
        const alpha = star.opacity * (0.6 + 0.4 * twinkle);

        // Mouse proximity glow
        const dx = star.x - mouseRef.current.x;
        const dy = star.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glowFactor = dist < 120 ? (1 - dist / 120) * 2 : 0;
        const finalAlpha = Math.min(1, alpha + glowFactor * 0.5);
        const finalSize = star.size + glowFactor * 1.5;

        ctx.beginPath();
        ctx.arc(star.x, star.y, finalSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${finalAlpha})`;
        ctx.fill();

        if (glowFactor > 0.1) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, finalSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${star.color}, ${glowFactor * 0.15})`;
          ctx.fill();
        }

        // Slow drift upward
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = canvas.height + 2;
          star.x = Math.random() * canvas.width;
        }
      });

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="star-canvas" />;
}
