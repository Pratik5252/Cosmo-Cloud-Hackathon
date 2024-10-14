/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    backgroundImage: {
      customgradient: "linear-gradient(to right, #121212 50%, #434343 250%)",
      customgradient2:
        "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(119, 141, 170, 0.3), rgba(255, 255, 255, 0));",
      textgradient: "linear-gradient(to right, #52525b 50%, #434343 90%)",
      textgradient2: "linear-gradient(to right, #f5f5f5 50%, #111111 300%)",
      grid: "linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)",
    },
    extend: {
      boxShadow: {
        glow: "0px 10px 50px 10px rgba(100, 150, 255, 0.5)", // Glowing shadow effect
      },
      colors: {
        primary: {
          bg: "#F8F8F8",
          text: "#E3E3E3",
          accent: "#A9A9A9",
        },
        secondary: {
          bg: "#121212",
          text: "#161612",
        },
      },
      keyframes: {
        typing: {
          "0%": { width: "0%", opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { width: "100%", opacity: 1 },
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "white" },
        },
      },
      animation: {
        typing: "typing 3s steps(20) infinite alternate, blink 0.7s infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-clip-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
        },
        ".text-transparent": {
          color: "transparent",
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
