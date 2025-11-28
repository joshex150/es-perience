/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        'coffee-brown': '#4B2E2A',
        burgundy: '#800020',
      },
      fontFamily: {
        cursive: ['Great Vibes', 'cursive'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
        serif: ['Cormorant Garamond', 'Playfair Display', 'serif'],
        sans: ['Quinoa Text SC', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Quinoa Text SC', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

