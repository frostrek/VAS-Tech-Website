import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Sparkles, MessageSquare, ArrowRight, Check } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const DOC_TEXT = [
    "ACME CORP EMPLOYEE HANDBOOK",
    "Section 4.1: Remote Work Policy",
    "Employees are eligible for remote work up to 3 days per week after completing their 90-day probationary period.",
    "Requests for fully remote work must be approved by the department VP.",
    "Section 4.2: Equipment Allowance",
    "A one-time stipend of $500 is provided for home office equipment upon passing probation."
];

const KnowledgeBotDemo = () => {
    const { theme } = useTheme();
    const [step, setStep] = useState(0);

    useEffect(() => {
        let isCancelled = false;
        const sequence = async () => {
            if (isCancelled) return;
            
            // 0: Reset
            setStep(0);
            await new Promise(r => setTimeout(r, 1500));
            // 1: User asks query
            if (!isCancelled) setStep(1);
            await new Promise(r => setTimeout(r, 1500));
            // 2: Searching DB
            if (!isCancelled) setStep(2);
            await new Promise(r => setTimeout(r, 1500));
            // 3: Highlight Doc
            if (!isCancelled) setStep(3);
            await new Promise(r => setTimeout(r, 1000));
            // 4: Final Answer
            if (!isCancelled) setStep(4);
            
            await new Promise(r => setTimeout(r, 4000));
            if (!isCancelled) sequence();
        };

        sequence();
        return () => { isCancelled = true; };
    }, []);

    return (
        <div className={`w-full max-w-5xl mx-auto rounded-2xl border overflow-hidden flex flex-col md:flex-row ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}>
            
            {/* Left: Chat Interface */}
            <div className={`flex-1 p-6 border-b md:border-b-0 md:border-r flex flex-col ${theme === 'dark' ? 'border-dark-accent/20 bg-[#0a0a0a]' : 'border-gray-200 bg-gray-50'}`}>
                <h3 className={`text-lg font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                    <MessageSquare className={`w-5 h-5 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                    Internal Helpdesk Bot
                </h3>

                <div className="flex-1 space-y-4">
                    <AnimatePresence>
                        {step >= 1 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-end">
                                <div className={`p-3 rounded-xl rounded-tr-none text-sm max-w-[85%] ${theme === 'dark' ? 'bg-dark-accent text-dark-bg' : 'bg-[#B07552] text-white'}`}>
                                    What is our budget for home office equipment?
                                </div>
                            </motion.div>
                        )}
                        
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex gap-2 items-center text-xs text-blue-500 font-mono mt-4">
                                <Search className="w-3 h-3 animate-pulse" /> Performing semantic search across 10,000+ docs...
                            </motion.div>
                        )}

                        {step >= 4 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                                <div className={`p-4 rounded-xl rounded-tl-none text-sm max-w-[90%] border ${theme === 'dark' ? 'bg-[#151515] border-dark-accent/20 text-dark-text' : 'bg-white border-gray-200 text-gray-800'}`}>
                                    <p className="mb-2">According to the <strong>Employee Handbook (Section 4.2)</strong>:</p>
                                    <p className="mb-3">You are eligible for a one-time stipend of $500 for home office equipment after completing your 90-day probationary period.</p>
                                    <div className="flex items-center gap-1.5 text-xs text-green-500 font-medium bg-green-500/10 w-max px-2 py-1 rounded">
                                        <Check className="w-3 h-3" /> Citation Validated
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right: RAG Visualization */}
            <div className={`flex-1 p-6 flex flex-col ${theme === 'dark' ? 'bg-dark-bg' : 'bg-white'}`}>
                <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-sm font-bold uppercase tracking-wider flex items-center gap-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                        <BookOpen className="w-4 h-4" /> Enterprise Knowledge Base
                    </h3>
                    <Sparkles className={`w-4 h-4 ${step >= 2 ? 'text-orange-500 animate-spin' : 'text-gray-400'}`} />
                </div>

                <div className={`flex-1 rounded-xl border p-6 font-serif text-sm leading-relaxed ${theme === 'dark' ? 'bg-[#1a1a1a] border-dark-accent/20 text-gray-400' : 'bg-[#fafafa] border-gray-200 text-gray-500'}`}>
                    {DOC_TEXT.map((line, idx) => {
                        const isTitle = idx === 0;
                        const isHeader = line.includes('Section');
                        const isTarget = idx === 5; // The $500 stipend line
                        
                        return (
                            <div key={idx} className={`mb-3 ${isTitle ? 'text-center font-bold text-lg mb-6 tracking-widest' : ''} ${isHeader ? 'font-bold mt-4' : ''}`}>
                                <span className={`transition-all duration-500 ${step >= 3 && isTarget ? (theme === 'dark' ? 'bg-orange-500/30 text-white p-1 rounded' : 'bg-yellow-200 text-black p-1 rounded font-medium shadow-[0_0_10px_rgba(250,204,21,0.5)]') : ''}`}>
                                    {line}
                                </span>
                            </div>
                        )
                    })}
                </div>
                
                <div className="mt-4 flex justify-center">
                    <div className="flex items-center text-xs text-gray-400 gap-1 font-mono">
                        RAG Engine <ArrowRight className="w-3 h-3 mx-1" /> Embeddings <ArrowRight className="w-3 h-3 mx-1" /> Vector DB
                    </div>
                </div>
            </div>

        </div>
    );
};

export default KnowledgeBotDemo;
