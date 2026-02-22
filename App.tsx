
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Booking from './pages/Booking';
import Admin from './pages/Admin';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import CaseStudies from './pages/CaseStudies';
import ScrollToHash from './components/ScrollToHash';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Booking />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/blog" element={<Blog />} />
        {/* Standard legal pages */}
        <Route path="/privacy" element={<div className="bg-[#030303] text-white p-20 min-h-screen flex items-center justify-center">Privacy Policy Content</div>} />
        <Route path="/terms" element={<div className="bg-[#030303] text-white p-20 min-h-screen flex items-center justify-center">Terms of Service Content</div>} />
      </Routes>
    </Router>
  );
};

export default App;
