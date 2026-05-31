"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useAnimationFrame, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Named imports from asset configurations
import { pro1, pro2, pro3, pro4, pro5, pro6, pro7, pro8 } from "@/assets/index";

/* ─────────────── SHOWCASE DATA TRACKS ─────────────── */
const track1 = [
  { img: pro1, title: "Brand & Marketing", user: "@sanny.verkissen", link: "/p1" },
  { img: pro2, title: "Gamified Experiences", user: "@rluzmotion", link: "/p2" },
  { img: pro3, title: "3D Mockups", user: "@tanyadizone", link: "/p3" },
  { img: pro4, title: "3D Logos", user: "@samborek", link: "/p4" },
];

const track2 = [
  { img: pro5, title: "Animated Characters", user: "@aximoris", link: "/p5" },
  { img: pro6, title: "Speeder Game", user: "@vladkolokolnikov", link: "/p6" },
  { img: pro7, title: "Industrial & Manufacturing", user: "@gleb124", link: "/p7" },
  { img: pro8, title: "3D Icons", user: "@adriandaniluk", link: "/p8" },
];

/* ─────────────── LIGHT/DARK ADAPTIVE PROJECT CARD ─────────────── */
function ProjectCard({ item }: { item: typeof track1[0] }) {
  return (
    <div className="shrink-0 w-50 sm:w-60 md:w-67.5 flex flex-col gap-2 group">
      <Link 
        href={item.link} 
        className="block w-full h-27.5 sm:h-32.5 md:h-37.5 relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-[#121214] border border-black/10 dark:border-white/15 group-hover:border-black/40 dark:group-hover:border-white/60 transition-all duration-300 shadow-md dark:shadow-xl cursor-pointer"
      >
        <Image
          src={item.img}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 200px, 270px"
          priority
          className="object-cover brightness-105 dark:brightness-110 transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-black/2 dark:bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
      </Link>
      
      <div className="px-1 flex flex-col gap-0.5 pointer-events-none select-none text-left">
        <h4 className="text-zinc-800 dark:text-zinc-100 text-xs sm:text-sm font-medium tracking-tight truncate group-hover:text-black dark:group-hover:text-white transition-colors">
          {item.title}
        </h4>
        <span className="text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs tracking-tight truncate">
          {item.user}
        </span>
      </div>
    </div>
  );
}

/* ─────────────── FIXED HIGH-PERFORMANCE MARQUEE ROW ─────────────── */
interface MarqueeRowProps {
  items: typeof track1;
  direction: "left" | "right";
}

function MarqueeRow({ items, direction }: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const xPos = useMotionValue(0);
  const isHovered = useRef(false);

  // Frame-by-frame mathematical animation control (Lag-free approach)
  useAnimationFrame((_, delta) => {
    if (!containerRef.current) return;

    // Total scrollable width ka aadha (Kyunki double data rendered hai)
    const totalWidth = containerRef.current.scrollWidth / 2;
    if (totalWidth === 0) return;

    // Step calculation logic based on frame delta time
    const baseSpeed = 45; // Base normal speed
    const slowSpeed = 15; // Slow down speed when cursor enters
    const currentSpeed = isHovered.current ? slowSpeed : baseSpeed;
    
    let moveBy = (currentSpeed * delta) / 1000; // Pixels per frame delta
    let currentX = xPos.get();

    if (direction === "left") {
      currentX -= moveBy;
      if (currentX <= -totalWidth) currentX += totalWidth; // Loop reset smoothly
    } else {
      currentX += moveBy;
      if (currentX >= 0) currentX -= totalWidth; // Loop reset smoothly
    }

    xPos.set(currentX);
  });

  return (
    <div className="w-full flex mask-edge-fade overflow-hidden py-1">
      <motion.div
        ref={containerRef}
        style={{ x: xPos }}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; }}
        className="flex gap-4 md:gap-5 pr-4 md:pr-5 shrink-0 w-max cursor-pointer"
      >
        {/* First Set */}
        {items.map((item, idx) => (
          <ProjectCard key={`set1-${idx}`} item={item} />
        ))}
        {/* Second Set (Seamless Twin Anchor) */}
        {items.map((item, idx) => (
          <ProjectCard key={`set2-${idx}`} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

/* ─────────────── MAIN SHOWCASE INTERACTIVE CONTAINER ─────────────── */
export default function SplineShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const dynamicScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[130vh] bg-linear-to-b from-transparent via-zinc-100/70 dark:via-zinc-800/70 to-transparent text-zinc-900 dark:text-white flex flex-col justify-center items-center overflow-hidden transition-colors duration-300"
    >
      {/* ── CENTRAL HEADING HEADER ── */}
      <div className="w-full max-w-3xl text-center px-4 mb-10 md:mb-12 z-20 pointer-events-none select-none flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white max-w-3xl leading-[1.15]">
          Take A look For Our Completed
          <span className="bg-linear-to-r from-orange-500 to-red-600 dark:from-violet-600 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent"> Work Samples</span>
        </h2>
        <p className="text-zinc-700 dark:text-zinc-100 font-bold mt-3.5 tracking-wide max-w-3xl">
          Get started by remixing a 3D design made by the Spline community.
        </p>
      </div>

      {/* ── TWO OPPOSITE PARALLEL SHOWCASE ROWS ── */}
      <div className="w-full relative flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale: dynamicScale }}
          className="w-full flex flex-col justify-center gap-4 md:gap-5 z-0"
        >
          {/* Row 1 -> Left */}
          <MarqueeRow items={track1} direction="left" />
          
          {/* Row 2 -> Right */}
          <MarqueeRow items={track2} direction="right" />
        </motion.div>
      </div>

      {/* ── SCREEN EDGE FADE MASKS ── */}
      <style jsx global>{`
        .mask-edge-fade {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 1) 15%,
            rgba(0, 0, 0, 1) 85%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(0, 0, 0, 1) 15%,
            rgba(0, 0, 0, 1) 85%,
            transparent 100%
          );
        }
      `}</style>
    </section>
  );
}