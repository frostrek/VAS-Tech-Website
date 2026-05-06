import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Bot, Mic, Database, Workflow, BarChart3,
    ArrowRight, CheckCircle2, MessageCircle, Volume2, Search, Zap, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Solution {
    id: string;
    title: string;
    tagline: string;
    icon: any;
    demo: 'chat' | 'voice' | 'search' | 'workflow' | 'analytics';
    colSpan: number;
    delay: number;
}

const SOLUTIONS: Solution[] = [
    {
        id: 'ai-agents',
        title: 'VAS Tech Agents',
        tagline: 'Intelligent multi-turn conversational agents',
        icon: Bot,
        demo: 'chat',
        colSpan: 2,
        delay: 0
    },
    {
        id: 'voice-ai',
        title: 'Voice AI',
        tagline: 'Zero-latency dynamic voice generation',
        icon: Mic,
        demo: 'voice',
        colSpan: 1,
        delay: 0.1
    },
    {
        id: 'rag-solutions',
        title: 'RAG Solutions',
        tagline: 'Index and search enterprise documents',
        icon: Database,
        demo: 'search',
        colSpan: 1,
        delay: 0.2
    },
    {
        id: 'workflow-automation',
        title: 'Workflow Automation',
        tagline: 'Self-healing business process routing',
        icon: Workflow,
        demo: 'workflow',
        colSpan: 1,
        delay: 0.3
    },
    {
        id: 'data-intelligence',
        title: 'Data Intelligence',
        tagline: 'Real-time predictive analytics',
        icon: BarChart3,
        demo: 'analytics',
        colSpan: 1,
        delay: 0.4
    }
];

const ChatDemo = () => (
    <div className="w-full bg-[#1A1A1A] rounded-2xl border border-orange-500/20 p-4 flex flex-col gap-2.5 shadow-inner h-[220px] sm:h-[260px] relative overflow-hidden group-hover:border-orange-500/20 transition-colors">
        <div className="flex items-center gap-2 mb-1 border-b border-orange-500/20 pb-2 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-gray-400 font-semibold tracking-wide">VAS Tech AI</span>
        </div>
        
        <motion.div variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 10, opacity: 0.8 } }} className="bg-[#252525] p-3 rounded-2xl rounded-bl-sm text-[13px] text-gray-200 w-[85%] border border-orange-500/20 shadow-sm transform-gpu transition-all duration-500 shrink-0">
            I can help! Please share your order ID.
        </motion.div>

        <motion.div variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 15, opacity: 0 } }} transition={{ delay: 0.1 }} className="bg-gradient-to-r from-orange-500 to-amber-600 p-3 rounded-2xl rounded-br-sm text-[13px] text-black font-medium w-[70%] self-end shadow-md transform-gpu transition-all duration-500 shrink-0">
            ORD-2024-7823
        </motion.div>
        
        <motion.div variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 20, opacity: 0 } }} transition={{ delay: 0.2 }} className="bg-[#252525] p-3 rounded-2xl rounded-bl-sm text-[13px] text-gray-200 w-[90%] border border-orange-500/20 shadow-sm transform-gpu transition-all duration-500 shrink-0 relative z-10">
            Found it! Your package arrives on Tuesday.
        </motion.div>

        {/* Gradient fade out at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#1A1A1A] to-transparent pointer-events-none" />
    </div>
);

const VoiceDemo = () => (
    <div className="w-full h-full bg-gradient-to-b from-[#111] to-[#0A0A0A] rounded-2xl border border-orange-500/20 flex flex-col justify-center items-center py-8 relative overflow-hidden group-hover:border-orange-500/20 transition-colors">
        <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center relative mb-6">
            <Volume2 className="w-8 h-8 text-orange-400" />
            <motion.div 
                className="absolute inset-0 rounded-full border border-orange-500/50"
                variants={{ hover: { scale: [1, 1.8], opacity: [0.8, 0] }, initial: { scale: 1, opacity: 0 } }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
        </div>
        
        <div className="flex items-end gap-1.5 h-12 text-orange-500">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <motion.div
                    key={i}
                    className="w-1.5 bg-gradient-to-t from-orange-600 to-yellow-400 rounded-full"
                    variants={{ 
                        hover: { height: ["20%", "100%", "20%"] }, 
                        initial: { height: "20%" } 
                    }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
                />
            ))}
        </div>
    </div>
);

const SearchDemo = () => (
    <div className="w-full h-full bg-[#111] rounded-2xl border border-orange-500/20 p-4 flex flex-col gap-3 group-hover:border-orange-500/20 transition-colors">
        <div className="bg-[#1A1A1A] px-3 py-2.5 rounded-xl border border-orange-500/20 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-[12px] text-gray-300">Revenue Q3...</span>
            <motion.div variants={{ hover: { opacity: [0, 1, 0] } }} transition={{ duration: 1, repeat: Infinity }} className="w-0.5 h-4 bg-orange-500" />
        </div>

        <motion.div variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 10, opacity: 0 } }} transition={{ delay: 0.1 }} className="flex items-center justify-between bg-[#151515] p-3 rounded-xl border border-orange-500/20">
            <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs text-gray-400">FIN-Report-Q3.pdf</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md">99% Match</span>
        </motion.div>

        <motion.div variants={{ hover: { y: 0, opacity: 1 }, initial: { y: 10, opacity: 0 } }} transition={{ delay: 0.2 }} className="flex items-center justify-between bg-[#151515] p-3 rounded-xl border border-orange-500/20">
            <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-xs text-gray-400">Sales-DB</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-md">94% Match</span>
        </motion.div>
    </div>
);

const WorkflowDemo = () => (
    <div className="w-full h-full bg-[#111] rounded-2xl border border-orange-500/20 p-5 flex items-center justify-center relative overflow-hidden group-hover:border-orange-500/20 transition-colors">
        {/* Connection Line */}
        <div className="absolute top-1/2 left-[20%] right-[20%] border-t-2 border-dashed border-orange-500/20 -translate-y-1/2" />
        <motion.div 
            className="absolute top-1/2 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent -translate-y-1/2"
            variants={{ hover: { x: ["-100%", "100%"] }, initial: { x: "-100%" } }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        <div className="flex items-center justify-between w-full relative z-10 px-4">
            <motion.div variants={{ hover: { scale: 1.1 }, initial: { scale: 1 } }} className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-orange-500/20 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 text-gray-300" />
            </motion.div>
            
            <motion.div variants={{ hover: { scale: 1.2, rotate: 90 }, initial: { scale: 1, rotate: 0 } }} transition={{ type: "spring" }} className="w-10 h-10 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                <Zap className="w-4 h-4 text-orange-400" />
            </motion.div>

            <motion.div variants={{ hover: { scale: 1.1 }, initial: { scale: 1 } }} transition={{ delay: 0.1 }} className="w-12 h-12 rounded-xl bg-orange-500 border border-orange-400 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <CheckCircle2 className="w-5 h-5 text-black" />
            </motion.div>
        </div>
    </div>
);

