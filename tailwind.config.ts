import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#0A0612",
        plum: "#170B2E",
        plumLight: "#2A1147",
        rose: "#FF4D6D",
        roseLight: "#FF6B81",
        blush: "#FFD6E0",
        gold: "#E8C468",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      backgroundImage: {
        "aurora-gradient":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255,77,109,0.25), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(232,196,104,0.12), transparent), linear-gradient(180deg, #0A0612 0%, #170B2E 55%, #0A0612 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,77,109,0.35)",
        goldGlow: "0 0 30px rgba(232,196,104,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        pulseGlow: {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(255,77,109,0.5))" },
          "50%": { filter: "drop-shadow(0 0 26px rgba(255,77,109,0.9))" },
        },
        drift: {
          "0%": { transform: "translate(0,0)" },
          "100%": { transform: "translate(var(--dx), var(--dy))" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
