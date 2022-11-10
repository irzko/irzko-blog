/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    maxWidth: {
      sm: "540px",
      md: "720px",
      lg: "960px",
      xl: "1140px",
      xxl: "1320px",
    },
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1400px",
    },
    extend: {
      colors: {
        "pastel-gray": "#DBD0C0",
        linen: "#FAEEE0",
        alabaster: "#F5EFE6",
        champagne: "#F9E4C8",
        "peach-orange": "#F9CF93",
        whitesmoke: "#F5F5F5",
        ghostwhite: "#FDFBF8",
        diamond: "#c2e7ff",
      },
      borderRadius: {
        50: "50px",
      },
      animation: {
        "wipe-bottom": "toBottom 0.5s ease",
        "wipe-right": "toRight 7s linear",
      },
      keyframes: {
        toBottom: {
          "0%": { bottom: "80%" },
          "50%": { bottom: "0" },
          100: { display: "hidden" },
        },
        toRight: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
