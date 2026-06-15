"use client";
import React from "react";

interface BannerProps {
  title: string;
  subtitle: string;
}

export default function Banner({ title, subtitle }: BannerProps) {

  return (
    <section className="relative w-full h-screen flex items-center  justify-center overflow-hidden transition-colors duration-500">

      {/* <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" /> */}
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-7xl font-bold text-black dark:text-white mb-4">
          {title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-3xl max-sm:text-sm mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  );
}