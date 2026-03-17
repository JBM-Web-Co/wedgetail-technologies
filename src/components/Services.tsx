import { useRef, useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Map,
    ScanSearch,
    Layers,
    Sprout,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import { useScrollReveal } from '../hooks';
import { OrthomosaicMap } from './OrthomosaicMap/OrthomosaicMap';
import s from './Services.module.scss';

const iconMap: Record<string, ReactNode> = {
    map: <Map size={32} />,
    'scan-search': <ScanSearch size={32} />,
    layers: <Layers size={32} />,
    sprout: <Sprout size={32} />,
};

export default function Services() {
    const trackRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const { ref: sectionRef, isVisible } = useScrollReveal();
    const reducedMotion = useReducedMotion();

    const services = businessData.services;
    const isFirst = activeIndex === 0;
    const isLast = activeIndex === services.length - 1;

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const handleScroll = () => {
            const cardWidth = track.scrollWidth / services.length;
            setActiveIndex(Math.round(track.scrollLeft / cardWidth));
        };
        track.addEventListener('scroll', handleScroll, { passive: true });
        return () => track.removeEventListener('scroll', handleScroll);
    }, [services.length]);

    const scroll = (dir: -1 | 1) => {
        const track = trackRef.current;
        if (!track) return;
        const cardWidth = track.scrollWidth / services.length;
        track.scrollBy({
            left: dir * cardWidth,
            behavior: reducedMotion ? 'instant' : 'smooth',
        });
    };

    const scrollToIndex = (i: number) => {
        const track = trackRef.current;
        if (!track) return;
        const cardWidth = track.scrollWidth / services.length;
        track.scrollTo({
            left: i * cardWidth,
            behavior: reducedMotion ? 'instant' : 'smooth',
        });
    };

    return (
        <section id="services" className={s.services}>
            <div className={s.inner}>
                <SectionHeader
                    label="What We Do"
                    title="Aerial Data Services"
                    subtitle="Advanced UAV platforms and sensor payloads — delivering precise, actionable data across every application."
                />

                <div ref={sectionRef} className={s.carouselWrapper}>
                    <button
                        className={`${s.arrow} ${s.arrowLeft}`}
                        onClick={() => scroll(-1)}
                        aria-label="Previous service"
                        disabled={isFirst}
                    >
                        <ChevronLeft size={22} />
                    </button>

                    <div ref={trackRef} className={s.track} role="list">
                        {services.map((svc, i) => (
                            <motion.article
                                key={svc.title}
                                className={s.card}
                                role="listitem"
                                initial={
                                    reducedMotion
                                        ? false
                                        : { opacity: 0, y: 28 }
                                }
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                {svc.title === 'Orthomosaic Mapping' ? (
                                    <div className={s.cardImage}>
                                        <OrthomosaicMap />
                                    </div>
                                ) : (
                                    <div
                                        className={`${s.cardImage} ${!svc.image ? s.cardImageFallback : ''}`}
                                    >
                                        {svc.image ? (
                                            <img
                                                src={svc.image}
                                                alt={svc.title}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div
                                                className={s.fallbackIcon}
                                                aria-hidden="true"
                                            >
                                                {iconMap[svc.iconName]}
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className={s.cardBody}>
                                    <h3 className={s.title}>{svc.title}</h3>
                                    <p className={s.desc}>{svc.description}</p>
                                </div>
                            </motion.article>
                        ))}
                    </div>

                    <button
                        className={`${s.arrow} ${s.arrowRight}`}
                        onClick={() => scroll(1)}
                        aria-label="Next service"
                        disabled={isLast}
                    >
                        <ChevronRight size={22} />
                    </button>
                </div>

                <div
                    className={s.dots}
                    role="tablist"
                    aria-label="Service slides"
                >
                    {services.map((svc, i) => (
                        <button
                            key={svc.title}
                            role="tab"
                            aria-selected={i === activeIndex}
                            aria-label={`Go to ${svc.title}`}
                            className={`${s.dot} ${i === activeIndex ? s.dotActive : ''}`}
                            onClick={() => scrollToIndex(i)}
                        />
                    ))}
                </div>
                <p className={s.coverage}>
                    Get in touch to discuss your project requirements
                </p>
            </div>
        </section>
    );
}
