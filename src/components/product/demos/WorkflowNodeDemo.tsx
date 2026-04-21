import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Filter, Mail, Users, Cog, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const WorkflowNodeDemo = () => {
    const { theme } = useTheme();
    const [activeNode, setActiveNode] = useState(0);

    const nodes = [
        { id: 'trigger', icon: Database, label: 'CRM New Lead', color: 'bg-blue-500', desc: 'Triggered via Webhook' },
        { id: 'filter', icon: Filter, label: 'Qualify Lead', color: 'bg-purple-500', desc: 'If Revenue > $1M' },
        { id: 'enrich', icon: Cog, label: 'Enrich Data', color: 'bg-orange-500', desc: 'Via Clearbit API' },
        { id: 'slack', icon: Users, label: 'Notify Sales', color: 'bg-pink-500', desc: 'Post to #leads' },
        { id: 'email', icon: Mail, label: 'Send Welcome', color: 'bg-green-500', desc: 'Send Template A' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveNode((prev) => (prev + 1) % (nodes.length + 1));
        }, 1500);
        return () => clearInterval(interval);
    }, [nodes.length]);

    return (
        <div className={`w-full rounded-2xl border p-8 md:p-12 ${theme === 'dark' ? 'bg-dark-card border-dark-accent/20' : 'bg-gray-50 border-gray-200'} font-sans relative overflow-hidden`}>
            
            {/* Background Grid */}
            <div className={`absolute inset-0 z-0 opacity-20`} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L0 0 0 20' fill='none' stroke='${theme === 'dark' ? '%23ffffff' : '%23000000'}' stroke-width='1' opacity='0.2'/%3E%3C/svg%3E")` }}></div>

            <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-8 text-center ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>
                    Live Execution Flow
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                    {nodes.map((node, idx) => {
                        const Icon = node.icon;
                        const isProcessing = activeNode === idx;
                        const isCompleted = activeNode > idx;

                        return (
                            <div key={node.id} className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                                
                                {/* Node */}
                                <div className="relative group">
                                    {isProcessing && (
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className={`absolute inset-0 rounded-xl ${node.color}`}
                                        />
                                    )}
                                    <motion.div 
                                        animate={{ 
                                            y: isProcessing ? -5 : 0,
                                            scale: isProcessing ? 1.05 : 1,
                                            borderColor: isProcessing || isCompleted ? (theme === 'dark' ? '#fb923c' : '#B07552') : 'transparent'
                                        }}
                                        className={`
                                            relative w-32 p-4 rounded-xl shadow-lg border-2 flex flex-col items-center gap-2 transition-all
                                            ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}
                                            ${!isProcessing && !isCompleted ? 'opacity-50 grayscale' : ''}
                                        `}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white ${node.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="text-center">
                                            <div className={`text-sm font-bold ${theme === 'dark' ? 'text-dark-text' : 'text-gray-900'}`}>{node.label}</div>
                                            <div className={`text-[10px] ${theme === 'dark' ? 'text-dark-text-muted' : 'text-gray-500'}`}>{node.desc}</div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Connection Line */}
                                {idx < nodes.length - 1 && (
                                    <div className="hidden md:flex relative w-12 h-[2px]">
                                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: isCompleted || activeNode === idx + 1 ? '100%' : '0%' }}
                                            className={`absolute inset-y-0 left-0 ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`}
                                        />
                                        {(isCompleted || activeNode === idx + 1) && (
                                            <div className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2`}>
                                                <ArrowRight className={`w-4 h-4 ${theme === 'dark' ? 'text-dark-accent' : 'text-[#B07552]'}`} />
                                            </div>
                                        )}
                                    </div>
                                )}
                                
                                {/* Mobile Connection Line */}
                                {idx < nodes.length - 1 && (
                                    <div className="md:hidden relative h-8 w-[2px]">
                                         <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                                         <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: isCompleted || activeNode === idx + 1 ? '100%' : '0%' }}
                                            className={`absolute inset-x-0 top-0 ${theme === 'dark' ? 'bg-dark-accent' : 'bg-[#B07552]'}`}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Status Indicator */}
                <div className="mt-12 flex justify-center">
                    <div className={`px-4 py-2 rounded-full border text-xs font-mono flex items-center gap-2 ${theme === 'dark' ? 'bg-dark-bg border-dark-accent/20 text-dark-text' : 'bg-white border-gray-200 text-gray-700'}`}>
                        <div className={`w-2 h-2 rounded-full ${activeNode >= nodes.length ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                        {activeNode >= nodes.length ? 'Execution Completed: Success (2.4s)' : `Processing Node: ${nodes[activeNode]?.label || 'Done'}`}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WorkflowNodeDemo;
