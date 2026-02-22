
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionRenderer from '../components/SectionRenderer';
import { INITIAL_SECTIONS, SEED_POSTS } from '../constants';
import { ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303] overflow-x-hidden">
      <Navigation />
      <main>
        {INITIAL_SECTIONS.map((section) => (
          <SectionRenderer key={section.id} section={section as any} />
        ))}

        {/* Home Blog Preview Section */}
        <section className="py-24 md:py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 md:mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Latest <span className="text-emerald-500">Insights</span></h2>
                <p className="text-gray-400 text-sm md:text-base">Tactical advice for the AI-enabled operator.</p>
              </div>
              <Link to="/blog" className="flex items-center gap-2 text-sm font-black text-white group bg-white/5 px-6 py-3 rounded-full hover:bg-white/10 transition-all border border-white/5">
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {SEED_POSTS.slice(0, 2).map((post) => (
                <Link to="/blog" key={post.id} className="glass p-6 md:p-8 rounded-[2rem] block group hover:border-emerald-500/30 transition-all relative overflow-hidden">
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-8 shadow-2xl">
                    <img 
                      src={`${post.image}&w=800&q=60&auto=format&fit=crop`} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-xl md:text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors leading-tight">{post.title}</h4>
                  <p className="text-gray-400 text-sm md:text-base mb-6 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest font-black bg-emerald-500/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">{post.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bottom Strong CTA */}
        <section className="py-24 md:py-32 px-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-transparent to-transparent"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 glass p-8 md:p-24 rounded-[3rem] border-white/5">
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Ready to unlock <span className="text-blue-500">10x leverage?</span></h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
              Book a strategy call to diagnose your bottlenecks. If there isn't a clear path to 3-5x ROI, we'll tell you upfront.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="w-full sm:w-auto px-12 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-black rounded-2xl hover:scale-105 transition-all text-center shadow-2xl shadow-blue-500/20">
                Get a Free Consultation
              </Link>
              <div className="text-xs text-gray-500 font-mono uppercase tracking-widest">Limited Monthly Openings</div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
