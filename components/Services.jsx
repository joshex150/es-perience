'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const services = [
  {
    title: 'Wedding Planning',
    description: 'Complete wedding planning services from concept to execution, ensuring your special day is flawless.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
  {
    title: 'Corporate Events',
    description: 'Professional corporate event management for conferences, galas, and company celebrations.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
  {
    title: 'Private Celebrations',
    description: 'Intimate gatherings and milestone celebrations tailored to your unique vision and style.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
  {
    title: 'Venue Selection',
    description: 'Expert guidance in finding the perfect venue that matches your event style and requirements.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
  {
    title: 'Catering Coordination',
    description: 'Curated culinary experiences with top-tier caterers to delight your guests.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
  {
    title: 'Design & Décor',
    description: 'Breathtaking design concepts and flawless décor execution to create stunning atmospheres.',
    image: 'https://placehold.co/600x800/000000/FFF',
  },
]

export default function Services() {
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
        duration: 0.7,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="services" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-4">
            Our Services
          </h2>
          <p className="text-lg text-coffee-brown/70 max-w-2xl mx-auto">
            Comprehensive event planning services tailored to your unique vision
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-[500px] lg:h-[600px] overflow-hidden">
                <Image
                  src={service.image}
                  alt={`${service.title} service - ${service.description}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-brown/95 via-coffee-brown/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-cream transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-3xl lg:text-4xl mb-3">
                    {service.title}
                  </h3>
                  <p className="text-lg leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

