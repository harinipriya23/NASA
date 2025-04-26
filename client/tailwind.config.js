/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        20: "5rem", // Custom padding (20px)
      },
      screens: {
        small: "600px", // Custom small breakpoint
        medium: "800px", // Custom medium breakpoint
        large: "1200px", // Custom large breakpoint
      },
    },
  },
  plugins: [],
};
