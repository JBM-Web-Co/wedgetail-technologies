// HANDOVER NOTE: Replace all placeholder values before going live.
// Search for [PLACEHOLDER] to find every field that needs updating.
//
// Required before launch:
//   1. Update CLIENT_URL in HomePage.tsx to the client's real domain
//   2. Confirm phone, email, and ABN values with client
//   3. Replace placeholder images with real drone/aerial photography

import type { BusinessData } from './types';

export const businessData: BusinessData = {
    name: 'Wedgetail Technologies',
    tagline: 'A Higher Perspective in Aerial Data',
    description:
        'Wedgetail Technologies provides advanced aerial data solutions using the latest drone technology and sensor payloads. We deliver accurate and actionable insights for agriculture, renewable energy, construction, mining, and land development.',
    phone: '0467 944 935',
    email: 'wedgetailtechnologies@gmail.com',
    address: '',
    city: 'Armidale',
    state: 'NSW',
    postcode: '',
    hours: 'Mon–Fri: 7:00am – 5:00pm',
    navItems: [
        { label: 'Services', href: '#services' },
        { label: 'Industries', href: '#industries' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
    ],
    benefits: [
        {
            title: 'Precision Accuracy',
            description:
                'Centimetre-level data accuracy powered by advanced UAV platforms and industry-leading sensor payloads.',
            iconName: 'crosshair',
        },
        {
            title: 'Nationwide Coverage',
            description:
                'We cover all areas across Australia — from remote rural stations to major development sites.',
            iconName: 'globe',
        },
        {
            title: 'Fast Turnaround',
            description:
                'Rapid data capture and processing so you receive actionable insights without delay.',
            iconName: 'zap',
        },
        {
            title: 'Proven Expertise',
            description:
                'Specialists in drone data collection, processing, and delivering results that drive smarter decisions.',
            iconName: 'award',
        },
    ],
    services: [
        {
            title: 'Orthomosaic Mapping',
            description:
                'High-resolution aerial map generation stitched into precise orthomosaic outputs for planning, monitoring, and land analysis.',
            iconName: 'map',
        },
        {
            title: 'Photographic & Thermographic Inspections',
            description:
                'Detailed photographic and thermal imaging asset inspections for solar panels, powerlines, infrastructure, and more.',
            iconName: 'scan-search',
        },
        {
            title: 'LiDAR / Point Cloud Data',
            description:
                '3D terrain and structure capture using LiDAR technology, delivering dense point cloud data for engineering and survey work.',
            iconName: 'layers',
        },
        {
            title: 'Weed Mapping & Application Spray Files',
            description:
                'Precision weed detection from the air combined with the creation of application spot spray files for targeted treatment.',
            iconName: 'sprout',
        },
        {
            title: 'Aerial Photography',
            description:
                'Professional cinematic aerial imagery for marketing, documentation, and progress reporting across any industry.',
            iconName: 'camera',
        },
    ],
    industries: [
        { label: 'Agriculture', iconName: 'wheat' },
        { label: 'Renewable Energy', iconName: 'sun' },
        { label: 'Construction', iconName: 'hard-hat' },
        { label: 'Mining', iconName: 'gem' },
        { label: 'Land Development', iconName: 'map-pinned' },
    ],
    testimonials: [],
    faqs: [],
    rating: 5.0,
    reviewCount: 0,
    areas: ['All areas across Australia'],
};
