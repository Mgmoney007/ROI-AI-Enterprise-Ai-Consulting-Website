
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SEED_SERVICES } from '../constants';
import { CheckCircle2, ArrowRight, Zap, Target, Layers } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Zap: <Zap className="w-8 h-8" />,
  Target: <Target className="w-8 h-8" />,
  Layers: <Layers className="w-8 h-8" />
};

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303] overflow-x-hidden">
      <Navigation />
      <main className="pt-32 md:pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] uppercase tracking-[0.3em] font-black mb-6">Expertise</div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-none">Our <span className="text-gradient">Capabilities.</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
              We provide the architectural foundation and implementation muscle for the next generation of AI-enabled enterprises.
            </p>
          </div>

          <div className="space-y-12 md:space-y-24">
            {SEED_SERVICES.map((service, index) => (
              <div 
                key={service.id} 
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 md:gap-16 lg:gap-24 items-center glass p-8 md:p-16 lg:p-20 rounded-[3rem] border-white/5 relative overflow-hidden group`}
              >
                {/* Background Accent */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="flex-1 space-y-8 relative z-10 w-full">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {iconMap[service.icon] || <Zap />}
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">{service.title}</h2>
                    <p className="text-gray-400 leading-relaxed text-lg md:text-xl">{service.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 pt-4">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-6">Strategic Outcomes</h4>
                      <ul className="space-y-4">
                        {service.outcomes.map(outcome => (
                          <li key={outcome} className="flex items-start gap-3 text-sm text-gray-300 font-medium">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-6">Core Deliverables</h4>
                      <ul className="space-y-4">
                        {service.deliverables.map(item => (
                          <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2 shrink-0"></span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/5 gap-6">
                    <div className="text-sm">
                      <span className="text-gray-500 block text-[10px] uppercase tracking-widest font-black mb-1">Typical Investment</span>
                      <span className="text-white font-mono font-bold text-lg">{service.pricing}</span>
                    </div>
                    <Link to="/book" className="flex items-center gap-3 px-8 py-4 bg-white text-black text-sm font-black rounded-2xl group/btn hover:bg-gray-200 transition-all shadow-xl shadow-white/5 w-full sm:w-auto justify-center">
                      Get a Quote <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                <div className="flex-1 w-full relative">
                   <div className="aspect-square rounded-[2rem] overflow-hidden border border-white/10 glass relative z-10 shadow-2xl">
                      <img 
                        src={`https://images.unsplash.com/photo-${index === 0 ? '1677442136019-21780ecad995' : index === 1 ? '1618005182384-a83a8bd57fbe' : '1620641788421-7a1c342ea42e'}?auto=format&fit=crop&q=60&w=800`} 
                        alt={service.title} 
                        className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                   </div>
                   {/* Decorative geometric shapes */}
                   <div className="absolute -bottom-8 -right-8 w-48 h-48 border-b-2 border-r-2 border-pink-500/20 rounded-br-[4rem] group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700"></div>
                   <div className="absolute -top-8 -left-8 w-48 h-48 border-t-2 border-l-2 border-pink-500/20 rounded-tl-[4rem] group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Mini CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass p-10 md:p-20 rounded-[3rem] text-center border-blue-500/10 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Unsure where to start?</h2>
          <p className="text-gray-400 mb-10 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">We offer a 45-minute technical audit to find your highest impact automation levers. No pitch, just architecture.</p>
          <Link to="/book" className="inline-block px-12 py-5 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95 shadow-2xl shadow-white/5">
            Book Free Technical Audit
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
