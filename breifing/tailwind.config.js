module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                "bottom-sheet-up": {
                    "0%": { transform: "translateY(420px)" },
                    "100%": { transform: "translateY(0)" },
                },
                "bottom-sheet-down": {
                    "0%": { transform: "translateY(-80px)" },
                    "100%": { transform: "translateY(0)" },
                },
            },
            fontSize: {
                xs: [
                    "10px",
                    {
                        lineHeight: "normal",
                        fontWeight: "400",
                    },
                ],
                sm: [
                    "13px",
                    {
                        lineHeight: "normal",
                        fontWeight: "400",
                    },
                ],
                base: [
                    "15px",
                    {
                        lineHeight: "normal",
                        fontWeight: "400",
                    },
                ],
                lg: [
                    "24px",
                    {
                        lineHeight: "normal",
                        fontWeight: "400",
                    },
                ],
            },
            colors: {
                primaryBgColor: "#4686CD",
                primaryTextColor: "#134D80",
                secondBgColor: "#F7F7F7",
                secondTextColor: "#B6B6B6",
                thirdTextColor: "#93A8D0",
            },
        },
        screens: {
            xs: "450px",
            sm: "810px", // mobile, tablet screen size
            lg: "1024px", // desktop screen size
            xl: "1200px"
        },
    },
    plugins: [require("daisyui")],
};
