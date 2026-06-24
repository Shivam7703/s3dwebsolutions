'use client'


import Header from '@/component/header'
import { ThemeProvider } from 'next-themes'
import React from 'react'
import GalaxyBackground from '@/component/background'  // adjust path as needed
import Footer from '@/component/footer'
import AIChatbot from '@/component/global/chatboox'
import PageLoader from '@/component/loader'

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      {/* Fixed galaxy/helix background */}
      <PageLoader />
      {/* <GalaxyBackground /> */}

      {/* Body wrapper — transparent so Three.js shows through */}
      <div
        className="
          min-h-screen
          bg-transparent
          dark:text-white text-gray-900
          transition-colors duration-500
        "
      >
        <Header />
        {children}

              <AIChatbot/>
        <Footer/>
      </div>
    </ThemeProvider>
  )
}

export default Provider