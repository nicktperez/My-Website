import React from 'react';
import { motion } from 'framer-motion';

interface HexBadgeProps {
    title: string;
    subtitle: string;
    status?: string;
    extras?: string;
    delay?: number;
}

const HexBadge: React.FC<HexBadgeProps> = ({ title, subtitle, status, extras, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative w-full max-w-[300px] aspect-[1/1.15] flex flex-col items-center justify-center p-8 group cursor-pointer"
        >
            {/* Hexagon SVG Background */}
            <svg
                viewBox="0 0 100 115"
                className="absolute inset-0 w-full h-full fill-primary/5 stroke-primary/30 stroke-[0.5] drop-shadow-[0_0_15px_rgba(34,197,94,0.1)] transition-all duration-300 group-hover:fill-primary/10 group-hover:stroke-primary group-hover:drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]"
                preserveAspectRatio="none"
            >
                <path d="M50 0 L100 25 L100 90 L50 115 L0 90 L0 25 Z" />
            </svg>

            {/* Inner Decorative Hex */}
            <svg
                viewBox="0 0 100 115"
                className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] fill-none stroke-primary/10 stroke-[0.5] pointer-events-none"
                preserveAspectRatio="none"
            >
                <path d="M50 0 L100 25 L100 90 L50 115 L0 90 L0 25 Z" />
            </svg>

            {/* Content */}
            <div className="relative z-10 text-center space-y-3">
                {status && (
                    <div className="inline-block px-2 py-0.5 text-[8px] font-black uppercase tracking-widest bg-primary text-background rounded-sm animate-pulse mb-2">
                        {status}
                    </div>
                )}

                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase leading-tight glow-text group-hover:text-white transition-colors">
                        {title}
                    </h3>
                    <p className="text-[10px] text-primary/60 font-black uppercase tracking-widest px-2">
                        {subtitle}
                    </p>
                </div>

                {extras && (
                    <div className="pt-4 border-t border-primary/20 w-1/2 mx-auto">
                        <p className="text-[9px] italic text-primary/50 leading-tight">
                            {extras}
                        </p>
                    </div>
                )}
            </div>

            {/* Decorative corners */}
            <div className="absolute top-[25%] left-0 w-1 h-1 bg-primary/40" />
            <div className="absolute top-[25%] right-0 w-1 h-1 bg-primary/40" />
            <div className="absolute bottom-[25%] left-0 w-1 h-1 bg-primary/40" />
            <div className="absolute bottom-[25%] right-0 w-1 h-1 bg-primary/40" />
        </motion.div>
    );
};

export default HexBadge;
