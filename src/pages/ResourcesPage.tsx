import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Clock, Calendar, User, BookOpen, Briefcase, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import { CASE_STUDIES, BLOG_POSTS } from '../data/resources';
import type { CaseStudy, BlogPost } from '../data/resources';

/* ─── CASE STUDY CARD ────────────────────────────────────────────────────── */
const CaseStudyCard = ({ study, onClick, index }: { study: CaseStudy; onClick: () => void; index: number }) => (
    <motion.div
        layoutId={`card-${study.id}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        onClick={onClick}
        className="group cursor-pointer h-full"
    >
        <div className="relative h-full flex flex-col rounded-3xl border border-orange-500/15 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/35 hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)]"
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.06), rgba(8,6,4,1))' }}>
            {/* Top accent bar on hover */}
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />
            {/* Hover glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none bg-orange-500" />

            <div className="p-7 flex flex-col flex-1">
                {/* Header row */}
                <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-orange-500/25 bg-orange-500/10">
                        <study.icon size={22} className="text-orange-400" />
                    </div>
                    <span className="text-[9.5px] font-black uppercase tracking-[0.25em] px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/08 text-orange-400">
                        {study.category}
                    </span>
                </div>

                <h3 className="text-[17px] font-bold text-white mb-3 group-hover:text-orange-200 transition-colors leading-snug flex-1">
                    {study.title}
                </h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-6 line-clamp-3">
                    {study.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-[12.5px] font-bold text-orange-400 group-hover:gap-2.5 transition-all">
                    View Case Study <ArrowUpRight size={14} />
                </div>
            </div>
        </div>
    </motion.div>
);

/* ─── BLOG CARD ──────────────────────────────────────────────────────────── */
const BlogCard = ({ post, onClick, index }: { post: BlogPost; onClick: () => void; index: number }) => (
    <motion.div
        layoutId={`blog-${post.id}`}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.07 }}
        onClick={onClick}
        className="group cursor-pointer h-full"
    >
        <div className="relative h-full flex flex-col rounded-3xl border border-orange-500/15 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/35 hover:shadow-[0_20px_60px_rgba(249,115,22,0.12)]"
            style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.05), rgba(8,6,4,1))' }}>
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500" />

            {/* Image */}
            {post.image && (
                <div className="relative h-44 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060604] via-black/20 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-[9.5px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border border-orange-500/30 bg-black/70 text-orange-400">
                        {post.category}
                    </span>
                </div>
            )}

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[11px] text-zinc-600 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {post.date}</span>
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
                </div>

                <h3 className="text-[15px] font-bold text-white mb-2 group-hover:text-orange-200 transition-colors leading-snug line-clamp-2 flex-1">
                    {post.title}
                </h3>
                <p className="text-[12.5px] text-zinc-500 leading-relaxed line-clamp-2 mb-5">
                    {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-orange-500/10">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-500/15 border border-orange-500/20">
                            <User size={11} className="text-orange-400" />
                        </div>
                        <span className="text-[11.5px] font-medium text-zinc-400">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11.5px] font-bold text-orange-400 opacity-70 group-hover:opacity-100 transition-opacity">
                        Read <ArrowUpRight size={12} />
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

/* ─── EXPAND CTA BANNER ──────────────────────────────────────────────────── */
const ExpandBanner = ({ count, label, cats, onExpand }: { count: number; label: string; cats: string[]; onExpand: () => void }) => (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="mt-14 relative overflow-hidden rounded-3xl border border-orange-500/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
        style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.08), rgba(8,6,4,1), rgba(251,191,36,0.04))' }}>
        {/* ambient glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full blur-[80px] opacity-15 pointer-events-none bg-orange-500" />

        {/* Count badge */}
        <div className="shrink-0 w-24 h-24 rounded-full border-2 border-orange-500/30 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 40px rgba(249,115,22,0.3)' }}>
            <span className="text-3xl font-black text-black leading-none">+{count}</span>
            <span className="text-[9px] font-black text-black/70 uppercase tracking-wider">{label}</span>
        </div>

        {/* Copy */}
        <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                More {label === 'more' ? 'case studies' : 'articles'} available
            </h3>
            <p className="text-zinc-400 text-sm mb-5 max-w-md leading-relaxed">
                Dive into our complete library of AI transformation stories across every industry.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {cats.map(c => (
                    <span key={c} className="text-[10.5px] font-bold px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/08 text-orange-400">
                        {c}
                    </span>
                ))}
            </div>
        </div>

        {/* CTA */}
        <button onClick={onExpand}
            className="shrink-0 flex items-center gap-2.5 px-8 py-4 rounded-2xl font-black text-sm text-black transition-all hover:scale-105 hover:shadow-[0_0_32px_rgba(249,115,22,0.4)]"
            style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 20px rgba(249,115,22,0.25)' }}>
            Explore All <ArrowRight size={16} />
        </button>
    </motion.div>
);

/* ─── CASE STUDY MODAL ───────────────────────────────────────────────────── */
const CaseStudyModal = ({ study, onClose }: { study: CaseStudy; onClose: () => void }) => {
    const navigate = useNavigate();
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
            onClick={onClose}>
            <motion.div
                layoutId={`card-${study.id}`}
                className="w-full max-w-3xl max-h-[88vh] rounded-[2rem] border border-orange-500/20 shadow-2xl overflow-y-auto"
                style={{ background: '#0D0A07', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
                onClick={e => e.stopPropagation()}
                onWheel={e => e.stopPropagation()}
                onTouchMove={e => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="sticky top-0 z-20 flex items-center justify-between p-5 md:p-6 border-b border-orange-500/10"
                    style={{ background: 'rgba(13, 10, 7, 0.85)', backdropFilter: 'blur(16px)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-500/15 border border-orange-500/25">
                            <study.icon size={18} className="text-orange-400" />
                        </div>
                        <span className="text-[9.5px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/08 text-orange-400">
                            {study.category}
                        </span>
                    </div>
                    <button onClick={onClose}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-white/05 hover:bg-orange-500/20 border border-orange-500/20 hover:border-orange-500/30 transition-all">
                        <X size={16} className="text-zinc-300" />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-8 leading-tight">{study.title}</h2>

                    {/* Metadata grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                        {[
                            { label: 'Client Type', value: study.client },
                            { label: 'Duration', value: study.duration },
                            { label: 'Team', value: study.team },
                        ].map(({ label, value }) => (
                            <div key={label} className="p-4 rounded-2xl border border-orange-500/12 bg-orange-500/05">
                                <div className="text-[9px] md:text-[9.5px] font-black uppercase tracking-wider text-orange-400 mb-1">{label}</div>
                                <div className="text-xs md:text-sm font-semibold text-white">{value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Sections */}
                    <div className="space-y-8 text-[13.5px] md:text-sm text-zinc-400 leading-relaxed">
                        {[
                            { title: 'The Challenge', content: study.challenge },
                            { title: 'Our Solution', content: study.solution },
                        ].map(s => (
                            <section key={s.title}>
                                <h3 className="text-base md:text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="w-1 h-5 rounded-full bg-gradient-to-b from-orange-500 to-yellow-400" />
                                    {s.title}
                                </h3>
                                <p>{s.content}</p>
                            </section>
                        ))}

                        <section>
                            <h3 className="text-base md:text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-orange-500 to-yellow-400" />
                                Key Results
                            </h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {study.outcome.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 p-3.5 rounded-2xl border border-orange-500/12 bg-orange-500/05">
                                        <CheckCircle size={15} className="text-orange-400 shrink-0 mt-0.5" />
                                        <span className="text-sm text-white/80">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    <div className="mt-10 pt-6 border-t border-orange-500/10 flex justify-end">
                        <button onClick={() => navigate('/schedule-demo')}
                            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-[13px] md:text-sm text-black transition-all hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)', boxShadow: '0 0 24px rgba(249,115,22,0.3)' }}>
                            Schedule Similar Project <ArrowRight size={15} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── BLOG MODAL ─────────────────────────────────────────────────────────── */
const BlogModal = ({ post, onClose }: { post: BlogPost; onClose: () => void }) => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}>
        <motion.div
            layoutId={`blog-${post.id}`}
            className="w-full max-w-3xl max-h-[88vh] rounded-[2rem] border border-orange-500/20 shadow-[0_40px_120px_rgba(0,0,0,0.9)] overflow-y-auto"
            style={{ background: '#0D0A07', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
            onClick={e => e.stopPropagation()}
            onWheel={e => e.stopPropagation()}
            onTouchMove={e => e.stopPropagation()}
        >
            {/* Image hero */}
            {post.image && (
                <div className="relative h-56 md:h-72 w-full shrink-0">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A07] via-black/30 to-transparent" />
                    <button onClick={onClose}
                        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 hover:bg-orange-500/25 border border-orange-500/20 transition-all">
                        <X size={16} className="text-white" />
                    </button>
                    <div className="absolute bottom-5 left-5 md:left-6">
                        <span className="text-[9px] md:text-[9.5px] font-black uppercase tracking-[0.25em] px-3 py-1 rounded-full border border-orange-500/30 bg-black/70 text-orange-400">
                            {post.category}
                        </span>
                    </div>
                </div>
            )}

            <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-5 text-[11px] md:text-[11.5px] text-zinc-600 mb-5">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                </div>

                <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-white mb-6 leading-tight">{post.title}</h2>

                {/* Author */}
                <div className="flex items-center gap-3 p-4 rounded-2xl border border-orange-500/12 bg-orange-500/05 mb-8">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-500/15 border border-orange-500/25">
                        <User size={16} className="text-orange-400" />
                    </div>
                    <div>
                        <div className="text-[9px] md:text-[9.5px] font-black uppercase tracking-wider text-orange-400">Written by</div>
                        <div className="text-xs md:text-sm font-semibold text-white">{post.author}</div>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 md:space-y-5 text-[13.5px] md:text-sm text-zinc-400 leading-relaxed">
                    <p className="text-[15px] md:text-base text-zinc-300 font-medium leading-relaxed">{post.excerpt}</p>
                    <p>In the rapidly evolving landscape of artificial intelligence, {post.title} represents a pivotal shift. Enterprises are constantly seeking ways to leverage these advancements to stay ahead of the curve.</p>
                    <p>This article explores the nuances of {post.category}, diving deep into the methodologies and frameworks that drive success. From data infrastructure to model alignment, every component plays a critical role.</p>
                    <h3 className="text-xl md:text-2xl font-serif text-white pt-2">The Strategic Imperative</h3>
                    <p>Understanding the core mechanics is just the beginning. The real value lies in the strategic application of these technologies to solve real-world business problems - whether through enhanced automation, improved decision-making, or novel customer experiences.</p>
                </div>

                <div className="mt-10 pt-6 border-t border-orange-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <span className="text-[11.5px] text-zinc-600 italic">Posted in <strong className="text-zinc-400">{post.category}</strong></span>
                    <button onClick={() => window.open('https://medium.com/@yash.saraswat_35534/why-rlhf-is-the-backbone-of-enterprise-ai-safety-and-most-companies-still-dont-understand-it-86ff4b28e690', '_blank')}
                        className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm border border-orange-500/25 bg-orange-500/08 text-orange-400 hover:bg-orange-500/15 transition-all">
                        Read on Medium <ArrowUpRight size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    </motion.div>
);

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const ResourcesPage = () => {
    const [activeTab, setActiveTab] = useState<'case-studies' | 'blogs'>('case-studies');
    const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => { window.scrollTo(0, 0); }, []);
    useEffect(() => { setIsExpanded(false); }, [activeTab]);

    useEffect(() => {
        if (selectedStudy || selectedBlog) {
            const scrollY = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                document.body.style.overflow = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [selectedStudy, selectedBlog]);

    return (
        <div className="min-h-screen bg-[#060604] text-white">

            {/* ── HERO ─────────────────────────────────────────────────── */}
            <div className="relative overflow-hidden pt-32 pb-20">
                <div className="absolute inset-0 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_0%,_rgba(249,115,22,0.10)_0%,_transparent_70%)] pointer-events-none" />
                <motion.div animate={{ scale: [1, 1.08, 1], opacity: [0.08, 0.16, 0.08] }} transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[100px] pointer-events-none"
                    style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />

                <div className="container mx-auto px-4 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-500/30 bg-orange-500/08 mb-7">
                        <Sparkles size={12} className="text-orange-400" />
                        <span className="text-[10.5px] font-black uppercase tracking-[0.28em] text-orange-400">Knowledge Hub</span>
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-serif text-white leading-tight tracking-tight mb-5">
                        Insights &<br />
                        <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                            Success Stories
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}
                        className="text-zinc-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-10">
                        Deep dives into how we help businesses build production-ready AI systems - real problems, real outcomes, real numbers.
                    </motion.p>

                    {/* Tab switcher */}
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                        className="inline-flex items-center gap-1 p-1.5 rounded-full border border-orange-500/20 bg-black/60 backdrop-blur-xl">
                        {(['case-studies', 'blogs'] as const).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={`relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab ? 'text-black' : 'text-zinc-500 hover:text-zinc-300'
                                    }`}>
                                {activeTab === tab && (
                                    <motion.div layoutId="activeTab"
                                        className="absolute inset-0 rounded-full"
                                        style={{ background: 'linear-gradient(135deg, #F97316, #FBBF24)' }}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                                )}
                                <span className="relative z-10 flex items-center gap-2">
                                    {tab === 'case-studies' ? <Briefcase size={14} /> : <BookOpen size={14} />}
                                    {tab === 'case-studies' ? 'Case Studies' : 'Blogs'}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ── CONTENT ──────────────────────────────────────────────── */}
            <div className="container mx-auto px-4 md:px-8 xl:px-0 max-w-[1280px] pb-28">
                <AnimatePresence mode="wait">
                    {activeTab === 'case-studies' ? (
                        <motion.div key="case-studies"
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {(isExpanded ? CASE_STUDIES : CASE_STUDIES.slice(0, 6)).map((study, i) => (
                                    <CaseStudyCard key={study.id} study={study} index={i} onClick={() => setSelectedStudy(study)} />
                                ))}
                            </div>
                            {!isExpanded && CASE_STUDIES.length > 6 && (
                                <ExpandBanner
                                    count={CASE_STUDIES.length - 6} label="more"
                                    cats={['Computer Vision', 'NLP', 'Data Ops', 'Automation']}
                                    onExpand={() => setIsExpanded(true)} />
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="blogs"
                            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {(isExpanded ? BLOG_POSTS : BLOG_POSTS.slice(0, 6)).map((post, i) => (
                                    <BlogCard key={post.id} post={post} index={i} onClick={() => setSelectedBlog(post)} />
                                ))}
                            </div>
                            {!isExpanded && BLOG_POSTS.length > 6 && (
                                <ExpandBanner
                                    count={BLOG_POSTS.length - 6} label="articles"
                                    cats={['Trends', 'Technical', 'Best Practices', 'Research']}
                                    onExpand={() => setIsExpanded(true)} />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── MODALS ───────────────────────────────────────────────── */}
            <AnimatePresence>
                {selectedStudy && <CaseStudyModal study={selectedStudy} onClose={() => setSelectedStudy(null)} />}
            </AnimatePresence>
            <AnimatePresence>
                {selectedBlog && <BlogModal post={selectedBlog} onClose={() => setSelectedBlog(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default ResourcesPage;
