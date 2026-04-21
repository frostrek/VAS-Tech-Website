
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Shield, Server, Brain, Activity, Lock, Zap, Database } from 'lucide-react';
import type { ProductFeature } from '../../utils/productData';
import { useTheme } from '../../context/ThemeContext';

const FeatureNode = ({
    feature,
    isActive,
    index,
    onHover,
    theme
}: {
    feature: ProductFeature,
    isActive: boolean,
    index: number,
    onHover: (idx: number) => void,
    theme: string
}) => {
    return (
        <motion.div
            onHoverStart={() => onHover(index)}
            onClick={() => onHover(index)}
            className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group w-full ${isActive
                ? 'bg-[#111]/80 border-orange-500/40 shadow-lg shadow-orange-500/10 z-10'
                : 'bg-[#0A0A0A]/50 border-orange-500/10 hover:bg-[#111] hover:border-orange-500/25'
                }`}
            whileHover={{ x: 5 }}
        >
            <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 ${isActive
                    ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-black shadow-[0_0_15px_rgba(249,115,22,0.3)]'
                    : 'bg-orange-500/10 border border-orange-500/15 text-orange-400'
                    }`}>
                    {feature.icon && <feature.icon className="w-5 h-5" />}
                </div>
                <div>
                    <h4 className={`text-base font-bold transition-colors ${isActive
                        ? 'text-white'
                        : 'text-zinc-400'
                        }`}>
                        {feature.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-zinc-500">
                        {feature.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

const CoreEngine = ({ activeIndex, theme, isAllActive, onToggleAll }: { activeIndex: number, theme: string, isAllActive: boolean, onToggleAll: () => void }) => {
    // Satellite positions
    const satellites = [
        { x: -120, y: -80, icon: Database },
        { x: 120, y: -80, icon: Shield },
        { x: -120, y: 80, icon: Server },
        { x: 120, y: 80, icon: Zap },
        { x: 0, y: -130, icon: Activity },
        { x: 0, y: 130, icon: Lock }
    ];

    return (
        <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(249,115,22,0.5) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            {/* Connecting Lines Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                <defs>
                    <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#FBBF24" />
                    </linearGradient>
                </defs>
                {satellites.map((sat, i) => (
                    <motion.line
                        key={i}
                        x1="50%" y1="50%"
                        x2={`calc(50% + ${sat.x}px)`} y2={`calc(50% + ${sat.y}px)`}
                        stroke={(isAllActive || activeIndex % satellites.length === i) ? "url(#lineGradActive)" : "#27272A"}
                        strokeWidth={(isAllActive || activeIndex % satellites.length === i) ? 2 : 1}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1 }}
                    />
                ))}
            </svg>

            {/* Central Core */}
            <motion.div
                onClick={onToggleAll}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative z-20 w-32 h-32 rounded-full border-2 flex items-center justify-center shadow-2xl cursor-pointer transition-all duration-300 ${isAllActive ? 'ring-4 ring-orange-500/30 scale-105' : ''} border-orange-500/30 bg-[#111]`}
            >
                <div className={`absolute inset-2 rounded-full flex items-center justify-center shadow-inner transition-all duration-300 ${isAllActive ? 'animate-pulse' : ''}`}
                     style={{ background: 'linear-gradient(135deg, #F97316, #B45309)' }}
                >
                    <Brain className={`w-12 h-12 text-white/90 transition-all duration-300 ${isAllActive ? 'scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`} />
                </div>

                {/* Orbiting Rings */}
                <div
                    className={`absolute -inset-4 border rounded-full border-dashed transition-colors duration-300 ${isAllActive ? 'animate-spin-fast border-orange-500/50' : 'animate-spin-slow border-orange-500/20'}`}
                />
                <div
                    className="absolute -inset-8 border border-orange-500/10 rounded-full animate-spin-slow-reverse"
                />
            </motion.div>

            {/* Satellites */}
            {satellites.map((sat, i) => {
                const isActive = isAllActive || activeIndex % satellites.length === i;
                return (
                    <motion.div
                        key={i}
                        className={`absolute z-20 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border transition-all duration-300 ${
                            isActive
                                ? 'bg-orange-500/20 border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                                : 'bg-[#111] border-orange-500/10'
                        }`}
                        style={{ x: sat.x, y: sat.y }}
                        animate={{
                            scale: isActive ? 1.2 : 1,
                        }}
                    >
                        <sat.icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-orange-400' : 'text-zinc-600'}`} />
                    </motion.div>
                );
            })}

            {/* Status Pill */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 backdrop-blur-md px-4 py-1.5 rounded-full border text-xs font-bold flex items-center gap-2 shadow-sm bg-[#111]/80 border-orange-500/20 text-zinc-400">
                <span className={`w-2 h-2 rounded-full ${isAllActive ? 'bg-orange-500 animate-ping' : 'bg-green-500 animate-pulse'}`} />
                {isAllActive ? 'FULL SYSTEM ACTIVE' : 'SYSTEM OPERATIONAL'}
            </div>
        </div>
    );
};

export const CapabilitiesSystem = ({ features }: { features: ProductFeature[] }) => {
    const { theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAllActive, setIsAllActive] = useState(false);

    const handleToggleAll = () => {
        setIsAllActive(prev => !prev);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
            {/* Left Column - Controls */}
            <div className="w-full lg:w-5/12 space-y-2">
                {features.map((feature, idx) => (
                    <FeatureNode
                        key={idx}
                        index={idx}
                        feature={feature}
                        isActive={isAllActive || activeIndex === idx}
                        onHover={(idx) => {
                            if (!isAllActive) setActiveIndex(idx);
                        }}
                        theme={theme}
                    />
                ))}
            </div>

            {/* Right Column - Visualizer */}
            <div className="w-full lg:w-7/12 relative">
                {/* Visualizer Container */}
                <div className="relative rounded-[3rem] border shadow-2xl backdrop-blur-xl overflow-hidden bg-[#0A0A0A]/80 border-orange-500/15">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/05 to-transparent" />
                    <CoreEngine activeIndex={activeIndex} theme={theme} isAllActive={isAllActive} onToggleAll={handleToggleAll} />
                </div>

                {/* Decorative Glow */}
                <div className={`absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl rounded-full transition-colors duration-500 ${isAllActive ? 'bg-orange-500/10' : 'bg-orange-500/05'}`} />
            </div>
        </div>
    );
};
