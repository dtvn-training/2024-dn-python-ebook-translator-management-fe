/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                default_bt: '#D9D9D9',
                green: '#5FB5B8',
                review: '#F9F1BA',
                translate: '#F6DBF9',
                task: '#EEF6FF',
            },
        },
    },
    plugins: [],
};
