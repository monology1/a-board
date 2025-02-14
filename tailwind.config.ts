import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        castoro: ['var(--font-castoro)', 'serif'],
      },
      colors: {
        // Main Colors
        'green': {
          100: '#EFF6F0',  // Green 100
          300: '#4C7A55',  // Green 300
          500: '#2A4834',  // Green 500 (Base color)
        },
        'golden': '#C8AA6E',  // Golden

        // Base Colors
        'custom-black': '#000000',  // Black
        'custom-white': '#FFFFFF',  // White
        'custom-text': '#111111',   // Text
        'gray': {
          100: '#D3D7D3',  // Grey 100
          300: '#8C8C8C',  // Grey 300
        },
        'success': '#4CAF50'  // Success
      },
    },
  },
  plugins: [],
} satisfies Config;
