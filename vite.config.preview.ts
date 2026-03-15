// PREVIEW ONLY: Remove this file when copying template for a client site
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: './',
    css: {
        modules: { localsConvention: 'camelCaseOnly' },
    },
    build: {
        outDir: 'dist/client',
    },
});
