"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RiRocketLine,
  RiPaletteLine,
  RiCodeSSlashLine,
  RiShieldCheckLine,
  RiArrowRightLine,
  RiWifiFill,
  RiBatteryFill,
  RiSignalWifi3Fill,
} from "react-icons/ri";

const reasons = [
  {
    id: "01",
    icon: RiRocketLine,
    title: "Blazing Fast Delivery",
    short: "SPEED WITHOUT COMPROMISE",
    desc: "We ship production-ready MVPs in record time (2–4 weeks) using battle-tested sprint workflows without cutting corners on code quality.",
    accent: "from-orange-500 to-red-500",
    glow: "rgba(249,115,22,0.10)",
    bar: "bg-orange-500",
  },
  {
    id: "02",
    icon: RiPaletteLine,
    title: "Design-First Thinking",
    short: "CRAFT THAT CONVERTS",
    desc: "Every single pixel is intentional. We obsess over typography, spacing, and micro-interactions to make your product look uniquely premium.",
    accent: "from-violet-600 to-indigo-600",
    glow: "rgba(139,92,246,0.10)",
    bar: "bg-violet-500",
  },
  {
    id: "03",
    icon: RiCodeSSlashLine,
    title: "Modern Future-Proof Stack",
    short: "NEXT.JS · REACT · TAILWIND",
    desc: "We write clean, enterprise-grade TypeScript code on edge infrastructure ensuring flawless performance, SEO scores, and zero tech debt.",
    accent: "from-blue-600 to-cyan-500",
    glow: "rgba(59,130,246,0.10)",
    bar: "bg-blue-500",
  },
  {
    id: "04",
    icon: RiShieldCheckLine,
    title: "Built to Scale",
    short: "FROM MVP TO ENTERPRISE",
    desc: "Architecture level choices made on Day 1 ensure your product can easily handle 10x user scaling without requiring massive rewrites.",
    accent: "from-emerald-600 to-teal-500",
    glow: "rgba(16,185,129,0.10)",
    bar: "bg-emerald-500",
  },
];

/* ─── Mobile Screen Mock ─── */
function MobileScreen({ activeIndex }: { activeIndex: number }) {
  const item = reasons[activeIndex];
  const Icon = item.icon;

  const [time, setTime] = useState("");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setTime(`${h12}:${m} ${ampm}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    /* Phone shell — wider + taller */
    <div className="relative w-[280px] h-[560px] rounded-[44px] p-[3px]
                    bg-gradient-to-b from-zinc-300 to-zinc-400
                    dark:from-zinc-700 dark:to-zinc-800
                    shadow-2xl shadow-black/30 dark:shadow-black/60 shrink-0">

      {/* Inner body */}
      <div className="relative w-full h-full rounded-[41px] overflow-hidden
                      bg-white dark:bg-zinc-950 flex flex-col">

        {/* Dynamic Island */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 z-20
                        w-[90px] h-[26px] rounded-full bg-black" />

        {/* Status bar */}
        <div className="flex items-center justify-between px-6 pt-3.5 pb-1 shrink-0 z-10">
          <span className="text-[10px] font-bold text-zinc-900 dark:text-white mt-3">
            {time}
          </span>
          <div className="flex items-center gap-1 mt-3">
            <RiSignalWifi3Fill className="text-[10px] text-zinc-900 dark:text-white" />
            <RiWifiFill className="text-[10px] text-zinc-900 dark:text-white" />
            <RiBatteryFill className="text-[11px] text-zinc-900 dark:text-white" />
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full px-5 pt-3 pb-6 gap-3.5"
            >
              {/* App header */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-black tracking-tight
                                 text-zinc-900 dark:text-white">
                  S3D Web Solutions
                </span>
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center
                                 bg-gradient-to-br ${item.accent} text-white text-[12px]`}>
                  <Icon />
                </div>
              </div>

              {/* Hero card */}
              <div className={`rounded-2xl p-4 bg-gradient-to-br ${item.accent} text-white`}>
                <span className="text-[9px] font-bold tracking-widest opacity-80 block mb-1.5">
                  {item.short}
                </span>
                <h4 className="text-[15px] font-black leading-tight">{item.title}</h4>
                <p className="text-[10px] mt-2 opacity-80 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>

              {/* Mini stat cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "Speed", val: "2–4 wks" },
                  { label: "Quality", val: "100%" },
                  { label: "Stack", val: "Next.js" },
                  { label: "Scale", val: "10×" },
                ].map((s) => (
                  <div key={s.label}
                    className="rounded-xl p-3
                               bg-zinc-50 dark:bg-zinc-900
                               border border-zinc-100 dark:border-zinc-800">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 block">
                      {s.label}
                    </span>
                    <span className="text-[13px] font-bold text-zinc-900 dark:text-white">
                      {s.val}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div className="flex flex-col gap-2 mt-auto">
                {["Design", "Development", "Delivery"].map((label, li) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span className="text-[9px] text-zinc-400 dark:text-zinc-500 w-[68px] shrink-0">
                      {label}
                    </span>
                    <div className="flex-1 h-[3px] rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${[90, 75, 60][li]}%` }}
                        transition={{ duration: 0.7, delay: li * 0.1 + 0.2 }}
                        className={`h-full rounded-full ${item.bar}`}
                      />
                    </div>
                    <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500">
                      {[90, 75, 60][li]}%
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              
              <a  href="/contact"
                className={`w-full py-2.5 rounded-xl text-[11px] font-bold text-center
                             text-white bg-gradient-to-r ${item.accent}`}
              >
                Let's Deploy →
              </a>

              {/* Home indicator */}
              <div className="flex justify-center -mb-2">
                <div className="w-[80px] h-[4px] rounded-full bg-zinc-200 dark:bg-zinc-700" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Side buttons */}
      <div className="absolute -left-[3px] top-[100px] w-[3px] h-9 rounded-l-sm
                      bg-zinc-400 dark:bg-zinc-700" />
      <div className="absolute -left-[3px] top-[148px] w-[3px] h-9 rounded-l-sm
                      bg-zinc-400 dark:bg-zinc-700" />
      <div className="absolute -right-[3px] top-[120px] w-[3px] h-14 rounded-r-sm
                      bg-zinc-400 dark:bg-zinc-700" />
    </div>
  );
}

