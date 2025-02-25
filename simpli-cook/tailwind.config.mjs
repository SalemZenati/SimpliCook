/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable dark mode via "class"
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,jsx,ts,tsx,html}", // Include additional paths
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0A8537",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#F0F1F3",
          foreground: "#020817",
        },
        accent: {
          DEFAULT: "#6D7074",
          foreground: "#020817",
        },
        background: "#FAFAFB",
        foreground: "#020817",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#020817",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#020817",
        },
        muted: {
          DEFAULT: "#F0F1F3",
          foreground: "#6D7074",
        },
        destructive: {
          DEFAULT: "#FF4C4C",
          foreground: "#FFFFFF",
        },
        border: "#E0E0E0",
        input: "#E0E0E0",
        ring: "#0A8537",
        chart: {
          1: "#FF6F61",
          2: "#4CAF50",
          3: "#03A9F4",
          4: "#FFC107",
          5: "#8E44AD",
        },
      },
      borderRadius: {
        sm: "0.125rem",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"], // Combine both sans fonts
        body: ["Nunito", "sans-serif"], // Keep secondary smooth font
      },
      fontSize: {
        heading: "28px",
        body: "16px",
      },
      fontWeight: {
        heading: "600",
        body: "400",
      },
    },
  },
  plugins: [],
};
