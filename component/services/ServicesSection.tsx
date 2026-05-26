"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ─────────────── SERVICES DATA ─────────────── */
const servicesData = [
  {
    tag: "UI / UX",
    title: "User Experience & Digital Interfaces.",
    desc: "We design high-fidelity, pixel-perfect interfaces driven by user psychology. Turning complex application workflows into natural, beautiful interactive products.",
  },
  {
    tag: "OPTIMIZE WEBSITE",
    title: "Blazing Fast Performance. Built to Scale.",
    desc: "Obsessive speed and performance tuning using cutting-edge edge rendering networks. We make your digital presence convert visitors into buyers.",
  },
  {
    tag: "GRAPHIC DESIGN",
    title: "Visual Identity & Scroll-Stopping Assets.",
    desc: "Striking graphics designed with high craft and intention. From premium pitch decks to digital campaigns that define your brand voice.",
  },
  {
    tag: "SEO",
    title: "Dominate Search Engine Visibility.",
    desc: "Technical SEO strategies coupled with content intelligence that consistently secure top organic rankings and sustainable pipeline growth.",
  },
];

/* ─────────────── COLOR ARRAYS ─────────────── */
const LIGHT_COLORS = [
  0x27272a, 0x71717a, 0x9a3412, 0x374151, 0x1f2937, 0xf97316, 0xea580c, 0xfb923c, 0xc2410c,
];

const DARK_COLORS = [
  0x8b5cf6, 0xa78bfa, 0xc4b5fd, 0xffffff, 0xf0f0ff, 0x3b82f6, 0x60a5fa, 0xf43f5e, 0xfb7185, 0xa855f7, 0xd946ef,
];

/* ─────────────── 3D SCENE COMPONENT ─────────────── */
function RotatingScene({ 
  scrollProgressRef, 
  isDarkMode 
}: { 
  scrollProgressRef: React.MutableRefObject<number>;
  isDarkMode: boolean;
}) {
  const ringGroupRef = useRef<THREE.Group>(null);
  const shapeRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const positionAttribute = geo.attributes.position;
    const colors = [];

    const selectedPalette = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

    for (let i = 0; i < positionAttribute.count; i += 3) {
      const hexColor = selectedPalette[Math.floor(Math.random() * selectedPalette.length)];
      const threeColor = new THREE.Color(hexColor);
      
      colors.push(threeColor.r, threeColor.g, threeColor.b);
      colors.push(threeColor.r, threeColor.g, threeColor.b);
      colors.push(threeColor.r, threeColor.g, threeColor.b);
    }

    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [isDarkMode]);

  useFrame((state, delta) => {
    if (shapeRef.current) {
      shapeRef.current.rotation.y += delta * 0.15;
      shapeRef.current.rotation.x += delta * 0.08;
    }

    if (ringGroupRef.current) {
      const progress = scrollProgressRef.current;
      
      // Dynamic Z-rotation mapping with scroll tracking
      ringGroupRef.current.rotation.z = -progress * Math.PI * 2;

      // Parabola to perfect circle transition alignment
      ringGroupRef.current.rotation.x = THREE.MathUtils.lerp(ringGroupRef.current.rotation.x, (1 - progress) * (Math.PI / 3.5), 0.1);
      ringGroupRef.current.rotation.y = THREE.MathUtils.lerp(ringGroupRef.current.rotation.y, (1 - progress) * (-Math.PI / 5), 0.1);
    }
  });

  return (
    <>
      <ambientLight intensity={isDarkMode ? 1.2 : 1.6} />
      <directionalLight position={[5, 5, 5]} intensity={3} color="#ffffff" />
      <directionalLight position={[-5, -5, 3]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 6]} intensity={2} />

      <group position={[0, 0, 0]}>
        <mesh ref={shapeRef} geometry={geometry}>
          <meshPhysicalMaterial
            vertexColors={true}
            roughness={isDarkMode ? 0.25 : 0.15}
            metalness={isDarkMode ? 0.4 : 0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            flatShading={true} 
          />
        </mesh>

        <group ref={ringGroupRef}>
          <mesh>
            <ringGeometry args={[2.0, 2.015, 64]} />
            <meshBasicMaterial 
              color={isDarkMode ? "#52525b" : "#a78bfa"} 
              transparent 
              opacity={0.4} 
              side={THREE.DoubleSide} 
            />
          </mesh>

          {servicesData.map((svc, i) => {
            const angle = (i / servicesData.length) * Math.PI * 2;
            const ringRadius = 2.0; 
            const textRadius = 2.75; 

            const dotX = Math.cos(angle) * ringRadius;
            const dotY = Math.sin(angle) * ringRadius;

            const textX = Math.cos(angle) * textRadius;
            const textY = Math.sin(angle) * textRadius;

            return (
              <group key={i}>
                <mesh position={[dotX, dotY, 0]}>
                  <circleGeometry args={[0.045, 16]} />
                  <meshBasicMaterial color={isDarkMode ? "#f97316" : "#8b5cf6"} /> 
                </mesh>

                <group position={[textX, textY, 0]}>
                  <Billboard>
                    <Text
                      fontSize={0.15}
                      color={isDarkMode ? "#ffffff" : "#000000"} 
                      fontWeight="bold"
                      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjQ.ttf"
                      anchorX="center"
                      anchorY="middle"
                      letterSpacing={0.06}
                    >
                      {svc.tag}
                    </Text>
                  </Billboard>
                </group>
              </group>
            );
          })}
        </group>
      </group>
    </>
  );
}

/* ─────────────── MAIN EXPORT COMPONENT ─────────────── */
export default function Interactive3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // 1. Core animation values updated instantly on change trigger
    scrollProgressRef.current = latest;
    
    // 2. Strict index calculation based on layout heights
    const totalItems = servicesData.length;
    const computedIndex = Math.min(
      Math.floor(latest * totalItems),
      totalItems - 1
    );
    
    if (computedIndex !== activeIndex && computedIndex >= 0) {
      setActiveIndex(computedIndex);
    }
  });

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 md:px-12">
        
        {/* ── LEFT TEXT CONTENT PANEL ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 pt-20 lg:pt-0">
          <div className="relative h-[220px] sm:h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-5 text-zinc-950 dark:text-zinc-50 leading-tight">
                  {servicesData[activeIndex].title}
                </h2>
                <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 max-w-md leading-relaxed">
                  {servicesData[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <button className="px-6 py-3 rounded-full border border-zinc-950 dark:border-zinc-200 text-sm font-bold tracking-wide text-zinc-950 dark:text-zinc-50 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
              Book a consultation
            </button>
            <button className="text-sm font-bold tracking-wide text-zinc-950 dark:text-zinc-50 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group flex items-center gap-1.5">
              Explore our services 
              <span className="group-hover:translate-x-1 transition-transform duration-200">›</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT CANVAS (HYDRATION CONFINED INSIDE CANVAS DOM GRID) ── */}
        <div className="relative w-full lg:w-1/2 h-full z-0 flex items-center justify-center">
          {mounted ? (
            <Canvas
              camera={{ position: [0, 0, 7.5], fov: 45 }}
              className="w-full h-full"
              gl={{ alpha: true, antialias: true }}
            >
              <RotatingScene scrollProgressRef={scrollProgressRef} isDarkMode={isDarkMode} />
            </Canvas>
          ) : (
            // Solid layout placeholder during server preload phase
            <div className="w-full h-full bg-transparent" />
          )}
        </div>

      </div>
    </section>
  );
}