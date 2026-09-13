"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  RiQuestionLine,
  RiAddLine,
  RiSubtractLine,
  RiShieldCheckLine,
  RiCodeSSlashLine,
  RiSmartphoneLine,
  RiPaletteLine,
} from "react-icons/ri";
import Link from "next/link";

/* ─────────────── DATA ─────────────── */
const faqData = [
  {
    id: "01",
    icon: <RiQuestionLine />,
    question: "How do I get started with remixing a 3D design?",
    answer:
      "Simply click on any completed work sample card above. It will direct you to the dedicated project workspace where you can click 'Remix' to clone the file instantly into your Spline dashboard.",
  },
  {
    id: "02",
    icon: <RiShieldCheckLine />,
    question: "Are these interactive design templates free to use?",
    answer:
      "Yes, all design elements, prototypes, and assets showcased under the community track are open-source and completely free for personal and commercial remixing.",
  },
  {
    id: "03",
    icon: <RiCodeSSlashLine />,
    question: "Can I export these designs directly into Next.js or React?",
    answer:
      "Absolutely. Spline provides production-ready embed codes, generic export layers, and optimized component wrappers specifically built to integrate directly with Next.js, React, and standard Tailwind CSS.",
  },
  {
    id: "04",
    icon: <RiSmartphoneLine />,
    question: "Do these real-time 3D designs affect mobile performance?",
    answer:
      "Our components are fully optimized under the hood. On mobile screens, the geometry polygon count and particle densities automatically scale down to preserve GPU efficiency.",
  },
];

