"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { logo, logoWhite, icon, iconWhite } from "@/assets/index";

interface LogoProps {
  isDark: boolean;
  size: "sm" | "md";
}

const sizes = {
  sm: { markW: 165, markH: 112, divH: 40, divMx: 12 },
  md: { markW: 190, markH: 100, divH: 90, divMx: 28 },
};

export default function Logo({ isDark, size }: LogoProps) {
  const s = sizes[size];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Light/Dark Mode colors
  const neonColor = isDark ? "rgba(167, 139, 250, " : "rgba(249, 115, 22, ";
  const shadowColor = isDark ? "#A78BFA" : "#F97316";
  const nodeColor = isDark ? "#FFF" : "#F97316";
  
  // Adaptive Assets
  const logoSrc = isDark ? logoWhite : logo;
  const iconSrc = isDark ? iconWhite : icon;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    
    // Mobile par icon ke hisab se canvas width/height handle karne ke liye responsive check
    const isMobile = window.innerWidth < 768;
    const currentW = (size === "sm" && isMobile) ? 48 : s.markW;
    const currentH = (size === "sm" && isMobile) ? 48 : s.markH;

    canvas.width = currentW + 40;
    canvas.height = currentH + 40;

    const lines: Array<{
      x: number;
      y: number;
      len: number;
      speed: number;
      opacity: number;
      isVert: boolean;
    }> = [];

    const maxLines = 10;

    for (let i = 0; i < maxLines; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 40 + 20,
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.5 + 0.2,
        isVert: Math.random() > 0.5,
      });
    }

    function renderMatrix() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = `${neonColor}${line.opacity})`;
        ctx.lineWidth = 1.2;
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

        if (Math.random() > 0.94) {
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(line.x, line.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(renderMatrix);
    }

    renderMatrix();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark, size, s.markW, s.markH, neonColor, shadowColor, nodeColor]);

  return (
    <>
      <style jsx global>{`
        @keyframes imageFloat {
          0%, 100% { transform: translateY(0px) rotateX(4deg) rotateY(-4deg); }
          50% { transform: translateY(-4px) rotateX(6deg) rotateY(-2deg); }
        }
        .matrix-image-wrapper {
          transform-style: preserve-3d;
          animation: imageFloat 5s ease-in-out infinite;
          transition: transform 0.3s ease;
        }
        .group:hover .matrix-image-wrapper {
          transform: scale(1.05) rotateX(8deg) rotateY(0deg);
        }
      `}</style>

      <div className="flex items-center group select-none bg-transparent">
        
        {/* LOGO / ICON CONTAINER */}
        <div 
          className = {`relative flex items-center justify-center shrink-0 ${
            size === "sm" ? "w-12 h-12 md:w-[165px] md:h-[112px]" : "w-[190px] h-[100px]"
          }`}
          style={{ perspective: "1000px" }}
        >
          {/* Cybernetic Neon Wave Layer */}
          <canvas 
            ref={canvasRef} 
            className="absolute pointer-events-none z-0"
            style={{ 
              top: "-20px",
              left: "-20px",
              width: "calc(100% + 40px)",
              height: "calc(100% + 40px)"
            }}
          />

          {/* Wrapper for Images */}
          <div className="matrix-image-wrapper z-10 w-full h-full relative flex items-center justify-center">
            
            {size === "sm" ? (
              <>
                {/* Mobile: Shows ONLY Icon */}
                <div className="block md:hidden w-14 h-14 relative">
                  <Image 
                    src={iconSrc} 
                    alt="S3D Icon" 
                    fill
                    sizes="48px"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* PC/Tablet: Shows Full Logo */}
                <div className="hidden md:block w-full h-full relative">
                  <Image 
                    src={logoSrc} 
                    alt="S3D Logomark" 
                    fill
                    sizes="165px"
                    className="object-contain"
                    priority
                  />
                </div>
              </>
            ) : (
              // If size is 'md', always show full logo
              <div className="w-full h-full relative">
                <Image 
                  src={logoSrc} 
                  alt="S3D Logomark" 
                  fill
                  sizes="190px"
                  className="object-contain"
                  priority
                />
              </div>
            )}

          </div>
        </div>

        {/* CHROME-FINISHED DIVIDER BAR */}
        {/* <div
          className={`w-[2px] bg-gradient-to-b from-transparent via-purple-400 to-transparent self-center ${
            size === "sm" ? "hidden md:block" : "block"
          }`}
          style={{ height: s.divH, marginLeft: s.divMx, marginRight: s.divMx }}
        /> */}

      </div>
    </>
  );
}