import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { RelatedProduct } from '../../utils/productData';

interface RelatedProductsProps {
    products: RelatedProduct[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
    if (!products.length) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Subtle border top */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)' }} />

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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Explore More</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        Related <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Products</span>
                    </h2>
                </motion.div>

                {/* Product cards */}
                <div className={`grid gap-5 ${products.length === 1 ? 'grid-cols-1 max-w-md' : products.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
                    {products.map((product, idx) => {
                        const Icon = product.icon;
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Link
                                    to={`/products/${product.slug}`}
                                    className="group relative block rounded-3xl border border-orange-500/15 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_0_40px_rgba(249,115,22,0.08)] overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(8,8,8,0.98))' }}
                                >
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                        style={{ background: 'radial-gradient(ellipse at 30% 40%, rgba(249,115,22,0.08) 0%, transparent 65%)' }} />

                                    {/* Top-right glow */}
                                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none bg-orange-500" />

                                    {/* Icon */}
                                    <div className="flex items-center gap-4 mb-5 relative z-10">
                                        {Icon && (
                                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/15 transition-colors">
                                                <Icon size={20} className="text-orange-400" />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors">{product.name}</h3>
                                            <p className="text-xs text-zinc-500">{product.tagline}</p>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="relative z-10 flex items-center gap-1.5 text-sm font-bold text-orange-400 opacity-70 group-hover:opacity-100 transition-all group-hover:gap-2.5">
                                        Explore Product <ArrowRight size={14} />
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default RelatedProducts;
