/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xl3': '1501px',
        'xl2': '1151px'
      }
    },
  },
  plugins: [],
}

