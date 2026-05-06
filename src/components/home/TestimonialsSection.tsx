import { useState, useEffect, useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote, Play, Pause } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS = [
    {
        quote: "The ROI was apparent within the first month. VAS Tech's automation pipelines handled over 40,000 document extractions flawlessly. We've reclaimed 80% of our team's time from manual data entry, allowing us to scale our logistics hub without adding headcount.",
        author: "Noah Oliver",
        role: "Operations Director",
        image: "/testi1.png",
        company: "Zenith Logistics",
        audio: "/Testimonials-Voices/Noah.wav"
    },
    {
        quote: "Implementing the VAS Tech WhatsApp AI transformed our support strategy. The agent's ability to understand complex queries and sentiment is uncanny. We've seen a 65% reduction in ticket volume and our CSAT has never been higher.",
        author: "Sarah Jenkins",
        role: "VP of Customer Experience",
        image: "/testi2.png",
        company: "Global Retail Corp",
        audio: "/Testimonials-Voices/Sarah.wav"
    },
    {
        quote: "The Voice AI calling agents from VAS Tech are a masterpiece of engineering. They handle our outbound qualification calls with a natural fluidity that rivals our best reps. It’s significantly boosted our pipeline velocity while slashing our cost-per-lead.",
        author: "Michael Chen",
        role: "Head of Sales",
        image: "/testi5.png",
        company: "Innovate FinTech",
        audio: "/Testimonials-Voices/Michael.wav"
    },
    {
        quote: "We needed a solution that could bridge our legacy ERP with modern AI capabilities. VAS Tech built a custom orchestration layer that unified our data silos. Their expertise in enterprise-grade security and zero-disruption deployment is unmatched in the industry.",
        author: "Elena Rodriguez",
        role: "CTO",
        image: "/testi4.png",
        company: "Nexa Manufacturing",
        audio: "/Testimonials-Voices/ella.wav"
    }
];

const ROTATION_INTERVAL = 4000; // 4.5 seconds per testimonial

