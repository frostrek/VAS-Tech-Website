import { useEffect, useState } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Loader2, ArrowLeft } from 'lucide-react';
import { getProductBySlug, type ProductData } from '../utils/productData';
import { WorkflowBuilder } from '../components/product/WorkflowBuilder';
import { CapabilitiesSystem } from '../components/product/CapabilitiesSystem';
import ProductDemoRegistry from '../components/product/ProductDemoRegistry';
import Specifications from '../components/product/Specifications';
import Variants from '../components/product/Variants';
import RelatedProducts from '../components/product/RelatedProducts';
import { Link } from 'react-router-dom';


/* ─── PRODUCT DETAIL HERO (dark, futuristic) ─────────────────────────────── */
const DetailHero = ({ product }: { product: ProductData }) => (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Radial orange glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_50%_30%,_rgba(249,115,22,0.10)_0%,_transparent_65%)] pointer-events-none" />

        {/* Animated ambient orbs */}
        <motion.div
            animate={{ scale: [1, 1.12, 1], opacity: [0.08, 0.18, 0.08] }}
            transition={{ duration: 12, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
            style={{ background: 'radial-gradient(circle, #F97316, transparent)' }}
        />

        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
            {/* Breadcrumb */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
            >
                <Link
                    to="/products"
                    className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={14} />
                    Back to Products
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Text content */}
                <div>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-6"
                    >
                        <span className="flex h-2 w-2 rounded-full animate-pulse bg-orange-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.28em] text-orange-400">{product.tagline}</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white leading-[1.05] tracking-tight mb-4"
                    >
                        {product.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        className="text-lg md:text-xl text-orange-400/80 font-semibold mb-6"
                    >
                        {product.subtitle}
                    </motion.p>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-base text-zinc-400 leading-relaxed mb-10 max-w-lg"
                    >
                        {product.description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            to="/schedule-demo"
                            className="px-9 py-4 text-black font-black rounded-full text-sm tracking-wide transition-all hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 32px rgba(249,115,22,0.4)' }}
                        >
                            Book Free Demo
                        </Link>
                    </motion.div>

                    {/* Badge pill */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/15 bg-orange-500/05 mt-8"
                    >
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">🏆 {product.badge}</span>
                    </motion.div>
                </div>

                {/* Right: Hero image */}
                {product.heroImage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            className={`relative rounded-3xl overflow-hidden border border-orange-500/15 shadow-[0_0_60px_rgba(249,115,22,0.12)] ${(product.slug === 'ai-calling-agent' || product.slug === 'workflow-builder' || product.slug === 'email-automation' || product.slug === 'whatsapp-bot' || product.slug === 'ai-chatbot' || product.slug === 'web-scraping' || product.slug === 'content-generation' || product.slug === 'hr-onboarding' || product.slug === 'seo-automation' || product.slug === 'lead-generation' || product.slug === 'knowledge-bot' || product.slug === 'ai-analytics' || product.slug === 'invoice-document-ai' || product.slug === 'crm-automation') ? 'bg-[#030303]' : ''}`}
                        >
                            <img
                                src={product.heroImage}
                                alt={product.title}
                                className={`w-full h-auto object-cover ${(product.slug === 'ai-calling-agent' || product.slug === 'workflow-builder' || product.slug === 'email-automation' || product.slug === 'whatsapp-bot' || product.slug === 'ai-chatbot' || product.slug === 'web-scraping' || product.slug === 'content-generation' || product.slug === 'hr-onboarding' || product.slug === 'seo-automation' || product.slug === 'lead-generation' || product.slug === 'knowledge-bot' || product.slug === 'ai-analytics' || product.slug === 'invoice-document-ai' || product.slug === 'crm-automation') ? 'opacity-95 mix-blend-screen brightness-110 contrast-105' : ''}`}
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-40" />
                            {(product.slug === 'ai-calling-agent' || product.slug === 'workflow-builder' || product.slug === 'email-automation' || product.slug === 'whatsapp-bot' || product.slug === 'ai-chatbot' || product.slug === 'web-scraping' || product.slug === 'content-generation' || product.slug === 'hr-onboarding' || product.slug === 'seo-automation' || product.slug === 'lead-generation' || product.slug === 'knowledge-bot' || product.slug === 'ai-analytics' || product.slug === 'invoice-document-ai' || product.slug === 'crm-automation') && (
                                <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/30 via-transparent to-[#060606]/30" />
                            )}
                        </motion.div>

                        {/* Decorative glow behind image */}
                        <div className="absolute -inset-12 rounded-full blur-[100px] bg-orange-500/10 pointer-events-none -z-10 animate-pulse" />
                    </motion.div>
                )}
            </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#060606] to-transparent pointer-events-none" />
    </section>
);

/* ─── 404 STATE ──────────────────────────────────────────────────────────── */
const ProductNotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-[#060606] flex items-center justify-center text-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md"
            >
                <div className="text-8xl mb-6">🔍</div>
                <h1 className="text-3xl font-serif text-white mb-4">Product Not Found</h1>
                <p className="text-zinc-400 mb-8">The product you're looking for doesn't exist or has been moved.</p>
                <button
                    onClick={() => navigate('/products')}
                    className="px-8 py-3 text-black font-bold rounded-full text-sm transition-all hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}
                >
                    Explore All Products
                </button>
            </motion.div>
        </div>
    );
};

/* ─── LOADING STATE ──────────────────────────────────────────────────────── */
const ProductLoader = () => (
    <div className="min-h-screen bg-[#060606] flex items-center justify-center">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
        >
            <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            <p className="text-sm text-zinc-500 font-medium">Loading product...</p>
        </motion.div>
    </div>
);

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const ProductPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<ProductData | null>(null);
    const [loading, setLoading] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    const productSchema = product ? {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": `https://vastechconsulting.com${product.heroImage || ''}`,
        "brand": {
            "@type": "Brand",
            "name": "VAS Tech"
        },
        "url": `https://vastechconsulting.com/products/${slug}`
    } : undefined;

    useSEO({
        title: product ? `${product.title} - ${product.subtitle}` : 'Product Details',
        description: product?.description,
        canonical: `https://vastechconsulting.com/products/${slug}`,
        schema: productSchema,
        ogImage: product?.heroImage ? `https://vastechconsulting.com${product.heroImage}` : undefined
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoading(true);
        setOpenFaqIndex(null);

        // Simulate a brief load for smooth transition
        const timer = setTimeout(() => {
            const data = getProductBySlug(slug || '');
            setProduct(data || getProductBySlug('generic'));
            setLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, [slug]);

    if (loading) return <ProductLoader />;
    if (!product) return <ProductNotFound />;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="min-h-screen bg-[#060606] text-white"
            >
                {/* 1. Hero */}
                <DetailHero product={product} />

                {/* 1.5 Interactive Demo */}
                <ProductDemoRegistry productId={product.id} />




                {/* 4. Variants / Deployment Options */}
                {product.variants.length > 0 && (
                    <Variants variants={product.variants} productName={product.title} />
                )}

                {/* 5. Workflow / Process */}
                {product.process.length > 0 && (
                    <section className="py-24 relative overflow-hidden bg-[#0A0A0A]">
                        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08 mb-5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Workflow</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                    Simplify Your <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Workflow</span>
                                </h2>
                                <p className="text-zinc-400 text-base mt-3 max-w-lg mx-auto">
                                    From concept to execution - we streamline every step.
                                </p>
                            </motion.div>
                            <WorkflowBuilder steps={product.process} />
                        </div>
                    </section>
                )}

                {/* 6. Capabilities */}
                {product.features.length > 0 && (
                    <section className="py-24 overflow-hidden">
                        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px]">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="mb-16"
                            >
                                <div className="flex items-center gap-2.5 mb-5">
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Capabilities</span>
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                    Everything You Need To{' '}
                                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Scale</span>
                                </h2>
                            </motion.div>
                            <CapabilitiesSystem features={product.features} />
                        </div>
                    </section>
                )}

                {/* 7. Specifications */}
                {product.specifications.length > 0 && (
                    <div className="bg-[#0A0A0A]">
                        <Specifications specs={product.specifications} />
                    </div>
                )}



                {/* 9. Use Cases */}
                {product.useCases.length > 0 && (
                    <section className="py-24 bg-[#0A0A0A]">
                        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px]">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-16"
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08 mb-5">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Use Cases</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                    Built For Your <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Industry</span>
                                </h2>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {product.useCases.map((uc, idx) => {
                                    const Icon = uc.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="group rounded-3xl border border-orange-500/15 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.06)]"
                                            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(8,8,8,0.98))' }}
                                        >
                                            {Icon && (
                                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500/15 transition-colors">
                                                    <Icon size={20} className="text-orange-400" />
                                                </div>
                                            )}
                                            <h3 className="text-lg font-bold text-white mb-3">{uc.title}</h3>
                                            <p className="text-sm text-zinc-400 leading-relaxed">{uc.description}</p>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}



                {/* 11. FAQ */}
                {product.faq.length > 0 && (
                    <section className="py-24 bg-[#0A0A0A]">
                        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-center mb-12"
                            >
                                <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                                    Frequently Asked <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Questions</span>
                                </h2>
                            </motion.div>

                            <div className="space-y-3">
                                {product.faq.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.06 }}
                                        className="rounded-2xl border border-orange-500/15 overflow-hidden"
                                        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.03), rgba(8,8,8,0.98))' }}
                                    >
                                        <button
                                            onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                                            className="w-full text-left p-6 flex justify-between items-center hover:bg-orange-500/05 transition-colors"
                                        >
                                            <span className="text-base font-bold text-white pr-4">{item.question}</span>
                                            {openFaqIndex === idx
                                                ? <Minus className="w-5 h-5 text-orange-400 shrink-0" />
                                                : <Plus className="w-5 h-5 text-zinc-600 shrink-0" />
                                            }
                                        </button>
                                        <AnimatePresence>
                                            {openFaqIndex === idx && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-orange-500/10 pt-4">
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 12. Related Products */}
                {product.relatedProducts.length > 0 && (
                    <RelatedProducts products={product.relatedProducts} />
                )}

                {/* 13. Final CTA */}
                <section className="relative py-28 overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)] pointer-events-none" />
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                                Ready to Transform<br />
                                <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Your Business?</span>
                            </h2>
                            <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-lg mx-auto">
                                Book a free 30-minute consultation. We'll show you exactly how {product.title} can be deployed for your use case.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/schedule-demo"
                                    className="px-10 py-4 text-black font-black rounded-full text-sm transition-all hover:scale-105"
                                    style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 32px rgba(249,115,22,0.4)' }}
                                >
                                    Book Free Demo
                                </Link>
                                <Link
                                    to="/contact"
                                    className="px-10 py-4 border border-orange-500/20 rounded-full text-white font-semibold hover:bg-white/05 transition-all text-sm flex items-center justify-center gap-2"
                                >
                                    Contact Sales
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductPage;
