module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#181818',         // основной текст
        'ui-surface': '#23232f',    // тёмные фоны UI
        muted: '#a7a7b6',           // приглушённый текст
        background: '#ffffff',      // фон светлый
      },
      fontFamily: {
        lato: ['Lato_400Regular'],
        'lato-bold': ['Lato_700Bold'],
      },
      boxShadow: {
        '2xl': '0 8px 24px rgba(0, 0, 0, 0.15)',
      },
    }
  },
  plugins: [],
};
