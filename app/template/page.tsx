"use client";
import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 240;

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frames = useRef<HTMLImageElement[]>([]);
  const currentFrame = useRef(0);
  const targetFrame = useRef(0);
  const rafId = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1280;
    canvas.height = 720;

    // ✅ Pehle 10 frames priority se load karo
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image();
      img.decoding = i < 10 ? "sync" : "async"; // pehle frames turant
      img.src = `/frames/frame_${String(i + 1).padStart(4, "0")}.jpg`;
      return img;
    });

    // Pehla frame draw karo
    frames.current[0].onload = () => {
      ctx.drawImage(frames.current[0], 0, 0, canvas.width, canvas.height);
    };

    // ✅ Smooth lerp animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      rafId.current = requestAnimationFrame(animate);

      // Current frame ko target ki taraf smoothly move karo
      const next = lerp(currentFrame.current, targetFrame.current, 0.12);
      const index = Math.round(next);
      currentFrame.current = next;

      const img = frames.current[index];
      if (!img?.complete) return;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx || !canvas) return;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    rafId.current = requestAnimationFrame(animate);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // ✅ Scroll se sirf target update karo — lerp baaki kaam karega
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    targetFrame.current = Math.round(latest * (TOTAL_FRAMES - 1));
  });

  return (
    <div ref={containerRef} style={{ height: "400vh", position: "relative" }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}