import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

/* Main Wrapper Component */
function Buttonmain({
  href,
  text,
  variant ,
}: {
  href: string;
  text: string;
  dark?: boolean; // Isko optional kar diya taaki purane components crash na hon
  variant?: "primary" | "secondary";
}) {
  if (variant === "secondary") {
    return <ButtonSecondary href={href} text11={text} />;
  }

  const isExternal =
    href.startsWith("tel:") ||
    href.startsWith("https:") ||
    href.startsWith("mailto:") ||
    href.startsWith("www.");

  if (isExternal) {
    return (
      <a href={href} className="w-max inline-block group/btn">
        <Button text11={text} />
      </a>
    );
  }

  return (
    <Link href={href} className="w-max inline-block group/btn">
      <Button text11={text} />
    </Link>
  );
}

export default Buttonmain;

/* ==========================================================================
   Primary Button UI (Pure Tailwind CSS)
   ========================================================================== */
function Button({ text11 }: { text11: string }) {
  return (
    <span
      className="
        inline-flex items-center gap-2.5 px-7 py-4 rounded-xl
        text-sm font-semibold tracking-wide transition-all duration-300 group
        relative overflow-hidden shadow-sm hover:shadow-lg
        
        /* Light Mode Styles */
        from-orange-500 to-red-600 bg-linear-to-r text-zinc-100 hover:from-zinc-800 hover:to-zinc-900 shadow-zinc-200/30
        
        /* Dark Mode Styles */
        dark:from-violet-600 dark:via-blue-600 dark:to-purple-600 dark:text-white dark:shadow-violet-500/30
      "
    >
      {/* Shimmer animation */}
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/30 to-transparent" />

      {/* Hover glow */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/25 blur-sm" />

      <span className="relative z-10">{text11}</span>

      <FaArrowRight
        size={12}
        className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      />
    </span>
  );
}

/* ==========================================================================
   Secondary Outlined Button UI (Pure Tailwind CSS)
   ========================================================================== */
function ButtonSecondary({
  text11,
  href,
}: {
  text11: string;
  href: string;
}) {
  const classes = `
    inline-flex items-center gap-2.5 px-7 py-4 rounded-xl
    text-sm font-semibold tracking-wide transition-all duration-300 group
    relative overflow-hidden border-2 backdrop-blur-sm shadow-sm hover:shadow-lg 
        border-zinc-800 text-zinc-800 hover:text-white
    dark:border-zinc-50 dark:text-zinc-50 dark:hover:text-zinc-900
  `;

  const inner = (
    <>
      {/* Fill on hover */}
      <span
        className="
          absolute inset-0 translate-y-full group-hover:translate-y-0
          transition-transform duration-300 ease-in-out -z-10
          
          bg-zinc-800
          
          dark:bg-white
        "
      />


      <span className="relative z-10">{text11}</span>

      <FaArrowRight
        size={12}
        className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      />
    </>
  );

  const isExternal =
    href.startsWith("tel:") ||
    href.startsWith("https:") ||
    href.startsWith("mailto:") ||
    href.startsWith("www.");

  if (isExternal) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}