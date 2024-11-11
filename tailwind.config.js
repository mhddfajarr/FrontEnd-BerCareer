/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a4d80',
        primaryHover: '#1d6fa5',
        mainContent: '#ededed'
      },
    },
     
  },
  plugins: [
    require('daisyui'),
  ], 
  daisyui: {
    themes: ["light", "dark", "cupcake",  "bumblebee", "cyberpunk",],
  },
}

