/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#040914', // Ultra deep midnight navy
          900: '#071224', // Primary rich dark navy
          850: '#0B1B36',
          800: '#102548',
          700: '#16335F',
          600: '#1E437C',
          500: '#2A5A9E',
          400: '#4275BF',
        },
        gold: {
          50: '#FBF8F0',
          100: '#F6EED9',
          200: '#EBDCB4',
          300: '#DFC075',
          400: '#D4AF37', // Royal Gold
          500: '#C59B27',
          600: '#A67F19',
          700: '#836213',
          800: '#62470F',
          900: '#46320B',
        },
        ivory: {
          50: '#FFFFFF',
          100: '#FDFBF7', // Editorial Warm Ivory
          200: '#FAF6EE', // Editorial Cream
          300: '#F5EFE1', // Parchment
          400: '#EFE8D6',
          500: '#E2D8BF',
          600: '#C7BBA0',
          700: '#9B8E72',
          800: '#645A45',
          900: '#383224',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF1C5 0%, #D4AF37 50%, #A67F19 100%)',
        'gold-metallic': 'linear-gradient(135deg, #FFF7DC 0%, #D4AF37 30%, #A67F19 70%, #F4EECD 100%)',
        'navy-radial': 'radial-gradient(circle at 50% 25%, #0E2242 0%, #071224 60%, #040914 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FDFBF7 0%, #FAF6EE 50%, #F5EFE1 100%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 10px -2px rgba(212, 175, 55, 0.25)',
        'gold-md': '0 4px 22px -2px rgba(212, 175, 55, 0.35)',
        'gold-lg': '0 12px 35px -4px rgba(212, 175, 55, 0.4)',
        'luxury': '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
        'editorial': '0 20px 40px -15px rgba(26, 20, 10, 0.08)',
      },
    },
  },
  plugins: [],
}
