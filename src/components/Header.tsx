import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Bird, Menu, X, Phone } from 'lucide-react';
import { businessData } from '../data';
import s from './Header.module.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const reducedMotion = useReducedMotion();

    return (
        <header className={s.header}>
            <div className={s.inner}>
                <a href="#" className={s.logo}>
                    <Bird size={26} className={s.icon} />
                    {businessData.name}
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {businessData.navItems.map((item) => (
                        <a key={item.href} href={item.href} className={s.link}>
                            {item.label}
                        </a>
                    ))}
                    <a
                        href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                        className={s.cta}
                    >
                        <Phone size={15} />
                        Call Us
                    </a>
                </nav>

                <button
                    className={s.mobileMenuBtn}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={menuOpen}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={s.mobileMenu}
                        initial={reducedMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                    >
                        {businessData.navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className={s.mobileNavLink}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <a
                            href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                            className={s.mobileNavCta}
                            onClick={() => setMenuOpen(false)}
                        >
                            <Phone size={16} />
                            Call {businessData.phone}
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
