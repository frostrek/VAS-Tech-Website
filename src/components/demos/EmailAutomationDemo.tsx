import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Send, User, ChevronLeft, MoreHorizontal, Bot } from 'lucide-react';

const EmailAutomationDemo = () => {
    const [state, setState] = useState<'reading' | 'drafting' | 'drafted' | 'sent'>('reading');
    const [typedText, setTypedText] = useState('');

    const fullDraft = `Hi Sarah,\n\nThank you for reaching out regarding the CS pipeline automation.\n\nBased on your volume, I recommend our multi-agent tier which can reduce ticket load by 60%. I've attached a high-level proposal and pricing sheet for your review.\n\nAvailable for a quick sync this Thursday?\n\nBest,\nVAS AI Agent`;

    const handleDraft = () => {
        setState('drafting');
        setTimeout(() => {
            setState('drafted');
        }, 1500);
    };

    const handleSend = () => {
        setState('sent');
        setTimeout(() => {
            setState('reading');
            setTypedText('');
        }, 3000);
    };

    useEffect(() => {
        if (state === 'drafted') {
            let i = 0;
            const interval = setInterval(() => {
                setTypedText(fullDraft.slice(0, i));
                i++;
                if (i > fullDraft.length) clearInterval(interval);
            }, 10);
            return () => clearInterval(interval);
        }
    }, [state, fullDraft]);

    return (
        <div className="w-full bg-[#111110] border border-orange-500/20 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col font-sans h-[400px]">
            {/* Header: Mock Mail Client */}
            <div className="h-12 bg-[#0A0A0A] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
                <div className="flex items-center gap-3 text-zinc-400">
                    <ChevronLeft size={18} className="hover:text-white cursor-not-allowed" />
                    <span className="text-xs font-semibold">Inbox (1 new)</span>
                </div>
                <div className="flex items-center gap-3">
                    <Mail size={16} className="text-zinc-500" />
                    <MoreHorizontal size={16} className="text-zinc-500" />
                </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#050505]">
                {/* Incoming Email */}
                {state !== 'sent' ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                                <User size={18} className="text-zinc-400" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-zinc-200">Sarah Jenkins</h4>
                                <p className="text-xs text-zinc-500">sarah@enterprise.com • 10:42 AM</p>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">Subject: CS Pipeline Automation Proposal</h3>
                        <div className="text-sm text-zinc-400 leading-relaxed">
                            <p>Hi VAS Team,</p>
                            <p className="mt-2">We are currently evaluating automation vendors to handle our Tier 1 customer support pipeline. We have about 10,000 monthly tickets.</p>
                            <p className="mt-2">Could you send over a high-level proposal and pricing for your multi-agent routing solution? Looking to move fast on this.</p>
                            <p className="mt-2">Thanks,<br/>Sarah</p>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                            <Send size={24} className="text-green-500 ml-1" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">Reply Sent!</h3>
                            <p className="text-sm text-zinc-500">AI successfully handled the lead.</p>
                        </div>
                    </motion.div>
                )}

                {/* AI Action Area */}
                {state === 'reading' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 pt-6 border-t border-zinc-800">
                        <button 
                            onClick={handleDraft}
                            className="bg-supportiq-button px-5 py-2.5 rounded-lg text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.3)]"
                        >
                            <Sparkles size={16} /> Auto-Draft Reply
                        </button>
                    </motion.div>
                )}

                {/* AI Processing */}
                {state === 'drafting' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 pt-6 border-t border-zinc-800 flex items-center gap-3">
                        <Bot size={20} className="text-orange-500 animate-bounce" />
                        <span className="text-xs text-orange-400 font-bold uppercase tracking-widest animate-pulse">Analyzing context & drafting...</span>
                    </motion.div>
                )}

                {/* AI Draft Result */}
                {state === 'drafted' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border border-orange-500/30 rounded-xl overflow-hidden bg-[#0A0A0A]">
                        <div className="bg-orange-500/10 px-4 py-2 border-b border-orange-500/20 flex items-center gap-2">
                            <Sparkles size={14} className="text-orange-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">AI Generated Draft</span>
                        </div>
                        <div className="p-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {typedText}
                            <span className="inline-block w-1.5 h-4 bg-orange-500 ml-1 animate-pulse align-middle" />
                        </div>
                        {typedText === fullDraft && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-[#111110] border-t border-orange-500/20 flex justify-end gap-3">
                                <button onClick={() => setState('reading')} className="text-xs text-zinc-500 hover:text-white font-bold uppercase tracking-widest">Discard</button>
                                <button onClick={handleSend} className="bg-supportiq-button px-4 py-2 rounded-lg text-black text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:scale-105 transition-transform">
                                    Send <Send size={14} />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default EmailAutomationDemo;
