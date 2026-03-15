import { businessData } from '../data';
import s from './Footer.module.scss';

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>
                <div className={s.grid}>
                    <div>
                        <div className={s.brand}>{businessData.name}</div>
                        <p className={s.desc}>{businessData.description}</p>
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
                        <div className={s.colTitle}>Areas We Serve</div>
                        <div className={s.links}>
                            {businessData.areas.slice(0, 6).map((area) => (
                                <span key={area} className={s.link}>
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={s.bottom}>
                    &copy; {new Date().getFullYear()} {businessData.name}. All
                    rights reserved. | ABN 12 345 678 901
                    <p className={s.attribution}>Website by JBM Web Co</p>
                </div>
            </div>
        </footer>
    );
}
