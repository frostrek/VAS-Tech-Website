/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Dark theme colors (SupportIQ Style)
                'dark-bg': '#050505',        // Hero section background
                'dark-navbar': '#050505',    // Navbar background (transparent/glass mostly)
                'dark-card': '#111110',      // Card/bubble background
                'dark-accent': '#F97316',    // Button/accent color (Orange/Amber)
                'dark-text': '#f9fafb',      // Primary text
                'dark-text-muted': '#A1A1AA', // Muted text (zinc-400)

                // Updating base theme variables to default to Dark instead of Earthy
                background: '#050505',       // Pitch Black/Dark Zinc
                'background-alt': '#0A0A0A', // Darker gray
                navbar: 'transparent',

                // Text colors
                primary: '#F9FAFB',          // White/Light Gray
                secondary: '#D4D4D8',        // Zinc 300
                muted: '#A1A1AA',            // Zinc 400

                // Main Accent - Orange / Gold (Replacing brand-green)
                'brand-green': {
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
                    400: '#FBBF24',
                    500: '#F59E0B',          // Main Orange/Gold
                    600: '#D97706',
                    700: '#B45309',
                    800: '#92400E',
                    900: '#78350F',
                },
                // Secondary Accent - Deep Blue Glows (Replacing brand-yellow)
                'brand-yellow': {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',          // Main Blue
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                },

                // Accent colors mapped
                'accent-green': '#F59E0B',
                'accent-yellow': '#3B82F6',
                'dark-green': '#D97706',
                'dark-yellow': '#2563EB',

                // Button gradient colors - SupportIQ specific gradient
                'green-bright': '#FDE047',   // Yellow 300
                'green-dark': '#F97316',     // Orange 500
                'yellow-bright': '#60A5FA',
                'yellow-dark': '#2563EB',
            },
            fontFamily: {
                sans: ['Urbanist', 'system-ui', 'sans-serif'],
                body: ['Urbanist', 'system-ui', 'sans-serif'],
                serif: ['Cormorant Garamond', 'serif'],
            },
            backgroundImage: {
                'hero-gradient': 'linear-gradient(135deg, rgba(20,20,20, 1) 0%, rgba(5,5,5,1) 100%)',
                'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                'glass-border': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                'supportiq-button': 'linear-gradient(135deg, #FDE047 0%, #F97316 100%)',
            },
            animation: {
                // Marquee animation for trusted section
                'marquee': 'marquee 35s linear infinite',
                // Slow spin animations for CapabilitiesSystem
                'spin-slow': 'spin 20s linear infinite',
                'spin-slow-reverse': 'spinReverse 30s linear infinite',
                // Pulse glow for core engine
                'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
                // Wiggle for badges
                'wiggle': 'wiggle 2s ease-in-out infinite',
                // Bounce slow for floating elements
                'bounce-slow': 'bounceSlow 4s ease-in-out infinite',
                // Shimmer for progress bars
                'shimmer': 'shimmer 3s ease-in-out infinite',
                // Wave animations
                'wave-1': 'wave1 8s ease-in-out infinite',
                'wave-2': 'wave2 10s ease-in-out infinite 1s',
                'wave-3': 'wave3 12s ease-in-out infinite 2s',
                // Line animations
                'line-1': 'line1 7s ease-in-out infinite',
                'line-2': 'line2 9s ease-in-out infinite 1.5s',
                // Blob animations
                'blob-1': 'blob1 8s ease-in-out infinite',
                'blob-2': 'blob2 10s ease-in-out infinite 2s',
                'blob-3': 'blob3 9s ease-in-out infinite 1s',
                // Sparkle animations
                'sparkle-1': 'sparkle1 3s ease-in-out infinite',
                'sparkle-2': 'sparkle2 4s ease-in-out infinite 1s',
                'sparkle-3': 'sparkle3 5s ease-in-out infinite 2s',
                'sparkle-4': 'sparkle1 3.5s ease-in-out infinite 0.5s',
                'sparkle-5': 'sparkle4 4.5s ease-in-out infinite 1.5s',
                'sparkle-6': 'sparkle1 3.8s ease-in-out infinite 2.5s',
                'sparkle-7': 'sparkle3 5.5s ease-in-out infinite 3s',
                'sparkle-8': 'sparkle1 4.2s ease-in-out infinite 1.8s',
                'sparkle-mini-1': 'sparkleMini 3.2s ease-in-out infinite 0.8s',
                'sparkle-mini-2': 'sparkleMini 4.8s ease-in-out infinite 2.2s',
                // Optimized animations for performance
                'wave-slow': 'waveSlow 15s ease-in-out infinite',
                'wave-medium': 'waveMedium 12s ease-in-out infinite 2s',
                'blob-slow': 'blobSlow 20s ease-in-out infinite',
                'blob-medium': 'blobMedium 18s ease-in-out infinite 3s',
                'sparkle-slow': 'sparkleSlow 6s ease-in-out infinite',
                'sparkle-medium': 'sparkleMedium 5s ease-in-out infinite 1.5s',
                'sparkle-fast': 'sparkleFast 4s ease-in-out infinite 0.5s',
                // Float animation for hero images
                'float': 'float 4s ease-in-out infinite',
            },
            keyframes: {
                // Wiggle animation for badges
                wiggle: {
                    '0%, 100%': { transform: 'rotate(0deg)' },
                    '25%': { transform: 'rotate(10deg)' },
                    '75%': { transform: 'rotate(-10deg)' },
                },
                bounceSlow: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                // Marquee keyframe for infinite scroll
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                // Spin reverse for counter-rotation
                spinReverse: {
                    '0%': { transform: 'rotate(360deg)' },
                    '100%': { transform: 'rotate(0deg)' },
                },
                // Pulse glow for core engine
                pulseGlow: {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)'
                    },
                    '50%': {
                        transform: 'scale(1.05)',
                        boxShadow: '0 0 40px rgba(249, 115, 22, 0.4)'
                    },
                },
                // Float keyframe for hero images
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                // Wave keyframes - use transform for GPU acceleration
                wave1: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                wave2: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                wave3: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                line1: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(20px)' },
                },
                line2: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                // Blob keyframes
                blob1: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
                    '50%': { transform: 'scale(1.1)', opacity: '0.3' },
                },
                blob2: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.15' },
                    '50%': { transform: 'scale(1.15)', opacity: '0.25' },
                },
                blob3: {
                    '0%, 100%': { transform: 'scale(1)', opacity: '0.25' },
                    '50%': { transform: 'scale(1.12)', opacity: '0.35' },
                },
                // Sparkle keyframes
                sparkle1: {
                    '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
                    '50%': { opacity: '1', transform: 'scale(1.3)' },
                },
                sparkle2: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.2)' },
                },
                sparkle3: {
                    '0%, 100%': { opacity: '0.5', transform: 'translateY(0)' },
                    '50%': { opacity: '1', transform: 'translateY(-8px)' },
                },
                sparkle4: {
                    '0%, 100%': { opacity: '0.3', transform: 'translateX(0)' },
                    '50%': { opacity: '0.7', transform: 'translateX(6px)' },
                },
                sparkleMini: {
                    '0%, 100%': { opacity: '0.2' },
                    '50%': { opacity: '0.6' },
                },
                // Optimized keyframes for smooth performance
                waveSlow: {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '50%': { transform: 'translateY(15px) translateX(-10px)' },
                },
                waveMedium: {
                    '0%, 100%': { transform: 'translateY(0) translateX(0)' },
                    '50%': { transform: 'translateY(-12px) translateX(8px)' },
                },
                blobSlow: {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.05) translate(10px, -10px)' },
                },
                blobMedium: {
                    '0%, 100%': { transform: 'scale(1) translate(0, 0)' },
                    '50%': { transform: 'scale(1.08) translate(-8px, 8px)' },
                },
                sparkleSlow: {
                    '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
                    '50%': { opacity: '0.8', transform: 'scale(1.2)' },
                },
                sparkleMedium: {
                    '0%, 100%': { opacity: '0.25', transform: 'scale(1)' },
                    '50%': { opacity: '0.7', transform: 'scale(1.15)' },
                },
                sparkleFast: {
                    '0%, 100%': { opacity: '0.2', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.1)' },
                },
            },
        },
    },
    plugins: [],
}
