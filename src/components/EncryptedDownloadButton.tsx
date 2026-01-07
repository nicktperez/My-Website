import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EncryptedDownloadButton = ({ href, fileName = "Resume.pdf" }: { href: string, fileName?: string }) => {
    const [status, setStatus] = useState<'locked' | 'decrypting' | 'unlocked'>('locked');
    const [progress, setProgress] = useState(0);

    const handleDownload = () => {
        if (status !== 'locked') return;

        setStatus('decrypting');
        let p = 0;
        const interval = setInterval(() => {
            p += 5;
            if (p > 100) {
                clearInterval(interval);
                setStatus('unlocked');

                // Trigger actual download after delay
                setTimeout(() => {
                    const link = document.createElement('a');
                    link.href = href;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Reset after a while
                    setTimeout(() => setStatus('locked'), 3000);
                }, 500);
            }
            setProgress(p);
        }, 50);
    };

    return (
        <button
            onClick={handleDownload}
            disabled={status === 'decrypting'}
            className="relative group overflow-hidden bg-primary/5 hover:bg-primary/10 border border-primary/30 text-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest transition-all w-64 h-12 flex items-center justify-center"
        >
            <AnimatePresence mode='wait'>
                {status === 'locked' && (
                    <motion.div
                        key="locked"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-3"
                    >
                        <Lock size={14} className="group-hover:animate-pulse" />
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-[10px]">CLASSIFIED ASSETS</span>
                            <span className="text-[8px] opacity-50">(DOWNLOAD RESUME)</span>
                        </div>
                    </motion.div>
                )}

                {status === 'decrypting' && (
                    <motion.div
                        key="decrypting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-primary/10"
                    >
                        <div className="w-full h-full absolute inset-0 bg-primary/10" style={{ width: `${progress}%`, transition: 'width 50ms linear' }} />
                        <span className="relative z-10 animate-pulse">Decrypting... {progress}%</span>
                    </motion.div>
                )}

                {status === 'unlocked' && (
                    <motion.div
                        key="unlocked"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 text-primary drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
                    >
                        <Unlock size={14} />
                        <span>Access Granted</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary/50" />
        </button>
    );
};

export default EncryptedDownloadButton;
