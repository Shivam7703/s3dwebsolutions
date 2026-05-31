"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Billboard } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ─────────────── EXTENDED SERVICES DATA ─────────────── */
const servicesData = [
  {
    tag: "UI / UX DESIGN",
    title: "Premium Interfaces & Design Systems.",
    desc: "Custom Website Design, Redesign, Responsive Mobile layouts, and conversion-focused Landing Page Structures built to capture intent.",
  },
  {
    tag: "WEB DEVELOPMENT",
    title: "Corporate & Business Scale Platforms.",
    desc: "End-to-end Enterprise Solutions, Custom Portfolios, Blogs, and production-grade Business Web Hubs engineered with pure clean architecture.",
  },
  {
    tag: "E-COMMERCE",
    title: "High-Converting Digital Stores.",
    desc: "Scalable E-Commerce Storefronts, fluid payment gateways, multi-vendor asset management dashboards, and robust checkout optimization nodes.",
  },
  {
    tag: "MODERN TECH STACK",
    title: "React.js & Next.js Core Engineering.",
    desc: "Cutting-edge Frontend Systems, Node/Next Backend frameworks, complex API Integrations, and low-latency SSR application networks.",
  },
  {
    tag: "SPEED & OPTIMIZATION",
    title: "Performance Audits & Core Web Vitals.",
    desc: "Obsessive Speed Tuning, Database Queries minimization, SEO-Friendly rendering pipelines, and premium cloud edge caching setups.",
  },
  {
    tag: "MAINTENANCE & INFRA",
    title: "Secure Cloud DevOps & Support.",
    desc: "Bulletproof Website Security, automated regular Backups, Domain orchestration, Hosting Provisioning, and zero-downtime Server Migration loops.",
  },
  {
    tag: "BRAND IDENTITY",
    title: "Logo Architecture & Guidelines.",
    desc: "High-fidelity Logo Designs, complete Corporate Brand books, typography rules, color science systems, and professional corporate guidelines.",
  },
  {
    tag: "DIGITAL MARKETING",
    title: "Scroll-Stopping Visual Creatives.",
    desc: "Social Media Post designs, high-impact Display Banners, YouTube Thumbnails, ad campaign creatives, and tailored Canva Workspace assets.",
  },
  {
    tag: "PRINT & MOTION",
    title: "Corporate Collaterals & Animations.",
    desc: "Premium Brochures, Flyers, Business Cards, Packaging skins, Custom Illustrations, multi-tier Presentations, and high-end Motion Graphics animations.",
  }
];

/* ─────────────── COLOR PALETTES ─────────────── */
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
      shapeRef.current.rotation.y += delta * 0.12;
      shapeRef.current.rotation.x += delta * 0.06;
    }

    if (ringGroupRef.current) {
      const progress = scrollProgressRef.current;
      ringGroupRef.current.rotation.z = -progress * Math.PI * 2;

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
            <ringGeometry args={[2.0, 2.015, 128]} />
            <meshBasicMaterial 
              color={isDarkMode ? "#52525b" : "#a78bfa"} 
              transparent 
              opacity={0.35} 
              side={THREE.DoubleSide} 
            />
          </mesh>

          {servicesData.map((svc, i) => {
            const angle = (i / servicesData.length) * Math.PI * 2;
            const ringRadius = 2.0; 
            
            // CHANGED: Shrunk from 2.9 to 2.45 to bring labels ultra-close to the ring
            const textRadius = 2.45; 

            const dotX = Math.cos(angle) * ringRadius;
            const dotY = Math.sin(angle) * ringRadius;

            const textX = Math.cos(angle) * textRadius;
            const textY = Math.sin(angle) * textRadius;

            return (
              <group key={i}>
                <mesh position={[dotX, dotY, 0]}>
                  <circleGeometry args={[0.04, 16]} />
                  <meshBasicMaterial color={isDarkMode ? "#f97316" : "#8b5cf6"} /> 
                </mesh>

                <group position={[textX, textY, 0]}>
                  <Billboard>
                    <Text
                      fontSize={0.13}
                      color={isDarkMode ? "#ffffff" : "#18181b"} 
                      fontWeight={900} // CHANGED: Set to maximum numeric weight for extra boldness
                      font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjQ.ttf"
                      anchorX="center"
                      anchorY="middle"
                      letterSpacing={0.07}
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

/* ─────────────── MAIN INTERACTIVE LAYOUT ─────────────── */
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
    scrollProgressRef.current = latest;
    
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
    <section ref={containerRef} className="relative w-full h-[650vh] bg-transparent">
      <div className="sticky top-0 w-full h-screen flex flex-col lg:flex-row items-center max-w-7xl mx-auto px-6 md:px-12 overflow-visible">
        
        {/* ── LEFT TEXT ENGINE PANEL ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center z-10 pt-24 lg:pt-0">
          
          {/* FLOATING TOP BRANDING HEADER */}
          <div className="mb-6 lg:mb-10">
            
            <h3 className="text-xl md:text-3xl font-black tracking-tight text-zinc-700 dark:text-zinc-300 uppercase">
              Our Services
            </h3>
          </div>

          {/* DYNAMIC DESCRIPTION BOARD */}
          <div className="relative h-60 sm:h-70">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="absolute inset-0 flex flex-col justify-start"
              >
                {/* CHANGED: Replaced 'CATEGORY (1...)' text with active dynamic service name */}
                <div className="text-xs font-extrabold text-orange-500 dark:text-violet-500 tracking-widest uppercase mb-2">
                  {servicesData[activeIndex].tag} Hub
                </div>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 text-zinc-950 dark:text-zinc-50 leading-tight">
                  {servicesData[activeIndex].title}
                </h2>
                <p className=" text-zinc-800 dark:text-zinc-300 max-w-md leading-relaxed">
                  {servicesData[activeIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-5 flex items-center gap-6">
            <button className="px-6 py-3 rounded-full border border-zinc-950 dark:border-zinc-200 text-sm font-bold tracking-wide text-zinc-950 dark:text-zinc-200 hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-sm">
              Book a consultation
            </button>
            <button className="text-sm font-bold tracking-wide text-zinc-950 dark:text-zinc-200 hover:text-orange-500 dark:hover:text-orange-400 transition-colors group flex items-center gap-1.5">
              View Strategy Deck 
              <span className="group-hover:translate-x-1 transition-transform duration-200">›</span>
            </button>
          </div>
        </div>

        {/* ── RIGHT CANVAS AREA ── */}
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
            <div className="w-full h-full bg-transparent" />
          )}
        </div>

      </div>
    </section>
  );
}