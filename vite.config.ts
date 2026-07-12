import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // macarenacaro.es sirve desde la raíz → base "/"
  // github.io/Portfolio sigue usando la ruta del repo
  base: mode === 'construction' ? '/' : 'https://mcarocortes.github.io/Portfolio',
}))
