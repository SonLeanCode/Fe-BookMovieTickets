/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}" // Thêm đường dẫn này
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
      }
    },
  },
  plugins: [
    require("flowbite/plugin"), // Sử dụng flowbite plugin
  ],
};
