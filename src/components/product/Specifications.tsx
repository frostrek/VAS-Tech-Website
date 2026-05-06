import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { SpecificationGroup } from '../../utils/productData';

interface SpecificationsProps {
    specs: SpecificationGroup[];
}

const Specifications = ({ specs }: SpecificationsProps) => {
    const [expandedIdx, setExpandedIdx] = useState<number>(0);

    if (!specs.length) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/15 bg-orange-500/05">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Technical Specs</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        Under The <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Hood</span>
                    </h2>
                </motion.div>

                {/* Specs Grid / Accordion */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {specs.map((group, idx) => {
                        const isExpanded = expandedIdx === idx;
                        return (
                            <motion.div
                                key={group.category}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                className={`rounded-3xl border overflow-hidden transition-all duration-500 ${
                                    isExpanded
                                        ? 'border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.08)]'
                                        : 'border-orange-500/10 hover:border-orange-500/20'
                                }`}
                                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(8,8,8,0.98))' }}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                                        <span className="text-lg font-bold text-white">{group.category}</span>
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{group.items.length} specs</span>
                                    </div>
                                    <ChevronDown
                                        size={18}
                                        className={`text-orange-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                                    />
                                </button>

                                {/* Expanded content */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: 'easeInOut' }}
                                        >
                                            <div className="px-6 pb-6 space-y-0">
                                                {group.items.map((item, i) => (
                                                    <motion.div
                                                        key={item.label}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.06 }}
                                                        className={`flex items-center justify-between py-3.5 ${
                                                            i < group.items.length - 1 ? 'border-b border-zinc-800/50' : ''
                                                        }`}
                                                    >
                                                        <span className="text-sm text-zinc-400">{item.label}</span>
                                                        <span className="text-sm font-bold text-white text-right max-w-[55%]">{item.value}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Specifications;
