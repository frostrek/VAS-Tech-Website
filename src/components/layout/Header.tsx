import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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
            // Throttle scroll events using requestAnimationFrame
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


    return (
        <header className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md border-b",
            isScrolled
                ? "h-16 bg-black/70 border-orange-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                : "h-24 bg-transparent border-transparent"
        )}>
            <div className="container mx-auto px-4 md:px-6 h-full flex items-center justify-between">
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
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="xl:hidden absolute top-full left-0 w-full border-b shadow-2xl z-50 bg-black/95 backdrop-blur-xl border-orange-500/20"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-6 max-h-[85vh] overflow-y-auto">
                            {NAV_ITEMS.map((item) => (
                                <div key={item.label}>
                                    <Link
                                        to={item.href}
                                        className="font-medium block py-2 border-b border-orange-500/20 text-gray-300 hover:text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            ))}
                            <div className="mt-4">
                                <Link to="/schedule-demo" onClick={() => setMobileMenuOpen(false)}>
                                    <Button className="w-full justify-center bg-white text-black font-bold h-12 rounded-xl shadow-lg">
                                        Request a demo
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
};

export default Header;
