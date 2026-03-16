import { Phone } from 'lucide-react';
import { businessData } from '../data';
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
                <p className={s.eyebrow}>Ready to get started?</p>
                <h2 className={s.title}>
                    Take a higher perspective on your next project.
                </h2>
                <p className={s.text}>
                    Talk to our team about how aerial data can help your
                    business monitor assets, improve efficiency, and make
                    smarter decisions.
                </p>
                <a
                    href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                    className={s.btn}
                >
                    <Phone size={20} />
                    Call Us — {businessData.phone}
                </a>
            </div>
        </section>
    );
}
