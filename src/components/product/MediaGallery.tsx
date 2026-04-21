import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import type { MediaItem } from '../../utils/productData';

interface MediaGalleryProps {
    items: MediaItem[];
}

const MediaGallery = ({ items }: MediaGalleryProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const navigate = useCallback((dir: 1 | -1) => {
        setActiveIndex(prev => (prev + dir + items.length) % items.length);
    }, [items.length]);

    if (!items.length) return null;

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-[0.06] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #F97316, #FBBF24)' }} />

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
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Gallery</span>
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        See It In <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Action</span>
                    </h2>
                </motion.div>

                {/* Main Gallery */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
                    {/* Featured Image */}
                    <motion.div
                        className="relative group rounded-3xl overflow-hidden border border-orange-500/15 bg-[#0A0A0A] cursor-pointer"
                        onClick={() => setLightboxOpen(true)}
                        layoutId="gallery-main"
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIndex}
                                src={items[activeIndex].src}
                                alt={items[activeIndex].alt}
                                className="w-full h-[400px] md:h-[500px] object-cover"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            />
                        </AnimatePresence>

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                        {/* Caption */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                            <p className="text-sm text-zinc-300 font-medium">{items[activeIndex].caption}</p>
                        </div>

                        {/* Expand icon */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Maximize2 size={16} className="text-white" />
                        </div>

                        {/* Navigation arrows */}
                        {items.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500/30 hover:border-orange-500/30"
                                >
                                    <ChevronLeft size={18} className="text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(1); }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500/30 hover:border-orange-500/30"
                                >
                                    <ChevronRight size={18} className="text-white" />
                                </button>
                            </>
                        )}
                    </motion.div>

                    {/* Thumbnail strip */}
                    <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px] pb-2 lg:pb-0 lg:pr-2 scrollbar-hide">
                        {items.map((item, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`relative shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                                    idx === activeIndex
                                        ? 'border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                                        : 'border-transparent opacity-50 hover:opacity-80'
                                }`}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="w-24 h-16 lg:w-full lg:h-24 object-cover"
                                    loading="lazy"
                                />
                                {idx === activeIndex && (
                                    <motion.div
                                        layoutId="thumb-active"
                                        className="absolute inset-0 border-2 border-orange-500 rounded-2xl"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Dot indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {items.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                idx === activeIndex
                                    ? 'w-8 bg-gradient-to-r from-orange-500 to-yellow-400'
                                    : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                    >
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
                        >
                            <X size={20} className="text-white" />
                        </button>

                        <motion.img
                            src={items[activeIndex].src}
                            alt={items[activeIndex].alt}
                            className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Lightbox nav */}
                        {items.length > 1 && (
                            <>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                                >
                                    <ChevronLeft size={24} className="text-white" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); navigate(1); }}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                                >
                                    <ChevronRight size={24} className="text-white" />
                                </button>
                            </>
                        )}

                        {/* Caption */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                            <p className="text-sm text-zinc-400">{items[activeIndex].caption}</p>
                            <p className="text-xs text-zinc-600 mt-1">{activeIndex + 1} / {items.length}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default MediaGallery;
