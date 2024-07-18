/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      scrollbar: {
        // Define custom scrollbar styles here
        DEFAULT: {
          track: 'bg-red-1000',
          thumb: 'bg-red-500',
        },
        // You can also add other scrollbar styles like hover or focus
        hover: {
          thumb: 'bg-gray-400',
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Include the tailwind-scrollbar plugin
  ],
}
