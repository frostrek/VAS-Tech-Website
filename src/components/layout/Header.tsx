import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NAV_ITEMS } from '../../utils/constants';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import MegaMenu from './MegaMenu';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 20);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);


    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b",
            isScrolled
                ? "h-16 bg-black/70 border-orange-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "h-24 bg-transparent border-transparent"
        )}>
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 h-full flex items-center justify-between">
                {/* 1. Logo (Left) */}
                <Link to="/" className="flex items-center group">
                    <img
                        src="/VAS_logo.png"
                        alt="VAS Tech Logo"
                        className="h-8 md:h-10 w-auto transition-all duration-300 group-hover:scale-105 brightness-110 contrast-125 saturate-150"
                    />
                </Link>

                {/* 2. Desktop Nav (Center) */}
                <nav className="hidden xl:flex items-center justify-center gap-6 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <div key={item.label} className="relative group">
                            <Link
                                to={item.href}
                                className={cn(
                                    "flex items-center gap-1 text-sm font-medium transition-colors py-2 relative",
                                    "text-gray-300 hover:text-white",
                                    location.pathname === item.href && "text-white font-semibold"
                                )}
                            >
                                {item.label}
                                {item.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform opacity-70" />}
                                {location.pathname === item.href && (
                                    <motion.div
                                        layoutId="navbar-active"
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-white/30"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </Link>

                            {/* Mega Menu */}
                            {item.megaMenu && (
                                <div
                                    className={`invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 pt-4 ${
                                        item.megaMenu.length >= 6
                                            ? 'fixed left-1/2 -translate-x-1/2 top-16 z-50 w-[1060px] max-w-[95vw]'
                                            : 'absolute left-1/2 -translate-x-1/2 top-full z-50 w-[520px] max-w-[90vw]'
                                    }`}
                                >
                                    <MegaMenu sections={item.megaMenu} />
                                </div>
                            )}
                        </div>
                    ))}
                </nav>

                {/* 3. CTAs (Right) */}
                <div className="hidden xl:flex items-center justify-end min-w-[160px] shrink-0">
                    <Link to="/schedule-demo">
                        <Button size="sm" className="px-6 py-2.5 text-sm rounded-full font-bold border-none shadow-[0_8px_20px_rgba(0,0,0,0.3)] bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all whitespace-nowrap">
                            Request a demo
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="xl:hidden p-2 transition-colors text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="xl:hidden absolute top-full left-0 w-full border-b shadow-2xl z-50 bg-black/95 backdrop-blur-xl border-orange-500/20"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-2 max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain pb-24">
                            {NAV_ITEMS.map((item, idx) => (
                                <MobileMenuItem key={item.label} item={item} idx={idx} setMobileMenuOpen={setMobileMenuOpen} />
                            ))}
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + (NAV_ITEMS.length * 0.05) }}
                                className="mt-6"
                            >
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center bg-white text-black font-bold h-12 rounded-xl shadow-lg hover:bg-orange-500 hover:text-white transition-all">
                                        Request a demo
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

const MobileMenuItem = ({ item, idx, setMobileMenuOpen }: { item: any, idx: number, setMobileMenuOpen: (o: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubItems = item.megaMenu && item.megaMenu.length > 0;

    return (
        <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border-b border-white/5 last:border-0"
        >
            <div className="flex items-center justify-between py-4">
                <Link
                    to={item.href}
                    className="font-medium text-lg text-gray-200 hover:text-orange-400 transition-colors"
                    onClick={() => !hasSubItems && setMobileMenuOpen(false)}
                >
                    {item.label}
                </Link>
                {hasSubItems && (
                    <button 
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 -mr-2 text-zinc-500 hover:text-white transition-colors"
                    >
                        <ChevronDown size={20} className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                )}
            </div>

            <AnimatePresence>
                {isOpen && hasSubItems && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-white/5 rounded-xl mb-4"
                    >
                        <div className="p-4 flex flex-col gap-4">
                            {item.megaMenu.map((section: any) => (
                                <div key={section.title} className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500/70 pl-1">{section.title}</h4>
                                    <div className="grid grid-cols-1 gap-1">
                                        {section.items.map((subItem: any) => (
                                            <Link
                                                key={subItem.name}
                                                to={subItem.href}
                                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors group"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-orange-400 group-hover:border-orange-500/30 transition-all">
                                                    {/* We could map icon strings to Lucide components here, but keeping it simple for now */}
                                                    <ChevronRight size={14} />
                                                </div>
                                                <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{subItem.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Header;