/* ─────────────── CIRCULAR PROGRESS RING ─────────────── */
function CircleProgress({
  percentage,
  label,
  size = 132,
  strokeWidth = 10,
  delay = 0,
}: {
  percentage: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          className="stroke-zinc-200 dark:stroke-zinc-800"
        />
        {/* progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          className="stroke-orange-500 dark:stroke-violet-500"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={
            inView
              ? { strokeDashoffset: circumference - (percentage / 100) * circumference }
              : {}
          }
          transition={{ duration: 1.4, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="absolute flex flex-col items-center">
        <span className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-white">
          {percentage}%
        </span>
        <span className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 text-center px-2">
          {label}
        </span>
      </div>
    </div>
  );
}

/* ─────────────── LINEAR PROGRESS BAR ─────────────── */
function ProgressBar({
  label,
  percentage,
  delay = 0,
}: {
  label: string;
  percentage: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
        <span className="text-xs font-semibold text-orange-500 dark:text-violet-400">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-linear-to-r from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

/* ─────────────── 3D TILT STATS PANEL (replaces image) ─────────────── */
function TiltImage() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);
  const sRotX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const sRotY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: "900px" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.div
        style={{ rotateX: sRotX, rotateY: sRotY, transformStyle: "preserve-3d" }}
        className="relative w-85 sm:w-100 p-6 rounded-3xl border border-zinc-500/30 dark:border-zinc-700/40
                   bg-white/60 dark:bg-zinc-900/50 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/30"
      >
        {/* Circular progress rings */}
        <div className="flex items-center justify-center gap-6 mb-8" style={{ transform: "translateZ(20px)" }}>
          <CircleProgress percentage={92} label="Satisfaction" delay={0.1} />
          <CircleProgress percentage={78} label="Performance" delay={0.3} />
        </div>

        {/* Linear progress bars */}
        <div className="flex flex-col gap-5" style={{ transform: "translateZ(12px)" }}>
          <ProgressBar label="Project Completion" percentage={85} delay={0.2} />
          <ProgressBar label="Client Response Rate" percentage={96} delay={0.4} />
        </div>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 -right-4 px-3 py-1.5 rounded-xl text-[11px] font-bold
                     tracking-widest uppercase pointer-events-none z-10
                     bg-linear-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30
                     dark:from-violet-600 dark:to-blue-600 dark:shadow-violet-500/30"
          style={{ transform: "translateZ(28px)" }}
        >
          FAQ
        </motion.div>

        {/* Floating stat chip */}
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-3 -left-4 flex items-center gap-2 px-3 py-2 rounded-xl
                     text-[11px] font-semibold pointer-events-none z-10
                     bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md
                     border border-zinc-200/60 dark:border-zinc-700/60
                     text-zinc-700 dark:text-zinc-300
                     shadow-lg shadow-black/10 dark:shadow-black/30"
          style={{ transform: "translateZ(24px)" }}
        >
          <RiPaletteLine className="text-orange-500 dark:text-violet-400 text-base" />
          <span>Open Source</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ─────────────── FAQ ITEM ─────────────── */
function FAQItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof faqData)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`
          w-full rounded-2xl border overflow-hidden
          transition-all duration-400 backdrop-blur-xl
          ${isOpen
            ? "border-orange-500/50 dark:border-violet-500/40 shadow-lg shadow-orange-100/40 dark:shadow-violet-900/20"
            : "border-zinc-500/40 dark:border-zinc-600/40 hover:border-zinc-200/80 dark:hover:border-zinc-800/70"
          }
        `}
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center gap-4 px-5 py-5 text-left group focus:outline-none"
          aria-expanded={isOpen}
        >
          <div
            className={`
              shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-base
              transition-all duration-300
              ${isOpen
                ? "bg-gradient-to-br from-orange-500 to-red-500 dark:from-violet-600 dark:to-blue-600 text-white shadow-md shadow-orange-200/40 dark:shadow-violet-900/30"
                : "bg-zinc-700/80 text-zinc-200 group-hover:bg-zinc-700/60"
              }
            `}
          >
            {item.icon}
          </div>

          <span
            className={`flex-1 text-sm font-semibold tracking-tight transition-colors duration-300 pr-2
              ${isOpen
                ? "text-zinc-900 dark:text-zinc-100"
                : "text-zinc-700 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200"
              }`}
          >
            {item.question}
          </span>

          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`
              shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm
              transition-colors duration-300
              ${isOpen
                ? "bg-orange-500 dark:bg-violet-600 text-white"
                : " bg-zinc-700 text-zinc-200 group-hover:bg-zinc-800"
              }
            `}
          >
            {isOpen ? <RiSubtractLine /> : <RiAddLine />}
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-5 pb-5 pt-1">
                <div className="w-full h-px bg-zinc-400/40 dark:bg-zinc-300/50 mb-4" />
                <p className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-[1.78] font-normal pl-13">
                  {item.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────── MAIN EXPORT ─────────────── */
export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("01");
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section className="w-full py-24 px-6 md:px-12 lg:px-20 overflow-x-clip">
      <div ref={headerRef} className="max-w-7xl mx-auto mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-extrabold tracking-widest uppercase text-orange-500 dark:text-violet-500"
          >
            Got questions?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl leading-tight font-bold tracking-tight text-zinc-800 dark:text-white"
          >
            Frequently asked{" "}
            <span className="bg-linear-to-r from-orange-500 to-red-600 dark:from-violet-600 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent">
              questions
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className=" text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed"
        >
          Everything you need to know about our 3D design workflow and collaboration process.
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="flex flex-col gap-3 order-2 lg:order-1">
          {faqData.map((item, i) => (
            <FAQItem
              key={item.id}
              item={item}
              index={i}
              isOpen={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 flex items-center gap-4 px-5 py-4 rounded-2xl
                       border border-dashed border-zinc-500 backdrop-blur-md 
                       bg-zinc-50/50 dark:bg-zinc-900/30"
          >
            <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center
                            bg-linear-to-br from-orange-100 to-red-100
                            dark:from-violet-900/40 dark:to-blue-900/40">
              <RiQuestionLine className="text-orange-500 dark:text-violet-400 text-base" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-zinc-700 dark:text-zinc-300">Still have questions?</p>
              <p className="text-[12px] text-zinc-400 dark:text-zinc-500">We're happy to help.</p>
            </div>
            
             <Link href="/contact"
              className="shrink-0 text-[12px] font-semibold px-4 py-2 rounded-lg
                         bg-linear-to-r from-orange-500 to-red-500 text-white
                         dark:from-violet-600 dark:to-blue-600
                         shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200"
            >
              Contact us
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-80 sm:h-105 order-1 lg:order-2">
          <TiltImage />
        </div>
      </div>
    </section>
  );
}