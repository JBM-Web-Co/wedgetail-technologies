import { useState, type SubmitEvent } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { businessData } from '../data';
import { Button, FormField, SectionHeader } from './UI';
import type { ContactFormData, ContactFormErrors } from '../types';
import s from './Contact.module.scss';

function validateForm(data: ContactFormData): ContactFormErrors {
    const errors: ContactFormErrors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = 'Please enter a valid email';
    }
    if (!data.phone.trim()) {
        errors.phone = 'Phone is required';
    } else if (!/^[\d\s()+-]{8,15}$/.test(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }
    if (!data.message.trim()) errors.message = 'Message is required';
    return errors;
}

export default function Contact() {
    const [form, setForm] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [errors, setErrors] = useState<ContactFormErrors>({});
    const [submitted, setSubmitted] = useState(false);

    const update = (field: keyof ContactFormData) => (value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        if (errors[field])
            setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = (e: SubmitEvent) => {
        e.preventDefault();
        const errs = validateForm(form);
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }
        //eslint-disable-next-line no-console
        console.log('Form submit', form);
        setSubmitted(true);
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <section id="contact" className={s.contact}>
            <div className={s.inner}>
                <SectionHeader
                    label="Contact"
                    title="Get in Touch"
                    subtitle="Ready to take a higher perspective? Call us directly or send an enquiry below."
                />

                <div className={s.callBanner}>
                    <div className={s.callBannerText}>
                        <p className={s.callLabel}>
                            Prefer to talk? Call us directly:
                        </p>
                        <a
                            href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                            className={s.callNumber}
                        >
                            {businessData.phone}
                        </a>
                    </div>
                    <a
                        href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                        className={s.callBtn}
                    >
                        <Phone size={18} />
                        Call Now
                    </a>
                </div>

                <div className={s.grid}>
                    <div className={s.info}>
                        <div>
                            <h3 className={s.infoTitle}>
                                {businessData.name}
                            </h3>
                            <p className={s.infoText}>
                                {businessData.description}
                            </p>
                        </div>
                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Phone size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Phone</div>
                                <a
                                    href={`tel:${businessData.phone.replace(/\s/g, '')}`}
                                    className={s.itemValue}
                                >
                                    {businessData.phone}
                                </a>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Mail size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Email</div>
                                <div className={s.itemValue}>
                                    {businessData.email}
                                </div>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <MapPin size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>
                                    Service Area
                                </div>
                                <div className={s.itemValue}>
                                    Contact us to discuss your area
                                </div>
                            </div>
                        </div>
                        <div className={s.item}>
                            <div className={s.itemIcon}>
                                <Clock size={18} />
                            </div>
                            <div>
                                <div className={s.itemLabel}>Hours</div>
                                <div className={s.itemValue}>
                                    {businessData.hours}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.form}>
                        {submitted ? (
                            <div className={s.formSuccess}>
                                Thank you for your enquiry! We'll be in touch
                                shortly.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} noValidate>
                                <FormField
                                    label="Full Name"
                                    name="name"
                                    value={form.name}
                                    error={errors.name}
                                    onChange={update('name')}
                                    placeholder="John Smith"
                                    required
                                />
                                <FormField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    error={errors.email}
                                    onChange={update('email')}
                                    placeholder="john@example.com"
                                    required
                                />
                                <FormField
                                    label="Phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    error={errors.phone}
                                    onChange={update('phone')}
                                    placeholder="04XX XXX XXX"
                                    required
                                />
                                <FormField
                                    label="Message"
                                    name="message"
                                    type="textarea"
                                    value={form.message}
                                    error={errors.message}
                                    onChange={update('message')}
                                    placeholder="Tell us about your project or data requirements..."
                                    required
                                />
                                <Button type="submit">Send Enquiry</Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
