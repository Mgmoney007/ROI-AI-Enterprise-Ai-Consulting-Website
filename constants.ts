
import { SectionType, Service, BlogPost } from './types';

export const INITIAL_SECTIONS = [
  {
    id: 'hero-1',
    type: SectionType.Hero,
    enabled: true,
    title: 'Replace Uncertainty With Financial Clarity',
    subtitle: 'ROI-AI designs and deploys automation systems that remove busywork, tighten execution, and unlock measurable ROI—without disrupting how your team works.',
    cta: { label: 'Get a Free Consultation', href: '#/book', variant: 'primary' },
    content: {
      highlightLastWords: 2,
      tagline: 'Strategic AI Implementation'
    }
  },
  {
    id: 'trust-1',
    type: SectionType.TrustStrip,
    enabled: true,
    content: [
      { label: 'Automation Hours Saved', value: '2,400+' },
      { label: 'Annualized Impact', value: '$1.8M+' },
      { label: 'Workflows Deployed', value: '38+' },
      { label: 'Avg. Time-to-Value', value: '21 Days' }
    ]
  },
  {
    id: 'services-1',
    type: SectionType.ServicesGrid,
    enabled: true,
    title: 'Our Solutions',
    subtitle: 'Outcome-driven AI implementations designed for scale.'
  },
  {
    id: 'process-1',
    type: SectionType.ProcessSteps,
    enabled: true,
    title: 'How we work',
    content: [
      { step: '01', title: 'Diagnose', desc: 'Identify bottlenecks and model ROI potential.' },
      { step: '02', title: 'Design', desc: 'Architect workflow, data flows, and guardrails.' },
      { step: '03', title: 'Deploy', desc: 'Build, integrate, and train your team.' },
      { step: '04', title: 'Optimize', desc: 'Continuous monitoring and iterative improvements.' }
    ]
  },
  {
    id: 'faq-1',
    type: SectionType.FAQ,
    enabled: true,
    title: 'Common Questions',
    content: [
      { q: 'How quickly can we see results?', a: 'Typical production workflows are live within 21 to 35 days, with measurable ROI tracked from day one.' },
      { q: 'Do we need to switch our existing tools?', a: 'No. We integrate AI into your current stack—Slack, Salesforce, HubSpot, Notion, and more.' },
      { q: 'What about data security?', a: 'We implement enterprise-grade guardrails, ensuring your proprietary data never trains public models.' }
    ]
  }
];

export const SEED_SERVICES: Service[] = [
  {
    id: 's1',
    slug: 'custom-ai-automation',
    title: 'Custom AI Automation',
    description: 'Bespoke workflows that handle complex decision-making and data processing.',
    outcomes: ['Cut cycle time', 'Remove manual ops', 'Reduce errors'],
    deliverables: ['Workflow maps', 'Production automations', 'Runbooks'],
    pricing: 'From $12k',
    icon: 'Zap'
  },
  {
    id: 's2',
    slug: 'ai-strategy',
    title: 'AI Strategy & Roadmapping',
    description: 'High-level architectural planning to align AI initiatives with business goals.',
    outcomes: ['Clear ROI path', 'Risk mitigation', 'Executive alignment'],
    deliverables: ['3-Year Roadmap', 'Tool Audit', 'Pilot Plan'],
    pricing: 'From $8k',
    icon: 'Target'
  },
  {
    id: 's3',
    slug: 'internal-systems',
    title: 'Internal AI Systems',
    description: 'Custom internal tools that empower your team to work 10x faster.',
    outcomes: ['Scalability', 'Knowledge retention', 'Reduced onboarding'],
    deliverables: ['Custom Chatbots', 'Knowledge Bases', 'Team Training'],
    pricing: 'From $15k',
    icon: 'Layers'
  }
];

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'p1',
    slug: 'operators-guide-to-ai-roi',
    title: 'The Operator’s Guide to AI ROI (Without the Hype)',
    excerpt: 'How to separate high-value automation from shiny objects.',
    content: 'Full article content here...',
    author: 'Alex Rivers',
    date: 'Oct 12, 2023',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=800'
  },
  {
    id: 'p2',
    slug: 'future-of-automated-ops',
    title: 'The Future of Automated Operations',
    excerpt: 'Why the next decade of growth belongs to the lean, AI-enabled firm.',
    content: 'Full article content here...',
    author: 'Sam Chen',
    date: 'Nov 05, 2023',
    category: 'Insights',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=60&w=800'
  }
];
