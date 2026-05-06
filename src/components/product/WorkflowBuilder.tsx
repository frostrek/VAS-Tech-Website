
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, MotionValue } from 'framer-motion';
import {
    Brain,
    Workflow,
    Zap,
    ZoomIn,
    ZoomOut,
    MousePointer2,
    MoreHorizontal,
    Play,
    GitBranch,
    Search,
    CheckCircle2
} from 'lucide-react';
import type { ProductProcessStep } from '../../utils/productData';
import { useTheme } from '../../context/ThemeContext';


// Draggable Node Component
const CanvasNode = ({
    step,
    index,
    x,
    y,
    icon: Icon,
    theme,
    constraintsRef
}: {
    step: ProductProcessStep,
    index: number,
    x: MotionValue<number>,
    y: MotionValue<number>,
    icon: any,
    theme: string,
    constraintsRef: React.RefObject<HTMLDivElement | null>
}) => {
    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragMomentum={false}
            style={{ x, y }}
            whileHover={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={`absolute top-0 left-0 p-4 w-60 rounded-2xl border shadow-xl group transition-all duration-300 z-20 ${theme === 'dark' ? 'bg-[#111111]/90 backdrop-blur-md border-orange-500/20 hover:border-orange-500/50 hover:shadow-orange-500/10' : 'bg-white border-gray-200 hover:border-orange-500/30 hover:shadow-2xl'}`}
        >


            <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${theme === 'dark' ? 'bg-black border-orange-500/20 text-orange-400 group-hover:bg-orange-500 group-hover:text-black' : 'bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>{step.step}</span>
                        <MoreHorizontal className={`w-4 h-4 ${theme === 'dark' ? 'text-zinc-600' : 'text-gray-300'}`} />
                    </div>
                    <h4 className={`font-bold mb-1 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{step.title}</h4>
                    <p className={`text-xs leading-relaxed line-clamp-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{step.description}</p>
                </div>
            </div>

            {/* Drag Handle hint */}
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 text-[10px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${theme === 'dark' ? 'bg-orange-500 text-black font-bold' : 'bg-gray-900 text-white'}`}>
                Drag to move
            </div>
        </motion.div>
    );
};

// Dynamic Connection Line with execution animation
const DynamicConnection = ({
    startX, startY, endX, endY, delay,
    startOffset = { x: 240, y: 36 }, // Center-ish of the ports
    endOffset = { x: 0, y: 36 },
    theme,
    isVertical = false,
    isExecuting = false,
    executionDelay = 0
}: {
    startX: MotionValue<number>, startY: MotionValue<number>,
    endX: MotionValue<number>, endY: MotionValue<number>,
    delay: number,
    startOffset?: { x: number, y: number },
    endOffset?: { x: number, y: number },
    theme: string,
    isVertical?: boolean,
    isExecuting?: boolean,
    executionDelay?: number
}) => {

    const pathRef1 = useRef<SVGPathElement>(null);
    const pathRef2 = useRef<SVGPathElement>(null);
    const pathRef3 = useRef<SVGPathElement>(null);
    const circleRef = useRef<SVGCircleElement>(null);

    useEffect(() => {
        const updatePath = () => {
            const sx = startX.get();
            const sy = startY.get();
            const ex = endX.get();
            const ey = endY.get();

            const sOffset = isVertical ? { x: 120, y: 140 } : startOffset;
            const eOffset = isVertical ? { x: 120, y: 0 } : endOffset;

            const sX = sx + sOffset.x;
            const sY = sy + sOffset.y;
            const eX = ex + eOffset.x;
            const eY = ey + eOffset.y;

            let newPathD = '';

            if (isVertical) {
                const midY = (sY + eY) / 2;
                newPathD = `M ${sX} ${sY} C ${sX} ${midY}, ${eX} ${midY}, ${eX} ${eY}`;
            } else {
                const midX = (sX + eX) / 2;
                newPathD = `M ${sX} ${sY} C ${midX} ${sY}, ${midX} ${eY}, ${eX} ${eY}`;
            }

            if (pathRef1.current) pathRef1.current.setAttribute("d", newPathD);
            if (pathRef2.current) pathRef2.current.setAttribute("d", newPathD);
            if (pathRef3.current) pathRef3.current.setAttribute("d", newPathD);
            if (circleRef.current) (circleRef.current as any).style.offsetPath = `path("${newPathD}")`;
        };

        updatePath();

        const unsubscribers = [
            startX.on('change', updatePath),
            startY.on('change', updatePath),
            endX.on('change', updatePath),
            endY.on('change', updatePath),
        ];

        return () => unsubscribers.forEach(unsub => unsub());
    }, [startX, startY, endX, endY, isVertical, startOffset, endOffset]);

    return (
        <svg
            className="absolute inset-0 pointer-events-none z-10"
            style={{ width: '100%', height: '100%', overflow: 'visible' }}
        >
            <defs>
                <linearGradient id="executionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F97316" />
                    <stop offset="50%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
                <filter id="glowOrange" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* Background track */}
            <motion.path
                ref={pathRef1}
                fill="none"
                stroke={theme === 'dark' ? '#1A1A1A' : '#E5E7EB'}
                strokeWidth="4"
            />

            {/* Default connector (muted orange) */}
            <motion.path
                ref={pathRef2}
                fill="none"
                stroke={isExecuting ? '#F97316' : '#27272A'}
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{
                    pathLength: 1,
                    stroke: isExecuting ? '#F97316' : '#27272A'
                }}
                transition={{ duration: 1.5, delay, ease: "easeInOut" }}
            />

            {/* Execution flow animation */}
            {isExecuting && (
                <>
                    <motion.path
                        ref={pathRef3}
                        fill="none"
                        stroke="#F97316"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glowOrange)"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: executionDelay, ease: "easeOut" }}
                    />

                    <motion.circle
                        ref={circleRef}
                        r="6"
                        fill="#F97316"
                        filter="url(#glowOrange)"
                        initial={{ offsetDistance: "0%" }}
                        animate={{ offsetDistance: "100%" }}
                        transition={{ duration: 0.8, delay: executionDelay, ease: "easeInOut" }}
                    />
                </>
            )}
        </svg>
    );
};

export const WorkflowBuilder = ({ steps }: { steps: ProductProcessStep[] }) => {
    const { theme } = useTheme();
    const [zoom, setZoom] = useState(100);
    const [isVertical, setIsVertical] = useState(false);
    const [isExecuting, setIsExecuting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 150));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));

    const handleExecute = () => {
        if (isExecuting || isCompleted) return; // Prevent multiple clicks
        setIsExecuting(true);

        // Reset after animation completes
        setTimeout(() => {
            setIsExecuting(false);
            setIsCompleted(true);

            // Reset back to initial state after showing success message
            setTimeout(() => {
                setIsCompleted(false);
            }, 3000);
        }, 3000);
    };

    // Initial positions - Tighter layout to fit container
    const x1 = useMotionValue(20);
    const y1 = useMotionValue(130);

    const x2 = useMotionValue(320); // 20 + 240(width) + 60(gap)
    const y2 = useMotionValue(60);  // Offset y for variety

    const x3 = useMotionValue(620); // 320 + 240 + 60
    const y3 = useMotionValue(130);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsVertical(true);
                // Mobile: Vertical Stack
                // Center-ish align: Screen is usually ~360-400px. Node is 240px.
                // Left offset ~50-60px looks good.
                const mobileX = 40;

                x1.set(mobileX);
                y1.set(50);

                x2.set(mobileX);
                y2.set(250); // 50 + 160(height?) + gap

                x3.set(mobileX);
                y3.set(450);
            } else {
                setIsVertical(false);
                // Desktop: Horizontal
                x1.set(20);
                y1.set(130);

                x2.set(320);
                y2.set(60);

                x3.set(620);
                y3.set(130);
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [x1, y1, x2, y2, x3, y3]);

    return (
        <div className="w-full max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`rounded-3xl border shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[500px] ${theme === 'dark' ? 'bg-[#0D0D0D] border-orange-500/20' : 'bg-white border-gray-200'}`}
            >
                {/* 1. Sidebar Palette (Static for visual) */}
                <div className={`w-full md:w-64 border-r p-6 flex flex-col gap-6 relative z-30 ${theme === 'dark' ? 'bg-[#050505] border-orange-500/20' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Workflow</span>
                    </div>

                    <div className="space-y-4">
                        <div className={`text-xs font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>Process Blocks</div>
                        {[
                            { icon: Brain, label: "AI Analysis" },
                            { icon: GitBranch, label: "Logic Branch" },
                            { icon: MousePointer2, label: "Manual Input" }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ x: 5 }}
                                className={`p-3 border rounded-xl shadow-sm flex items-center gap-3 transition-colors ${theme === 'dark' ? 'bg-[#111] border-orange-500/10 hover:border-orange-500/40' : 'bg-white border-gray-200 hover:border-orange-300'}`}
                            >
                                <item.icon className={`w-4 h-4 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`} />
                                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-700'}`}>{item.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        onClick={handleExecute}
                        whileHover={{ scale: (isExecuting || isCompleted) ? 1 : 1.02 }}
                        whileTap={{ scale: (isExecuting || isCompleted) ? 1 : 0.98 }}
                        className={`mt-auto p-4 rounded-xl border cursor-pointer transition-all duration-300 ${isExecuting
                            ? 'bg-orange-500/10 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.15)]'
                            : isCompleted
                                ? 'bg-amber-500/10 border-amber-500/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                                : theme === 'dark'
                                    ? 'bg-orange-500/05 border-orange-500/20 hover:bg-orange-500/10 hover:border-orange-500/40'
                                    : 'bg-orange-50 border-orange-100 hover:bg-orange-100 hover:border-orange-200'
                            }`}
                    >
                        <div className={`flex items-center gap-2 mb-2 font-bold text-sm transition-colors duration-300 ${isExecuting
                            ? 'text-orange-400'
                            : isCompleted
                                ? 'text-amber-400'
                                : theme === 'dark' ? 'text-orange-400' : 'text-orange-700'
                            }`}>
                            {isExecuting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full"
                                />
                            ) : isCompleted ? (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-4 h-4"
                                >
                                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                                </motion.div>
                            ) : (
                                <Play className="w-4 h-4 fill-current" />
                            )}

                            {isExecuting
                                ? 'Running Workflow...'
                                : isCompleted
                                    ? 'Workflow Completed!'
                                    : 'Ready to automate?'}
                        </div>
                        <p className={`text-xs transition-colors duration-300 ${isExecuting
                            ? 'text-orange-500/70'
                            : isCompleted
                                ? 'text-amber-500/70'
                                : theme === 'dark' ? 'text-zinc-500' : 'text-orange-600'
                            }`}>
                            {isExecuting
                                ? 'Optimizing logic paths...'
                                : isCompleted
                                    ? 'Process successfully automated.'
                                    : 'Click here to see the workflow in action!'}
                        </p>
                    </motion.div>
                </div>

                {/* 2. Main Canvas */}
                <div ref={containerRef} className={`flex-1 relative group cursor-default min-h-[650px] md:min-h-0 overflow-hidden ${theme === 'dark' ? 'bg-[#060606]' : 'bg-[#F9FAFB]'}`}>
                    {/* Background Grid */}
                    <div className={`absolute inset-0 opacity-[0.03] ${theme === 'dark' ? 'invert' : ''}`} 
                        style={{ 
                            backgroundImage: `radial-gradient(${theme === 'dark' ? '#F97316' : '#000'} 1px, transparent 1px)`, 
                            backgroundSize: '24px 24px' 
                        }} 
                    />

                    {/* Editor Toolbar (Floating) */}
                    <div className={`absolute bottom-6 md:top-6 md:bottom-auto left-1/2 -translate-x-1/2 backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg flex items-center gap-4 z-30 ${theme === 'dark' ? 'bg-[#111]/90 border-orange-500/20 shadow-orange-500/05' : 'bg-white/90 border-gray-200'}`}>
                        <button className={`transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-orange-400' : 'text-gray-400 hover:text-gray-900'}`}><MousePointer2 className="w-4 h-4" /></button>
                        <div className={`w-px h-4 ${theme === 'dark' ? 'bg-orange-500/20' : 'bg-gray-200'}`} />
                        <button onClick={handleZoomOut} className={`transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-orange-400' : 'text-gray-400 hover:text-gray-900'}`}><ZoomOut className="w-4 h-4" /></button>
                        <span className={`text-xs font-mono min-w-[3ch] text-center ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>{zoom}%</span>
                        <button onClick={handleZoomIn} className={`transition-colors ${theme === 'dark' ? 'text-zinc-500 hover:text-orange-400' : 'text-gray-400 hover:text-gray-900'}`}><ZoomIn className="w-4 h-4" /></button>
                    </div>

                    {/* Nodes and Connections Container */}
                    <motion.div
                        className="relative w-full h-full origin-center"
                        animate={{ scale: zoom / 100 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Dynamic Lines */}
                        {steps.length >= 2 && (
                            <DynamicConnection startX={x1} startY={y1} endX={x2} endY={y2} delay={0.5} theme={theme} isVertical={isVertical} isExecuting={isExecuting} executionDelay={0} />
                        )}
                        {steps.length >= 3 && (
                            <DynamicConnection startX={x2} startY={y2} endX={x3} endY={y3} delay={1.0} theme={theme} isVertical={isVertical} isExecuting={isExecuting} executionDelay={0.8} />
                        )}

                        {/* Draggable Nodes */}
                        {steps[0] && <CanvasNode step={steps[0]} index={0} x={x1} y={y1} icon={Search} theme={theme} constraintsRef={containerRef} />}
                        {steps[1] && <CanvasNode step={steps[1]} index={1} x={x2} y={y2} icon={Workflow} theme={theme} constraintsRef={containerRef} />}
                        {steps[2] && <CanvasNode step={steps[2]} index={2} x={x3} y={y3} icon={Zap} theme={theme} constraintsRef={containerRef} />}
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
