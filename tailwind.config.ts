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
                    50: "#EDF5FF",
                    100: "#DFEBFF",
                    200: "#C5DBFF",
                    300: "#A2C2FF",
                    400: "#7598FC",
                    500: "#5E7AF6",
                    600: "#4053EB",
                    700: "#3341CF",
                    800: " #2C3AA7",
                    900: "#2B3784",
                    950:"#191E4D"

                },

            },
            animation: {
                "fade- in" : "fadeIn 0.3s ease-in-out",
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