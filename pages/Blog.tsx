
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { SEED_POSTS } from '../constants';
import { Calendar, User, ArrowUpRight, Check } from 'lucide-react';

const Blog: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ email: string }>();

  const onSubscribe = (data: { email: string }) => {
    console.log('Newsletter sub:', data);
    setSubscribed(true);
    reset();
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <main className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-24">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Resource <span className="text-gradient">Center.</span></h1>
              <p className="text-gray-400 text-lg">Tactical guides, architectural insights, and the latest in enterprise automation engineering.</p>
            </div>
            <div className="flex gap-4 mb-4">
              {['Strategy', 'Engineering', 'Insights'].map(cat => (
                <button key={cat} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:border-blue-500 transition-all">{cat}</button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SEED_POSTS.map((post) => (
              <article key={post.id} className="group cursor-pointer">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-8 glass border-white/5">
                  <img 
                    src={`${post.image}&w=800&q=60&auto=format&fit=crop`} 
                    alt={post.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest text-pink-400">
                    {post.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> {post.author}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    {post.excerpt}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-xs font-bold text-white group-hover:gap-4 transition-all">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-32 glass p-12 md:p-24 rounded-[3rem] border-white/5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Stay ahead of the <span className="text-blue-500">curve.</span></h2>
              <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">Join 1,200+ founders and operators receiving our bi-weekly strategy breakdowns.</p>
              
              {subscribed ? (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-6 rounded-2xl flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-500 max-w-md mx-auto">
                  <Check className="w-5 h-5" />
                  <span className="font-bold">You're on the list! Welcome aboard.</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubscribe)} className="flex flex-col gap-2 max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { value: /^\S+@\S+$/i, message: 'Please enter a valid email' } 
                      })}
                      type="email" 
                      placeholder="Enter your work email" 
                      className={`flex-1 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-2xl px-6 py-4 text-white outline-none transition-all`}
                    />
                    <button type="submit" className="px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all">
                      Subscribe
                    </button>
                  </div>
                  {errors.email && <p className="text-xs text-red-500 text-left px-2">{errors.email.message}</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
