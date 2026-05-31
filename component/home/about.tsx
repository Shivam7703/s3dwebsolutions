"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaRocket, FaCompass, FaCode } from "react-icons/fa";

export default function AboutSection() {
  // Pure section ka ref scroll track karne ke liye
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // --- Heading Animation Ranges ---
  const headingOpacity = useTransform(scrollYProgress, [0.09, 0.3, 0.6, 0.7], [0, 1, 1, 0]);
  const headingY = useTransform(scrollYProgress, [0.09, 0.3, 0.6, 0.7], [60, 0, 0, -60]);

  // --- Description Paragraph Animation Ranges ---
  const paraOpacity = useTransform(scrollYProgress, [0.1, 0.23, 0.5, 0.65], [0, 1, 1, 0]);
  const paraY = useTransform(scrollYProgress, [0.1, 0.23, 0.5, 0.65], [60, 0, 0, -60]);

  // --- Cards staggered exit custom ranges ---
  const card1Opacity = useTransform(scrollYProgress, [0.12, 0.3, 0.6, 0.7], [0, 1, 1, 0]);
  const card1Y = useTransform(scrollYProgress, [0.12, 0.3, 0.6, 0.7], [80, 0, 0, -80]);

  const card2Opacity = useTransform(scrollYProgress, [0.15, 0.33, 0.65, 0.8], [0, 1, 1, 0]);
  const card2Y = useTransform(scrollYProgress, [0.15, 0.33, 0.65, 0.8], [80, 0, 0, -80]);

  const card3Opacity = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.85], [0, 1, 1, 0]);
  const card3Y = useTransform(scrollYProgress, [0.18, 0.38, 0.7, 0.8], [80, 0, 0, -80]);

  const cards = [
    {
      icon: <FaCompass className="text-xl" />,
      title: "Strategy First",
      desc: "We deep-dive into your market dynamics to outline a bulletproof roadmap before writing a single line of code.",
      opacity: card1Opacity,
      y: card1Y,
    },
    {
      icon: <FaCode className="text-xl" />,
      title: "Premium Engineering",
      desc: "Blazing-fast architectures built with Next.js and Tailwind, perfectly optimized for ultimate performance and SEO.",
      opacity: card2Opacity,
      y: card2Y,
    },
    {
      icon: <FaRocket className="text-xl" />,
      title: "Impactful Growth",
      desc: "We build intuitive user funnels and high-conversion interfaces designed exclusively to turn traffic into revenue.",
      opacity: card3Opacity,
      y: card3Y,
    },
  ];

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="max-w-6xl w-full flex flex-col gap-16 md:gap-24">
        
        {/* Top Header Block */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-12">
          
          {/* Animated Heading Left Side */}
          <motion.div 
            style={{ opacity: headingOpacity, y: headingY }}
            className="max-w-md"
          >
            <span className="text-xs font-extrabold text-orange-500 dark:text-violet-400 tracking-widest uppercase">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl leading-tight font-bold tracking-tight text-zinc-800 dark:text-white">
              East Or West, We Are The Best For All <span className="bg-linear-to-r from-orange-500 to-red-600 dark:from-violet-600 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent"> Web Solutions</span>
            </h2>
          </motion.div>

          {/* Animated Paragraph Right Side */}
          <motion.div 
            style={{ opacity: paraOpacity, y: paraY }}
            className="max-w-xl text-balance"
          >
            <p className=" leading-relaxed md:mt-5 text-zinc-950 dark:text-zinc-300">
              We are a collective of forward-thinking designers and engineers dedicated to crafting high-performance digital products. We don't just build websites; we create premium interactive ecosystems that elevate brands and deliver measurable business acceleration.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              style={{ opacity: card.opacity, y: card.y }}
              className="group relative p-8 rounded-3xl border transition-all duration-300 backdrop-blur-sm 
                bg-white/40 border-zinc-200/80 hover:border-orange-400/50 hover:bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]
                dark:bg-zinc-900/40 dark:border-zinc-800/80 dark:hover:border-violet-500/50 dark:hover:bg-zinc-900/60 dark:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
            >
              {/* Premium Glow Overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg pointer-events-none -z-10 bg-orange-500/10 dark:bg-violet-500/10" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-orange-500 to-red-500 dark:from-blue-600 dark:to-purple-600"
              >
                {card.icon}
              </div>

              {/* Card Text */}
              <h3 className="mt-6 text-xl font-bold tracking-tight text-zinc-800 dark:text-white">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}