import { useState, useRef, useEffect } from 'react';
import { Terminal, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLAnchorElement>(null);
    const patternRef = useRef<HTMLDivElement>(null);

    const defaultText = `System.Initiate("Business_Transformation");\nDeploying AI Solutions...`;
    const [typedText, setTypedText] = useState("");
    const [cursorVisible, setCursorVisible] = useState(true);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Console Drop-in Animation
            gsap.from(contentRef.current, {
                y: 100,
                scale: 0.9,
                opacity: 0,
                rotateX: 10,
                duration: 1.2,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    onEnter: () => startTypingEffect(),
                }
            });

            // Rotating Grid Background
            if (patternRef.current) {
                gsap.to(patternRef.current, {
                    rotationZ: 360,
                    duration: 120,
                    repeat: -1,
                    ease: 'none',
                    transformOrigin: 'center center'
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    // Typewriter effect logic
    const startTypingEffect = () => {
        let i = 0;
        setTypedText(""); // Reset text
        const interval = setInterval(() => {
            if (i < defaultText.length) {
                setTypedText(defaultText.slice(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    };

    // Blinking cursor
    useEffect(() => {
        const cursorInterval = setInterval(() => setCursorVisible(v => !v), 530);
        return () => clearInterval(cursorInterval);
    }, []);

    // Button Pulse
    useEffect(() => {
        const primaryBtn = buttonsRef.current;
        if (!primaryBtn) return;

        gsap.to(primaryBtn, {
            boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }, []);

    return (
        <section ref={sectionRef} className={`py-32 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#030303]' : 'bg-gray-50'}`}>
            {/* Immersive Rotating Neural Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
                <div ref={patternRef} className="w-[150vw] h-[150vw] md:w-[100vw] md:h-[100vw]">
                    <div className="w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='none' stroke='%23F97316' stroke-width='0.5' stroke-opacity='0.2'/%3E%3C/svg%3E")`,
                        backgroundSize: '80px 80px',
                        maskImage: 'radial-gradient(circle, black 20%, transparent 60%)',
                        WebkitMaskImage: 'radial-gradient(circle, black 20%, transparent 60%)'
                    }} />
                </div>
            </div>

            {/* Glowing Core Orbit */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div ref={contentRef} className="max-w-3xl mx-auto perspective-1000">
                    
                    {/* The Console Window */}
                    <div className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-orange-500/20 rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.8),inset_0_0_80px_rgba(249,115,22,0.05)] overflow-hidden relative group">
                        
                        {/* Top Window Bar */}
                        <div className="h-10 border-b border-orange-500/20 flex items-center px-4 justify-between bg-white/[0.02]">
                            <div className="flex gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-[10px] font-mono text-zinc-500 tracking-widest">VAS_TECH_TERMINAL_v2.0</span>
                            <Terminal size={12} className="text-zinc-500" />
                        </div>

                        <div className="p-6 md:p-10 flex flex-col items-center">
                            
                            {/* Typewriter Prompt Display */}
                            <div className="w-full bg-black/40 border border-orange-500/20 rounded-xl p-4 mb-8 shadow-inner font-mono text-xs md:text-sm text-orange-400 min-h-[80px] flex flex-col justify-center">
                                <div className="whitespace-pre-wrap leading-relaxed">
                                    <span className="text-zinc-500 mr-3">~ %</span>
                                    {typedText}
                                    <span className={`inline-block w-2.5 h-4 bg-orange-500 align-middle ml-1 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`} />
                                </div>
                            </div>

                            {/* Main Messaging */}
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-tight text-white">
                                Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-500">Transform?</span>
                            </h2>
                            <p className="text-base md:text-lg text-zinc-400 text-center mb-8 max-w-xl leading-relaxed">
                                Don't let your competitors out-automate you. Step into the future of enterprise intelligence.
                            </p>

                            {/* The Glowing Action Center */}
                            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                                <Link 
                                    to="/schedule-demo" 
                                    ref={buttonsRef}
                                    className="relative group/btn rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 w-full sm:w-auto hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] px-6 py-3 flex items-center justify-center gap-2"
                                >
                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-xl" />
                                    <Zap className="text-white relative z-10" size={18} />
                                    <span className="font-bold text-base text-white whitespace-nowrap relative z-10">Initialize AI Solution</span>
                                    <ArrowRight className="text-white relative z-10 transition-transform group-hover/btn:translate-x-1" size={18} />
                                </Link>

                                <Link 
                                    to="/contact" 
                                    className="px-6 py-3 bg-transparent border border-orange-500/20 text-white rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto hover:bg-white/10 hover:border-orange-500/20 flex items-center justify-center gap-2"
                                >
                                    Talk to an Expert
                                </Link>
                            </div>

                            {/* Social Proof sub-text */}
                            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
                                <CheckCircle2 size={14} className="text-green-500" />
                                <span>No credit card required for initial consultation.</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            
            {/* Floor fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
        </section>
    );
};

export default CTASection;
