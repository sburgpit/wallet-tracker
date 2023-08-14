import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: true,
  },
  server: {
    host: true,
    port: mode === 'dev' ? 5173 : 3000,
  },
  plugins: [react(), tsconfigPaths()],
}))
