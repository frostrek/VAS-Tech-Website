import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Phone, MessageSquare, Bot, Mail,
    Users, Database,
    FileText, Workflow,
    Globe, BarChart3,
    PenTool, Search,
    UserCheck, Brain,
    ArrowRight, CheckCircle2, Zap, Shield, Star, ChevronRight, TrendingUp
} from 'lucide-react';
import CTASection from '../components/home/CTASection';

/* ─── SOLUTIONS DATA ─────────────────────────────────────────────────────── */
const SOLUTIONS_DATA = {
    '/solutions/sales': {
        id: 'sales',
        badge: 'Sales Teams',
        title: 'AI for Sales',
        subtitle: 'Close More, Faster.',
        description: 'Supercharge your revenue team with AI that finds leads, follows up automatically, and logs every interaction to your CRM — so your reps can focus entirely on closing.',
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
        highlight: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
        challenges: [
            { problem: 'Low Conversion Rates', icon: TrendingUp, fix: 'AI agents engage and qualify leads instantly, 24/7 — increasing conversion by up to 40%.' },
            { problem: 'Manual CRM Updates', icon: Database, fix: 'Calls, emails, and notes sync to your CRM automatically. Zero manual data entry.' },
            { problem: 'Gut-Feel Forecasting', icon: BarChart3, fix: 'Predictive models analyse interactions to forecast revenue with 90%+ accuracy.' },
        ],
        products: [
            { icon: Users, name: 'Lead Generation Agent', desc: 'Scrapes, qualifies, and enriches leads from multiple sources' },
            { icon: Database, name: 'CRM Automation', desc: 'Auto-log calls, score leads, trigger follow-up workflows' },
            { icon: Phone, name: 'AI Calling Agent', desc: 'Outbound prospecting and follow-up calls at scale' },
            { icon: Mail, name: 'Email Automation Agent', desc: 'Personalised sequences triggered by behaviour' },
        ],
        stats: [{ value: '40%', label: 'Avg conversion lift' }, { value: '5×', label: 'Lead response speed' }, { value: '70%', label: 'Less admin time' }],
    },
    '/solutions/support': {
        id: 'support',
        badge: 'Customer Support',
        title: 'AI for Support',
        subtitle: '24/7 World-Class Service.',
        description: 'Resolve 80% of support tickets automatically. Reduce queue times, eliminate agent burnout, and guarantee consistent, on-brand answers across every channel.',
        color: '#F59E0B',
        colorLight: 'rgba(245,158,11,0.10)',
        colorBorder: 'rgba(245,158,11,0.22)',
        highlight: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
        challenges: [
            { problem: 'Long Wait Times', icon: Zap, fix: 'Instantly resolve 80% of queries with AI that understands intent and context.' },
            { problem: 'Agent Burnout', icon: UserCheck, fix: 'Deflect repetitive tickets so your team focuses on complex, high-value issues.' },
            { problem: 'Inconsistent Answers', icon: Brain, fix: 'A unified Knowledge Base ensures every answer is accurate and on-brand.' },
        ],
        products: [
            { icon: Bot, name: 'Website Chatbot', desc: 'Embedded AI handling FAQs, triage & escalation' },
            { icon: MessageSquare, name: 'WhatsApp Bot', desc: 'Support flows on WhatsApp Business API' },
            { icon: Brain, name: 'Internal Knowledge Bot', desc: 'Instant answers from your existing docs & SOPs' },
            { icon: Phone, name: 'AI Calling Agent', desc: 'Voice AI for inbound support queries' },
        ],
        stats: [{ value: '80%', label: 'Queries auto-resolved' }, { value: '60%', label: 'Ticket volume reduction' }, { value: '<3s', label: 'Avg response time' }],
    },
    '/solutions/ecommerce': {
        id: 'ecommerce',
        badge: 'E-Commerce',
        title: 'AI for E-Commerce',
        subtitle: 'Personalise Every Journey.',
        description: 'Turn visitors into loyal customers. Automate product content, recover abandoned carts, track competitor prices, and provide 24/7 support — all with AI.',
        color: '#EAB308',
        colorLight: 'rgba(234,179,8,0.10)',
        colorBorder: 'rgba(234,179,8,0.22)',
        highlight: 'bg-yellow-500/10 border-yellow-500/25 text-yellow-400',
        challenges: [
            { problem: 'Cart Abandonment', icon: MessageSquare, fix: 'Personalised WhatsApp recovery messages at the perfect moment — 3× more effective than email.' },
            { problem: 'Manual Product Content', icon: PenTool, fix: '1,000 SEO-optimised product descriptions from a CSV. Publish in hours, not weeks.' },
            { problem: 'No Competitor Visibility', icon: Globe, fix: 'Monitor rival prices daily and auto-alert when thresholds are breached.' },
        ],
        products: [
            { icon: PenTool, name: 'Content Generation Agent', desc: 'Bulk product descriptions and SEO copy at scale' },
            { icon: MessageSquare, name: 'WhatsApp Bot', desc: 'Cart recovery, order updates & loyalty nudges' },
            { icon: Globe, name: 'Web Scraping & Monitoring', desc: 'Competitor price tracking and alerts' },
            { icon: Bot, name: 'Website Chatbot', desc: '24/7 product Q&A and post-purchase support' },
        ],
        stats: [{ value: '3×', label: 'Cart recovery rate' }, { value: '1000s', label: 'Product descriptions/hour' }, { value: '24/7', label: 'Customer support coverage' }],
    },
    '/solutions/erp': {
        id: 'erp',
        badge: 'Enterprise & ERP',
        title: 'AI for ERP',
        subtitle: 'Intelligent Operations.',
        description: 'Modernise your enterprise operations with AI. Automate invoicing, connect every system in your stack, and equip every employee with an intelligent internal assistant.',
        color: '#D97706',
        colorLight: 'rgba(217,119,6,0.10)',
        colorBorder: 'rgba(217,119,6,0.22)',
        highlight: 'bg-amber-600/10 border-amber-600/25 text-amber-500',
        challenges: [
            { problem: 'Data Silos', icon: Database, fix: 'Unified integration layer connects all apps into a single source of truth via n8n / Make.' },
            { problem: 'Manual Invoice Processing', icon: FileText, fix: 'AI extracts and validates thousands of invoices in seconds with full audit logs.' },
            { problem: 'Reactive Decision-Making', icon: BarChart3, fix: 'AI dashboards surface anomalies and opportunities before they impact the bottom line.' },
        ],
        products: [
            { icon: FileText, name: 'Invoice & Document AI', desc: 'Extract, validate & route invoices and POs automatically' },
            { icon: Workflow, name: 'Workflow Builder (n8n / Make)', desc: 'Connect every app in your stack with no-code flows' },
            { icon: BarChart3, name: 'AI Analytics Dashboard', desc: 'Real-time KPI intelligence across departments' },
            { icon: Brain, name: 'Internal Knowledge Bot', desc: 'Company-wide AI for policies, SOPs and compliance' },
        ],
        stats: [{ value: '90%', label: 'Invoice processing time saved' }, { value: '100s', label: 'Apps connectable' }, { value: '12mo+', label: 'Avg contract length' }],
    },
};

