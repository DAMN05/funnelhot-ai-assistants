import type { Config} from "tailwindcss";

const config : Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend:{
            colors:{
                primary:{
                    50: "#2E1065",
                    100: "#4C1D95",
                    200: "#5B21B6",
                    300: "#6D28D9",
                    400: "#7C3AED",
                    500: "#8B5CF6",
                    600: "#A78BFA",
                    700: "#C4B5FD",
                    800: "#DDD6FE",
                    900: "#EDE9FE",
                    950: "#F5F3FF"

                },

            },
            animation: {
                "fade-in" : "fadeIn 0.3s ease-in-out",
                "slide-up": "slideUp 0.3s ease-out",
            },
            keyframes: {
                fadeIn:{
                    "0%": {opacity : "0"},
                    "100%": {opacity : "1"},
                },
                slideUp:{
                    "0%": {transform: "translateY(10px)", opacity: "0"},
                    "100%":{transform: "translateY(0)", opacity: "1"},
                },
            },
        },
    },
    plugins: [],
};

export default config;