import { useEffect, useState, useRef, memo } from 'react';
import { useSEO } from '../hooks/useSEO';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Phone, MessageSquare, Bot, Mail,
    Users, Database, FileText, Workflow,
    Globe, BarChart3, PenTool, Search,
    UserCheck, Brain, ArrowRight, CheckCircle2, 
    Zap, Shield, Star, ChevronRight, TrendingUp,
    CheckCircle, Activity, Box, Lock, Clock, Settings,
    Cpu, Network, GitMerge, DollarSign, Command, Webhook, Terminal, LayoutGrid, Fingerprint, RefreshCcw, Handshake, ShieldCheck, HelpCircle, ChevronDown, Rocket, Server, Lightbulb
} from 'lucide-react';
import CTASection from '../components/home/CTASection';
import InteractiveServicesWorkflow from '../components/services/InteractiveServices';
import DynamicCostCalculator from '../components/solutions/DynamicCostCalculator';

/* ─── SHARED COMPONENTS ──────────────────────────────────────────────────── */

// Animated Counter
const Counter = memo(({ value, suffix = '', prefix = '', text }: { value?: number; suffix?: string; prefix?: string; text?: string }) => {
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
    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
});

// Dynamic FAQ Accordion
const FAQAccordion = ({ faqs }: { faqs: { q: string, a: string }[] }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    
    return (
        <div className="space-y-3">
            {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-white/5 bg-[#0A0A0A] overflow-hidden transition-all duration-300 hover:border-orange-500/30 group">
                    <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                        <span className="font-bold text-white pr-8 group-hover:text-orange-400 transition-colors">{faq.q}</span>
                        <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ${openIndex === i ? 'rotate-180 bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'bg-white/5 text-zinc-500 group-hover:bg-white/10'}`}>
                            <ChevronDown size={16} />
                        </div>
                    </button>
                    <AnimatePresence>
                        {openIndex === i && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: "circOut" }} className="overflow-hidden">
                                <div className="p-6 pt-2 text-zinc-400 text-[14px] leading-relaxed border-t border-white/5">
                                    {faq.a}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};



// Continuous Integrations Marquee
const IntegrationsMarquee = () => {
    const apps = [
        "Salesforce", "HubSpot", "Zendesk", "Shopify", 
        "Slack", "Microsoft Teams", "SAP", "Oracle",
        "WhatsApp API", "Stripe", "QuickBooks", "ServiceNow"
    ];

    return (
        <section className="py-12 bg-[#020202] border-y border-white/5 overflow-hidden">
            <div className="container mx-auto px-4 text-center mb-10">
                <span className="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-black tracking-[0.2em] uppercase text-zinc-400 shadow-sm backdrop-blur-md">Natively hooks into your entire operational stack</span>
            </div>
            <div className="flex whitespace-nowrap overflow-hidden relative">
                {/* Fade masks */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />
                
                <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 40, ease: "linear", repeat: Infinity }} className="flex gap-8 items-center pl-8">
                    {/* Double the array for seamless infinite scroll */}
                    {[...apps, ...apps].map((app, i) => (
                        <div key={i} className="flex items-center gap-3 px-6 py-3 rounded-2xl border border-white/10 bg-[#0A0A0A] hover:bg-[#151515] hover:border-orange-500/40 hover:scale-105 transition-all duration-300 cursor-default group shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                            <Webhook size={18} className="text-zinc-600 group-hover:text-orange-400 group-hover:rotate-12 transition-all duration-500" />
                            <span className="font-bold text-sm text-zinc-400 group-hover:text-white transition-colors tracking-wide">{app}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// Data Processing Flow Visualizer
const SystemArchitectureFlow = () => {
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.03)_0%,_transparent_75%)] pointer-events-none" />
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.015) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                <div className="text-center mb-20">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Our Methodology</span>
                        <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif text-white">How We Transform Businesses</h2>
                    <p className="text-zinc-500 text-[13.5px] mt-1.5">A systematic approach to AI integration</p>
                </div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 max-w-[1000px] mx-auto">
                    
                    {/* Background Connection Lines */}
                    <div className="absolute top-1/2 left-1/2 md:left-0 w-[2px] md:w-full h-full md:h-[3px] bg-[#1a1a1a] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 -z-10" />
                    
                    {/* Animated Particles flowing through lines */}
                    <div className="absolute top-1/2 left-1/2 md:left-0 w-[2px] md:w-full h-full md:h-[3px] -translate-x-1/2 md:translate-x-0 -translate-y-1/2 -z-10 overflow-hidden">
                         <motion.div 
                            animate={isMobile ? { y: ['-10%', '110%'] } : { x: ['-10%', '110%'] }} 
                            transition={{ duration: 4, ease: "linear", repeat: Infinity }} 
                            className={`absolute ${isMobile ? 'w-full h-32' : 'h-full w-32'} bg-gradient-to-b md:bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.8)]`} 
                         />
                         <motion.div 
                            animate={isMobile ? { y: ['-10%', '110%'] } : { x: ['-10%', '110%'] }} 
                            transition={{ duration: 6, ease: "linear", repeat: Infinity, delay: 1 }} 
                            className={`absolute ${isMobile ? 'w-full h-24' : 'h-full w-24'} bg-gradient-to-b md:bg-gradient-to-r from-transparent via-orange-400 to-transparent shadow-[0_0_15px_rgba(249,115,22,0.6)]`} 
                         />
                    </div>

                    {/* Step 1: Data Sources */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="w-full md:w-[30%] bg-[#111] border border-white/5 rounded-3xl p-8 relative group hover:border-orange-500/30 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10">
                        <div className="w-14 h-14 bg-black/50 border border-white/5 rounded-2xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform">
                            <Database size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                            {/* Blinking connection dot */}
                            <div className="absolute -right-2 -top-2 w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">1. Ingestion</h3>
                        <p className="text-sm text-zinc-500 font-medium">Native integration layers stream structured DBs, unstructured PDFs, emails, and CRM notes.</p>
                    </motion.div>

                    {/* Step 2: The AI Core */}
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="w-full md:w-[30%] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border border-orange-500/40 rounded-3xl p-8 relative group shadow-[0_0_40px_rgba(249,115,22,0.15)] hover:shadow-[0_0_60px_rgba(249,115,22,0.25)] transition-all z-20">
                        {/* Core glow ring */}
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }} className="absolute -inset-1 rounded-[2rem] border border-dashed border-orange-500/30 opacity-50" />
                        
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-[0_0_30px_rgba(249,115,22,0.6)] group-hover:scale-110 transition-transform">
                            <Brain size={32} className="text-white drop-shadow-lg" />
                        </div>
                        <h3 className="text-xl font-bold text-center text-white mb-2">2. Processing Core</h3>
                        <p className="text-sm text-center text-orange-200/70 font-medium">Multi-agent LLMs perform context extraction, intent routing, and decision reasoning in milliseconds.</p>
                    </motion.div>

                    {/* Step 3: Outcomes */}
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="w-full md:w-[30%] bg-[#111] border border-white/5 rounded-3xl p-8 relative group hover:border-orange-500/30 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.5)] z-10">
                        <div className="w-14 h-14 bg-black/50 border border-white/5 rounded-2xl flex items-center justify-center mb-6 relative group-hover:scale-110 transition-transform">
                            <Lightbulb size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                            {/* Blinking connection dot */}
                            <div className="absolute -left-2 -bottom-2 w-3 h-3 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">3. Action Engine</h3>
                        <p className="text-sm text-zinc-500 font-medium">The system automatically executes actions: sending emails, updating CRM status, or generating reports.</p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ─── SOLUTIONS DATA ─────────────────────────────────────────────────────── */
const SOLUTIONS_DATA = {
    '/solutions/sales': {
        id: 'sales',
        badge: 'Sales Teams',
        title: 'AI for Sales',
        subtitle: 'Close More, Faster.',
        description: 'Supercharge your revenue team with AI that finds leads, follows up automatically, and logs every interaction to your CRM - so your reps can focus entirely on closing.',
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
        highlight: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
        challenges: [
            { problem: 'Low Conversion Rates', icon: TrendingUp, fix: 'AI agents engage and qualify leads instantly, 24/7 - increasing conversion by up to 40%.' },
            { problem: 'Manual CRM Updates', icon: Database, fix: 'Calls, emails, and notes sync to your CRM automatically. Zero manual data entry.' },
            { problem: 'Gut-Feel Forecasting', icon: BarChart3, fix: 'Predictive models analyse interactions to forecast revenue with 90%+ accuracy.' },
        ],
        process: [
            { title: 'Data Audit', desc: 'We analyze your current CRM data and sales pipeline workflows.' },
            { title: 'Agent Configuration', desc: 'AI agents are trained on your ideal customer profile and brand voice.' },
            { title: 'CRM Integration', desc: 'Seamlessly connect the AI to HubSpot, Salesforce, or your custom CRM.' },
            { title: 'Go-Live & Scale', desc: 'Deploy the automated outreach and monitor the influx of qualified leads.' }
        ],
        products: [
            { icon: Users, name: 'Lead Generation Agent', desc: 'Scrapes, qualifies, and enriches leads from multiple sources', tags: ['Prospecting', 'B2B'], live: false },
            { icon: Database, name: 'CRM Automation', desc: 'Auto-log calls, score leads, trigger follow-up workflows', tags: ['CRM', 'Sales'], live: false },
            { icon: Phone, name: 'AI Calling Agent', desc: 'Outbound prospecting and follow-up calls at scale', tags: ['Voice AI', 'Outbound'], live: true },
            { icon: Mail, name: 'Email Automation Agent', desc: 'Personalised sequences triggered by behaviour', tags: ['Email', 'Sequences'], live: false },
        ],
        stats: [
            { value: 40, prefix: '', suffix: '%', label: 'Avg conversion lift' }, 
            { value: 5, prefix: '', suffix: '×', label: 'Lead response speed' }, 
            { value: 70, prefix: '', suffix: '%', label: 'Less admin time' }
        ],
    },
    '/solutions/support': {
        id: 'support',
        badge: 'Customer Support',
        title: 'AI for Support',
        subtitle: '24/7 World-Class Service.',
        description: 'Resolve 80% of support tickets automatically. Reduce queue times, eliminate agent burnout, and guarantee consistent, on-brand answers across every channel.',
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
        highlight: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
        challenges: [
            { problem: 'Long Wait Times', icon: Zap, fix: 'Instantly resolve queries with AI that understands intent and context.' },
            { problem: 'Agent Burnout', icon: UserCheck, fix: 'Deflect repetitive tickets so your team focuses on complex issues.' },
            { problem: 'Inconsistent Answers', icon: Brain, fix: 'A unified Knowledge Base ensures every answer is accurate.' },
        ],
        process: [
            { title: 'Knowledge Ingestion', desc: 'We train the AI on your historical tickets, FAQs, and documentation.' },
            { title: 'Routing Setup', desc: 'Configure intent recognition to route complex issues to human agents.' },
            { title: 'Channel Deployment', desc: 'Deploy across WhatsApp, Website, and inbound call lines.' },
            { title: 'Measurement', desc: 'Track deflection rates and CSAT scores in real-time dashboards.' }
        ],
        products: [
            { icon: Bot, name: 'Website Chatbot', desc: 'Embedded AI handling FAQs, triage & escalation', tags: ['Chat', '24/7'], live: true },
            { icon: MessageSquare, name: 'WhatsApp Bot', desc: 'Support flows on WhatsApp Business API', tags: ['Messaging', 'Mobile'], live: true },
            { icon: Brain, name: 'Internal Knowledge Bot', desc: 'Instant answers from your existing docs & SOPs', tags: ['RAG', 'Internal'], live: false },
            { icon: Phone, name: 'AI Calling Agent', desc: 'Voice AI for inbound support queries', tags: ['Voice AI', 'Inbound'], live: true },
        ],
        stats: [
            { value: 80, prefix: '', suffix: '%', label: 'Queries auto-resolved' }, 
            { value: 60, prefix: '', suffix: '%', label: 'Ticket volume reduction' }, 
            { value: 3, prefix: '<', suffix: 's', label: 'Avg response time' }
        ],
    },
    '/solutions/ecommerce': {
        id: 'ecommerce',
        badge: 'E-Commerce',
        title: 'AI for E-Commerce',
        subtitle: 'Personalise Every Journey.',
        description: 'Turn visitors into loyal customers. Automate product content, recover abandoned carts, track competitor prices, and provide 24/7 support - all with AI.',
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
        highlight: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
        challenges: [
            { problem: 'Cart Abandonment', icon: MessageSquare, fix: 'Personalised recovery messages at the perfect moment.' },
            { problem: 'Manual Product Content', icon: PenTool, fix: 'Generate 1,000s of SEO-optimised product descriptions in hours.' },
            { problem: 'No Competitor Visibility', icon: Globe, fix: 'Monitor rival prices daily and auto-alert on thresholds.' },
        ],
        process: [
            { title: 'Catalog Integration', desc: 'Sync your inventory from Shopify, WooCommerce, or Magento.' },
            { title: 'Tone Calibration', desc: 'Set the AI brand voice for descriptions and customer interactions.' },
            { title: 'Automation Flows', desc: 'Build cart recovery and post-purchase follow-up sequences.' },
            { title: 'Continuous Scraping', desc: 'Launch background workers to track competitor pricing.' }
        ],
        products: [
            { icon: PenTool, name: 'Content Generation Agent', desc: 'Bulk product descriptions and SEO copy at scale', tags: ['SEO', 'Content'], live: false },
            { icon: MessageSquare, name: 'WhatsApp Bot', desc: 'Cart recovery, order updates & loyalty nudges', tags: ['WhatsApp API', 'Retention'], live: true },
            { icon: Globe, name: 'Web Scraping & Monitoring', desc: 'Competitor price tracking and alerts', tags: ['Data', 'Scraping'], live: false },
            { icon: Bot, name: 'Website Chatbot', desc: '24/7 product Q&A and post-purchase support', tags: ['Website', 'Support'], live: true },
        ],
        stats: [
            { value: 3, prefix: '', suffix: '×', label: 'Cart recovery rate' }, 
            { value: 1000, prefix: '', suffix: '+', label: 'Product descriptions/hr' }, 
            { value: 24, prefix: '', suffix: '/7', label: 'Customer support' }
        ],
    },
    '/solutions/erp': {
        id: 'erp',
        badge: 'Enterprise & ERP',
        title: 'AI for ERP',
        subtitle: 'Intelligent Operations.',
        description: 'Modernise your enterprise operations with AI. Automate invoicing, connect every system in your stack, and equip every employee with an intelligent internal assistant.',
        color: '#F97316',
        colorLight: 'rgba(249,115,22,0.10)',
        colorBorder: 'rgba(249,115,22,0.22)',
        highlight: 'bg-orange-500/10 border-orange-500/25 text-orange-400',
        challenges: [
            { problem: 'Data Silos', icon: Database, fix: 'Unified integration layer connects apps via n8n / Make.' },
            { problem: 'Manual Invoice Processing', icon: FileText, fix: 'AI extracts and validates thousands of invoices in seconds.' },
            { problem: 'Reactive Decision-Making', icon: BarChart3, fix: 'AI dashboards surface anomalies before they impact the bottom line.' },
        ],
        process: [
            { title: 'System Mapping', desc: 'Audit existing ERPs, legacy databases, and API capabilities.' },
            { title: 'Workflow Architecture', desc: 'Design automated data pipelines to bridge siloed systems.' },
            { title: 'AI Extraction Setup', desc: 'Train document models on your specific invoice and PO formats.' },
            { title: 'Analytics Layering', desc: 'Deploy BI dashboards on top of unified real-time data.' }
        ],
        products: [
            { icon: FileText, name: 'Invoice & Document AI', desc: 'Extract, validate & route invoices and POs automatically', tags: ['OCR', 'Accounting'], live: false },
            { icon: Workflow, name: 'Workflow Builder (n8n)', desc: 'Connect every app in your stack with no-code flows', tags: ['Integration', 'No-Code'], live: false },
            { icon: BarChart3, name: 'AI Analytics Dashboard', desc: 'Real-time KPI intelligence across departments', tags: ['BI', 'Analytics'], live: false },
            { icon: Brain, name: 'Internal Knowledge Bot', desc: 'Company-wide AI for policies, SOPs and compliance', tags: ['Knowledge Base', 'Intranet'], live: false },
        ],
        stats: [
            { value: 90, prefix: '', suffix: '%', label: 'Time saved on invoicing' }, 
            { value: 100, prefix: '', suffix: 's', label: 'Apps connectable' }, 
            { value: 12, prefix: '', suffix: 'mo+', label: 'Avg contract length' }
        ],
    },
};

type SolutionKey = keyof typeof SOLUTIONS_DATA;

const ALL_SOLUTIONS = [
    { path: '/solutions/sales', ...SOLUTIONS_DATA['/solutions/sales'] },
    { path: '/solutions/support', ...SOLUTIONS_DATA['/solutions/support'] },
    { path: '/solutions/ecommerce', ...SOLUTIONS_DATA['/solutions/ecommerce'] },
    { path: '/solutions/erp', ...SOLUTIONS_DATA['/solutions/erp'] }
];

const OVERVIEW_FAQS = [
    { q: "How long does a typical AI implementation take?", a: "Deployment speeds depend on complexity. Chatbots and basic workflows deploy in 2-4 weeks. Complex ERP and Data-Lake connected systems typically take 8-12 weeks from kickoff to full production launch." },
    { q: "Do you integrate with our existing tools or do we need to rip and replace?", a: "We believe in augment over replace. Our AI agents layer natively over your existing stack (Salesforce, Zendesk, SAP, etc.) via secure APIs and Webhooks without requiring fundamental infrastructure changes." },
    { q: "Is our data used to train public AI models?", a: "No. Your data is your IP. We utilize zero-retention API policies and localized or private LLM instances ensuring your proprietary business data is never fed back into public foundational models." },
    { q: "What kind of ROI can we expect?", a: "Our clients typically see a 3x to 8x ROI within the first 6 months. For example, support deflection can reduce ticket load volumes by 40-70%, directly decreasing headcount required per ticket." }
];

/* ─── OVERVIEW PAGE ──────────────────────────────────────────────────────── */

const SolutionsOverview = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<SolutionKey>('/solutions/sales');
    const activeData = SOLUTIONS_DATA[activeTab];

    useSEO({
        title: 'Industry Solutions',
        description: 'Explore tailored AI architectures for your specific operational needs.',
        canonical: 'https://vastechconsulting.com/solutions'
    });

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* -- HERO -- */}
            <div className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(249,115,22,0.08)_0%,_transparent_65%)] pointer-events-none" />
                <motion.div animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }} transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[100px] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
                    
                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-6 group hover:scale-105 transition-transform cursor-pointer">
                        <Star size={12} className="text-orange-400 group-hover:rotate-180 transition-transform duration-700" fill="currentColor" />
                        <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">Industry-Specific AI Solutions</span>
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white leading-tight mb-4">
                        AI Built for<br />
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Your Industry</span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                        className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-10">
                        Pick your vertical. We'll show you exactly which AI products apply to you - with real numbers, real examples, and a demo you can book in 30 seconds.
                    </motion.p>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link to="/schedule-demo" className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-black rounded-full shadow-[0_0_28px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                            Book Free Consultation
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/products" className="px-8 py-4 border border-orange-500/30 bg-black/50 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 text-sm flex items-center gap-2 group shadow-xl">
                            <Box size={16} className="text-orange-400 group-hover:rotate-12 transition-transform duration-500" /> View All Products 
                        </Link>
                    </motion.div>

                    {/* Trust strip */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-14 flex flex-wrap justify-center gap-8 text-[12px] text-zinc-400 font-bold tracking-widest uppercase">
                        <span className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer"><Shield size={16} className="text-orange-500" /> Enterprise Security</span>
                        <span className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer"><Zap size={16} className="text-orange-500" /> Zero Disruption Setup</span>
                        <span className="flex items-center gap-2 hover:text-orange-400 transition-colors cursor-pointer"><Clock size={16} className="text-orange-500" /> 24/7 Processing</span>
                    </motion.div>
                </div>
            </div>

            <IntegrationsMarquee />

            {/* -- INTERACTIVE SOLUTION SELECTOR -- */}
            <section className="py-24 relative bg-[#0a0705] border-b border-white/5">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Industry Hub</span>
                            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Select Your Vertical</h2>
                        <p className="text-zinc-500 text-[13.5px] mt-1.5">Tailored AI architectures for specific enterprise challenges</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
                        {/* Tabs list */}
                        <div className="flex flex-col gap-3">
                            {ALL_SOLUTIONS.map((sol) => {
                                const isActive = activeTab === sol.path;
                                return (
                                    <button key={sol.path} onClick={() => setActiveTab(sol.path as SolutionKey)}
                                        className={`text-left relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden group ${
                                            isActive 
                                                ? 'border-orange-500/40 shadow-[0_10px_40px_rgba(249,115,22,0.15)] scale-[1.02]' 
                                                : 'border-white/5 hover:border-white/10 hover:bg-[#111111] hover:scale-[1.01]'
                                        }`}
                                        style={{ background: isActive ? 'linear-gradient(135deg, rgba(20,10,5,1), rgba(30,15,5,1))' : 'rgba(10,10,10,1)' }}>
                                        {isActive && <motion.div layoutId="activeTabIndicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,1)]" />}
                                        <div className="relative z-10 flex items-center justify-between">
                                            <div>
                                                <div className={`font-serif text-xl mb-1 transition-colors ${isActive ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'}`}>{sol.title}</div>
                                                <div className={`text-[12px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-orange-400' : 'text-zinc-600'}`}>{sol.badge}</div>
                                            </div>
                                            <ChevronRight size={18} className={`transition-all ${isActive ? 'text-orange-400 translate-x-1' : 'text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4'}`} />
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Detail View */}
                        <div className="relative h-full perspective-1000">
                            <AnimatePresence mode="wait">
                                <motion.div key={activeTab} initial={{ opacity: 0, rotateY: -10, z: -100 }} animate={{ opacity: 1, rotateY: 0, z: 0 }} exit={{ opacity: 0, rotateY: 10, z: -100 }} transition={{ duration: 0.5, ease: "circOut" }}
                                    className="h-full bg-[#111111] rounded-[2rem] border border-orange-500/20 p-8 md:p-10 shadow-2xl shadow-orange-500/5 relative overflow-hidden flex flex-col justify-between group/card hover:border-orange-500/40 transition-colors duration-500 transform-gpu">
                                    <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover/card:bg-orange-500/20 transition-colors duration-700" />
                                    
                                    <div className="relative z-10">
                                        <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border shadow-lg"
                                            style={{ color: activeData.color, borderColor: activeData.colorBorder, background: activeData.colorLight }}>
                                            {activeData.badge} Use Cases
                                        </motion.div>
                                        <h3 className="text-3xl md:text-4xl font-serif text-white mb-4 leading-tight drop-shadow-lg">{activeData.subtitle}</h3>
                                        <p className="text-zinc-300 text-base leading-relaxed mb-10 max-w-xl">{activeData.description}</p>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                                            {activeData.stats.map((stat, i) => (
                                                <div key={i} className="p-4 rounded-2xl border bg-black/40 hover:bg-black/80 hover:scale-105 transition-all duration-300 cursor-default shadow-lg" style={{ borderColor: activeData.colorBorder }}>
                                                    <div className="text-2xl md:text-3xl font-serif font-bold mb-1" style={{ color: activeData.color }}>
                                                        <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                                    </div>
                                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="relative z-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-white/10 transition-colors duration-500">
                                        <div className="flex -space-x-3 group/avatars">
                                            {activeData.products.slice(0,3).map((p, i) => {
                                                const PIcon = p.icon;
                                                return (
                                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#1a1a1a] shadow-lg relative z-10 hover:-translate-y-2 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                        <PIcon size={18} className="text-orange-400 group-hover/avatars:text-orange-300" />
                                                    </div>
                                                );
                                            })}
                                            {activeData.products.length > 3 && (
                                                <div className="w-12 h-12 rounded-full border-2 border-[#111111] flex items-center justify-center bg-[#1a1a1a] shadow-lg relative z-0 hover:-translate-y-2 hover:scale-110 transition-all duration-300 cursor-pointer">
                                                    <span className="text-[11px] font-bold text-zinc-400">+{activeData.products.length - 3}</span>
                                                </div>
                                            )}
                                        </div>
                                        <Link to={activeTab} className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                            Explore Full Solution <ArrowRight size={16} className="text-orange-400 group-hover/btn:translate-x-2 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

             {/* -- DYNAMIC SERVICES COMPONENT -- */}
             <InteractiveServicesWorkflow />

             {/* -- DYNAMIC ROI CALCULATOR -- */}
             <DynamicCostCalculator />



            {/* -- HOW IT WORKS: THE OPERATIONAL CIRCUIT -- */}
            <section className="py-32 bg-[#050505] relative overflow-hidden">
                {/* Background blueprint grid and glow */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                    style={{ backgroundImage: 'linear-gradient(#F97316 1px, transparent 1px), linear-gradient(90deg, #F97316 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/05 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="text-center mb-24">
                        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[11px] font-black tracking-[0.3em] uppercase mb-6 bg-gradient-to-r from-orange-500/10 to-transparent text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                            <Settings size={14} className="animate-spin-slow" /> The Deployment Playbook
                        </motion.div>
                        <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 tracking-tight">How We Transform <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Businesses</span></h2>
                        <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">From initial audit to global scale, we follow a rigorous engineering protocol to ensure maximum ROI.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Trace Line (Desktop) */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] bg-white/5 -translate-y-1/2 overflow-hidden z-0">
                            <motion.div 
                                animate={{ x: ['-100%', '200%'] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                                className="w-1/2 h-full bg-gradient-to-r from-transparent via-orange-500 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.6)]" 
                            />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {[
                                { 
                                    step: '01', 
                                    icon: Search, 
                                    title: 'Identify & Audit', 
                                    desc: 'Deep extraction of operational friction points. We find the high-impact gaps your existing ERPs miss.',
                                    metrics: ['Process Mapping', 'ROI Forecasting', 'Feasibility Study'],
                                    color: '#F97316'
                                },
                                { 
                                    step: '02', 
                                    icon: GitMerge, 
                                    title: 'Architect & Deploy', 
                                    desc: 'Custom-coded AI agents integrated natively into your stack. No generic wrappers, pure infrastructure.',
                                    metrics: ['API Integration', 'LLM Fine-tuning', 'Stress Testing'],
                                    color: '#FB923C'
                                },
                                { 
                                    step: '03', 
                                    icon: Activity, 
                                    title: 'Measure & Scale', 
                                    desc: 'Real-time performance dashboards and iterative model updates to ensure growth never plateaus.',
                                    metrics: ['Output Analytics', 'Auto-optimization', 'Global Expansion'],
                                    color: '#FBBF24'
                                }
                            ].map((item, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    whileInView={{ opacity: 1, scale: 1 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: i * 0.2 }}
                                    className="group relative"
                                >
                                    {/* Card Node */}
                                    <div className="relative z-10 bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-orange-500/30 hover:shadow-[0_40px_80px_-20px_rgba(249,115,22,0.15)] group-hover:-translate-y-2 overflow-hidden backdrop-blur-xl">
                                        {/* Background accent */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/05 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        
                                        {/* Icon Sphere */}
                                        <div className="w-24 h-24 rounded-full bg-[#111] border border-white/10 flex items-center justify-center mb-10 relative group-hover:border-orange-500/50 transition-all duration-500 shadow-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <item.icon size={36} className="text-orange-400 relative z-10 group-hover:scale-110 transition-transform duration-500" />
                                            
                                            {/* Number badge */}
                                            <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black text-black shadow-lg border-2 border-[#0A0A0A]">
                                                {item.step}
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-orange-100 transition-colors">{item.title}</h3>
                                        <p className="text-zinc-500 text-sm leading-relaxed mb-8 group-hover:text-zinc-400 transition-colors">{item.desc}</p>
                                        
                                        {/* Tags / Metrics */}
                                        <div className="flex flex-wrap justify-center gap-2 mt-auto">
                                            {item.metrics.map((m, j) => (
                                                <span key={j} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/05 border border-white/05 text-zinc-500 group-hover:text-orange-400 group-hover:border-orange-500/20 transition-all duration-300">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vertical connecting line for mobile */}
                                    {i < 2 && (
                                        <div className="lg:hidden w-px h-16 bg-gradient-to-b from-orange-500/40 to-transparent mx-auto mt-4 mb-4" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

             {/* -- REPUTATION / STATS -- */}
            <section className="py-24 border-t border-orange-500/20 bg-[#050505]">
                <div className="container mx-auto px-4 max-w-[1000px]">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
                        {[
                            { num: 24, suffix: '/7', label: 'Continuous Operation' },
                            { num: 99.9, suffix: '%', label: 'Uptime SLA' },
                            { num: 14, suffix: '+', label: 'Live Deployments' },
                            { num: 5, suffix: 'x', label: 'ROI Multiplier Average' }
                        ].map((stat, i) => (
                            <div key={i} className="text-center px-4 group hover:scale-110 transition-transform duration-300 cursor-default">
                                <div className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600 mb-2 drop-shadow-md">
                                     <Counter value={stat.num} suffix={stat.suffix} />
                                </div>
                                <div className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-orange-400 transition-colors">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

         

            <SystemArchitectureFlow />


            <CTASection />

            {/* -- FAQs -- */}
            <section className="py-24 border-t border-white/5 bg-[#0A0A0A]">
                <div className="container mx-auto px-4 max-w-[800px]">
                     <div className="text-center mb-12">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:scale-110 transition-transform">
                            <HelpCircle size={20} className="text-orange-400" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white hover:text-orange-50 transition-colors cursor-default">Frequently Asked Questions</h2>
                    </div>
                    <FAQAccordion faqs={OVERVIEW_FAQS} />
                </div>
            </section>
        </div>
    );
};

/* ─── SOLUTION DETAIL PAGE ───────────────────────────────────────────────── */
const SolutionDetail = ({ data }: { data: typeof SOLUTIONS_DATA[SolutionKey] }) => {
    
    useSEO({
        title: data.title,
        description: data.description,
        canonical: `https://vastechconsulting.com/solutions/${data.id}`
    });
    
    const handleScrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        document.getElementById('products-section')?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* -- ENHANCED HERO -- */}
            <div className="relative overflow-hidden pt-32 pb-24 border-b border-orange-500/10">
                <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 40% 50%, ${data.colorLight} 0%, transparent 60%)` }} />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                
                {/* Floating animated orbs */}
                <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 8, repeat: Infinity }}
                            className="absolute top-20 right-20 w-[300px] h-[300px] rounded-full blur-[80px] pointer-events-none"
                            style={{ background: data.colorLight }} />

                <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1200px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <Link to="/solutions" className="inline-flex items-center gap-2 text-zinc-500 hover:text-orange-400 transition-colors text-sm font-bold mb-8 group">
                                <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={14} /> Back to Industry Overviews
                            </Link>

                            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-6">
                                <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">Solution Architecture</span>
                            </motion.div>

                            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight mb-4 tracking-tight drop-shadow-xl">
                                {data.title}<br />
                                <span style={{ color: data.color }} className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">{data.subtitle}</span>
                            </motion.h1>
                            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                                className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8 max-w-lg">{data.description}</motion.p>
                            
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 flex-wrap">
                                <Link to="/schedule-demo" className="px-8 py-4 bg-gradient-to-r text-black font-black rounded-full hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm justify-center items-center flex"
                                    style={{ backgroundImage: `linear-gradient(135deg, ${data.color}, #EA580C)`, boxShadow: `0 0 24px ${data.colorLight}` }}>
                                    Build This Architecture
                                </Link>
                                <a href="#products-section" onClick={handleScrollToProducts} className="px-8 py-4 border bg-black/40 backdrop-blur-md rounded-full text-white font-semibold transition-all duration-300 hover:border-orange-500/50 hover:bg-white/10 text-sm flex items-center justify-center gap-2" style={{ borderColor: data.colorBorder }}>
                                    View Platform Products <ChevronRight size={14} />
                                </a>
                            </motion.div>
                        </div>

                        {/* Right: Premium Stats Banner */}
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
                            className="bg-[#111] border rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:border-orange-500/50 transition-colors duration-500" style={{ borderColor: data.colorBorder }}>
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundImage: `linear-gradient(to bottom left, ${data.color}, transparent)` }} />
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-1000" style={{ background: data.color }} />
                            
                            <h3 className="text-lg font-bold text-white mb-6 relative z-10 flex items-center gap-2 group-hover:scale-105 transition-transform origin-left">
                                <Activity size={18} style={{ color: data.color }} className="animate-pulse" /> Proven Outcomes
                            </h3>
                            <div className="space-y-6 relative z-10">
                                {data.stats.map((stat, i) => (
                                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0 hover:pl-4 transition-all duration-300 cursor-default">
                                        <div className="text-sm font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors">{stat.label}</div>
                                        <div className="text-3xl font-serif font-bold tracking-tight drop-shadow-md hover:scale-110 transition-transform" style={{ color: data.color }}>
                                             <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <IntegrationsMarquee />

            {/* -- CHALLENGES & FIXES (Hover Reveal) -- */}
            <section className="py-24 border-t border-white/5 bg-[#0a0705]">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="mb-16 md:flex justify-between items-end">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <h2 className="text-3xl md:text-5xl font-serif text-white mb-3">Fixing The Bottlenecks</h2>
                            <p className="text-zinc-400 text-lg">The exact operational challenges we solve with this architecture.</p>
                        </motion.div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {data.challenges.map((ch, i) => {
                            const Icon = ch.icon;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="group relative rounded-3xl border border-white/5 bg-[#111] p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(249,115,22,0.15)]">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                         style={{ background: `radial-gradient(circle at top right, ${data.colorLight}, transparent 80%)` }} />
                                    
                                    <div className="relative z-10 flex flex-col h-full gap-6">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                                            style={{ background: 'rgba(255,255,255,0.03)', borderColor: data.colorBorder }}>
                                            <Icon size={24} style={{ color: data.color }} className="group-hover:animate-pulse" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-1 group-hover:text-white/50 transition-colors">The Problem</div>
                                            <h3 className="text-xl font-bold text-white mb-2">{ch.problem}</h3>
                                        </div>
                                        
                                        <div className="mt-auto pt-6 border-t border-white/5">
                                             <div className="text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-1.5" style={{ color: data.color }}>
                                                <CheckCircle size={12} className="group-hover:rotate-12 transition-transform" /> The Solution
                                             </div>
                                            <p className="text-zinc-300 text-sm leading-relaxed font-medium">{ch.fix}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* -- INTERACTIVE AI WORKFLOW (TERMINAL) -- */}
            <section className="py-24 bg-[#0A0A0A] border-y border-white/5 overflow-hidden relative group">
                <div className="absolute top-1/2 left-0 w-full h-[300px] bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent skew-y-6 -translate-y-1/2 pointer-events-none group-hover:via-orange-500/10 transition-colors duration-1000" />
                <div className="container mx-auto px-4 max-w-[1200px] relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Execution Hub</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">See It In Action</h2>
                            <p className="text-zinc-500 text-[13.5px] mt-1.5 leading-relaxed mb-6">Our automated agents don't just provide suggestions - they execute workflows continuously in the background.</p>
                            
                            <ul className="space-y-4">
                                {[
                                    "Connects natively to your APIs",
                                    "Processes inputs in millisecond speeds",
                                    "Executes complex, multi-step tool calls",
                                    "Auto-logs outcomes to your master DB"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 group/li">
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/5 group-hover/li:bg-orange-500/20 group-hover/li:text-orange-400 transition-colors shadow-sm" style={{ color: data.color}}>
                                            <ChevronRight size={14} className="group-hover/li:translate-x-0.5 transition-transform" />
                                        </div>
                                        <span className="text-sm font-bold text-zinc-300 group-hover/li:text-white transition-colors">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-[#111111] rounded-2xl border border-orange-500/20 shadow-2xl overflow-hidden font-mono group/terminal hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] transition-all duration-500">
                            <div className="bg-[#1A1A1A] px-4 py-3 border-b border-orange-500/20 flex items-center gap-2 group-hover/terminal:bg-[#151515] transition-colors">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
                                <div className="w-3 h-3 rounded-full bg-orange-400/80 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                                <div className="w-3 h-3 rounded-full bg-orange-600/80 shadow-[0_0_5px_rgba(249,115,22,0.8)]" />
                                <div className="ml-4 text-[11px] text-zinc-500 uppercase flex items-center gap-2 font-bold group-hover/terminal:text-zinc-300 transition-colors">
                                    <Lock size={10} className="text-orange-400" /> secure_agent_execution.exe
                                </div>
                            </div>
                            <div className="p-6 text-[12px] md:text-[13px] leading-loose relative h-[250px] overflow-hidden flex flex-col justify-end pb-8 bg-[#0a0a0a] group-hover/terminal:bg-[#050505] transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-b from-[#111] via-transparent to-transparent z-10 pointer-events-none" />
                                
                                <motion.div animate={{ y: [0, -100] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="space-y-3 opacity-60 relative z-0">
                                    {Array.from({length: 10}).map((_, i) => (
                                        <div key={i} className="text-zinc-600 border-l-2 border-zinc-800 pl-3 group-hover/terminal:text-zinc-500 transition-colors">
                                            [PREVIOUS_LOG] Task ID:{Math.floor(Math.random()*10000)} executed successfully. ROI confirmed.
                                        </div>
                                    ))}
                                </motion.div>

                                <div className="relative z-20 mt-4 pt-4 border-t border-white/5 bg-[#0a0a0a]">
                                    <div className="text-zinc-400 mb-1 font-bold">~ % initializing <span style={{ color: data.color }}>{data.id}_agent</span> --watch</div>
                                    <div className="text-zinc-300 flex items-center gap-2 mb-1">
                                        <RefreshCcw size={12} className="animate-spin text-orange-400" /> Scanning operational queues...
                                    </div>
                                    <div className="text-orange-400 flex items-center gap-2 font-bold drop-shadow-[0_0_5px_rgba(249,115,22,0.5)]">
                                        <CheckCircle2 size={12} /> Target identified. Executing workflow automatically.
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <span className="w-2 h-4 bg-orange-400 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* -- PROCESS TIMELINE -- */}
            <section className="py-24 bg-[#050505]">
                <div className="container mx-auto px-4 max-w-[1000px]">
                    <div className="text-center mb-16">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Implementation Path</span>
                            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-yellow-400 to-orange-500" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Deployment Roadmap</h2>
                        <p className="text-zinc-500 text-[13.5px] mt-1.5">How we deploy this architecture in 30-90 days.</p>
                    </div>

                    <div className="relative border-l-2 ml-4 md:ml-0 md:pl-0 border-white/10 md:border-0">
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2" />
                        
                        {data.process.map((step, i) => {
                            const isEven = i % 2 === 0;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                                    className={`relative flex flex-col md:flex-row items-center justify-between mb-12 last:mb-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} group cursor-default`}>
                                    
                                    <div className="absolute left-[-5px] md:left-1/2 w-3.5 h-3.5 rounded-full md:-translate-x-1/2 outline outline-4 outline-[#050505] transition-all duration-300 group-hover:scale-[1.8] group-hover:shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ background: data.color }} />
                                    
                                    <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} relative`}>
                                        <div className={`relative z-10 transition-transform duration-500 group-hover:${isEven ? '-translate-x-2' : 'translate-x-2'}`}>
                                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors drop-shadow-sm">{step.title}</h3>
                                            <p className="text-zinc-400 text-sm font-medium group-hover:text-zinc-300 transition-colors">{step.desc}</p>
                                        </div>
                                    </div>

                                    <div className="hidden md:flex w-[45%] relative items-center justify-center">
                                        <div className="text-[60px] md:text-[100px] font-serif font-black opacity-5 leading-none transition-opacity duration-300 group-hover:opacity-10 pointer-events-none select-none"
                                             style={{ color: data.color }}>
                                            0{i+1}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* -- PRODUCTS INCLUDED -- */}
            <section id="products-section" className="py-24 border-t border-white/5 bg-[#0a0705]">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-4 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">Platform Products Used</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Specific Automation Tools Deployed</h2>
                        <p className="text-zinc-500 text-[13.5px] mt-1.5 leading-relaxed">The precision-engineered modules integrated within this solution architecture.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.products.map((p, i) => {
                            const Icon = p.icon;
                            return (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                                    className="group relative rounded-3xl border-0 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] p-8 flex flex-col"
                                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(10,6,3,1))' }}>
                                     
                                     <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-[40px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
                                     
                                     {p.live && (
                                        <div className="absolute top-8 right-8 flex items-center gap-1.5 border border-white/5 px-3 py-1 rounded-full z-10 bg-black/40 backdrop-blur-md group-hover:scale-105 transition-transform">
                                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400">Live</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-5 relative z-10 mb-6">
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 bg-[#0c0806] group-hover:bg-orange-500/10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent" />
                                            <Icon size={24} className="text-orange-400 relative z-10 drop-shadow-sm" />
                                        </div>
                                        <h3 className="font-bold text-white text-xl group-hover:text-orange-400 transition-colors leading-tight">{p.name}</h3>
                                    </div>
                                    
                                    <p className="text-[13.5px] text-zinc-400 mb-8 flex-1 leading-relaxed group-hover:text-zinc-300 transition-colors">
                                        {p.desc}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto relative z-10">
                                        <div className="flex flex-wrap gap-2">
                                            {p.tags.map(tag => (
                                                <span key={tag} className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-zinc-400 group-hover:border-orange-500/20 group-hover:text-orange-400 transition-all">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <ArrowRight size={18} className="text-zinc-700 opacity-0 group-hover:opacity-100 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                    <div className="mt-14 text-center">
                        <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-300 font-bold text-sm group">
                            View All Platform Products <ArrowRight size={16} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

             <SystemArchitectureFlow />
             
             {/* -- CROSS-SELL -- */}
             <section className="py-20 bg-[#050505]">
                <div className="container mx-auto px-4 max-w-[1200px]">
                    <h3 className="text-2xl font-serif text-white mb-8 text-center drop-shadow-md">Explore Other Architectures</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {ALL_SOLUTIONS.filter(s => s.path !== `/solutions/${data.id}`).map(other => {
                            const OIcon = other.challenges[0].icon;
                            return (
                                <Link key={other.id} to={other.path} className="p-6 rounded-3xl border-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)] hover:shadow-[0_20px_50px_rgba(249,115,22,0.1)] transition-all duration-300 flex items-center justify-between group hover:-translate-y-1 overflow-hidden"
                                    style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.04), rgba(10,6,3,1))' }}>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-white/5 group-hover:bg-orange-500/10 group-hover:scale-110 transition-all duration-300 border border-transparent group-hover:border-orange-500/20">
                                            <OIcon size={20} style={{ color: other.color }} />
                                        </div>
                                        <span className="font-bold text-lg text-zinc-300 group-hover:text-white transition-colors">{other.title}</span>
                                    </div>
                                    <ArrowRight size={18} className="text-zinc-600 group-hover:text-orange-400 group-hover:translate-x-2 transition-all duration-300" />
                                </Link>
                            )
                        })}
                    </div>
                </div>
             </section>


            <CTASection />

            {/* -- FAQs -- */}
            <section className="py-24 border-t border-white/5 bg-[#0A0A0A]">
                <div className="container mx-auto px-4 max-w-[800px]">
                     <div className="text-center mb-12">
                        <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-4 border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.15)] hover:scale-110 transition-transform">
                            <HelpCircle size={20} className="text-orange-400" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-serif text-white hover:text-orange-50 transition-colors cursor-default">Frequently Asked Questions</h2>
                    </div>
                    <FAQAccordion faqs={OVERVIEW_FAQS} />
                </div>
            </section>
        </div>
    );
};

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
