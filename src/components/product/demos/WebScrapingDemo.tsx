import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Code, CheckCircle, ArrowRight, Table } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const HTML_LINES = [
    '<div class="product-card">',
    '  <h2 class="title">Wireless Noise-Canceling P...</h2>',
    '  <span class="price" data-currency="USD">$249.99</span>',
    '  <span class="in-stock true">In Stock (42)</span>',
    '  <div class="reviews"><span class="stars">4.8</span></div>',
    '</div>'
];

const WebScrapingDemo = () => {
    const { theme } = useTheme();
    const [scanLine, setScanLine] = useState(0);
    const [extractedData, setExtractedData] = useState<any[]>([]);

    useEffect(() => {
        let isCancelled = false;

        const runCycle = async () => {
            if (isCancelled) return;
            
            // Wait before starting a scan
            await new Promise(r => setTimeout(r, 1000));
            
            // Scan lines
            for (let i = 0; i < HTML_LINES.length; i++) {
                if (isCancelled) return;
                setScanLine(i);
                await new Promise(r => setTimeout(r, 400));
            }

            // Extract data
            if (isCancelled) return;
            setExtractedData(prev => [
                { id: `SKU-${Math.floor(Math.random() * 10000)}`, name: 'Wireless Headphones', price: '$249.99', stock: 42, rating: 4.8 },
                ...prev
            ].slice(0, 3)); // keep last 3

            // Reset scanner
            await new Promise(r => setTimeout(r, 1000));
            if (!isCancelled) setScanLine(-1);
            
            // Loop
            if (!isCancelled) runCycle();
        };

        runCycle();

        return () => { isCancelled = true; };
    }, []);

    return (
        <div className={`w-full max-w-5xl mx-auto rounded-2xl border p-6 md:p-8 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                <Search className={`w-6 h-6 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                Live Data Extraction Engine
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Visualizer: HTML Source */}
                <div className={`relative rounded-xl border overflow-hidden flex flex-col ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                    <div className={`px-4 py-2 border-b flex items-center justify-between font-mono text-xs ${theme === 'dark' ? 'bg-[#151515] border-dark-accent/20 text-dark-text-muted' : 'bg-gray-100 border-gray-200 text-gray-500'}`}>
                        <div className="flex items-center gap-2">
                            <Code className="w-4 h-4" /> target_site_dom.html
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                        </div>
                    </div>
                    
                    <div className="p-4 font-mono text-xs leading-loose relative flex-1">
                        {HTML_LINES.map((line, idx) => (
                            <div key={idx} className={`relative z-10 transition-colors ${scanLine === idx ? (theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552] font-bold') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-400')}`}>
                                {line}
                            </div>
                        ))}

                        {/* Scanner Bar */}
                        {scanLine >= 0 && (
                            <motion.div
                                animate={{ top: `${(scanLine / HTML_LINES.length) * 100}%` }}
                                transition={{ type: "tween", duration: 0.1 }}
                                className={`absolute left-0 right-0 h-8 -mt-1 z-0 ${theme === 'dark' ? 'bg-dark-accent/10 border-l-2 border-dark-accent' : 'bg-[#B07552]/10 border-l-2 border-[#B07552]'}`}
                            />
                        )}
                    </div>
                </div>

                {/* Extracted Data Table */}
                <div className={`rounded-xl border flex flex-col ${theme === 'dark' ? 'bg-[#0a0a0a] border-dark-accent/20' : 'bg-white border-gray-200'}`}>
                    <div className={`px-4 py-2 flex items-center gap-2 border-b ${theme === 'dark' ? 'border-dark-accent/20 bg-dark-accent/5' : 'border-[#B07552]/20 bg-[#B07552]/5'}`}>
                        <Database className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`}>Structured Output</span>
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-end">
                        <div className="space-y-3">
                            <AnimatePresence>
                                {extractedData.length === 0 && (
                                    <div className={`text-sm text-center py-10 ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-400'}`}>
                                        Waiting for scraper to complete cycle...
                                    </div>
                                )}
                                {extractedData.map((data, idx) => (
                                    <motion.div
                                        key={data.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`p-3 rounded-lg border text-sm grid grid-cols-4 gap-2 items-center ${theme === 'dark' ? 'bg-[#151515] border-dark-accent/10 text-dark-text' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                                    >
                                        <div className="col-span-2 font-medium flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            {data.name}
                                        </div>
                                        <div className="text-right font-mono text-green-500">{data.price}</div>
                                        <div className="text-right text-xs">Stock: {data.stock}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={`mt-6 flex justify-between items-center text-xs font-mono border-t pt-4 ${theme === 'dark' ? 'border-dark-accent/20 text-dark-text-muted' : 'border-gray-200 text-gray-500'}`}>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse bg-green-500" />
                    Status: Tracking 50,000 URLs
                </div>
                <div>Format: JSON/API</div>
            </div>
        </div>
    );
};

export default WebScrapingDemo;
