import { motion, useReducedMotion } from 'framer-motion';
import {
    Clock,
    Leaf,
    ShieldCheck,
    BadgeCheck,
    Search,
    Headphones,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Benefits.module.scss';

const iconMap: Record<string, ReactNode> = {
    clock: <Clock size={22} />,
    leaf: <Leaf size={22} />,
    shield: <ShieldCheck size={22} />,
    'badge-check': <BadgeCheck size={22} />,
    search: <Search size={22} />,
    headphones: <Headphones size={22} />,
};

export default function Benefits() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="benefits" className={s.benefits}>
            <div className={s.inner}>
                <SectionHeader
                    label="Why Choose Us"
                    title="The PestGuard Difference"
                    subtitle="We combine cutting-edge technology with eco-friendly solutions to deliver lasting results."
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
                            transition={{ duration: 0.4, delay: i * 0.08 }}
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
