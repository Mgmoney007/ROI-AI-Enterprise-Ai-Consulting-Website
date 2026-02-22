
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { CheckCircle2, ChevronRight, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  company: string;
  bottlenecks: string;
  spend: string;
  timeline: string;
};

const Booking: React.FC = () => {
  const [step, setStep] = useState(1);
  const { 
    register, 
    handleSubmit, 
    trigger, 
    formState: { errors },
    watch,
    setValue
  } = useForm<FormData>({
    defaultValues: {
      spend: 'Under $10k',
      timeline: 'Exploring'
    }
  });

  const timelineValue = watch('timeline');

  const handleNextStep = async () => {
    const fieldsToValidate = step === 1 
      ? ['name', 'email', 'company', 'bottlenecks'] 
      : ['spend', 'timeline'];
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) setStep(step + 1);
  };

  const handlePrevStep = () => setStep(step - 1);

  const onSubmit = (data: FormData) => {
    console.log('Form Submitted:', data);
    setStep(3); // Success state
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <Navigation />
      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Context/Proof Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-10">
              <div>
                <h1 className="text-4xl font-black text-white mb-4">Book Your <span className="text-blue-500">ROI-AI</span> Strategy Call</h1>
                <p className="text-gray-400 leading-relaxed">
                  In this 45-minute session, we'll map your existing workflows and identify the top 3 AI automation opportunities with the highest immediate ROI.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Clock className="w-5 h-5" />, title: '45 Minute Audit', desc: 'No fluff. Just high-level technical audit.' },
                  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Non-Disclosure', desc: 'All discussions are strictly confidential.' },
                  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Direct Access', desc: 'Speak directly with an implementation lead.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass p-6 rounded-2xl italic text-gray-400 text-sm">
                "ROI-AI helped us reclaim 40+ hours per week in our customer success department within the first month. The implementation was seamless."
                <div className="mt-4 not-italic font-bold text-white text-xs">— CTO, Enterprise SaaS Corp</div>
              </div>
            </div>

            {/* Multi-step Form */}
            <div className="lg:col-span-7 glass p-8 md:p-12 rounded-[2rem] border-white/10 relative overflow-hidden min-h-[500px]">
              <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-emerald-500 transition-all duration-500" style={{ width: `${(step / 3) * 100}%` }}></div>
              
              <form onSubmit={handleSubmit(onSubmit)}>
                {step === 1 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-xl font-bold text-white mb-8">Step 1: Contact Details</h3>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
                          <input 
                            {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
                            type="text" 
                            className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white outline-none transition-colors`} 
                            placeholder="John Doe" 
                          />
                          {errors.name && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
                          <input 
                            {...register('email', { 
                              required: 'Email is required', 
                              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } 
                            })}
                            type="email" 
                            className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white outline-none transition-colors`} 
                            placeholder="john@company.com" 
                          />
                          {errors.email && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.email.message}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Company Name</label>
                        <input 
                          {...register('company', { required: 'Company is required' })}
                          type="text" 
                          className={`w-full bg-white/5 border ${errors.company ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white outline-none transition-colors`} 
                          placeholder="Acme Corp" 
                        />
                        {errors.company && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.company.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Primary Bottleneck</label>
                        <textarea 
                          {...register('bottlenecks', { 
                            required: 'Please describe your bottleneck', 
                            minLength: { value: 20, message: 'Please provide more detail (min 20 chars)' } 
                          })}
                          className={`w-full bg-white/5 border ${errors.bottlenecks ? 'border-red-500' : 'border-white/10 focus:border-blue-500'} rounded-xl px-4 py-3 text-white outline-none h-32 transition-colors`} 
                          placeholder="Tell us what's slowing you down..."
                        ></textarea>
                        {errors.bottlenecks && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3"/> {errors.bottlenecks.message}</p>}
                      </div>
                      <button 
                        type="button"
                        onClick={handleNextStep}
                        className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                      >
                        Next Step <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                    <h3 className="text-xl font-bold text-white mb-8">Step 2: Qualification</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Current Monthly Spend on Manual Ops</label>
                        <select 
                          {...register('spend', { required: true })}
                          className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none transition-colors"
                        >
                          <option value="Under $10k">Under $10k</option>
                          <option value="$10k - $50k">$10k - $50k</option>
                          <option value="$50k - $200k">$50k - $200k</option>
                          <option value="$200k+">$200k+</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Desired Implementation Timeline</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Immediate', 'Within 30 Days', 'Q1-Q2 Next Year', 'Exploring'].map(t => (
                            <button 
                              key={t} 
                              type="button"
                              onClick={() => setValue('timeline', t)}
                              className={`px-4 py-3 rounded-xl border transition-all text-left text-sm ${timelineValue === t ? 'border-blue-500 text-white bg-blue-500/5' : 'border-white/10 text-gray-400 hover:border-white/30'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                        <input type="hidden" {...register('timeline', { required: true })} />
                      </div>
                      <div className="pt-4 flex gap-4">
                        <button type="button" onClick={handlePrevStep} className="flex-1 py-4 border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-colors">Back</button>
                        <button type="submit" className="flex-[2] py-4 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 accent-glow transition-all">Finalize Booking</button>
                      </div>
                    </div>
                  </div>
                )}
              </form>

              {step === 3 && (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-700">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Request Received</h3>
                  <p className="text-gray-400 mb-8 max-w-sm mx-auto leading-relaxed">
                    Our team is reviewing your profile. You will receive a calendar invite within 2 business hours if qualified.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl inline-block">
                    <p className="text-xs font-mono text-pink-400 mb-2 uppercase tracking-widest font-bold">Bonus Asset</p>
                    <a href="#" className="text-white font-bold underline flex items-center gap-2">
                      Download our "AI ROI Blueprint" (PDF)
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
