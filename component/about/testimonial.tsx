"use client";

import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

const testimonials = [
  { text: "The 3D integration on our platform is breathtaking. Their attention to detail is unmatched.", name: "Alex Rivera", role: "CEO at TechFlow" },
  { text: "A seamless blend of performance and high-end aesthetics. Exactly what we needed.", name: "Sarah Chen", role: "Product Designer" },
  { text: "Rare to find developers who understand both code and true design. Excellent work.", name: "Elena Rossi", role: "CTO, CloudScale" },
  { text: "Transformed our digital presence. The motion effects are top-tier and smooth.", name: "Marcus Thorne", role: "Founder, Zenith" },
  { text: "Professional, efficient, and forward-thinking. Highly recommended for 3D web projects.", name: "David Kim", role: "Creative Lead" },
];

function TestimonialCard({ item }: { item: typeof testimonials[0] }) {
  return (
    <div className="shrink-0 w-[350px] p-6 rounded-3xl border backdrop-blur-lg transition-all duration-300 group
      bg-white/40 border-zinc-400/80 hover:border-orange-400/50 hover:bg-white/90 
      dark:bg-zinc-900/40 dark:border-zinc-800/80 dark:hover:border-violet-500/50 dark:hover:bg-zinc-900/60">
      
      {/* 5 Stars - Color synced to your theme */}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-orange-500 dark:text-violet-400 text-lg">★</span>
        ))}
      </div>
      
      <p className="text-zinc-700 dark:text-zinc-300 text-base mb-6 leading-relaxed italic">
        "{item.text}"
      </p>
      
      <div className="flex items-center gap-4 pt-5 border-t border-zinc-400/50 dark:border-zinc-800">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold bg-gradient-to-br from-orange-500 to-red-500 dark:from-blue-600 dark:to-purple-600">
          {item.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-bold text-zinc-900 dark:text-white text-sm">{item.name}</h4>
          <p className="text-zinc-500 dark:text-zinc-400 text-xs">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const xPos = useMotionValue(0);
  const isHovered = useRef(false);

  useAnimationFrame((_, delta) => {
    if (!containerRef.current || isHovered.current) return;
    const totalWidth = containerRef.current.scrollWidth / 2;
    const moveBy = (25 * delta) / 1000;
    let currentX = xPos.get() - moveBy;
    if (currentX <= -totalWidth) currentX += totalWidth;
    xPos.set(currentX);
  });

  return (
    <section className="py-24 overflow-hidden bg-zinc-50 dark:bg-black transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-800 dark:text-white">
          Voices of our <span className="bg-linear-to-r from-orange-500 to-red-600 dark:from-violet-600 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent">Partners</span>
        </h2>
      </div>

      <div className="w-full cursor-grab active:cursor-grabbing">
        <motion.div
          ref={containerRef}
          style={{ x: xPos }}
          onMouseEnter={() => { isHovered.current = true; }}
          onMouseLeave={() => { isHovered.current = false; }}
          className="flex gap-8 w-max px-6"
        >
          {[...testimonials, ...testimonials].map((item, idx) => (
            <TestimonialCard key={idx} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}