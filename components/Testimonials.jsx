'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import Script from 'next/script'

const testimonials = [
  {
    name: 'Sarah & James Mitchell',
    quote: 'Our wedding was absolutely perfect in every way. The attention to detail and seamless execution exceeded all our expectations. Truly unforgettable!',
    image: 'https://dummyimage.com/200x200/000000/FFF',
    event: 'Wedding',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    quote: 'The corporate gala was a tremendous success. Professional, elegant, and flawlessly organized. Our clients were impressed beyond measure.',
    image: 'https://dummyimage.com/200x200/000000/FFF',
    event: 'Corporate Event',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    quote: 'From concept to celebration, they made our anniversary party magical. Every detail was perfect, and we could actually enjoy our own event!',
    image: 'https://dummyimage.com/200x200/000000/FFF',
    event: 'Anniversary',
    rating: 5,
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const reviewsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: testimonials.map((testimonial, index) => ({
      '@type': 'Review',
      position: index + 1,
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewBody: testimonial.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream" itemScope itemType="https://schema.org/Review">
      <Script
        id="reviews-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-4">
            Client Testimonials
          </h2>
          <p className="text-lg text-coffee-brown/70 max-w-2xl mx-auto">
            Hear from those who've experienced The Es-Perience
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-cream border border-burgundy/20 rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.event} client`}
                    fill
                    className="object-cover"
                    sizes="64px"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className="text-coffee-brown">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-coffee-brown/60">{testimonial.event}</p>
                </div>
              </div>
              <p className="text-coffee-brown/80 italic leading-relaxed">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