const TestimonialsSection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    // Audio state
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Use ref for isPaused to avoid interval recreation
    const isPausedRef = useRef(isPaused);
    isPausedRef.current = isPaused;

    // Auto-rotation - fixed to not recreate on every index change
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPausedRef.current) {
                goToNext();
            }
        }, ROTATION_INTERVAL);

        return () => {
            clearInterval(interval);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    // Stop audio when testimonial changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current = null; // Important: Clear the ref so the next speaker's audio can be loaded
            setIsPlaying(false);
            setCurrentTime(0);
        }
    }, [currentIndex]);

    const togglePlay = () => {
        if (!audioRef.current) {
            audioRef.current = new Audio(TESTIMONIALS[currentIndex].audio);
            audioRef.current.addEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current?.currentTime || 0);
            });
            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current?.duration || 0);
            });
            audioRef.current.addEventListener('ended', () => {
                setIsPlaying(false);
                setCurrentTime(0);
            });
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Animate on index change
    const animateTransition = useCallback((direction: 'next' | 'prev') => {
        if (isAnimating || !cardRef.current || !imageRef.current) return;
        setIsAnimating(true);

        const xOffset = direction === 'next' ? 30 : -30;

        // Animate out
        gsap.to(cardRef.current, {
            opacity: 0,
            y: 20, // Slide down
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                // Update index
                setCurrentIndex(prev =>
                    direction === 'next'
                        ? (prev + 1) % TESTIMONIALS.length
                        : (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                );

                // Animate in from bottom (incoming chat effect)
                gsap.fromTo(cardRef.current,
                    { opacity: 0, y: 30, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.2)' }
                );

                // Animate image (Contact Profile bounce)
                gsap.fromTo(imageRef.current,
                    { opacity: 0, scale: 0.8 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.7)' }
                );

                setTimeout(() => setIsAnimating(false), 500);
            }
        });

        gsap.to(imageRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.3,
            ease: 'power2.in'
        });
    }, [isAnimating]);

    const goToNext = useCallback(() => {
        animateTransition('next');
    }, [animateTransition]);

    const goToPrev = useCallback(() => {
        animateTransition('prev');
    }, [animateTransition]);

    const goToIndex = useCallback((index: number) => {
        if (isAnimating || index === currentIndex) return;
        animateTransition(index > currentIndex ? 'next' : 'prev');
        // Force set the target index after animation
        setTimeout(() => setCurrentIndex(index), 350);
    }, [isAnimating, currentIndex, animateTransition]);

    // Initial scroll animation
    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.from(sectionRef.current, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    const current = TESTIMONIALS[currentIndex];

    // Animated Voice Waveform Component
    const VoiceWaveform = () => (
        <div className="flex items-center justify-center gap-1.5 h-12 mt-6">
            <span className={`w-1.5 h-4 bg-orange-500/70 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-8 bg-orange-400/90 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.2s]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-10 bg-yellow-400 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.4s]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-6 bg-orange-500/80 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.1s]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-12 bg-orange-400 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.3s]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-8 bg-orange-500/80 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.5s]' : 'opacity-30'}`} />
            <span className={`w-1.5 h-5 bg-orange-600/70 rounded-full ${isPlaying ? 'animate-[wave_1.2s_ease-in-out_infinite_0.2s]' : 'opacity-30'}`} />
        </div>
    );

    return (
        <section
            ref={sectionRef}
            className={`py-24 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-gray-50'}`}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <style>{`
                @keyframes wave {
                    0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
                    50% { transform: scaleY(1); opacity: 1; }
                }
            `}</style>

            {/* Decorative Elements - AI Nodes */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className={`text-4xl md:text-5xl font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Don't take our word for it. <br />
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Take theirs.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg">See how leading enterprises are scaling with VAS Tech AI.</p>
                </div>

                {/* Main Testimonial Display - Voice AI Layout */}
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 lg:gap-12 relative">

                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute left-[300px] top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-orange-500/50 to-transparent z-0" />

                        {/* Left: Contact/Persona Card */}
                        <div
                            ref={imageRef}
                            className="w-full md:w-[300px] flex-shrink-0 z-10"
                        >
                            <div className="bg-[#0A0A0A]/80 backdrop-blur-xl border border-orange-500/20 rounded-[2rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                                <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-b from-orange-400 to-orange-600 mb-6 shadow-xl">
                                    <img
                                        src={current.image}
                                        alt={current.author}
                                        className="w-full h-full object-cover rounded-full border-[3px] border-black"
                                        loading="lazy"
                                    />
                                    {/* Active status pulse */}
                                    <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">{current.author}</h3>
                                <p className="text-sm font-medium text-zinc-400 mb-3">{current.role}</p>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-orange-500/20">
                                    <span className="text-sm font-bold text-orange-400">{current.company}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: The Chat Bubble / Voice Memo */}
                        <div className="flex-grow z-10 flex items-center relative w-full">
                            {/* "Tail" of the chat bubble (Desktop only) */}
                            <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#111111] rotate-45 border-b border-l border-orange-500/20" />

                            <div
                                ref={cardRef}
                                className="w-full bg-[#111111] border border-orange-500/20 rounded-[2rem] md:rounded-l-none p-10 shadow-2xl relative overflow-hidden group"
                            >
                                {/* Subtle decorative quote icon */}
                                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 -rotate-12 transition-transform duration-700 group-hover:rotate-0" />

                                {/* 5 Star Rating */}
                                <div className="flex gap-1 mb-6">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg key={star} className="w-5 h-5 text-orange-500 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>

                                <p className="text-xl md:text-2xl leading-relaxed text-zinc-300 font-medium relative z-10">
                                    "{current.quote}"
                                </p>

                                {/* Voice AI Element */}
                                <div className="mt-8 pt-8 border-t border-orange-500/20 flex items-center gap-6">
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:scale-110 transition-transform active:scale-95"
                                    >
                                        {isPlaying ? (
                                            <Pause className="w-5 h-5 text-black" fill="currentColor" />
                                        ) : (
                                            <Play className="w-5 h-5 text-black ml-1" fill="currentColor" />
                                        )}
                                    </button>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-end mb-2">
                                            <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">
                                                {isPlaying ? 'Playing Voice Memo' : 'AI Voice Memo'}
                                            </span>
                                            <span className="text-xs font-medium text-zinc-500">
                                                {formatTime(currentTime)} / {formatTime(duration || 14)}
                                            </span>
                                        </div>
                                        <VoiceWaveform />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-center gap-6 mt-16 relative z-20">
                        <button
                            onClick={goToPrev}
                            disabled={isAnimating}
                            className="w-12 h-12 rounded-full border border-orange-500/20 bg-[#0A0A0A] flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all hover:scale-110 disabled:opacity-50 shadow-lg"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <div className="flex gap-3 px-6 py-3 rounded-full bg-[#0A0A0A] border border-orange-500/20 shadow-lg">
                            {TESTIMONIALS.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToIndex(idx)}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                        ? 'bg-gradient-to-r from-orange-400 to-yellow-400 w-8 shadow-[0_0_10px_rgba(249,115,22,0.5)]'
                                        : 'bg-zinc-700 hover:bg-zinc-500'
                                        }`}
                                    aria-label={`Go to testimonial ${idx + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNext}
                            disabled={isAnimating}
                            className="w-12 h-12 rounded-full border border-orange-500/20 bg-[#0A0A0A] flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-400 transition-all hover:scale-110 disabled:opacity-50 shadow-lg"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
