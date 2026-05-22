"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import Buttonmain from "../global/button";

export default function HeroBanner() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Theme-based classes
  const themeClasses = {
    textPrimary: isDark ? "text-white" : "text-zinc-800",
    textMuted: isDark ? "text-zinc-100" : "text-zinc-800",
    gradientPrimary: isDark 
      ? "bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600" 
      : "bg-gradient-to-r from-orange-500 to-red-600",
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      {/* Main Heading */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center max-w-5xl leading-tight">
        We Build{" "}
        <span className={`${themeClasses?.gradientPrimary}  bg-clip-text text-transparent`}>
          Digital
        </span>{" "}
        Experiences
      </h1>

      {/* Paragraph */}
      <p className={`mt-6 text-center max-w-2xl text-base font-semibold md:text-lg ${themeClasses.textMuted}`}>
        From concept to code — we craft blazing-fast websites, apps, and brand
        identities that convert visitors into loyal customers.
      </p>

      {/* CTA Button */}
      <div className="flex gap-8 mt-6 md:mt-8">
      <Buttonmain href={"/contact"} text={"Get Detail"} variant={"primary"} dark={isDark}/>
      <Buttonmain href={"tel:+918218885483"} text={"Call Now"} variant={"secondary"} dark={isDark}/>

      </div>
    </section>
  );
}