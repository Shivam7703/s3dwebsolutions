"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo from "./logo";
import {
  FaTwitter, FaLinkedin, FaGithub, FaInstagram,
  FaHeart, FaArrowUp,
} from "react-icons/fa";
import {
  RiMapPinLine, RiPhoneLine, RiMailLine,
} from "react-icons/ri";

/* ─────────────── DATA ─────────────── */
const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Services",   href: "/services" },
  { label: "Projects",   href: "/projects" },
  { label: "Contact Us", href: "/contact" },
];

const services = [
  { label: "UX/UI Design",          href: "/services/design" },
  { label: "Web Development",       href: "/services/websites" },
  { label: "Brand Identity",        href: "/services/branding" },
  { label: "Graphic Design",        href: "/services/graphic-design" },
  { label: "Content Marketing",     href: "/services/content" },
  { label: "Flexible Support",      href: "/services/support" },
];

const socials = [
  { icon: FaTwitter,  href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaGithub,   href: "#", label: "GitHub" },
  { icon: FaInstagram,href: "#", label: "Instagram" },
];

const contact = [
  { icon: RiMailLine,  value: "hello@s3dwebsolutions.com", href: "mailto:hello@s3dwebsolutions.com" },
  { icon: RiPhoneLine, value: "+91 82188 85483",             href: "tel:+918218885483" },
  { icon: RiMapPinLine,value: "Varanasi, U.P., India",       href: "#" },
];

/* ─────────────── MAIN FOOTER ─────────────── */
export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [showScroll, setShowScroll] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle mount state to prevent hydration mismatch for theme-dependent elements
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative w-full overflow-x-clip border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-black/50 backdrop-blur-md">
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8">
        
        {/* Main 4-Column Grid */}
        <div className="flex flex-wrap justify-between gap-y-8 mb-14">
          
          {/* Col 1: Brand Logo & Description */}
          <div className="flex flex-col  gap-5 lg:w-[30%] sm:w-[48%] w-full">
            <Link href="/" aria-label="S3D Web Solutions" className="w-fit">
              {/* FIXED: mounted check add kiya hai taaki correct theme resolve hone ke baad hi render ho */}
              {mounted ? (
                <Logo isDark={resolvedTheme === "dark"} size="md" />
              ) : (
                <div className="h-8 w-24 animate-pulse bg-zinc-200 dark:bg-zinc-800 rounded" /> // Skeleton loading state
              )}
            </Link>
            <p className="text-sm leading-[1.75] text-zinc-700 dark:text-zinc-300 font-light mt-6 max-w-sm">
              We craft blazing-fast websites, apps, and brand identities that convert visitors into loyal customers.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-zinc-300/60 dark:border-zinc-700/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center text-zinc-400 dark:text-zinc-600 hover:border-orange-400/70 dark:hover:border-violet-500/70 hover:text-orange-500 dark:hover:text-violet-500 transition-all duration-200 hover:scale-105"
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:w-[20%] sm:w-[48%] w-full">
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-normal text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div className="lg:w-[20%] sm:w-[48%] w-full">
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm font-normal text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-150">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="lg:w-[20%] sm:w-[48%] w-full">
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Contact</h4>
            <ul className="flex flex-col gap-3">
              {contact.map((c) => (
                <li key={c.value}>
                  <a href={c.href} className="flex items-start gap-2.5 text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150 group">
                    <c.icon className="mt-[3px] shrink-0 text-orange-500 dark:text-violet-400 group-hover:scale-105 transition-transform" size={14} />
                    <span className="break-all">{c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Horizontal Divider Line */}
        <div className="h-px w-full bg-zinc-200/60 dark:bg-zinc-800/50 mb-6" />

        {/* Bottom Bar Footer Details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-zinc-300 dark:text-zinc-700 flex items-center gap-1.5 text-center sm:text-left">
            © {new Date().getFullYear()} S3D Web Solutions. Made with
            <FaHeart size={10} className="text-red-400 dark:text-red-500 animate-pulse" />
            in Varanasi.
          </p>

          {/* Privacy, Terms & Native Back to Top */}
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[12px] text-zinc-300 dark:text-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <span className="text-zinc-300 dark:text-zinc-800">·</span>
            <Link href="/terms" className="text-[12px] text-zinc-300 dark:text-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</Link>
            <span className="text-zinc-300 dark:text-zinc-800">·</span>
            
            {/* Native Scroll Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-violet-400 hover:border-orange-400/50 dark:hover:border-violet-500/50 transition-all duration-200 cursor-pointer ${
                showScroll ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <FaArrowUp size={11} />
            </button>
          </div>
        </div>

      </div>

      <div className="sm:h-10 h-20 w-full" />
    </footer>
  );
}