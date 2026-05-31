"use client";

import { useState, useRef, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  RiTwitterXLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiArrowRightLine,
  RiCodeSSlashLine,
  RiPaletteLine,
  RiRocketLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { team1, team2, team3, team4, team5 } from "@/assets";

/* ─────────────── TYPES ─────────────── */
interface SocialLink {
  platform: "twitter" | "linkedin" | "github";
  url: string;
  icon: React.ReactNode;
}

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  icon: React.ReactNode;
  socials: SocialLink[]; // Optimized: Array format for mapping
  img: StaticImageData | string;
  accent: string;
  angleDeg: number; 
}

/* ─────────────── DATA (OPTIMIZED WITH SOCIAL MAP) ─────────────── */
const members: TeamMember[] = [
  {
    id: 1,
    name: "Pankaj Prajapati",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer obsessed with performance and clean architecture. Builds blazing-fast Next.js apps that scale from MVP to enterprise without breaking a sweat.",
    skills: ["Next.js", "TypeScript", "Node.js", "AWS"],
    icon: <RiCodeSSlashLine />,
    socials: [
      { platform: "twitter", url: "#", icon: <RiTwitterXLine /> },
      { platform: "linkedin", url: "#", icon: <RiLinkedinBoxLine /> },
      { platform: "github", url: "#", icon: <RiGithubLine /> },
    ],
    img: team1,
    accent: "from-orange-500 to-red-500",
    angleDeg: 270, 
  },
  {
    id: 2,
    name: "Shweta K.",
    role: "UI/UX Design Lead",
    bio: "Design-first thinker who turns complex problems into pixel-perfect interfaces. Specialises in motion design and brand identity systems that convert visitors into customers.",
    skills: ["Figma", "Framer", "Tailwind", "Spline"],
    icon: <RiPaletteLine />,
    socials: [
      { platform: "twitter", url: "#", icon: <RiTwitterXLine /> },
      { platform: "linkedin", url: "#", icon: <RiLinkedinBoxLine /> },
    ], // Mane yahan github hata diya check karne ke liye, ye dynamic render hoga!
    img: team2, 
    accent: "from-violet-600 to-indigo-600",
    angleDeg: 342, 
  },
  {
    id: 5,
    name: "Vijay Kapoor",
    role: "Growth & SEO Strategist",
    bio: "Data-driven marketer who builds content systems that compound over time. Combines technical SEO with storytelling to attract, educate, and convert high-value audiences.",
    skills: ["SEO", "Content", "Analytics", "CRO"],
    icon: <RiShieldCheckLine />,
    socials: [
      { platform: "twitter", url: "#", icon: <RiTwitterXLine /> },
      { platform: "linkedin", url: "#", icon: <RiLinkedinBoxLine /> },
      { platform: "github", url: "#", icon: <RiGithubLine /> },
    ],
    img: team5, 
    accent: "from-amber-500 to-orange-600",
    angleDeg: 54, 
  },
  {
    id: 3,
    name: "Shivam Goyal",
    role: "3D & Motion Engineer",
    bio: "WebGL wizard and Framer Motion expert. Creates immersive 3D experiences using Three.js and Spline that blur the line between app and digital art.",
    skills: ["Three.js", "GSAP", "Framer Motion", "Blender"],
    icon: <RiRocketLine />,
    socials: [
      { platform: "twitter", url: "#", icon: <RiTwitterXLine /> },
      { platform: "linkedin", url: "#", icon: <RiLinkedinBoxLine /> },
      { platform: "github", url: "#", icon: <RiGithubLine /> },
    ],
    img: team4, 
    accent: "from-blue-600 to-cyan-500",
    angleDeg: 126, 
  },
  {
    id: 4,
    name: "Sneha Patel",
    role: "Growth & SEO Strategist",
    bio: "Data-driven marketer who builds content systems that compound over time. Combines technical SEO with storytelling to attract, educate, and convert high-value audiences.",
    skills: ["SEO", "Content", "Analytics", "CRO"],
    icon: <RiShieldCheckLine />,
    socials: [
      { platform: "twitter", url: "#", icon: <RiTwitterXLine /> },
      { platform: "linkedin", url: "#", icon: <RiLinkedinBoxLine /> },
      { platform: "github", url: "#", icon: <RiGithubLine /> },
    ],
    img: team3, 
    accent: "from-emerald-600 to-teal-500",
    angleDeg: 198, 
  },
];

const CIRCLE_R = 140; 
const AVATAR_SIZE = 68; 

