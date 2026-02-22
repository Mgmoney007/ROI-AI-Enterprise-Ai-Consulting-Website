
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionRenderer from '../components/SectionRenderer';
import { SectionType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "ROI-AI didn't just give us a tool; they gave us a new way to operate. Our efficiency has doubled in six months without adding a single headcount.",
    author: "James Wilson",
    role: "CTO",
    company: "TechFlow",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=60&w=300"
  },
  {
    quote: "The security guardrails they implemented gave our legal team the confidence to fully embrace AI. We now process 10x more data with 0% leak risk.",
    author: "Elena Rodriguez",
    role: "VP of Operations",
    company: "SecureScale",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=60&w=300"
  },
  {
    quote: "Measurable ROI from day 21. The speed of deployment was unlike anything we've seen from traditional consultants. They are true partners in our growth.",
    author: "Mark Thompson",
    role: "CEO",
    company: "GrowthEngine",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=300"
  }
];

const ABOUT_SECTIONS = [
  {
    id: 'about-hero',
    type: SectionType.Hero,
    enabled: true,
    title: 'Building the Future of Automated Enterprise.',
    subtitle: 'Our mission is to bridge the gap between human creativity and algorithmic efficiency. ROI-AI was founded on the principle that AI should not just automate tasks, but elevate capabilities.',
    content: {
      isMission: true,
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=60&w=1200'
    }
  },
  {
    id: 'team-grid',
    type: SectionType.TeamGrid,
    enabled: true,
    title: 'Meet the Architects',
    subtitle: 'A specialized collective of automation engineers, AI strategists, and operations experts.',
    content: {
      members: [
        {
          name: 'Alex Rivers',
          role: 'Founding Partner & Strategy Lead',
          bio: 'Former Ops Lead at a Fortune 500. Alex specializes in identifying high-impact automation opportunities that translate directly to bottom-line growth.',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=60&w=400'
        },
        {
          name: 'Sarah Chen',
          role: 'Head of AI Engineering',
          bio: 'Expert in LLM fine-tuning and retrieval-augmented generation. Sarah designs the neural architecture that powers our custom enterprise solutions.',
          image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=60&w=400'
        },
        {
          name: 'Marcus Thorne',
          role: 'Implementation Specialist',
          bio: 'Masters the "last mile" of automation. Marcus ensures that AI systems integrate flawlessly with existing legacy stacks and team workflows.',
          image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=60&w=400'
        }
      ]
    }
  }
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Trusted by <span className="text-blue-500">Industry Leaders</span></h2>
          <p className="text-gray-400">Real outcomes from real enterprise partners.</p>
        </div>

        <div className="relative h-[400px] md:h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full"
            >
              <div className="glass p-8 md:p-12 rounded-[3rem] border-white/5 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-pink-500/20 shrink-0">
                  <img 
                    src={`${TESTIMONIALS[currentIndex].image}&w=300&q=60&auto=format&fit=crop`} 
                    alt={TESTIMONIALS[currentIndex].author} 
                    className="w-full h-full object-cover grayscale"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <Quote className="w-8 h-8 text-pink-500/20 mb-4 mx-auto md:mx-0" />
                  <p className="text-lg md:text-2xl text-white font-medium italic mb-8 leading-relaxed">
                    "{TESTIMONIALS[currentIndex].quote}"
                  </p>
                  <div>
                    <h4 className="text-white font-black text-lg">{TESTIMONIALS[currentIndex].author}</h4>
                    <p className="text-pink-400 text-sm font-mono uppercase tracking-widest font-bold">
                      {TESTIMONIALS[currentIndex].role} @ {TESTIMONIALS[currentIndex].company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12">
          <button 
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-pink-500 w-8' : 'bg-white/20'}`}
              />
            ))}
          </div>
          <button 
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <main>
        {ABOUT_SECTIONS.map((section) => (
          <SectionRenderer key={section.id} section={section as any} />
        ))}
        
        <TestimonialCarousel />

        {/* Core Values / Philosophy */}
        <section className="py-32 px-6 bg-white/[0.02] border-y border-white/5">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Leverage First</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We don't build for the sake of technology. We build to create asymmetrical returns on time and capital.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Zero-Disruption</h3>
              <p className="text-gray-400 text-sm leading-relaxed">The best systems work invisibly. We integrate AI into the tools your team already loves.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Ethical Scaling</h3>
              <p className="text-gray-400 text-sm leading-relaxed">We implement enterprise-grade security and guardrails to protect your most valuable asset: your data.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
