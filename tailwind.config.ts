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
        // Modo claro (Light)
        primary: {
          DEFAULT: '#2C2C2C',    // Negro suave para botones principales
          hover: '#1A1A1A',       // Negro más oscuro al hover
          light: '#454545',       // Variante más clara
        },
        secondary: {
          DEFAULT: '#8B7355',     // Marrón cuero elegante
          hover: '#6F5C45',       // Marrón más oscuro
          light: '#A68968',       // Marrón claro
        },
        accent: {
          DEFAULT: '#D4AF37',     // Dorado sutil (toques de lujo)
          hover: '#B8960F',       // Dorado más intenso
        },
        background: {
          DEFAULT: '#FAFAFA',     // Blanco hueso (light mode)
          secondary: '#F5F5F5',   // Gris muy claro para cards
          dark: '#0F0F0F',        // Negro profundo (dark mode)
          'dark-secondary': '#1A1A1A', // Gris oscuro para cards (dark)
        },
        text: {
          main: '#1A1A1A',        // Texto principal (light)
          muted: '#6B6B6B',       // Texto secundario (light)
          'dark-main': '#F5F5F5', // Texto principal (dark)
          'dark-muted': '#A3A3A3',// Texto secundario (dark)
        },
        border: {
          light: '#E5E5E5',       // Bordes suaves (light)
          dark: '#2C2C2C',        // Bordes discretos (dark)
        },
      },
    },
  },
  plugins: [],
};
export default config;