/* ─────────────── AVATAR NODE ─────────────── */
function AvatarNode({
  member,
  isActive,
  onClick,
  cx,
  cy,
}: {
  member: TeamMember;
  isActive: boolean;
  onClick: () => void;
  cx: number;
  cy: number;
}) {
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: cx - AVATAR_SIZE / 2,
        top: cy - AVATAR_SIZE / 2,
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
      animate={{ rotate: -360 }}
      transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
    >
      <motion.button
        onClick={onClick}
        aria-label={`View ${member.name}`}
        className="relative w-full h-full focus:outline-none group"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          className={`absolute inset-[-3px] rounded-full bg-gradient-to-br ${member.accent}`}
          animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
        />

        {isActive && (
          <motion.div
            className={`absolute inset-[-8px] rounded-full bg-gradient-to-br ${member.accent} opacity-20`}
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className={`
          relative w-full h-full rounded-full overflow-hidden
          border-2 transition-all duration-300 bg-zinc-100 dark:bg-zinc-900
          ${isActive
            ? "border-transparent shadow-lg"
            : "border-zinc-200/80 dark:border-zinc-800 group-hover:border-zinc-400 dark:group-hover:border-zinc-500"
          }
        `}>
          {member.img ? (
            <Image src={member.img as StaticImageData} alt={member.name} fill className="object-cover" />
          ) : (
            <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br ${member.accent} text-white font-bold text-[15px]`}>
              {member.name.split(" ").map(n => n[0]).join("")}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 8 : 4 }}
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap
                     text-[10px] font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500 pointer-events-none"
        >
          {member.name.split(" ")[0]}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

/* ─────────────── ORBIT CIRCLE ─────────────── */
function OrbitCircle({
  activeId,
  onSelect,
}: {
  activeId: number;
  onSelect: (id: number) => void;
}) {
  const CENTER = 170; 
  const SIZE = CENTER * 2;

  return (
    <motion.div 
      className="relative shrink-0 flex items-center justify-center" 
      style={{ width: SIZE, height: SIZE }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
    >
      <svg width={SIZE} height={SIZE} className="absolute inset-0 pointer-events-none">
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CIRCLE_R}
          fill="none"
          strokeDasharray="4 8"
          className="stroke-zinc-600 dark:stroke-zinc-300/80"
          strokeWidth={2}
        />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={CIRCLE_R * 0.45}
          fill="none"
          className="stroke-zinc-700 dark:stroke-zinc-400"
          strokeWidth={2}
        />
        {members.map(m => {
          const rad = (m.angleDeg * Math.PI) / 180;
          const x = CENTER + CIRCLE_R * Math.cos(rad);
          const y = CENTER + CIRCLE_R * Math.sin(rad);
          return (
            <line
              key={m.id}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              className={`transition-all duration-500 ${
                activeId === m.id
                  ? "stroke-zinc-600 dark:stroke-zinc-400 opacity-80"
                  : "stroke-zinc-600 dark:stroke-zinc-300 opacity-60"
              }`}
              strokeWidth={activeId === m.id ? 1.5 : 0.75}
              strokeDasharray={activeId === m.id ? "none" : "2 4"}
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          key={activeId}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 rounded-full border border-zinc-500 bg-zinc-800/80 backdrop-blur-md flex items-center justify-center text-zinc-300 shadow-inner"
          style={{ originX: "50%", originY: "50%" }}
        >
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          >
            {members.find(m => m.id === activeId)?.icon}
          </motion.div>
        </motion.div>
      </div>

      {members.map(m => {
        const rad = (m.angleDeg * Math.PI) / 180;
        const cx = CENTER + CIRCLE_R * Math.cos(rad);
        const cy = CENTER + CIRCLE_R * Math.sin(rad);
        return (
          <AvatarNode
            key={m.id}
            member={m}
            isActive={activeId === m.id}
            onClick={() => onSelect(m.id)}
            cx={cx}
            cy={cy}
          />
        );
      })}
    </motion.div>
  );
}

/* ─────────────── MEMBER DETAIL PANEL (OPTIMIZED MAP) ─────────────── */
function MemberDetail({ member }: { member: TeamMember }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={member.id}
        initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="relative p-6 md:p-8 rounded-3xl border border-zinc-500/50 dark:border-zinc-600/40 
                   bg-zinc-300/30 dark:bg-zinc-900/30 backdrop-blur-xl
                   shadow-xl shadow-zinc-800/30 flex flex-col gap-6"
      >
        <div className="flex items-center gap-4 sm:gap-6 relative z-10">
          <div className={`w-16 h-16 rounded-xl overflow-hidden shrink-0 relative
                           ring-2 ring-offset-4 ring-offset-white dark:ring-offset-zinc-950
                           bg-gradient-to-br ${member.accent} p-[2px]`}>
            {member.img ? (
              <Image src={member.img as StaticImageData} alt={member.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 font-bold text-lg">
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
            )}
          </div>
          <div>
            <h3 className="text-[22px] font-bold tracking-tight text-zinc-900 mb-1 dark:text-zinc-100 leading-tight">
              {member.name}
            </h3>
            <span className={`text-sm font-bold tracking-widest uppercase
                              bg-gradient-to-r ${member.accent} bg-clip-text text-transparent`}>
              {member.role}
            </span>
          </div>
        </div>

        <div className={`h-0.5 w-full rounded-full bg-gradient-to-r ${member.accent}`} />

        <p className="text-sm leading-[1.75] text-zinc-800 dark:text-zinc-300 font-normal">
          {member.bio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {member.skills.map(skill => (
            <span
              key={skill}
              className="text-[11px] font-medium px-3 py-1 rounded-xl
                         bg-zinc-300/70 dark:bg-zinc-800/50 
                         text-zinc-800 dark:text-zinc-300
                         border border-zinc-600/40 dark:border-zinc-700/40"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Social interactions (Fully Optimized Map Loop) */}
        <div className="flex items-center gap-2.5 pt-2 border-t border-zinc-200/30 dark:border-zinc-800/40">
          {member.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              className="w-9 h-9 rounded-xl border flex items-center justify-center text-sm
                         border-zinc-500/60 dark:border-zinc-800/60 text-zinc-600 dark:text-zinc-300 
                         hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white dark:hover:bg-zinc-700/40 
                         transition-all duration-200"
            >
              {social.icon}
            </a>
          ))}

          <a href="/contact"
            className={`
              ml-auto inline-flex items-center gap-2 text-[12px] font-bold
              px-4 py-2.5 rounded-xl text-white shadow-md
              bg-gradient-to-r ${member.accent}
              hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200
            `}>
            Work with me <RiArrowRightLine />
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────── SECTION HEADER ─────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-16">
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="block text-xs font-extrabold tracking-widest uppercase mb-3
                   text-orange-500 dark:text-violet-500"
      >
        the people behind the magic
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-display text-[clamp(28px,5vw,52px)] font-bold leading-[1.08]
                   tracking-[-0.03em] text-zinc-900 dark:text-zinc-100"
      >
        Meet our Expert{" "}
        <em className="not-italic bg-gradient-to-r from-orange-500 to-red-500
                       dark:from-violet-500 dark:via-blue-500 dark:to-purple-500
                       bg-clip-text text-transparent">
          Gen Z's
        </em>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.22 }}
        className="mt-4 text-zinc-600 dark:text-zinc-300 font-light max-w-md mx-auto"
      >
        A tight-knit crew of builders, designers, and strategists — obsessed with shipping products that matter.
      </motion.p>
    </div>
  );
}

/* ─────────────── MAIN EXPORT ─────────────── */
export default function TeamSection() {
  const [activeId, setActiveId] = useState(1);
  const [userInteracted, setUserInteracted] = useState(false); 
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true });
  const activeMember = members.find(m => m.id === activeId)!;

  useEffect(() => {
    if (userInteracted) return; 

    const interval = setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = members.findIndex(m => m.id === currentId);
        const nextIndex = (currentIndex + 1) % members.length;
        return members[nextIndex].id;
      });
    }, 5000); 

    return () => clearInterval(interval);
  }, [userInteracted]);

  const handleMemberSelect = (id: number) => {
    setActiveId(id);
    // setUserInteracted(true); 
  };

  return (
    <section ref={sectionRef} className="w-full py-24 px-6 md:px-12 lg:px-20 overflow-x-clip bg-zinc-50/30 dark:bg-zinc-950/20">
      <div className="max-w-6xl mx-auto">

        <SectionHeader />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        >
          <div className="shrink-0 flex flex-col items-center">
            <OrbitCircle activeId={activeId} onSelect={handleMemberSelect} />
            <p className="text-[10px] text-zinc-700/80 dark:text-zinc-400 mt-7 tracking-widest uppercase font-medium">
              click nodes to explore
            </p>
          </div>

          <div className="hidden lg:block w-px self-stretch
                          bg-gradient-to-b from-transparent via-zinc-600 dark:via-zinc-500 to-transparent" />

          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <MemberDetail member={activeMember} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-4"
        >
          {members.map(m => (
            <button
              key={m.id}
              onClick={() => handleMemberSelect(m.id)}
              className="flex flex-col items-center gap-2 group focus:outline-none"
            >
              <motion.div
                animate={{
                  height: activeId === m.id ? 24 : 6,
                  opacity: activeId === m.id ? 1 : 0.25,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className={`w-[4px] rounded-full bg-gradient-to-b ${m.accent}`}
              />
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-200
                ${activeId === m.id
                  ? "text-zinc-800 dark:text-zinc-100"
                  : "text-zinc-700 dark:text-zinc-400 group-hover:opacity-100 opacity-50"
                }`}>
                {m.name.split(" ")[0]}
              </span>
            </button>
          ))}
        </motion.div>

      </div>
    </section>
  );
}