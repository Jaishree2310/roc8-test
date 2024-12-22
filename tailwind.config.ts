import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#E54065',    // Pink accent color
        background: '#F4F5F9', // Main background
        border: '#CFD2DC',    // Border color
        text: '#636363',      // Text color
        'filter-button': '#E1E4EA', // Filter button color
        'read-bg': '#F2F2F2'  // Read background color
      }
    }
  },
  plugins: [],
}
export default config
