import './globals.css'
import Script from 'next/script'

const siteUrl = 'https://es-perience.vercel.app'
const siteName = 'The Es-Perience'
const siteDescription = 'The Es-Perience - Luxury event planning for weddings, corporate functions, and celebrations. Award-winning event planners creating unforgettable experiences with exquisite attention to detail.'

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Es-Perience | Unforgettable Events',
    template: '%s | The Es-Perience',
  },
  description: siteDescription,
  keywords: [
    'luxury event planning',
    'wedding planning',
    'corporate event planning',
    'event planner',
    'wedding coordinator',
    'luxury weddings',
    'event management',
    'party planning',
    'celebration planning',
    'event design',
    'venue selection',
    'catering coordination',
  ],
  authors: [{ name: 'YEAN Technologies' }],
  creator: 'YEAN Technologies',
  publisher: 'YEAN Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: siteName,
    title: 'The Es-Perience | Unforgettable Events',
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'The Es-Perience - Creating Unforgettable Events',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Es-Perience | Unforgettable Events',
    description: siteDescription,
    images: [`${siteUrl}/og-image.jpg`],
    creator: '@theesperience',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: siteUrl,
  },
  category: 'Event Planning',
}

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EventPlanningService',
    name: siteName,
    description: siteDescription,
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    image: `${siteUrl}/og-image.jpg`,
    telephone: '+1-123-456-7890',
    email: 'info@theesperience.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Luxury Avenue',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '40.7128',
      longitude: '-74.0060',
    },
    priceRange: '$$$',
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: [
      'Wedding Planning',
      'Corporate Event Planning',
      'Private Celebration Planning',
      'Venue Selection',
      'Catering Coordination',
      'Event Design & Décor',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.facebook.com/theesperience',
      'https://www.instagram.com/theesperience',
      'https://www.twitter.com/theesperience',
      'https://www.linkedin.com/company/theesperience',
    ],
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/favicon-32x32.png`,
    founder: {
      '@type': 'Organization',
      name: 'YEAN Technologies',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-123-456-7890',
      contactType: 'Customer Service',
      email: 'info@theesperience.com',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://www.facebook.com/theesperience',
      'https://www.instagram.com/theesperience',
      'https://www.twitter.com/theesperience',
      'https://www.linkedin.com/company/theesperience',
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Prevent scroll restoration
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                
                // Force scroll to top immediately
                window.scrollTo(0, 0);
                
                // Also force scroll to top after a short delay to catch any late scrolls
                setTimeout(function() {
                  window.scrollTo(0, 0);
                }, 0);
                
                // Force scroll to top on page load
                window.addEventListener('load', function() {
                  window.scrollTo(0, 0);
                }, { once: true });
                
                // Force scroll to top on DOMContentLoaded
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    window.scrollTo(0, 0);
                  }, { once: true });
                } else {
                  window.scrollTo(0, 0);
                }
              })();
            `,
          }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#FFF8E7" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://dummyimage.com" />
        
        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=JetBrains+Mono:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        
        {/* Structured Data */}
        <Script
          id="event-planning-service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

