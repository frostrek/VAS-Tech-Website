import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Phone, MessageSquare, Bot, Mail,
    Users, Database,
    FileText, Workflow,
    Globe, BarChart3,
    PenTool, Search,
    UserCheck, Brain,
    ArrowRight, Sparkles, Zap, Shield, Star, CheckCircle
} from 'lucide-react';

/* ─── BRAND PALETTE ──────────────────────────────────────────────────────── */
// Unified orange/yellow brand theme — all categories share this accent
const BRAND = {
    primary: '#F97316',          // orange-500
    secondary: '#FBBF24',        // amber-400
    glow: 'rgba(249,115,22,0.18)',
    glowBorder: 'rgba(249,115,22,0.22)',
    glowSoft: 'rgba(249,115,22,0.08)',
    cardBg: 'rgba(249,115,22,0.05)',
    cardBgHover: 'rgba(249,115,22,0.10)',
    badge: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
};

/* ─── CATEGORY DATA ──────────────────────────────────────────────────────── */
const CATEGORIES = [
    {
        id: 'communication',
        number: '01',
        label: 'Communication Automation',
        icon: MessageSquare,
        tagline: 'Never miss a customer touchpoint — across every channel.',
        description: 'Reach your customers where they are. From calls to chats to emails — AI handles every conversation at scale, 24/7.',
        live: true,
        products: [
            {
                icon: Phone,
                name: 'AI Calling Agent',
                slug: 'ai-calling-agent',
                short: 'Outbound & inbound voice AI for reminders, follow-ups, and customer queries',
                industry: { label: 'For Clinics', text: 'Automated appointment reminders & no-show follow-ups — reducing front desk load by 70%.' },
                tags: ['Voice AI', 'Inbound', 'Outbound'],
                live: true,
            },
            {
                icon: MessageSquare,
                name: 'WhatsApp Bot',
                slug: 'whatsapp-bot',
                short: 'Automated conversational flows on WhatsApp Business API',
                industry: { label: 'For Retail', text: 'Real-time order tracking, return initiation & delivery updates — zero app downloads needed.' },
                tags: ['WhatsApp API', 'Messaging'],
                live: true,
            },
            {
                icon: Bot,
                name: 'Website Chatbot',
                slug: 'ai-chatbot',
                short: 'Embedded AI assistant trained on your products, docs, and FAQs',
                industry: { label: 'For E-Commerce', text: '24/7 product recommendations, cart recovery nudges & post-purchase support.' },
                tags: ['Website', 'Lead Capture'],
                live: true,
            },
            {
                icon: Mail,
                name: 'Email Automation Agent',
                slug: 'email-automation',
                short: 'AI that reads, categorizes, drafts, and sends emails automatically',
                industry: { label: 'For SaaS', text: 'Automated follow-up sequences triggered by user actions — free trial to paid, on autopilot.' },
                tags: ['Email', 'Sequences'],
                live: false,
            },
        ],
    },
    {
        id: 'sales-crm',
        number: '02',
        label: 'Sales & CRM Automation',
        icon: Users,
        tagline: 'Turn your pipeline into a self-managing revenue engine.',
        description: 'AI agents that find, qualify, and close leads — while syncing every interaction back to your CRM without lifting a finger.',
        live: false,
        products: [
            {
                icon: Users,
                name: 'Lead Generation Agent',
                slug: 'lead-generation',
                short: 'Scrapes, qualifies, and enriches leads from multiple sources automatically',
                industry: { label: 'For B2B Sales', text: 'Daily delivery of 50+ qualified prospects with verified emails, LinkedIn profiles & buying intent signals.' },
                tags: ['B2B', 'Prospecting', 'High Ticket'],
                live: false,
            },
            {
                icon: Database,
                name: 'CRM Automation',
                slug: 'crm-automation',
                short: 'Auto-update CRM records, log calls, score leads, and trigger deal workflows',
                industry: { label: 'For Sales Teams', text: 'Every call note auto-logged. Every follow-up auto-scheduled. Your pipeline moves while reps focus on closing.' },
                tags: ['CRM', 'Pipeline', 'Sales'],
                live: false,
            },
        ],
    },
    {
        id: 'operations',
        number: '03',
        label: 'Operations Automation',
        icon: Workflow,
        tagline: 'Eliminate back-office bottlenecks — permanently.',
        description: 'Automate repetitive, error-prone operational tasks. Process invoices, build workflows, and connect your entire tech stack.',
        live: false,
        products: [
            {
                icon: FileText,
                name: 'Invoice & Document AI',
                slug: 'invoice-document-ai',
                short: 'Extract, validate, and process invoices, POs, and contracts with AI',
                industry: { label: 'For Logistics & Retail', text: 'Auto-extract vendor invoice data, flag discrepancies & sync directly with accounting software.' },
                tags: ['OCR', 'Document Processing', 'Accounting'],
                live: false,
            },
            {
                icon: Workflow,
                name: 'Workflow Builder (n8n / Make)',
                slug: 'workflow-builder',
                short: 'Custom no-code automation connecting 100s of apps in multi-step flows',
                industry: { label: 'For Digital Agencies', text: 'Connect CRM → invoicing → reporting in one trigger. New client onboarding: from 4 hours to 4 minutes.' },
                tags: ['No-Code', 'n8n', 'Integration'],
                live: false,
            },
        ],
    },
    {
        id: 'data-intelligence',
        number: '04',
        label: 'Data & Intelligence',
        icon: BarChart3,
        tagline: 'Turn your data from a liability into a competitive advantage.',
        description: 'AI-powered dashboards, web scrapers, and analytics engines that surface insights driving decisions — in real time, every time.',
        live: false,
        products: [
            {
                icon: Globe,
                name: 'Web Scraping & Monitoring',
                slug: 'web-scraping',
                short: 'Scheduled scraping with alerts, competitor tracking, and structured data output',
                industry: { label: 'For E-Commerce Brands', text: 'Monitor competitor prices daily. Get alerts when a rival drops prices below your threshold.' },
                tags: ['Scraping', 'Monitoring', 'Data'],
                live: false,
            },
            {
                icon: BarChart3,
                name: 'AI Analytics Dashboard',
                slug: 'ai-analytics',
                short: 'Natural language queries over your business data with real-time insights',
                industry: { label: 'For Operations Teams', text: 'Ask "What was our best-selling SKU last month?" in plain English. Get a chart back in 3 seconds.' },
                tags: ['BI', 'Analytics', 'NLP'],
                live: false,
            },
        ],
    },
    {
        id: 'content',
        number: '05',
        label: 'Content Automation',
        icon: PenTool,
        tagline: 'Scale content output without scaling headcount.',
        description: 'AI writing agents that produce product copy, blog posts, social content, and SEO pages at scale — in your brand voice.',
        live: false,
        products: [
            {
                icon: PenTool,
                name: 'Content Generation Agent',
                slug: 'content-generation',
                short: 'Auto-generate product listings, blogs, social posts, and marketing copy at scale',
                industry: { label: 'For E-Commerce Brands', text: 'Generate 1,000 SEO-optimised product descriptions from a CSV. One setup. Instant "wow" for clients.' },
                tags: ['Content', 'Copywriting', 'Scale'],
                live: false,
            },
            {
                icon: Search,
                name: 'SEO Automation Agent',
                slug: 'seo-automation',
                short: 'Keyword research, content briefs, on-page audits, and programmatic pages',
                industry: { label: 'For Digital Agencies', text: 'White-label this for SEO clients. Full pipeline from keyword to published article in under 24 hours.' },
                tags: ['SEO', 'White-Label', 'Agencies'],
                live: false,
            },
        ],
    },
    {
        id: 'hr-internal',
        number: '06',
        label: 'HR & Internal Tools',
        icon: UserCheck,
        tagline: 'Build the internal AI layer that makes your team unstoppable.',
        description: 'Enterprise knowledge bots and HR agents that run on recurring contracts, reduce churn, and give teams instant access to what they need.',
        live: false,
        products: [
            {
                icon: UserCheck,
                name: 'HR Onboarding Agent',
                slug: 'hr-onboarding',
                short: 'Automate offer letters, document generation, and onboarding checklists',
                industry: { label: 'For Growing Companies', text: 'Day-1 to Day-30 onboarding fully automated. Managers get a progress dashboard. Zero repetitive questions.' },
                tags: ['HR', 'Onboarding', 'Enterprise'],
                live: false,
            },
            {
                icon: Brain,
                name: 'Internal Knowledge Bot',
                slug: 'knowledge-bot',
                short: 'AI assistant trained on your SOPs, wikis, and internal docs for staff use',
                industry: { label: 'For Enterprises', text: 'HR policy queries, compliance FAQs & SOP lookups answered instantly. Typically wins 12–18 month contracts.' },
                tags: ['Knowledge Base', 'RAG', 'Recurring'],
                live: false,
            },
        ],
    },
];

