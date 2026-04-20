"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Code2, TestTube2, Rocket, TrendingUp, type LucideIcon } from "lucide-react";

interface Phase {
    id: string;
    label: string;
    tagline: string;
    description: string;
    icon: LucideIcon;
    color: string;
    delay: number;
}

const PHASES: Phase[] = [
    {
        id: "research",
        label: "Research & Strategy",
        tagline: "Mapping the neural pathways",
        description: "We audit your infrastructure to identify high-ROI automation targets. No guesswork, just pure data-driven blueprinting.",
        icon: Lightbulb,
        color: "#FBBF24", // amber-400
        delay: 0,
    },
    {
        id: "development",
        label: "Architecture & Dev",
        tagline: "Constructing the core engine",
        description: "We build highly modular, scalable agentic systems using our proprietary stack, tailoring LLMs to your specific enterprise data.",
        icon: Code2,
        color: "#F97316", // orange-500
        delay: 0.1,
    },
    {
        id: "testing",
        label: "Validation & Testing",
        tagline: "Stress-testing under pressure",
        description: "Rigorous quality assurance, hallucination rate testing, and edge-case simulation to guarantee 99.9% enterprise reliability.",
        icon: TestTube2,
        color: "#EAB308", // yellow-500
        delay: 0.2,
    },
    {
        id: "deployment",
        label: "Deployment & Scaling",
        tagline: "Activating the neural grid",
        description: "Seamless integration into your live environments with continuous monitoring, latency reduction, and self-improving feedback loops.",
        icon: Rocket,
        color: "#FDE047", // yellow-300
        delay: 0.3,
    }
];

const InnovationProcess = () => {
    const [activeId, setActiveId] = useState<string>(PHASES[0].id);

    const activePhase = PHASES.find(p => p.id === activeId) || PHASES[0];

    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                
                {/* Control Panel (Left) */}
                <div className="lg:col-span-5 flex flex-col gap-4 relative z-20 w-full">
                    <div className="hidden lg:block absolute left-[28px] top-8 bottom-8 w-[2px] bg-[#111110] border-l border-zinc-900/50 -z-10" />
                    
                    {PHASES.map((phase, i) => {
                        const isActive = activeId === phase.id;
                        const Icon = phase.icon;
                        
                        return (
                            <button
                                key={phase.id}
                                onClick={() => setActiveId(phase.id)}
                                onMouseEnter={() => setActiveId(phase.id)}
                                className={`relative flex items-center gap-6 p-5 rounded-2xl transition-all duration-500 text-left overflow-hidden group w-full
                                    ${isActive 
                                        ? 'bg-[#151515] border border-orange-500/30 shadow-[0_10px_30px_rgba(249,115,22,0.1)]' 
                                        : 'bg-transparent border border-transparent hover:bg-[#111110] hover:border-zinc-800/50'
                                    }
                                `}
                            >
                                {/* Glowing Active Indicator Background */}
                                {isActive && (
                                    <motion.div 
                                        layoutId="activeTabGlow"
                                        className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent pointer-events-none"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                
                                {/* Icon Bubble */}
                                <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center transition-all duration-500 relative z-10
                                    ${isActive 
                                        ? 'bg-[#1A1A1A] border border-orange-500/50 shadow-[inset_0_2px_10px_rgba(249,115,22,0.2)]' 
                                        : 'bg-[#0A0A0A] border border-zinc-800/50 text-zinc-500 group-hover:text-zinc-300'
                                    }`}
                                >
                                    <Icon size={24} style={{ color: isActive ? phase.color : undefined }} className="transition-colors duration-500" />
                                </div>
                                
                                {/* Labels */}
                                <div className="relative z-10">
                                    <h3 className={`font-bold text-lg mb-1 transition-colors duration-500 ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>
                                        {phase.label}
                                    </h3>
                                    <div className="text-xs uppercase tracking-widest font-black text-zinc-600 transition-colors">
                                        Phase 0{i + 1}
                                    </div>
                                </div>
                                
                                {/* Right Accent Tracer */}
                                <div className={`absolute right-6 opacity-0 -translate-x-4 transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : ''}`}>
                                    <div className="w-6 h-[2px] bg-supportiq-button rounded-full" />
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Reactor Core (Right) */}
                <div className="lg:col-span-7 relative h-[500px] lg:h-[600px] w-full flex items-center justify-center">
                    
                    {/* SVG Connector Path (Desktop Only) */}
                    <div className="hidden lg:block absolute -left-12 top-[50%] h-[2px] w-32 bg-gradient-to-r from-orange-500/20 to-orange-500/60 z-0" 
                         style={{ transform: `translateY(${-50}px)` }} 
                    />

                    {/* Outer Core Glass Casing */}
                    <div className="w-full h-full max-w-[500px] max-h-[500px] rounded-full border border-zinc-800/30 bg-[#0A0A0A]/40 backdrop-blur-3xl shadow-[inset_0_0_100px_rgba(0,0,0,0.8),0_20px_60px_rgba(0,0,0,0.8)] relative flex items-center justify-center p-8 z-10 transition-all duration-700 hover:scale-[1.02] group">
                        
                        {/* Dynamic Background Glow representing the energy of the step */}
                        <div 
                            className="absolute inset-0 rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
                            style={{ backgroundColor: activePhase.color }}
                        />
                        
                        {/* Rotating Decorative Rings */}
                        <motion.div 
                            className="absolute inset-4 rounded-full border border-dashed border-orange-500/20 pointer-events-none opacity-50"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.div 
                            className="absolute inset-8 rounded-full border border-dashed border-yellow-500/10 pointer-events-none opacity-30"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Inner Content Area - Crossfading Elements */}
                        <div className="relative z-20 text-center w-full px-6">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activePhase.id}
                                    initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.05, y: -15 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex flex-col items-center"
                                >
                                    <div 
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-[#111110] border"
                                        style={{ borderColor: `${activePhase.color}40`, boxShadow: `inset 0 2px 20px ${activePhase.color}20` }}
                                    >
                                        <activePhase.icon size={36} style={{ color: activePhase.color }} />
                                    </div>
                                    
                                    {/* Using font-serif for alignment! */}
                                    <h3 
                                        className="text-3xl md:text-4xl font-serif mb-4 leading-tight bg-clip-text text-transparent"
                                        style={{ backgroundImage: `linear-gradient(135deg, #ffffff 20%, ${activePhase.color})` }}
                                    >
                                        {activePhase.label}
                                    </h3>
                                    
                                    <p className="text-[11px] uppercase tracking-[0.3em] font-black mb-6" style={{ color: activePhase.color }}>
                                        {activePhase.tagline}
                                    </p>
                                    
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
                                        {activePhase.description}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Impact Base Sequence */}
            <div className="w-full max-w-6xl mx-auto mt-0 lg:mt-6 flex flex-col items-center justify-center relative z-0">
                <div className="w-px h-16 bg-gradient-to-b from-orange-500/40 to-transparent mb-6 hidden lg:block" />
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-supportiq-button p-[1px] rounded-full overflow-hidden shadow-[0_10px_40px_rgba(249,115,22,0.2)]"
                >
                    <div className="bg-[#050505] px-8 py-3.5 rounded-full flex items-center gap-3">
                        <TrendingUp size={18} className="text-orange-400" />
                        <span className="text-sm font-bold text-white tracking-wide uppercase">Deliver Enterprise Impact</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default InnovationProcess;
