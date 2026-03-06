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
        // New Brand colors
        background: '#FDFBF7',
        teal: '#8DA399',
        emerald: '#2C3E36',
        terracotta: '#B87D67',
        charcoal: '#202324',
        // Keeping primary for backward compatibility if needed, but redefining
        primary: {
          50: '#FDFBF7',
          100: '#8DA399',
          200: '#2C3E36',
          300: '#B87D67',
          400: '#202324',
        },
        lavender: '#F4DFE6', // Keeping old ones for now to avoid breakages during migration
        amaranth: '#E0A3BB',
        azure: '#D6E6E7',
        citron: '#C5CC82',
        moss: '#97A13B',
      },
      fontFamily: {
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'awesome-serif': ['var(--font-awesome-serif)', 'serif'],
        // Fallbacks
        'gilroy': ['var(--font-montserrat)', 'sans-serif'],
        'google-sans': ['var(--font-montserrat)', 'sans-serif'],
        'elsie': ['var(--font-awesome-serif)', 'serif'],
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