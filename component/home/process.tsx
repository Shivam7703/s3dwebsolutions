"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { FiSearch, FiLayers, FiCpu, FiCode, FiEye, FiCheckCircle } from "react-icons/fi";
import Buttonmain from "../global/button";

export default function ProcessSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null); // Track elements to get exact max width
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-81%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.92, 1], [0, 1, 1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const steps = [
    { num: "01", title: "Discovery & Strategy", desc: "We align with your vision, analyze competitors, and chart out a comprehensive premium design blueprint from the ground up.", icon: <FiSearch className="text-2xl" /> },
    { num: "02", title: "Premium UI Architecture", desc: "Crafting modern wireframes, structural web flows, and state-of-the-art component models ready for fluid cross-platform execution.", icon: <FiLayers className="text-2xl" /> },
    { num: "03", title: "High-Fidelity Engineering", desc: "Writing production-grade, highly optimized scalable hooks, backend architecture modules, and semantic layout systems.", icon: <FiCpu className="text-2xl" /> },
    { num: "04", title: "Database & Logic Flow", desc: "Integrating secure microservices, low-latency relational database management nodes, and bulletproof security protocols.", icon: <FiCode className="text-2xl" /> },
    { num: "05", title: "Optimization & Quality Assurance", desc: "Deep performance audit sequences, Core Web Vitals profiling, automated unit testing, and viewport pixel-perfection fixes.", icon: <FiEye className="text-2xl" /> },
    { num: "06", title: "Global Production Launch", desc: "Deploying production-ready assets to globally distributed edge servers, setting cloud firewalls, and managing DNS setups.", icon: <FiCheckCircle className="text-2xl" /> },
  ];

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      // FIXED: Track the real scrollable max width of the sliding track instead of container bounds
      canvas.width = trackRef.current?.scrollWidth || 6000;
      canvas.height = 360; 
    };
    
    resizeCanvas();
    // Safety timeout for loading transitions
    const timeoutId = setTimeout(resizeCanvas, 100);
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const currentProgress = scrollYProgress.get();
      const totalWidth = canvas.width;
      const startX = 0; 
      // Calculate dynamic current position
      const endX = currentProgress * totalWidth;

      if (endX > startX) {
        ctx.beginPath();
        
        const centerY = canvas.height / 2;
        const amplitude = 90;    
        const wavelength = 340;  

        for (let currentX = startX; currentX <= endX; currentX += 6) {
          const currentY = centerY + Math.sin((currentX / wavelength) * Math.PI * 2) * amplitude;

          if (currentX === startX) {
            ctx.moveTo(currentX, currentY);
          } else {
            ctx.lineTo(currentX, currentY);
          }
        }

        // Clean sharp look without heavy shadows slowing rendering nodes
        ctx.shadowBlur = 0; 
        ctx.shadowColor = "transparent";
        
        // Accurate theme mapping values
        ctx.strokeStyle = isDark ? "#ffffff" : "#fb923c";
        ctx.lineWidth = 4; 
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, [scrollYProgress, isDark, mounted]);

  return (
    <section ref={targetRef} className="relative h-[510vh] bg-transparent">
      <div className="sticky top-14 h-screen flex flex-col justify-between overflow-hidden py-14 md:py-20">
        
        {/* Brand Block */}
        <motion.div 
          style={{ opacity }}
          className="px-6 md:px-20 max-w-xl z-20"
        >
          <span className="text-xs font-bold tracking-widest uppercase text-orange-500 dark:text-violet-500">
            How We Execute
          </span>
          <h2 className="mt-2 mb-5 text-4xl md:text-5xl font-bold tracking-tight text-zinc-800 dark:text-white">
            Our Work Process
          </h2>
          <div className="h-12">
            <Buttonmain href={"tel:+918218885483"} text={"Get Started"} variant={"primary"}/>
          </div>
        </motion.div>

        {/* Moving Slider Zone Container */}
        <div className="relative mt-auto mb-12 md:mb-16 w-full overflow-visible">
          
          {/* FIXED: Canvas element style track mapping matched with 100% width of sliding zone */}
          <motion.div 
            style={{ x }} 
            className="max-sm:hidden absolute top-1/2 -translate-y-1/2 left-0 pointer-events-none z-0"
          >
            <canvas ref={canvasRef} className="h-[360px] block" />
          </motion.div>

          {/* Cards Track Array Grid */}
          <motion.div 
            ref={trackRef}
            style={{ x }} 
            className="flex items-center gap-32 md:gap-48 pl-6 md:pl-20 pr-[45vw] w-max relative z-10 py-10"
          >
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="w-[85vw] md:w-[480px] h-auto md:h-[320px] flex flex-col justify-between shrink-0 p-10 rounded-[32px] border backdrop-blur-sm relative group transition-all duration-500
                  bg-white/40 border-zinc-200/90 hover:border-orange-400/40 shadow-[0_25px_50px_rgba(0,0,0,0.03)]
                  dark:bg-zinc-950/40 dark:border-zinc-800/80 dark:hover:border-violet-500/40 dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
              >
                {/* Premium Glow Overlay */}
                <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none -z-10
                  bg-orange-500/5 dark:bg-violet-600/10" 
                />

                <div>
                  <div className="flex justify-between items-center w-full mb-6">
                    <span className="text-5xl font-black tracking-tighter text-zinc-500 dark:text-white/40">
                      {step.num}
                    </span>
                    {/* FIXED: Dynamic theme compliant background contrast for icons wrapper */}
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-110
                      bg-zinc-100/80 border-zinc-200 text-orange-500
                      dark:bg-zinc-900/80 dark:border-zinc-800 dark:text-violet-400"
                    >
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    {step.title}
                  </h3>
                  
                  <p className="mt-4 text-base leading-relaxed font-normal text-zinc-600 dark:text-zinc-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>

      </div>
    </section>
  );
}