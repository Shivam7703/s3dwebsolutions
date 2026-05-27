// app/page.tsx
import AboutSection from "@/component/home/about";
import HeroBanner from "@/component/home/homebanner";
import ProcessSection from "@/component/home/process";
import ServicesSection from "@/component/services/ServicesSection";

// Page component receives isDark as parameter
export default function Home() {
  return (
    <main className="">
      {/* Hero */}

     <HeroBanner />

      {/* transition gap — galaxy morphs during this space */}

      <AboutSection />
      <ServicesSection/>
      <ProcessSection/>


      {/* About */}
 
      {/* more sections below */}
    </main>
  );
}