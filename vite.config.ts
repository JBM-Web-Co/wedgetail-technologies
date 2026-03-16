import { defineConfig, type Plugin } from 'vite';
import { reactRouter } from '@react-router/dev/vite';
import fs from 'fs';
import path from 'path';

function staticAssets(): Plugin {
    const dir = path.resolve(__dirname, 'src/static');
    return {
        name: 'static-assets',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                const url = req.url?.split('?')[0] ?? '';
                const file = path.join(dir, url);
                if (fs.existsSync(file) && fs.statSync(file).isFile()) {
                    const ext = path.extname(file).toLowerCase();
                    const mime: Record<string, string> = {
                        '.png': 'image/png',
                        '.jpg': 'image/jpeg',
                        '.jpeg': 'image/jpeg',
                        '.svg': 'image/svg+xml',
                        '.ico': 'image/x-icon',
                        '.webp': 'image/webp',
                    };
                    res.setHeader(
                        'Content-Type',
                        mime[ext] ?? 'application/octet-stream'
                    );
                    res.end(fs.readFileSync(file));
                    return;
                }
                next();
            });
        },
        closeBundle() {
            const outDir = path.resolve(__dirname, 'dist/client');
            if (!fs.existsSync(dir)) return;
            for (const file of fs.readdirSync(dir)) {
                const src = path.join(dir, file);
                if (fs.statSync(src).isFile()) {
                    fs.copyFileSync(src, path.join(outDir, file));
                }
            }
        },
    };
}

export default defineConfig({
    plugins: [reactRouter(), staticAssets()],
    base: './',
    server: { port: 5173 },
    css: {
        modules: { localsConvention: 'camelCaseOnly' },
    },
});
