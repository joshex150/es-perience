'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

export default function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your inquiry! We will contact you soon.')
  }

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-4">
            Get In Touch
          </h2>
          <p className="text-lg text-coffee-brown/70">
            Let's start planning your unforgettable event
          </p>
        </motion.div>

        <motion.form
          ref={ref}
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          name="contact"
          method="POST"
          data-netlify="true"
          aria-label="Contact form for event planning inquiries"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-coffee-brown font-semibold mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown placeholder:text-gray-400 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300"
                placeholder="Your name"
                autoComplete="name"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-coffee-brown font-semibold mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown placeholder:text-gray-400 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300"
                placeholder="your.email@example.com"
                autoComplete="email"
                aria-required="true"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-coffee-brown font-semibold mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown placeholder:text-gray-400 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300"
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
            </div>

            <div>
              <label htmlFor="eventType" className="block text-coffee-brown font-semibold mb-2">
                Event Type *
              </label>
              <select
                id="eventType"
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300"
              >
                <option value="" className="text-gray-400">Select event type</option>
                <option value="wedding">Wedding</option>
                <option value="corporate">Corporate Event</option>
                <option value="celebration">Private Celebration</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="eventDate" className="block text-coffee-brown font-semibold mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-coffee-brown font-semibold mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 border-burgundy/20 bg-cream text-coffee-brown placeholder:text-gray-400 focus:outline-none focus:border-burgundy focus:ring-2 focus:ring-burgundy/20 transition-all duration-300 resize-none"
              placeholder="Tell us about your event vision..."
            ></textarea>
          </div>

          <motion.button
            type="submit"
            className="w-full px-8 py-4 bg-burgundy text-cream rounded-full font-semibold text-lg hover:bg-burgundy/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

