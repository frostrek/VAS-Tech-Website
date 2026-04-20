
import { motion } from 'framer-motion';

const GlowBackground = () => {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0 bg-dark-bg">
            {/* Soft Ambient Light Glows */}
            
            {/* Top Right Orange Glow */}
            <motion.div
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ opacity: [0.5, 0.7, 0.5], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] rounded-full bg-brand-green-500/10 blur-[120px]"
            />

            {/* Top Right Inner Yellow Glow */}
            <motion.div
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-yellow-400/15 blur-[100px]"
            />

            {/* Bottom Right Blue Glow */}
            <motion.div
                initial={{ opacity: 0.4, y: 0 }}
                animate={{ opacity: [0.4, 0.6, 0.4], y: [-20, 20, -20] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[40%] -right-[20%] w-[1000px] h-[1000px] rounded-full bg-brand-yellow-500/15 blur-[150px]"
            />

            {/* Subtle White central glow */}
            <motion.div
                initial={{ opacity: 0.1 }}
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px]"
            />
        
        </div>
    );
};

export default GlowBackground;
