// app/page.tsx
import AboutSection from "@/component/home/about";
import HeroBanner from "@/component/home/homebanner";
import ProcessSection from "@/component/home/process";

// Page component receives isDark as parameter
export default function Home() {
  return (
    <main className="h-[1800vh] ">
      {/* Hero */}
 <HeroBanner />
      {/* transition gap — galaxy morphs during this space */}
      <AboutSection />
 <ProcessSection/>
      {/* About */}
 
      {/* more sections below */}
    </main>
  );
}