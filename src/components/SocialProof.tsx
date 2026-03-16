import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks';
import s from './SocialProof.module.scss';

const POINTS = [
    'Providing aerial data for the most demanding environments',
    'Orthomosaic mapping for precision land analysis and planning',
    'Photographic & thermographic asset inspections from the air',
    'LiDAR/point cloud data for engineering and survey applications',
    'Weed mapping combined with application spot spray file generation',
];

export default function SocialProof() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="about" className={s.about}>
            <div className={s.inner}>
                <div ref={ref} className={s.grid}>
                    <motion.div
                        className={s.content}
                        initial={reducedMotion ? false : { opacity: 0, x: -32 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <span className={s.label}>About Us</span>
                        <h2 className={s.headline}>
                            Like the wedge-tailed eagle, we take a{' '}
                            <span className={s.highlight}>
                                higher perspective.
                            </span>
                        </h2>
                        <p className={s.body}>
                            Wedgetail Technologies provides advanced aerial data
                            solutions using the latest drone technology and
                            sensor payloads. We specialise in high-resolution
                            orthomosaic mapping, photographic and thermographic
                            asset inspections, precision weed mapping, and the
                            creation of application spot spray files.
                        </p>
                        <p className={s.body}>
                            By combining cutting-edge UAV platforms with
                            powerful data processing tools, we deliver accurate
                            and actionable insights for industries including
                            renewable energy, agriculture, construction, mining,
                            and land development.
                        </p>
                        <ul className={s.points}>
                            {POINTS.map((pt) => (
                                <li key={pt} className={s.point}>
                                    <CheckCircle2
                                        size={17}
                                        className={s.check}
                                    />
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className={s.imageWrap}
                        initial={reducedMotion ? false : { opacity: 0, x: 32 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                    >
                        {/* [PLACEHOLDER] Replace with a real drone/aerial photography asset */}
                        <img
                            src="https://images.unsplash.com/photo-1508614999368-9260051292e5?auto=format&fit=crop&w=900&q=80"
                            alt="Aerial drone capturing landscape data"
                            className={s.image}
                        />
                        <div className={s.imageBadge}>
                            <span className={s.badgeValue}>100%</span>
                            <span className={s.badgeLabel}>
                                Data accuracy
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
