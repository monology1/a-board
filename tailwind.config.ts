import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3faf4',
          100: '#e0f2e3',
          200: '#bce0c2',
          300: '#89c491',
          400: '#53a460',  // Button color
          500: '#2f734a',  // Base green
          600: '#1f5c3d',  // Dark background
          700: '#1a4a32',
          800: '#163b29',
          900: '#122e21',
        },
        secondary: {
          50: '#ffffff',   // White input background
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
