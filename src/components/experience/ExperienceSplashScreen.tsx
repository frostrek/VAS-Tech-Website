import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// A component to handle the camera warp effect
const WarpCamera = ({ warping }: { warping: boolean }) => {
    useFrame((state) => {
        if (warping) {
            // Move camera forward very fast
            state.camera.position.z -= 0.5;
            // Add a little bit of shake/fov change for intensity
            if (state.camera instanceof THREE.PerspectiveCamera) {
                state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 120, 0.1);
                state.camera.updateProjectionMatrix();
            }
        }
    });
    return null;
};

// Slowly rotating stars
const Starfield = ({ warping }: { warping: boolean }) => {
    const starsRef = useRef<THREE.Points>(null);

    useFrame((_, delta) => {
        if (starsRef.current) {
            if (warping) {
                // Stretch stars visually by scaling them along Z or just let the camera fly past
                starsRef.current.position.z += 10 * delta; 
            } else {
                starsRef.current.rotation.x -= delta / 10;
                starsRef.current.rotation.y -= delta / 15;
            }
        }
    });

    return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
};

interface ExperienceSplashScreenProps {
    onComplete: () => void;
}

const ExperienceSplashScreen: React.FC<ExperienceSplashScreenProps> = ({ onComplete }) => {
    const [phase, setPhase] = useState(0);

    const messages = [
        "Initializing AI Environment...",
        "Preparing Interactive Demos...",
        "Experience Our Products Live."
    ];

    useEffect(() => {
        // Sequence the phases
        const timers = [
            setTimeout(() => setPhase(1), 2500), // Show message 1
            setTimeout(() => setPhase(2), 5000), // Show message 2
            setTimeout(() => setPhase(3), 7500), // Show message 3
            setTimeout(() => setPhase(4), 9500), // Start warp
            setTimeout(() => onComplete(), 10500) // End splash screen
        ];

        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const isWarping = phase === 4;

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: isWarping ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: isWarping ? 0.5 : 0 }}
        >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <color attach="background" args={['#050505']} />
                    <Starfield warping={isWarping} />
                    <WarpCamera warping={isWarping} />
                </Canvas>
            </div>

            {/* Storytelling Text */}
            <div className="relative z-10 text-center px-4 max-w-4xl">
                <AnimatePresence mode="wait">
                    {phase < 3 && (
                        <motion.div
                            key={phase}
                            initial={{ opacity: 0, y: 20, scale: 0.95, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -20, scale: 1.05, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="flex flex-col items-center"
                        >
                            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white tracking-wide">
                                {messages[phase]}
                            </h2>
                            {/* Subtle line decoration */}
                            <motion.div 
                                className="h-[2px] bg-orange-500 mt-6 md:mt-10"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2, ease: "linear" }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {/* Vignette effect */}
            <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

            {/* Skip Button */}
            {!isWarping && (
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ delay: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
                >
                    <button 
                        onClick={onComplete}
                        className="text-zinc-500 hover:text-white text-xs md:text-sm tracking-widest uppercase font-black transition-colors flex items-center gap-2 group px-6 py-2 border border-zinc-800 hover:border-zinc-500 rounded-full bg-[#0A0A0A]/80 backdrop-blur-sm"
                    >
                        Skip <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ExperienceSplashScreen;
