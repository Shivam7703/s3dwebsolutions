"use client";
import  { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import * as THREE from "three";

function ThreeShape({ shape }: { shape: "triangle" | "eye" | "diamond" }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const isMobile = window.innerWidth < 768;

    const W = isMobile ? mountRef.current.clientWidth * 0.7 : mountRef.current.clientWidth;
    const H = isMobile ? 160 : mountRef.current.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const l1 = new THREE.PointLight(0xf97316, 12, 10);
    l1.position.set(2, 2, 3);
    scene.add(l1);
    const l2 = new THREE.PointLight(0xfbbf24, 8, 10);
    l2.position.set(-2, -1, 2);
    scene.add(l2);
    const l3 = new THREE.DirectionalLight(0xffffff, 1.5);
    l3.position.set(0, 5, 5);
    scene.add(l3);

    const glassMat = (color: number, opacity = 0.82) =>
      new THREE.MeshPhysicalMaterial({
        color, metalness: 0.0, roughness: 0.0,
        transmission: 0.9, thickness: 2.0, ior: 1.8,
        transparent: true, opacity, clearcoat: 1.0,
        clearcoatRoughness: 0.0, side: THREE.DoubleSide,
      });

    const edgeMat = (color: number, opacity = 1.0) =>
      new THREE.LineBasicMaterial({ color, transparent: true, opacity });

    let mainMesh!: THREE.Mesh;
    let mainEdges!: THREE.LineSegments;
    let reflMesh!: THREE.Mesh;
    let reflEdges!: THREE.LineSegments;

    // Only triangle shape is used now
    const geo = new THREE.ConeGeometry(0.7, 1.6, 4, 1);
    mainMesh = new THREE.Mesh(geo, glassMat(0xf97316));
    mainEdges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat(0xfb923c));
    scene.add(mainMesh, mainEdges);

    const rGeo = new THREE.ConeGeometry(0.7, 1.6, 4, 1);
    reflMesh = new THREE.Mesh(rGeo, glassMat(0xf97316, 0.22));
    reflMesh.rotation.x = Math.PI;
    reflMesh.position.y = -1.65;
    reflEdges = new THREE.LineSegments(new THREE.EdgesGeometry(rGeo), edgeMat(0xfb923c, 0.18));
    reflEdges.rotation.x = Math.PI;
    reflEdges.position.y = -1.65;
    scene.add(reflMesh, reflEdges);

    let mx = 0, my = 0;
    const onMouse = (e: MouseEvent) => {
      const r = mountRef.current?.getBoundingClientRect();
      if (!r) return;
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = -((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    let fid: number;
    const clock = new THREE.Clock();
    const edgesMat = mainEdges.material as THREE.LineBasicMaterial;

    let targetZ = 5;
    const onScroll = () => {
      const el = mountRef.current?.closest("section");
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - rect.top / window.innerHeight));
      targetZ = 8 - progress * 4;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    function animate() {
      fid = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth zoom with easing
      camera.position.z += (targetZ - camera.position.z) * 0.04;

      mainMesh.rotation.y = t * 0.8;
      mainEdges.rotation.y = t * 0.8;
      mainMesh.rotation.x = my * 0.18;
      mainEdges.rotation.x = my * 0.18;
      mainMesh.rotation.z = -mx * 0.1;
      mainEdges.rotation.z = -mx * 0.1;
      reflMesh.rotation.y = t * 0.8;
      reflEdges.rotation.y = t * 0.8;
      const floatY = Math.sin(t * 0.9) * 0.08;
      mainMesh.position.y = floatY;
      mainEdges.position.y = floatY;

      l1.color.setHSL(0.06 + Math.sin(t * 0.3) * 0.04, 1.0, 0.55);
      l2.color.setHSL(0.10 + Math.sin(t * 0.4) * 0.03, 1.0, 0.6);
      edgesMat.color.setHSL(0.07 + Math.sin(t * 0.5) * 0.03, 1.0, 0.65);

      camera.position.x += (mx * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (my * 0.15 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(fid);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [shape]);

  return (
    <div
      ref={mountRef}
      className="absolute left-[50%] md:top-1/2 top-[65%] md:left-1/2 md:-translate-x-1/2 z-10 pointer-events-none"
      style={{ width: "280px", height: "360px", transform: "translate(-50%, -50%)" }}
    />
  );
}

function MissionVisionSection({
  shape, label, quote, showShape = false,
}: {
  shape: "triangle" | "eye" | "diamond";
  label: string;
  quote: string;
  showShape?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Kam value = zada smooth/slow
    damping: 30,    // Higher value = less bounce
    mass: 1         // Weight feel
  });

  
  const scale = useTransform(smoothProgress, [0, 1], [0.35, 1], { clamp: true });
  const y = useTransform(smoothProgress, [0, 1], [100, 0], { clamp: true });
  
  const filterId = `water-${label.replace(/\s+/g, "-")}`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center backdrop-blur-xs p-10 md:p-28 bg-white/20 dark:bg-black/40 transition-colors duration-500 overflow-hidden"
    >
      {showShape && <ThreeShape shape={shape} />}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl text-gray-600 dark:text-gray-300 text-center sm:text-lg italic mb-8"
      >
        <span className="text-orange-400 text-3xl align-top leading-none mr-1">"</span>
        {quote}
        <span className="text-orange-400 text-3xl align-bottom leading-none ml-1">"</span>
      </motion.p>

      <div className="relative z-0 select-none cursor-default">
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id={filterId} x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.01" numOctaves="2" seed="5" result="noise">
                <animate attributeName="baseFrequency" values="0.018 0.01; 0.025 0.016; 0.018 0.01" dur="5s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        <motion.h1
          style={{ scale, y }}
          className="text-[clamp(5.5rem,12vw,10rem)] bg-linear-to-b dark:from-zinc-600 dark:via-zinc-400 dark:to-zinc-200 from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent font-extrabold uppercase tracking-tight leading-none"
        >
          {label}
        </motion.h1>

        <motion.div
          style={{
            scale,
            y,
            maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.58) 0%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, transparent 95%)",
            marginTop: "-12px",
            transformOrigin: "top center",
          }}
          className="pointer-events-none select-none"
        >
          <h1
            className="text-[clamp(5.5rem,12vw,10rem)] font-extrabold bg-linear-to-b scale-y-[-0.8]! dark:from-zinc-600 dark:via-zinc-400 dark:to-zinc-200 from-zinc-900 via-zinc-700 to-zinc-500 bg-clip-text text-transparent uppercase tracking-tight leading-none"
            style={{ filter: `url(#${filterId})` }}
          >
            {label}
          </h1>
        </motion.div>
      </div>
    </section>
  );
}

export default function Mission() {
  return (
    <div className="relative">
      <div className="sticky top-0 z-10">
        <MissionVisionSection
          shape="triangle"
          label="OUR MISSION"
          quote="To provide superior quality products and services that customers recommend to family and friends, partners select S3D for their customers and our employees are proud of the product they deliver."
          showShape={true}
        />
      </div>
      <div className="sticky top-0 z-20 bg-zinc-50/90 dark:bg-black/90">
        <MissionVisionSection
          shape="eye"
          label="OUR VISION"
          quote="To be the global leader in shaping the future of web-based interactive experiences — where every digital journey is immersive, intuitive, and unforgettable."
          showShape={false}
        />
      </div>
      <div className="sticky top-0 z-30 bg-zinc-50/90 dark:bg-black/90">
        <MissionVisionSection
          shape="diamond"
          label="OUR VALUES"
          quote="Innovation, Transparency, and User-Centric Design are not just principles — they are the foundation of every pixel, every line of code, and every solution we deliver."
          showShape={false}
        />
      </div>
    </div>
  );
}