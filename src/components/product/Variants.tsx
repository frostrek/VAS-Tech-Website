import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ProductVariant } from '../../utils/productData';

interface VariantsProps {
    variants: ProductVariant[];
    productName: string;
}

const Variants = ({ variants, productName }: VariantsProps) => {
    const [activeId, setActiveId] = useState(variants[0]?.id || '');

    if (!variants.length) return null;

    const active = variants.find(v => v.id === activeId) || variants[0];

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,_rgba(249,115,22,0.05)_0%,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-2.5 mb-5">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Deployment Options</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        Choose Your <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Configuration</span>
                    </h2>
                    <p className="text-zinc-400 text-base mt-3 max-w-xl">
                        {productName} adapts to your needs. Select the deployment mode that fits your infrastructure and scale.
                    </p>
                </motion.div>

                {/* Variant Selector */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {variants.map((variant, idx) => {
                        const isActive = variant.id === activeId;
                        const Icon = variant.icon;
                        return (
                            <motion.button
                                key={variant.id}
                                onClick={() => setActiveId(variant.id)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.08 }}
                                whileHover={{ y: -4 }}
                                className={`relative text-left rounded-3xl border p-7 transition-all duration-500 group overflow-hidden ${
                                    isActive
                                        ? 'border-orange-500/40 shadow-[0_0_40px_rgba(249,115,22,0.12)]'
                                        : 'border-orange-500/10 hover:border-orange-500/25'
                                }`}
                                style={{
                                    background: isActive
                                        ? 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(8,8,8,0.98))'
                                        : 'linear-gradient(135deg, rgba(249,115,22,0.02), rgba(8,8,8,0.98))',
                                }}
                            >
                                {/* Active indicator glow */}
                                {isActive && (
                                    <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] bg-orange-500/15 pointer-events-none" />
                                )}

                                {/* Badge */}
                                {variant.badge && (
                                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest mb-4 ${
                                        isActive
                                            ? 'bg-orange-500/20 border border-orange-500/30 text-orange-400'
                                            : 'bg-zinc-800 border border-zinc-700 text-zinc-500'
                                    }`}>
                                        {variant.badge}
                                    </div>
                                )}

                                {/* Icon + Name */}
                                <div className="flex items-center gap-3 mb-4 relative z-10">
                                    {Icon && (
                                        <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all ${
                                            isActive
                                                ? 'bg-orange-500/15 border-orange-500/30'
                                                : 'bg-zinc-800/80 border-zinc-700 group-hover:bg-orange-500/10 group-hover:border-orange-500/20'
                                        }`}>
                                            <Icon size={18} className={isActive ? 'text-orange-400' : 'text-zinc-400 group-hover:text-orange-400 transition-colors'} />
                                        </div>
                                    )}
                                    <h3 className={`text-lg font-bold transition-colors ${isActive ? 'text-white' : 'text-zinc-300'}`}>
                                        {variant.name}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className={`text-sm leading-relaxed relative z-10 ${isActive ? 'text-zinc-300' : 'text-zinc-500'}`}>
                                    {variant.description}
                                </p>

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="variant-active-indicator"
                                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-400"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Variants;
