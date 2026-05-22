"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import Logo from "./logo";
import {
  FaHome, FaUser, FaServicestack,
  FaFolderOpen, FaEnvelope,
  FaSun, FaMoon, FaArrowRight,
} from "react-icons/fa";
import { FloatingNavDock } from "./header/floatingdoc";

const navLinks = [
  { label: "Home", href: "/", icon: FaHome },
  { label: "About", href: "/about", icon: FaUser },
  { label: "Services", href: "/services", icon: FaServicestack },
  { label: "Projects", href: "/projects", icon: FaFolderOpen },
  { label: "Contact Us", href: "/contact", icon: FaEnvelope },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 50) setVisible(true);
      else if (y > lastScrollY.current + 8) { setVisible(false); setMenuOpen(false); }
      else if (y < lastScrollY.current - 8) setVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  if (!mounted) return <div className="h-20" />;

  const dockItems = navLinks.map((link) => ({
    title: link.label,
    href: link.href,
    icon: <link.icon size={16} />, 
    active: isActive(link.href),
  }));

  return (
    <>
     

      <header
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 pt-3"
      >
        <div className="max-w-7xl mx-auto p-5 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
<Link 
  href="/" 
  aria-label="S3D Web Solutions" 
  className={`
    transition-all duration-300
    ${visible ? "backdrop-blur-sm p-2 pb-5" : ""}
  `}
  style={{
    // Is polygon clip-path se bottom center me solid arrow triangle point banega
    clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)"
  }}
>            <Logo isDark={isDark} size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav>
            <FloatingNavDock items={dockItems} isDark={isDark} />
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className={`
                w-11 h-11 rounded-xl flex items-center justify-center border
                transition-all duration-300 hover:scale-110 backdrop-blur-sm
                ${isDark
                  ? "border-amber-400/40 bg-white/5 hover:bg-white/10"
                  : "border-indigo-500/40 bg-black/5 hover:bg-black/8"}
              `}
            >
              {isDark
                ? <FaSun size={14} className="text-amber-400" />
                : <FaMoon size={14} className="text-indigo-500" />}
            </button>

                               <Headbutton isDarks={isDark} />


            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            >
              <span className={`block h-px w-5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-black"} ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`block h-px rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-black"} ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
              <span className={`block h-px w-5 rounded-full transition-all duration-300 ${isDark ? "bg-white" : "bg-black"} ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {/* <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          border-t border-white/[0.07] backdrop-blur-xl
          ${menuOpen ? "max-h-130" : "max-h-0 border-transparent"}
        `}>
          <nav className="px-5 py-5 flex flex-col gap-1">
            {navLinks.map((link, idx) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="mobile-link flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200"
                  style={{
                    background: active ? "rgba(74,222,128,0.08)" : "transparent",
                    border: `1px solid ${active ? "rgba(74,222,128,0.3)" : "transparent"}`,
                    color: active ? "#4ade80" : isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center border"
                    style={{
                      borderColor: active ? "#4ade80" : isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)",
                    }}
                  >
                    <Icon size={16} style={{ color: active ? "#4ade80" : isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)" }} />
                  </div>
                  <span className="text-sm font-medium">{link.label}</span>
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />}
                </Link>
              );
            })}

                       <Headbutton isDarks={isDark} />

          </nav>
        </div>  */}
      </header>
    </>
  );
}



function Headbutton({isDarks}: { isDarks: boolean }){
  return(
  <Link
  href="/contact"
  className={`
    hidden md:inline-flex items-center gap-2.5 px-7 py-3 rounded-xl
    text-sm font-semibold bg-linear-to-r tracking-wide transition-all duration-300 group
    relative overflow-hidden
    ${isDarks
      ? " from-violet-600 via-blue-600 to-purple-600 shadow-violet-500/30 text-white"
      : " from-zinc-800 to-zinc-900 hover:from-orange-500 hover:to-red-500 shadow-zinc-200/30 text-zinc-100"
    }
     shadow-sm hover:shadow-lg hover:scale-105 active:scale-95
  `}
>
  {/* Shimmer animation */}
  <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />
  
  {/* Hover glow */}
  <span className={`
    absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
    ${isDarks ? "bg-white/10" : "bg-white/20"}
    blur-sm
  `} />
  
  <span className="relative z-10">✨ Start a project</span>
  
  <FaArrowRight
    size={12}
    className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
  />
</Link>
)
}