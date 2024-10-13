/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    backgroundImage: {
      "custom-gradient": "linear-gradient(to right, #121212 50%, #434343 250%)",
      "custom-gradient2":
        "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(119, 141, 170, 0.3), rgba(255, 255, 255, 0));",
    },
    extend: {
      colors: {
        primary: {
          bg: "#F8F8F8",
          text: "#F5F5F5",
        },
        secondary: {
          bg: "#121212",
          text: "#161612",
        },
      },
    },
  },
  plugins: [],
};
