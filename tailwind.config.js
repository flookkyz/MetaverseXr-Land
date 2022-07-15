module.exports = {
  colors: {
    bg: "#05011E",
    purpleBtn: "#490CFA",
    pinkBtn: "#DB46FF",
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // gridTemplateColumns: {
      //   // Simple 16 column grid
      //   '57': "repeat(57, minmax(0, 1fr))",
      //   '59': "repeat(59, minmax(0, 1fr))",
      //   '77': "repeat(77, minmax(0, 1fr))",
      // },

      screens: {
        sm: "375px",
        // => @media (min-width: 414px) { ... }

        md: "414px",
        // => @media (min-width: 768px) { ... }

        lg: "768px",
        // => @media (min-width: 1024px) { ... }

        xl: "1024px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1280px",
        // => @media (min-width: 1536px) { ... }
        "3xl": "1440px",
        "4xl": "1536px",
      },
    },
  },
  plugins: [],
};
