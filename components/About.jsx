'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-6 relative">
              About Us
              <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-burgundy mt-4"></span>
            </h2>
            <p className="text-lg text-coffee-brown/80 mb-6 leading-relaxed">
              With over a decade of experience in luxury event planning, we specialize in creating
              extraordinary moments that leave lasting impressions. Our team of dedicated professionals
              brings creativity, attention to detail, and unparalleled service to every event we plan.
            </p>
            <p className="text-lg text-coffee-brown/80 mb-6 leading-relaxed">
              From intimate weddings to grand corporate galas, we transform visions into reality,
              ensuring every detail is meticulously crafted and every moment is perfectly orchestrated.
            </p>
            <p className="text-lg text-coffee-brown/80 leading-relaxed">
              Our commitment to excellence and passion for creating unforgettable experiences sets us
              apart in the world of luxury event planning.
            </p>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-2xl"
          >
            <Image
              src="https://placehold.co/800x600/000000/FFF"
              alt="Professional event planning team working together to create exceptional events"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

