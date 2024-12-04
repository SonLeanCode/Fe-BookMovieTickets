import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Tự động mở trình duyệt
  },
  build: {
    sourcemap: true, // Tạo sourcemap để debug
    chunkSizeWarningLimit: 1000, // Tăng giới hạn cảnh báo chunk
  },
  optimizeDeps: {
    include: ['react', 'react-dom'], // Tăng tốc preload các dependencies
  },
})