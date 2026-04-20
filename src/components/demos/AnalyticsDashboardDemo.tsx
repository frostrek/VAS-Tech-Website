import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BarChart3, ChevronRight, Activity } from 'lucide-react';

const AnalyticsDashboardDemo = () => {
    const [state, setState] = useState<'idle' | 'generating' | 'complete'>('complete');
    const [query, setQuery] = useState('Analyze 2026 revenue breakdown by quarter...');
    const [chartData, setChartData] = useState([
        { label: 'Q1', value: 45, color: '#FBBF24' },
        { label: 'Q2', value: 65, color: '#F59E0B' },
        { label: 'Q3', value: 30, color: '#F97316' },
        { label: 'Q4', value: 85, color: '#EA580C' },
    ]);

    const handleGenerate = () => {
        if (!query.trim() || state === 'generating') return;
        setState('generating');
        // Randomize data to simulate new query response
        setTimeout(() => {
            setChartData([
                { label: 'R1', value: Math.floor(Math.random() * 80) + 10, color: '#FBBF24' },
                { label: 'R2', value: Math.floor(Math.random() * 80) + 10, color: '#F59E0B' },
                { label: 'R3', value: Math.floor(Math.random() * 80) + 10, color: '#F97316' },
                { label: 'R4', value: Math.floor(Math.random() * 80) + 10, color: '#EA580C' },
            ]);
            setState('complete');
        }, 1500);
    };

    // Data is now in state

    return (
        <div className="w-full bg-[#111110] border border-orange-500/20 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Top Bar */}
            <div className="h-12 bg-[#0A0A0A] border-b border-orange-500/10 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-orange-500" />
                    <span className="text-xs font-bold text-zinc-300">Neural Analytics UI</span>
                </div>

            </div>

            <div className="p-4 sm:p-6 bg-[#111110]">
                {/* Prompt Input Box */}
                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Sparkles size={16} className="text-orange-400" />
                    </div>
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                        placeholder="Type a natural language query..."
                        className="w-full bg-[#050505] border border-orange-500/30 text-zinc-200 rounded-xl py-3 pl-10 pr-28 text-sm outline-none transition-colors focus:border-orange-500 focus:shadow-[0_0_15px_rgba(249,115,22,0.1)]"
                    />
                    
                    <button
                        onClick={handleGenerate}
                        disabled={state === 'generating' || !query.trim()}
                        className={`absolute inset-y-1.5 right-1.5 px-4 rounded-lg text-[11px] font-black uppercase tracking-wider flex items-center gap-1 transition-all
                            ${(state === 'generating' || !query.trim())
                                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                : 'bg-supportiq-button text-black hover:scale-105 shadow-[0_0_15px_rgba(249,115,22,0.3)] cursor-pointer'
                            }
                        `}
                    >
                        {state === 'generating' ? '...' : (
                            <>Generate <ChevronRight size={14} /></>
                        )}
                    </button>
                </div>

                {/* Content Canvas */}
                <div className="h-[250px] w-full bg-[#0A0A0A] rounded-xl border border-zinc-900/50 p-4 relative overflow-hidden flex items-end justify-center pb-8">
                    
                    <AnimatePresence mode="wait">
                        {state === 'idle' && (
                            <motion.div 
                                key="idle"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 gap-3"
                            >
                                <Activity size={32} className="opacity-20" />
                                <span className="text-xs uppercase tracking-widest font-black">Awaiting Query</span>
                            </motion.div>
                        )}

                        {state === 'generating' && (
                            <motion.div 
                                key="generating"
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                            >
                                <div className="w-16 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                                    <motion.div 
                                        className="absolute inset-y-0 left-0 bg-orange-500 w-1/2"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                    />
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.2em] font-black text-orange-400 animate-pulse">Querying Database...</span>
                            </motion.div>
                        )}

                        {state === 'complete' && (
                            <motion.div 
                                key="complete"
                                className="w-full max-w-sm flex items-end justify-between gap-2 sm:gap-4 h-full pt-8 relative z-10"
                            >
                                {/* Grid lines background */}
                                <div className="absolute inset-0 flex flex-col justify-between border-l border-b border-zinc-800/50 z-0 pb-6 pointer-events-none">
                                    <div className="w-full h-px bg-zinc-800/30" />
                                    <div className="w-full h-px bg-zinc-800/30" />
                                    <div className="w-full h-px bg-zinc-800/30" />
                                    <div className="w-full h-px bg-zinc-800/30" />
                                </div>

                                {/* Bars */}
                                {chartData.map((data, i) => (
                                    <div key={data.label} className="w-full h-full flex flex-col items-center justify-end gap-3 z-10">
                                        <div className="text-[10px] font-bold text-zinc-400 opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
                                            ${data.value}M
                                        </div>
                                        <div className="w-full h-full bg-[#1A1A1A] rounded-t-sm relative flex items-end justify-center group">
                                            <motion.div 
                                                className="w-full rounded-t-sm relative overflow-hidden cursor-pointer"
                                                initial={{ height: 0 }}
                                                animate={{ height: `${data.value}%` }}
                                                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                                style={{ backgroundColor: data.color }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/20 transition-opacity" />
                                            </motion.div>
                                        </div>
                                        <div className="text-xs font-black text-zinc-500 uppercase">{data.label}</div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboardDemo;
