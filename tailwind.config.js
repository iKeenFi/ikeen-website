// tailwind.config.js
module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  // specify other options here

  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
  theme: {
    extend: {
      backgroundImage: {
        galaxy: "url('./assets/galaxy.jpg')",
      },
    },
  },
};
