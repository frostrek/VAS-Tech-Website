import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BarChart3, TrendingUp, Sparkles, PieChart, Activity } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const QUERIES = [
    "Show me monthly revenue for Q3 by region",
    "Compare ad spend vs customer acquisition cost",
    "What is the churn rate for Enterprise accounts?"
];

const AnalyticsNLPDemo = () => {
    const { theme } = useTheme();
    const [queryIdx, setQueryIdx] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        let isCancelled = false;
        
        const runCycle = async () => {
            if (isCancelled) return;
            
            // 1. Reset
            setShowChart(false);
            setDisplayedText("");
            setIsGenerating(false);
            
            await new Promise(r => setTimeout(r, 1000));
            
            // 2. Type out query
            const targetText = QUERIES[queryIdx];
            for (let i = 0; i <= targetText.length; i++) {
                if (isCancelled) return;
                setDisplayedText(targetText.slice(0, i));
                await new Promise(r => setTimeout(r, 50));
            }
            
            // 3. Generate
            if (isCancelled) return;
            setIsGenerating(true);
            await new Promise(r => setTimeout(r, 1500));
            
            // 4. Show Chart
            if (isCancelled) return;
            setIsGenerating(false);
            setShowChart(true);
            
            // 5. Wait before next
            await new Promise(r => setTimeout(r, 4000));
            
            if (!isCancelled) {
                setQueryIdx((prev) => (prev + 1) % QUERIES.length);
            }
        };

        runCycle();

        return () => { isCancelled = true; };
    }, [queryIdx]);

    return (
        <div className={`w-full rounded-2xl border p-6 md:p-10 ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
            
            {/* MVP Search Bar */}
            <div className={`relative flex items-center p-4 rounded-xl border shadow-lg mb-10 transition-colors ${theme === 'dark' ? 'bg-dark-card border-dark-accent/30' : 'bg-white border-[#B07552]/30'}`}>
                <Search className={`w-6 h-6 mr-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                <div className={`text-lg md:text-xl font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'} flex-1`}>
                    {displayedText}
                    <motion.span 
                        animate={{ opacity: [1, 0] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className={theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}
                    >
                        |
                    </motion.span>
                </div>
                {isGenerating && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-sm font-bold absolute right-4">
                        <Sparkles className="w-4 h-4 animate-spin" /> Generating SQL...
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className={`w-full h-[300px] rounded-xl border flex items-center justify-center relative overflow-hidden ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/10' : 'bg-white border-gray-200'}`}>
                
                <AnimatePresence mode="wait">
                    {!showChart && !isGenerating && (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className={`flex flex-col items-center gap-3 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}
                        >
                            <BarChart3 className="w-12 h-12 opacity-50" />
                            <p>Ask a question to generate a dashboard</p>
                        </motion.div>
                    )}

                    {isGenerating && (
                        <motion.div 
                            key="generating"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="flex gap-2">
                                <motion.div animate={{ height: [10, 30, 10] }} transition={{ repeat: Infinity, duration: 1 }} className={`w-3 rounded-full ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`} />
                                <motion.div animate={{ height: [10, 40, 10] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className={`w-3 rounded-full ${theme === 'dark' ? 'bg-dark-accent/70' : 'bg-[#B07552]/70'}`} />
                                <motion.div animate={{ height: [10, 20, 10] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className={`w-3 rounded-full ${theme === 'dark' ? 'bg-dark-accent/40' : 'bg-[#B07552]/40'}`} />
                            </div>
                            <span className={`text-sm ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Building visuals...</span>
                        </motion.div>
                    )}

                    {showChart && (
                        <motion.div 
                            key="chart"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }}
                            className="w-full h-full p-6 flex flex-col"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>Auto-Generated Insight</h4>
                                <div className="flex gap-2">
                                    <div className={`p-2 rounded border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}><TrendingUp className="w-4 h-4 text-green-500" /></div>
                                    <div className={`p-2 rounded border ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}><PieChart className="w-4 h-4 text-blue-500" /></div>
                                </div>
                            </div>
                            
                            {/* Mock Chart Area */}
                            <div className="flex-1 flex items-end gap-2 md:gap-4 px-4 pb-4 border-b border-l border-gray-500/30">
                                {/* Generate random bars based on queryIdx to simulate different charts */}
                                {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(h * (queryIdx + 1)) % 100 + 20}%` }}
                                        transition={{ duration: 0.8, delay: i * 0.05, type: "spring" }}
                                        className={`flex-1 rounded-t-sm relative group ${theme === 'dark' ? 'bg-gradient-to-t from-dark-accent/20 to-dark-accent' : 'bg-gradient-to-t from-[#B07552]/20 to-[#B07552]'}`}
                                    >
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold bg-black text-white px-2 py-1 rounded">
                                            {Math.floor(Math.random() * 50) + 10}k
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex justify-between mt-2 text-xs text-gray-500 font-mono">
                                <span>Jan</span>
                                <span>Feb</span>
                                <span>Mar</span>
                                <span>Apr</span>
                                <span>May</span>
                                <span>Jun</span>
                                <span>Jul</span>
                                <span>Aug</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
};

export default AnalyticsNLPDemo;
