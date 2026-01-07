import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, FileText, CheckCircle, ExternalLink } from 'lucide-react';

interface IncidentModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: any;
}

const IncidentModal: React.FC<IncidentModalProps> = ({ isOpen, onClose, project }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
                role="dialog"
                aria-modal="true"
                aria-labelledby="incident-modal-title"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    aria-hidden="true"
                />

                {/* Modal Content - Declassified Document Style */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-3xl bg-[#0f0f11] border border-primary/40 shadow-[0_0_50px_rgba(34,197,94,0.1)] overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-primary/20 bg-primary/5">
                        <div className="flex items-center gap-3">
                            <ShieldAlert className="text-red-500 animate-pulse" size={20} aria-hidden="true" />
                            <span id="incident-modal-title" className="font-mono text-xs font-bold tracking-[0.2em] text-red-500">
                                INCIDENT_REPORT_#2026-X1 // CLASSIFIED
                            </span>
                        </div>
                        <button onClick={onClose} className="text-primary/60 hover:text-red-500 transition-colors" aria-label="Close Modal">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-8 overflow-y-auto font-mono text-sm space-y-8 relative">
                        {/* Watermark */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
                            <span className="text-[8rem] font-black uppercase -rotate-45">Confidential</span>
                        </div>

                        {/* Section 1: Target Info */}
                        <div className="grid md:grid-cols-2 gap-8 border-b border-primary/10 pb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-primary/40">Target Project</label>
                                <h2 className="text-2xl font-black uppercase text-primary leading-none">{project.title}</h2>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                                    <span className="text-xs text-yellow-500 font-bold">{project.status}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-primary/40">Clearance Level</label>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <div key={i} className={`h-1 flex-1 ${i <= 3 ? 'bg-red-500' : 'bg-red-900/30'}`} />
                                    ))}
                                    <span className="text-xs text-red-500 font-bold ml-2">LEVEL 3</span>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Briefing */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary/70">
                                <FileText size={16} />
                                <h3 className="font-bold uppercase tracking-wider">Mission Briefing</h3>
                            </div>
                            <p className="leading-relaxed text-primary/90 pl-6 border-l-2 border-primary/20">
                                {project.description}
                            </p>
                        </div>

                        {/* Section 3: Tactical Execution (Highlights) */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-primary/70">
                                <CheckCircle size={16} />
                                <h3 className="font-bold uppercase tracking-wider">Tactical Execution</h3>
                            </div>
                            <ul className="grid gap-3 pl-2">
                                {project.highlights.map((highlight: string, i: number) => (
                                    <li key={i} className="flex gap-3 text-primary/80 bg-primary/5 p-3 rounded border border-primary/10 hover:border-primary/30 transition-colors">
                                        <span className="font-mono text-primary/30 shrink-0">0{i + 1} //</span>
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Section 4: Evidence Wrapper (GitHub) */}
                        <div className="pt-8 flex justify-end">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-6 py-3 font-bold uppercase tracking-wider transition-all group"
                            >
                                <span>Inspect Source Evidence</span>
                                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>

                    </div>

                    {/* Footer - Fake Stamps */}
                    <div className="bg-black p-4 border-t border-primary/20 flex justify-between items-center text-[10px] text-primary/30 uppercase tracking-widest">
                        <div>Auth: N. Perez</div>
                        <div>Doc_ID: 884-21-99</div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default IncidentModal;
