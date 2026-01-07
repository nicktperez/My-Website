import { useEffect, useState } from 'react';

const ThreatMap = () => {
    // Generate some random "active" grid cells for subtle blinking
    const [blinkingCells, setBlinkingCells] = useState<{ x: number, y: number }[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const count = 3;
            const newCells = [];
            for (let i = 0; i < count; i++) {
                newCells.push({
                    x: Math.floor(Math.random() * 20) * 5, // Snap to grid (5%)
                    y: Math.floor(Math.random() * 20) * 5
                });
            }
            setBlinkingCells(newCells);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
            <svg
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <pattern id="grid-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                    </pattern>
                </defs>

                {/* Base Grid */}
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />

                {/* Subtle Moving Scanlines */}
                <rect width="100%" height="2" fill="currentColor" className="text-primary opacity-20">
                    <animate attributeName="y" from="0%" to="100%" dur="15s" repeatCount="indefinite" />
                </rect>
                <rect width="100%" height="1" fill="currentColor" className="text-primary opacity-20">
                    <animate attributeName="y" from="0%" to="100%" dur="23s" repeatCount="indefinite" />
                </rect>

                {/* Random Blinking Intersections */}
                {blinkingCells.map((cell, i) => (
                    <rect
                        key={i}
                        x={`${cell.x}%`}
                        y={`${cell.y}%`}
                        width="1"
                        height="1"
                        fill="currentColor"
                        className="text-primary"
                    >
                        <animate attributeName="opacity" values="0;0.5;0" dur="2s" />
                    </rect>
                ))}
            </svg>

            {/* Radial Fade to make it subtle at edges */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_90%)]" />
        </div>
    );
};

export default ThreatMap;
