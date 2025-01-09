import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // 啟用 HTML5 History API 支持
    historyApiFallback: true
  },
  preview: {
    port: 5173
  }
});
