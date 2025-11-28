'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const portfolioItems = [
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Elegant Wedding', category: 'Wedding' },
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Corporate Gala', category: 'Corporate' },
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Garden Celebration', category: 'Celebration' },
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Luxury Reception', category: 'Reception' },
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Intimate Gathering', category: 'Private' },
  { image: 'https://dummyimage.com/600x800/000000/FFF', title: 'Anniversary Party', category: 'Celebration' },
]

export default function Portfolio() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="portfolio" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-4">
            Our Portfolio
          </h2>
          <p className="text-lg text-coffee-brown/70 max-w-2xl mx-auto">
            A glimpse into the unforgettable events we've created
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.title} - The Es-Perience portfolio showcase`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/95 via-coffee-brown/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-cream">
                  <span className="text-sm font-medium text-cream/80 mb-2 block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-2xl lg:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

