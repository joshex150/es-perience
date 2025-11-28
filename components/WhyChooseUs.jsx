'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Sparkles, Target, Handshake, Gem, Calendar, Award } from 'lucide-react'

const features = [
  {
    icon: Sparkles,
    title: 'Exquisite Attention to Detail',
    description: 'Every element is meticulously planned and executed to perfection.',
  },
  {
    icon: Target,
    title: 'Personalized Service',
    description: 'Tailored experiences that reflect your unique style and vision.',
  },
  {
    icon: Handshake,
    title: 'Trusted Partnerships',
    description: 'Established relationships with premium vendors and venues.',
  },
  {
    icon: Gem,
    title: 'Luxury Standards',
    description: 'Uncompromising quality in every aspect of event planning.',
  },
  {
    icon: Calendar,
    title: 'Stress-Free Planning',
    description: 'We handle all the details so you can enjoy the moment.',
  },
  {
    icon: Award,
    title: 'Proven Excellence',
    description: 'Award-winning event planning with a track record of success.',
  },
]

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
            Why Choose Us
          </h2>
          <div className="w-24 h-0.5 bg-burgundy mx-auto mt-4"></div>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <IconComponent 
                    className="w-12 h-12 text-burgundy" 
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl text-coffee-brown mb-3">
                  {feature.title}
                </h3>
                <p className="text-coffee-brown/70 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

