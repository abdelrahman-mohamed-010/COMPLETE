/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        darkpurple: "#672785",
        primary: "#F0005C",
      },
    },
  },
  plugins: [],
};
