import { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './StickyCTA.module.scss';

export default function StickyCTA() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className={`${s.stickyCta}${scrolled ? ` ${s.scrolled}` : ''}`}>
            <a
                href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                className={s.btn}
            >
                <Phone size={18} /> Call {businessData.phone}
            </a>
        </div>
    );
}
