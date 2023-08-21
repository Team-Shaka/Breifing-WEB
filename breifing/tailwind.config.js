//tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBgColor: "#4686CD",
        primaryTextColor: "#134D80",
        secondBgColor: "#F7F7F7",
        secondTextColor: "#B6B6B6",
      },
    },
  },
  plugins: [],
};
