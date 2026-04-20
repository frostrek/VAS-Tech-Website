import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Award, Zap, Shield, Globe, ArrowRight, Brain, CheckCircle2, ChevronDown } from 'lucide-react';
import ScrollToTop from '../components/ScrollToTop';
import { useRef, useState, useEffect, useMemo, memo } from 'react';
import { TIMELINE_DATA } from '../utils/aboutData';
import InnovationProcess from '../components/about/InnovationProcess';

import CTASection from '../components/home/CTASection';
import { useNavigate } from 'react-router-dom';



// ============ STUNNING TYPEWRITER ============
const TypewriterText = memo(({ texts }: { texts: string[] }) => {
    const [index, setIndex] = useState(0);
    const [text, setText] = useState(texts[0]);
    const [phase, setPhase] = useState<'show' | 'delete' | 'type'>('show');

    useEffect(() => {
        if (phase === 'show') {
            const t = setTimeout(() => setPhase('delete'), 2500);
            return () => clearTimeout(t);
        }
        if (phase === 'delete') {
            if (text.length > 0) {
                const t = setTimeout(() => setText(text.slice(0, -1)), 80);
                return () => clearTimeout(t);
            }
            setIndex(i => (i + 1) % texts.length);
            setPhase('type');
        }
        if (phase === 'type') {
            const target = texts[index];
            if (text.length < target.length) {
                const t = setTimeout(() => setText(target.slice(0, text.length + 1)), 120);
                return () => clearTimeout(t);
            }
            setPhase('show');
        }
    }, [text, phase, index, texts]);

    return (
        <span className="relative inline-flex items-center">
            <span className="text-transparent bg-clip-text bg-supportiq-button">
                {text}
            </span>
            <span className="inline-block w-[4px] h-[0.85em] bg-orange-400 ml-1.5 align-middle rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
        </span>
    );
});

// ============ INTERACTIVE BUTTON ============
const MagneticButton = memo(({ children, className, onClick, variant = 'primary' }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'cta'
}) => {
    const [hover, setHover] = useState(false);
    const [press, setPress] = useState(false);

    const baseStyles = variant === 'primary' || variant === 'cta'
        ? 'bg-[#111110] text-white shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(255,255,255,0.05),0_0_15px_rgba(249,115,22,0.1)] hover:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_0_0_1px_rgba(249,115,22,0.5),0_0_25px_rgba(249,115,22,0.2)]'
        : 'bg-[#1A1A1A] text-zinc-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] border-0 hover:text-white hover:bg-white/[0.03]';

    return (
        <motion.button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setPress(true)}
            onMouseUp={() => setPress(false)}
            onClick={onClick}
            className={`relative overflow-hidden rounded-[1rem] font-bold text-sm tracking-wide transition-all duration-300 ${baseStyles} ${className}`}
            animate={{ scale: press ? 0.96 : hover ? 1.02 : 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <span className="relative z-10">{children}</span>
            {hover && (variant === 'primary' || variant === 'cta') && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-400/20 z-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                />
            )}
        </motion.button>
    );
});


// ============ ANIMATED COUNTER ============
const Counter = memo(({ value, suffix = '', text }: { value?: number; suffix?: string; text?: string }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (text || value === undefined) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !started) {
                setStarted(true);
                let n = 0;
                const step = value / 40;
                const loop = () => {
                    n += step;
                    if (n >= value) setCount(value);
                    else { setCount(Math.floor(n)); requestAnimationFrame(loop); }
                };
                requestAnimationFrame(loop);
            }
        }, { threshold: 0.5 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [value, started, text]);

    if (text) return <span ref={ref}>{text}</span>;
    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
});



