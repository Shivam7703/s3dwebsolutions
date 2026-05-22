import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

/* Main Wrapper */
function Buttonmain({
  href,
  text,
  dark,
  variant = "primary",
}: {
  href: string;
  text: string;
  dark: boolean;
  variant?: "primary" | "secondary";
}) {
  if (variant === "secondary") {
    return <ButtonSecondary href={href} text11={text} isDarks={dark} />;
  }

  const isTel =
    href.startsWith("tel:") ||
    href.startsWith("https") ||
    href.startsWith("mailto:") ||
    href.startsWith("www");

  if (isTel) {
    return (
      <a href={href} className="w-max inline-block group/btn">
        <Button text11={text} isDarks={dark} />
      </a>
    );
  }

  return (
    <Link href={href} className="w-max inline-block group/btn">
      <Button text11={text} isDarks={dark} />
    </Link>
  );
}

export default Buttonmain;

/* Primary Button UI */
function Button({ isDarks, text11 }: { isDarks: boolean; text11: string }) {
  return (
    <span
      className={`
        inline-flex items-center gap-2.5 px-7 py-4 rounded-xl
        text-sm font-semibold bg-linear-to-r tracking-wide transition-all duration-300 group
        relative overflow-hidden
        ${isDarks
          ? "from-violet-600 via-blue-600 to-purple-600 shadow-violet-500/30 text-white"
          : "hover:from-zinc-800 hover:to-zinc-900 from-orange-500 to-red-500 shadow-zinc-200/30 text-zinc-100"
        }
        shadow-sm hover:shadow-lg
      `}
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

/* Secondary Outlined Button UI */
function ButtonSecondary({
  isDarks,
  text11,
  href,
}: {
  isDarks: boolean;
  text11: string;
  href: string;
}) {
  const classes = `
    inline-flex items-center gap-2.5 px-7 py-4 rounded-xl
    text-sm font-semibold tracking-wide transition-all duration-300 group
    relative overflow-hidden border-2 backdrop-blur-sm  
    ${isDarks
      ? "border-zinc-50 text-zinc-50 hover:text-white"
      : "border-zinc-800 text-zinc-800 hover:text-white"
    }
    shadow-sm hover:shadow-lg 
  `;

  const inner = (
    <>
      {/* Fill on hover */}
      <span
        className={`
          absolute inset-0 translate-y-full group-hover:translate-y-0
          transition-transform duration-300 ease-in-out
          ${isDarks
            ? "bg-white"
            : "bg-zinc-800"
          }
        `}
      />

      {/* Shimmer */}
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/20 to-transparent" />

      <span className="relative z-10">{text11}</span>

      <FaArrowRight
        size={12}
        className="relative z-10 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
      />
    </>
  );

  const isExternal =
    href.startsWith("tel:") ||
    href.startsWith("https") ||
    href.startsWith("mailto:") ||
    href.startsWith("www");

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