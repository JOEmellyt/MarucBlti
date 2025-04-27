import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from '@remix-run/dev';
import pkgJson from './package.json';

// Automatisation de l'externalisation : toutes les dépendances et peerDependencies
const externalDeps = [
  ...Object.keys(pkgJson.dependencies || {}),
  ...Object.keys(pkgJson.peerDependencies || {}),

  // Regex pour attraper des namespaces ou lib spécifiques
  /^@codemirror\//,
  /^react-/,
  /^@radix-ui\//,
  /^@remix-run\//,
];

export default defineConfig({
  plugins: [
    remix(), // Gestion des entrées Remix (index.html virtuel)
    react(),
  ],
  build: {
    rollupOptions: {
      external: externalDeps,
    },
  },
});