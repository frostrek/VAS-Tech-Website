"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    BrainCircuit, Fingerprint, ScanEye, Network, Zap,
    Cpu, Infinity as InfinityIcon, Activity, CheckCircle2, Server, Power, GripHorizontal
} from "lucide-react";

const CAPABILITIES = [
    {
        id: "nlp",
        icon: BrainCircuit,
        title: "Large Language Models",
        subtitle: "Semantic intent extraction at 1.2ms latency.",
        features: ["Multi-lingual OCR", "Sentiment Analysis", "Entity Recognition"],
        metrics: { throughput: "2.4M", metric: "Tokens/sec" },
        logs: [
            "Initializing semantic router...", "Loading vector database chunks...",
            "Context window expanded to 128k.", "Analyzing unstructured payload...",
            "Intent recognized: 99.2% confidence.", "Generating conversational output..."
        ]
    },
    {
        id: "vision",
        icon: ScanEye,
        title: "Computer Vision",
        subtitle: "Real-time visual data parsing and spatial mapping.",
        features: ["Object Detection", "Biometric Validation", "Document Parsing"],
        metrics: { throughput: "99.8%", metric: "Accuracy" },
        logs: [
            "Activating camera feeds...", "Applying convolutional filters...",
            "Detecting bounding boxes in frame.", "Identifying facial landmarks...",
            "Biometric threshold met: TRUE.", "Logging visual metadata to CRM."
        ]
    },
    {
        id: "predictive",
        icon: Network,
        title: "Predictive Analytics",
        subtitle: "Forecasting operational anomalies before they occur.",
        features: ["Time-series Forecasting", "Risk Modeling", "Demand Prediction"],
        metrics: { throughput: "12ms", metric: "Latency" },
        logs: [
            "Ingesting historical data streams...", "Running regression models...",
            "Identifying time-series anomalies...", "Risk factor isolated in Node 4.",
            "Generating predictive alert...", "Dispatching mitigation protocol..."
        ]
    },
    {
        id: "autonomous",
        icon: Fingerprint,
        title: "Autonomous Agents",
        subtitle: "Self-correcting agents that execute multi-step workflows.",
        features: ["Tool Use (APIs)", "Self-Reflection", "Memory Retrieval"],
        metrics: { throughput: "100+", metric: "Parallel Tasks" },
        logs: [
            "Agent spawned: process_invoice_#992.", "Reading email attachment...",
            "Extracting vendor and line items...", "Cross-referencing ERP database...",
            "API Call: [POST] /v1/payments/approve", "Execution successful. Task closed."
        ]
    }
];

