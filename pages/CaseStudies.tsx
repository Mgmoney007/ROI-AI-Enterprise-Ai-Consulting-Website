
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { motion } from 'motion/react';
import { ArrowUpRight, Target, Zap, BarChart3 } from 'lucide-react';
import { CaseStudy } from '../types';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cs1',
    slug: 'techflow-ops-automation',
    client: 'TechFlow',
    industry: 'SaaS / Fintech',
    challenge: 'Manual processing of over 5,000 customer onboarding documents monthly, leading to a 4-day backlog and high error rates.',
    solution: 'Implemented a custom RAG (Retrieval-Augmented Generation) system integrated with their existing CRM to automatically extract, validate, and categorize document data.',
    roi: 'Reduced processing time from 4 days to 12 minutes. Saved $140k in annual operational costs. 0% data extraction error rate.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=60&w=800',
    tags: ['RAG', 'CRM Integration', 'Fintech']
  },
  {
    id: 'cs2',
    slug: 'global-logistics-ai',
    client: 'Global Logistics Co.',
    industry: 'Supply Chain',
    challenge: 'Inefficient route optimization and manual dispatching for a fleet of 200+ vehicles, resulting in excessive fuel costs and delayed deliveries.',
    solution: 'Developed a predictive AI model that analyzes real-time traffic, weather, and historical data to automate dispatching and optimize routes dynamically.',
    roi: '18% reduction in fuel consumption. 22% improvement in on-time delivery rates. Automated 95% of dispatching tasks.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=60&w=800',
    tags: ['Predictive AI', 'Logistics', 'Automation']
  },
  {
    id: 'cs3',
    slug: 'healthnexus-patient-triage',
    client: 'HealthNexus',
    industry: 'Healthcare',
    challenge: 'High volume of non-urgent patient inquiries overwhelming the support staff, leading to delayed responses for critical cases.',
    solution: 'Deployed a HIPAA-compliant medical triage AI assistant that accurately categorizes patient needs and provides immediate guidance for non-urgent issues.',
    roi: '65% reduction in support ticket volume. 40% faster response time for urgent cases. 92% patient satisfaction rate.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=60&w=800',
    tags: ['Healthcare AI', 'NLP', 'Triage']
  }
];

const CaseStudies: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
              Proven Outcomes
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter"
            >
              Case <span className="text-blue-500">Studies</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Real-world implementations of enterprise AI that deliver measurable operating leverage.
            </motion.p>
          </div>

          <div className="space-y-32">
            {CASE_STUDIES.map((study, i) => (
              <motion.div 
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Side */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                      <img 
                        src={`${study.image}&w=800&q=60&auto=format&fit=crop`} 
                        alt={study.client} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60"></div>
                      <div className="absolute bottom-8 left-8">
                        <div className="flex gap-2">
                          {study.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-mono font-black text-white bg-pink-600 px-3 py-1 rounded-full uppercase tracking-widest">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1">
                  <div className="mb-8">
                    <span className="text-pink-500 font-mono text-xs uppercase tracking-[0.3em] font-black mb-2 block">{study.industry}</span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">{study.client}</h2>
                  </div>

                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-blue-400">
                        <Target className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">The Challenge</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{study.challenge}</p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-blue-400">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-2">The Solution</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{study.solution}</p>
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-emerald-400 font-bold mb-2">Measurable ROI</h4>
                        <p className="text-white text-sm leading-relaxed font-medium">{study.roi}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <button className="group flex items-center gap-3 text-white font-black text-sm uppercase tracking-widest hover:text-blue-400 transition-colors">
                      Full Implementation Details
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32 text-center glass p-12 md:p-20 rounded-[3rem] border-white/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-emerald-600/10 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Ready to see these results in <span className="text-blue-500">your business?</span></h2>
              <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                Every enterprise is unique. Book a technical audit to identify your highest-leverage automation opportunities.
              </p>
              <Link 
                to="/book" 
                className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xl font-black rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
              >
                Get a Free Consultation
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudies;
