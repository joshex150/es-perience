export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://theesperience.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

