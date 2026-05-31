// app/page.tsx
import ContactSection from "@/component/contact/contact-form";
import AboutSection from "@/component/home/about";
import WhyChooseUs from "@/component/home/choose";
import FAQSection from "@/component/home/Faq";
import HeroBanner from "@/component/home/homebanner";
import ProcessSection from "@/component/home/process";
import DarkRoomProjectsSection from "@/component/home/project";
import TeamSection from "@/component/home/team";
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
<div className="h-[50vh]"/>

<FAQSection/>
<div className="h-[50vh]"/>
 <WhyChooseUs/>

<div className="h-[50vh]"/>

<TeamSection/>
<div className="h-[50vh]"/>
      <ContactSection/>
    </main>
  );
}