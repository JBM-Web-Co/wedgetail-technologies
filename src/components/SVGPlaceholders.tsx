type SVGProps = {
    className?: string;
};

export function ShieldRadarSVG({ className }: SVGProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Pest control shield illustration"
        >
            <defs>
                <linearGradient
                    id="shieldGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#059669" stopOpacity="0.15" />
                    <stop
                        offset="100%"
                        stopColor="#059669"
                        stopOpacity="0.05"
                    />
                </linearGradient>
                <linearGradient
                    id="shieldStroke"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                >
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                </linearGradient>
            </defs>
            <circle cx="200" cy="200" r="180" fill="url(#shieldGrad)" />
            <circle
                cx="200"
                cy="200"
                r="140"
                stroke="#059669"
                strokeOpacity="0.15"
                strokeWidth="1"
                fill="none"
            />
            <circle
                cx="200"
                cy="200"
                r="100"
                stroke="#059669"
                strokeOpacity="0.1"
                strokeWidth="1"
                fill="none"
            />
            <circle
                cx="200"
                cy="200"
                r="60"
                stroke="#059669"
                strokeOpacity="0.08"
                strokeWidth="1"
                fill="none"
            />
            <path
                d="M200 80 L200 320 M80 200 L320 200"
                stroke="#059669"
                strokeOpacity="0.08"
                strokeWidth="1"
            />
            <path
                d="M200 100 C200 100 260 130 260 200 C260 260 200 300 200 300 C200 300 140 260 140 200 C140 130 200 100 200 100Z"
                fill="url(#shieldGrad)"
                stroke="url(#shieldStroke)"
                strokeWidth="2.5"
            />
            <path
                d="M180 200 L195 215 L225 185"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <circle cx="300" cy="130" r="6" fill="#059669" fillOpacity="0.3" />
            <circle cx="120" cy="280" r="4" fill="#f59e0b" fillOpacity="0.4" />
            <circle cx="310" cy="270" r="5" fill="#059669" fillOpacity="0.2" />
        </svg>
    );
}

export function BugPatternSVG({ className }: SVGProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Service illustration"
        >
            <rect
                width="120"
                height="120"
                rx="16"
                fill="#059669"
                fillOpacity="0.08"
            />
            <circle
                cx="60"
                cy="60"
                r="30"
                stroke="#059669"
                strokeOpacity="0.2"
                strokeWidth="1.5"
                fill="none"
            />
            <circle
                cx="60"
                cy="60"
                r="15"
                stroke="#059669"
                strokeOpacity="0.15"
                strokeWidth="1"
                fill="none"
            />
            <circle cx="60" cy="60" r="4" fill="#059669" fillOpacity="0.4" />
        </svg>
    );
}
