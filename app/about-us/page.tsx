import Mission from '@/component/about/mission'
import TestimonialSection from '@/component/about/testimonial'
import Banner from '@/component/global/banner'
import AboutSection from '@/component/home/about'
import TeamSection from '@/component/home/team'
import React from 'react'

function page() {
   
  return (
    <main>
                 <Banner title="About Us" subtitle="Learn more about our mission, vision, and values. lorem ipsum dolor sit amet. Learn more about our mission, vision, and values. lorem ipsum dolor sit amet." />
                 <Mission/>
                 <div className="h-[20vh]"/>
                 <AboutSection />
                 <div className="h-[20vh]"/>
                 <TeamSection/>
                 <div className="h-[20vh]"/>
                 <TestimonialSection/>
    </main>
  )
}

export default page
