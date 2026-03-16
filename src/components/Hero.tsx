import { motion, useReducedMotion } from 'framer-motion';
import { Phone, ChevronDown } from 'lucide-react';
import { businessData } from '../data';
import s from './Hero.module.scss';

export default function Hero() {
    const reducedMotion = useReducedMotion();
    const anim = (delay: number) =>
        reducedMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 32 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.75, delay },
              };

    return (
        <section className={s.hero} aria-label="Hero">
            <div className={s.bg} aria-hidden="true">
                {/* [PLACEHOLDER] Replace with actual high-resolution aerial photography */}
                <img
                    src="https://images.unsplash.com/photo-1473218861634-bdd29fe4c22d?auto=format&fit=crop&w=1920&q=80"
                    alt=""
                    className={s.bgImg}
                    fetchPriority="high"
                />
                <div className={s.overlay} />
            </div>

            <div className={s.inner}>
                <motion.div className={s.eyebrow} {...anim(0)}>
                    Advanced UAV Aerial Data Solutions
                </motion.div>

                <motion.h1 className={s.headline} {...anim(0.12)}>
                    A Higher Perspective
                    <br />
                    <span className={s.highlight}>in Aerial Data</span>
                </motion.h1>

                <motion.p className={s.sub} {...anim(0.24)}>
                    Like the wedge-tailed eagle, we take a higher
                    perspective—capturing detailed aerial data that helps your
                    business monitor assets, improve efficiency, and make
                    smarter decisions.
                </motion.p>

                <motion.div className={s.ctas} {...anim(0.36)}>
                    <a
                        href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                        className={s.btnPrimary}
                    >
                        <Phone size={20} />
                        Call Us — {businessData.phone}
                    </a>
                    <a href="#services" className={s.btnOutline}>
                        Our Services
                        <ChevronDown size={18} />
                    </a>
                </motion.div>

                <motion.div className={s.tags} {...anim(0.48)}>
                    <span className={s.tagsLabel}>Serving:</span>
                    {[
                        'Agriculture',
                        'Renewable Energy',
                        'Construction',
                        'Mining',
                        'Land Development',
                    ].map((ind) => (
                        <span key={ind} className={s.tag}>
                            {ind}
                        </span>
                    ))}
                </motion.div>
            </div>

            <a
                href="#services"
                className={s.scrollArrow}
                aria-label="Scroll to services"
            >
                <ChevronDown size={30} />
            </a>
        </section>
    );
}