type SolutionKey = keyof typeof SOLUTIONS_DATA;

/* ─── SOLUTIONS OVERVIEW ─────────────────────────────────────────────────── */
const ALL_SOLUTIONS = [
    {
        path: '/solutions/sales',
        icon: TrendingUp,
        label: 'AI for Sales',
        desc: 'Lead gen, CRM automation, and AI calling to close more deals.',
        features: ['Automated Lead Qualification', 'Zero-touch CRM Updates', 'Predictive Revenue Models'],
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
    },
    {
        path: '/solutions/support',
        icon: MessageSquare,
        label: 'AI for Support',
        desc: 'Chatbots, knowledge bots, and WhatsApp agents for 24/7 support.',
        features: ['Instant Ticket Resolution', 'Omnichannel AI Handlers', 'Internal Knowledge Access'],
        color: '#F59E0B',
        colorLight: 'rgba(245,158,11,0.10)',
        colorBorder: 'rgba(245,158,11,0.22)',
    },
    {
        path: '/solutions/ecommerce',
        icon: Bot,
        label: 'AI for E-Commerce',
        desc: 'Cart recovery, content generation, competitor tracking.',
        features: ['Smart Cart Recovery', 'Bulk SEO Content Generation', 'Real-time Price Tracking'],
        color: '#EAB308',
        colorLight: 'rgba(234,179,8,0.10)',
        colorBorder: 'rgba(234,179,8,0.22)',
    },
    {
        path: '/solutions/erp',
        icon: Workflow,
        label: 'AI for ERP',
        desc: 'Invoice AI, workflow builder, and internal knowledge bots.',
        features: ['Automated Invoice Processing', 'Cross-platform Data Sync', 'AI Executive Dashboards'],
        color: '#D97706',
        colorLight: 'rgba(217,119,6,0.10)',
        colorBorder: 'rgba(217,119,6,0.22)',
    },
];

