"use client";

interface LogoProps {
  isDark: boolean;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { mark: 80, s3d: 26, wm: 21, divH: 48, divMx: 10, },
  md: { mark: 110, s3d: 36, wm: 28, divH: 64, divMx: 13,  },
  lg: { mark: 150, s3d: 50, wm: 40, divH: 90, divMx: 16,  },
};

export default function Logo({ isDark, size = "sm" }: LogoProps) {
  const s = sizes[size];

  return (
    <>
     

      <div className="flex items-center group">
        {/* Orbit mark */}
        <div
          className="relative flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-105"
          style={{ width: s.mark, height: s.mark }}
        >
          {/* Glow effect - changes based on theme */}
          <div
            className="absolute s3d-glow rounded-full blur-xl"
            style={{
              width: s.mark * 0.6,
              height: s.mark * 0.6,
              background: isDark 
                ? "radial-gradient(circle, rgba(139,111,255,0.2) 0%, rgba(139,111,255,0) 80%)"
                : "radial-gradient(circle, rgba(124,92,252,0.15) 0%, rgba(124,92,252,0) 90%)",
            }}
          />

          {/* Orbit 1 */}
          <div className="absolute s3d-o1" style={{ width: s.mark, height: s.mark }}>
            <svg width={s.mark} height={s.mark} viewBox={`0 0 ${s.mark} ${s.mark}`} className="overflow-visible absolute inset-0">
              <ellipse
                cx={s.mark / 2}
                cy={s.mark / 2}
                rx={s.mark / 2 - 2}
                ry={s.mark / 2 - 2}
                fill="none"
                stroke={isDark ? "#C4B5FF" : "#B09BFF"}
                strokeWidth="1"
                opacity="1"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* Orbit 2 */}
          <div className="absolute s3d-o2" style={{ width: s.mark, height: s.mark }}>
            <svg width={s.mark} height={s.mark} viewBox={`0 0 ${s.mark} ${s.mark}`} className="overflow-visible absolute inset-0">
              <ellipse
                cx={s.mark / 2}
                cy={s.mark / 2}
                rx={s.mark / 2 - 2}
                ry={s.mark / 2 - 2}
                fill="none"
                stroke={isDark ? "#C4B5FF" : "#B09BFF"}
                strokeWidth="1"
                opacity="1"
              />
            </svg>
           
          </div>

          {/* Orbit 3 */}
          <div className="absolute s3d-o3" style={{ width: s.mark, height: s.mark }}>
            <svg width={s.mark} height={s.mark} viewBox={`0 0 ${s.mark} ${s.mark}`} className="overflow-visible absolute inset-0">
              <ellipse
                cx={s.mark / 2}
                cy={s.mark / 2}
                rx={s.mark / 2 - 2}
                ry={s.mark / 2 - 2}
                fill="none"
                stroke={isDark ? "#C4B5FF" : "#B09BFF"}
                strokeWidth="1.5"
                opacity="1"
              />
            </svg>
            
          </div>

          {/* S3D text with white + subtle purple gradient */}
          <span
            className={`absolute font-black z-10 select-none float-animation p-0.5  ${
              isDark 
                ? "bg-white" 
                : "bg-orange-500"
            } bg-clip-text text-transparent`}
            style={{
              fontSize: s.s3d,
              fontFamily: "Georgia, serif",
              letterSpacing: "-2px",
              lineHeight: 1,
              filter: isDark ? "drop-shadow(0 0 12px rgba(139,111,255,0.3))" : "none",
            }}
          >
            S3D
          </span>
        </div>

        {/* Divider with purple gradient */}
        <div
          className="w-px bg-linear-to-b from-transparent via-purple-500 to-transparent"
          style={{ height: s.divH, marginLeft: s.divMx, marginRight: s.divMx }}
        />

        {/* Wordmark with purple/violet gradient for SOLUTIONS */}
        <div className="flex flex-col justify-center shrink-0">
          <span
            className={`font-bold uppercase tracking-tight transition-all duration-300 ${
              isDark ? "text-white/90 " : "text-zinc-900 group-hover:text-gray-900"
            }`}
            style={{
              fontFamily: "var(--font-sans), sans-serif",
              fontSize: s.wm,
              letterSpacing: "-1px",
              lineHeight: 1.05,
            }}
          >
            WEB
          </span>
         <span
  className="font-bold uppercase bg-linear-to-r from-violet-800 via-blue-500 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-all duration-300"
  style={{
    fontFamily: "var(--font-sans), sans-serif",
    fontSize: s.wm,
    letterSpacing: "-1px",
    lineHeight: 1.05,
    backgroundSize: '200% auto',
    animation: 'gradientShift 3s ease infinite',
  }}
>
  SOLUTIONS
</span>
        </div>
      </div>
    </>
  );
}