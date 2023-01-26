/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            primary: 'Poppins',
        },
        container: {
            padding: {
                DEFAULT: '30px',
                lg: 0,
            },
        },
        screens: {
            sm: '640px',
            md: '769px',
            lg: '1024px',
            xl: '1440px',
        },
        extend: {
            colors: {
                primary: '#222222',
                secondary: '#F5E6E0'
            },
            backgroundImage: {
                hero: "url('./assets/background-1.jpeg')",
            }
        },
    },
    plugins: [],
};
