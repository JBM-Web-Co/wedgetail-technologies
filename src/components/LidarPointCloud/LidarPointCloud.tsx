import { useRef, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';
import s from './LidarPointCloud.module.scss';

type Point3D = Readonly<{
    px: number;
    py: number;
    pz: number;
    r: number;
    g: number;
    b: number;
}>;

type ProjectedPoint = {
    sx: number;
    sy: number;
    scale: number;
    tz: number;
    py: number;
    r: number;
    g: number;
    b: number;
};

const elevationColor = (y: number): [number, number, number] => {
    const t = Math.max(0, Math.min(1, y / 32));
    if (t < 0.08) {
        const f = t / 0.08;
        return [10, Math.round(30 + f * 40), Math.round(210 + f * 20)];
    }
    if (t < 0.25) {
        const f = (t - 0.08) / 0.17;
        return [Math.round(10 + f * 10), Math.round(70 + f * 140), Math.round(230 - f * 60)];
    }
    if (t < 0.50) {
        const f = (t - 0.25) / 0.25;
        return [Math.round(20 + f * 30), Math.round(210 - f * 10), Math.round(170 - f * 150)];
    }
    if (t < 0.72) {
        const f = (t - 0.50) / 0.22;
        return [Math.round(50 + f * 190), Math.round(200 + f * 45), 20];
    }
    if (t < 0.88) {
        const f = (t - 0.72) / 0.16;
        return [240, Math.round(245 - f * 130), 20];
    }
    const f = (t - 0.88) / 0.12;
    return [240, Math.round(115 - f * 100), 20];
};

type TreeDef = Readonly<[number, number, number, number, number]>;

const TREES: ReadonlyArray<TreeDef> = [
    // Back row — tall
    [-32, -30, 18, 7, 320],
    [-14, -34, 22, 8, 380],
    [  6, -32, 20, 7, 340],
    [ 24, -30, 24, 9, 420],
    [ 38, -26, 17, 6, 280],
    [-38, -18, 16, 6, 260],
    // Mid row
    [-28,  -8, 15, 6, 260],
    [ -8, -12, 19, 7, 320],
    [ 14,  -8, 16, 6, 270],
    [ 32, -10, 21, 8, 360],
    [ 42,   2, 14, 5, 220],
    // Front row — shorter
    [-36,  14, 12, 5, 200],
    [-16,  18, 14, 5, 220],
    [  4,  22, 11, 4, 180],
    [ 22,  16, 15, 6, 240],
    [ 38,  20, 12, 5, 190],
    // Scattered individuals
    [-44,   2, 13, 5, 200],
    [-20,  -2, 10, 4, 160],
    [ 10,   6,  9, 3.5, 140],
];

const generatePoints = (): ReadonlyArray<Point3D> => {
    const pts: Point3D[] = [];

    // Ground plane — 5000 points
    for (let i = 0; i < 5000; i++) {
        const px = -48 + Math.random() * 96;
        const pz = -48 + Math.random() * 96;
        const py = -0.2 + Math.random() * 0.4;
        const [r, g, b] = elevationColor(py);
        pts.push({ px, py, pz, r, g, b });
    }

    // Trees
    for (const [cx, cz, height, radius, count] of TREES) {
        // Trunk — 18 sparse vertical points
        for (let i = 0; i < 18; i++) {
            const px = cx + (Math.random() - 0.5) * 0.8;
            const pz = cz + (Math.random() - 0.5) * 0.8;
            const py = 0.5 + i * (height * 0.04);
            const [r, g, b] = elevationColor(py);
            pts.push({ px, py, pz, r, g, b });
        }
        // Canopy — spherical distribution biased upward
        for (let i = 0; i < count; i++) {
            const phi = Math.random() * Math.PI;
            const theta = Math.random() * Math.PI * 2;
            const rd = radius * (0.4 + Math.random() * 0.6);
            const ox = rd * Math.sin(phi) * Math.cos(theta);
            const oy = rd * Math.abs(Math.cos(phi)) * 0.7;
            const oz = rd * Math.sin(phi) * Math.sin(theta);
            const px = cx + ox + (Math.random() - 0.5) * 1.2;
            const py = height + oy + (Math.random() - 0.5) * 0.8;
            const pz = cz + oz + (Math.random() - 0.5) * 1.2;
            const [r, g, b] = elevationColor(py);
            pts.push({ px, py, pz, r, g, b });
        }
    }

    return pts;
};

const drawLegend = (
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number
): void => {
    const barW = 6;
    const barH = 92;
    const x = w - 18 - barW;
    const y = h - 112;

    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0.00, 'rgb(240,15,20)');
    grad.addColorStop(0.20, 'rgb(240,180,20)');
    grad.addColorStop(0.45, 'rgb(40,200,30)');
    grad.addColorStop(0.70, 'rgb(20,170,230)');
    grad.addColorStop(1.00, 'rgb(10,30,210)');

    ctx.fillStyle = grad;
    ctx.fillRect(x, y, barW, barH);

    ctx.globalAlpha = 1;
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '7px monospace';
    ctx.textAlign = 'right';
    ctx.fillText('32m', x - 2, y + 6);
    ctx.fillText('0m', x - 2, y + barH);
};

