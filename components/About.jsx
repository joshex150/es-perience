'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contentBlocks = [
  {
    id: 'about-planner',
    heading: 'About the Planner',
    image: 'https://dummyimage.com/600x800/800020/FFF8E7&text=About+Us',
    content: [
      'With over a decade of experience in luxury event planning, we specialize in creating extraordinary moments that leave lasting impressions. Our team of dedicated professionals brings creativity, attention to detail, and unparalleled service to every event we plan.',
      'From intimate weddings to grand corporate galas, we transform visions into reality, ensuring every detail is meticulously crafted and every moment is perfectly orchestrated.',
    ],
  },
  {
    id: 'philosophy',
    heading: 'Our Philosophy',
    image: 'https://dummyimage.com/600x800/4B2E2A/FFF8E7&text=Philosophy',
    content: [
      'We believe that every event tells a story, and our role is to bring that narrative to life with elegance and precision. Our approach combines timeless sophistication with modern innovation, creating experiences that resonate deeply with our clients and their guests.',
      'Excellence is not a destination but a journey. We continuously refine our craft, staying ahead of trends while honoring the classic principles of luxury event design.',
    ],
  },
  {
    id: 'signature-style',
    heading: 'Signature Style',
    image: 'https://dummyimage.com/600x800/800020/FFF8E7&text=Style',
    content: [
      'Our signature style is defined by an unwavering commitment to perfection and an intuitive understanding of what makes moments truly unforgettable. We blend artistic vision with meticulous execution, creating seamless experiences that feel effortless yet extraordinary.',
      'Every detail matters—from the grandest gesture to the smallest touch. This philosophy has earned us recognition as leaders in luxury event planning, trusted by discerning clients who demand nothing but the best.',
    ],
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const imageContainerRef = useRef(null)
  const textContainerRef = useRef(null)
  const imageRefs = useRef([])
  const textBlockRefs = useRef([])
  const [activeBlock, setActiveBlock] = useState(0)
  const progressBarRef = useRef(null)
  const previousBlockRef = useRef(0)

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const imageContainer = imageContainerRef.current
    const textContainer = textContainerRef.current
    const images = imageRefs.current.filter((img) => img !== null)
    const textBlocks = textBlockRefs.current.filter((block) => block !== null)

    if (!section || !imageContainer || !textContainer || images.length === 0 || textBlocks.length === 0) return

    // Check if mobile (no GSAP on mobile)
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // Mobile: Ensure first image is visible using CSS only
      // Wait a bit for DOM to be ready
      setTimeout(() => {
        if (images[0]) {
          const imgElement = images[0]
          imgElement.style.cssText = 'opacity: 1 !important; display: block !important; position: relative !important; visibility: visible !important; z-index: 10 !important;'
          
          // Also ensure the parent container is visible
          if (imageContainer) {
            imageContainer.style.cssText = 'display: block !important; visibility: visible !important;'
          }
        }
        
        // Hide other images on mobile
        for (let i = 1; i < images.length; i++) {
          if (images[i]) {
            images[i].style.cssText = 'opacity: 0 !important; display: none !important; visibility: hidden !important;'
          }
        }
      }, 100)
    } else {
      // Desktop: Set initial states for GSAP
      // Hide all images except first one
      for (let i = 1; i < images.length; i++) {
        if (images[i]) {
          gsap.set(images[i], {
            opacity: 0,
            scale: 1.1,
            filter: 'blur(10px)',
            immediateRender: true,
          })
        }
      }

      // Hide all text blocks except first one
      for (let i = 1; i < textBlocks.length; i++) {
        if (textBlocks[i]) {
          gsap.set(textBlocks[i], {
            opacity: 0,
            y: 40,
            filter: 'blur(8px)',
            immediateRender: true,
          })
        }
      }

      // Show first image and text block on desktop immediately
      if (images[0] && textBlocks[0]) {
        gsap.set([images[0], textBlocks[0]], {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: 'blur(0px)',
          immediateRender: true,
        })
      }

      // Animate each block with equal scroll distance
      const totalBlocks = contentBlocks.length

      // Create main timeline with ScrollTrigger (desktop only)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=500vh', // Increased scroll distance for slower transitions
          scrub: 1.5, // Smoother scrubbing - reduced for less lag
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          onUpdate: (self) => {
            // Update active block based on scroll progress
            const progress = self.progress
            const totalBlockProgress = progress * totalBlocks
            const currentBlock = Math.min(Math.floor(totalBlockProgress), totalBlocks - 1)
            
            // Calculate progress within the current block (0-1)
            const progressInBlock = (totalBlockProgress - currentBlock) % 1
            const normalizedBlockProgress = progressInBlock < 0 ? 0 : progressInBlock
            
            // Only update state if block changed to prevent excessive re-renders
            if (previousBlockRef.current !== currentBlock) {
              previousBlockRef.current = currentBlock
              setActiveBlock(currentBlock)
            }
            
            // Update block progress if it changed significantly (throttle updates)
            if (Math.abs(previousProgressRef.current - normalizedBlockProgress) > 0.01) {
              previousProgressRef.current = normalizedBlockProgress
              setBlockProgress(normalizedBlockProgress)
            }
            
            // Update progress bar directly with smooth animation
            if (progressBarRef.current) {
              const progressPercent = Math.min(progress * 100, 100)
              progressBarRef.current.style.width = `${progressPercent}%`
            }
          },
        },
      })
      const scrollPerBlock = 1 / totalBlocks // Each block gets equal scroll distance

      contentBlocks.forEach((block, index) => {
        // Calculate progress points for equal distribution
        const blockStart = index * scrollPerBlock
        const blockEnd = (index + 1) * scrollPerBlock
        const transitionStart = blockStart + scrollPerBlock * 0.75 // Start transition at 75% through block
        const transitionDuration = scrollPerBlock * 0.25 // Transition takes 25% of block time

        if (index === 0) {
          // First block: ensure it's visible from the start
          // Set first image and text block to be visible immediately
          if (images[0] && textBlocks[0]) {
            gsap.set([textBlocks[0], images[0]], {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              immediateRender: true,
            })
          }

          // Ensure all other blocks are completely hidden (set before timeline)
          for (let i = 1; i < totalBlocks; i++) {
            if (textBlocks[i] && images[i]) {
              gsap.set([textBlocks[i], images[i]], {
                opacity: 0,
                y: 20,
                scale: 1.02,
                filter: 'blur(6px)',
                immediateRender: true,
              })
            }
          }
        }

        if (index > 0) {
          const prevIndex = index - 1
          const prevBlockStart = prevIndex * scrollPerBlock
          const prevTransitionStart = prevBlockStart + scrollPerBlock * 0.75

          // Smooth fade out previous content - no abrupt stops
          tl.to(
            [textBlocks[prevIndex], images[prevIndex]],
            {
              opacity: 0,
              y: -20,
              scale: 0.99,
              filter: 'blur(6px)',
              duration: transitionDuration * 0.6,
              ease: 'sine.inOut',
            },
            prevTransitionStart
          )

          // Smooth fade in current content - overlapping slightly for seamless transition
          tl.fromTo(
            [textBlocks[index], images[index]],
            {
              opacity: 0,
              y: 15,
              scale: 1.02,
              filter: 'blur(4px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: transitionDuration * 0.8,
              ease: 'sine.out',
            },
            prevTransitionStart + transitionDuration * 0.1
          )

          // Keep current content stable - use to() instead of set() for smoother hold
          tl.to(
            [textBlocks[index], images[index]],
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: transitionDuration * 0.1,
              ease: 'none',
            },
            prevTransitionStart + transitionDuration * 0.9
          )

          // Ensure next block stays hidden smoothly
          if (index < totalBlocks - 1) {
            tl.to(
              [textBlocks[index + 1], images[index + 1]],
              {
                opacity: 0,
                y: 15,
                scale: 1.02,
                filter: 'blur(4px)',
                duration: 0.01,
                ease: 'none',
              },
              prevTransitionStart + transitionDuration
            )
          }
        }
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-6 sm:py-16 px-4 sm:px-6 lg:px-8 bg-cream relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto lg:h-screen lg:max-h-[100vh] lg:flex lg:items-center py-8 lg:py-0 relative">
        {/* Progress Indicator - Desktop Only, Static Position */}
        <div className="hidden lg:flex absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
          <div className="flex items-center space-x-3 bg-cream/95 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-burgundy/20">
            {/* Progress Dots */}
            <div className="flex items-center space-x-2">
              {contentBlocks.map((block, index) => {
                const isActive = activeBlock === index
                const isNext = activeBlock === index - 1 && blockProgress > 0.5
                const dotWidth = isActive 
                  ? 8 + (blockProgress * 24) // Expand from 8px to 32px based on progress
                  : isNext 
                    ? 2 + (blockProgress * 6) // Slightly expand next dot
                    : 2
                
                return (
                  <div
                    key={block.id}
                    className={`relative transition-all duration-100 ${
                      isActive
                        ? 'bg-burgundy'
                        : 'bg-coffee-brown/30'
                    } h-2 rounded-full`}
                    style={{ width: `${dotWidth * 4}px` }}
                    aria-label={block.heading}
                  >
                    <span className="sr-only">{block.heading}</span>
                  </div>
                )
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="hidden xl:block w-32 h-1 bg-coffee-brown/20 rounded-full overflow-hidden ml-4">
              <div
                ref={progressBarRef}
                className="h-full bg-burgundy rounded-full transition-all duration-300"
                style={{ width: '0%' }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start lg:items-center w-full overflow-hidden">
          {/* Left Side - Swappable Images */}
          <div
            ref={imageContainerRef}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-2 lg:order-1 lg:flex-shrink-0 w-full"
          >
            {contentBlocks.map((block, index) => (
              <div
                key={`image-${block.id}`}
                ref={(el) => {
                  if (el) imageRefs.current[index] = el
                }}
                className={`${
                  index === 0 
                    ? 'opacity-100 block relative z-10 w-full h-full lg:opacity-100' 
                    : 'opacity-0 hidden lg:opacity-0'
                } lg:absolute lg:inset-0 lg:block lg:z-0`}
                style={index === 0 ? {
                  width: '100%',
                  height: '100%',
                  minHeight: '400px',
                } : undefined}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl" style={{ width: '100%', height: '100%', minHeight: 'inherit' }}>
                  <Image
                    src={block.image}
                    alt={`${block.heading} - The Es-Perience`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    priority={index === 0}
                    unoptimized={false}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Scroll-Driven Text Content */}
          <div
            ref={textContainerRef}
            className="relative lg:h-full lg:min-h-[400px] lg:flex lg:items-center order-1 lg:order-2 lg:flex-shrink-0 overflow-hidden"
          >
            {/* Mobile: Stack all text blocks normally */}
            <div className="lg:hidden space-y-12">
              {contentBlocks.map((block, index) => (
                <div key={block.id} className="w-full">
                  <h2 className="text-3xl sm:text-4xl text-coffee-brown mb-6 relative">
                    {block.heading}
                    <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-burgundy mt-4"></span>
                  </h2>
                  <div className="space-y-4">
                    {block.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-lg text-coffee-brown/80 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: Scroll-driven text blocks */}
            {contentBlocks.map((block, index) => (
              <div
                key={block.id}
                ref={(el) => {
                  if (el) textBlockRefs.current[index] = el
                }}
                className="hidden lg:flex absolute top-0 left-0 right-0 bottom-0 items-center opacity-0 w-full"
              >
                <div className="w-full">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl text-coffee-brown mb-6 relative">
                    {block.heading}
                    <span className="absolute bottom-0 left-0 w-24 h-0.5 bg-burgundy mt-4"></span>
                  </h2>
                  <div className="space-y-4">
                    {block.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className="text-lg text-coffee-brown/80 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
