import { Phone, Mail } from 'lucide-react';
import { businessData } from '../data';
import s from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.grid}>
                    <div>
                        <div className={s.brand}>
                            {businessData.name}
                        </div>
                        <p className={s.tagline}>{businessData.tagline}</p>
                        <p className={s.desc}>
                            Advanced aerial data solutions using cutting-edge
                            drone technology and sensor payloads — delivering
                            actionable insights for every project.
                        </p>
                    </div>
                    <div>
                        <div className={s.colTitle}>Quick Links</div>
                        <div className={s.links}>
                            {businessData.navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={s.link}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className={s.colTitle}>Contact</div>
                        <div className={s.links}>
                            <a
                                href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                                className={s.contactItem}
                            >
                                <Phone size={14} />
                                {businessData.phone}
                            </a>
                            <a
                                href={`mailto:${businessData.email}`}
                                className={s.contactItem}
                            >
                                <Mail size={14} />
                                {businessData.email}
                            </a>
                            <span className={s.link}>
                                {businessData.city}, {businessData.state}
                            </span>
                            <span className={s.link}>{businessData.hours}</span>
                        </div>
                    </div>
                </div>
                <div className={s.bottom}>
                    <span>
                        &copy; {new Date().getFullYear()}{' '}
                        {businessData.name}. All rights reserved.
                    </span>
                    <p className={s.attribution}>Website by JBM Web Co</p>
                </div>
            </div>
        </footer>
    );
}
