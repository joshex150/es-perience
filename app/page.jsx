'use client'

import { useEffect } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import WhyChooseUs from '@/components/WhyChooseUs'
import Testimonials from '@/components/Testimonials'
import Pricing from '@/components/Pricing'
import CTASection from '@/components/CTASection'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'

export default function Home() {
  useEffect(() => {
    // Final safety check - ensure we're at the top after component mount
    const forceScrollToTop = () => {
      if (window.scrollY > 0 || document.documentElement.scrollTop > 0 || document.body.scrollTop > 0) {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0
      }
    }

    // Force immediately
    forceScrollToTop()

    // Force after a short delay to catch any late scrolls
    const timeoutId = setTimeout(forceScrollToTop, 50)

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen" role="main">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyChooseUs />
        <Testimonials />
        <Pricing />
        <CTASection />
        <ContactForm />
        <Footer />
      </main>
    </>
  )
}

