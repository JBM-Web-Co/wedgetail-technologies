import type { BusinessData } from './types';

export const businessData: BusinessData = {
    name: 'PestGuard Pro',
    tagline: "Sydney's Trusted Pest Control Experts",
    description:
        'Professional pest control services for homes and businesses across Sydney. Licensed, insured, and eco-friendly solutions that keep your family safe.',
    phone: '1300 789 456',
    email: 'info@pestguardpro.com.au',
    address: '42 Harbour Street',
    city: 'Sydney',
    state: 'NSW',
    postcode: '2000',
    hours: 'Mon-Sat: 7am - 6pm',
    navItems: [
        { label: 'Why Us', href: '#benefits' },
        { label: 'Services', href: '#services' },
        { label: 'Reviews', href: '#reviews' },
        { label: 'FAQ', href: '#faq' },
    ],
    benefits: [
        {
            title: 'Same-Day Service',
            description:
                'Emergency callouts within 2 hours across Sydney metro.',
            iconName: 'clock',
        },
        {
            title: 'Eco-Friendly',
            description:
                'Child and pet-safe treatments using low-toxicity formulas.',
            iconName: 'leaf',
        },
        {
            title: 'Licensed & Insured',
            description:
                'Fully licensed technicians with $20M public liability cover.',
            iconName: 'shield',
        },
        {
            title: '12-Month Warranty',
            description:
                'All treatments backed by our industry-leading guarantee.',
            iconName: 'badge-check',
        },
        {
            title: 'Free Inspections',
            description: 'Comprehensive property assessment at no charge.',
            iconName: 'search',
        },
        {
            title: '24/7 Support',
            description:
                'Round-the-clock phone support for urgent pest issues.',
            iconName: 'headphones',
        },
    ],
    services: [
        {
            title: 'Termite Control',
            description:
                'Full termite inspections, treatment plans, and ongoing protection for your property.',
            iconName: 'bug',
        },
        {
            title: 'Cockroach Treatment',
            description:
                'Targeted gel bait and spray treatments to eliminate cockroach colonies permanently.',
            iconName: 'spray-can',
        },
        {
            title: 'Rodent Removal',
            description:
                'Humane and effective rodent control with professional entry-point sealing.',
            iconName: 'rat',
        },
    ],
    testimonials: [
        {
            name: 'Sarah Mitchell',
            text: "PestGuard Pro saved our home from a termite infestation we didn't even know about. Their team was professional, thorough, and incredibly knowledgeable.",
            rating: 5,
            location: 'Bondi, NSW',
        },
        {
            name: 'James Chen',
            text: 'Fast, reliable, and reasonably priced. They came within hours of my call and sorted out our cockroach problem permanently.',
            rating: 5,
            location: 'Parramatta, NSW',
        },
        {
            name: 'Emma Williams',
            text: 'The team was fantastic with our rodent issue. They sealed all entry points and the warranty gives us real peace of mind.',
            rating: 5,
            location: 'Manly, NSW',
        },
    ],
    faqs: [
        {
            question: 'How quickly can you respond to an emergency?',
            answer: 'We offer same-day emergency callouts across Sydney metro. In most cases, we can have a technician at your property within 2 hours of your call.',
        },
        {
            question: 'Are your treatments safe for children and pets?',
            answer: "Yes. We use low-toxicity, eco-friendly treatments that are safe for your family and pets. We'll advise on any temporary precautions if needed.",
        },
        {
            question: 'Do you offer free inspections?',
            answer: 'Absolutely. We provide comprehensive free inspections for all residential properties. Our technicians will assess the issue and provide a detailed quote on the spot.',
        },
        {
            question: 'What areas do you service?',
            answer: 'We service all of Sydney metro, from the Northern Beaches to Sutherland, and out to the Blue Mountains. Contact us to confirm coverage in your area.',
        },
        {
            question: 'What warranty do you provide?',
            answer: "All our treatments come with a 12-month warranty. If pests return within the warranty period, we'll re-treat at no additional cost.",
        },
    ],
    rating: 4.9,
    reviewCount: 847,
    areas: [
        'Sydney CBD',
        'North Shore',
        'Eastern Suburbs',
        'Inner West',
        'Northern Beaches',
        'Sutherland Shire',
        'Western Sydney',
        'Blue Mountains',
    ],
};
