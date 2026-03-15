// HANDOVER NOTE: Replace all placeholder values before going live.
// Search for [PLACEHOLDER] to find every field that needs updating.
//
// Required before launch:
//   1. Update CLIENT_URL to the client's real domain
//   2. Update businessData fields in data.ts:
//      name, tagline, description, phone, email, address, city, state, postcode, hours
//
// Note: PestControlService is not a valid schema.org type.
// LocalBusiness is used as the correct fallback.

import type { MetaFunction } from 'react-router';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Services from '../components/Services';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import CTABand from '../components/CTABand';
import Contact from '../components/Contact';
import { businessData } from '../data';

// [PLACEHOLDER] Replace with the client's actual domain before handover.
const CLIENT_URL = 'https://www.pestguardpro.com.au';

const JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessData.name,
    url: CLIENT_URL,
    telephone: businessData.phone,
    email: businessData.email,
    address: {
        '@type': 'PostalAddress',
        streetAddress: businessData.address,
        addressLocality: businessData.city,
        addressRegion: businessData.state,
        postalCode: businessData.postcode,
        addressCountry: 'AU',
    },
    openingHours: businessData.hours,
    areaServed: businessData.city,
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(businessData.rating),
        reviewCount: String(businessData.reviewCount),
    },
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
            <Benefits />
            <Services />
            <SocialProof />
            <FAQ />
            <CTABand />
            <Contact />
        </>
    );
}
