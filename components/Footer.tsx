
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Check } from 'lucide-react';

const Footer: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<{ email: string }>();

  const onSubscribe = (data: { email: string }) => {
    console.log('Footer sub:', data);
    setSubscribed(true);
    reset();
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#030303] pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        {/* Brand & Newsletter */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-sm">R</div>
            <span className="text-xl font-extrabold tracking-tighter text-white">ROI-AI</span>
          </Link>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            The premium partner for enterprises seeking operational leverage through custom AI systems and strategy.
          </p>
          <div className="mt-4">
            <h4 className="text-white font-bold text-sm mb-3">Get AI Strategy in your inbox</h4>
            
            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold animate-in fade-in slide-in-from-left-2">
                <Check className="w-4 h-4" /> Subscribed!
              </div>
            ) : (
              <div className="space-y-2 max-w-md">
                <form onSubmit={handleSubmit(onSubscribe)} className="flex gap-2">
                  <input 
                    {...register('email', { 
                      required: true, 
                      pattern: /^\S+@\S+$/i 
                    })}
                    type="email" 
                    placeholder="email@company.com" 
                    className={`flex-1 bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-lg px-4 py-2 text-sm focus:outline-none transition-colors`}
                  />
                  <button type="submit" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Join</button>
                </form>
                {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Valid email required</p>}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest opacity-40">Expertise</h5>
            <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">AI Strategy</Link>
            <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">Custom Automation</Link>
            <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">Internal Systems</Link>
            <Link to="/case-studies" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest opacity-40">Company</h5>
            <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">Home</Link>
            <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">About</Link>
            <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Insights</Link>
            <Link to="/book" className="text-sm text-gray-400 hover:text-white transition-colors">Contact</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h5 className="text-white font-bold text-xs uppercase tracking-widest opacity-40">Contact</h5>
            <a href="mailto:hello@roi-ai.com" className="text-sm text-gray-400 hover:text-white transition-colors">hello@roi-ai.com</a>
            <a href="tel:+18885550123" className="text-sm text-gray-400 hover:text-white transition-colors">+1 (888) 555-0123</a>
            <div className="pt-4 flex flex-col gap-4">
              <h5 className="text-white font-bold text-xs uppercase tracking-widest opacity-40">Legal</h5>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 ROI-AI Consulting. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors font-bold uppercase tracking-widest">LinkedIn</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors font-bold uppercase tracking-widest">Twitter</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors font-bold uppercase tracking-widest">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