const TOTAL_PRODUCTS = CATEGORIES.reduce((a, c) => a + c.products.length, 0);

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────── */
const ProductCard = ({
    product, index, featured = false
}: {
    product: (typeof CATEGORIES)[0]['products'][0];
    index: number;
    featured?: boolean;
}) => {
    const Icon = product.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className={`group relative rounded-3xl border flex flex-col gap-5 transition-all duration-500 hover:-translate-y-2 overflow-hidden
                ${featured ? 'p-8' : 'p-7'}`}
            style={{
                background: 'linear-gradient(135deg, rgba(249,115,22,0.06), rgba(8,8,8,0.98))',
                borderColor: BRAND.glowBorder,
                boxShadow: '0 0 0 1px rgba(249,115,22,0.10)',
            }}
        >
            {/* Shimmer glow on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 25% 35%, rgba(249,115,22,0.12) 0%, transparent 65%)' }} />

            {/* Top-right glow dot */}
            <div className="absolute -top-14 -right-14 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none"
                style={{ background: '#F97316' }} />

            {/* Live badge */}
            {product.live && (
                <div className="absolute top-5 right-5 flex items-center gap-1.5 bg-orange-500/15 border border-orange-500/30 px-2.5 py-1 rounded-full z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-orange-400">Live</span>
                </div>
            )}

            {/* Icon + Name */}
            <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-orange-500/25"
                    style={{ background: BRAND.glow }}>
                    <Icon size={20} className="text-orange-400" />
                </div>
                <h3 className={`font-bold text-white leading-tight ${featured ? 'text-lg' : 'text-[15px]'}`}>{product.name}</h3>
            </div>

            {/* Description */}
            <p className="text-[13px] text-zinc-400 leading-relaxed relative z-10 flex-1">{product.short}</p>

            {/* Industry callout */}
            <div className="relative z-10 rounded-2xl p-4 border border-orange-500/15 text-[12px] leading-relaxed"
                style={{ background: BRAND.glowSoft }}>
                <span className="font-black text-orange-400 mr-1.5">{product.industry.label}:</span>
                <span className="text-zinc-300">{product.industry.text}</span>
            </div>

            {/* Tags + Detail / Demo link */}
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    {product.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-orange-500/20 bg-orange-500/08 text-orange-500">
                            {tag}
                        </span>
                    ))}
                </div>
                {product.slug ? (
                    <Link to={`/products/${product.slug}`}
                        className="flex items-center gap-1.5 text-[12px] font-bold text-orange-400 opacity-70 group-hover:opacity-100 transition-all hover:gap-2.5">
                        View Details <ArrowRight size={13} />
                    </Link>
                ) : (
                    <Link to="/schedule-demo"
                        className="flex items-center gap-1.5 text-[12px] font-bold text-orange-400 opacity-70 group-hover:opacity-100 transition-all hover:gap-2.5">
                        Book Demo <ArrowRight size={13} />
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

/* ─── CATEGORY SECTION ───────────────────────────────────────────────────── */
const CategorySection = ({ category, index }: { category: typeof CATEGORIES[0]; index: number }) => {
    const CatIcon = category.icon;
    const isEven = index % 2 === 0;

    return (
        <section id={category.id} className="relative py-24 overflow-hidden">
            {/* Subtle ambient glow — alternates side */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? '-left-40' : '-right-40'} w-[600px] h-[400px] rounded-full blur-[130px] opacity-[0.07] pointer-events-none`}
                style={{ background: 'radial-gradient(circle, #F97316, #FBBF24)' }} />

            {/* Giant number watermark */}
            <div className={`absolute top-8 ${isEven ? 'right-4' : 'left-4'} text-[180px] md:text-[240px] font-serif font-black leading-none select-none pointer-events-none opacity-[0.025] text-orange-300`}>
                {category.number}
            </div>

            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] relative z-10">
                {/* Category header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    {/* Label chip */}
                    <div className="flex items-center gap-3 mb-5">
                        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08">
                            <CatIcon size={13} className="text-orange-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                                {category.number} — {category.label}
                            </span>
                        </div>
                        {category.live && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/25 bg-orange-500/08">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Currently Live</span>
                            </div>
                        )}
                    </div>

                    {/* Title + desc */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-end">
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-[1.05]">
                            {category.label}
                        </h2>
                        <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                            <span className="text-zinc-200 font-semibold">{category.tagline}</span>
                            {' '}{category.description}
                        </p>
                    </div>

                    {/* Gradient divider */}
                    <div className="mt-8 h-px w-full" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.4), rgba(251,191,36,0.2), transparent)' }} />
                </motion.div>

                {/* Products grid — 2 columns, featured card spans */}
                <div className={`grid gap-5 ${category.products.length === 4 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {category.products.map((product, i) => (
                        <ProductCard key={product.name} product={product} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
};

/* ─── STICKY NAV ─────────────────────────────────────────────────────────── */
const TierNav = ({ activeId }: { activeId: string }) => {
    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div className="sticky top-[60px] z-40 flex justify-center py-3 pointer-events-none">
            <motion.nav
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-0.5 px-2 py-1.5 rounded-full border border-orange-500/20 bg-black/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)] pointer-events-auto overflow-x-auto max-w-[96vw]"
            >
                {CATEGORIES.map((cat) => {
                    const active = activeId === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => scrollTo(cat.id)}
                            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-bold transition-all duration-300 whitespace-nowrap shrink-0 ${
                                active
                                    ? 'bg-gradient-to-r from-orange-500 to-yellow-400 text-black shadow-[0_0_16px_rgba(249,115,22,0.5)]'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            <span className="opacity-60">{cat.number}</span>
                            <span className="hidden sm:inline">{cat.label.split(' ')[0]}</span>
                        </button>
                    );
                })}
            </motion.nav>
        </div>
    );
};

/* ─── HERO ───────────────────────────────────────────────────────────────── */
const HeroSection = () => {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 350], [1, 0]);
    const y = useTransform(scrollY, [0, 350], [0, -48]);

    const scrollToFirst = () => {
        const el = document.getElementById('communication');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden pt-28 pb-8">
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            {/* Radial orange glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,_rgba(249,115,22,0.10)_0%,_transparent_70%)] pointer-events-none" />

            {/* Animated ambient orbs */}
            <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.22, 0.12] }} transition={{ duration: 10, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
            <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.14, 0.06] }} transition={{ duration: 13, repeat: Infinity, delay: 4 }}
                className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FBBF24, transparent)' }} />

            {/* Content */}
            <motion.div style={{ opacity, y }} className="relative z-10 flex flex-col items-center max-w-[1020px] mx-auto px-4">

                {/* Badge */}
                <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-orange-500/30 bg-orange-500/08 mb-8">
                    <Sparkles size={12} className="text-orange-400" />
                    <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">{TOTAL_PRODUCTS} AI Products · 6 Categories · Ready to Deploy</span>
                    <Sparkles size={12} className="text-orange-400" />
                </motion.div>

                {/* Headline */}
                <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-6xl sm:text-7xl md:text-9xl font-serif text-white leading-[0.96] tracking-tight mb-2">
                    Automation
                </motion.h1>
                <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
                    className="text-6xl sm:text-7xl md:text-9xl font-serif leading-[0.96] tracking-tight mb-6"
                    style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundImage: 'linear-gradient(135deg, #F97316 0%, #FBBF24 50%, #F97316 100%)', backgroundSize: '200%' }}>
                    & AI Services
                </motion.h1>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }}
                    className="text-[11px] font-black uppercase tracking-[0.35em] text-zinc-600 mb-8">
                    For every business layer
                </motion.p>

                <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.3 }}
                    className="text-base md:text-lg text-zinc-400 max-w-xl leading-relaxed mb-10">
                    Products we can offer to clients — for website & sales. Pick the category that matches your biggest bottleneck and qualify for a demo in seconds.
                </motion.p>

                {/* Category pills */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                    className="flex flex-wrap justify-center gap-2 mb-10">
                    {CATEGORIES.map(cat => (
                        <button key={cat.id}
                            onClick={() => { const el = document.getElementById(cat.id); el?.scrollIntoView({ behavior: 'smooth' }); }}
                            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/06 text-orange-400 text-[11px] font-bold tracking-wide transition-all hover:bg-orange-500/15 hover:border-orange-500/40 hover:scale-105">
                            <span className="text-orange-500/60">{cat.number}</span>
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/schedule-demo"
                        className="px-9 py-4 text-black font-black rounded-full text-sm tracking-wide transition-all hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 32px rgba(249,115,22,0.45)' }}>
                        Book Free Consultation
                    </Link>
                    <button onClick={scrollToFirst}
                        className="px-9 py-4 border border-orange-500/20 rounded-full text-white font-semibold hover:bg-white/05 transition-all text-sm tracking-wide flex items-center gap-2">
                        Explore Products <ArrowRight size={15} />
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const ProductsPage = () => {
    const [activeId, setActiveId] = useState('communication');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }),
            { rootMargin: '-35% 0px -55% 0px' }
        );
        CATEGORIES.forEach(cat => {
            const el = document.getElementById(cat.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen bg-[#060606] text-white">
            <HeroSection />
            <TierNav activeId={activeId} />

            {/* Category sections */}
            {CATEGORIES.map((cat, i) => (
                <CategorySection key={cat.id} category={cat} index={i} />
            ))}

            {/* Live status banner */}
            <div className="py-10 border-t border-orange-500/20" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.06), transparent, rgba(249,115,22,0.06))' }}>
                <div className="container mx-auto px-4 text-center">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm mb-2">
                        <span className="text-zinc-500">Currently live:</span>
                        <span className="font-bold text-white flex items-center gap-2">
                            <CheckCircle size={14} className="text-orange-400" />
                            AI Calling Agent &nbsp;·&nbsp; WhatsApp Bot &nbsp;·&nbsp; Website Chatbot
                        </span>
                    </div>
                    <p className="text-[12px] font-semibold text-orange-500/70">
                        All other services: ready to build & launch within 30–90 days
                    </p>
                </div>
            </div>

            {/* Final CTA */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_transparent_70%)] pointer-events-none" />
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-8">
                            <Star size={12} className="text-orange-400" fill="currentColor" />
                            <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">Not sure where to start?</span>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-6">
                            Let's Map Your<br />
                            <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Automation Roadmap</span>
                        </h2>
                        <p className="text-zinc-400 text-base leading-relaxed mb-10 max-w-lg mx-auto">
                            Book a free 30-minute session. We'll audit your biggest time-wasters and identify which 2–3 products will give you the fastest ROI.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/schedule-demo"
                                className="px-10 py-4 text-black font-black rounded-full text-sm transition-all hover:scale-105"
                                style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 32px rgba(249,115,22,0.4)' }}>
                                Book Free Consultation
                            </Link>
                            <Link to="/contact" className="px-10 py-4 border border-orange-500/20 rounded-full text-white font-semibold hover:bg-white/05 transition-all text-sm flex items-center justify-center gap-2">
                                <Zap size={14} className="text-orange-400" /> Contact the Team
                            </Link>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-[11.5px] text-zinc-600 font-medium">
                            {['No lock-in contracts', 'Setup in 30–90 days', 'Dedicated AI engineer', 'White-label available'].map(item => (
                                <div key={item} className="flex items-center gap-1.5">
                                    <Shield size={11} className="text-orange-500/40" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;
