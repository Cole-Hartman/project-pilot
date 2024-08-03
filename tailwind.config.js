/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cbrown: {
          // DEFAULT: "#010101",
          1: "#F8F4E1", 
          2: "#AF8F6F",
          3: "#74512D", 
          4: "#543310",
        },
      },
    },
  },
  plugins: [
    ({ addVariant }) => {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
