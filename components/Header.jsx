'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Prevent scroll restoration on page load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    // Aggressively force scroll to top on mount - multiple attempts to catch all cases
    const forceScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Force immediately
    forceScrollToTop()

    // Force after a microtask delay
    setTimeout(forceScrollToTop, 0)

    // Force after a short delay
    setTimeout(forceScrollToTop, 10)

    // Force after React hydration
    setTimeout(forceScrollToTop, 100)

    // Set initial section to home
    setActiveSection('home')
    setIsScrolled(false)

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)

      // Update active section based on scroll position
      // Check if we're at the top (home section) - use larger threshold
      if (currentScrollY < 200) {
        setActiveSection('home')
        return
      }

      // Check sections from bottom to top
      const scrollPosition = currentScrollY + 150
      const sections = ['contact', 'portfolio', 'services', 'about', 'home']
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          const sectionBottom = sectionTop + section.offsetHeight
          
          // Check if scroll position is within this section
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    // Only add scroll listener, don't call handleScroll on mount
    // This prevents incorrect section detection on page load
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const targetId = href.substring(1)
    const element = document.getElementById(targetId)
    
    if (element) {
      const headerHeight = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else if (href === '#home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
              <Image
                src="/og-image.png"
                alt="The Es-Perience Logo"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 48px, 56px"
                priority
              />
            </div>
            <span className="text-2xl sm:text-3xl font-cursive text-coffee-brown group-hover:text-burgundy transition-colors duration-300">
              The Es-Perience
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1)
              const isActive = activeSection === sectionId
              
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    isActive
                      ? 'text-burgundy'
                      : 'text-coffee-brown hover:text-burgundy'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-burgundy"
                      layoutId="activeSection"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              )
            })}
            <motion.a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="ml-4 px-6 py-2 bg-burgundy text-cream rounded-full font-semibold text-sm hover:bg-burgundy/90 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-3 rounded-xl text-coffee-brown hover:bg-burgundy/10 active:bg-burgundy/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-burgundy/30"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                initial={false}
                animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 stroke-[2.5]" />
                ) : (
                  <Menu className="w-6 h-6 stroke-[2.5]" />
                )}
              </motion.div>
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu Backdrop */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
              style={{ top: '80px' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.35, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="md:hidden fixed inset-x-0 bottom-0 z-[70] overflow-y-auto"
              style={{ top: '80px' }}
            >
              <div className="h-full bg-gradient-to-b from-cream via-cream to-cream/98 backdrop-blur-2xl">
                {/* Menu Header */}
                <div className="px-6 pt-8 pb-6 border-b border-burgundy/10">
                  <h2 className="text-xl font-cursive text-coffee-brown mb-1">Navigation</h2>
                  <p className="text-sm text-coffee-brown/60">Explore our services</p>
                </div>

                {/* Menu Items */}
                <div className="px-4 py-6 space-y-1">
                  {navLinks.map((link, index) => {
                    const sectionId = link.href.substring(1)
                    const isActive = activeSection === sectionId
                    
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          delay: index * 0.05,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                      >
                        <motion.a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className={`relative flex items-center justify-between px-5 py-4 rounded-2xl font-medium text-base transition-all duration-300 group ${
                            isActive
                              ? 'text-burgundy bg-burgundy/10 shadow-sm'
                              : 'text-coffee-brown hover:text-burgundy hover:bg-burgundy/5 active:bg-burgundy/8'
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">{link.name}</span>
                          {isActive && (
                            <motion.div
                              className="absolute inset-0 bg-burgundy/8 rounded-2xl border border-burgundy/20"
                              layoutId="mobileActiveBg"
                              initial={false}
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            />
                          )}
                          {isActive && (
                            <motion.div
                              className="w-2 h-2 rounded-full bg-burgundy"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.1 }}
                            />
                          )}
                          {!isActive && (
                            <motion.div
                              className="w-1.5 h-1.5 rounded-full bg-coffee-brown/20 group-hover:bg-burgundy/30"
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </motion.a>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="px-6 py-4">
                  <div className="h-px bg-gradient-to-r from-transparent via-burgundy/20 to-transparent" />
                </div>

                {/* CTA Button */}
                <div className="px-4 pb-8 pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: navLinks.length * 0.05 + 0.1,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    <motion.a
                      href="#contact"
                      onClick={(e) => handleLinkClick(e, '#contact')}
                      className="block w-full px-8 py-4 bg-gradient-to-r from-burgundy to-burgundy/90 text-cream rounded-2xl font-semibold text-center shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                      whileTap={{ scale: 0.97 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="relative z-10">Get Started</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-burgundy/90 to-burgundy"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