const InteractiveServicesWorkflow = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [randomSeed, setRandomSeed] = useState(0);
    const [logsOffset, setLogsOffset] = useState(0);
    
    // Interactive Overdrive System
    const [isOverdrive, setIsOverdrive] = useState(false);

    // Draggable Constraints Reference
    const consoleRef = useRef<HTMLDivElement>(null);

    // Parallax Math
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const parallaxX1 = useTransform(springX, [-500, 500], [-15, 15]);
    const parallaxY1 = useTransform(springY, [-500, 500], [-15, 15]);
    const parallaxX2 = useTransform(springX, [-500, 500], [20, -20]);
    const parallaxY2 = useTransform(springY, [-500, 500], [20, -20]);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, [mouseX, mouseY]);

    // Fast vs Normal Timers
    useEffect(() => {
        const speed = isOverdrive ? 30 : 100;
        const interval = setInterval(() => {
            setRandomSeed(Math.random());
        }, speed);
        return () => clearInterval(interval);
    }, [isOverdrive]);

    useEffect(() => {
        const speed = isOverdrive ? 400 : 2000;
        const interval = setInterval(() => {
            setLogsOffset(prev => prev + 1);
        }, speed);
        return () => clearInterval(interval);
    }, [isOverdrive]);

    const activeCap = CAPABILITIES[activeIndex];

    // Compute multiplier based on overdrive
    const TflopBase = parseFloat(activeCap.metrics.throughput) || (Math.random() * 80 + 20);
    const currentTflops = isOverdrive 
        ? (TflopBase * 4.5 + Math.random() * 10).toFixed(1) 
        : activeCap.metrics.throughput;

    return (
        <section className="py-24 md:py-32 relative bg-[#050505] overflow-hidden border-y border-white/5 flex flex-col items-center">
            {/* BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-10 bg-orange-500 transition-all duration-1000 ${isOverdrive ? 'scale-150 opacity-30 bg-red-500' : ''}`} />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-5 bg-orange-600" />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at center, white 0%, transparent 80%)' }}
                />
            </div>

            <div className="container mx-auto px-4 max-w-[1400px] relative z-10">
                {/* Header Subtitle */}
                <div className="text-center mb-16">
                    <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 shadow-[0_0_20px_rgba(249,115,22,0.15)] mb-6 backdrop-blur-md">
                        <InfinityIcon size={14} className="text-orange-400 animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase text-orange-400">
                            Neural Processing Core UI
                        </span>
                    </motion.div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight"
                    >
                        Core System <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Capabilities</span>
                    </motion.h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Total freedom simulation. <span className="text-white font-bold">Drag and drop the interface panels.</span> Inject execution payload by activating System Overdrive.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 items-center max-w-[1300px] mx-auto">
                    
                    {/* -- LEFT: SELECTOR MENU -- */}
                    <div className="flex flex-col gap-4 relative z-20">
                        {CAPABILITIES.map((cap, i) => {
                            const isActive = activeIndex === i;
                            return (
                                <button
                                    key={cap.id}
                                    onClick={() => setActiveIndex(i)}
                                    className={`relative text-left p-6 rounded-[2rem] transition-all duration-500 overflow-hidden group outline-none ${
                                        isActive 
                                            ? 'bg-[#111111]/80 backdrop-blur-xl border-orange-500/40 shadow-[0_20px_40px_-10px_rgba(249,115,22,0.2)] scale-[1.02] border' 
                                            : 'bg-transparent border border-white/5 hover:border-white/20 hover:bg-white/5'
                                    }`}
                                >
                                    {isActive && <motion.div layoutId="active-bg" className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent z-0" />}
                                    {isActive && <motion.div layoutId="active-indicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_0_15px_#f97316]" />}

                                    <div className="relative z-10 flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shrink-0 ${isActive ? 'bg-orange-500/20 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.4)]' : 'bg-black border-white/10'}`}>
                                            <cap.icon size={24} className={isActive ? 'text-orange-400' : 'text-zinc-500'} />
                                        </div>
                                        <div>
                                            <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1.5 ${isActive ? 'text-orange-400' : 'text-zinc-600'}`}>Module 0{i+1}</div>
                                            <div className={`font-serif text-xl md:text-2xl ${isActive ? 'text-white' : 'text-zinc-400'}`}>{cap.title}</div>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}

                        {/* HIGHLY INTERACTIVE OVERDRIVE BUTTON */}
                        <motion.button
                            onClick={() => setIsOverdrive(!isOverdrive)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`mt-4 w-full relative p-5 rounded-3xl border flex flex-col items-center justify-center gap-2 overflow-hidden transition-all duration-300 ${
                                isOverdrive 
                                ? 'bg-red-500/20 border-red-500/80 shadow-[0_0_40px_rgba(239,68,68,0.6)]' 
                                : 'bg-[#111] border-orange-500/20 hover:border-orange-500/60 shadow-lg'
                            }`}
                        >
                            {isOverdrive && <div className="absolute inset-0 bg-red-500/20 animate-pulse" />}
                            <Power size={28} className={isOverdrive ? 'text-red-400 animate-pulse drop-shadow-[0_0_15px_red]' : 'text-orange-400'} />
                            <span className={`text-xs font-black uppercase tracking-widest ${isOverdrive ? 'text-red-400' : 'text-orange-400'}`}>
                                {isOverdrive ? 'SYSTEM OVERDRIVE ACTIVE' : 'INJECT OVERDRIVE'}
                            </span>
                        </motion.button>
                    </div>

                    {/* -- RIGHT: 2D HUD COMMAND CENTER -- */}
                    <div ref={consoleRef} className={`relative w-full h-[550px] sm:h-[650px] md:h-[750px] rounded-[2.5rem] sm:rounded-[3rem] border shadow-2xl overflow-hidden flex transition-colors duration-1000 ${
                        isOverdrive ? 'bg-[#150202] border-red-500/40 shadow-[0_0_80px_rgba(239,68,68,0.2)]' : 'bg-[#070707] border-orange-500/20 shadow-[0_0_60px_rgba(249,115,22,0.15)]'
                    }`}>
                        
                        {/* HUD Background Layers + Parallax */}
                        <motion.div style={{ x: parallaxX1, y: parallaxY1 }} className="absolute inset-[-100px] pointer-events-none">
                             <div className={`absolute inset-0 bg-[radial-gradient(circle_at_left,_${isOverdrive ? 'rgba(239,68,68,0.15)' : 'rgba(249,115,22,0.08)'}_0%,_transparent_70%)] transition-colors duration-1000`} />
                             <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                        </motion.div>

                        {/* Top Control Bar */}
                        <div className={`absolute top-0 left-0 right-0 h-14 border-b bg-[#0A0A0A]/80 backdrop-blur-md flex items-center justify-between px-6 z-30 transition-colors duration-1000 ${isOverdrive ? 'border-red-500/40' : 'border-orange-500/20'}`}>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-orange-400/80" />
                                <div className={`w-3 h-3 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.8)] ${isOverdrive ? 'bg-red-500' : 'bg-orange-500/80 animate-pulse'}`} />
                            </div>
                            <div className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Server size={12} className={isOverdrive ? 'text-red-400 animate-spin' : 'text-orange-400'} />
                                {isOverdrive ? 'OVERRIDE_ENABLED' : 'core_engine_v3.0.run'}
                            </div>
                        </div>

                        {/* Animated Core Reactor WITH Parallax */}
                        <motion.div style={{ x: parallaxX2, y: parallaxY2 }} className="absolute top-1/2 left-[20%] md:left-[30%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 hidden sm:flex">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: isOverdrive ? 2 : 30, repeat: Infinity, ease: 'linear' }}
                                        className={`absolute w-[500px] h-[500px] rounded-full border border-dashed ${isOverdrive ? 'border-red-500/40 shadow-[0_0_30px_red]' : 'border-orange-500/20'}`} />
                            <motion.div animate={{ rotate: -360 }} transition={{ duration: isOverdrive ? 3 : 40, repeat: Infinity, ease: 'linear' }}
                                        className={`absolute w-[380px] h-[380px] rounded-full border ${isOverdrive ? 'border-red-600/30' : 'border-orange-500/10'}`} />
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: isOverdrive ? 1.5 : 20, repeat: Infinity, ease: 'linear' }}
                                        className={`absolute w-[260px] h-[260px] rounded-full border-2 border-dotted ${isOverdrive ? 'border-red-500/60' : 'border-orange-500/30'}`} />
                            
                            <AnimatePresence mode="wait">
                                <motion.div key={activeCap.id} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.5, opacity: 0 }} transition={{ type: "spring" }}
                                            className={`w-40 h-40 rounded-full border-2 flex items-center justify-center relative z-10 transition-colors duration-1000 ${
                                                isOverdrive ? 'bg-gradient-to-br from-[#2a0404] to-[#010101] border-red-500 shadow-[0_0_100px_rgba(239,68,68,0.8)]' : 'bg-gradient-to-br from-[#1A1A1A] to-[#010101] border-orange-500 shadow-[0_0_60px_rgba(249,115,22,0.4)]'
                                            }`}>
                                    <div className={`absolute inset-0 rounded-full animate-ping opacity-50 ${isOverdrive ? 'bg-red-500/40' : 'bg-orange-500/20'}`} style={{ animationDuration: isOverdrive ? '500ms' : '2s' }} />
                                    <activeCap.icon size={52} className={`relative z-10 ${isOverdrive ? 'text-red-400 drop-shadow-[0_0_20px_white]' : 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]'}`} />
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* DRAGGABLE HUD PANELS */}
                        <div className="absolute inset-0 pointer-events-none p-6 pt-20 z-40 overflow-hidden">
                            {/* Draggable Metric Card */}
                            <motion.div drag dragConstraints={consoleRef} dragElastic={0.1} dragMomentum={false} 
                                        className="pointer-events-auto absolute right-6 top-24 w-full sm:w-80 bg-[#111111]/90 backdrop-blur-md rounded-[2rem] border p-6 sm:p-8 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-500"
                                        style={{ border: isOverdrive ? '1px solid rgba(239,68,68,0.5)' : '1px solid rgba(249,115,22,0.3)' }}
                            >
                                 <div className="absolute top-4 right-4 text-zinc-600"><GripHorizontal size={16} /></div>
                                 <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] transition-colors duration-500 ${isOverdrive ? 'bg-red-500/30' : 'bg-orange-500/10'}`} />
                                 <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-2 flex items-center gap-2">
                                    <Cpu size={12} className={isOverdrive ? 'text-red-400' : 'text-orange-400'} /> Live Benchmark
                                 </div>
                                 <div className={`text-4xl sm:text-5xl font-mono font-bold mb-1 drop-shadow-md transition-colors ${isOverdrive ? 'text-red-400 shadow-[0_0_10px_red]' : 'text-white'}`}>
                                     {currentTflops}
                                 </div>
                                 <div className={`text-sm font-bold ${isOverdrive ? 'text-white' : 'text-orange-400'}`}>{activeCap.metrics.metric}</div>
                                 <div className="mt-6 space-y-3">
                                     {activeCap.features.map(feat => (
                                         <div key={feat} className="flex items-center gap-2 text-sm text-zinc-300 font-medium">
                                             <CheckCircle2 size={14} className={isOverdrive ? 'text-red-500' : 'text-orange-500'} /> {feat}
                                         </div>
                                     ))}
                                 </div>
                            </motion.div>

                            {/* Draggable Execution Log */}
                            <motion.div drag dragConstraints={consoleRef} dragElastic={0.1} dragMomentum={false}
                                        className="pointer-events-auto absolute right-6 bottom-6 w-full sm:w-80 h-64 bg-[#050505]/95 backdrop-blur-md rounded-[2rem] border p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden cursor-grab active:cursor-grabbing transition-colors duration-500"
                                        style={{ border: isOverdrive ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)' }}
                            >
                                <div className="absolute top-4 right-4 text-zinc-600"><GripHorizontal size={16} /></div>
                                <div className={`absolute top-0 left-0 w-full h-[2px] opacity-50 ${isOverdrive ? 'bg-gradient-to-r from-red-500 via-white to-red-500' : 'bg-gradient-to-r from-transparent via-orange-500 to-transparent'}`} />
                                
                                <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4 flex items-center justify-between pb-3 border-b border-white/5 pr-6">
                                    <div className="flex items-center gap-2 text-white">
                                        <Activity size={12} className={isOverdrive ? 'text-red-500 animate-spin' : 'text-orange-400 animate-pulse'} /> 
                                        Execution Log
                                    </div>
                                    <span className="font-mono text-[9px] text-green-400">T+{randomSeed.toString().substring(2, 6)}</span>
                                </div>
                                
                                <div className="flex-1 relative overflow-hidden font-mono text-[11px] sm:text-[12px] leading-relaxed">
                                     <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#050505] to-transparent z-10" />
                                     <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#050505] to-transparent z-10" />

                                     <AnimatePresence mode="wait">
                                         <motion.div key={activeCap.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 absolute bottom-4 w-full">
                                            {activeCap.logs.map((log, i) => {
                                                const isActiveLine = i === (logsOffset % activeCap.logs.length);
                                                return (
                                                    <div key={i} className={`flex items-start gap-3 transition-colors duration-300 ${isActiveLine ? (isOverdrive ? 'text-red-400 font-bold' : 'text-white') : 'text-zinc-600'}`}>
                                                        <span className={isActiveLine ? (isOverdrive ? 'text-red-500' : 'text-orange-400') : 'text-zinc-800'}>{'>'}</span>
                                                        <span>{log}</span>
                                                    </div>
                                                );
                                            })}
                                         </motion.div>
                                     </AnimatePresence>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InteractiveServicesWorkflow;
