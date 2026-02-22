
import React, { useState, useEffect, useRef } from 'react';
import { LayoutDashboard, FileText, Settings, Users, MousePointer2, TrendingUp, Bell, Calendar, ChevronRight } from 'lucide-react';
import * as d3 from 'd3';

// --- Lead Conversion Chart Component ---
const LeadConversionChart: React.FC<{ range: string }> = ({ range }) => {
  const d3Container = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!d3Container.current || !wrapperRef.current) return;

    const renderChart = () => {
      const wrapperWidth = wrapperRef.current?.clientWidth || 800;
      const height = 300;
      const margin = { top: 20, right: 30, bottom: 40, left: 50 };
      const innerWidth = wrapperWidth - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      // Generate Synthetic Data based on range
      const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
      const data = Array.from({ length: days }, (_, i) => ({
        date: d3.timeDay.offset(new Date(), - (days - 1 - i)),
        rate: 15 + Math.random() * 25 + (Math.sin(i / 3) * 10)
      }));

      // Clear previous SVG content
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .attr("width", wrapperWidth)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Scales
      const x = d3.scaleTime()
        .domain(d3.extent(data, d => d.date) as [Date, Date])
        .range([0, innerWidth]);

      const y = d3.scaleLinear()
        .domain([0, 100])
        .range([innerHeight, 0]);

      // Axes
      svg.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x).ticks(wrapperWidth < 500 ? 3 : 8).tickSizeOuter(0))
        .attr("color", "rgba(255,255,255,0.1)")
        .selectAll("text")
        .attr("class", "text-[10px] font-mono text-gray-500");

      svg.append("g")
        .call(d3.axisLeft(y).ticks(5).tickFormat(d => d + "%"))
        .attr("color", "rgba(255,255,255,0.1)")
        .selectAll("text")
        .attr("class", "text-[10px] font-mono text-gray-500");

      // Gradient Definition
      const gradientId = "line-gradient";
      const gradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(100));

      gradient.append("stop").attr("offset", "0%").attr("stop-color", "#06b6d4");
      gradient.append("stop").attr("offset", "100%").attr("stop-color", "#a855f7");

      // Area Fill
      const area = d3.area<any>()
        .x(d => x(d.date))
        .y0(innerHeight)
        .y1(d => y(d.rate))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(data)
        .attr("fill", "url(#area-gradient)")
        .attr("opacity", 0.1)
        .attr("d", area);

      const areaGradient = svg.append("defs")
        .append("linearGradient")
        .attr("id", "area-gradient")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", 1);
      
      areaGradient.append("stop").attr("offset", "0%").attr("stop-color", "#a855f7");
      areaGradient.append("stop").attr("offset", "100%").attr("stop-color", "transparent");

      // The Line
      const line = d3.line<any>()
        .x(d => x(d.date))
        .y(d => y(d.rate))
        .curve(d3.curveMonotoneX);

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", `url(#${gradientId})`)
        .attr("stroke-width", 3)
        .attr("stroke-linecap", "round")
        .attr("d", line)
        .attr("class", "drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]");
    };

    renderChart();
    
    const resizeObserver = new ResizeObserver(() => renderChart());
    resizeObserver.observe(wrapperRef.current);
    
    return () => resizeObserver.disconnect();
  }, [range]);

  return (
    <div ref={wrapperRef} className="w-full">
      <svg ref={d3Container} className="overflow-visible"></svg>
    </div>
  );
};

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [chartRange, setChartRange] = useState('30d');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const stats = [
    { label: 'Pending Bookings', value: '14', change: '+2 today', icon: <MousePointer2 className="w-4 h-4" /> },
    { label: 'Qualified Leads', value: '382', change: '+12% this week', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Workflow Efficiency', value: '94.2%', change: '+0.4%', icon: <FileText className="w-4 h-4" /> }
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-12">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center font-bold text-sm">R</div>
        <span className="font-black text-xl tracking-tighter uppercase">ROI-AI</span>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { id: 'content', label: 'Page Editor', icon: <FileText className="w-4 h-4" /> },
          { id: 'leads', label: 'Leads & CRM', icon: <Users className="w-4 h-4" /> },
          { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setMobileSidebarOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/5">
         <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5">
           <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-black text-purple-400">AR</div>
           <div className="text-xs">
             <div className="font-bold">Alex Rivers</div>
             <div className="text-gray-500">Super Admin</div>
           </div>
         </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-[#030303] text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 border-r border-white/5 flex-col p-8 shrink-0">
        <SidebarContent />
      </aside>

      {/* Sidebar - Mobile Overlay */}
      <div className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden transition-all duration-300 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileSidebarOpen(false)}>
        <aside className={`w-72 h-full bg-[#030303] border-r border-white/10 flex flex-col p-8 transition-transform duration-300 ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={e => e.stopPropagation()}>
           <SidebarContent />
        </aside>
      </div>

      {/* Main Panel */}
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button onClick={() => setMobileSidebarOpen(true)} className="lg:hidden p-2 bg-white/5 border border-white/10 rounded-lg">
               <LayoutDashboard className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-black capitalize tracking-tight">{activeTab}</h1>
              <p className="text-gray-500 text-sm hidden sm:block">Welcome back, Alex. Monitoring active growth cycles.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-3 bg-white text-black text-sm font-black rounded-xl hover:bg-gray-200 transition-all shadow-xl shadow-white/5">Publish Changes</button>
            <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-purple-500 rounded-full border border-[#030303]"></span>
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className="space-y-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((s, i) => (
                <div key={i} className="glass p-8 rounded-3xl border-white/5 group hover:border-purple-500/20 transition-all">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-purple-400 transition-colors">{s.icon}</div>
                    <span className="text-[10px] font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-full">{s.change}</span>
                  </div>
                  <div className="text-4xl font-black mb-1">{s.value}</div>
                  <div className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Lead Conversion Chart Section */}
            <div className="glass p-6 md:p-10 rounded-[2.5rem] border-white/5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div>
                  <h3 className="text-xl font-black mb-2">Lead Conversion Trend</h3>
                  <p className="text-xs text-gray-500 font-mono">Performance across active automation cycles.</p>
                </div>
                <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/10 w-full sm:w-auto">
                  {['7d', '30d', '90d'].map((r) => (
                    <button
                      key={r}
                      onClick={() => setChartRange(r)}
                      className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${chartRange === r ? 'bg-white text-black shadow-lg shadow-white/5' : 'text-gray-500 hover:text-white'}`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <LeadConversionChart range={chartRange} />
            </div>

            {/* Content Table / Leads */}
            <div className="glass rounded-[2.5rem] border-white/5 overflow-hidden">
               <div className="p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <h3 className="font-black text-lg">Active Pipeline</h3>
                 <button className="text-xs text-purple-400 font-bold hover:text-purple-300 transition-colors flex items-center gap-1">Download Detailed CSV <ChevronRight className="w-4 h-4"/></button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left min-w-[700px]">
                   <thead className="text-[10px] uppercase text-gray-600 tracking-[0.2em] font-black">
                     <tr>
                       <th className="px-8 py-6">Lead Entity</th>
                       <th className="px-8 py-6">Company</th>
                       <th className="px-8 py-6">Automation Status</th>
                       <th className="px-8 py-6 text-right">Budget</th>
                     </tr>
                   </thead>
                   <tbody className="text-sm border-t border-white/5">
                     {[
                       { name: 'Sarah Miller', email: 'sarah@stripe.com', company: 'Stripe', status: 'Qualified', budget: '$25k+' },
                       { name: 'David Jones', email: 'david@notion.so', company: 'Notion', status: 'Negotiating', budget: '$50k+' },
                       { name: 'Elena Rossi', email: 'e.rossi@prada.it', company: 'Prada', status: 'New', budget: '$10k+' },
                     ].map((l, i) => (
                       <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group cursor-pointer">
                         <td className="px-8 py-6">
                           <div className="font-black text-white group-hover:text-purple-400 transition-colors">{l.name}</div>
                           <div className="text-[10px] text-gray-600 font-mono">{l.email}</div>
                         </td>
                         <td className="px-8 py-6 font-mono text-xs text-gray-400">{l.company}</td>
                         <td className="px-8 py-6">
                           <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest">{l.status}</span>
                         </td>
                         <td className="px-8 py-6 font-mono text-xs text-right text-gray-200">{l.budget}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