const AnalyticsDemo = () => (
    <div className="w-full h-full bg-[#111] rounded-2xl border border-orange-500/20 p-4 flex flex-col justify-end gap-2 group-hover:border-orange-500/20 transition-colors relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Conversion</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded-full"><Activity size={10}/> +45%</span>
        </div>
        
        <div className="flex items-end justify-between gap-1.5 h-[100px] mt-8 w-full">
            {[40, 55, 35, 75, 65, 90, 85].map((h, i) => (
                <motion.div
                    key={i}
                    className={`rounded-t-sm flex-1 opacity-90 ${i >= 5 ? 'bg-gradient-to-t from-orange-600 to-yellow-400' : 'bg-gray-800'}`}
                    variants={{ hover: { height: `${h}%` }, initial: { height: "20%" } }}
                    transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 100 }}
                />
            ))}
        </div>
    </div>
);

const BentoCard = ({ solution }: { solution: Solution }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hover"
            className={`group relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#0A0A0A] shadow-2xl flex flex-col ${
                solution.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'
            }`}
        >
            {/* Ambient Background Glow Effect via framer motion */}
            <motion.div 
                variants={{
                    hover: { opacity: 0.15 },
                    initial: { opacity: 0 }
                }}
                className={`absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-700 blur-2xl pointer-events-none transition-opacity duration-700`}
            />

            <div className={`p-6 xl:p-8 flex flex-col h-full relative z-10 w-full min-h-[350px] sm:min-h-[300px] ${solution.colSpan === 2 ? 'lg:flex-row lg:items-center gap-8' : ''}`}>
                
                <div className={`flex flex-col ${solution.colSpan === 2 ? 'lg:w-[40%] xl:w-1/2' : ''}`}>
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-orange-500/50 transition-all duration-300 shadow-lg">
                        <solution.icon className="w-6 h-6 text-orange-400" />
                    </div>
                    
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                        {solution.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-gray-400 leading-relaxed mb-6">
                        {solution.tagline}
                    </p>

                    <Link 
                        to="/products"
                        className="mt-auto hidden sm:flex items-center gap-2 text-[13px] font-bold text-gray-500 group-hover:text-white transition-colors w-fit"
                    >
                        Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className={`flex-1 w-full ${solution.colSpan === 2 ? 'lg:mt-0' : 'mt-4'}`}>
                    {solution.demo === 'chat' && <ChatDemo />}
                    {solution.demo === 'voice' && <VoiceDemo />}
                    {solution.demo === 'search' && <SearchDemo />}
                    {solution.demo === 'workflow' && <WorkflowDemo />}
                    {solution.demo === 'analytics' && <AnalyticsDemo />}
                </div>

            </div>
        </motion.div>
    );
};

const AISolutionsShowcase = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current!.children,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: headerRef.current, start: 'top 85%', toggleActions: 'play none none none' }
                }
            );

            gsap.fromTo(gridRef.current!.children,
                { y: 50, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: { trigger: gridRef.current, start: 'top 80%', toggleActions: 'play none none none' }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden bg-[#050505]">
            
            {/* Background Decorators */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 max-w-[1240px] relative z-10">
                
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-16 flex flex-col items-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">
                            The VAS Tech Architecture
                        </span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-light mb-4 text-white tracking-tight">
                        Our AI Business <span className="font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Solutions</span>
                    </h2>
                    
                    <p className="text-[15px] max-w-2xl text-gray-400 font-medium leading-relaxed">
                        Deploy intelligent agents, zero-latency workflows, and deep data analytics across your enterprise. Hover to interact with the ecosystem.
                    </p>
                </div>

                {/* The Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {SOLUTIONS.map((solution) => (
                        <BentoCard key={solution.id} solution={solution} />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AISolutionsShowcase;
