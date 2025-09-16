/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      dark: '#27292B',
      light: '#fffef3',
      muted: '#605e4f',
      accent: '#4e705a',
      success: '#0FD27A',
      fail: '#D20F12',
    },
    extend: {
      fontFamily: {
        title: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
