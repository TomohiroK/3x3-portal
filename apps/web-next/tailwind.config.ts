import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // 3x3 Observer's Hub カラーパレット (紺・ネイビー系)
          accent: '#60A5FA',   // メインアクセント（明るいスカイブルー・黒背景で視認性高）
          orange: '#60A5FA',   // 後方互換エイリアス
          dark: '#0B0E1A',     // 最深背景
          surface: '#131829',  // カード・パネル背景
          muted: '#1E2540',    // ボーダー・セパレータ
          subtle: '#252D4A',   // ホバー背景
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
