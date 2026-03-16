import { motion, useReducedMotion } from 'framer-motion';
import { Crosshair, Globe, Zap, Award } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Benefits.module.scss';

const iconMap: Record<string, ReactNode> = {
    crosshair: <Crosshair size={22} />,
    globe: <Globe size={22} />,
    zap: <Zap size={22} />,
    award: <Award size={22} />,
};

export default function Benefits() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="why-us" className={s.benefits}>
            <div className={s.inner}>
                <SectionHeader
                    label="Why Choose Us"
                    title="The Wedgetail Difference"
                    subtitle="Combining cutting-edge UAV technology with deep field expertise to deliver data you can act on."
                />
                <div ref={ref} className={s.grid}>
                    {businessData.benefits.map((b, i) => (
                        <motion.div
                            key={b.title}
                            className={s.card}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 20 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <div className={s.icon}>{iconMap[b.iconName]}</div>
                            <h3 className={s.title}>{b.title}</h3>
                            <p className={s.desc}>{b.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
