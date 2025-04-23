// tailwind.config.js
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        ibm: ['var(--font-ibm)'],
        dm: ['var(--font-dm)'],
      },
    },
  },
  plugins: [],
};
