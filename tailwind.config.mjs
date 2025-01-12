/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        palette: {
          bg: '#FFFCF6',
          iconbg: '#C1A999',
          chatbg: '#F0E6DE',
          medium: '#9A705C',
          text: '#54321A',
          textplaceholder: '#A08E81',

          red: '#ED3241',

          'quiz-bg': '#EFE2D9',
          'quiz-chatbg-user': '#C1A999',
          'quiz-chatbg-bot': '#49392D'
        }
      },
      boxShadow: {
        'superlg': '0 0 20px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        flyOut: 'flyOut 0.5s ease-out forwards',
        chatContainerOut: 'chatContainerOut 1.5s ease-in-out forwards',
        chatContainerIn: 'chatContainerIn 1.5s ease-in-out forwards',
        modalZoomIn: 'modalZoomIn 0.3s ease-out forwards',
      },
      keyframes: {
        flyOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(1)', opacity: 0 },
        },
        chatContainerOut: {
          '0%': { transform: 'scale(1) translate(0vw, 0vh)', opacity: '1' },
          '25%': { transform: 'scale(0.55) translate(0vw, 0vh)', opacity: '0.75' },
          '35%': { transform: 'scale(0.55) translate(0vw, 0vh)', opacity: '0.75' },
          '65%': { transform: 'scale(0.8) translate(0vw, 100vh)', opacity: '0.5' },
          '75%': { transform: 'scale(0.8) translate(0vw, 100vh)', opacity: '0.5' },
          '100%': { transform: 'scale(1) translate(0vw, 100vh)', opacity: '0.5' },
        },
        chatContainerIn: {
          '0%': { transform: 'scale(1) translate(0vw, -100vh)', opacity: '0.5' },
          '25%': { transform: 'scale(0.8) translate(0vw, -100vh)', opacity: '0.5' },
          '35%': { transform: 'scale(0.8) translate(0vw, -100vh)', opacity: '0.5' },
          '65%': { transform: 'scale(0.55) translate(0vw, 0vh)', opacity: '0.75' },
          '75%': { transform: 'scale(0.55) translate(0vw, 0vh)', opacity: '0.75' },
          '100%': { transform: 'scale(1) translate(0vw, 0vh)', opacity: '1' },
        },
        modalZoomIn: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
