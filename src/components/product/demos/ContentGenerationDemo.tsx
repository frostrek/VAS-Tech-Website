import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PenTool, FileText, Sparkles, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ContentGenerationDemo = () => {
    const { theme } = useTheme();
    const [text, setText] = useState("");
    const [isGenerating, setIsGenerating] = useState(true);

    const fullText = "Introducing our latest innovation in activewear. Designed with breathable, moisture-wicking fabrics, these performance leggings adapt to your hardest workouts while providing uncompromising comfort. Perfect for high-intensity training or casual daily wear. Feature highlights include 4-way stretch, hidden pockets, and a sustainable recycled material blend.";

    useEffect(() => {
        let isCancelled = false;
        
        const typeText = async () => {
            setIsGenerating(true);
            setText("");
            
            await new Promise(r => setTimeout(r, 1000)); // wait 1s

            for (let i = 0; i <= fullText.length; i++) {
                if (isCancelled) return;
                setText(fullText.slice(0, i));

                // Speed up typing for effect
                await new Promise(r => setTimeout(r, Math.random() * 20 + 20));
            }
            
            setIsGenerating(false);
            
            // Restart loop
            await new Promise(r => setTimeout(r, 4000));
            if (!isCancelled) {
                setText("");
                typeText();
            }
        };

        typeText();
        
        return () => { isCancelled = true; };
    }, []);

    return (
        <div className={`w-full max-w-4xl mx-auto rounded-2xl border p-6 md:p-10 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
            <div className="flex items-center justify-between mb-8">
                <h3 className={`text-xl font-bold flex items-center gap-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                    <PenTool className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#F97316]'}`} />
                    AI Content Generator
                </h3>
                
                <div className={`px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-bg text-dark-accent border border-dark-accent/20' : 'bg-white border text-[#F97316] border-[#F97316]/20'}`}>
                    <Sparkles className="w-3 h-3" />
                    Tone: Energetic & Persuasive
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Inputs area */}
                <div className="space-y-4">
                    <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                        <label className={`block text-xs font-bold uppercase mb-2 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>Product Data Input</label>
                        <div className={`space-y-2 text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            <div className="flex gap-2"><span className="text-blue-500">Name:</span> <span>Performance Leggings</span></div>
                            <div className="flex gap-2"><span className="text-blue-500">Material:</span> <span>Recycled blend</span></div>
                            <div className="flex gap-2"><span className="text-blue-500">Features:</span> <span>4-way stretch, pockets</span></div>
                        </div>
                    </div>
                    
                    <div className={`p-4 rounded-xl border flex items-center gap-3 ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                        {isGenerating ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                                <Sparkles className="w-5 h-5 text-orange-500" />
                            </motion.div>
                        ) : (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-dark-text' : 'text-gray-700'}`}>
                            {isGenerating ? 'AI is drafting content...' : 'Content generated!'}
                        </span>
                    </div>
                </div>

                {/* Editor Area */}
                <div className={`col-span-1 lg:col-span-2 rounded-xl border flex flex-col ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20 shadow-inner' : 'bg-white border-gray-200 shadow-sm'}`}>
                    <div className={`px-4 py-3 border-b flex items-center justify-between ${theme === 'dark' ? 'border-zinc-800/50 bg-dark-card' : 'border-gray-200 bg-gray-50'}`}>
                        <div className="flex gap-2">
                            <FileText className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`} />
                            <span className={`text-xs font-semibold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-600'}`}>product_description.txt</span>
                        </div>
                        <span className={`text-xs ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>Word count: {text.split(' ').filter(Boolean).length}</span>
                    </div>
                    
                    <div className="p-6 relative flex-1 min-h-[200px]">
                        <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-dark-text' : 'text-gray-800'}`}>
                            {text}
                            {isGenerating && (
                                <motion.span 
                                    animate={{ opacity: [1, 0] }} 
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className={`inline-block w-2h-5 ml-1 align-middle ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#F97316]'}`}
                                    style={{ width: '8px', height: '1.2em' }}
                                />
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentGenerationDemo;
