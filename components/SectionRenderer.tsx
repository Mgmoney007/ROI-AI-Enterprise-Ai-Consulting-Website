
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Section, SectionType } from '../types';
import { Zap, Target, Layers, ArrowRight, CheckCircle2, Linkedin, Twitter, Quote, Shield } from 'lucide-react';
import { motion, useInView } from 'motion/react';

interface Props {
  section: Section;
}

const AnimatedCounter = ({ value }: { value: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState("1");

  useEffect(() => {
    if (!isInView) return;

    const match = value.match(/^([^0-9]*)([0-9.,]+)([^0-9]*)$/);
    if (!match) {
      setCount(value);
      return;
    }

    const prefix = match[1];
    const numStr = match[2].replace(/,/g, '');
    const suffix = match[3];
    const targetNum = parseFloat(numStr);

    if (isNaN(targetNum)) {
      setCount(value);
      return;
    }

    const duration = 2000;
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentNum = 1 + (targetNum - 1) * easeProgress;
      
      let formattedNum;
      if (numStr.includes('.')) {
        const decimals = numStr.split('.')[1].length;
        formattedNum = currentNum.toFixed(decimals);
      } else {
        formattedNum = Math.round(currentNum).toLocaleString();
      }

      setCount(`${prefix}${formattedNum}${suffix}`);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(value);
      }
    }, 1000 / fps);

    return () => clearInterval(counter);
  }, [isInView, value]);

  return <span ref={ref}>{count}</span>;
};

const BenefitCard = ({ icon: Icon, title, description, label }: { icon: any, title: string, description: string, label: string }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div 
      onClick={() => {
        setIsPressed(true);
        setTimeout(() => setIsPressed(false), 1000);
      }}
      className="relative glass p-8 rounded-[2rem] text-left group cursor-pointer overflow-hidden transition-all duration-500 hover:border-blue-500/40 hover:-translate-y-1 shadow-2xl shadow-transparent hover:shadow-blue-500/5"
    >
      {/* Glowing Orb */}
      <div 
        className={`absolute pointer-events-none transition-all duration-1000 ease-out bg-blue-500/20 blur-[80px] rounded-full w-64 h-64 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${isPressed ? 'scale-150 opacity-100' : 'scale-0 opacity-0'}`}
      />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-blue-500/15 group-hover:border-blue-500/30 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-500">
            <Icon className="w-6 h-6 group-hover:animate-pulse" />
          </div>
          <span className="text-[10px] font-mono font-black text-gray-600 tracking-[0.2em] uppercase group-hover:text-blue-500/50 transition-colors">
            {label}
          </span>
        </div>
        
        <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {description}
        </p>
      </div>
    </div>
  );
};

