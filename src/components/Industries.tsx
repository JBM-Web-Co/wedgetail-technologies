import { motion, useReducedMotion } from 'framer-motion';
import { Wheat, Sun, HardHat, Gem, MapPinned } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { useScrollReveal } from '../hooks';
import s from './Industries.module.scss';

const iconMap: Record<string, ReactNode> = {
    wheat: <Wheat size={28} />,
    sun: <Sun size={28} />,
    'hard-hat': <HardHat size={28} />,
    gem: <Gem size={28} />,
    'map-pinned': <MapPinned size={28} />,
};

export default function Industries() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="industries" className={s.industries}>
            <div className={s.inner}>
                <p className={s.label}>Industries We Serve</p>
                <div ref={ref} className={s.grid}>
                    {businessData.industries.map((ind, i) => (
                        <motion.div
                            key={ind.label}
                            className={s.item}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 16 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                        >
                            <div className={s.icon}>
                                {iconMap[ind.iconName]}
                            </div>
                            <span className={s.name}>{ind.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
