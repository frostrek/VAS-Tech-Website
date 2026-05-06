import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Filter, Mail, Users, Cog, CheckCircle2, Zap } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const WorkflowNodeDemo = () => {
    const { theme } = useTheme();
    const [activeNode, setActiveNode] = useState(0);

    const nodes = [
        { id: 'trigger', icon: Database, label: 'CRM Lead', desc: 'Webhook Trigger' },
        { id: 'filter', icon: Filter, label: 'Qualify', desc: 'Revenue > $1M' },
        { id: 'enrich', icon: Cog, label: 'Enrich', desc: 'Clearbit API' },
        { id: 'slack', icon: Users, label: 'Notify', desc: 'Sales #leads' },
        { id: 'email', icon: Mail, label: 'Welcome', desc: 'Template A' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode((prev) => (prev + 1) % (nodes.length + 1));
        }, 1800);
        return () => clearInterval(interval);
    }, [nodes.length]);

    const allDone = activeNode >= nodes.length;

    return (
        <div className={`w-full max-w-5xl mx-auto rounded-3xl border p-6 sm:p-8 md:p-10 ${theme === 'dark' ? 'bg-[#050505] border-zinc-800/50' : 'bg-gray-50 border-gray-200'} font-sans relative overflow-hidden shadow-2xl`}>
            
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(249,115,22,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[50%] bg-orange-500/5 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-8 md:mb-10">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme === 'dark' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-orange-50 border-orange-200 text-orange-600'}`}>
                        <Zap size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Live Execution Flow</span>
                    </div>
                </div>

                {/* Desktop: Single horizontal pipeline */}
                <div className="hidden md:flex items-center justify-center">
                    {nodes.map((node, idx) => {
                        const Icon = node.icon;
                        const isProcessing = activeNode === idx;
                        const isCompleted = activeNode > idx;

                        return (
                            <div key={node.id} className="flex items-center">
                                {/* Node */}
                                <div className="relative flex flex-col items-center">
                                    {/* Pulse ring for active */}
                                    {isProcessing && (
                                        <motion.div
                                            animate={{ opacity: [0, 0.3, 0], scale: [1, 1.6, 1.6] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+12px)] w-14 h-14 rounded-2xl bg-orange-500"
                                        />
                                    )}
                                    
                                    {/* Icon box */}
                                    <motion.div
                                        animate={{ 
                                            y: isProcessing ? -3 : 0,
                                            scale: isProcessing ? 1.1 : 1,
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border-2 ${
                                            isProcessing
                                                ? 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-400 text-white shadow-[0_0_25px_rgba(249,115,22,0.4)]'
                                                : isCompleted
                                                    ? (theme === 'dark' 
                                                        ? 'bg-orange-500/15 border-orange-500/30 text-orange-400' 
                                                        : 'bg-orange-50 border-orange-300 text-orange-500')
                                                    : (theme === 'dark' 
                                                        ? 'bg-zinc-900 border-zinc-800 text-zinc-600' 
                                                        : 'bg-gray-100 border-gray-200 text-gray-400')
                                        }`}
                                    >
                                        {isCompleted ? (
                                            <CheckCircle2 className="w-6 h-6" />
                                        ) : (
                                            <Icon className="w-6 h-6" />
                                        )}
                                    </motion.div>

                                    {/* Label */}
                                    <div className="mt-3 text-center w-20">
                                        <div className={`text-xs font-bold transition-colors duration-300 ${
                                            isProcessing ? (theme === 'dark' ? 'text-orange-400' : 'text-orange-600')
                                            : isCompleted ? (theme === 'dark' ? 'text-zinc-300' : 'text-gray-700')
                                            : (theme === 'dark' ? 'text-zinc-600' : 'text-gray-400')
                                        }`}>
                                            {node.label}
                                        </div>
                                        <div className={`text-[10px] mt-0.5 transition-colors duration-300 ${
                                            isProcessing || isCompleted 
                                                ? (theme === 'dark' ? 'text-zinc-500' : 'text-gray-500') 
                                                : (theme === 'dark' ? 'text-zinc-700' : 'text-gray-300')
                                        }`}>
                                            {node.desc}
                                        </div>
                                    </div>
                                </div>

                                {/* Connection line between nodes */}
                                {idx < nodes.length - 1 && (
                                    <div className="relative w-12 lg:w-20 h-[2px] mx-1 self-start mt-7">
                                        {/* Track */}
                                        <div className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`} />
                                        {/* Fill */}
                                        <motion.div
                                            initial={{ width: '0%' }}
                                            animate={{ width: isCompleted ? '100%' : '0%' }}
                                            transition={{ duration: 0.4, ease: 'easeOut' }}
                                            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                                        />
                                        {/* Traveling dot */}
                                        {isProcessing && (
                                            <motion.div
                                                animate={{ left: ['0%', '100%'] }}
                                                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                                                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile: Vertical pipeline */}
                <div className="flex md:hidden flex-col items-center">
                    {nodes.map((node, idx) => {
                        const Icon = node.icon;
                        const isProcessing = activeNode === idx;
                        const isCompleted = activeNode > idx;

                        return (
                            <div key={node.id} className="flex flex-col items-center">
                                {/* Node row */}
                                <div className="flex items-center gap-4">
                                    {/* Icon */}
                                    <motion.div
                                        animate={{ scale: isProcessing ? 1.1 : 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
                                            isProcessing
                                                ? 'bg-gradient-to-br from-orange-500 to-amber-600 border-orange-400 text-white shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                                                : isCompleted
                                                    ? (theme === 'dark' ? 'bg-orange-500/15 border-orange-500/30 text-orange-400' : 'bg-orange-50 border-orange-300 text-orange-500')
                                                    : (theme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-600' : 'bg-gray-100 border-gray-200 text-gray-400')
                                        }`}
                                    >
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                                    </motion.div>

                                    {/* Text */}
                                    <div>
                                        <div className={`text-sm font-bold ${isProcessing ? (theme === 'dark' ? 'text-orange-400' : 'text-orange-600') : (theme === 'dark' ? 'text-zinc-300' : 'text-gray-700')}`}>
                                            {node.label}
                                        </div>
                                        <div className={`text-[11px] ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-500'}`}>
                                            {node.desc}
                                        </div>
                                    </div>
                                </div>

                                {/* Vertical connector */}
                                {idx < nodes.length - 1 && (
                                    <div className="relative w-[2px] h-8 my-1 ml-[-60px]">
                                        <div className={`absolute inset-0 rounded-full ${theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'}`} />
                                        <motion.div
                                            initial={{ height: '0%' }}
                                            animate={{ height: isCompleted ? '100%' : '0%' }}
                                            transition={{ duration: 0.4 }}
                                            className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-orange-500 to-amber-400"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Status */}
                <div className="mt-10 flex justify-center">
                    <motion.div 
                        key={allDone ? 'done' : 'running'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`px-5 py-2 rounded-full border text-xs font-mono flex items-center gap-2.5 ${theme === 'dark' ? 'bg-[#0A0A0A] border-zinc-800 text-zinc-400' : 'bg-white border-gray-200 text-gray-600'}`}
                    >
                        <div className={`w-2 h-2 rounded-full ${allDone ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.6)]'}`} />
                        {allDone 
                            ? <span className="text-green-500 font-bold">Completed - 5/5 nodes (1.2s)</span>
                            : <span>Processing <span className="text-orange-400 font-bold">{nodes[activeNode]?.label}</span> ({activeNode + 1}/{nodes.length})</span>
                        }
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WorkflowNodeDemo;
