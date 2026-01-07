import React, { useEffect, useState, useRef } from 'react';

// Define the available states for the character
export type CharacterState = 'idle' | 'run' | 'eat';

interface SpriteCharacterProps {
    state: CharacterState;
    className?: string;
}

// Config for each animation state
const ANIMATION_CONFIG: Record<CharacterState, {
    src: string;
    frames: number;
    fps: number;
    loop: boolean;
}> = {
    run: { src: '/cat_run_strip.png', frames: 6, fps: 12, loop: true },
    idle: { src: '/cat_idle_strip.png', frames: 4, fps: 6, loop: true },
    eat: { src: '/cat_eat_strip.png', frames: 4, fps: 8, loop: true },
};

const SpriteCharacter: React.FC<SpriteCharacterProps> = ({ state, className }) => {
    const [frameIndex, setFrameIndex] = useState(0);
    const config = ANIMATION_CONFIG[state];
    const lastUpdateRef = useRef(0);
    const frameRef = useRef(0);

    useEffect(() => {
        // Reset frame when state changes
        setFrameIndex(0);
        frameRef.current = 0;
        lastUpdateRef.current = performance.now();
    }, [state]);

    useEffect(() => {
        let animationFrameId: number;

        const animate = (time: number) => {
            const delta = time - lastUpdateRef.current;
            const interval = 1000 / config.fps;

            if (delta > interval) {
                frameRef.current = (frameRef.current + 1) % config.frames;
                setFrameIndex(frameRef.current);
                lastUpdateRef.current = time - (delta % interval);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [config]);

    // Calculate background position
    // CSS sprites with N frames: position = index * (100 / (N - 1))%
    // This aligns the specific frame to the viewport
    const xPos = config.frames > 1 ? (frameIndex * (100 / (config.frames - 1))) : 0;

    // Size: 
    // Width = N * 100% (effectively zooms in so 1 frame = 100% container width)
    // Height = Auto (maintains source aspect ratio, which is 1:1 for 1024x1024)
    // Position Y = 50% (centers the sprite strip since it's in the middle of the 1024px height)
    const backgroundSize = `${config.frames * 100}% auto`;
    const backgroundPosition = `${xPos}% 50%`;

    return (
        <div
            className={`image-pixelated blend-screen ${className}`}
            style={{
                width: '96px', // Fixed display size (w-24)
                height: '96px', // Fixed display size (h-24)
                backgroundImage: `url(${config.src})`,
                backgroundPosition: backgroundPosition,
                backgroundSize: backgroundSize,
                backgroundRepeat: 'no-repeat',
            }}
            aria-label={`Hacker Cat ${state}`}
        >
            {/* Preload images to prevent flickering */}
            <div className="hidden">
                <img src="/cat_run_strip.png" alt="" />
                <img src="/cat_idle_strip.png" alt="" />
                <img src="/cat_eat_strip.png" alt="" />
            </div>
        </div>
    );
};

export default SpriteCharacter;
