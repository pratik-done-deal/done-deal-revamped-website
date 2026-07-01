/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  // Preflight is OFF: the preserved design-system CSS owns the global reset,
  // and Tailwind's reset would otherwise override it and break pixel-fidelity.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      // Brand tokens exposed as Tailwind utilities for new layout work.
      colors: {
        ink: '#0A0A0D',
        bone: '#FCFCFD',
        purple: '#5C6FFF',
        peach: '#FFBC9E',
      },
      fontFamily: {
        sans: ['Instrument Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
