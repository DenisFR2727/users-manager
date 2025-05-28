const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './*.{js,ts,jsx,tsx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                background: '#111827',
                foreground: '#ffffff',
            },
        },
    },
    darkMode: 'class',
    plugins: [heroui()],
};
