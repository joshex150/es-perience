'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const packages = [
  {
    name: 'Classic',
    description: 'Perfect for intimate gatherings and smaller celebrations',
    features: [
      'Event consultation',
      'Venue selection assistance',
      'Basic décor coordination',
      'Day-of coordination',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Premium',
    description: 'Comprehensive planning for memorable events',
    features: [
      'Full event planning',
      'Vendor management',
      'Custom design & décor',
      'Timeline creation',
      'Rehearsal coordination',
      'Day-of management',
    ],
    cta: 'Choose Premium',
    highlighted: true,
  },
  {
    name: 'Luxury',
    description: 'White-glove service for the most extraordinary events',
    features: [
      'Complete concierge service',
      'Premium vendor curation',
      'Exclusive venue access',
      'Custom design & styling',
      'Full production management',
      'Post-event services',
    ],
    cta: 'Go Luxury',
  },
]

export default function Pricing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const highlightedVariants = {
    hidden: { opacity: 0, y: 50, scale: 1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.05,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-4">
            Our Packages
          </h2>
          <p className="text-lg text-coffee-brown/70 max-w-2xl mx-auto">
            Choose the perfect package for your event
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              variants={pkg.highlighted ? highlightedVariants : itemVariants}
              className={`bg-cream border-2 rounded-lg p-8 flex flex-col h-full ${
                pkg.highlighted
                  ? 'border-burgundy shadow-2xl'
                  : 'border-burgundy/20 hover:border-burgundy/40'
              } transition-colors duration-300`}
            >
              <h3 className="text-2xl text-coffee-brown mb-2">
                {pkg.name}
              </h3>
              <p className="text-coffee-brown/70 mb-6">{pkg.description}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-coffee-brown/80">
                    <span className="text-burgundy mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href="#contact"
                className={`block text-center px-6 py-3 rounded-full font-semibold transition-all duration-300 mt-auto ${
                  pkg.highlighted
                    ? 'bg-burgundy text-cream hover:bg-burgundy/90'
                    : 'bg-transparent border-2 border-burgundy text-burgundy hover:bg-burgundy hover:text-cream'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pkg.cta}
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

