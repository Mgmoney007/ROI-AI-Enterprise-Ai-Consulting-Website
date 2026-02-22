
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Scroll Lock & Content Hiding
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      // Hide page content to ensure it's not seen or interacted with
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      if (main) main.style.visibility = 'hidden';
      if (footer) footer.style.visibility = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      if (main) main.style.visibility = '';
      if (footer) footer.style.visibility = '';
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      const main = document.querySelector('main');
      const footer = document.querySelector('footer');
      if (main) main.style.visibility = '';
      if (footer) footer.style.visibility = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Services', to: '/services' },
    { label: 'Case Studies', to: '/case-studies' },
    { label: 'Process', to: '/#process-1' },
    { label: 'FAQ', to: '/#faq-1' },
    { label: 'About', to: '/about' },
    { label: 'Resources', to: '/blog' },
  ];

  const isActive = (to: string) => {
    return location.pathname === to || (location.pathname === '/' && to === '/');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#030303]/90 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group relative z-[70]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-bold text-sm shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">R</div>
          <span className="text-xl font-black tracking-tighter text-white group-hover:text-blue-400 transition-colors uppercase">ROI-AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              to={link.to} 
              className={`text-sm font-bold tracking-tight transition-all relative py-1 ${isActive(link.to) ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-pink-500 rounded-full"></span>
              )}
            </Link>
          ))}
          <Link 
            to="/book" 
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
          >
            Consultation
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-[70] text-white p-2 hover:bg-white/5 rounded-xl transition-all active:scale-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[60] flex flex-col pt-32 px-8 md:hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-4'}`}>
        <div className="flex flex-col gap-8 w-full max-w-sm mx-auto">
          {navLinks.map((link, idx) => (
            <Link 
              key={link.label} 
              to={link.to} 
              className={`text-4xl font-black flex items-center justify-between transition-all duration-500 ${isActive(link.to) ? 'text-pink-500' : 'text-white hover:text-pink-400'} ${mobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}
              style={{ transitionDelay: `${idx * 75 + 150}ms` }}
            >
              {link.label}
              <ChevronRight className={`w-8 h-8 ${isActive(link.to) ? 'text-pink-500' : 'text-gray-800'}`} />
            </Link>
          ))}
          <div className={`pt-12 border-t border-white/5 mt-auto pb-12 transition-all duration-700 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} style={{ transitionDelay: `${navLinks.length * 75 + 200}ms` }}>
            <Link 
              to="/book" 
              className="block w-full text-center px-10 py-5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-xl font-black rounded-3xl shadow-2xl shadow-blue-500/20 active:scale-95 transition-all"
            >
              Book Strategy Call
            </Link>
            <p className="text-center text-gray-500 text-xs mt-6 font-mono uppercase tracking-widest">Enterprise AI Automation</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
