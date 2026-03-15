import { motion, useReducedMotion } from 'framer-motion';
import { Bug, Zap, MousePointer2, MapPin } from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './Services.module.scss';

const iconMap: Record<string, ReactNode> = {
    bug: <Bug size={26} />,
    'spray-can': <Zap size={26} />,
    rat: <MousePointer2 size={26} />,
};

export default function Services() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="services" className={s.services}>
            <div className={s.inner}>
                <SectionHeader
                    label="Our Services"
                    title="Comprehensive Pest Solutions"
                    subtitle="From termites to rodents, we handle every pest challenge with precision and care."
                />
                <div ref={ref} className={s.grid}>
                    {businessData.services.map((svc, i) => (
                        <motion.article
                            key={svc.title}
                            className={s.card}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 24 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: i * 0.12 }}
                        >
                            <div className={s.icon}>
                                {iconMap[svc.iconName]}
                            </div>
                            <h3 className={s.title}>{svc.title}</h3>
                            <p className={s.desc}>{svc.description}</p>
                        </motion.article>
                    ))}
                </div>
                <p className={s.area}>
                    <MapPin size={16} /> Servicing all {businessData.city} metro
                    areas — {businessData.areas.slice(0, 4).join(', ')} &amp;
                    more.
                </p>
            </div>
        </section>
    );
}
