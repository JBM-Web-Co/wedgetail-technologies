import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { businessData } from '../data';
import { useTheme } from '../context/ThemeContext';
import s from './Header.module.scss';

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const reducedMotion = useReducedMotion();
    const { theme, toggle } = useTheme();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`${s.header}${scrolled ? ` ${s.scrolled}` : ''}`}>
            <div className={s.inner}>
                <a href="#" className={s.logo}>
                    {businessData.name}
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {businessData.navItems.map((item) => (
                        <a key={item.href} href={item.href} className={s.link}>
                            {item.label}
                        </a>
                    ))}
                    <button
                        className={s.themeBtn}
                        onClick={toggle}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>
                    <a
                        href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                        className={s.cta}
                    >
                        <Phone size={15} />
                        Call Us
                    </a>
                </nav>

                <div className={s.mobileRight}>
                    <button
                        className={s.themeBtn}
                        onClick={toggle}
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>
                    <button
                        className={s.mobileMenuBtn}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
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