/* ─── Main Export ─── */
export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full min-h-screen py-24 px-6 md:px-12 lg:px-24
                        relative overflow-hidden flex items-center">

      {/* Ambient glow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className={`absolute top-1/2 -translate-y-1/2 right-[5%]
                      w-[260px] h-[260px] rounded-full blur-[100px]
                      bg-gradient-to-br ${reasons[activeIndex].accent}
                      pointer-events-none z-0`}
          style={{ opacity: 0.08 }}
        />
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12
                      gap-16 items-center relative z-10">

        {/* ── LEFT: Accordion ── */}
        <div className="lg:col-span-6 flex flex-col w-full text-left">
          <div className="mb-10">
            <span className="text-xs font-extrabold tracking-[0.3em] uppercase
                             text-orange-500 dark:text-violet-500">
              SEEDHI BAAT, NO BAKWAS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mt-2
                           text-zinc-900 dark:text-white">
              Why You Should <br />
              <span className="bg-linear-to-r from-orange-500 to-red-500
                               dark:from-violet-500 dark:via-blue-500 dark:to-purple-500
                               bg-clip-text text-transparent">
                Choose Us
              </span>
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {reasons.map((item, index) => {
              const isActive = activeIndex === index;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`
                    w-full text-left p-5 rounded-2xl border transition-all duration-300
                    flex items-center justify-between overflow-hidden group
                    ${isActive
                      ? "border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 shadow-md dark:shadow-black/30 backdrop-blur-md"
                      : "border-transparent bg-transparent opacity-50 hover:opacity-80"
                    }
                  `}
                >
                  <div className="flex items-center gap-5">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center text-xl
                      transition-all duration-500
                      ${isActive
                        ? `bg-gradient-to-br ${item.accent} text-white shadow-lg`
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
                      }
                    `}>
                      <Icon />
                    </div>
                    <div>
                      <span className="block text-[10px] font-mono tracking-widest font-bold
                                       text-zinc-400 dark:text-zinc-500">
                        POINT {item.id}
                      </span>
                      <h4 className={`text-[15px] font-bold transition-colors
                        ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-zinc-400"}`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                  <div className={`
                    w-6 h-6 rounded-full border flex items-center justify-center
                    transition-all duration-300
                    ${isActive
                      ? "rotate-45 bg-zinc-900 dark:bg-white text-white dark:text-black border-zinc-900 dark:border-white"
                      : "border-zinc-300 dark:border-zinc-700 text-zinc-400 dark:text-zinc-500 group-hover:translate-x-0.5"
                    }
                  `}>
                    <RiArrowRightLine className="w-3 h-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Mobile mockup ── */}
        <div className="lg:col-span-6 w-full h-[600px] flex items-center justify-center relative">
          <div className="absolute w-[380px] aspect-square rounded-full -z-10
                          border border-dashed border-zinc-200 dark:border-zinc-900
                          animate-spin [animation-duration:50s] hidden lg:block" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <MobileScreen activeIndex={activeIndex} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}