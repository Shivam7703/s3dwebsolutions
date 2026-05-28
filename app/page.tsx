// app/page.tsx
import AboutSection from "@/component/home/about";
import HeroBanner from "@/component/home/homebanner";
import ProcessSection from "@/component/home/process";
import DarkRoomProjectsSection from "@/component/home/project";
import ServicesSection from "@/component/services/ServicesSection";

// Page component receives isDark as parameter
export default function Home() {
  return (
    <main className="">
      {/* Hero */}
     <HeroBanner />
<div className="h-[50vh]"/>

      {/* transition gap — galaxy morphs during this space */}

      <AboutSection />
      <div className="h-[50vh]"/>

      <ServicesSection/>
      <div className="h-[50vh]"/>

      <ProcessSection/>
<div className="h-[50vh]"/>

<DarkRoomProjectsSection/>

      {/* About */}
 
      {/* more sections below */}
    </main>
  );
}