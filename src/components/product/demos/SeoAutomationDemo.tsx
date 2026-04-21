import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, TrendingUp, CheckCircle, BarChart } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const SEO_STEPS = [
    { label: "Keyword Discovery", desc: "Analyzing 12,000+ SERP results..." },
    { label: "Competitor Audit", desc: "Extracting top 10 ranking domains..." },
    { label: "Content Brief", desc: "Generating semantic LSI parameters..." },
    { label: "On-Page Optimization", desc: "Applying H1/H2 and meta tags..." },
];

const SeoAutomationDemo = () => {
    const { theme } = useTheme();
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(34);

    useEffect(() => {
        let isCancelled = false;

        const runDemo = async () => {
            if (isCancelled) return;
            
            // Reset
            setCurrentStep(0);
            setScore(34);
            await new Promise(r => setTimeout(r, 1000));

            for (let i = 0; i < SEO_STEPS.length; i++) {
                if (isCancelled) return;
                setCurrentStep(i);
                
                // Animate score up
                const targetScore = i === SEO_STEPS.length - 1 ? 98 : 34 + ((i+1) * 16);
                
                for(let s = score; s <= targetScore; s+=2) {
                    if (isCancelled) return;
                    setScore(Math.min(s, 98));
                    await new Promise(r => setTimeout(r, 30));
                }
                
                await new Promise(r => setTimeout(r, 1500));
            }

            // Hold at 100%
            await new Promise(r => setTimeout(r, 3000));
            if (!isCancelled) runDemo();
        };

        runDemo();
        return () => { isCancelled = true; };
    }, []);

    // Helper for score color
    const getScoreColor = (value: number) => {
        if (value < 50) return theme === 'dark' ? 'text-red-400' : 'text-red-500';
        if (value < 85) return theme === 'dark' ? 'text-yellow-400' : 'text-yellow-500';
        return theme === 'dark' ? 'text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.2)]' : 'text-green-500 text-shadow-sm';
    };

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-2xl border p-6 md:p-8 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                <Globe className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                Programmatic SEO Pipeline
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Score Gauge */}
                <div className={`col-span-1 rounded-xl border flex flex-col items-center justify-center p-8 ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                        {/* Background circle */}
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke={theme === 'dark' ? '#333' : '#e5e7eb'} strokeWidth="8" />
                            <motion.circle 
                                cx="50" cy="50" r="45" fill="none" 
                                stroke={score < 50 ? '#ef4444' : score < 85 ? '#eab308' : '#22c55e'} 
                                strokeWidth="8" 
                                strokeLinecap="round"
                                strokeDasharray="283"
                                animate={{ strokeDashoffset: 283 - (283 * score) / 100 }}
                                transition={{ type: "spring", stiffness: 60 }}
                                className="drop-shadow-md"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-4xl font-bold font-mono transition-colors duration-300 ${getScoreColor(score)}`}>
                                {score}
                            </span>
                        </div>
                    </div>
                    <div className={`text-sm font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>
                        On-Page SEO Score
                    </div>
                </div>

                {/* Pipeline Steps */}
                <div className="col-span-1 md:col-span-2 flex flex-col justify-center space-y-4">
                    {SEO_STEPS.map((step, idx) => {
                        const isPast = currentStep > idx;
                        const isCurrent = currentStep === idx;
                        
                        return (
                            <div 
                                key={idx} 
                                className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500
                                    ${isCurrent ? (theme === 'dark' ? 'bg-dark-accent/10 border-dark-accent shadow-lg shadow-dark-accent/10 scale-[1.02]' : 'bg-[#B07552]/10 border-[#B07552] scale-[1.02]') : 'border-transparent'}
                                    ${!isCurrent && !isPast ? 'opacity-30 grayscale' : ''}
                                `}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isPast ? 'bg-green-500 text-white' : (isCurrent ? (theme === 'dark' ? 'bg-dark-accent text-dark-bg animate-pulse' : 'bg-[#B07552] text-white animate-pulse') : 'bg-gray-300 text-gray-500')}`}>
                                    {isPast ? <CheckCircle className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className={`font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>{step.label}</h4>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{step.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            
            <div className={`mt-6 p-4 rounded-xl border flex items-center justify-between ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20 text-dark-text' : 'bg-[#f8f9fa] border-gray-200 text-gray-800'}`}>
                <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium">Estimated Organic Traffic Increase:</span>
                </div>
                <span className="text-xl font-bold text-green-500">+342%</span>
            </div>
        </div>
    );
};

export default SeoAutomationDemo;
