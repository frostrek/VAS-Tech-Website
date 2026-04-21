import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { PricingTier } from '../../utils/productData';

interface PricingSectionProps {
    tiers: PricingTier[];
    productName: string;
}

const PricingSection = ({ tiers, productName }: PricingSectionProps) => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    if (!tiers.length) return null;

    return (
        <section className="py-28 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,_rgba(249,115,22,0.06)_0%,_transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/25 bg-orange-500/08 mb-6">
                        <Sparkles size={12} className="text-orange-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Pricing</span>
                        <Sparkles size={12} className="text-orange-400" />
                    </div>
                    <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
                        Simple, Transparent<br />
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Pricing</span>
                    </h2>
                    <p className="text-zinc-400 text-base max-w-lg mx-auto">
                        Start free, scale as you grow. No hidden fees, no lock-in contracts.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <div className={`grid gap-6 ${tiers.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : tiers.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {tiers.map((tier, idx) => {
                        const isHighlighted = tier.highlighted;
                        const isHovered = hoveredIdx === idx;
                        return (
                            <motion.div
                                key={tier.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                onHoverStart={() => setHoveredIdx(idx)}
                                onHoverEnd={() => setHoveredIdx(null)}
                                className={`relative rounded-3xl border p-8 flex flex-col transition-all duration-500 ${
                                    isHighlighted
                                        ? 'border-orange-500/40 shadow-[0_0_50px_rgba(249,115,22,0.12)] -translate-y-2'
                                        : 'border-orange-500/10 hover:border-orange-500/25'
                                } ${isHovered && !isHighlighted ? '-translate-y-1' : ''}`}
                                style={{
                                    background: isHighlighted
                                        ? 'linear-gradient(135deg, rgba(249,115,22,0.10), rgba(8,8,8,0.98))'
                                        : 'linear-gradient(135deg, rgba(249,115,22,0.03), rgba(8,8,8,0.98))',
                                }}
                            >
                                {/* Badge */}
                                {tier.badge && (
                                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                        isHighlighted
                                            ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black shadow-[0_0_20px_rgba(249,115,22,0.4)]'
                                            : 'bg-orange-500/15 border border-orange-500/30 text-orange-400'
                                    }`}>
                                        {tier.badge}
                                    </div>
                                )}

                                {/* Top glow for highlighted */}
                                {isHighlighted && (
                                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-[80px] bg-orange-500/15 pointer-events-none" />
                                )}

                                {/* Tier name */}
                                <h3 className="text-xl font-bold text-white mb-2 mt-2">{tier.name}</h3>

                                {/* Price */}
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className={`text-4xl md:text-5xl font-black ${isHighlighted ? 'text-orange-400' : 'text-white'}`}>
                                        {tier.price}
                                    </span>
                                    {tier.period && (
                                        <span className="text-sm text-zinc-500 font-medium">{tier.period}</span>
                                    )}
                                </div>

                                {/* Description */}
                                <p className="text-sm text-zinc-400 mb-8 leading-relaxed">{tier.description}</p>

                                {/* Features */}
                                <div className="space-y-3 flex-1 mb-8">
                                    {tier.features.map((feature, fi) => (
                                        <div key={fi} className="flex items-start gap-3">
                                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                                                isHighlighted ? 'bg-orange-500/20' : 'bg-orange-500/10'
                                            }`}>
                                                <Check size={11} className="text-orange-400" />
                                            </div>
                                            <span className="text-sm text-zinc-300">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA */}
                                <Link
                                    to={tier.cta === 'Contact Sales' ? '/contact' : '/schedule-demo'}
                                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-black transition-all duration-300 hover:scale-[1.02] ${
                                        isHighlighted
                                            ? 'text-black shadow-[0_0_30px_rgba(249,115,22,0.35)]'
                                            : 'border border-orange-500/20 text-white hover:bg-orange-500/10'
                                    }`}
                                    style={isHighlighted ? {
                                        background: 'linear-gradient(135deg, #F97316, #FBBF24)',
                                    } : {}}
                                >
                                    {isHighlighted && <Zap size={14} />}
                                    {tier.cta}
                                    <ArrowRight size={14} />
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-6 mt-12 text-[11px] text-zinc-600 font-medium"
                >
                    {['No credit card required', '14-day free trial', 'Cancel anytime', 'SOC 2 certified'].map(item => (
                        <div key={item} className="flex items-center gap-1.5">
                            <Check size={11} className="text-orange-500/40" />
                            {item}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default PricingSection;
