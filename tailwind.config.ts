import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        
        primary: {
          DEFAULT: '#2C2C2C',    
          hover: '#1A1A1A',      
          light: '#454545',      
        },
        secondary: {
          DEFAULT: '#8B7355',    
          hover: '#6F5C45',      
          light: '#A68968',      
        },
        accent: {
          DEFAULT: '#D4AF37',     
          hover: '#B8960F',       
        },
        background: {
          DEFAULT: '#FAFAFA',     
          secondary: '#F5F5F5',   
          dark: '#0F0F0F',        
          'dark-secondary': '#1A1A1A', 
        },
        text: {
          main: '#1A1A1A',        
          muted: '#6B6B6B',       
          'dark-main': '#F5F5F5', 
          'dark-muted': '#A3A3A3',
        },
        border: {
          light: '#E5E5E5',       
          dark: '#2C2C2C',        
        },
      },
    },
  },
  plugins: [],
};
export default config;
