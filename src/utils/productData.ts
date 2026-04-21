import {
    Bot, Mic, Share2, Database, ShoppingCart, Headset, BarChart, Server, Globe, Smartphone,
    Zap, Shield, Users, Clock, Phone, FileText, Activity, Podcast, Calendar, DollarSign,
    Filter, Eye, MousePointerClick, Send, CheckCircle, Truck, RefreshCw, Settings, Brain,
    Mail, Workflow, PenTool, Search, UserCheck, MessageSquare, TrendingUp, Target, Layers,
    BarChart3, Code, Link2, GitBranch, Lock, Cpu, BookOpen, FileSearch, Network, Gauge,
    MonitorSmartphone, Palette, Languages, Newspaper
} from 'lucide-react';

import CallingPanaSvg from '../assets/Calling-pana.svg';

export interface ProductStatistic {
    value: string;
    label: string;
    icon?: any;
    breakdown?: { value: number; label: string; color?: string; }[];
}

export interface ProductProcessStep {
    step: string;
    title: string;
    description: string;
}

export interface UseCase {
    title: string;
    description: string;
    icon?: any;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface ProductFeature {
    title: string;
    description: string;
    icon: any;
}

export interface ProductBenefit {
    title: string;
    description: string;
    image?: string;
}

export interface MediaItem {
    type: 'image' | 'video';
    src: string;
    alt: string;
    caption?: string;
}

export interface SpecificationGroup {
    category: string;
    items: { label: string; value: string }[];
}

export interface PricingTier {
    name: string;
    price: string;
    period?: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
    cta: string;
}

export interface ProductVariant {
    id: string;
    name: string;
    description: string;
    icon?: any;
    badge?: string;
}

export interface ReviewItem {
    id: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
    rating: number;
    text: string;
    date: string;
}

export interface RelatedProduct {
    id: string;
    name: string;
    tagline: string;
    icon?: any;
    slug: string;
}

export interface ProductData {
    id: string;
    slug: string;
    tagline: string;
    title: string;
    subtitle: string;
    description: string;
    badge: string;
    heroImage?: string;
    demoImage?: string;
    statistics: ProductStatistic[];
    features: ProductFeature[];
    process: ProductProcessStep[];
    benefits: ProductBenefit[];
    useCases: UseCase[];
    faq: FAQItem[];
    mediaGallery: MediaItem[];
    specifications: SpecificationGroup[];
    pricing: PricingTier[];
    variants: ProductVariant[];
    reviews: ReviewItem[];
    relatedProducts: RelatedProduct[];
}

/* ════════════════════════════════════════════════════════════════════════════
   PRODUCT DATABASE — 14 Products + Generic Fallback
   ════════════════════════════════════════════════════════════════════════════ */

export const PRODUCT_DATA: Record<string, ProductData> = {

/* ────────────────────────────────────────────────────────────────────────────
   01 · COMMUNICATION AUTOMATION
   ──────────────────────────────────────────────────────────────────────────── */

    'ai-calling-agent': {
        id: 'ai-calling-agent',
        slug: 'ai-calling-agent',
        tagline: 'REVOLUTIONIZE YOUR CALL CENTER',
        title: 'AI Calling Agent',
        subtitle: 'Human-like Voice Interactions at Scale',
        description: 'Deploy low-latency voice AI agents that handle inbound support and outbound sales calls with natural, human-like fluidity. Reduce costs by 50% while improving customer satisfaction.',
        badge: 'Low Latency Voice',
        heroImage: CallingPanaSvg,
        demoImage: '/images/vas_tech_dashboard.png',
        statistics: [
            { value: '50%', label: 'Reduction in Costs', icon: BarChart },
            { value: '90%+', label: 'Call Automation', icon: Phone },
            { value: 'Ultra-low', label: 'Processing Latency', icon: Zap },
            { value: '40+', label: 'Languages Supported', icon: Globe },
        ],
        process: [
            { step: '01', title: 'Design Flow', description: 'Use our drag-and-drop builder to create conversation paths.' },
            { step: '02', title: 'Select Voice', description: 'Choose from our library of premium neural voices or clone your own.' },
            { step: '03', title: 'Deploy', description: 'Integrate with your telephony provider (Twilio, Vonage, etc.) instantly.' },
        ],
        features: [
            { title: 'Real-time Transcription', description: 'Transcribes and analyzes calls as they happen for instant insights.', icon: FileText },
            { title: 'Natural Voice Synthesis', description: 'Indistinguishable from human agents with emotional modulation.', icon: Mic },
            { title: 'Interrupt Handling', description: 'Handles interruptions and "umms" naturally like a real person.', icon: Activity },
            { title: 'Inbound & Outbound', description: 'Perfect for support hotlines or proactive sales outreach.', icon: Podcast },
        ],
        benefits: [
            { title: 'Endless Capacity', description: 'Never put a customer on hold again.' },
            { title: 'Perfect Compliance', description: 'Every call adheres strictly to regulatory scripts.' },
        ],
        useCases: [
            { title: 'Appointment Scheduling', description: 'Clinics, Salons, and Service businesses.', icon: Calendar },
            { title: 'Debt Collection', description: 'Empathetic, compliant, and persistent payment reminders.', icon: DollarSign },
            { title: 'Lead Qualification', description: 'Filter inbound leads before routing to sales executives.', icon: Filter },
        ],
        faq: [
            { question: 'Does it sound robotic?', answer: 'Not at all. We use the latest neural TTS engines for hyper-realistic intonation and breathing.' },
            { question: 'Can it handle accents?', answer: 'Yes, our models are trained on diverse datasets to understand global accents.' },
            { question: 'Is it PCI compliant?', answer: 'Yes, we support secure DTMF masking for credit card payments.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_voice.png', alt: 'Voice AI Flow Builder', caption: 'Audio waveform and call transcription log' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Call Analytics', caption: 'Real-time call monitoring and analytics dashboard' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Neural Voice Engine', caption: 'Advanced neural voice synthesis architecture' },
        ],
        specifications: [
            { category: 'Voice Performance', items: [{ label: 'Response Latency', value: '< 400ms end-to-end' }, { label: 'Concurrent Calls', value: '5,000+' }, { label: 'Voice Quality', value: '48kHz Neural TTS' }, { label: 'Uptime SLA', value: '99.99%' }] },
            { category: 'AI Engine', items: [{ label: 'Speech-to-Text', value: 'Whisper v3 / Deepgram' }, { label: 'Languages', value: '40+ with accent support' }, { label: 'Intent Accuracy', value: '96.8%' }, { label: 'Custom Voices', value: 'Voice cloning available' }] },
            { category: 'Telephony', items: [{ label: 'Providers', value: 'Twilio, Vonage, Plivo' }, { label: 'Call Recording', value: 'Auto with transcription' }, { label: 'DTMF Support', value: 'Full keypad input' }, { label: 'Transfer', value: 'Warm & cold transfers' }] },
            { category: 'Compliance', items: [{ label: 'PCI DSS', value: 'Level 1 compliant' }, { label: 'TCPA', value: 'Fully compliant' }, { label: 'Call Recording', value: 'Consent-based recording' }, { label: 'Data Retention', value: 'Configurable policies' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$699', period: '/month', description: 'For businesses starting to automate phone support.', features: ['Up to 500 call minutes/mo', '1 phone number', '3 conversation flows', 'Standard neural voice', 'Basic call analytics'], cta: 'Start Free Trial' },
            { name: 'Growth', price: '$2,499', period: '/month', description: 'Scale your voice operations across departments.', features: ['Up to 5,000 call minutes/mo', '10 phone numbers', 'Unlimited flows', 'Premium neural voices', 'Real-time transcription', 'CRM integration', 'Custom voice cloning'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Full-scale call center replacement.', features: ['Unlimited call minutes', 'Unlimited numbers', 'Custom AI model training', 'Dedicated telephony infra', 'SLA guarantee (99.99%)', 'Dedicated support engineer', 'On-premise deployment', 'White-label available'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'inbound', name: 'Inbound Support', description: 'Handle incoming customer calls with empathetic, context-aware responses.', icon: Phone, badge: 'Most Used' },
            { id: 'outbound', name: 'Outbound Sales', description: 'Proactive outreach for reminders, follow-ups, and lead qualification.', icon: Podcast },
            { id: 'hybrid', name: 'Hybrid Agent', description: 'Combined inbound/outbound with intelligent call routing.', icon: Activity },
        ],
        reviews: [
            { id: 'r1', author: 'Dr. James Park', role: 'Practice Manager', company: 'Wellness Clinics Group', rating: 5, text: 'No-show rates dropped by 62%. The AI handles appointment confirmations and rescheduling with incredible empathy.', date: '2026-03-01', avatar: '/testi4.jpg' },
            { id: 'r2', author: 'Linda Torres', role: 'Director of Sales', company: 'ProLead Systems', rating: 5, text: "Our sales team only talks to pre-qualified leads now. The Voice AI does all the screening — it's like having 50 extra SDRs.", date: '2026-02-15', avatar: '/testi5.png' },
            { id: 'r3', author: 'Omar Klein', role: 'COO', company: 'RecoverRight Financial', rating: 4, text: 'Compliant, empathetic debt collection at scale. Our team focuses on complex cases while AI handles the routine calls.', date: '2026-01-20', avatar: '/testi1.png' },
        ],
        relatedProducts: [
            { id: 'whatsapp-bot', name: 'WhatsApp Bot', tagline: 'Turn conversations into revenue', icon: MessageSquare, slug: 'whatsapp-bot' },
            { id: 'ai-chatbot', name: 'Website Chatbot', tagline: 'AI assistant on your website', icon: Bot, slug: 'ai-chatbot' },
        ],
    },

    'whatsapp-bot': {
        id: 'whatsapp-bot',
        slug: 'whatsapp-bot',
        tagline: 'ENGAGE WHERE IT MATTERS',
        title: 'WhatsApp Bot',
        subtitle: 'Turn Conversations into Revenue',
        description: "Unlock the power of the world's most popular messaging app. Automate notifications, support, and sales directly in WhatsApp with official API integration.",
        badge: 'Meta Business Partner',
        heroImage: '/images/vas_tech_whatsapp.png',
        demoImage: '/images/vas_tech_dashboard.png',
        statistics: [
            { value: '90%+', label: 'Open Rate', icon: Eye },
            { value: '45%', label: 'Click-Through Rate', icon: MousePointerClick },
            { value: '5x', label: 'Higher Conversion', icon: BarChart },
            { value: '2B+', label: 'Active Users', icon: Users },
        ],
        process: [
            { step: '01', title: 'Get Verified', description: 'We help you apply for the official WhatsApp Business API.' },
            { step: '02', title: 'Build Templates', description: 'Create rich message templates for approval.' },
            { step: '03', title: 'Launch Campaigns', description: 'Send broadcasts and handle responses automatically.' },
        ],
        features: [
            { title: 'Automated Broadcasts', description: 'Send personalized offers and updates to thousands instantly.', icon: Send },
            { title: 'Interactive Buttons', description: 'Guide customers with Quick Replies and Call-to-Action buttons.', icon: Smartphone },
            { title: 'Catalog Integration', description: 'Showcase products and process orders without leaving the chat.', icon: ShoppingCart },
            { title: 'Green Tick Support', description: 'Assistance in getting the verified business badge.', icon: CheckCircle },
        ],
        benefits: [
            { title: 'Instant Reach', description: 'Reach customers instantly on their lock screens.' },
            { title: 'Media Rich', description: 'Send images, videos, and PDFs effortlessly.' },
        ],
        useCases: [
            { title: 'Order Updates', description: 'Shipping notifications and delivery tracking.', icon: Truck },
            { title: 'Abandoned Cart', description: 'Recover lost sales with timely reminders.', icon: RefreshCw },
            { title: 'Verification', description: 'Send OTPs securely via WhatsApp.', icon: Smartphone },
        ],
        faq: [
            { question: 'Is there a risk of getting banned?', answer: 'No, we use the official API which is fully compliant with WhatsApp policies.' },
            { question: 'Can I send promotional messages?', answer: 'Yes, using approved Marketing Templates.' },
            { question: 'How quickly can we go live?', answer: 'Most businesses are live within 5–7 business days after Meta approval.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_whatsapp.png', alt: 'WhatsApp Business Flow', caption: 'Automated conversation flows with interactive buttons' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'WhatsApp Campaign Builder', caption: 'Broadcast campaign builder with audience segmentation' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'WhatsApp Analytics', caption: 'Message delivery, read, and conversion analytics' },
        ],
        specifications: [
            { category: 'Messaging', items: [{ label: 'Message Types', value: 'Text, Image, Video, PDF, Location' }, { label: 'Template Messages', value: 'Marketing, Utility, Auth' }, { label: 'Interactive', value: 'Buttons, Lists, Flows' }, { label: 'Broadcast Limit', value: 'Up to 100K/day (scaled)' }] },
            { category: 'Automation', items: [{ label: 'Bot Builder', value: 'Visual no-code flow editor' }, { label: 'AI Responses', value: 'GPT-powered smart replies' }, { label: 'Keyword Triggers', value: 'Unlimited custom triggers' }, { label: 'Business Hours', value: 'Auto-reply scheduling' }] },
            { category: 'Integration', items: [{ label: 'API', value: 'Official Cloud API (Meta)' }, { label: 'Webhooks', value: 'Real-time event callbacks' }, { label: 'E-Commerce', value: 'Shopify, WooCommerce' }, { label: 'CRM', value: 'HubSpot, Salesforce, Zoho' }] },
            { category: 'Compliance', items: [{ label: 'Opt-in/Opt-out', value: 'Built-in consent management' }, { label: 'Quality Rating', value: 'Auto quality monitoring' }, { label: 'Green Tick', value: 'Verification assistance' }, { label: 'Data Privacy', value: 'End-to-end encrypted' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$299', period: '/month', description: 'For small businesses exploring WhatsApp commerce.', features: ['1,000 conversations/mo', '1 WhatsApp number', 'Basic bot builder', 'Template messaging', 'Email support'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$899', period: '/month', description: 'Full automation for mid-size businesses.', features: ['10,000 conversations/mo', '3 WhatsApp numbers', 'Advanced bot + AI replies', 'Catalog integration', 'Broadcast campaigns', 'CRM integrations', 'Priority support'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Scale WhatsApp across your entire organization.', features: ['Unlimited conversations', 'Unlimited numbers', 'Custom AI training', 'Advanced analytics', 'Dedicated account manager', 'SLA guarantee', 'Green tick assistance', 'White-label available'], badge: 'Full Suite', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'support', name: 'Support Bot', description: 'Automated customer support with smart routing and escalation.', icon: Headset, badge: 'Quick Start' },
            { id: 'commerce', name: 'Commerce Bot', description: 'Full shopping experience with catalog, cart, and payments.', icon: ShoppingCart },
            { id: 'marketing', name: 'Marketing Suite', description: 'Broadcast campaigns, drip sequences, and re-engagement.', icon: Send },
        ],
        reviews: [
            { id: 'r1', author: 'Aisha Patel', role: 'Marketing Director', company: 'FashionNova India', rating: 5, text: 'Our abandoned cart recovery went from 8% to 34% after deploying WhatsApp reminders. The ROI was immediate.', date: '2026-03-10', avatar: '/testi2.png' },
            { id: 'r2', author: 'Carlos Mendez', role: 'E-Commerce Manager', company: 'LatAm Retail Co', rating: 5, text: 'Customers love ordering directly from WhatsApp. Our catalog integration drives 40% of our online revenue now.', date: '2026-02-22', avatar: '/testi4.jpg' },
            { id: 'r3', author: 'Emily Zhang', role: 'Head of Growth', company: 'UrbanEats Delivery', rating: 4, text: 'Order updates via WhatsApp reduced our support calls by 55%. Customers prefer it over email by a huge margin.', date: '2026-01-28', avatar: '/testi3.png' },
        ],
        relatedProducts: [
            { id: 'ai-calling-agent', name: 'AI Calling Agent', tagline: 'Human-like voice interactions at scale', icon: Phone, slug: 'ai-calling-agent' },
            { id: 'ai-chatbot', name: 'Website Chatbot', tagline: 'AI assistant on your website', icon: Bot, slug: 'ai-chatbot' },
        ],
    },

    'ai-chatbot': {
        id: 'ai-chatbot',
        slug: 'ai-chatbot',
        tagline: 'AUTOMATE CUSTOMER SUPPORT',
        title: 'Website Chatbot',
        subtitle: 'Intelligent Conversations, Infinite Scale',
        description: 'Empower your support team with a next-gen AI chatbot that understands context, sentiment, and intent. Resolve up to 80% of inquiries instantly without human intervention.',
        badge: 'Top Rated Support AI',
        heroImage: '/images/vas_tech_chatbot.png',
        demoImage: '/images/vas_tech_dashboard.png',
        statistics: [
            { value: '80%', label: 'Automated Resolutions', icon: Zap },
            { value: '24/7', label: 'Availability', icon: Clock },
            { value: 'Instant', label: 'Avg. Response Time', icon: BarChart },
            { value: '3x', label: 'ROI in Year 1', icon: Database },
        ],
        process: [
            { step: '01', title: 'Connect Data', description: 'Link your Knowledge Base, CRM, and past tickets.' },
            { step: '02', title: 'Train Agent', description: 'Our AI automatically learns your brand voice and policies.' },
            { step: '03', title: 'Go Live', description: 'Deploy instantly across Web, WhatsApp, and Social channels.' },
        ],
        features: [
            { title: 'Contextual Understanding', description: 'Goes beyond keywords to understand customer intent and urgency.', icon: Bot },
            { title: 'Sentiment Analysis', description: 'Detects frustration and intelligently routes to human agents.', icon: Headset },
            { title: 'Omnichannel Deployment', description: 'One agent, everywhere: Website, WhatsApp, Messenger, Instagram.', icon: Share2 },
            { title: 'Smart Handoff', description: 'Seamlessly transfers complex issues to humans with full chat history.', icon: Users },
        ],
        benefits: [
            { title: 'Scale Without Hiring', description: 'Handle peak season traffic without adding headcount.' },
            { title: 'Consistent Experience', description: 'Deliver on-brand responses 100% of the time.' },
        ],
        useCases: [
            { title: 'E-Commerce Support', description: 'Order tracking, returns, and product FAQs.', icon: ShoppingCart },
            { title: 'SaaS Helpdesk', description: 'Technical troubleshooting and account management.', icon: Server },
            { title: 'Banking Assistant', description: 'Balance checks, transaction history, and fraud alerts.', icon: Shield },
        ],
        faq: [
            { question: 'How long does it take to train?', answer: 'Most clients are live within 2 weeks. Our pre-trained models require minimal fine-tuning.' },
            { question: 'Does it integrate with Zendesk/Salesforce?', answer: 'Yes, we have native integrations with all major helpdesk and CRM platforms.' },
            { question: 'What happens if the AI makes a mistake?', answer: 'You can set confidence thresholds. Low-confidence queries are automatically routed to humans.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_chatbot.png', alt: 'AI Agent Dashboard', caption: 'Unified conversation dashboard with real-time analytics' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Analytics Overview', caption: 'Deep analytics on resolution rates and customer satisfaction' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Enterprise Integration', caption: 'Seamless integrations with your existing tech stack' },
        ],
        specifications: [
            { category: 'Performance', items: [{ label: 'Response Latency', value: '< 200ms (P95)' }, { label: 'Concurrent Sessions', value: '10,000+' }, { label: 'Resolution Accuracy', value: '95.2%' }, { label: 'Uptime SLA', value: '99.95%' }] },
            { category: 'AI Capabilities', items: [{ label: 'Language Models', value: 'GPT-4o, Claude, Gemini' }, { label: 'Languages Supported', value: '40+' }, { label: 'Context Window', value: '128K tokens' }, { label: 'Training Data', value: 'Your docs, FAQs, tickets' }] },
            { category: 'Integration', items: [{ label: 'API Protocol', value: 'REST + WebSocket' }, { label: 'Authentication', value: 'OAuth 2.0 / API Key' }, { label: 'Channels', value: 'Web, WhatsApp, Slack, Teams' }, { label: 'CRM Support', value: 'Salesforce, HubSpot, Zendesk' }] },
            { category: 'Security', items: [{ label: 'Encryption', value: 'AES-256 at rest, TLS 1.3' }, { label: 'Compliance', value: 'SOC 2, GDPR, HIPAA' }, { label: 'Data Residency', value: 'US, EU, APAC regions' }, { label: 'Audit Logs', value: 'Full conversation logging' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$499', period: '/month', description: 'Perfect for small teams getting started with AI support.', features: ['Up to 1,000 conversations/mo', '1 AI agent', 'Website widget', 'Email support', 'Basic analytics'], cta: 'Start Free Trial' },
            { name: 'Pro', price: '$1,499', period: '/month', description: 'For growing teams that need omnichannel automation.', features: ['Up to 10,000 conversations/mo', '5 AI agents', 'Web + WhatsApp + Slack', 'CRM integrations', 'Advanced analytics', 'Priority support', 'Custom training data'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Tailored solutions for large-scale deployments.', features: ['Unlimited conversations', 'Unlimited agents', 'All channels', 'Dedicated AI engineer', 'Custom LLM fine-tuning', 'SLA guarantee (99.95%)', 'On-premise option', 'White-label available'], badge: 'Best Value', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'standard', name: 'Standard', description: 'Pre-trained on general customer support scenarios — deploy in days.', icon: Bot, badge: 'Quick Start' },
            { id: 'custom', name: 'Custom Trained', description: 'Fine-tuned on your proprietary data for maximum accuracy.', icon: Brain },
            { id: 'enterprise', name: 'Enterprise', description: 'On-premise or dedicated cloud with full data isolation.', icon: Shield },
        ],
        reviews: [
            { id: 'r1', author: 'Sarah Chen', role: 'VP of Customer Success', company: 'TechFlow SaaS', rating: 5, text: 'We reduced our ticket volume by 73% in the first month. The AI handles nuanced product questions we never expected it could.', date: '2026-03-15', avatar: '/testi1.png' },
            { id: 'r2', author: 'Marcus Rivera', role: 'Head of Operations', company: 'ShopDirect', rating: 5, text: "The handoff to human agents is seamless. Customers don't even notice the transition. Our CSAT scores actually improved.", date: '2026-02-28', avatar: '/testi2.png' },
            { id: 'r3', author: 'Priya Sharma', role: 'CTO', company: 'FinServe Digital', rating: 4, text: 'Compliance was our biggest concern. The SOC 2 certification and audit logging made our security team confident from day one.', date: '2026-01-10', avatar: '/testi3.png' },
        ],
        relatedProducts: [
            { id: 'ai-calling-agent', name: 'AI Calling Agent', tagline: 'Human-like voice interactions at scale', icon: Phone, slug: 'ai-calling-agent' },
            { id: 'whatsapp-bot', name: 'WhatsApp Bot', tagline: 'Turn conversations into revenue', icon: MessageSquare, slug: 'whatsapp-bot' },
        ],
    },

    'email-automation': {
        id: 'email-automation',
        slug: 'email-automation',
        tagline: 'SMART EMAIL AT SCALE',
        title: 'Email Automation Agent',
        subtitle: 'AI That Reads, Drafts & Sends — Automatically',
        description: 'Stop drowning in email. Our AI agent reads incoming messages, categorizes them by intent, drafts contextual replies, and triggers automated follow-up sequences — all on autopilot.',
        badge: 'Smart Email AI',
        heroImage: '/images/vas_tech_enterprise.png',
        statistics: [
            { value: '60%', label: 'Time Saved on Email', icon: Clock },
            { value: '95%', label: 'Classification Accuracy', icon: Target },
            { value: '4x', label: 'Faster Response Time', icon: Zap },
            { value: '10K+', label: 'Emails Processed/Day', icon: Mail },
        ],
        process: [
            { step: '01', title: 'Connect Inbox', description: 'Link Gmail, Outlook, or any IMAP inbox securely.' },
            { step: '02', title: 'Set Rules', description: 'Define categories, auto-reply templates, and escalation triggers.' },
            { step: '03', title: 'Automate', description: 'AI reads, categorizes, drafts replies, and sends follow-ups.' },
        ],
        features: [
            { title: 'Intent Classification', description: 'Auto-categorize emails into Sales, Support, Billing, etc.', icon: Filter },
            { title: 'Smart Drafts', description: 'AI-generated replies matching your brand tone and context.', icon: PenTool },
            { title: 'Sequence Builder', description: 'Multi-step follow-up campaigns triggered by user actions.', icon: GitBranch },
            { title: 'Attachment Parsing', description: 'Extract data from attachments like invoices, PDFs, and contracts.', icon: FileText },
        ],
        benefits: [
            { title: 'Zero Inbox', description: 'Keep your inbox clean with automated processing.' },
            { title: 'Consistent Follow-ups', description: 'Never miss a lead follow-up again.' },
        ],
        useCases: [
            { title: 'SaaS Onboarding', description: 'Auto-send welcome sequences triggered by trial signups.', icon: Users },
            { title: 'Sales Pipeline', description: 'Automated follow-ups from free trial to paid conversion.', icon: TrendingUp },
            { title: 'Support Triage', description: 'Classify and route support emails to the right team.', icon: Filter },
        ],
        faq: [
            { question: 'Does it work with Gmail and Outlook?', answer: 'Yes, both Gmail (via API) and Outlook/Office 365 are supported, plus any standard IMAP inbox.' },
            { question: 'Can it handle attachments?', answer: 'Yes, it can parse and extract data from PDF, DOCX, and CSV attachments.' },
            { question: 'Will it send emails without my approval?', answer: 'You control the approval flow. Set it to draft-only, auto-send, or review-before-send.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Email Dashboard', caption: 'Email automation pipeline with real-time tracking' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'AI Classification', caption: 'Smart intent classification engine' },
        ],
        specifications: [
            { category: 'Email Processing', items: [{ label: 'Throughput', value: '10,000+ emails/day' }, { label: 'Classification Accuracy', value: '95%+' }, { label: 'Response Generation', value: '< 3 seconds' }, { label: 'Attachment Support', value: 'PDF, DOCX, CSV, XLS' }] },
            { category: 'Integration', items: [{ label: 'Email Providers', value: 'Gmail, Outlook, IMAP' }, { label: 'CRM Sync', value: 'HubSpot, Salesforce, Pipedrive' }, { label: 'API', value: 'REST + Webhooks' }, { label: 'Authentication', value: 'OAuth 2.0' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$199', period: '/month', description: 'For freelancers and small teams.', features: ['1 inbox connected', '500 emails/mo processed', 'Basic classification', 'Draft mode only'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$799', period: '/month', description: 'Full email automation suite.', features: ['5 inboxes', '5,000 emails/mo', 'AI drafts + auto-send', 'Sequence builder', 'CRM integration', 'Attachment parsing'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For high-volume email operations.', features: ['Unlimited inboxes', 'Unlimited emails', 'Custom AI training', 'Advanced rules engine', 'Dedicated account manager', 'Priority support'], badge: 'Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'support', name: 'Support Inbox', description: 'Auto-triage and respond to customer support emails.', icon: Headset, badge: 'Quick Start' },
            { id: 'sales', name: 'Sales Outreach', description: 'Automated follow-up sequences for leads and prospects.', icon: TrendingUp },
            { id: 'ops', name: 'Operations', description: 'Process invoices, POs, and vendor communications.', icon: FileText },
        ],
        reviews: [
            { id: 'r1', author: 'Rachel Kim', role: 'Sales Director', company: 'CloudStack Inc', rating: 5, text: 'Our trial-to-paid conversion jumped 28% with automated email sequences. The AI drafts are indistinguishable from human ones.', date: '2026-03-08', avatar: '/testi1.png' },
            { id: 'r2', author: 'David Osei', role: 'CEO', company: 'AppVentures', rating: 4, text: 'I saved 3 hours a day on email. The classification is incredibly accurate — it routes everything to the right person automatically.', date: '2026-02-10', avatar: '/testi4.jpg' },
        ],
        relatedProducts: [
            { id: 'ai-chatbot', name: 'Website Chatbot', tagline: 'AI assistant on your website', icon: Bot, slug: 'ai-chatbot' },
            { id: 'crm-automation', name: 'CRM Automation', tagline: 'Auto-manage your sales pipeline', icon: Database, slug: 'crm-automation' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   02 · SALES & CRM AUTOMATION
   ──────────────────────────────────────────────────────────────────────────── */

    'lead-generation': {
        id: 'lead-generation',
        slug: 'lead-generation',
        tagline: 'FIND YOUR NEXT CUSTOMER',
        title: 'Lead Generation Agent',
        subtitle: 'Qualified Prospects, Delivered Daily',
        description: 'An AI agent that scrapes, qualifies, and enriches leads from multiple sources automatically. Get 50+ verified prospects delivered to your CRM every morning.',
        badge: 'B2B Prospecting AI',
        heroImage: '/images/vas_tech_hero.png',
        statistics: [
            { value: '50+', label: 'Daily Qualified Leads', icon: Users },
            { value: '92%', label: 'Email Accuracy', icon: CheckCircle },
            { value: '3x', label: 'Pipeline Growth', icon: TrendingUp },
            { value: '70%', label: 'Less Research Time', icon: Clock },
        ],
        process: [
            { step: '01', title: 'Define ICP', description: 'Set your Ideal Customer Profile — industry, size, geography, tech stack.' },
            { step: '02', title: 'AI Scrapes', description: 'Agent searches LinkedIn, directories, and web for matching leads.' },
            { step: '03', title: 'Enrich & Deliver', description: 'Verified leads with emails, phone numbers, and intent signals pushed to your CRM.' },
        ],
        features: [
            { title: 'Multi-Source Scraping', description: 'LinkedIn, Google, directories, company websites — all automated.', icon: Globe },
            { title: 'Email Verification', description: 'Real-time verification of email addresses with 92%+ accuracy.', icon: CheckCircle },
            { title: 'Buying Intent Signals', description: 'Track job postings, tech stack changes, and funding events.', icon: Target },
            { title: 'CRM Auto-Push', description: 'Leads pushed directly to Salesforce, HubSpot, or Pipedrive.', icon: Database },
        ],
        benefits: [
            { title: 'Fill Your Pipeline', description: 'Wake up to 50+ qualified leads every morning.' },
            { title: 'SDR Amplifier', description: 'Let your sales reps focus on closing, not researching.' },
        ],
        useCases: [
            { title: 'B2B SaaS Sales', description: 'Find decision-makers at companies using competitor tools.', icon: Target },
            { title: 'Recruitment', description: 'Source candidates matching specific skill profiles.', icon: Users },
            { title: 'Agency Outreach', description: 'Build prospect lists for white-label outreach campaigns.', icon: Send },
        ],
        faq: [
            { question: 'Is it compliant with LinkedIn rules?', answer: 'We use compliant scraping methods and API integrations to ensure no TOS violations.' },
            { question: 'How accurate are the emails?', answer: 'Our multi-step verification achieves 92%+ accuracy on bounce rates below 3%.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_hero.png', alt: 'Lead Pipeline', caption: 'AI-powered lead pipeline management' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Lead Dashboard', caption: 'Real-time lead scoring and enrichment dashboard' },
        ],
        specifications: [
            { category: 'Lead Generation', items: [{ label: 'Daily Output', value: '50-200 leads/day' }, { label: 'Email Accuracy', value: '92%+' }, { label: 'Data Points', value: '20+ per lead' }, { label: 'Sources', value: 'LinkedIn, Web, Directories' }] },
            { category: 'Integration', items: [{ label: 'CRM', value: 'Salesforce, HubSpot, Pipedrive' }, { label: 'Enrichment', value: 'Clearbit, Apollo, ZoomInfo' }, { label: 'API', value: 'REST + CSV Export' }, { label: 'Webhooks', value: 'Real-time notifications' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$399', period: '/month', description: 'For solo founders and small sales teams.', features: ['Up to 500 leads/mo', '1 ICP profile', 'Email verification', 'CSV export'], cta: 'Start Free Trial' },
            { name: 'Growth', price: '$999', period: '/month', description: 'For scaling sales teams.', features: ['Up to 2,000 leads/mo', '5 ICP profiles', 'CRM integration', 'Intent signals', 'LinkedIn enrichment', 'Priority support'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For large sales organizations.', features: ['Unlimited leads', 'Unlimited ICPs', 'Custom data sources', 'Dedicated account manager', 'API access', 'White-label'], badge: 'Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'prospecting', name: 'Prospecting Agent', description: 'Find and qualify new leads matching your ICP daily.', icon: Target, badge: 'Core' },
            { id: 'enrichment', name: 'Enrichment Agent', description: 'Enrich existing CRM contacts with fresh data and intent signals.', icon: Database },
            { id: 'outreach', name: 'Outreach Agent', description: 'Combine lead gen with automated outreach sequences.', icon: Send },
        ],
        reviews: [
            { id: 'r1', author: 'Jake Morrison', role: 'VP Sales', company: 'ScaleUp SaaS', rating: 5, text: 'We replaced 3 SDRs with this tool. Pipeline grew 3x and cost dropped 60%. Every lead is verified and qualified.', date: '2026-03-05', avatar: '/testi4.jpg' },
            { id: 'r2', author: 'Nina Patel', role: 'Growth Lead', company: 'AdTech Pro', rating: 5, text: 'The intent signals are a game-changer. We know exactly when prospects are in-market before reaching out.', date: '2026-02-18', avatar: '/testi2.png' },
        ],
        relatedProducts: [
            { id: 'crm-automation', name: 'CRM Automation', tagline: 'Auto-manage your sales pipeline', icon: Database, slug: 'crm-automation' },
            { id: 'email-automation', name: 'Email Automation', tagline: 'AI that reads, drafts, and sends emails', icon: Mail, slug: 'email-automation' },
        ],
    },

    'crm-automation': {
        id: 'crm-automation',
        slug: 'crm-automation',
        tagline: 'YOUR PIPELINE ON AUTOPILOT',
        title: 'CRM Automation',
        subtitle: 'Auto-Update, Auto-Score, Auto-Close',
        description: 'AI that auto-updates CRM records, logs every call and email, scores leads in real-time, and triggers deal workflows — so your reps focus on closing, not on data entry.',
        badge: 'Pipeline Intelligence',
        heroImage: '/images/vas_tech_dashboard.png',
        statistics: [
            { value: '85%', label: 'Less Manual Entry', icon: Settings },
            { value: '40%', label: 'Higher Win Rates', icon: TrendingUp },
            { value: '2x', label: 'Pipeline Velocity', icon: Zap },
            { value: '100%', label: 'Activity Logging', icon: CheckCircle },
        ],
        process: [
            { step: '01', title: 'Connect CRM', description: 'Plug into Salesforce, HubSpot, or any CRM via API.' },
            { step: '02', title: 'Set Automations', description: 'Define lead scoring rules, deal stages, and workflow triggers.' },
            { step: '03', title: 'Let AI Work', description: 'Automatic logging, scoring, and pipeline management.' },
        ],
        features: [
            { title: 'Auto-Logging', description: 'Every call, email, and meeting automatically logged to contact records.', icon: FileText },
            { title: 'Lead Scoring', description: 'AI-driven scoring based on engagement, firmographics, and intent.', icon: BarChart3 },
            { title: 'Deal Workflows', description: 'Automated stage transitions, reminders, and escalation triggers.', icon: Workflow },
            { title: 'Revenue Forecasting', description: 'Predictive models for pipeline value and close probability.', icon: TrendingUp },
        ],
        benefits: [
            { title: 'Data-Driven Sales', description: 'Base every decision on real engagement data.' },
            { title: 'Rep Productivity', description: 'Reps spend 85% more time selling, not entering data.' },
        ],
        useCases: [
            { title: 'Sales Teams', description: 'Automate pipeline management and follow-up scheduling.', icon: Users },
            { title: 'Account Management', description: 'Track account health and renewal risk automatically.', icon: Shield },
            { title: 'Revenue Operations', description: 'Unified reporting across marketing, sales, and CS.', icon: BarChart },
        ],
        faq: [
            { question: 'Which CRMs do you support?', answer: 'Salesforce, HubSpot, Pipedrive, Zoho, and any CRM with a REST API.' },
            { question: 'Will it overwrite existing CRM data?', answer: 'No, our AI appends and enriches — it never overwrites unless you explicitly configure it to.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'CRM Dashboard', caption: 'Unified pipeline view with AI-driven insights' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'CRM Integrations', caption: 'Deep integrations with major CRM platforms' },
        ],
        specifications: [
            { category: 'CRM Integration', items: [{ label: 'Platforms', value: 'Salesforce, HubSpot, Pipedrive, Zoho' }, { label: 'Sync Frequency', value: 'Real-time bidirectional' }, { label: 'Data Points', value: '50+ fields per record' }, { label: 'History', value: 'Full activity timeline' }] },
            { category: 'Intelligence', items: [{ label: 'Lead Scoring', value: 'ML-based predictive scoring' }, { label: 'Deal Prediction', value: '87% close probability accuracy' }, { label: 'Activity Auto-log', value: 'Calls, emails, meetings' }, { label: 'Reporting', value: 'Custom dashboards + alerts' }] },
        ],
        pricing: [
            { name: 'Team', price: '$599', period: '/month', description: 'For small sales teams.', features: ['Up to 10 users', '1 CRM connection', 'Auto-logging', 'Basic lead scoring', 'Standard reports'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$1,499', period: '/month', description: 'For scaling sales orgs.', features: ['Up to 50 users', 'Multi-CRM support', 'Advanced scoring', 'Deal workflows', 'Revenue forecasting', 'API access'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For large sales organizations.', features: ['Unlimited users', 'Custom integrations', 'Dedicated AI models', 'SLA guarantee', 'Dedicated CSM', 'On-premise option'], badge: 'Full Suite', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'logging', name: 'Activity Logger', description: 'Automatic logging of all sales activities to CRM.', icon: FileText, badge: 'Essentials' },
            { id: 'scoring', name: 'Lead Scoring', description: 'AI-driven lead and deal scoring for prioritization.', icon: BarChart3 },
            { id: 'full', name: 'Full Pipeline AI', description: 'Complete pipeline automation with forecasting.', icon: TrendingUp },
        ],
        reviews: [
            { id: 'r1', author: 'Tom Wallace', role: 'Sales Director', company: 'DataSync Corp', rating: 5, text: 'Our CRM data accuracy went from 40% to 98%. Reps actually trust the pipeline now because everything is auto-logged.', date: '2026-03-12', avatar: '/testi5.png' },
            { id: 'r2', author: 'Sana Mirza', role: 'RevOps Manager', company: 'GrowthMetrics', rating: 5, text: 'Revenue forecasting accuracy improved 35%. Leadership finally has reliable pipeline projections.', date: '2026-02-25', avatar: '/testi3.png' },
        ],
        relatedProducts: [
            { id: 'lead-generation', name: 'Lead Generation Agent', tagline: 'Qualified prospects delivered daily', icon: Users, slug: 'lead-generation' },
            { id: 'email-automation', name: 'Email Automation', tagline: 'AI that reads, drafts, and sends emails', icon: Mail, slug: 'email-automation' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   03 · OPERATIONS AUTOMATION
   ──────────────────────────────────────────────────────────────────────────── */

    'invoice-document-ai': {
        id: 'invoice-document-ai',
        slug: 'invoice-document-ai',
        tagline: 'ELIMINATE MANUAL PROCESSING',
        title: 'Invoice & Document AI',
        subtitle: 'Extract, Validate & Process — Automatically',
        description: 'AI that extracts data from invoices, POs, and contracts with 99% accuracy. Validate against business rules, flag discrepancies, and sync directly with your accounting software.',
        badge: 'OCR + AI Processing',
        heroImage: '/images/vas_tech_enterprise.png',
        statistics: [
            { value: '99%', label: 'Extraction Accuracy', icon: Target },
            { value: '90%', label: 'Less Manual Work', icon: Clock },
            { value: '5x', label: 'Faster Processing', icon: Zap },
            { value: '0', label: 'Data Entry Errors', icon: Shield },
        ],
        process: [
            { step: '01', title: 'Upload Docs', description: 'Drop invoices, POs, or contracts — PDF, image, or scan.' },
            { step: '02', title: 'AI Extracts', description: 'Our OCR + AI engine extracts structured data instantly.' },
            { step: '03', title: 'Validate & Sync', description: 'Auto-validate against rules and push to your accounting system.' },
        ],
        features: [
            { title: 'Intelligent OCR', description: 'Multi-language OCR that handles handwritten notes, stamps, and poor scans.', icon: Eye },
            { title: 'Auto-Validation', description: 'Cross-reference extracted data with POs, contracts, and price lists.', icon: CheckCircle },
            { title: 'Accounting Sync', description: 'Push directly to QuickBooks, Xero, SAP, or any ERP system.', icon: Link2 },
            { title: 'Anomaly Detection', description: 'Flag duplicate invoices, price discrepancies, and suspicious entries.', icon: Shield },
        ],
        benefits: [
            { title: 'Zero Manual Entry', description: 'Eliminate tedious data entry from your operations.' },
            { title: 'Audit Ready', description: 'Full audit trail with original document linkage.' },
        ],
        useCases: [
            { title: 'Accounts Payable', description: 'Automate invoice processing and approval workflows.', icon: DollarSign },
            { title: 'Procurement', description: 'Match POs to invoices and goods receipts automatically.', icon: Truck },
            { title: 'Legal', description: 'Extract key terms from contracts and NDAs.', icon: FileText },
        ],
        faq: [
            { question: 'What document formats are supported?', answer: 'PDF, PNG, JPG, TIFF, DOCX, and scanned documents.' },
            { question: 'Can it handle multiple languages?', answer: 'Yes, our OCR supports 25+ languages including Arabic, Chinese, and Hindi.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Document Processing', caption: 'Intelligent document extraction pipeline' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Processing Dashboard', caption: 'Real-time document processing analytics' },
        ],
        specifications: [
            { category: 'Processing', items: [{ label: 'Extraction Accuracy', value: '99%+' }, { label: 'Processing Speed', value: '< 5 seconds/page' }, { label: 'Formats', value: 'PDF, PNG, JPG, TIFF, DOCX' }, { label: 'Languages', value: '25+ OCR languages' }] },
            { category: 'Integration', items: [{ label: 'Accounting', value: 'QuickBooks, Xero, SAP' }, { label: 'ERP', value: 'SAP, Oracle, NetSuite' }, { label: 'Storage', value: 'S3, GCS, Azure Blob' }, { label: 'API', value: 'REST + Batch processing' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$349', period: '/month', description: 'For small businesses.', features: ['500 pages/mo', '1 document type', 'Basic extraction', 'CSV export'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$999', period: '/month', description: 'Full document automation.', features: ['5,000 pages/mo', 'All document types', 'Auto-validation', 'Accounting sync', 'Anomaly detection', 'API access'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'High-volume document processing.', features: ['Unlimited pages', 'Custom templates', 'ERP integration', 'On-premise option', 'Dedicated support', 'SLA guarantee'], badge: 'Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'invoice', name: 'Invoice Processing', description: 'Focused on AP invoice extraction and validation.', icon: DollarSign, badge: 'Most Used' },
            { id: 'contract', name: 'Contract Analysis', description: 'Extract key terms, dates, and obligations from contracts.', icon: FileText },
            { id: 'full', name: 'Full Document Suite', description: 'Process any document type with custom templates.', icon: Layers },
        ],
        reviews: [
            { id: 'r1', author: 'Robert Tanaka', role: 'CFO', company: 'LogiFreight Inc', rating: 5, text: 'Processing 2,000 invoices/month used to take 3 people. Now it takes 1 person reviewing AI outputs. Incredible ROI.', date: '2026-03-02', avatar: '/testi5.png' },
        ],
        relatedProducts: [
            { id: 'workflow-builder', name: 'Workflow Builder', tagline: 'No-code automation connecting 100s of apps', icon: Workflow, slug: 'workflow-builder' },
            { id: 'crm-automation', name: 'CRM Automation', tagline: 'Auto-manage your sales pipeline', icon: Database, slug: 'crm-automation' },
        ],
    },

    'workflow-builder': {
        id: 'workflow-builder',
        slug: 'workflow-builder',
        tagline: 'CONNECT EVERYTHING',
        title: 'Workflow Builder',
        subtitle: 'No-Code Automation — 100s of Apps Connected',
        description: 'Custom no-code automation connecting your entire tech stack in multi-step flows. From CRM to invoicing to reporting — one trigger automates everything.',
        badge: 'n8n / Make Powered',
        heroImage: '/images/vas_tech_hero.png',
        statistics: [
            { value: '500+', label: 'App Integrations', icon: Link2 },
            { value: '80%', label: 'Process Automation', icon: Settings },
            { value: '10x', label: 'Faster Onboarding', icon: Zap },
            { value: 'Zero', label: 'Code Required', icon: Code },
        ],
        process: [
            { step: '01', title: 'Map Process', description: 'We audit your existing workflow and identify automation points.' },
            { step: '02', title: 'Build Flows', description: 'Using n8n or Make, we create multi-step, conditional automations.' },
            { step: '03', title: 'Monitor', description: 'Real-time monitoring with alerts for failed executions.' },
        ],
        features: [
            { title: 'Visual Builder', description: 'Drag-and-drop interface — no coding skills required.', icon: Layers },
            { title: '500+ Integrations', description: 'Connect CRM, email, databases, APIs, and more.', icon: Link2 },
            { title: 'Conditional Logic', description: 'If/then branching, loops, and error handling built-in.', icon: GitBranch },
            { title: 'Real-time Monitoring', description: 'Track every execution with alerts for failures.', icon: Activity },
        ],
        benefits: [
            { title: 'No Developers Needed', description: 'Business teams can build their own automations.' },
            { title: 'Instant ROI', description: 'Most workflows save time from day one.' },
        ],
        useCases: [
            { title: 'Client Onboarding', description: 'Automate the entire onboarding flow from CRM to invoicing.', icon: Users },
            { title: 'Data Sync', description: 'Keep data synchronized across all your business tools.', icon: RefreshCw },
            { title: 'Reporting', description: 'Auto-generate weekly reports from multiple data sources.', icon: BarChart },
        ],
        faq: [
            { question: 'Do I need to code?', answer: 'No. Our workflow builder is entirely visual with drag-and-drop nodes.' },
            { question: 'What platforms do you use?', answer: 'We specialize in n8n (self-hosted) and Make (cloud), depending on your needs.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_hero.png', alt: 'Workflow Builder', caption: 'Visual workflow automation platform' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Flow Monitoring', caption: 'Real-time execution monitoring dashboard' },
        ],
        specifications: [
            { category: 'Platform', items: [{ label: 'Engines', value: 'n8n (self-hosted) + Make (cloud)' }, { label: 'Integrations', value: '500+ apps and services' }, { label: 'Execution Monitoring', value: 'Real-time with error alerts' }, { label: 'Version Control', value: 'Git-based flow versioning' }] },
            { category: 'Capabilities', items: [{ label: 'Conditional Logic', value: 'If/then, switches, loops' }, { label: 'Error Handling', value: 'Retry, fallback, alerts' }, { label: 'Scheduling', value: 'Cron, webhook, event-driven' }, { label: 'Data Transform', value: 'JSON, XML, CSV mapping' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$499', period: '/month', description: 'Basic workflow automation.', features: ['5 active workflows', 'Standard integrations', 'Email support', 'Basic monitoring'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$1,299', period: '/month', description: 'Advanced automation suite.', features: ['25 active workflows', 'All integrations', 'Priority support', 'Advanced monitoring', 'Custom triggers', 'API access'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Unlimited automation at scale.', features: ['Unlimited workflows', 'Self-hosted option', 'Dedicated engineer', 'Custom integrations', 'SLA guarantee', 'On-premise deployment'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'cloud', name: 'Cloud (Make)', description: 'Fully managed cloud automation — get started in minutes.', icon: Globe, badge: 'Quick Start' },
            { id: 'selfhosted', name: 'Self-Hosted (n8n)', description: 'Full control with n8n on your own infrastructure.', icon: Server },
            { id: 'hybrid', name: 'Hybrid', description: 'Combined cloud + self-hosted for maximum flexibility.', icon: Network },
        ],
        reviews: [
            { id: 'r1', author: 'Alex Brennan', role: 'Operations Lead', company: 'Digital Agency X', rating: 5, text: 'Client onboarding went from 4 hours to 4 minutes. One trigger creates accounts, sends contracts, and sets up projects automatically.', date: '2026-02-20', avatar: '/testi1.png' },
        ],
        relatedProducts: [
            { id: 'invoice-document-ai', name: 'Invoice & Document AI', tagline: 'Extract and process documents with AI', icon: FileText, slug: 'invoice-document-ai' },
            { id: 'crm-automation', name: 'CRM Automation', tagline: 'Auto-manage your sales pipeline', icon: Database, slug: 'crm-automation' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   04 · DATA & INTELLIGENCE
   ──────────────────────────────────────────────────────────────────────────── */

    'web-scraping': {
        id: 'web-scraping',
        slug: 'web-scraping',
        tagline: 'DATA ON DEMAND',
        title: 'Web Scraping & Monitoring',
        subtitle: 'Competitive Intelligence, Automated',
        description: 'Scheduled web scraping with alerts, competitor price tracking, and structured data output. Monitor any website for changes and get actionable data delivered to your inbox.',
        badge: 'Real-time Monitoring',
        heroImage: '/images/vas_tech_hero.png',
        statistics: [
            { value: '10M+', label: 'Pages Scraped/Month', icon: Globe },
            { value: '99.5%', label: 'Data Accuracy', icon: Target },
            { value: 'Real-time', label: 'Change Detection', icon: Activity },
            { value: '50+', label: 'Export Formats', icon: FileText },
        ],
        process: [
            { step: '01', title: 'Define Sources', description: 'Tell us which websites and data points to monitor.' },
            { step: '02', title: 'Configure Schedule', description: 'Set scraping frequency — hourly, daily, or on-demand.' },
            { step: '03', title: 'Get Data', description: 'Structured data delivered via API, CSV, or database.' },
        ],
        features: [
            { title: 'Visual Scraper', description: 'Point-and-click interface to select data fields from any website.', icon: MonitorSmartphone },
            { title: 'Change Alerts', description: 'Get notified when competitor prices, content, or inventory changes.', icon: Activity },
            { title: 'Anti-Detection', description: 'Rotating proxies, headless browsers, and CAPTCHA solving.', icon: Shield },
            { title: 'Structured Output', description: 'Clean JSON, CSV, or direct database push.', icon: Database },
        ],
        benefits: [{ title: 'Competitive Edge', description: 'Always know what competitors are doing.' }, { title: 'Data-Driven Decisions', description: 'Base strategy on real market data.' }],
        useCases: [
            { title: 'Price Monitoring', description: 'Track competitor pricing daily across thousands of SKUs.', icon: DollarSign },
            { title: 'Market Research', description: 'Aggregate industry data from multiple public sources.', icon: BarChart3 },
            { title: 'Review Tracking', description: 'Monitor brand mentions and reviews across platforms.', icon: MessageSquare },
        ],
        faq: [
            { question: 'Is web scraping legal?', answer: 'We only scrape publicly available data and comply with robots.txt policies and relevant legislation.' },
            { question: 'Can you handle JavaScript-heavy sites?', answer: 'Yes, we use headless browsers (Puppeteer/Playwright) for JS-rendered content.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Scraping Dashboard', caption: 'Web scraping monitoring and scheduling dashboard' },
        ],
        specifications: [
            { category: 'Scraping', items: [{ label: 'Volume', value: '10M+ pages/month' }, { label: 'Speed', value: '1,000+ pages/min' }, { label: 'JS Rendering', value: 'Puppeteer + Playwright' }, { label: 'Anti-detection', value: 'Proxy rotation, CAPTCHA' }] },
            { category: 'Output', items: [{ label: 'Formats', value: 'JSON, CSV, XML, Database' }, { label: 'Scheduling', value: 'Cron, webhook, API trigger' }, { label: 'Notifications', value: 'Email, Slack, Webhook' }, { label: 'Storage', value: 'S3, GCS, custom DB' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$299', period: '/month', description: 'For basic monitoring needs.', features: ['10,000 pages/mo', '5 scrapers', 'Daily scheduling', 'CSV export', 'Email alerts'], cta: 'Start Free Trial' },
            { name: 'Pro', price: '$899', period: '/month', description: 'For data-intensive operations.', features: ['100,000 pages/mo', '25 scrapers', 'Hourly scheduling', 'API + database output', 'Slack alerts', 'Anti-detection suite'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Unlimited scraping at scale.', features: ['Unlimited pages', 'Unlimited scrapers', 'Real-time monitoring', 'Dedicated proxies', 'Custom integrations', 'SLA guarantee'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'monitoring', name: 'Change Monitoring', description: 'Track changes on any web page and get instant alerts.', icon: Activity, badge: 'Quick Start' },
            { id: 'extraction', name: 'Data Extraction', description: 'Large-scale structured data extraction from websites.', icon: Database },
            { id: 'competitive', name: 'Competitive Intel', description: 'Full competitor tracking suite with price monitoring.', icon: Target },
        ],
        reviews: [
            { id: 'r1', author: 'Mike Chen', role: 'E-Commerce Director', company: 'PriceWave Retail', rating: 5, text: 'We track 50,000 competitor SKUs daily. Price matching used to take a team of 5 — now it\'s fully automated.', date: '2026-02-28', avatar: '/testi4.jpg' },
        ],
        relatedProducts: [
            { id: 'ai-analytics', name: 'AI Analytics Dashboard', tagline: 'NLP queries over your business data', icon: BarChart3, slug: 'ai-analytics' },
            { id: 'lead-generation', name: 'Lead Generation Agent', tagline: 'Qualified prospects delivered daily', icon: Users, slug: 'lead-generation' },
        ],
    },

    'ai-analytics': {
        id: 'ai-analytics',
        slug: 'ai-analytics',
        tagline: 'ASK YOUR DATA ANYTHING',
        title: 'AI Analytics Dashboard',
        subtitle: 'Natural Language Queries, Real-time Insights',
        description: 'Ask "What was our best-selling SKU last month?" in plain English and get a chart back in 3 seconds. AI-powered analytics that makes data accessible to everyone.',
        badge: 'NLP Analytics',
        heroImage: '/images/vas_tech_dashboard.png',
        statistics: [
            { value: '3s', label: 'Query Response Time', icon: Zap },
            { value: '40+', label: 'Data Sources', icon: Database },
            { value: '95%', label: 'Query Accuracy', icon: Target },
            { value: 'Real-time', label: 'Data Refresh', icon: RefreshCw },
        ],
        process: [
            { step: '01', title: 'Connect Data', description: 'Link databases, spreadsheets, APIs, and cloud storage.' },
            { step: '02', title: 'Ask Questions', description: 'Type natural language queries — no SQL or coding needed.' },
            { step: '03', title: 'Get Insights', description: 'Charts, tables, and summaries generated instantly.' },
        ],
        features: [
            { title: 'Natural Language Queries', description: 'Ask questions in plain English — AI translates to SQL.', icon: MessageSquare },
            { title: 'Auto-Visualizations', description: 'Charts and graphs generated automatically based on data shape.', icon: BarChart3 },
            { title: 'Scheduled Reports', description: 'Automated report delivery to stakeholders on any schedule.', icon: Calendar },
            { title: 'Anomaly Alerts', description: 'AI detects unusual patterns and sends proactive alerts.', icon: Activity },
        ],
        benefits: [{ title: 'Democratize Data', description: 'Everyone on your team can query data without SQL.' }, { title: 'Faster Decisions', description: 'Get answers in seconds, not days.' }],
        useCases: [
            { title: 'Operations Teams', description: 'Track KPIs, SLAs, and operational efficiency in real-time.', icon: Gauge },
            { title: 'Marketing', description: 'Campaign performance, attribution, and ROI analysis.', icon: TrendingUp },
            { title: 'Finance', description: 'Revenue tracking, cost analysis, and forecasting.', icon: DollarSign },
        ],
        faq: [
            { question: 'Do I need to know SQL?', answer: 'No. Just type your question in plain English and the AI handles the rest.' },
            { question: 'What data sources are supported?', answer: 'PostgreSQL, MySQL, BigQuery, Snowflake, Google Sheets, CSV, REST APIs, and 40+ more.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Analytics Dashboard', caption: 'Natural language analytics dashboard' },
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Data Sources', caption: 'Connect 40+ data sources seamlessly' },
        ],
        specifications: [
            { category: 'Analytics', items: [{ label: 'Query Language', value: 'Natural English → SQL' }, { label: 'Response Time', value: '< 3 seconds' }, { label: 'Visualizations', value: 'Bar, Line, Pie, Scatter, Table' }, { label: 'Data Refresh', value: 'Real-time + scheduled' }] },
            { category: 'Data Sources', items: [{ label: 'Databases', value: 'PostgreSQL, MySQL, BigQuery, Snowflake' }, { label: 'Files', value: 'CSV, Excel, Google Sheets' }, { label: 'APIs', value: 'REST + GraphQL' }, { label: 'Warehouses', value: 'Redshift, Databricks, ClickHouse' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$399', period: '/month', description: 'For small teams.', features: ['5 users', '3 data sources', '100 queries/day', 'Basic visualizations', 'Email support'], cta: 'Start Free Trial' },
            { name: 'Pro', price: '$1,199', period: '/month', description: 'For data-driven organizations.', features: ['25 users', 'Unlimited data sources', 'Unlimited queries', 'Scheduled reports', 'Anomaly alerts', 'API access'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For enterprise analytics.', features: ['Unlimited users', 'Custom AI models', 'Embedded analytics', 'SSO + RBAC', 'Dedicated support', 'On-premise option'], badge: 'Full Suite', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'selfserve', name: 'Self-Service BI', description: 'Allow anyone on your team to query data naturally.', icon: MessageSquare, badge: 'Quick Start' },
            { id: 'embedded', name: 'Embedded Analytics', description: 'Embed analytics widgets directly in your product.', icon: Code },
            { id: 'executive', name: 'Executive Dashboards', description: 'KPI dashboards with automated storytelling.', icon: BarChart3 },
        ],
        reviews: [
            { id: 'r1', author: 'Lisa Park', role: 'Head of Analytics', company: 'RetailGen', rating: 5, text: 'Our marketing team went from submitting data requests to answering their own questions. The NLP accuracy is remarkable.', date: '2026-03-12', avatar: '/testi2.png' },
        ],
        relatedProducts: [
            { id: 'web-scraping', name: 'Web Scraping & Monitoring', tagline: 'Competitive intelligence, automated', icon: Globe, slug: 'web-scraping' },
            { id: 'crm-automation', name: 'CRM Automation', tagline: 'Auto-manage your sales pipeline', icon: Database, slug: 'crm-automation' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   05 · CONTENT AUTOMATION
   ──────────────────────────────────────────────────────────────────────────── */

    'content-generation': {
        id: 'content-generation',
        slug: 'content-generation',
        tagline: 'SCALE YOUR CONTENT',
        title: 'Content Generation Agent',
        subtitle: 'Thousands of Pages — In Your Brand Voice',
        description: 'AI writing agents that produce product listings, blog posts, social content, and marketing copy at scale — all in your brand voice. Generate 1,000 SEO-optimized descriptions from a single CSV.',
        badge: 'AI Content at Scale',
        heroImage: '/images/vas_tech_enterprise.png',
        statistics: [
            { value: '1000x', label: 'Content Output', icon: PenTool },
            { value: '85%', label: 'SEO Score Avg', icon: TrendingUp },
            { value: '40+', label: 'Languages', icon: Languages },
            { value: '95%', label: 'Brand Consistency', icon: Palette },
        ],
        process: [
            { step: '01', title: 'Set Brand Voice', description: 'Define tone, style guidelines, and key messaging.' },
            { step: '02', title: 'Input Data', description: 'Upload product data, topics, or content briefs.' },
            { step: '03', title: 'Generate & Review', description: 'AI generates content at scale — review and publish.' },
        ],
        features: [
            { title: 'Brand Voice Training', description: 'AI learns your unique tone, terminology, and style.', icon: Palette },
            { title: 'Bulk Generation', description: 'Create thousands of unique pieces from structured data.', icon: Layers },
            { title: 'Multi-Format', description: 'Blogs, product listings, social posts, ads, email copy.', icon: FileText },
            { title: 'Multi-Language', description: 'Generate and translate content in 40+ languages.', icon: Languages },
        ],
        benefits: [{ title: 'Scale Without Headcount', description: 'Produce 100x more content without hiring more writers.' }, { title: 'SEO Optimized', description: 'Every piece is optimized for search engines.' }],
        useCases: [
            { title: 'E-Commerce Listings', description: 'Generate unique product descriptions for thousands of SKUs.', icon: ShoppingCart },
            { title: 'Blog Content', description: 'Automated blog posts from content briefs and outlines.', icon: Newspaper },
            { title: 'Social Media', description: 'Platform-specific posts for LinkedIn, Twitter, Instagram.', icon: Share2 },
        ],
        faq: [
            { question: 'Will the content be unique?', answer: 'Yes. Each piece is generated uniquely — no templates or spin content. All content passes plagiarism checks.' },
            { question: 'Can it match our brand voice?', answer: 'Absolutely. We train the AI on your existing content to replicate your exact tone and style.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Content Platform', caption: 'Content generation platform with brand voice controls' },
        ],
        specifications: [
            { category: 'Generation', items: [{ label: 'Output Speed', value: '1,000+ pieces/hour' }, { label: 'Quality Score', value: '85%+ SEO, 95% readability' }, { label: 'Languages', value: '40+' }, { label: 'Formats', value: 'Blog, Product, Social, Ad, Email' }] },
            { category: 'AI Models', items: [{ label: 'Base Models', value: 'GPT-4o, Claude, Gemini' }, { label: 'Fine-tuning', value: 'Custom brand voice training' }, { label: 'Plagiarism', value: 'Built-in uniqueness checker' }, { label: 'Tone Control', value: 'Professional, Casual, Technical' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$299', period: '/month', description: 'For small content needs.', features: ['10,000 words/mo', '3 content types', 'Basic tone settings', 'CSV upload'], cta: 'Start Free Trial' },
            { name: 'Growth', price: '$899', period: '/month', description: 'For content-heavy businesses.', features: ['100,000 words/mo', 'All content types', 'Brand voice training', 'Multi-language', 'Bulk generation', 'API access'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'Unlimited content at scale.', features: ['Unlimited words', 'Custom AI models', 'White-label', 'Dedicated support', 'CMS integration', 'SLA guarantee'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'product', name: 'Product Content', description: 'Generate product descriptions, specs, and comparison content.', icon: ShoppingCart, badge: 'E-Commerce' },
            { id: 'blog', name: 'Blog & Articles', description: 'Long-form content from briefs with SEO optimization.', icon: Newspaper },
            { id: 'social', name: 'Social & Ads', description: 'Platform-specific social posts and ad copy.', icon: Share2 },
        ],
        reviews: [
            { id: 'r1', author: 'Jen Williams', role: 'Content Director', company: 'MegaShop Co', rating: 5, text: 'We generated 5,000 product descriptions in one weekend. That would have taken our team 6 months. Quality is excellent.', date: '2026-03-08', avatar: '/testi3.png' },
        ],
        relatedProducts: [
            { id: 'seo-automation', name: 'SEO Automation Agent', tagline: 'Keyword research to published article in 24h', icon: Search, slug: 'seo-automation' },
            { id: 'email-automation', name: 'Email Automation', tagline: 'AI that reads, drafts, and sends emails', icon: Mail, slug: 'email-automation' },
        ],
    },

    'seo-automation': {
        id: 'seo-automation',
        slug: 'seo-automation',
        tagline: 'DOMINATE SEARCH',
        title: 'SEO Automation Agent',
        subtitle: 'From Keyword to Published Article — In 24 Hours',
        description: 'Automated keyword research, content briefs, on-page audits, and programmatic page generation. Full SEO pipeline from keyword discovery to published article in under 24 hours.',
        badge: 'White-Label SEO AI',
        heroImage: '/images/vas_tech_hero.png',
        statistics: [
            { value: '300%', label: 'Organic Traffic Growth', icon: TrendingUp },
            { value: '24h', label: 'Keyword to Article', icon: Clock },
            { value: '50K+', label: 'Keywords Tracked', icon: Search },
            { value: '90+', label: 'Avg SEO Score', icon: Target },
        ],
        process: [
            { step: '01', title: 'Research', description: 'AI discovers high-value keywords with low competition.' },
            { step: '02', title: 'Generate', description: 'Automated content briefs and article generation.' },
            { step: '03', title: 'Optimize & Publish', description: 'On-page optimization and direct CMS publishing.' },
        ],
        features: [
            { title: 'Keyword Discovery', description: 'Find high-value, low-competition keywords automatically.', icon: Search },
            { title: 'Content Briefs', description: 'Automated briefs with SERP analysis and competitor insights.', icon: FileSearch },
            { title: 'On-Page Audits', description: 'Real-time SEO scoring with actionable recommendations.', icon: CheckCircle },
            { title: 'Programmatic Pages', description: 'Generate thousands of location or product SEO pages.', icon: Globe },
        ],
        benefits: [{ title: 'White-Label Ready', description: 'Offer SEO services to clients under your brand.' }, { title: 'Scale SEO', description: 'Produce 10x more optimized content.' }],
        useCases: [
            { title: 'Digital Agencies', description: 'White-label SEO for client portfolios.', icon: Users },
            { title: 'E-Commerce', description: 'Programmatic category and product SEO pages.', icon: ShoppingCart },
            { title: 'Local Business', description: 'Location-based SEO pages for multi-location businesses.', icon: Globe },
        ],
        faq: [
            { question: 'Can I white-label this for clients?', answer: 'Yes, our agency plan includes full white-label capabilities with your branding.' },
            { question: 'Does it integrate with WordPress?', answer: 'Yes, direct publishing to WordPress, Shopify, and other CMS platforms.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_hero.png', alt: 'SEO Dashboard', caption: 'SEO automation and keyword tracking dashboard' },
        ],
        specifications: [
            { category: 'SEO Engine', items: [{ label: 'Keywords Tracked', value: '50,000+' }, { label: 'SERP Analysis', value: 'Top 100 results' }, { label: 'Content Scoring', value: 'Real-time SEO score' }, { label: 'Publishing', value: 'WordPress, Shopify, API' }] },
            { category: 'Content', items: [{ label: 'Article Length', value: '500-5,000 words' }, { label: 'Languages', value: '15+ supported' }, { label: 'Programmatic Pages', value: 'Unlimited templates' }, { label: 'Brief Generation', value: 'Automated from SERP data' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$399', period: '/month', description: 'For small SEO needs.', features: ['1,000 keywords tracked', '10 articles/mo', 'Basic audits', 'CSV export'], cta: 'Start Free Trial' },
            { name: 'Agency', price: '$1,299', period: '/month', description: 'For agencies and content teams.', features: ['10,000 keywords', '50 articles/mo', 'Advanced audits', 'White-label', 'CMS publishing', 'Programmatic pages'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For large-scale SEO operations.', features: ['Unlimited keywords', 'Unlimited articles', 'Custom AI models', 'Priority support', 'API access', 'Multi-domain'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'content', name: 'Content SEO', description: 'Keyword research + article generation pipeline.', icon: PenTool, badge: 'Core' },
            { id: 'technical', name: 'Technical SEO', description: 'Site audits, schema markup, and Core Web Vitals.', icon: Code },
            { id: 'programmatic', name: 'Programmatic SEO', description: 'Generate thousands of targeted landing pages.', icon: Globe },
        ],
        reviews: [
            { id: 'r1', author: 'Amanda Foster', role: 'Agency Owner', company: 'Rank Digital', rating: 5, text: 'We white-label this for 20+ clients. From keyword to published article in 24 hours is a reality now. Clients love the speed.', date: '2026-03-01', avatar: '/testi5.png' },
        ],
        relatedProducts: [
            { id: 'content-generation', name: 'Content Generation Agent', tagline: 'AI content at scale in your brand voice', icon: PenTool, slug: 'content-generation' },
            { id: 'web-scraping', name: 'Web Scraping & Monitoring', tagline: 'Competitive intelligence, automated', icon: Globe, slug: 'web-scraping' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   06 · HR & INTERNAL TOOLS
   ──────────────────────────────────────────────────────────────────────────── */

    'hr-onboarding': {
        id: 'hr-onboarding',
        slug: 'hr-onboarding',
        tagline: 'ONBOARDING ON AUTOPILOT',
        title: 'HR Onboarding Agent',
        subtitle: 'Day 1 to Day 30, Fully Automated',
        description: 'Automate offer letters, document generation, and onboarding checklists. New hires get a seamless experience while managers get a real-time progress dashboard.',
        badge: 'HR Automation',
        heroImage: '/enterprise_ai_suite.png',
        statistics: [
            { value: '80%', label: 'Less Admin Time', icon: Clock },
            { value: 'Day 1', label: 'Ready from Start', icon: Zap },
            { value: '95%', label: 'Employee Satisfaction', icon: Users },
            { value: '0', label: 'Missed Steps', icon: CheckCircle },
        ],
        process: [
            { step: '01', title: 'New Hire Added', description: 'HR adds new hire to the system with basic info.' },
            { step: '02', title: 'Auto-Generate', description: 'Offer letter, contracts, and checklists created instantly.' },
            { step: '03', title: 'Track & Complete', description: 'New hire and manager follow guided onboarding steps.' },
        ],
        features: [
            { title: 'Document Generation', description: 'Auto-generate offer letters, NDAs, and contracts from templates.', icon: FileText },
            { title: 'Onboarding Checklists', description: 'Step-by-step guided checklists for new hires and managers.', icon: CheckCircle },
            { title: 'Progress Dashboard', description: 'Real-time view of every new hire\'s onboarding status.', icon: BarChart3 },
            { title: 'Integration Ready', description: 'Connect with HRIS, payroll, and IT provisioning systems.', icon: Link2 },
        ],
        benefits: [{ title: 'Consistent Experience', description: 'Every new hire gets the same excellent onboarding.' }, { title: 'Compliance', description: 'Never miss a required document or step.' }],
        useCases: [
            { title: 'Growing Startups', description: 'Scale hiring without scaling HR headcount.', icon: TrendingUp },
            { title: 'Multi-Location', description: 'Standardize onboarding across offices and regions.', icon: Globe },
            { title: 'Remote Teams', description: 'Virtual onboarding with digital document signing.', icon: MonitorSmartphone },
        ],
        faq: [
            { question: 'Does it handle e-signatures?', answer: 'Yes, integrated with DocuSign and HelloSign for digital document signing.' },
            { question: 'Can we customize the checklists?', answer: 'Absolutely. Create department-specific, role-specific, or location-specific checklists.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'HR Dashboard', caption: 'Onboarding progress tracking dashboard' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Checklist View', caption: 'Guided onboarding checklists for new hires' },
        ],
        specifications: [
            { category: 'HR Features', items: [{ label: 'Document Templates', value: 'Unlimited custom templates' }, { label: 'E-Signatures', value: 'DocuSign, HelloSign' }, { label: 'Checklists', value: 'Role, dept, location-based' }, { label: 'Progress Tracking', value: 'Real-time dashboard' }] },
            { category: 'Integration', items: [{ label: 'HRIS', value: 'BambooHR, Workday, Gusto' }, { label: 'Payroll', value: 'ADP, Gusto, Paychex' }, { label: 'IT Provisioning', value: 'Okta, Google Workspace' }, { label: 'Communication', value: 'Slack, Teams, Email' }] },
        ],
        pricing: [
            { name: 'Starter', price: '$299', period: '/month', description: 'For small teams.', features: ['Up to 10 hires/mo', 'Basic templates', 'Email notifications', 'Progress dashboard'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$799', period: '/month', description: 'For growing companies.', features: ['Up to 50 hires/mo', 'Custom templates', 'E-signatures', 'HRIS integration', 'Multi-location', 'Priority support'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For large organizations.', features: ['Unlimited hires', 'Custom workflows', 'Full HRIS integration', 'SSO + RBAC', 'Dedicated CSM', 'On-premise option'], badge: 'Full Scale', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'basic', name: 'Quick Start', description: 'Document generation + basic checklists for fast deployment.', icon: Zap, badge: 'Quick Start' },
            { id: 'full', name: 'Full Onboarding', description: 'Complete Day 1-30 onboarding with HRIS integration.', icon: Users },
            { id: 'enterprise', name: 'Enterprise HR', description: 'Multi-location, multi-department with full compliance.', icon: Shield },
        ],
        reviews: [
            { id: 'r1', author: 'Karen Mitchell', role: 'HR Director', company: 'TechCorp Solutions', rating: 5, text: 'We hire 30+ people a month. This tool eliminated 80% of administrative busywork. Managers love the progress dashboard.', date: '2026-02-15', avatar: '/testi1.png' },
        ],
        relatedProducts: [
            { id: 'knowledge-bot', name: 'Internal Knowledge Bot', tagline: 'AI trained on your SOPs and docs', icon: Brain, slug: 'knowledge-bot' },
            { id: 'workflow-builder', name: 'Workflow Builder', tagline: 'No-code automation for everything', icon: Workflow, slug: 'workflow-builder' },
        ],
    },

    'knowledge-bot': {
        id: 'knowledge-bot',
        slug: 'knowledge-bot',
        tagline: 'YOUR COMPANY BRAIN',
        title: 'Internal Knowledge Bot',
        subtitle: 'Instant Answers from Your SOPs & Docs',
        description: 'An AI assistant trained on your SOPs, wikis, policies, and internal docs. Staff get instant answers to HR policy queries, compliance FAQs, and SOP lookups — 24/7.',
        badge: 'Enterprise RAG',
        heroImage: '/images/vas_tech_chatbot.png',
        statistics: [
            { value: '70%', label: 'Less HR Queries', icon: Headset },
            { value: 'Instant', label: 'Response Time', icon: Zap },
            { value: '99%', label: 'Answer Accuracy', icon: Target },
            { value: '12-18mo', label: 'Typical Contract', icon: Calendar },
        ],
        process: [
            { step: '01', title: 'Upload Docs', description: 'Feed in SOPs, handbooks, wikis, and policy documents.' },
            { step: '02', title: 'AI Indexes', description: 'RAG pipeline indexes and understands your entire knowledge base.' },
            { step: '03', title: 'Deploy', description: 'Embed in Slack, Teams, or your intranet for instant access.' },
        ],
        features: [
            { title: 'RAG Architecture', description: 'Retrieval-Augmented Generation for accurate, sourced answers.', icon: Brain },
            { title: 'Source Citations', description: 'Every answer includes the exact document and section reference.', icon: BookOpen },
            { title: 'Multi-Channel', description: 'Available in Slack, Teams, web widget, and email.', icon: Share2 },
            { title: 'Auto-Updates', description: 'Knowledge base stays current as you update documents.', icon: RefreshCw },
        ],
        benefits: [{ title: 'Reduce HR Load', description: 'Employees self-serve answers 24/7.' }, { title: 'Recurring Revenue', description: 'Typically wins 12-18 month enterprise contracts.' }],
        useCases: [
            { title: 'HR Policies', description: 'Leave policies, benefits, expenses — answered instantly.', icon: UserCheck },
            { title: 'Compliance', description: 'Regulatory FAQs and compliance procedures on demand.', icon: Shield },
            { title: 'IT Support', description: 'Troubleshooting guides and setup instructions.', icon: Cpu },
        ],
        faq: [
            { question: 'How accurate are the answers?', answer: 'Our RAG pipeline achieves 99%+ accuracy by grounding every answer in your actual documents.' },
            { question: 'Can it handle confidential documents?', answer: 'Yes, with role-based access controls and enterprise-grade encryption.' },
        ],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_chatbot.png', alt: 'Knowledge Bot Interface', caption: 'Internal knowledge bot with source citations' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Analytics', caption: 'Usage analytics and knowledge gap reporting' },
        ],
        specifications: [
            { category: 'AI Engine', items: [{ label: 'Architecture', value: 'RAG (Retrieval-Augmented)' }, { label: 'Accuracy', value: '99%+ with source citations' }, { label: 'Models', value: 'GPT-4o, Claude, Gemini' }, { label: 'Context Window', value: '128K tokens' }] },
            { category: 'Knowledge Base', items: [{ label: 'Documents', value: 'PDF, DOCX, Wiki, Confluence' }, { label: 'Auto-sync', value: 'SharePoint, Google Drive, Notion' }, { label: 'Versioning', value: 'Automatic document versioning' }, { label: 'Access Control', value: 'Role-based (RBAC)' }] },
        ],
        pricing: [
            { name: 'Team', price: '$599', period: '/month', description: 'For small organizations.', features: ['Up to 50 users', '500 documents', 'Slack or Teams', 'Basic analytics', 'Email support'], cta: 'Start Free Trial' },
            { name: 'Business', price: '$1,499', period: '/month', description: 'For mid-size organizations.', features: ['Up to 500 users', 'Unlimited documents', 'Multi-channel deployment', 'Advanced analytics', 'RBAC', 'Priority support'], highlighted: true, badge: 'Most Popular', cta: 'Start Free Trial' },
            { name: 'Enterprise', price: 'Custom', description: 'For large enterprises.', features: ['Unlimited users', 'Custom AI training', 'On-premise deployment', 'SSO integration', 'Dedicated CSM', 'SLA guarantee'], badge: 'Enterprise', cta: 'Contact Sales' },
        ],
        variants: [
            { id: 'hr', name: 'HR Knowledge', description: 'Focused on HR policies, benefits, and employee handbook.', icon: UserCheck, badge: 'Most Popular' },
            { id: 'it', name: 'IT Helpdesk', description: 'IT troubleshooting, setup guides, and procedures.', icon: Cpu },
            { id: 'full', name: 'Full Enterprise', description: 'All departments — HR, IT, Legal, Operations, Finance.', icon: Brain },
        ],
        reviews: [
            { id: 'r1', author: 'Raymond Yu', role: 'CIO', company: 'GlobalTech Holdings', rating: 5, text: 'Deployed across 3,000 employees. HR query volume dropped 70% in the first quarter. The ROI was massive — we signed an 18-month contract immediately.', date: '2026-03-10', avatar: '/testi4.jpg' },
        ],
        relatedProducts: [
            { id: 'hr-onboarding', name: 'HR Onboarding Agent', tagline: 'Day 1-30 onboarding on autopilot', icon: UserCheck, slug: 'hr-onboarding' },
            { id: 'ai-chatbot', name: 'Website Chatbot', tagline: 'AI assistant on your website', icon: Bot, slug: 'ai-chatbot' },
        ],
    },

/* ────────────────────────────────────────────────────────────────────────────
   GENERIC FALLBACK
   ──────────────────────────────────────────────────────────────────────────── */

    'generic': {
        id: 'generic',
        slug: 'generic',
        tagline: 'ENTERPRISE SOLUTIONS',
        title: 'Enterprise AI Suite',
        subtitle: 'Scalable Intelligence for Business',
        description: 'Leverage our full suite of AI tools to modernize your entire operation. From ERP automation to predictive analytics, we build the future of your business.',
        badge: 'Enterprise Grade',
        heroImage: '/enterprise_ai_suite.png',
        statistics: [
            { value: '100%', label: 'Efficiency Gains', icon: Settings, breakdown: [{ value: 65, label: 'Efficiency' }, { value: 25, label: 'Growth' }, { value: 10, label: 'Sustainability' }] },
            { value: '99%+', label: 'Uptime SLA', icon: Server, breakdown: [{ value: 90, label: 'Availability' }, { value: 8, label: 'Redundancy' }, { value: 2, label: 'Recovery' }] },
            { value: '60%', label: 'Cost Reduction', icon: BarChart },
            { value: '3x', label: 'Faster Deployment', icon: Zap, breakdown: [{ value: 50, label: 'Automation' }, { value: 30, label: 'CI/CD Pipeline' }, { value: 20, label: 'Testing' }] },
        ],
        process: [
            { step: '01', title: 'Consult', description: 'We analyze your current infrastructure.' },
            { step: '02', title: 'Architect', description: 'Design a custom AI solution.' },
            { step: '03', title: 'Execute', description: 'Agile implementation and training.' },
        ],
        features: [
            { title: 'Security First', description: 'ISO 27001 Certified architecture.', icon: Shield },
            { title: 'Scalable', description: 'Built to handle enterprise-level loads.', icon: Database },
            { title: 'Custom LLMs', description: 'Fine-tune models on your proprietary data.', icon: Brain },
            { title: 'Real-time Analytics', description: 'Track performance with live dashboards and insights.', icon: BarChart },
            { title: 'Seamless Integration', description: 'Connect with your existing tools via REST APIs.', icon: Settings },
            { title: 'Global Reach', description: 'Multi-language support with 40+ locales.', icon: Globe },
        ],
        benefits: [{ title: 'Future Proof', description: 'Stay ahead of the technology curve.' }],
        useCases: [],
        faq: [],
        mediaGallery: [
            { type: 'image', src: '/images/vas_tech_enterprise.png', alt: 'Enterprise AI Suite', caption: 'Full-stack AI platform for enterprise operations' },
            { type: 'image', src: '/images/vas_tech_dashboard.png', alt: 'Dashboard', caption: 'Unified management dashboard' },
        ],
        specifications: [
            { category: 'Platform', items: [{ label: 'Deployment', value: 'Cloud, On-Premise, Hybrid' }, { label: 'Uptime', value: '99.95% SLA' }, { label: 'API Rate Limit', value: '10,000 req/min' }, { label: 'Regions', value: 'US, EU, APAC' }] },
        ],
        pricing: [
            { name: 'Custom', price: 'Contact Us', description: 'Enterprise solutions tailored to your scale and requirements.', features: ['Custom scope & pricing', 'Dedicated AI engineer', 'Full platform access', 'SLA guarantee', 'On-premise option'], highlighted: true, cta: 'Contact Sales' },
        ],
        variants: [],
        reviews: [],
        relatedProducts: [
            { id: 'ai-chatbot', name: 'Website Chatbot', tagline: 'AI assistant on your website', icon: Bot, slug: 'ai-chatbot' },
            { id: 'ai-calling-agent', name: 'AI Calling Agent', tagline: 'Human-like voice interactions at scale', icon: Phone, slug: 'ai-calling-agent' },
            { id: 'whatsapp-bot', name: 'WhatsApp Bot', tagline: 'Turn conversations into revenue', icon: MessageSquare, slug: 'whatsapp-bot' },
        ],
    },
};

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
export const getProductBySlug = (slug: string): ProductData | null => {
    return PRODUCT_DATA[slug] || null;
};

export const getAllProductSlugs = (): string[] => {
    return Object.keys(PRODUCT_DATA).filter(k => k !== 'generic');
};
