import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Menu, X, Sun, Moon } from 'lucide-react';
import { businessData } from '../data';
import s from './Header.module.scss';

type Theme = 'light' | 'dark';

function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState<Theme>(getStoredTheme);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <header className={s.header}>
            <div className={s.inner}>
                <a href="#" className={s.logo}>
                    <ShieldCheck size={28} className={s.icon} />
                    {businessData.name}
                </a>

                <nav className={s.nav} aria-label="Main navigation">
                    {businessData.navItems.map((item) => (
                        <a key={item.href} href={item.href} className={s.link}>
                            {item.label}
                        </a>
                    ))}
                    <button
                        className={s.themeToggle}
                        onClick={toggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <Moon size={18} />
                        ) : (
                            <Sun size={18} />
                        )}
                    </button>
                    <a href="#contact" className={s.cta}>
                        Get Free Quote
                    </a>
                </nav>

                <div className={s.rightGroup}>
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
                        <button
                            className={s.themeToggleMobile}
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? (
                                <Moon size={18} />
                            ) : (
                                <Sun size={18} />
                            )}
                        </button>
                        <a
                            href="#contact"
                            className={s.mobileNavCta}
                            onClick={() => setMenuOpen(false)}
                        >
                            Get Free Quote
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
