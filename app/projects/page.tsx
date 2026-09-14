import Banner from '@/component/global/banner'
import ProcessSection from '@/component/home/process'
import ServicesSection from '@/component/services/ServicesSection'

import React from 'react'

function page() {
   
  return (
    <main>
                 <Banner title="Our Projects" subtitle="Learn more about our mission, vision, and values. lorem ipsum dolor sit amet. Learn more about our mission, vision, and values. lorem ipsum dolor sit amet." />
                 <div className="h-[20vh]"/>
                       <ServicesSection/>
                 <div className="h-[30vh]"/>
      <ProcessSection/>
                
    </main>
  )
}

export default page
