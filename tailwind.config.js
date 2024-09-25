/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // This line ensures that Tailwind looks for classes in your app directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

