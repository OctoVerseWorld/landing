/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',   // Для App Router (Next.js 13+)
        './pages/**/*.{js,ts,jsx,tsx}', // Для Pages Router (Next.js 12)
        './components/**/*.{js,ts,jsx,tsx}', // Если используешь компоненты
    ],
    theme: {
        extend: {},
    },
    plugins: [],

};

