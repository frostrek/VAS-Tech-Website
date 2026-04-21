import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CheckCircle2, Scan } from 'lucide-react';

const InvoiceAIOcrDemo = () => {
    const [state, setState] = useState<'idle' | 'scanning' | 'complete'>('idle');
    const [fileName, setFileName] = useState<string>('invoice.pdf');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadClick = () => {
        if (state !== 'idle') return;
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
            setState('scanning');
            setTimeout(() => setState('complete'), 2500);
        }
    };

    const handleUpload = () => {
        setState('scanning');
        setTimeout(() => setState('complete'), 2500);
    };

    const handleReset = () => {
        setState('idle');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full bg-[#111110] border border-orange-500/20 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            {/* Window Bar */}
            <div className="h-10 bg-[#0A0A0A] border-b border-orange-500/10 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Document Processing Model v2.4</span>
            </div>

            <div className="p-4 sm:p-6 relative min-h-[300px] flex items-center justify-center bg-[#111110]">
                <AnimatePresence mode="wait">
                    {state === 'idle' && (
                        <motion.div 
                            key="idle"
                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                            className="w-full flex justify-center"
                        >
                            <button 
                                onClick={handleUploadClick}
                                className="w-full max-w-sm flex flex-col items-center gap-4 py-12 px-6 rounded-xl border-2 border-dashed border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 transition-colors group cursor-pointer"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-orange-500/20 flex items-center justify-center drop-shadow-[0_0_15px_rgba(249,115,22,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-all">
                                    <Upload className="text-orange-400" />
                                </div>
                                <div className="text-center">
                                    <h4 className="font-bold text-zinc-200 mb-1">Upload Sample Invoice</h4>
                                    <p className="text-[11px] text-zinc-500 uppercase tracking-widest font-black">Interactive Demo</p>
                                </div>
                            </button>
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                className="hidden" 
                                accept=".pdf,.png,.jpg,.jpeg" 
                                onChange={handleFileChange}
                            />
                        </motion.div>
                    )}

                    {(state === 'scanning' || state === 'complete') && (
                        <motion.div 
                            key="processing"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="w-full flex flex-col sm:flex-row gap-4 h-[300px] sm:h-[250px]"
                        >
                            {/* Left: The Document Mockup */}
                            <div className="flex-1 relative bg-[#EFEFEF] border rounded-lg overflow-hidden p-4 shadow-inner">
                                <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-300">
                                    <div className="w-1/3 h-4 bg-zinc-300 rounded" />
                                    <div className="w-1/4 h-4 bg-zinc-300 rounded" />
                                </div>
                                <div className="space-y-3">
                                    <div className="w-full h-6 bg-zinc-200 rounded" />
                                    <div className="w-full h-6 bg-zinc-200 rounded" />
                                    <div className="w-3/4 h-6 bg-zinc-200 rounded" />
                                </div>
                                <div className="absolute bottom-4 right-4 w-1/3 h-6 bg-orange-200 border border-orange-300 rounded" />

                                {state === 'scanning' && (
                                    <motion.div 
                                        className="absolute left-0 right-0 h-[2px] bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,1)] z-10"
                                        animate={{ top: ['0%', '100%', '0%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-500/20 h-10 -top-10" />
                                    </motion.div>
                                )}
                            </div>

                            {/* Right: The Extracted JSON Data */}
                            <div className="flex-1 bg-[#050505] border border-orange-500/20 rounded-lg p-4 font-mono text-[11px] overflow-y-auto overscroll-contain relative shadow-inner">
                                {state === 'scanning' ? (
                                    <div className="h-full flex flex-col items-center justify-center gap-3 text-orange-400">
                                        <Scan className="animate-[spin_3s_linear_infinite] w-8 h-8" />
                                        <span className="animate-pulse tracking-widest uppercase font-black text-[9px]">Extracting OCR...</span>
                                    </div>
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-zinc-300"
                                    >
                                        <div className="flex justify-between items-center mb-3 pb-2 border-b border-zinc-800">
                                            <span className="text-orange-400 font-sans font-bold flex items-center gap-1 text-xs"><CheckCircle2 size={12}/> 99.8% Confidence</span>
                                            <button onClick={handleReset} className="text-zinc-500 hover:text-white font-sans text-[10px] underline hover:no-underline cursor-pointer">Reset</button>
                                        </div>
                                        <span className="text-orange-300">&#123;</span>
                                        <div className="pl-4 space-y-1 my-1">
                                            <div><span className="text-blue-400">"sourceFile"</span>: <span className="text-green-400">"{fileName}"</span>,</div>
                                            <div><span className="text-blue-400">"vendorName"</span>: <span className="text-green-400">"Acme Corp Ltd"</span>,</div>
                                            <div><span className="text-blue-400">"invoiceDate"</span>: <span className="text-green-400">"2026-04-18"</span>,</div>
                                            <div><span className="text-blue-400">"totalAmount"</span>: <span className="text-amber-400">4250.00</span>,</div>
                                            <div><span className="text-blue-400">"currency"</span>: <span className="text-green-400">"USD"</span>,</div>
                                            <div><span className="text-blue-400">"lineItems"</span>: <span className="text-orange-300">[</span></div>
                                            <div className="pl-4">
                                                <div><span className="text-orange-300">&#123;</span> <span className="text-blue-400">"item"</span>: <span className="text-green-400">"Server Rack CPU"</span>,<br className="sm:hidden" /> <span className="text-blue-400">"qty"</span>: <span className="text-amber-400">2</span> <span className="text-orange-300">&#125;</span></div>
                                            </div>
                                            <div><span className="text-orange-300">]</span></div>
                                        </div>
                                        <span className="text-orange-300">&#125;</span>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InvoiceAIOcrDemo;
