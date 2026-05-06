import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Bot, Mic, MessageSquare, Database, BarChart3, ShoppingCart,
    Headset, Server, TrendingUp, Linkedin, Phone, Mail, FileText,
    Workflow, Globe, PenTool, Search, UserCheck, Brain, Users,
    ArrowRight
} from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
    Bot, Mic, MessageSquare, Database, BarChart3, ShoppingCart,
    Headset, Server, TrendingUp, Linkedin, Phone, Mail, FileText,
    Workflow, Globe, PenTool, Search, UserCheck, Brain, Users,
};

interface SubItem {
    name: string;
    href: string;
    desc: string;
    icon?: string;
}

interface Section {
    title: string;
    number?: string;
    items: SubItem[];
}

interface MegaMenuProps {
    sections: Section[];
    onClose?: () => void;
    type?: 'products' | 'solutions';
}

/* ─── PRODUCTS MEGA MENU (6-category grid) ─────────────────────────────── */
const ProductsMegaMenu: React.FC<{ sections: Section[]; onClose?: () => void }> = ({ sections, onClose }) => (
    <div className="bg-[#0D0D0D] border border-orange-500/20 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.98),0_0_0_1px_rgba(249,115,22,0.12)] overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-orange-500/20">
            <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                <span className="text-[9.5px] font-black uppercase tracking-[0.3em] text-orange-400">
                    Automation & AI Services
                </span>
            </div>
            <Link
                to="/products"
                onClick={onClose}
                className="flex items-center gap-1 text-[10px] font-bold text-orange-400/70 hover:text-orange-400 transition-colors"
            >
                View all <ArrowRight size={10} />
            </Link>
        </div>

        {/* 3-column × 2-row grid of categories */}
        <div className="grid grid-cols-3 gap-4">
            {sections.map((section, idx) => {
                return (
                    <div key={idx} className="space-y-2">
                        {/* Category label */}
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-black text-orange-500/50">{section.number}</span>
                            <h3 className="text-[9.5px] font-black uppercase tracking-wider text-orange-400/80">
                                {section.title}
                            </h3>
                        </div>

                        {/* Items */}
                        <div className="space-y-1">
                            {section.items.map((item, itemIdx) => {
                                const Icon = item.icon ? (iconMap[item.icon] ?? Bot) : Bot;
                                return (
                                    <Link
                                        key={itemIdx}
                                        to={item.href}
                                        onClick={onClose}
                                        className="group flex items-center gap-2.5 p-2 rounded-xl border border-transparent hover:bg-orange-500/08 hover:border-orange-500/15 transition-all duration-200"
                                    >
                                        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-orange-500/10 border border-orange-500/15 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                                            <Icon size={13} />
                                        </div>
                                        <div className="min-w-0">
                                            <div className="text-[12px] font-semibold text-white/90 group-hover:text-orange-300 transition-colors leading-tight truncate">
                                                {item.name}
                                            </div>
                                            <div className="text-[10.5px] text-zinc-600 group-hover:text-zinc-500 transition-colors leading-snug line-clamp-1 mt-0.5">
                                                {item.desc}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>

        {/* Footer CTA */}
        <div className="mt-5 pt-4 border-t border-orange-500/20 flex items-center justify-between">
            <span className="text-[10px] text-zinc-600">
                14 AI products · Ready to deploy in 30–90 days
            </span>
            <Link
                to="/schedule-demo"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black text-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 16px rgba(249,115,22,0.3)' }}
            >
                Book Free Demo <ArrowRight size={11} />
            </Link>
        </div>
    </div>
);

/* ─── SOLUTIONS MEGA MENU ───────────────────────────────────────────────── */
const SolutionsMegaMenu: React.FC<{ sections: Section[]; onClose?: () => void }> = ({ sections, onClose }) => (
    <div className="bg-[#0D0D0D] border border-orange-500/20 rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.98),0_0_0_1px_rgba(249,115,22,0.12)] overflow-hidden p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-orange-500/20">
            <div className="flex items-center gap-2">
                <span className="w-5 h-[2px] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400" />
                <span className="text-[9.5px] font-black uppercase tracking-[0.3em] text-orange-400">
                    Industry Solutions
                </span>
            </div>
            <Link
                to="/solutions"
                onClick={onClose}
                className="flex items-center gap-1 text-[10px] font-bold text-orange-400/70 hover:text-orange-400 transition-colors"
            >
                View all <ArrowRight size={10} />
            </Link>
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-2 gap-2">
            {sections[0]?.items.map((item, itemIdx) => {
                const Icon = item.icon ? (iconMap[item.icon] ?? Bot) : Bot;
                return (
                    <Link
                        key={itemIdx}
                        to={item.href}
                        onClick={onClose}
                        className="group flex items-start gap-3 p-3 rounded-xl border border-transparent hover:bg-orange-500/08 hover:border-orange-500/15 transition-all duration-200"
                    >
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-orange-500/10 border border-orange-500/15 text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                            <Icon size={16} />
                        </div>
                        <div>
                            <div className="text-[13px] font-bold text-white group-hover:text-orange-300 transition-colors leading-tight">
                                {item.name}
                            </div>
                            <div className="text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors leading-snug mt-0.5">
                                {item.desc}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-orange-500/20 flex items-center justify-between">
            <span className="text-[10px] text-zinc-600">AI built for your industry, deployed in weeks.</span>
            <Link
                to="/schedule-demo"
                onClick={onClose}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black text-black transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)', boxShadow: '0 0 16px rgba(249,115,22,0.3)' }}
            >
                Book Free Demo <ArrowRight size={11} />
            </Link>
        </div>
    </div>
);

/* ─── MAIN EXPORT ───────────────────────────────────────────────────────── */
const MegaMenu: React.FC<MegaMenuProps> = ({ sections, onClose, type }) => {
    const isProducts = sections.length === 6;

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
        >
            {isProducts
                ? <ProductsMegaMenu sections={sections} onClose={onClose} />
                : <SolutionsMegaMenu sections={sections} onClose={onClose} />
            }
        </motion.div>
    );
};

export default MegaMenu;
