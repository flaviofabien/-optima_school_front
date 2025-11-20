import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Tu peux définir ici le port sur lequel tu veux démarrer le serveur
  },
  build: {
    outDir: 'dist', // Le dossier de sortie du build
  },
});
