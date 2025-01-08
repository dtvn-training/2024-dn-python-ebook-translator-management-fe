/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                default_bt: '#D9D9D9',
                not_found: '#122638',
                button_404: '#1A3F55',
                text_404_0: '#1B3044',
                text_404_100: '#122638',
            },
        },
    },
    plugins: [],
};
