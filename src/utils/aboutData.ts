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
        year: '2021',
        title: 'Inception',
        description: 'VAS Tech founded with a vision to dominate technology.',
        icon: Sparkles,
        image: '/inception.png',
        color: { border: 'rgb(176, 117, 82)', shadow: 'rgba(176, 117, 82, 0.2)', bg: 'bg-brand-green-50', text: 'text-brand-green-700', iconColor: 'text-brand-green-500' }
    },
    {
        year: '2025',
        title: 'First Deployment',
        description: 'Successfully deployed our first AI agent platform for early enterprise adopters.',
        icon: Building2,
        image: '/firstDeployment.png',
        color: { border: 'rgb(212, 187, 117)', shadow: 'rgba(212, 187, 117, 0.2)', bg: 'bg-brand-yellow-50', text: 'text-brand-yellow-700', iconColor: 'text-brand-yellow-500' }
    },
    {
        year: '2025',
        title: 'Global Expansion',
        description: 'Opened offices in 3 new continents to serve our growing international client base.',
        icon: Globe,
        image: '/global.png',
        color: { border: 'rgb(138, 90, 53)', shadow: 'rgba(138, 90, 53, 0.2)', bg: 'bg-stone-100', text: 'text-stone-700', iconColor: 'text-stone-600' }
    },
    {
        year: '2026',
        title: 'Platform Launch',
        description: 'Released VAS Tech Agent V1, setting a new standard for autonomous enterprise agents.',
        icon: Zap,
        image: '/frostyAbout.png',
        color: { border: 'rgb(196, 143, 113)', shadow: 'rgba(196, 143, 113, 0.2)', bg: 'bg-brand-green-50', text: 'text-brand-green-600', iconColor: 'text-brand-green-400' }
    },
    {
        year: 'Next Era',
        title: 'Market Leader',
        description: 'Emerging as a leader in Agentic AI solutions.',
        icon: Award,
        image: '/marketLeader.png',
        color: { border: 'rgb(212, 187, 117)', shadow: 'rgba(212, 187, 117, 0.2)', bg: 'bg-brand-yellow-50', text: 'text-brand-yellow-700', iconColor: 'text-brand-yellow-600' }
    },
];
