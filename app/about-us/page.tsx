import Mission from '@/component/about/mission'
import Process2 from '@/component/about/wrk'
import Banner from '@/component/global/banner'
import AboutSection from '@/component/home/about'
import React from 'react'

function page() {
   
  return (
    <main>
     <Banner title="About Us" subtitle="Learn more about our mission, vision, and values. lorem ipsum dolor sit amet. Learn more about our mission, vision, and values. lorem ipsum dolor sit amet." />

     <Mission/>

                 <div className="h-[20vh]"/>

           <AboutSection />
                 <div className="h-[20vh]"/>
<Process2/>
    </main>
  )
}

export default page
