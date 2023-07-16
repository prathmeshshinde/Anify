/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "header-bg": "#FFE4E4",
        "header-red": "#FF3D00",
        "circle-bg": "#FFAEAE",
        "cardText-bg": "#575757",
        cardTextColor: "#FF7171",
        "disabled-button-bg": "rgba(255, 228, 228, 0.45)",
        "disabled-text-color": "rgba(255, 61, 0, 0.64)",
        "selected-anime-text": "#ffa1a1",
        "selected-anime-card-bg": "#ECECEC",
        "hover-button-bg": "#FFD0D0",
      },
      fontFamily: {
        poppins: "Poppins",
      },
    },
  },
  plugins: [],
};
