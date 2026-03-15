import { ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks';
import s from './CTABand.module.scss';

export default function CTABand() {
    const { ref, isVisible } = useScrollReveal();

    return (
        <section className={s.ctaBand}>
            <div
                ref={ref}
                className={`${s.inner} ${isVisible ? s.fadeUpVisible : s.fadeUp}`}
            >
                <h2 className={s.title}>Ready to Reclaim Your Home?</h2>
                <p className={s.text}>
                    Book a free inspection today and get a same-day quote. No
                    obligation, no hidden fees.
                </p>
                <a href="#contact" className={s.btn}>
                    Get a Free Quote <ArrowRight size={20} />
                </a>
            </div>
        </section>
    );
}
