/** @type {import('tailwindcss').Config} */

const typographyPlugin = require("@tailwindcss/typography");

const baseColors = {
  purple: {
    100: "#C38AFF",
    200: "#8D1FFF",
    300: "#7D00FF",
    400: "#6900D6",
    500: "#5500AD",
  },
  red: {
    100: "#F3AEA5",
    200: "#E76655",
    300: "#E55643",
    400: "#E13A23",
    500: "#BC2D1A",
  },
  yellow: {
    100: "#FFE5A3",
    200: "#FFD770",
    300: "#FFCB44",
    400: "#FFBF1A",
    500: "#EBA900",
  },
  green: {
    100: "#A7F1C9",
    200: "#6EE8A6",
    300: "#47E18E",
    400: "#21CE71",
    500: "#1BA75B",
  },
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: baseColors.purple[100],
          300: baseColors.purple[300],
          200: baseColors.purple[200],
          400: baseColors.purple[400],
          500: baseColors.purple[500],
        },

        alert: {
          100: baseColors.red[100],
          200: baseColors.red[200],
          300: baseColors.red[300],
          400: baseColors.red[400],
          500: baseColors.red[500],
        },

        warning: {
          100: baseColors.yellow[100],
          200: baseColors.yellow[200],
          300: baseColors.yellow[300],
          400: baseColors.yellow[400],
          500: baseColors.yellow[500],
        },

        success: {
          100: baseColors.green[100],
          200: baseColors.green[200],
          300: baseColors.green[300],
          400: baseColors.green[400],
          500: baseColors.green[500],
        },
        neutral: {
          10: "#fbfafb",
          20: "#f6f6f7",
          30: "#ededef",
          40: "#e2e1e5",
          50: "#c8c6ce",
          60: "#bcb8c2",
          70: "#b0acb9",
          80: "#a39fad",
          90: "#9691a1",
          100: "#898395",
          200: "#7b768a",
          300: "#6e687e",
          400: "#635c74",
          500: "#564f68",
          600: "#4c435f",
          700: "#3c3351",
          800: "#2f2545",
          900: "#221a39",
        },

        defaultLight: "#ffffff",
        defaultDark: "#000000",
        black: "#111111",
      },
      backgroundImage: {
        gradient:
          "linear-gradient(109.26deg, #E3FC6F -10.18%, #BEE9FF 51.56%, #FFA6BA 110.78%)",
        gradientOnDark:
          "linear-gradient(100.49deg, #F0FFAA -3.55%, #C9EBFD 50.82%, #FFB9C9 102.97%)",
        productHunt: "url('/assets/product-hunt/bgProductHunt.jpg')",
        backgroundFull: "url('/assets/bgGradient/bg-mobile-menu.jpg')",
        bgGradientIntensive:
          "url('/assets/bgGradient/bgGradinetIntensive.jpg')",
        mobileMenu:
          "url('/assets/bgGradient/2000_WEB-MOBILE-MENU.webp'), url('/assets/bgGradient/2000_WEB-MOBILE-MENU.jpg')",
        headerPersonal: "url('/assets/bgGradient/gradientCore.jpg')",
        headerBusiness:
          "url('/assets/bgGradient/2000_WEB-HEADER_BUSINESS.webp'), url('/assets/bgGradient/2000_WEB-HEADER_BUSINESS.jpg')",
        purple: "#7d00ff",
        concierge:
          "linear-gradient(180deg, rgba(125, 0, 255, 0) 0%, rgba(125, 0, 255, 0.3) 100%)",
      },
      backgroundSize: {
        full: "100%",
      },
      borderRadius: {
        sm: "8px",
        xsm: "14px",
        md: "16px",
        xmd: "20px",
        lg: "24px",
        "4xl": "2rem",
      },
      boxShadow: {
        elevated:
          "0px 4px 12px rgba(0, 0, 0, 0.03), 0px 1px 4px rgba(0, 0, 0, 0.04), 0px 20px 40px rgba(0, 0, 0, 0.04)",
        elevatedLight:
          "0px 4px 12px rgba(0, 0, 0, 0.03), 0px 1px 4px rgba(0, 0, 0, 0.04)",
        blogCard: "0 4px 18px rgb(33 33 38 / 10%)",
        elevatedStrong: "0px 0px 50px rgba(125, 0, 255, 0.15)",
      },
      fontSize: {
        "3xl": "2rem", // 32px
        "4xl": "2.5rem", // 40px
        "5xl": "3rem",
        "6xl": "3.5rem",
      },
      lineHeight: {
        none: 1,
        tight: 1.1,
        normal: 1.3,
        relaxed: 1.5,
        veryRelaxed: 1.7,
        loose: 2,
      },
      letterSpacing: {
        compact: "-0.01em",
      },
      fontFamily: {
        luna: [
          "Luna",
          "system-ui",
          "BlinkMacSystemFont",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
        inter: [
          "Inter",
          "system-ui",
          "BlinkMacSystemFont",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      inset: {
        "-1": "-1px",
        "cookie-banner": "55px",
      },
      height: {
        80: "20rem",
        88: "22rem",
        96: "24rem",
        112: "28rem",
        128: "32rem",
        136: "34rem",
        144: "36rem",
        160: "40rem",
      },
      width: {
        104: "26rem",
        112: "28rem",
        128: "32rem",
        144: "36rem",
        160: "40rem",
        170: "44rem",
        "0x": "0%",
        "1x": "100%",
        "2x": "200%",
        "3x": "300%",
        "4x": "400%",
        "5x": "500%",
        "6x": "600%",
      },
      minHeight: {
        xl: "26rem",
        112: "28rem",
        "screen-80": "80vh",
        "screen-90": "98vh",
      },
      maxHeight: {
        128: "32rem",
      },
      maxWidth: {
        "2xs": "16rem",
        "2sm": "26rem",
        "8xl": "90rem",
      },
      margin: {
        15: "3.75rem",
        30: "7.5rem",
        100: "45rem",
      },
      padding: {
        15: "3.75rem",
        30: "7.5rem",
      },
      gridTemplateColumns: {
        skewed: "9fr 11fr",
        "skewed-more": "7fr 13fr",
        "skewed-rev": "11fr 9fr",
        "skewed-rev-more": "13fr 7fr",
        "coin-stats":
          "repeat(auto-fill, minmax(100px, 1fr) minmax(100px, 1fr))",
        "1/4": "1fr 3fr",
      },
      screens: {
        xs: "0px",
        mobile: "0px",
        sm: "670px",
        tablet: "670px",
        tabletPortrait: "670px",
        md: "960px",
        tabletLandscape: "960px",
        lg: "1280px",
        desktop: "1280px",
        xl: "1500px",
        desktopLarge: "1500px",
        none: "99999px",
      },
      spacing: {
        15: "3.75rem",
        30: "7.5rem",
      },
      transitionProperty: {
        spacing: "margin, padding",
        height: "height",
        "max-height": "margin, padding, max-height",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    extend: {
      borderColor: ["active"],
      borderWidth: ["hover", "focus", "active"],
      fontWeight: ["responsive", "hover", "focus", "active", "group-hover"],
      padding: ["first", "last"],
      margin: ["first", "last"],
    },
  },
  plugins: [typographyPlugin, "tailwindcss/nesting", "tailwindcss/utilities"],
};