export const LidarPointCloud = () => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointsRef = useRef<ReadonlyArray<Point3D>>([]);
    const angleRef = useRef(0.3);
    const rafRef = useRef<number>(0);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrapper || !canvas) return;

        if (pointsRef.current.length === 0) {
            pointsRef.current = generatePoints();
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let alive = true;

        const resize = () => {
            canvas.width = wrapper.offsetWidth;
            canvas.height = wrapper.offsetHeight;
        };
        resize();

        const render = () => {
            if (!alive) return;

            const W = canvas.width;
            const H = canvas.height;
            const CX = W / 2;
            const CY = H / 2 + H * 0.05;
            const TILT = 0.68;
            const fov = 290;
            const camZ = 105;
            const scaleMultiplier = Math.min(W, H) / 82;
            const angle = angleRef.current;

            ctx.fillStyle = '#050508';
            ctx.fillRect(0, 0, W, H);

            const projected: ProjectedPoint[] = pointsRef.current.map((pt) => {
                const rx = pt.px * Math.cos(angle) - pt.pz * Math.sin(angle);
                const rz = pt.px * Math.sin(angle) + pt.pz * Math.cos(angle);

                const ty = pt.py * Math.cos(TILT) - rz * Math.sin(TILT);
                const tz = pt.py * Math.sin(TILT) + rz * Math.cos(TILT);

                const sc = fov / (fov + tz + camZ);
                return {
                    sx: CX + rx * sc * scaleMultiplier,
                    sy: CY - ty * sc * scaleMultiplier,
                    scale: sc,
                    tz,
                    py: pt.py,
                    r: pt.r,
                    g: pt.g,
                    b: pt.b,
                };
            });

            // Painter's algorithm: descending tz = far-to-near
            projected.sort((a, b) => b.tz - a.tz);

            for (const pt of projected) {
                const isGround = pt.py < 0.6;
                const size = isGround
                    ? Math.max(0.4, pt.scale * 1.3)
                    : Math.max(0.5, pt.scale * 1.75);
                const alpha = isGround
                    ? 0.55 + pt.scale * 0.25
                    : 0.65 + pt.scale * 0.3;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = `rgb(${pt.r},${pt.g},${pt.b})`;
                ctx.beginPath();
                ctx.arc(pt.sx, pt.sy, size, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            drawLegend(ctx, W, H);

            if (!reducedMotion) {
                angleRef.current += 0.0018;
                rafRef.current = requestAnimationFrame(render);
            }
        };

        if (reducedMotion) {
            render();
        } else {
            rafRef.current = requestAnimationFrame(render);
        }

        const observer = new ResizeObserver(() => {
            resize();
            if (reducedMotion) render();
        });
        observer.observe(wrapper);

        return () => {
            alive = false;
            cancelAnimationFrame(rafRef.current);
            observer.disconnect();
        };
    }, [reducedMotion]);

    return (
        <div ref={wrapperRef} className={s.wrapper}>
            <canvas ref={canvasRef} className={s.canvas} aria-hidden="true" />
        </div>
    );
};
