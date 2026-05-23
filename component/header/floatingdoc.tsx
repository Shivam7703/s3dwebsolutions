"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

interface DockItem {
  title: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

interface FloatingNavDockProps {
  items: DockItem[];
  isDark: boolean;
}

export function FloatingNavDock({ items, isDark }: FloatingNavDockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="flex items-center gap-5 max-w-max px-4 py-2 backdrop-blur-md rounded-full"
      style={{ height: 64 }}
    >
      {items.map((item) => (
        <DockIcon
          key={item.href}
          mouseX={mouseX}
          item={item}
          isDark={isDark}
        />
      ))}
    </motion.div>
  );
}

function DockIcon({
  mouseX,
  item,
  isDark,
}: {
  mouseX: MotionValue<number>;
  item: DockItem;
  isDark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleRaw = useTransform(distance, [-120, -60, 0, 60, 120], [1, 1.23, 1.43, 1.23, 1]);
  const scale = useSpring(scaleRaw, { mass: 0.1, stiffness: 160, damping: 12 });

  const labelOpacityRaw = useTransform(distance, [-60, -20, 0, 20, 60], [0, 0.5, 1, 0.5, 0]);
  const labelOpacity = useSpring(labelOpacityRaw, { mass: 1, stiffness: 200, damping: 14 });

  const getIconClasses = () => {
    if (item.active) return isDark ? "text-violet-500" : "text-orange-500";
    return isDark ? "text-white/90 " : "text-black/65";
  };

  const getBackgroundClasses = () => {
    if (item.active) return isDark ? "bg-violet-500/10" : "bg-orange-500/10";
    return isDark ? "bg-white/5" : "bg-black/5";
  };

  const getBorderClasses = () => {
    if (item.active) return isDark ? "border-violet-500/70" : "border-orange-500/70";
    return isDark ? "border-white/40" : "border-black/40";
  };

  const getLabelClasses = () => {
    if (item.active) return isDark ? "text-violet-500" : "text-orange-500";
    return isDark ? "text-white/80" : "text-black/80";
  };

  return (
    <Link href={item.href} className="flex flex-col items-center no-underline ">
      <motion.div
        ref={ref}
        style={{ scale, transformOrigin: "bottom center" }}
        className="relative flex flex-col items-center"
      >
        <motion.span
          style={{ opacity: labelOpacity }}
          className={`absolute -bottom-4 text-[9px] z-50 font-bold whitespace-nowrap ${getLabelClasses()}`}
        >
          {item.title}
        </motion.span>

        <div
          className={`w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-all duration-200 border ${getBackgroundClasses()} ${getBorderClasses()}`}
        >
          <div className={getIconClasses()}>
            {item.icon}
          </div>
        </div>

      </motion.div>
    </Link>
  );
}