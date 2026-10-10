import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // En local el sitio sigue en /Portfolio.
  // macarenacaro.es publica la rama gh-pages en la raíz del dominio.
  base: mode === 'development' ? '/Portfolio' : '/',
}))
