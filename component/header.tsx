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
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 50) setVisible(true);
      else if (y > lastScrollY.current + 8) { setVisible(false); }
      else if (y < lastScrollY.current - 8) setVisible(true);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return <div className="h-20" />;

  const isDark = resolvedTheme === "dark";

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const dockItems = navLinks.map((link) => ({
    title: link.label,
    href: link.href,
    icon: <link.icon size={16} />, 
    active: isActive(link.href),
  }));

  return (
    <>
      {/* Top Main Header Block */}
      <header
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
        className="fixed top-0 left-0 right-0 z-50 pt-3"
      >
        <div className="max-w-7xl mx-auto p-3 sm:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            aria-label="S3D Web Solutions" 
            className={`transition-all duration-300 ${visible ? "backdrop-blur-sm p-2 pb-5" : ""}`}
            style={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 80%, 50% 100%, 0% 80%)"
            }}
          >            
            <Logo isDark={isDark} size="sm" />
          </Link>

          {/* Desktop Nav: Mobile screen par hidden (`hidden md:block`) */}
          <nav className="hidden md:block">
            <FloatingNavDock items={dockItems} isDark={isDark} />
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label="Toggle theme"
              className="w-11 h-11 rounded-xl flex items-center justify-center border
                transition-all duration-300 hover:scale-110 backdrop-blur-sm
                border-indigo-500/40 bg-black/5 hover:bg-black/8
                dark:border-amber-400/40 dark:bg-white/5 dark:hover:bg-white/10"
            >
              {isDark
                ? <FaSun size={14} className="text-amber-400" />
                : <FaMoon size={14} className="text-indigo-500" />}
            </button>

            {/* Custom CTA Action Button */}
            <Headbutton />
          </div>
        </div>
      </header>

      {/* Mobile Sticky Dock: Sirf mobile screens par bottom center mein dikhega */}
      <div 
        className="fixed bottom-6 left-0 w-full md:hidden z-50"
      
      >
        <nav className="mx-auto w-max shadow-xl rounded-full">
          <FloatingNavDock items={dockItems} isDark={isDark} />
        </nav>
      </div>
    </>
  );
}

/* ==========================================================================
   Headbutton UI (Pure Tailwind Structure, No Hydration Flips)
   ========================================================================== */
function Headbutton() {
  return (
    <Link
      href="/contact"
      className="
        hidden md:inline-flex items-center gap-2.5 px-7 py-3 rounded-xl
        text-sm font-semibold tracking-wide transition-all duration-300 group
        relative overflow-hidden shadow-sm hover:shadow-lg hover:scale-105 active:scale-95
        
        /* Light Mode Styling Classes */
        from-zinc-800 to-zinc-900 hover:from-orange-500 hover:to-red-500 shadow-zinc-200/30 text-zinc-100 bg-linear-to-r
        
        /* Dark Mode Styling Classes */
        dark:from-violet-600 dark:via-blue-600 dark:hover:from-indigo-900 dark:hover:to-violet-900  dark:to-purple-600 dark:shadow-violet-500/30 dark:text-white
      "
    >
      {/* Shimmer animation */}
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Hover glow */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/25 blur-sm dark:bg-white/10" />
      
      <span className="relative z-10">✨ Start a project</span>
      
      <FaArrowRight
        size={12}
        className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}