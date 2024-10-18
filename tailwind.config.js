/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ['dark', 'light']
  },
  darkMode: ['class', '[data-theme="dark"]'],
  plugins: [require('daisyui'),],
}

