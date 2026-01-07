import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Lock, CheckCircle, AlertTriangle } from 'lucide-react';

const ContactForm = () => {
    const [status, setStatus] = useState<'idle' | 'encrypting' | 'sent' | 'error'>('idle');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('encrypting');

        // Simulate encryption delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // Using Web3Forms (free, no signup required for basic use)
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_key: 'YOUR_ACCESS_KEY_HERE', // User needs to replace this
                    ...formData,
                    from_name: 'Portfolio Contact Form'
                })
            });

            if (response.ok) {
                setStatus('sent');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }

        // Reset status after a delay
        setTimeout(() => setStatus('idle'), 4000);
    };

    return (
        <section className="mb-24" id="contact">
            <div className="flex items-center gap-4 mb-8">
                <Lock className="text-primary" size={20} />
                <h2 className="text-xl font-black tracking-widest uppercase glow-text">Secure_Channel</h2>
            </div>

            <div className="terminal-window p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-[10px] uppercase tracking-widest text-primary/50 font-black">
                                Sender_ID
                            </label>
                            <input
                                type="text"
                                id="name"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-background border border-primary/30 px-4 py-3 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                placeholder="Your Name"
                                aria-label="Your Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-primary/50 font-black">
                                Return_Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-background border border-primary/30 px-4 py-3 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                                placeholder="your@email.com"
                                aria-label="Your Email"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-[10px] uppercase tracking-widest text-primary/50 font-black">
                            Subject_Line
                        </label>
                        <input
                            type="text"
                            id="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full bg-background border border-primary/30 px-4 py-3 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all"
                            placeholder="Job Opportunity / Collaboration / Question"
                            aria-label="Subject"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-primary/50 font-black">
                            Transmission_Body
                        </label>
                        <textarea
                            id="message"
                            required
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-background border border-primary/30 px-4 py-3 text-sm text-primary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all resize-none"
                            placeholder="Your message..."
                            aria-label="Your Message"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-[10px] text-primary/30 font-mono">
                            Protocol: TLS 1.3 // AES-256-GCM
                        </div>

                        <button
                            type="submit"
                            disabled={status !== 'idle'}
                            className="relative flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/50 text-primary font-bold uppercase tracking-widest text-xs hover:bg-primary/20 hover:border-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                            aria-label="Send Message"
                        >
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                        <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                                        Transmit
                                    </motion.span>
                                )}
                                {status === 'encrypting' && (
                                    <motion.span key="encrypting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 animate-pulse">
                                        <Lock size={14} />
                                        Encrypting...
                                    </motion.span>
                                )}
                                {status === 'sent' && (
                                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-primary">
                                        <CheckCircle size={14} />
                                        Transmitted!
                                    </motion.span>
                                )}
                                {status === 'error' && (
                                    <motion.span key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-red-500">
                                        <AlertTriangle size={14} />
                                        Failed
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
