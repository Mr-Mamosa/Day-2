/* src/components/MatrixRain.tsx */
"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Authentic Matrix characters
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン".split("");

    let drops: number[] = [];
    const fontSize = 16; // Slightly larger for better visibility

    const setDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const columns = Math.floor(canvas.width / fontSize);
      drops = [];
      for (let x = 0; x < columns; x++) {
        // FIX: Start drops randomly ON the screen immediately, not above it
        drops[x] = Math.random() * (canvas.height / fontSize);
      }
    };

    setDimensions();
    window.addEventListener("resize", setDimensions);

    const draw = () => {
      // The fading trail effect (keep this dark)
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];

        // FIX: Use rgba for safer cross-browser opacity handling
        // 10% chance for a bright glowing character, 90% chance for a standard green
        if (Math.random() > 0.9) {
          ctx.fillStyle = "rgba(16, 185, 129, 1)"; // Bright Emerald
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(16, 185, 129, 0.8)";
        } else {
          ctx.fillStyle = "rgba(16, 185, 129, 0.4)"; // Faded Emerald
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", setDimensions);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // FIX: Removed opacity-40 so the glow effect actually works.
      // Changed to z-0 so it sits behind the relative z-10 children wrappers.
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
