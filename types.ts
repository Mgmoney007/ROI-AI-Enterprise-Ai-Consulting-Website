
export enum SectionType {
  Hero = 'Hero',
  TrustStrip = 'TrustStrip',
  ServicesGrid = 'ServicesGrid',
  ProcessSteps = 'ProcessSteps',
  Benefits = 'Benefits',
  VisualStory = 'VisualStory',
  Testimonials = 'Testimonials',
  FAQ = 'FAQ',
  CTA = 'CTA',
  BlogFeed = 'BlogFeed',
  TeamGrid = 'TeamGrid'
}

export interface CTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface Section {
  id: string;
  type: SectionType;
  enabled: boolean;
  title?: string;
  subtitle?: string;
  content?: any;
  cta?: CTA;
  theme?: 'dark' | 'glass' | 'accent';
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  outcomes: string[];
  deliverables: string[];
  pricing: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  roi: string;
  image: string;
  tags: string[];
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  status: 'new' | 'qualified' | 'contacted' | 'lost';
  createdAt: string;
}

export interface Booking {
  id: string;
  leadId: string;
  date: string;
  time: string;
  notes: string;
}
