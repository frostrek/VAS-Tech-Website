import {
    Sparkles, Building2, Globe, Zap, Award
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    icon: LucideIcon;
    image: string;
    color: {
        border: string;
        shadow: string;
        bg: string;
        text: string;
        iconColor: string;
    };
}

// ============ TIMELINE DATA ============
export const TIMELINE_DATA: TimelineItem[] = [
    {
        year: '2025',
        title: 'Inception',
        description: 'Founded with a clear vision-to bridge the gap between deep industrial expertise and the rapidly evolving world of technology.',
        icon: Sparkles,
        image: '/inception.png',
        color: { border: 'rgb(176, 117, 82)', shadow: 'rgba(176, 117, 82, 0.2)', bg: 'bg-brand-green-50', text: 'text-brand-green-700', iconColor: 'text-brand-green-500' }
    },
    {
        year: '2026',
        title: 'Platform Integration',
        description: 'Combining real-world industrial knowledge with modern IT and AI-driven solutions for smarter, faster operations.',
        icon: Zap,
        image: '/frostyAbout.png',
        color: { border: 'rgb(196, 143, 113)', shadow: 'rgba(196, 143, 113, 0.2)', bg: 'bg-brand-green-50', text: 'text-brand-green-600', iconColor: 'text-brand-green-400' }
    },
    {
        year: 'Next Era',
        title: 'Trusted Partner',
        description: 'Serving as a trusted partner for enterprises-helping them navigate complexity, embrace innovation, and unlock growth.',
        icon: Award,
        image: '/marketLeader.png',
        color: { border: 'rgb(212, 187, 117)', shadow: 'rgba(212, 187, 117, 0.2)', bg: 'bg-brand-yellow-50', text: 'text-brand-yellow-700', iconColor: 'text-brand-yellow-600' }
    },
];
