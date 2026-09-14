import ContactSection from '@/component/contact/contact-form'
import Banner from '@/component/global/banner'

import React from 'react'

function page() {
   
  return (
    <main>
                 <Banner title="Contact Us" subtitle="Learn more about our mission, vision, and values. lorem ipsum dolor sit amet. Learn more about our mission, vision, and values. lorem ipsum dolor sit amet." />
                 <div className="h-[20vh]"/>
      <ContactSection/>
                 <div className="h-[30vh]"/>                
    </main>
  )
}

export default page
