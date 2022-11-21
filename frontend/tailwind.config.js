/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      screens: {
        'min': '480px',
      },
      fontFamily: {
        sans: '"IBM Plex Sans",sans-serif',
      },
      colors: {
        white: {
          900: '#fff'
        },
        pink: {
          800: '#BA0F95',
          900: '#D003A3',
        },
        purple: {
          900: '#7431F4',
        },
        zinc: {
          300: '#F3F5F7',
          500: '#EBEEF1',
          600: '#D9D9D9',
          700: '#818A97',
          900: '#343434',
        },
        black: {
          900: '#000000'
        },
        green: {
          800: '#12B538',
          900: '#01CA30'
        },
      },
    },
  },
  plugins: [
  ],
}