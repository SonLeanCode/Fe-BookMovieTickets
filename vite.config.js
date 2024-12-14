import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
  '/efx': {
    target: 'http://localhost:4003',
    changeOrigin: true, // Thay đổi Origin của request thành server đích
    secure: false, // Bỏ kiểm tra SSL
    rewrite: (path) => path.replace(/^\/efx/, ''), // Loại bỏ tiền tố '/efx' nếu không cần
  },
},

    host: '0.0.0.0',  // Lấy giá trị từ biến môi trường
    open: true,  // Tự động mở trình duyệt
  },
  build: {
    sourcemap: true,  // Tạo sourcemap để debug
    chunkSizeWarningLimit: 1000,  // Tăng giới hạn cảnh báo chunk
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],  // Tăng tốc preload các dependencies
  },
})
