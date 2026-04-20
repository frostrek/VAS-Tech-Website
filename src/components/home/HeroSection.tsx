import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import HeroSupportUI from "./HeroSupportUI";

const ROTATING_TEXTS = [
    { part1: "Employee Experiences", part2: "AI Copilots" },
    { part1: "Support Workflows", part2: "AI Agents" },
    { part1: "Operations", part2: "Automation" },
];

const HeroSection = () => {
    const [index, setIndex] = useState(0);

    // Text Rotation Interval
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        const startInterval = () => {
            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                setIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
            }, 3500);
        };

        const handleVisibility = () => {
            if (document.hidden) {
                if (interval) clearInterval(interval);
                interval = null;
            } else {
                startInterval();
            }
        };

        startInterval();
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            if (interval) clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 lg:pt-32 pb-8 bg-transparent">
            <div className="container mx-auto px-4 md:px-8 xl:px-0 relative z-10">
                <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center w-full max-w-[1300px] mx-auto">
                    
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full mx-auto lg:mx-0 z-20">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white leading-[1.1] tracking-tight mb-6 w-full flex flex-col items-center lg:items-start">
                            <span className="block mb-2">Transforming</span>
                            
                            <div className="h-[1.2em] relative overflow-hidden flex items-center justify-center lg:justify-start w-fit min-w-full mb-1">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="block whitespace-nowrap bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                                    >
                                        {ROTATING_TEXTS[index].part1}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            
                            <span className="block whitespace-nowrap mb-2 flex items-center gap-2">with Conversational</span>
                            
                            <div className="h-[1.2em] relative overflow-hidden flex items-center justify-center lg:justify-start w-fit min-w-full">
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                        key={index + '-part2'}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -50, opacity: 0 }}
                                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                                        className="block whitespace-nowrap bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                                    >
                                        {ROTATING_TEXTS[index].part2}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </h1>

                        <p className="text-lg sm:text-xl mb-10 max-w-[600px] lg:max-w-xl leading-relaxed text-gray-400 font-body">
                            Harness the power of AI to enhance productivity, streamline workflows, and foster a more engaged workforce across your enterprise.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                            <Link to="/schedule-demo" className="px-8 py-3.5 bg-supportiq-button text-black rounded-full font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all transform hover:scale-105 hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] w-full sm:w-auto text-center font-body text-base flex items-center justify-center">
                                Get Started Free
                            </Link>
                            <Link to="/contact" className="px-8 py-3.5 bg-transparent border border-orange-500/20 text-white rounded-full font-semibold transition-all w-full sm:w-auto hover:bg-white/10 text-center flex items-center justify-center font-body text-base">
                                Watch Demo
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: UI Mockup */}
                    <div className="flex justify-center items-center relative mt-8 lg:mt-0 w-full z-10 pointer-events-auto">
                        <HeroSupportUI />
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
