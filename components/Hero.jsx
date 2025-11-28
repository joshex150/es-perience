'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" role="banner">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="https://placehold.co/1920x1080/800020/FFF8E7"
          alt="Elegant luxury event setting with sophisticated décor and ambient lighting"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-cream/80 backdrop-blur-sm" aria-hidden="true"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-coffee-brown mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We Create Unforgettable Events
        </motion.h1>
        
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-coffee-brown/80 mb-10 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Luxury event planning for weddings, corporate functions, and celebrations.
        </motion.p>

        <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center" aria-label="Main navigation">
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-burgundy text-cream rounded-full font-semibold text-lg hover:bg-burgundy/90 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-burgundy focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Book a consultation for your event"
          >
            Book Consultation
          </motion.a>
          
          <motion.a
            href="#portfolio"
            className="px-8 py-4 bg-transparent border-2 border-coffee-brown text-coffee-brown rounded-full font-semibold text-lg hover:bg-coffee-brown hover:text-cream transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-coffee-brown focus:ring-offset-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="View our event portfolio"
          >
            View Portfolio
          </motion.a>
        </nav>
      </motion.div>

      {/* Parallax Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cream/20 to-cream/40" aria-hidden="true"></div>
      </motion.div>
    </section>
  )
}

