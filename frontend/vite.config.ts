import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: 5173,
  },
  plugins: [react(), tsconfigPaths()],
})
