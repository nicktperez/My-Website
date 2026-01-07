import { useEffect, useState } from 'react';

// City coordinates (simplified for SVG viewBox 0 0 100 50)
const cities = [
    { name: 'Sacramento', x: 12, y: 18, isOrigin: true },
    { name: 'San Francisco', x: 10, y: 19 },
    { name: 'New York', x: 28, y: 17 },
    { name: 'London', x: 48, y: 12 },
    { name: 'Frankfurt', x: 52, y: 13 },
    { name: 'Tokyo', x: 88, y: 18 },
    { name: 'Sydney', x: 90, y: 40 },
    { name: 'Singapore', x: 78, y: 32 },
];

const ThreatMap = () => {
    const [activePings, setActivePings] = useState<number[]>([]);

    useEffect(() => {
        // Randomly activate pings every 2 seconds
        const interval = setInterval(() => {
            const randomCity = Math.floor(Math.random() * (cities.length - 1)) + 1; // Skip Sacramento
            setActivePings(prev => {
                const newPings = [...prev, randomCity];
                // Keep only last 3 pings
                return newPings.slice(-3);
            });
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <svg
                viewBox="0 0 100 50"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                {/* Simple world map outline - very simplified */}
                <defs>
                    <radialGradient id="pingGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="0.3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Continents - very simplified paths */}
                <g fill="none" stroke="hsl(var(--primary))" strokeWidth="0.15" opacity="0.3">
                    {/* North America */}
                    <path d="M5 8 L30 8 L32 15 L28 22 L20 25 L12 22 L5 15 Z" />
                    {/* South America */}
                    <path d="M20 28 L28 28 L26 45 L18 45 Z" />
                    {/* Europe */}
                    <path d="M44 8 L58 8 L55 18 L44 15 Z" />
                    {/* Africa */}
                    <path d="M44 20 L58 20 L55 42 L47 42 Z" />
                    {/* Asia */}
                    <path d="M60 5 L95 5 L95 28 L75 30 L60 25 Z" />
                    {/* Australia */}
                    <path d="M82 35 L95 35 L95 45 L82 45 Z" />
                </g>

                {/* City nodes */}
                {cities.map((city, i) => (
                    <g key={city.name}>
                        {/* Base dot */}
                        <circle
                            cx={city.x}
                            cy={city.y}
                            r={city.isOrigin ? 1 : 0.5}
                            fill="hsl(var(--primary))"
                            filter="url(#glow)"
                        />

                        {/* Ping animation for active cities */}
                        {activePings.includes(i) && (
                            <>
                                <circle
                                    cx={city.x}
                                    cy={city.y}
                                    r="0.5"
                                    fill="none"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="0.2"
                                    opacity="0"
                                >
                                    <animate attributeName="r" from="0.5" to="3" dur="1.5s" fill="freeze" />
                                    <animate attributeName="opacity" from="0.8" to="0" dur="1.5s" fill="freeze" />
                                </circle>

                                {/* Connection line from Sacramento */}
                                <line
                                    x1={cities[0].x}
                                    y1={cities[0].y}
                                    x2={city.x}
                                    y2={city.y}
                                    stroke="hsl(var(--primary))"
                                    strokeWidth="0.1"
                                    opacity="0"
                                    strokeDasharray="1,0.5"
                                >
                                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" fill="freeze" />
                                </line>
                            </>
                        )}
                    </g>
                ))}

                {/* Sacramento origin pulse */}
                <circle
                    cx={cities[0].x}
                    cy={cities[0].y}
                    r="0.8"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="0.15"
                >
                    <animate attributeName="r" values="0.8;2;0.8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
                </circle>
            </svg>
        </div>
    );
};

export default ThreatMap;
