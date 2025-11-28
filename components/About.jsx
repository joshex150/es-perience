'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contentBlocks = [
  {
    id: 'about-planner',
    heading: 'About the Planner',
    image: 'https://dummyimage.com/600x800/800020/FFF8E7',
    content: [
      'With over a decade of experience in luxury event planning, we specialize in creating extraordinary moments that leave lasting impressions. Our team of dedicated professionals brings creativity, attention to detail, and unparalleled service to every event we plan.',
      'From intimate weddings to grand corporate galas, we transform visions into reality, ensuring every detail is meticulously crafted and every moment is perfectly orchestrated.',
    ],
  },
  {
    id: 'philosophy',
    heading: 'Our Philosophy',
    image: 'https://dummyimage.com/600x800/4B2E2A/FFF8E7',
    content: [
      'We believe that every event tells a story, and our role is to bring that narrative to life with elegance and precision. Our approach combines timeless sophistication with modern innovation, creating experiences that resonate deeply with our clients and their guests.',
      'Excellence is not a destination but a journey. We continuously refine our craft, staying ahead of trends while honoring the classic principles of luxury event design.',
    ],
  },
  {
    id: 'signature-style',
    heading: 'Signature Style',
    image: 'https://dummyimage.com/600x800/4B3C2B/FFF8E7',
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
  const [blockProgress, setBlockProgress] = useState(0) // Progress within current block (0-1)
  const progressBarRef = useRef(null)
  const previousBlockRef = useRef(0) // To optimize setActiveBlock updates
  const previousProgressRef = useRef(0) // To optimize blockProgress updates
  const scrollTriggerInstanceRef = useRef(null) // Reference to ScrollTrigger instance

  useEffect(() => {
    // Ensure we're at the top before initializing GSAP to prevent scroll issues
    if (window.scrollY > 0) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }

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
      // Each block gets exactly equal scroll distance: 500vh / 3 = ~166.67vh per block
      const totalScrollDistance = 500 // Total scroll distance in vh
      const scrollPerBlock = totalScrollDistance / totalBlocks // Equal distance per block
      
      const scrollTriggerConfig = {
        trigger: section,
        start: 'top top',
        end: `+=${totalScrollDistance}vh`, // Total scroll distance
        scrub: 1.5, // Smoother scrubbing
        pin: true,
        anticipatePin: 1,
        pinSpacing: true,
        snap: {
          snapTo: 1 / totalBlocks, // Snap to each block (0, 0.333, 0.666, 1.0)
          duration: { min: 0.2, max: 0.6 },
          delay: 0,
          ease: 'power1.inOut',
        },
        onUpdate: (self) => {
            // Update active block based on scroll progress
            const progress = Math.min(Math.max(self.progress, 0), 1) // Clamp between 0 and 1
            
            // Calculate which block should be active
            // Each block gets exactly 1/totalBlocks of the scroll distance
            const blockSize = 1 / totalBlocks
            const transitionDuration = blockSize * 0.2 // Match the transition duration used in timeline
            
            // Determine active block based on transition boundaries
            // Transitions start at blockStart - transitionDuration
            let currentBlock = 0
            
            for (let i = 0; i < totalBlocks; i++) {
              const blockStart = i * blockSize
              const transitionStart = blockStart - transitionDuration
              
              // For the first block, check if we're before the first transition
              if (i === 0) {
                const firstTransitionStart = blockSize - transitionDuration
                if (progress < firstTransitionStart) {
                  currentBlock = 0
                  break
                }
              }
              
              // For other blocks, check if we're past the transition start
              if (progress >= transitionStart) {
                currentBlock = i
              }
            }
            
            // Clamp to valid range
            currentBlock = Math.min(Math.max(currentBlock, 0), totalBlocks - 1)
            
            // Calculate progress within the current block (0-1)
            const blockStart = currentBlock * blockSize
            const blockEnd = (currentBlock + 1) * blockSize
            const progressInBlock = (progress - blockStart) / (blockEnd - blockStart)
            const normalizedBlockProgress = Math.min(Math.max(progressInBlock, 0), 1)
            
            // Update active block if changed
            if (previousBlockRef.current !== currentBlock) {
              previousBlockRef.current = currentBlock
              setActiveBlock(currentBlock)
            }
            
            // Update block progress (use requestAnimationFrame for smoother updates)
            if (Math.abs(previousProgressRef.current - normalizedBlockProgress) > 0.005) {
              previousProgressRef.current = normalizedBlockProgress
              requestAnimationFrame(() => {
                setBlockProgress(normalizedBlockProgress)
              })
            }
            
            // Update progress bar directly with smooth animation
            if (progressBarRef.current) {
              const progressPercent = Math.min(progress * 100, 100)
              progressBarRef.current.style.width = `${progressPercent}%`
            }
          },
        }
      
      const tl = gsap.timeline({
        scrollTrigger: scrollTriggerConfig,
      })
      
      // Store ScrollTrigger instance for dot click navigation
      const scrollTriggerInstance = ScrollTrigger.getById(tl.scrollTrigger?.vars?.id || ScrollTrigger.getAll().find(st => st.vars.trigger === section)?.vars?.id)
      if (!scrollTriggerInstance) {
        // Get the ScrollTrigger instance from the timeline
        const allTriggers = ScrollTrigger.getAll()
        const sectionTrigger = allTriggers.find(st => st.vars.trigger === section)
        if (sectionTrigger) {
          scrollTriggerInstanceRef.current = sectionTrigger
        }
      } else {
        scrollTriggerInstanceRef.current = scrollTriggerInstance
      }
      
      // Alternative: Get ScrollTrigger from timeline after it's created
      setTimeout(() => {
        const timelineScrollTrigger = tl.scrollTrigger
        if (timelineScrollTrigger) {
          scrollTriggerInstanceRef.current = timelineScrollTrigger
        }
      }, 100)
      // Each block gets exactly equal scroll distance (normalized 0-1)
      const scrollPerBlockNormalized = 1 / totalBlocks
      const transitionDuration = scrollPerBlockNormalized * 0.2 // Transition takes 20% of block time

      // Initialize all blocks with proper states
      contentBlocks.forEach((block, index) => {
        if (index === 0) {
          // First block: visible from start
          if (images[0] && textBlocks[0]) {
            gsap.set([textBlocks[0], images[0]], {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: 'blur(0px)',
              immediateRender: true,
            })
          }
        } else {
          // All other blocks: hidden initially
          if (textBlocks[index] && images[index]) {
            gsap.set([textBlocks[index], images[index]], {
              opacity: 0,
              y: 20,
              scale: 1.02,
              filter: 'blur(6px)',
              immediateRender: true,
            })
          }
        }
      })

      // Create transitions for each block boundary
      contentBlocks.forEach((block, index) => {
        if (index === 0) return // Skip first block (no previous block)

        const prevIndex = index - 1
        const blockStart = index * scrollPerBlockNormalized
        const transitionStart = blockStart - transitionDuration // Start transition slightly before block boundary

        // Fade out previous block
        tl.to(
          [textBlocks[prevIndex], images[prevIndex]],
          {
            opacity: 0,
            y: -20,
            scale: 0.99,
            filter: 'blur(6px)',
            duration: transitionDuration,
            ease: 'sine.inOut',
          },
          transitionStart
        )

        // Fade in current block simultaneously
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
            duration: transitionDuration,
            ease: 'sine.out',
          },
          transitionStart
        )

        // Keep current block visible for the rest of its duration
        const blockEnd = (index + 1) * scrollPerBlockNormalized
        const holdDuration = blockEnd - transitionStart - transitionDuration
        
        tl.to(
          [textBlocks[index], images[index]],
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: holdDuration,
            ease: 'none',
          },
          transitionStart + transitionDuration
        )
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
            <div className="flex items-center space-x-4">
              {contentBlocks.map((block, index) => {
                const isActive = activeBlock === index
                
                // Calculate dot dimensions: active dot expands, inactive stays circular
                const dotSize = isActive 
                  ? Math.max(8, 8 + (blockProgress * 20)) // Expand from 8px to 28px
                  : 8 // Inactive dots are always 8px (circular)
                
                const handleDotClick = (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  
                  if (!sectionRef.current) return
                  
                  // Calculate target progress (0 to 1)
                  const targetProgress = index / contentBlocks.length
                  
                  // Find the ScrollTrigger instance for this section
                  const allTriggers = ScrollTrigger.getAll()
                  const sectionTrigger = allTriggers.find(st => st.vars.trigger === sectionRef.current)
                  
                  if (sectionTrigger) {
                    // Get the start and end positions of the ScrollTrigger
                    const start = sectionTrigger.start
                    const end = sectionTrigger.end
                    const totalDistance = end - start
                    
                    // Calculate target scroll position
                    const targetScroll = start + (totalDistance * targetProgress)
                    
                    // Scroll to target position using smooth scroll
                    window.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth'
                    })
                  } else {
                    // Fallback: calculate manually
                    const sectionTop = sectionRef.current.offsetTop
                    const totalScrollDistance = 500 // vh
                    const viewportHeight = window.innerHeight
                    const totalScrollPixels = (totalScrollDistance / 100) * viewportHeight
                    const targetScrollInSection = targetProgress * totalScrollPixels
                    const targetScroll = sectionTop + targetScrollInSection
                    
                    window.scrollTo({
                      top: targetScroll,
                      behavior: 'smooth'
                    })
                  }
                }
                
                return (
                  <button
                    key={block.id}
                    onClick={handleDotClick}
                    className={`relative transition-all duration-300 ease-out cursor-pointer hover:scale-110 focus:outline-none focus:ring-2 focus:ring-burgundy/50 rounded-full ${
                      isActive
                        ? 'bg-burgundy'
                        : 'bg-coffee-brown/30 hover:bg-coffee-brown/50'
                    }`}
                    style={{ 
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                      minWidth: '8px',
                      minHeight: '8px',
                      maxWidth: '28px',
                      maxHeight: '28px'
                    }}
                    aria-label={`Go to ${block.heading}`}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    <span className="sr-only">{block.heading}</span>
                  </button>
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