/* ─── OVERVIEW PAGE ──────────────────────────────────────────────────────── */
const SolutionsOverview = () => (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-20">
        {/* Hero */}
        <div className="relative overflow-hidden mb-20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.07)_0%,_transparent_65%)] pointer-events-none" />
            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/10 mb-7">
                    <Star size={12} className="text-orange-400" fill="currentColor" />
                    <span className="text-[10.5px] font-black uppercase tracking-[0.25em] text-orange-400">Industry-Specific AI Solutions</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6">
                    AI Built for<br />
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Your Industry</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                    className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                    Pick your vertical. We'll show you exactly which AI products apply to you — with real numbers, real examples, and a demo you can book in 30 seconds.
                </motion.p>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex gap-4 justify-center">
                    <Link to="/schedule-demo" className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black rounded-full shadow-[0_0_28px_rgba(249,115,22,0.4)] hover:scale-105 transition-all text-sm">
                        Book Free Consultation
                    </Link>
                    <Link to="/products" className="px-7 py-3.5 border border-orange-500/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all text-sm flex items-center gap-2">
                        View All Products <ChevronRight size={14} />
                    </Link>
                </motion.div>
            </div>
        </div>

        {/* Solution Cards */}
        <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ALL_SOLUTIONS.map((sol, i) => {
                    const Icon = sol.icon;
                    return (
                        <motion.div key={sol.path} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55, delay: i * 0.08 }}
                            className="group relative rounded-[2rem] border p-8 md:p-10 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col"
                            style={{ background: `linear-gradient(135deg, rgba(8,8,8,0.97), rgba(5,5,5,1))`, borderColor: sol.colorBorder }}>
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(ellipse at top right, ${sol.colorLight} 0%, transparent 70%)` }} />
                            
                            <div className="flex items-start justify-between mb-6 relative z-10">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-lg"
                                    style={{ background: sol.colorLight, borderColor: sol.colorBorder }}>
                                    <Icon size={26} style={{ color: sol.color }} />
                                </div>
                            </div>
                            
                            <div className="relative z-10 flex-1">
                                <h2 className="text-2xl font-bold text-white mb-3 transition-colors duration-300">{sol.label}</h2>
                                <p className="text-zinc-400 text-[15px] leading-relaxed mb-6">{sol.desc}</p>
                                
                                <ul className="space-y-3 mb-8">
                                    {sol.features.map((feat, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300 font-medium">
                                            <CheckCircle2 size={16} style={{ color: sol.color }} className="opacity-80 shrink-0" />
                                            {feat}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            
                            <Link to={sol.path}
                                className="relative z-10 inline-flex items-center justify-center w-full py-4 rounded-xl text-[14px] font-bold transition-all border group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)] text-white"
                                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.08)' }}>
                                <span className="flex items-center gap-2 group-hover:gap-3 transition-all" style={{ color: sol.color }}>
                                    Explore Solution <ArrowRight size={15} />
                                </span>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>

        <CTASection />
    </div>
);

/* ─── SOLUTION DETAIL PAGE ───────────────────────────────────────────────── */
const SolutionDetail = ({ data }: { data: typeof SOLUTIONS_DATA[SolutionKey] }) => (
    <div className="min-h-screen bg-[#050505] text-white">
        {/* Hero */}
        <div className="relative overflow-hidden pt-32 pb-24">
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 40% 50%, ${data.colorLight} 0%, transparent 60%)` }} />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1100px] relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left */}
                    <div>
                        <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10.5px] font-black uppercase tracking-widest mb-7"
                            style={{ color: data.color, borderColor: data.colorBorder, background: data.colorLight }}>
                            {data.badge}
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-serif text-white leading-tight mb-4">
                            {data.title}<br />
                            <span style={{ color: data.color }}>{data.subtitle}</span>
                        </motion.h1>
                        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                            className="text-zinc-400 text-base leading-relaxed mb-8 max-w-lg">{data.description}</motion.p>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex gap-4 flex-wrap">
                            <Link to="/schedule-demo" className="px-7 py-3.5 bg-gradient-to-r from-orange-500 to-yellow-400 text-black font-black rounded-full shadow-[0_0_24px_rgba(249,115,22,0.4)] hover:scale-105 transition-all text-sm">
                                Book a Demo
                            </Link>
                            <Link to="/products" className="px-7 py-3.5 border border-orange-500/20 rounded-full text-white font-semibold hover:bg-white/5 transition-all text-sm flex items-center gap-2">
                                View All Products <ChevronRight size={14} />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Stats */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
                        className="grid grid-cols-3 gap-4">
                        {data.stats.map((stat, i) => (
                            <div key={i} className="rounded-2xl border p-5 text-center"
                                style={{ background: data.colorLight, borderColor: data.colorBorder }}>
                                <div className="text-3xl md:text-4xl font-serif font-bold mb-1" style={{ color: data.color }}>{stat.value}</div>
                                <div className="text-[11px] text-zinc-400 font-semibold uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Challenges & Fixes */}
        <section className="py-20 border-t border-orange-500/20">
            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1100px]">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-3">Problems We Solve</h2>
                    <p className="text-zinc-500 text-sm">The exact bottlenecks our clients face — and how we fix them.</p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {data.challenges.map((ch, i) => {
                        const Icon = ch.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="rounded-2xl border p-6 flex flex-col gap-4"
                                style={{ background: data.colorLight, borderColor: data.colorBorder }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                                    style={{ background: 'rgba(255,255,255,0.05)', borderColor: data.colorBorder }}>
                                    <Icon size={18} style={{ color: data.color }} />
                                </div>
                                <div>
                                    <h3 className="text-[14px] font-bold text-white mb-2">{ch.problem}</h3>
                                    <p className="text-zinc-400 text-[12.5px] leading-relaxed">{ch.fix}</p>
                                </div>
                                <div className="flex items-center gap-2 mt-auto">
                                    <CheckCircle2 size={13} style={{ color: data.color }} />
                                    <span className="text-[11px] font-bold" style={{ color: data.color }}>Solved by VAS Tech AI</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>

        {/* Products used in this solution */}
        <section className="py-20 border-t border-orange-500/20">
            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1100px]">
                <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">Products in This Solution</h2>
                    <p className="text-zinc-500 text-sm">These are the exact tools we deploy for {data.title} clients.</p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {data.products.map((p, i) => {
                        const Icon = p.icon;
                        return (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                className="flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
                                style={{ background: 'rgba(255,255,255,0.025)', borderColor: data.colorBorder }}>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                                    style={{ background: data.colorLight, borderColor: data.colorBorder }}>
                                    <Icon size={18} style={{ color: data.color }} />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[14px] font-bold text-white">{p.name}</div>
                                    <div className="text-[12px] text-zinc-400">{p.desc}</div>
                                </div>
                                <ArrowRight size={14} style={{ color: data.color }} className="shrink-0 opacity-60" />
                            </motion.div>
                        );
                    })}
                </div>
                <div className="mt-8 text-center">
                    <Link to="/products" className="inline-flex items-center gap-2 text-[13px] font-bold transition-all hover:gap-3" style={{ color: data.color }}>
                        See All Products in Detail <ArrowRight size={13} />
                    </Link>
                </div>
            </div>
        </section>

        <CTASection />
    </div>
);

/* ─── MAIN ROUTER COMPONENT ──────────────────────────────────────────────── */
const SolutionPage = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    if (location.pathname === '/solutions') {
        return <SolutionsOverview />;
    }

    const data = SOLUTIONS_DATA[location.pathname as SolutionKey];
    if (!data) return <SolutionsOverview />;

    return <SolutionDetail data={data} />;
};

export default SolutionPage;
