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

const ACCREDITATIONS = [
    {
        code: 'RePL',
        title: 'Remote Pilot Licence',
        Icon: DroneIcon,
    },
    {
        code: 'ReOC',
        title: 'Remote Operators Certificate',
        Icon: CertificateIcon,
    },
    {
        code: 'AROC',
        title: 'Aeronautical Radio Operators Certificate',
        Icon: RadioIcon,
    },
];

function DroneIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <line x1="22" y1="22" x2="9" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="42" y1="22" x2="55" y2="9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="22" y1="42" x2="9" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="42" y1="42" x2="55" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="55" cy="9" r="7" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="9" cy="55" r="7" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="55" cy="55" r="7" stroke="currentColor" strokeWidth="2.5" />
            <rect x="22" y="22" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2.5" fill="currentColor" fillOpacity="0.15" />
            <circle cx="32" cy="32" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
    );
}

function CertificateIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="10" y="4" width="40" height="50" rx="4" stroke="currentColor" strokeWidth="2.5" />
            <path d="M10 8a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v12H10V8z" fill="currentColor" fillOpacity="0.2" />
            <line x1="10" y1="20" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
            <line x1="18" y1="30" x2="46" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="37" x2="42" y2="37" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="44" x2="44" y2="44" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="46" cy="50" r="9" fill="currentColor" />
            <path d="M42.5 50l2.5 2.5 6-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function RadioIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path d="M14 36 A18 18 0 0 1 50 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <rect x="7" y="32" width="12" height="16" rx="5" stroke="currentColor" strokeWidth="2.5" />
            <rect x="45" y="32" width="12" height="16" rx="5" stroke="currentColor" strokeWidth="2.5" />
            <path d="M13 46 Q10 54 20 58" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="20" cy="58" r="3.5" stroke="currentColor" strokeWidth="2" />
            <path d="M56 28 Q60 32 56 36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.7" />
            <path d="M59 23 Q65 32 59 41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.4" />
        </svg>
    );
}

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
                        <img
                            src="/drone.png"
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

                <div className={s.accreditations}>
                    <p className={s.accredHeading}>Our Accreditations</p>
                    <div className={s.accredGrid}>
                        {ACCREDITATIONS.map(({ code, title, Icon }, i) => (
                            <motion.div
                                key={code}
                                className={s.accredCard}
                                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                            >
                                <div className={s.accredIconWrap}>
                                    <Icon className={s.accredIcon} />
                                </div>
                                <span className={s.accredCode}>{code}</span>
                                <p className={s.accredTitle}>{title}</p>
                                <p className={s.accredIssuer}>CASA Certified</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
