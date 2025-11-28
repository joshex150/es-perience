# Luxury Event Planner Landing Page

A fully responsive, elegant landing page for an Event Planner website built with Next.js, Tailwind CSS, and Framer Motion. **World-class SEO optimized** with comprehensive metadata, structured data, and accessibility features.

## Features

- ✨ Smooth animations with Framer Motion
- 🎨 Premium color palette (Cream, Coffee Brown, Burgundy)
- 📱 Fully responsive design
- 🎯 All required sections: Hero, About, Services, Portfolio, Testimonials, Pricing, CTA, Contact, Footer
- ⚡ Optimized performance with Next.js
- 🔍 **World-class SEO optimization** (see [SEO.md](./SEO.md))
- ♿ WCAG 2.1 accessibility compliant
- 📊 Structured data (JSON-LD) for rich snippets
- 🚀 PWA ready with manifest
- 📱 Open Graph and Twitter Card support

## SEO Features

This project includes comprehensive SEO optimizations:

- ✅ Complete meta tags (title, description, keywords)
- ✅ Open Graph and Twitter Card metadata
- ✅ Structured data (Organization, EventPlanningService, Reviews, Breadcrumbs)
- ✅ Dynamic sitemap.xml generation
- ✅ Robots.txt configuration
- ✅ Image optimization with proper alt text
- ✅ Semantic HTML5 structure
- ✅ ARIA labels and accessibility attributes
- ✅ Skip to main content link
- ✅ Mobile-first responsive design
- ✅ Performance optimizations (lazy loading, font preloading)
- ✅ PWA manifest for mobile installation

See [SEO.md](./SEO.md) for complete SEO documentation.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## SEO Setup

1. **Update Environment Variables**
   - Set `NEXT_PUBLIC_SITE_URL` to your actual domain

2. **Update Verification Codes**
   - Replace placeholder verification codes in `app/layout.jsx` with actual Google, Yandex, Yahoo verification codes

3. **Submit Sitemap**
   - Submit `https://yourdomain.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools

4. **Replace Placeholder Content**
   - Update social media URLs in footer and layout
   - Replace placeholder images with actual high-quality images
   - Update business address and contact information

5. **Monitor Performance**
   - Set up Google Analytics
   - Monitor Core Web Vitals
   - Track keyword rankings

## Color Palette

- Background: Cream (#FFF8E7)
- Text: Coffee Brown (#4B2E2A)
- Accent/Border/CTA: Burgundy (#800020)

## Technologies

- Next.js 16.0 (App Router with Turbopack)
- React 19
- Tailwind CSS 3
- Framer Motion 11

## Project Structure

```
├── app/
│   ├── layout.jsx          # Root layout with SEO metadata
│   ├── page.jsx            # Main landing page
│   ├── globals.css         # Global styles
│   ├── sitemap.js          # Dynamic sitemap generation
│   ├── robots.js           # Robots.txt generation
│   ├── opengraph-image.js  # OG image generation
│   └── icon.js             # Favicon generation
├── components/
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Portfolio.jsx
│   ├── WhyChooseUs.jsx
│   ├── Testimonials.jsx
│   ├── Pricing.jsx
│   ├── CTASection.jsx
│   ├── ContactForm.jsx
│   └── Footer.jsx
└── public/
    ├── robots.txt          # Static robots.txt
    └── site.webmanifest    # PWA manifest
```

## Performance

- Lighthouse Score: Optimized for 90+ scores
- Core Web Vitals: Optimized
- Image Optimization: Next.js Image component with lazy loading
- Font Loading: Preloaded with display=swap

## Accessibility

- WCAG 2.1 AA compliant
- Semantic HTML5
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

## License

This project is proprietary and confidential.

