import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { businessData } from '../data';
import { Button } from './UI';
import { ShieldRadarSVG } from './SVGPlaceholders';
import s from './Hero.module.scss';

export default function Hero() {
    const reducedMotion = useReducedMotion();
    const anim = (delay: number) =>
        reducedMotion
            ? {}
            : {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.5, delay },
              };

    return (
        <section className={s.hero}>
            <div className={s.inner}>
                <div className={s.content}>
                    <motion.div className={s.badge} {...anim(0)}>
                        Trusted by 800+ Sydney families
                    </motion.div>
                    <motion.h1 className={s.headline} {...anim(0.1)}>
                        Protect Your Home From{' '}
                        <span className={s.highlight}>Unwanted Pests</span>
                    </motion.h1>
                    <motion.p className={s.subheadline} {...anim(0.2)}>
                        {businessData.description}
                    </motion.p>
                    <motion.div className={s.ctas} {...anim(0.3)}>
                        <Button href="#contact">
                            Get a Free Quote <ArrowRight size={18} />
                        </Button>
                        <Button
                            variant="secondary"
                            href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                        >
                            <Phone size={18} /> Call Now
                        </Button>
                    </motion.div>
                    <motion.p className={s.risk} {...anim(0.35)}>
                        <ShieldCheck size={16} /> No obligation &bull;
                        Eco-friendly treatments &bull; 12-month warranty
                    </motion.p>
                    <motion.div className={s.stats} {...anim(0.4)}>
                        <div className={s.stat}>
                            <div className={s.statValue}>
                                {businessData.rating}
                            </div>
                            <div className={s.statLabel}>Google Rating</div>
                        </div>
                        <div className={s.stat}>
                            <div className={s.statValue}>
                                {businessData.reviewCount}+
                            </div>
                            <div className={s.statLabel}>Happy Clients</div>
                        </div>
                        <div className={s.stat}>
                            <div className={s.statValue}>15+</div>
                            <div className={s.statLabel}>Years Experience</div>
                        </div>
                    </motion.div>
                </div>
                <motion.div
                    className={s.image}
                    {...(reducedMotion
                        ? {}
                        : {
                              initial: { opacity: 0, scale: 0.9 },
                              animate: { opacity: 1, scale: 1 },
                              transition: { duration: 0.6, delay: 0.2 },
                          })}
                >
                    <ShieldRadarSVG className="" />
                </motion.div>
            </div>
        </section>
    );
}
