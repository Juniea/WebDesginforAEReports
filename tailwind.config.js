// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };



/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: [
    {
      pattern: /bg-(red|blue|indigo|teal|green|emerald|violet|yellow|pink|purple|orange|cyan|sky|fuchsia|gray|lime)-200/,
    },
    {
      pattern: /text-(red|blue|indigo|teal|green|emerald|violet|yellow|pink|purple|orange|cyan|sky|fuchsia|gray|lime)-800/,
    },
    {
      pattern: /border-(red|blue|indigo|teal|green|emerald|violet|yellow|pink|purple|orange|cyan|sky|fuchsia|gray|lime)-400/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
