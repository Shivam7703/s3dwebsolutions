"use client";

import Buttonmain from "../global/button";

export default function HeroBanner() {

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative z-10">
      
      {/* Main Heading — Direct Tailwind classes for theme */}
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center max-w-5xl leading-tight text-zinc-900 dark:text-white">
        We Build{" "}
        <span className="bg-linear-to-r from-orange-500 to-red-600 dark:from-violet-600 dark:via-indigo-500 dark:to-purple-600 bg-clip-text text-transparent">
          Digital
        </span>{" "}
        Experiences
      </h1>

      {/* Paragraph — Direct Tailwind classes for theme */}
      <p className="mt-6 text-center max-w-2xl text-base font-semibold md:text-lg text-black dark:text-white">
        From concept to code — we craft blazing-fast websites, apps, and brand
        identities that convert visitors into loyal customers.
      </p>

      {/* CTA Buttons */}
      <div className="flex gap-8 mt-6 md:mt-8">
        <Buttonmain href={"/contact"} text={"Get Detail"} variant={"primary"} />
        <Buttonmain href={"tel:+918218885483"} text={"Call Now"} variant={"secondary"}/>
      </div>
    </section>
  );
}