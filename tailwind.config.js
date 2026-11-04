/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kyun: {
          dark: '#151515',
          darkA: '#1a1a1a',
          darkB: '#1e1e1e',
          darkC: '#232323',
          darkD: '#2d2d2d',
          light: '#f5f5f5',
          lightA: '#ffffff',
          lightB: '#f0f0f0',
          text: '#949494',
          textFocus: '#d2d2d2',
          textDark: '#777777',
          border: 'rgba(255, 255, 255, 0.14)',
          borderLight: 'rgba(0, 0, 0, 0.12)',
          accent: '#777777',
          success: '#22c55e',
          danger: '#f87171',
          warning: '#f59e0b',
        }
      },
      fontFamily: {
        mix: ['Mix', 'monospace', 'sans-serif'],
        daydream: ['Daydream', 'monospace', 'sans-serif'],
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Text"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['"SF Mono"', '"SFMono-Regular"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        kyun: 'inset 0 1px 0 rgba(0,0,0,0.24), 0 10px 30px rgba(0,0,0,0.28)',
        nav: '0 0 40px rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
}
