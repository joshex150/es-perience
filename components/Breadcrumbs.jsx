'use client'

import Script from 'next/script'

export default function Breadcrumbs() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://theesperience.com',
      },
    ],
  }

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol className="flex space-x-2">
          <li>
            <a href="/">Home</a>
          </li>
        </ol>
      </nav>
    </>
  )
}

