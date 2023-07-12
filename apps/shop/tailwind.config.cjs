/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        fontFamily: {
            primary: "Poppins",
        },
        container: {
            padding: {
                DEFAULT: "30px",
                lg: 0,
            },
        },
        screens: {
            sm: "640px",
            md: "769px",
            lg: "1024px",
            xl: "1440px",
        },
        extend: {
            colors: {
                primary: "#222222",
                secondary: "#F5E6E0",
            },
            backgroundImage: {
                hero: "url('/src/assets/background-1.jpeg')",
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
