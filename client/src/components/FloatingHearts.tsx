/* ============================================================
   FloatingHearts — Corazones que aparecen al hacer clic
   ============================================================ */
import { useEffect } from "react";

export default function FloatingHearts() {
  useEffect(() => {
    const hearts = ["❤️", "💕", "💖", "💗", "💓", "✨", "🌟", "💫"];

    const spawnHeart = (x: number, y: number) => {
      const el = document.createElement("div");
      el.className = "floating-heart";
      el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      el.style.left = `${x - 12}px`;
      el.style.top = `${y - 12}px`;
      const duration = 1800 + Math.random() * 1200;
      el.style.animationDuration = `${duration}ms`;
      el.style.fontSize = `${1 + Math.random() * 1.2}rem`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), duration);
    };

    const handleClick = (e: MouseEvent) => {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          spawnHeart(
            e.clientX + (Math.random() - 0.5) * 60,
            e.clientY + (Math.random() - 0.5) * 60
          );
        }, i * 80);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
