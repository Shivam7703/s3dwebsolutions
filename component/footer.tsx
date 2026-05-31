"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import Logo from "./logo";
import {
  FaHome, FaUser, FaServicestack, FaFolderOpen, FaEnvelope,
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

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer className="relative w-full overflow-x-clip border-t border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/10 dark:bg-black/20 backdrop-blur-md">
      

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-16 pb-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          
          {/* Col 1: Brand Logo & Description */}
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" aria-label="S3D Web Solutions" className="w-fit">
<Logo isDark={resolvedTheme === "dark"} size="sm" />
            </Link>
            <p className="text-[13px] leading-[1.75] text-zinc-500 dark:text-zinc-400 font-light max-w-[240px]">
              We craft blazing-fast websites, apps, and brand identities that convert visitors into loyal customers.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center text-zinc-400 dark:text-zinc-500 hover:border-orange-400/60 dark:hover:border-violet-500/50 hover:text-orange-500 dark:hover:text-violet-400 transition-all duration-200 hover:scale-105"
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Links */}
          <div>
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-[13px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors duration-150">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div>
            <h4 className="text-[11px] font-extrabold tracking-[0.22em] uppercase mb-5 text-zinc-800 dark:text-zinc-200">Contact</h4>
            <ul className="flex flex-col gap-3">
              {contact.map((c) => (
                <li key={c.value}>
                  <a href={c.href} className="flex items-start gap-2.5 text-[13px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-150 group">
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
          <p className="text-[12px] text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 text-center sm:text-left">
            © {new Date().getFullYear()} S3D Web Solutions. Made with
            <FaHeart size={10} className="text-red-400 dark:text-red-500 animate-pulse" />
            in Varanasi.
          </p>

          {/* Privacy, Terms & Native Back to Top */}
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-[12px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <span className="text-zinc-300 dark:text-zinc-800">·</span>
            <Link href="/terms" className="text-[12px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">Terms</Link>
            <span className="text-zinc-300 dark:text-zinc-800">·</span>
            
            {/* Native Scroll Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className={`flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-violet-400 hover:border-orange-400/50 dark:hover:border-violet-500/50 transition-all duration-200 cursor-pointer ${
                showScroll ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
              }`}
            >
              <FaArrowUp size={11} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}