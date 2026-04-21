/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.js',
    './public/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        'up': '#DC2626',
        'down': '#16A34A',
        'bg': '#F9FAFB',
        'border': '#E5E7EB',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          '"Noto Sans SC"',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
