module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        neonred: '#ff073a',
        neonblack: '#0b0b0b'
      },
      boxShadow: {
        'neon': '0 0 12px rgba(255,7,58,0.55), 0 0 30px rgba(255,7,58,0.12)'
      }
    },
  },
  plugins: [],
}