const SectionRenderer: React.FC<Props> = ({ section }) => {
  if (!section.enabled) return null;

  switch (section.type) {
    case SectionType.Hero:
      const isMission = section.content?.isMission;
      const ctaLink = section.cta?.href?.startsWith('#/') ? section.cta.href.substring(1) : section.cta?.href;
      const [scrollY, setScrollY] = useState(0);

      useEffect(() => {
        const handleScroll = () => {
          setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);
      
      return (
        <section id={section.id} className="relative pt-48 pb-32 px-6 overflow-hidden min-h-[70vh] flex items-center justify-center">
          {/* Hero Background Image for Mission States */}
          {isMission && section.content?.image && (
            <div className="absolute inset-0 z-0 overflow-hidden">
               <img 
                 src={`${section.content.image}&w=1920&q=60&auto=format&fit=crop`} 
                 className="w-full h-[120%] object-cover opacity-20" 
                 style={{ transform: `translateY(${scrollY * 0.3 - 50}px)` }}
                 alt="Mission Background" 
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#030303]/50 to-[#030303]"></div>
            </div>
          )}

          {/* Energy Beams */}
          {!isMission && (
            <>
              <div className="beam left-[20%] opacity-20"></div>
              <div className="beam right-[15%] opacity-10" style={{ animationDelay: '2s' }}></div>
              <div className="beam left-[50%] opacity-15" style={{ animationDelay: '4s' }}></div>
            </>
          )}

          <div className="max-w-7xl mx-auto text-center relative z-10">
            {isMission ? (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest font-black mb-8">
                <Quote className="w-3 h-3" />
                Mission Statement
              </div>
            ) : (
              section.subtitle && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-8 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                  {section.content?.tagline || 'Strategic AI Implementation'}
                </div>
              )
            )}
            
            <h1 className={`${isMission ? 'text-4xl md:text-7xl' : 'text-5xl md:text-8xl'} font-black tracking-tight leading-[1.1] mb-8 hero-title`}>
              {section.content?.highlightLastWords ? (
                <>
                  <span className="text-white">{section.title?.split(' ').slice(0, -section.content.highlightLastWords).join(' ')} </span>
                  <span className="animate-gradient-text">{section.title?.split(' ').slice(-section.content.highlightLastWords).join(' ')}</span>
                </>
              ) : (
                <span className="text-gradient">{section.title}</span>
              )}
            </h1>
            
            <p className={`${isMission ? 'text-xl md:text-3xl text-white font-medium italic' : 'text-lg md:text-xl text-gray-400'} max-w-4xl mx-auto leading-relaxed mb-10`}>
              {section.subtitle}
            </p>
            
            {section.cta && (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to={ctaLink || '/'} className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-black rounded-full hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-500/20 text-center">
                  {section.cta.label}
                </Link>
                <Link to="/services" className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/10 text-white font-bold rounded-full hover:bg-white/5 transition-all text-center">
                  See How It Works
                </Link>
              </div>
            )}

            {!isMission && (
              <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <BenefitCard 
                  icon={Zap} 
                  label="Efficiency"
                  title="Operational Speed" 
                  description="Automate repetitive workflows to reclaim 20+ hours per week for your core team." 
                />
                <BenefitCard 
                  icon={Shield} 
                  label="Security"
                  title="Enterprise Safety" 
                  description="Proprietary guardrails ensure your data stays private and never trains public models." 
                />
                <BenefitCard 
                  icon={Target} 
                  label="Impact"
                  title="Measurable ROI" 
                  description="Every implementation is tied to a specific KPI, from cost reduction to output volume." 
                />
              </div>
            )}

            {section.content?.image && !isMission && (
              <div className="mt-20 relative group">
                <div className="absolute inset-0 bg-blue-600/20 blur-[120px] rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <img 
                  src={`${section.content.image}&w=1200&q=60&auto=format&fit=crop`} 
                  alt="Hero Visual" 
                  className="relative z-10 w-full max-w-5xl mx-auto rounded-3xl border border-white/10 glass animate-float shadow-2xl shadow-blue-500/10"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {!section.content?.image && !isMission && (
              <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
                {['Logo 1', 'Logo 2', 'Logo 3', 'Logo 4'].map(l => (
                  <div key={l} className="h-12 glass rounded-lg flex items-center justify-center text-[10px] font-mono tracking-widest text-white/40 uppercase">{l}</div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

    case SectionType.TeamGrid:
      return (
        <section id={section.id} className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{section.title}</h2>
              <p className="text-gray-400 max-w-xl mx-auto">{section.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.content?.members?.map((member: any, i: number) => (
                <div key={i} className="glass rounded-3xl p-8 hover:border-pink-500/30 transition-all group overflow-hidden">
                  <div className="relative mb-8 overflow-hidden rounded-2xl aspect-square">
                    <img 
                      src={`${member.image}&w=600&q=60&auto=format&fit=crop`} 
                      alt={member.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                       <a href="#" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                         <Linkedin className="w-4 h-4" />
                       </a>
                       <a href="#" className="w-8 h-8 rounded-lg bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                         <Twitter className="w-4 h-4" />
                       </a>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-1">{member.name}</h4>
                  <p className="text-pink-400 text-xs font-mono uppercase tracking-widest font-bold mb-4">{member.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case SectionType.TrustStrip:
      return (
        <section id={section.id} className="py-12 border-y border-white/5 bg-white/[0.01] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {section.content?.map((item: any, i: number) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="text-center group"
              >
                <div className="text-3xl font-black text-white mb-1 group-hover:text-emerald-400 transition-colors">
                  <AnimatedCounter value={item.value} />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </section>
      );

    case SectionType.ServicesGrid:
      return (
        <section id={section.id} className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                Expertise
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Enterprise-grade <span className="text-blue-500">AI capabilities.</span></h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg mb-8">We don't just recommend tools. We build the architecture that runs your business.</p>
              <Link to="/services" className="inline-flex items-center gap-2 text-sm font-bold text-white group hover:text-blue-400 transition-colors">
                All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <Target className="w-6 h-6" />, title: 'AI Strategy', desc: 'Identify high-impact opportunities and model ROI before building.' },
                { icon: <Zap className="w-6 h-6" />, title: 'Custom Automation', desc: 'Production-ready workflows that bridge the gap between tools.' },
                { icon: <Layers className="w-6 h-6" />, title: 'Internal Systems', desc: 'Custom RAG knowledge bases and executive dashboards for visibility.' }
              ].map((s, i) => (
                <div key={i} className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    {s.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-3">
                    {['Strategic Alignment', 'Custom Built', '24/7 Support'].map(t => (
                      <li key={t} className="flex items-center gap-2 text-xs text-gray-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case SectionType.ProcessSteps:
      return (
        <section id={section.id} className="py-32 px-6 bg-[#080808] relative overflow-hidden">
          {/* Background Accent */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                30-Day Implementation
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Our Delivery <span className="text-emerald-500">Protocol</span></h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">From diagnosis to deployment in under 30 days.</p>
            </div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent md:-translate-x-1/2"></div>
              
              <div className="space-y-24">
                {section.content?.map((s: any, i: number) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-6 md:left-1/2 w-12 h-12 rounded-full bg-[#030303] border-2 border-emerald-500/30 flex items-center justify-center z-20 md:-translate-x-1/2 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <span className="text-xs font-mono font-black text-emerald-400">{s.step}</span>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 pl-20 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-24' : 'md:text-left md:pl-24'}`}>
                      <div className="glass p-8 rounded-[2.5rem] border-white/5 hover:border-emerald-500/30 transition-all group">
                        <h4 className="text-2xl font-black text-white mb-4 group-hover:text-emerald-400 transition-colors">{s.title}</h4>
                        <p className="text-gray-400 leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">{s.desc}</p>
                      </div>
                    </div>

                    {/* Spacer for the other side on desktop */}
                    <div className="hidden md:block flex-1"></div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-24 text-center"
              >
                <Link 
                  to="/book" 
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-lg font-black rounded-2xl shadow-2xl shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Get a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      );

    case SectionType.FAQ:
      return (
        <section id={section.id} className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16 text-center">Frequently Asked</h2>
            <div className="space-y-4">
              {section.content?.map((item: any, i: number) => (
                <details key={i} className="group glass rounded-2xl overflow-hidden cursor-pointer">
                  <summary className="p-6 flex items-center justify-between font-bold text-white group-open:text-pink-400 transition-colors">
                    {item.q}
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </summary>
                  <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
};

export default SectionRenderer;
