import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { ReviewItem } from '../../utils/productData';

interface ReviewsProps {
    reviews: ReviewItem[];
}

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                size={14}
                className={star <= rating ? 'text-orange-400 fill-orange-400' : 'text-zinc-700'}
            />
        ))}
    </div>
);

const Reviews = ({ reviews }: ReviewsProps) => {
    const [activeIdx, setActiveIdx] = useState(0);
    const [direction, setDirection] = useState(0);

    const navigate = useCallback((dir: 1 | -1) => {
        setDirection(dir);
        setActiveIdx(prev => (prev + dir + reviews.length) % reviews.length);
    }, [reviews.length]);

    // Auto-advance every 6 seconds
    useEffect(() => {
        const timer = setInterval(() => navigate(1), 6000);
        return () => clearInterval(timer);
    }, [navigate]);

    if (!reviews.length) return null;

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
        center: { x: 0, opacity: 1, scale: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0, scale: 0.95 }),
    };

    return (
        <section className="py-28 relative overflow-hidden">
            {/* Ambient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,_rgba(249,115,22,0.05)_0%,_transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/25 bg-orange-500/08 mb-6">
                        <Star size={12} className="text-orange-400 fill-orange-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Client Reviews</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
                        Trusted By Teams <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Worldwide</span>
                    </h2>
                </motion.div>

                {/* Review Carousel */}
                <div className="relative max-w-3xl mx-auto">
                    {/* Main card */}
                    <div className="relative min-h-[320px] flex items-center justify-center">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeIdx}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: 'easeInOut' }}
                                className="absolute inset-0 rounded-3xl border border-orange-500/15 p-8 md:p-12 flex flex-col items-center text-center"
                                style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06), rgba(8,8,8,0.98))' }}
                            >
                                {/* Quote icon */}
                                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                                    <Quote size={20} className="text-orange-400" />
                                </div>

                                {/* Review text */}
                                <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-medium mb-8 max-w-2xl italic">
                                    "{reviews[activeIdx].text}"
                                </p>

                                {/* Rating */}
                                <div className="mb-5">
                                    <StarRating rating={reviews[activeIdx].rating} />
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-4">
                                    {reviews[activeIdx].avatar && (
                                        <img
                                            src={reviews[activeIdx].avatar}
                                            alt={reviews[activeIdx].author}
                                            className="w-12 h-12 rounded-full border-2 border-orange-500/30 object-cover"
                                        />
                                    )}
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-white">{reviews[activeIdx].author}</p>
                                        <p className="text-xs text-zinc-500">
                                            {reviews[activeIdx].role} · {reviews[activeIdx].company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                        >
                            <ChevronLeft size={16} className="text-orange-400" />
                        </button>

                        {/* Dot indicators */}
                        <div className="flex gap-2">
                            {reviews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => { setDirection(idx > activeIdx ? 1 : -1); setActiveIdx(idx); }}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === activeIdx
                                            ? 'w-8 bg-gradient-to-r from-orange-500 to-yellow-400'
                                            : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={() => navigate(1)}
                            className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center hover:bg-orange-500/20 transition-colors"
                        >
                            <ChevronRight size={16} className="text-orange-400" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;
