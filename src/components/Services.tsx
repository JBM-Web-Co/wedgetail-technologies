import { motion, useReducedMotion } from 'framer-motion';
import { Map, ScanSearch, Layers, Sprout, Camera } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Services.module.scss';

const iconMap: Record<string, ReactNode> = {
    map: <Map size={26} />,
    'scan-search': <ScanSearch size={26} />,
    layers: <Layers size={26} />,
    sprout: <Sprout size={26} />,
    camera: <Camera size={26} />,
};

export default function Services() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="services" className={s.services}>
            <div className={s.inner}>
                <SectionHeader
                    label="What We Do"
                    title="Aerial Data Services"
                    subtitle="Advanced UAV platforms and sensor payloads — delivering precise, actionable data across every application."
                />
                <div ref={ref} className={s.grid}>
                    {businessData.services.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            className={s.card}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 28 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className={s.icon}>
                                {iconMap[svc.iconName]}
                            </div>
                            <h3 className={s.title}>{svc.title}</h3>
                            <p className={s.desc}>{svc.description}</p>
                        </motion.article>
                    ))}
                </div>
                <p className={s.coverage}>
                    Covering all areas across Australia
                </p>
            </div>
        </section>
    );
}
