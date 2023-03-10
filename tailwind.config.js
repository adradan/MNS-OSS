/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    safelist: [
        {
            pattern: /bg-/,
        },
        'text-slate-100',
    ],
    plugins: [],
};
