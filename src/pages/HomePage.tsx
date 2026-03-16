// HANDOVER NOTE: Replace CLIENT_URL with the client's real domain before go-live.

import type { MetaFunction } from 'react-router';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Industries from '../components/Industries';
import Benefits from '../components/Benefits';
import SocialProof from '../components/SocialProof';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import { businessData } from '../data';

// [PLACEHOLDER] Replace with the client's actual domain before handover.
const CLIENT_URL = 'https://www.wedgetailtechnologies.com.au';

const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessData.name,
    url: CLIENT_URL,
    telephone: businessData.phone,
    email: businessData.email,
    address: {
        '@type': 'PostalAddress',
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        addressCountry: 'AU',
    },
    openingHours: businessData.hours,
    areaServed: 'Australia',
};

export const meta: MetaFunction = () => [
    { title: `${businessData.name} | ${businessData.tagline}` },
    { name: 'description', content: businessData.description },
    {
        property: 'og:title',
        content: `${businessData.name} | ${businessData.tagline}`,
    },
    { property: 'og:description', content: businessData.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: CLIENT_URL },
    { property: 'og:site_name', content: businessData.name },
    { tagName: 'link', rel: 'canonical', href: CLIENT_URL },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
        name: 'twitter:title',
        content: `${businessData.name} | ${businessData.tagline}`,
    },
    { name: 'twitter:description', content: businessData.description },
    { 'script:ld+json': JSON_LD },
];

export default function HomePage() {
    return (
        <>
            <Hero />
            <Services />
            <Industries />
            <Benefits />
            <SocialProof />
            <CTABand />
            <Contact />
        </>
    );
}
