export const NAV_ITEMS = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Experience', href: '/experience' },
    {
        label: 'Products',
        href: '/products',
        megaMenu: [
            {
                title: 'Communication Automation',
                number: '01',
                items: [
                    { name: 'AI Calling Agent', href: '/products', desc: 'Outbound & inbound voice AI for reminders and queries.', icon: 'Phone' },
                    { name: 'WhatsApp Bot', href: '/products', desc: 'Automated conversational flows on WhatsApp Business API.', icon: 'MessageSquare' },
                    { name: 'Website Chatbot', href: '/products', desc: 'Embedded AI assistant trained on your docs & FAQs.', icon: 'Bot' },
                    { name: 'Email Automation Agent', href: '/products', desc: 'AI that reads, drafts, and sends emails automatically.', icon: 'Mail' },
                ],
            },
            {
                title: 'Sales & CRM Automation',
                number: '02',
                items: [
                    { name: 'Lead Generation Agent', href: '/products', desc: 'Scrapes, qualifies, and enriches leads automatically.', icon: 'Users' },
                    { name: 'CRM Automation', href: '/products', desc: 'Auto-log calls, score leads, trigger deal workflows.', icon: 'Database' },
                ],
            },
            {
                title: 'Operations Automation',
                number: '03',
                items: [
                    { name: 'Invoice & Document AI', href: '/products', desc: 'Extract and process invoices, POs, and contracts.', icon: 'FileText' },
                    { name: 'Workflow Builder (n8n/Make)', href: '/products', desc: 'Connect 100s of apps in custom no-code flows.', icon: 'Workflow' },
                ],
            },
            {
                title: 'Data & Intelligence',
                number: '04',
                items: [
                    { name: 'Web Scraping & Monitoring', href: '/products', desc: 'Competitor tracking and structured data output.', icon: 'Globe' },
                    { name: 'AI Analytics Dashboard', href: '/products', desc: 'Natural language queries over your business data.', icon: 'BarChart3' },
                ],
            },
            {
                title: 'Content Automation',
                number: '05',
                items: [
                    { name: 'Content Generation Agent', href: '/products', desc: 'Bulk product descriptions, blogs, and social posts.', icon: 'PenTool' },
                    { name: 'SEO Automation Agent', href: '/products', desc: 'Keyword research, audits, and programmatic pages.', icon: 'Search' },
                ],
            },
            {
                title: 'HR & Internal Tools',
                number: '06',
                items: [
                    { name: 'HR Onboarding Agent', href: '/products', desc: 'Automate offer letters and onboarding checklists.', icon: 'UserCheck' },
                    { name: 'Internal Knowledge Bot', href: '/products', desc: 'AI trained on your SOPs, wikis, and internal docs.', icon: 'Brain' },
                ],
            },
        ],
    },
    {
        label: 'Solutions',
        href: '/solutions',
        megaMenu: [
            {
                title: 'By Industry',
                items: [
                    { name: 'AI for Sales', href: '/solutions/sales', desc: 'Lead gen, CRM automation, and calling to close deals.', icon: 'TrendingUp' },
                    { name: 'AI for Support', href: '/solutions/support', desc: '24/7 customer service across WhatsApp, chat & voice.', icon: 'Headset' },
                    { name: 'AI for E-Commerce', href: '/solutions/ecommerce', desc: 'Cart recovery, content generation, competitor tracking.', icon: 'ShoppingCart' },
                    { name: 'AI for ERP', href: '/solutions/erp', desc: 'Invoice AI, workflow builder, and internal knowledge bots.', icon: 'Server' },
                ],
            },
        ],
    },
    { label: 'Contact', href: '/contact' },
    { label: 'Resources', href: '/resources' },
];

export const COMPANY_INFO = {
    name: 'VAS Tech',
    address: 'McNicholl Circle, St Catharines, Ontario L2N 7C5',
    contact: 'contact@vastech.com',
    socials: {
        linkedin: 'https://www.linkedin.com/company/vastech/',
        instagram: 'https://www.instagram.com/vastechai?igsh=bndyYWZ1NTA4NWR1',
    }
};
