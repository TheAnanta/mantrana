import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors following 60-30-10 rule
        primary: {
          50: '#F4DFE6',  // Lavender Blush (60% - dominant)
          100: '#E0A3BB', // Amaranth Pink (30% - secondary)
          200: '#D6E6E7', // Azure 
          300: '#C5CC82', // Citron
          400: '#97A13B', // Moss Green (10% - accent)
        },
        lavender: '#F4DFE6',
        amaranth: '#E0A3BB',
        azure: '#D6E6E7',
        citron: '#C5CC82',
        moss: '#97A13B',
        teal: '#80a39b',
      },
      fontFamily: {
        'google-sans': ['Google Sans', 'system-ui', 'sans-serif'],
        'google-sans-display': ['Google Sans Display', 'system-ui', 'sans-serif'],
        'elsie': ['var(--font-elsie)', 'serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'strong': '0 20px 40px rgba(0, 0, 0, 0.12)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

module.exports = config