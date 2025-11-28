'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-cream border-t-2 border-burgundy pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo Section */}
          <div>
            <div className="relative w-40 h-40 mb-4">
              <Image
                src="/og-image.png"
                alt="The Es-Perience - Premium Event Planner Logo"
                fill
                className="object-contain"
                sizes="160px"
                loading="lazy"
              />
            </div>
            <p className="text-coffee-brown/70 text-sm leading-relaxed">
              Creating unforgettable events with luxury and elegance.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="font-serif font-semibold text-coffee-brown mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-coffee-brown/70 hover:text-burgundy transition-colors duration-300" aria-label="Learn more about our event planning services">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-coffee-brown/70 hover:text-burgundy transition-colors duration-300" aria-label="View our event planning services">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-coffee-brown/70 hover:text-burgundy transition-colors duration-300" aria-label="Browse our event portfolio">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-coffee-brown/70 hover:text-burgundy transition-colors duration-300" aria-label="Contact us for event planning">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-coffee-brown mb-4">Contact</h3>
            <ul className="space-y-2 text-coffee-brown/70 text-sm">
              <li>123 Luxury Avenue</li>
              <li>New York, NY 10001</li>
              <li>
                <a href="tel:+1234567890" className="hover:text-burgundy transition-colors duration-300" aria-label="Call us at (123) 456-7890">
                  (123) 456-7890
                </a>
              </li>
              <li>
                <a href="mailto:info@theesperience.com" className="hover:text-burgundy transition-colors duration-300" aria-label="Email us at info@theesperience.com">
                  info@theesperience.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-serif font-semibold text-coffee-brown mb-4">Follow Us</h3>
            <nav aria-label="Social media links">
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/theesperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/20 flex items-center justify-center text-coffee-brown hover:bg-burgundy hover:text-cream hover:border-burgundy transition-all duration-300"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/theesperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/20 flex items-center justify-center text-coffee-brown hover:bg-burgundy hover:text-cream hover:border-burgundy transition-all duration-300"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.twitter.com/theesperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/20 flex items-center justify-center text-coffee-brown hover:bg-burgundy hover:text-cream hover:border-burgundy transition-all duration-300"
                  aria-label="Follow us on Twitter"
                >
                  <Twitter className="w-5 h-5" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/company/theesperience"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border-2 border-burgundy/20 flex items-center justify-center text-coffee-brown hover:bg-burgundy hover:text-cream hover:border-burgundy transition-all duration-300"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </a>
              </div>
            </nav>
          </div>
        </div>

        <div className="border-t border-burgundy/20 pt-8 text-center text-coffee-brown/60 text-sm">
          <p>&copy; {new Date().getFullYear()} The Es-Perience. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

