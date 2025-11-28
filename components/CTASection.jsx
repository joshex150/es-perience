'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-burgundy">
      <motion.div
        ref={ref}
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-cream mb-6">
          Let's Plan Your Dream Event
        </h2>
        <p className="text-xl sm:text-2xl text-cream/90 mb-10 font-light">
          Experience the difference with The Es-Perience
        </p>
        <motion.a
          href="#contact"
          className="inline-block px-10 py-5 bg-cream text-burgundy rounded-full font-semibold text-lg hover:bg-cream/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Schedule a Consultation
        </motion.a>
      </motion.div>
    </section>
  )
}

