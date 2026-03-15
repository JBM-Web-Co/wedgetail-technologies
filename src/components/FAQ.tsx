import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { businessData } from '../data';
import { SectionHeader } from './UI';
import s from './FAQ.module.scss';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const reducedMotion = useReducedMotion();

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section id="faq" className={s.faq}>
            <div className={s.inner}>
                <SectionHeader
                    label="FAQ"
                    title="Frequently Asked Questions"
                    subtitle="Everything you need to know about our pest control services."
                />
                <div className={s.list} role="list">
                    {businessData.faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`${s.item} ${isOpen ? s.itemOpen : ''}`}
                                role="listitem"
                            >
                                <button
                                    className={s.question}
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                >
                                    {item.question}
                                    <ChevronDown
                                        size={20}
                                        className={`${s.icon} ${isOpen ? s.iconOpen : ''}`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={
                                                reducedMotion
                                                    ? false
                                                    : { height: 0, opacity: 0 }
                                            }
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                        >
                                            <p className={s.answer}>
                                                {item.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
