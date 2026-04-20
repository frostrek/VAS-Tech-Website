import { useRef } from 'react';
import { Zap, Shield, Users, BarChart, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const FeaturesSection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            // Animate heading
            gsap.fromTo(headingRef.current,
                { y: 50, opacity: 0, filter: 'blur(8px)' },
                {
                    y: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );

            // Staggered card reveal
            const cards = gridRef.current?.querySelectorAll('.bento-card');
            if (cards) {
                gsap.fromTo(cards,
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.95
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.7,
                        stagger: 0.1,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top 85%',
                            toggleActions: 'play none none none'
                        }
                    }
                );
            }

        }, sectionRef);

        return () => ctx.revert();
    }, { scope: sectionRef });

    return (
        <section ref={sectionRef} className={`pt-8 pb-16 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-dark-bg' : 'bg-transparent'}`}>
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#fff' : '#000'} 1px, transparent 1px)`,
                backgroundSize: '24px 24px'
            }} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div ref={headingRef} className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight">
                        Built for <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Enterprise Scale</span>
                    </h2>
                    <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
                        Everything you need to build, deploy, and scale AI agents in your organization.
                    </p>
                </div>

                {/* Bento Grid Layout */}
                <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

                    {/* Hero Card - Enterprise Security (spans 2 rows on desktop) */}
                    <div className="bento-card lg:row-span-2 group relative overflow-hidden rounded-[2rem] border border-orange-500/20 bg-[#0A0A0A]/60 backdrop-blur-xl p-8 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30">
                        {/* Glow effect */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] group-hover:bg-orange-500/20 transition-all duration-700" />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 transition-transform duration-500 group-hover:scale-110">
                                <Shield className="text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.4)]" size={32} />
                            </div>

                            <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-400 transition-colors">
                                Enterprise Security
                            </h3>
                            <p className="mb-8 text-zinc-400 leading-relaxed text-sm">
                                Role-based access control, end-to-end data encryption, comprehensive audit logs, and compliance-ready infrastructure built-in.
                            </p>

                            {/* Feature tags */}
                            <div className="flex flex-wrap gap-2.5 mb-8">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-orange-500/20 text-zinc-300 shadow-sm backdrop-blur-sm">
                                    <CheckCircle2 size={14} className="text-orange-500" /> ISO Certified
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-orange-500/20 text-zinc-300 shadow-sm backdrop-blur-sm">
                                    <CheckCircle2 size={14} className="text-orange-500" /> Enterprise Secure
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-orange-500/20 text-zinc-300 shadow-sm backdrop-blur-sm">
                                    <CheckCircle2 size={14} className="text-orange-500" /> ISO 9001
                                </span>
                            </div>

                            <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors group/link pb-1 border-b border-orange-500/30 hover:border-orange-400">
                                Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Lightning Fast */}
                    <div className="bento-card group relative overflow-hidden rounded-[1.5rem] border border-orange-500/20 bg-[#0A0A0A]/40 backdrop-blur-md p-6 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(249,115,22,0.1)] hover:border-orange-500/20 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#111111] border border-orange-500/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-orange-500/30">
                                <Zap className="text-orange-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                                    Lightning Fast
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    Sub-second response times with optimized LLM routing and intelligent caching.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Real-time Analytics */}
                    <div className="bento-card group relative overflow-hidden rounded-[1.5rem] border border-orange-500/20 bg-[#0A0A0A]/40 backdrop-blur-md p-6 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(249,115,22,0.1)] hover:border-orange-500/20 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#111111] border border-orange-500/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-orange-500/30">
                                <BarChart className="text-orange-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                                    Real-time Analytics
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    Track KPIs, conversation quality, and user satisfaction metrics live.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Multi-agent Orchestration */}
                    <div className="bento-card group relative overflow-hidden rounded-[1.5rem] border border-orange-500/20 bg-[#0A0A0A]/40 backdrop-blur-md p-6 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(249,115,22,0.1)] hover:border-orange-500/20 hover:-translate-y-1">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#111111] border border-orange-500/20 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:border-orange-500/30">
                                <Users className="text-orange-400" size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                                    Multi-agent Orchestration
                                </h3>
                                <p className="text-sm leading-relaxed text-zinc-400">
                                    Deploy multiple agents across channels with unified analytics dashboard.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
