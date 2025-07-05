// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html,astro}', // adjust depending on your file structure
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        surface: 'oklch(98.483% 0.00121 107.824 / <alpha-value>)',
        primary: '#6366f1',
        accent: '#f472b6',
      },
      borderRadius: {
        lg: '1rem',
      },
      boxShadow: {
        soft: '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'linear-60': 'linear-gradient(60deg, var(--tw-gradient-stops))',
        frosted: 'linear-gradient(to top right, rgba(255,255,255,0.2), rgba(255,255,255,0.05))',
      },
      animation: {
        'dialog-in': 'dialog-content-show 150ms ease-out',
        'dialog-out': 'dialog-content-hide 150ms ease-in',
      },
    },
  },
  plugins: [],
}
