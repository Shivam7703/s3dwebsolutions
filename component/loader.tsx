"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { logoWhite } from "@/assets/index";

export default function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let progressInterval: ReturnType<typeof setInterval>;

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) return prev + 2;
        if (prev < 88) return prev + 0.5;
        return prev;
      });
    }, 80);

    // ── 1. Minimum wait ────────────────────────────────────────
    const minWait = new Promise<void>((resolve) => setTimeout(resolve, 5000));

    // ── 2. Window load ─────────────────────────────────────────
    const pageLoad = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });

    // ── 3. DOM images load ─────────────────────────────────────
    const imagesLoad = new Promise<void>((resolve) => {
      const checkImages = () => {
        const imgs = Array.from(document.querySelectorAll("img"));
        if (imgs.length === 0) { resolve(); return; }
        const allLoaded = imgs.every((img) => img.complete && img.naturalHeight !== 0);
        if (allLoaded) { resolve(); return; }
        let loaded = 0;
        imgs.forEach((img) => {
          if (img.complete) {
            loaded++;
            if (loaded === imgs.length) resolve();
            return;
          }
          img.addEventListener("load", () => { loaded++; if (loaded === imgs.length) resolve(); }, { once: true });
          img.addEventListener("error", () => { loaded++; if (loaded === imgs.length) resolve(); }, { once: true });
        });
      };
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", checkImages, { once: true });
      } else {
        checkImages();
      }
    });

    // ── Jab sab load ho jaye ───────────────────────────────────
    Promise.all([minWait, pageLoad, imagesLoad]).then(() => {
      clearInterval(progressInterval);
      const fillInterval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 2;
          if (next >= 100) {
            clearInterval(fillInterval);
            setTimeout(() => setLoading(false), 5000);
            return 100;
          }
          return next;
        });
      }, 20);
    });

    // ── Canvas beam animation ──────────────────────────────────
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const neonColor = "rgba(167, 139, 250, ";
    const shadowColor = "#8b5cf6";
    const nodeColor = "#a78bfa";

    const lines = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 250 + 100,
      speed: Math.random() * 5 + 3,
      opacity: Math.random() * 0.06 + 0.10, // kam opacity: 0.04 to 0.07
      isVert: Math.random() > 0.5,
    }));

    let animationFrameId: number;

    function renderMatrix() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = `${neonColor}${line.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 6;
        ctx.shadowColor = shadowColor;

        if (line.isVert) {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x, line.y + line.len);
          line.y += line.speed;
          if (line.y > canvas.height) line.y = -line.len;
        } else {
          ctx.moveTo(line.x, line.y);
          ctx.lineTo(line.x + line.len, line.y);
          line.x += line.speed;
          if (line.x > canvas.width) line.x = -line.len;
        }
        ctx.stroke();

        if (Math.random() > 0.97) {
          ctx.fillStyle = nodeColor;
          ctx.shadowBlur = 8;
          ctx.shadowColor = shadowColor;
          ctx.beginPath();
          ctx.arc(line.x, line.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(renderMatrix);
    }

    renderMatrix();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(progressInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          className="max-w-80 w-[60vw] h-40 relative"
          style={{ animation: "imageFloat 5s ease-in-out infinite" }}
        >
          <Image src={logoWhite} alt="Logo" fill className="object-contain" priority />
        </div>

        {/* Percentage number */}
        <div
          className="text-violet-300 text-sm font-mono tracking-widest"
          style={{ textShadow: "0 0 10px #7c3aed" }}
        >
          {Math.floor(progress)}%
        </div>

        {/* Progress bar */}
        <div className="max-w-80 w-[60vw] h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-700 via-blue-700 to-purple-600 shadow-[0_0_10px_#DDD6FE] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <style>{`
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px) rotateX(4deg) rotateY(-4deg); }
          50% { transform: translateY(-10px) rotateX(6deg) rotateY(-2deg); }
        }
      `}</style>
    </div>
  );
}