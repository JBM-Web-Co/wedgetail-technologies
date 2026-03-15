import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import s from './SocialProof.module.scss';

function Stars({ count }: { count: number }) {
    return (
        <div
            className={s.testimonialStars}
            aria-label={`${count} out of 5 stars`}
        >
            {Array.from({ length: count }, (_, i) => (
                <Star key={i} size={16} fill="currentColor" />
            ))}
        </div>
    );
}

export default function SocialProof() {
    const { ref, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    return (
        <section id="reviews" className={s.socialProof}>
            <div className={s.inner}>
                <SectionHeader
                    label="Testimonials"
                    title="What Our Clients Say"
                    subtitle="Hundreds of satisfied customers trust PestGuard Pro to keep their homes pest-free."
                />
                <div className={s.ratingBlock}>
                    <div className={s.ratingStars}>
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star key={i} size={24} fill="currentColor" />
                        ))}
                    </div>
                    <div className={s.ratingText}>
                        {businessData.rating} out of 5
                    </div>
                    <div className={s.ratingSubtext}>
                        Based on {businessData.reviewCount} reviews
                    </div>
                </div>
                <div ref={ref} className={s.testimonials}>
                    {businessData.testimonials.map((t, i) => (
                        <motion.div
                            key={t.name}
                            className={s.testimonialCard}
                            initial={
                                reducedMotion ? false : { opacity: 0, y: 20 }
                            }
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                        >
                            <Stars count={t.rating} />
                            <p className={s.testimonialText}>"{t.text}"</p>
                            <div className={s.testimonialAuthor}>
                                <span className={s.testimonialName}>
                                    {t.name}
                                </span>
                                <span className={s.testimonialLocation}>
                                    {t.location}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