// ============ INTERACTIVE GLOBE ============
const InteractiveGlobe = memo(() => {
    const [hoveredCity, setHoveredCity] = useState<number | null>(null);
    const [isGlobeHovered, setIsGlobeHovered] = useState(false);

    const cities = useMemo(() => [
        { x: '18%', y: '28%', name: 'San Francisco', flag: '🇺🇸' },
        { x: '70%', y: '22%', name: 'London', flag: '🇬🇧' },
        { x: '82%', y: '55%', name: 'Singapore', flag: '🇸🇬' },
        { x: '15%', y: '62%', name: 'Dubai', flag: '🇦🇪' },
        { x: '52%', y: '12%', name: 'Berlin', flag: '🇩🇪' },
        { x: '75%', y: '42%', name: 'Bangalore', flag: '🇮🇳' },
    ], []);

    return (
        <div className="relative w-full h-80 flex items-center justify-center">
            {/* Animated rings */}
            <div className="absolute w-56 h-56 border-2 border-dashed border-brand-green-500/20 rounded-full animate-spin-slow" />
            <div className="absolute w-44 h-44 border-2 border-dashed border-brand-yellow-500/20 rounded-full animate-spin-slow-reverse" />

            {/* Globe center */}
            <motion.div
                className="relative w-24 h-24 bg-gradient-to-br from-brand-green-400 via-brand-green-500 to-brand-green-600 rounded-full flex items-center justify-center shadow-2xl cursor-pointer z-10"
                onMouseEnter={() => setIsGlobeHovered(true)}
                onMouseLeave={() => setIsGlobeHovered(false)}
                animate={{
                    scale: isGlobeHovered ? 1.1 : 1,
                    boxShadow: isGlobeHovered
                        ? '0 0 60px 10px rgba(176,117,82,0.4)'
                        : '0 20px 50px -10px rgba(176,117,82,0.4)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                <Globe className="w-12 h-12 text-white" />
                <div className="absolute inset-0 rounded-full border-2 border-brand-green-300 animate-ping" />
            </motion.div>

            {/* City dots with tooltips */}
            {cities.map((city, i) => (
                <motion.div
                    key={i}
                    className="absolute z-20"
                    style={{ left: city.x, top: city.y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: 'spring' }}
                    onMouseEnter={() => setHoveredCity(i)}
                    onMouseLeave={() => setHoveredCity(null)}
                >
                    <motion.div
                        className="relative cursor-pointer"
                        animate={{ scale: hoveredCity === i ? 1.5 : 1 }}
                    >
                        <div className="w-4 h-4 bg-brand-green-500 rounded-full shadow-lg" />
                        <div className="absolute inset-0 rounded-full bg-brand-green-400 animate-ping" style={{ animationDelay: `${i * 0.3}s` }} />
                    </motion.div>
                    <AnimatePresence>
                        {hoveredCity === i && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-2 bg-gray-900/95 backdrop-blur rounded-xl text-white text-xs whitespace-nowrap shadow-xl z-30"
                            >
                                <span className="text-base mr-1">{city.flag}</span>
                                <span className="font-medium">{city.name}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
});

// ============ MAIN COMPONENT ============
const About = () => {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref });
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

    const texts = useMemo(() => ['Intelligent Systems', 'Agentic AI', 'Machine Learning', 'Neural Networks'], []);

    const values = useMemo(() => [
        { icon: Zap, title: 'Innovation', desc: 'Cutting-edge AI solutions', color: 'brand-green' as const },
        { icon: Award, title: 'Excellence', desc: 'ISO certified quality', color: 'brand-yellow' as const },
        { icon: Shield, title: 'Trust', desc: 'Enterprise security', color: 'brand-green' as const },
        { icon: Award, title: 'Collaboration', desc: 'Partnership focused', color: 'brand-yellow' as const },
    ], []);

    const features = useMemo(() => [
        {
            num: '01',
            title: 'Trusted Expertise',
            desc: 'World-class AI research team with proven track record in enterprise AI deployments. Our experts bring decades of experience ensuring robust solutions.',
            stat: '5000+ Sessions',
            details: 'Former researchers from Google, Meta, and DeepMind with 15+ years in AI/ML. Successfully deployed solutions serving millions worldwide.',
            highlights: ['PhD-level researchers', '200+ published papers', 'Enterprise solutions']
        },
        {
            num: '02',
            title: 'Innovation-Driven',
            desc: 'Pushing technology boundaries with cutting-edge research in LLMs and autonomous agents. We invest heavily in R&D to deliver next-gen AI capabilities.',
            stat: 'Cutting-Edge',
            details: 'We invest 30% of resources in R&D, staying ahead with latest advancements in LLMs, autonomous agents, and neural networks.',
            highlights: ['Latest LLM technology', 'Real-time processing', 'Custom model training']
        },
        {
            num: '03',
            title: 'Client-Centered',
            desc: 'Your success is our priority with dedicated support and customized solutions. We deliver tailored AI systems that integrate seamlessly with workflows.',
            stat: 'Tailored',
            details: 'Every solution customized to your unique needs. Dedicated support ensures enterprise-grade uptime with 24/7 monitoring and assistance.',
            highlights: ['24/7 dedicated support', '99%+ uptime SLA', 'Custom integrations']
        },
        {
            num: '04',
            title: 'Production-Ready',
            desc: 'Scale without limits on cloud-native infrastructure handling billions of requests. Battle-tested architecture ensures zero downtime and automatic scaling.',
            stat: 'Enterprise',
            details: 'Cloud-native architecture handling billions of requests. Infrastructure scales automatically to meet growing demands with zero downtime.',
            highlights: ['Auto-scaling infrastructure', 'Billions of requests', 'Zero-downtime deploys']
        },
    ], []);

    const offices = useMemo(() => [
        {
            name: 'Canada',
            city: 'St Catharines',
            country: 'Canada',
            flagImg: 'https://flagcdn.com/w40/ca.png',
            image: '/CompanyOffice.webp',
            companyName: 'Global HQ',
            address: 'McNicholl Circle, St Catharines, Ontario L2N 7C5',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=McNicholl+Circle+St+Catharines+Ontario+L2N+7C5+Canada'
        },
        {
            name: 'USA',
            city: 'Austin',
            country: 'United States',
            flagImg: 'https://flagcdn.com/w40/us.png',
            image: '/701 Tillery St 12 3227, Austin, TX 78702, USA.jpg',
            companyName: 'USA Office',
            address: '701 Tillery Street Unit 12-3227, Austin, Texas 78702, United States',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=701+Tillery+Street+Unit+12-3227+Austin+Texas+78702'
        },
        {
            name: 'UK',
            city: 'London',
            country: 'United Kingdom',
            flagImg: 'https://flagcdn.com/w40/gb.png',
            image: '/24-26-Arcadia-Ave-London-Primary-Photo-1-LargeHighDefinition.jpg',
            companyName: 'UK Office',
            address: '24-26 Arcadia Avenue, Fin009/8701, London, United Kingdom, N3 2JU',
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=24-26+Arcadia+Avenue+London+N3+2JU'
        },
    ], []);

    return (
        <div ref={ref} className="min-h-screen relative overflow-hidden bg-[#050505]">
            <ScrollToTop />
            {/* Ambient Dark-Amber Background Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/10 blur-[120px]" />
                <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/10 blur-[150px]" />
                <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-orange-600/10 blur-[120px]" />
            </div>

            {/* ===== HERO: KINETIC ASYMMETRIC SPLIT ===== */}
            <motion.section style={{ y: bgY, opacity: 1 }} className="relative z-10 min-h-screen flex flex-col justify-center py-10 md:py-20 pt-20 md:pt-32">
                <div className="container mx-auto px-4 relative h-full">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
                    
                        {/* LEFT: Typographic Impact */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400">Our Identity</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif mb-6 leading-[1.05] text-white tracking-tight drop-shadow-2xl">
                                Designing<br />
                                The Future <br />
                                <TypewriterText texts={texts} />
                            </h1>

                            <p className="text-base md:text-lg mb-12 max-w-lg text-zinc-400 leading-relaxed font-medium">
                                We specialize in building autonomous AI clusters, high-fidelity neural networks, and scalable agent infrastructures that accelerate continuous enterprise evolution.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <MagneticButton
                                    variant="primary"
                                    className="px-8 py-4 bg-supportiq-button rounded-xl"
                                    onClick={() => navigate('/contact')}
                                >
                                    <span className="flex items-center gap-2 uppercase tracking-wider text-xs font-bold text-white">
                                        Partner With Us <ArrowRight className="w-4 h-4 ml-1" />
                                    </span>
                                </MagneticButton>
                            </div>
                        </motion.div>

                        {/* RIGHT: Floating Glass Panels (Pseudo-3D) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative h-[400px] lg:h-[500px] mt-10 lg:mt-0"
                            style={{ perspective: 1200 }}
                        >
                            {/* Panel 1 */}
                            <motion.div 
                                className="absolute lg:top-10 lg:right-10 w-[280px] lg:w-[320px] h-[320px] lg:h-[380px] bg-[#1A1A1A]/80 backdrop-blur-3xl rounded-[2rem] border border-orange-500/30 p-8 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_30px_60px_-15px_rgba(0,0,0,0.8)] z-20 flex flex-col justify-between left-1/2 -translate-x-1/2 lg:left-auto lg:-translate-x-0"
                                animate={{ y: [-15, 15, -15], rotateX: [3, -3, 3], rotateY: [-5, 5, -5] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6">
                                    <Brain className="w-6 h-6 text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-serif text-white mb-2">Neural Design</h3>
                                    <p className="text-sm text-zinc-400">Architecting intelligent systems mimicking human cognitive flow.</p>
                                </div>
                                <div className="mt-8 flex gap-2">
                                    {[1, 2, 3].map(i => <div key={i} className="h-1.5 flex-1 bg-gradient-to-r from-orange-500/50 to-transparent rounded-full" />)}
                                </div>
                            </motion.div>

                            {/* Panel 2 (Offset Back) */}
                            <motion.div 
                                className="absolute top-10 lg:top-32 right-[-20px] lg:right-[60%] w-[220px] lg:w-[280px] h-[220px] lg:h-[300px] bg-[#2A2A2A]/40 backdrop-blur-xl rounded-[2rem] border border-yellow-500/20 p-6 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] z-10 flex flex-col justify-end hidden sm:flex"
                                animate={{ y: [10, -10, 10], rotateZ: [-2, 4, -2] }}
                                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="text-right">
                                    <div className="text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-supportiq-button">10x</div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mt-2">Scale Factor</div>
                                </div>
                            </motion.div>
                            
                            {/* Glowing Core */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-orange-500/20 rounded-full blur-[80px]" />
                        </motion.div>

                    </div>
                </div>
            </motion.section>

            {/* ===== BENTO PURPOSE & STATS ===== */}
            <section className="py-16 md:py-24 overflow-hidden relative">
                <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-full h-[500px] bg-orange-500/05 blur-[120px] rounded-full point-events-none z-0" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[auto] md:auto-rows-[250px] gap-6 max-w-7xl mx-auto">
                        
                        {/* Huge Mission Block (Spans 2 cols, 2 rows) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                            className="md:col-span-2 md:row-span-2 relative rounded-[2rem] overflow-hidden bg-[#1A1A1A] border border-orange-500/20 p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_40px_rgba(0,0,0,0.5)] group flex flex-col justify-between"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            <div className="relative z-10">
                                <h2 className="text-2xl md:text-4xl font-serif leading-[1.1] mb-6 text-white tracking-tight">
                                    Our Core Purpose is <span className="text-transparent bg-clip-text bg-supportiq-button">Transformation</span>
                                </h2>
                                <p className="text-base text-zinc-400 leading-relaxed font-medium max-w-xl">
                                    We work with enterprises to reimagine business with our AI Agent Platform, AI Solutions for Work, Service and Process, and Agent Marketplace. 
                                    With VAS Tech, customers get a standardized approach to developing, deploying, and orchestrating AI agents across the enterprise with speed, control, and flexibility.
                                </p>
                            </div>
                            <div className="mt-8 flex gap-4 relative z-10">
                                <MagneticButton variant="primary" onClick={() => navigate("/experience")} className="px-6 py-4 font-bold text-xs uppercase bg-supportiq-button text-black rounded-xl">
                                    Agent Platform
                                </MagneticButton>
                            </div>
                        </motion.div>

                        {/* Image Block (Spans 1 col, 2 rows) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                            className="md:col-span-1 lg:col-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden border border-orange-500/20 shadow-[0_20px_40px_rgba(0,0,0,0.5)] group hidden lg:block h-full"
                        >
                            <img src="/campus-4.jpg" alt="VAS Tech Team" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" loading="lazy" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-transparent to-transparent opacity-80" />
                            <div className="absolute bottom-6 left-6 text-white font-black text-2xl drop-shadow-md">
                                Team <br/><span className="text-orange-400">VAS Tech</span>
                            </div>
                        </motion.div>

                        {/* Small Stat Block 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-[#111110] rounded-[2rem] border border-orange-500/20 p-8 flex flex-col justify-end shadow-xl relative overflow-hidden group min-h-[200px]"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                                <Zap className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="text-3xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors"><Counter value={undefined} suffix="+" text="Extensive" /></div>
                            <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">Training Cycles</div>
                        </motion.div>

                        {/* Small Stat Block 2 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-[#111110] rounded-[2rem] border border-orange-500/20 p-8 flex flex-col justify-end shadow-xl relative overflow-hidden group min-h-[200px]"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center">
                                <Award className="w-5 h-5 text-amber-400" />
                            </div>
                            <div className="text-3xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors"><Counter value={undefined} suffix="+" text="Expert" /></div>
                            <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">AI Specialists</div>
                        </motion.div>
                        
                        {/* Wide Stat Block (Spans 2 cols, 1 row) */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }}
                            className="md:col-span-2 lg:col-span-2 bg-[#1A1A1A] rounded-[2rem] border border-orange-500/20 p-8 flex flex-col justify-end shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[200px]"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                            <div className="flex items-end justify-between relative z-10 w-full">
                                <div>
                                    <div className="text-4xl font-serif text-transparent bg-clip-text bg-supportiq-button mb-2">Global</div>
                                    <div className="text-xs font-bold tracking-widest uppercase text-zinc-400">Enterprise Client Reach</div>
                                </div>
                                <Globe className="w-16 h-16 text-orange-500/30" />
                            </div>
                        </motion.div>
                        
                        {/* Small Stat Block 3 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}
                            className="md:col-span-1 lg:col-span-2 bg-[#111110] rounded-[2rem] border border-orange-500/20 p-8 flex flex-col justify-end shadow-xl relative overflow-hidden group min-h-[200px]"
                        >
                            <div className="absolute top-6 right-6 w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                                <Shield className="w-5 h-5 text-orange-400" />
                            </div>
                            <div className="text-3xl font-serif text-white mb-2 group-hover:text-amber-400 transition-colors"><Counter value={undefined} suffix="%" text="Enterprise" /></div>
                            <div className="text-xs font-bold tracking-widest uppercase text-zinc-500">Accuracy Standards</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ===== TIMELINE SECTION: STICKY STACKS ===== */}
            <section className="py-24 relative bg-[#0a0705]">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-serif mb-6 text-white tracking-tight"
                        >
                            Our Journey
                        </motion.h2>
                        <p className="text-lg max-w-2xl mx-auto text-zinc-400">
                            From a bold idea to a global leader in Agentic AI.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto flex flex-col gap-6" style={{ paddingBottom: '10vh' }}>
                        {TIMELINE_DATA.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px", once: true }}
                                transition={{ duration: 0.6 }}
                                className="sticky w-full"
                                style={{ top: `calc(15vh + ${i * 40}px)`, zIndex: i + 10 }}
                            >
                                <div className="bg-[#111110] rounded-[2rem] border border-orange-500/20 shadow-[0_-10px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center origin-top relative overflow-hidden transition-all duration-300 hover:shadow-[0_-5px_40px_rgba(249,115,22,0.2)]">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                                    
                                    <div className="flex-1 text-left relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-supportiq-button">
                                                {item.year}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-serif text-white mb-4">{item.title}</h3>
                                        <p className="text-zinc-400 leading-relaxed text-base max-w-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                    
                                    <div className="w-full md:w-[45%] rounded-[1.5rem] overflow-hidden aspect-video border border-orange-500/20 relative shadow-lg bg-[#000]">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/40 mix-blend-overlay pointer-events-none" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== INNOVATION ENGINE ===== */}
            <section className="py-16 md:py-24 bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-4 bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                        >
                            How We Work
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-4xl font-serif mb-4 text-white tracking-tight"
                        >
                            Our Innovation Engine
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-lg max-w-2xl mx-auto text-zinc-400"
                        >
                            A proven methodology that transforms ideas into enterprise-grade AI solutions.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <InnovationProcess />
                    </motion.div>
                </div>
            </section>

            {/* ===== CORE VALUES (EXPANDING ACCORDION) ===== */}
            <section className="py-24 relative overflow-hidden bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white tracking-tight">Core Values</h2>
                        <p className="text-lg text-zinc-400">The principles that guide us</p>
                    </div>

                    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 h-[600px] md:h-[500px]">
                        {values.map((v, i) => (
                            <motion.div
                                key={i}
                                className="group relative rounded-[2rem] overflow-hidden border border-orange-500/20 bg-[#111110] cursor-pointer flex-1 md:flex-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hover:flex-grow-[3] hover:flex-grow-[3] flex flex-col justify-end p-6 md:p-8"
                                style={{ flexBasis: '100px' }}
                            >
                                {/* Static Icon View */}
                                <div className="absolute top-6 left-6 w-12 h-12 rounded-xl bg-[#1A1A1A] border border-orange-500/30 flex items-center justify-center transition-all duration-700 group-hover:scale-110 shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                                    <v.icon className="w-6 h-6 text-orange-400" />
                                </div>
                                
                                <div className="absolute inset-0 bg-transparent group-hover:bg-orange-500/5 transition-colors duration-700 pointer-events-none" />
                                <div className="absolute bottom-[-20%] right-[-10%] w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                {/* Expanded Content */}
                                <div className="relative z-10 w-full md:min-w-[300px] opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-700 delay-100 hidden group-hover:block">
                                    <h3 className="font-serif text-white text-$1xl mb-2">{v.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">{v.desc}</p>
                                </div>
                                
                                {/* Vertical text for collapsed state */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-100 group-hover:opacity-0 transition-opacity duration-300 md:-rotate-90 whitespace-nowrap hidden md:block pointer-events-none origin-center">
                                    <span className="font-bold text-lg text-zinc-500 tracking-widest uppercase">{v.title}</span>
                                </div>
                                <div className="absolute bottom-6 left-24 opacity-100 group-hover:opacity-0 transition-opacity duration-300 md:hidden pointer-events-none">
                                    <span className="font-bold text-base text-zinc-500 tracking-widest uppercase">{v.title}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY VAS TECH ===== */}
            <section className="py-24 relative bg-[#0a0705]">
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-[10%] w-[400px] h-[400px] bg-orange-500/05 blur-[120px] rounded-full -translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif mb-4 text-white tracking-tight">Why VAS Tech?</h2>
                        <p className="text-lg text-zinc-400">Experience the difference</p>
                    </div>

                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        {/* List */}
                        <div className="flex flex-col gap-4 relative z-20">
                            {features.map((f, i) => (
                                <motion.div 
                                    key={i}
                                    className="group relative bg-[#111110] border border-orange-500/20 rounded-2xl p-6 md:p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:bg-[#150D08] hover:border-orange-500/30 hover:scale-[1.02] shadow-xl hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)]"
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    
                                    <div className="flex items-center gap-6 relative z-10">
                                        <div className="w-16 h-16 rounded-2xl bg-[#1A1A1A] border border-orange-500/20 flex items-center justify-center text-3xl font-serif text-zinc-700 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-all duration-300 shadow-inner group-hover:shadow-[inset_0_2px_15px_rgba(249,115,22,0.3)]">
                                            {f.num}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                                            <p className="text-zinc-500 text-sm">{f.desc}</p>
                                        </div>
                                    </div>

                                    {/* Expandable Details on Hover */}
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                        <div className="overflow-hidden">
                                            <div className="mt-8 pt-6 border-t border-orange-500/20 text-zinc-400 text-sm">
                                                <p className="mb-4">{f.details}</p>
                                                <div className="space-y-2">
                                                    {f.highlights.map((h, hi) => (
                                                        <div key={hi} className="flex gap-2 items-center">
                                                            <CheckCircle2 className="w-4 h-4 text-orange-400" />
                                                            <span className="text-zinc-300 text-sm font-medium">{h}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-1/2 right-6 -translate-y-1/2 w-8 h-8 rounded-full border border-orange-500/20 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity">
                                        <ChevronDown className="w-4 h-4 text-zinc-500" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        
                        {/* Interactive Visual Right Side */}
                        <div className="hidden lg:block relative h-[600px] w-full perspective-1000">
                            <motion.div 
                                className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-transparent rounded-full border border-orange-500/20 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute w-[80%] h-[80%] rounded-full border border-yellow-500/10 border-dashed" />
                                <div className="w-16 h-16 rounded-full bg-orange-500 blur-xl absolute top-0 -translate-y-1/2" />
                            </motion.div>
                            
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 bg-[#111110] rounded-full border border-orange-500/30 flex items-center justify-center shadow-[inset_0_0_50px_rgba(249,115,22,0.2),0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl relative overflow-hidden">
                                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-orange-500" />
                                    <Brain className="w-24 h-24 text-orange-400 opacity-80" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== GLOBAL PRESENCE ===== */}
            <section className="py-24 relative overflow-hidden bg-[#050505]">
                <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-12">
                    
                    {/* Info */}
                    <div className="lg:w-1/3 flex flex-col justify-center relative z-20">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex w-max items-center px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase mb-6 bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)]"
                        >
                            <Globe className="inline w-4 h-4 mr-2" />
                            Our Reach
                        </motion.span>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6 text-white tracking-tight leading-tight">
                            Worldwide <br/> Presence.
                        </h2>

                        <p className="text-lg text-zinc-400 mb-12 leading-relaxed">
                            Serving enterprises across three continents. Our localized infrastructure ensures low latency and robust compliance for AI deployment.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            {offices.map((o, i) => (
                                <motion.a 
                                    key={i}
                                    href={o.mapUrl}
                                    target="_blank"
                                    className="group relative bg-[#111110] p-4 rounded-2xl border border-orange-500/20 flex items-center justify-between hover:border-orange-500/30 transition-colors shadow-sm hover:shadow-[0_10px_20px_rgba(249,115,22,0.1)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={o.flagImg} alt={o.city} className="w-8 h-6 rounded-sm shadow-sm opacity-80 group-hover:opacity-100" />
                                        <div>
                                            <h4 className="font-bold text-white text-base leading-none mb-1">{o.city}</h4>
                                            <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">{o.name}</span>
                                        </div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center group-hover:bg-orange-500/10 transition-colors">
                                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Globe Visualization */}
                    <div className="lg:w-2/3 h-[500px] lg:h-[800px] w-full relative perspective-1000">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0705] via-transparent to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-full lg:scale-[1.2] origin-right pointer-events-none mix-blend-screen opacity-50">
                            <InteractiveGlobe />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <CTASection />
        </div>
    );
};

export default About;
