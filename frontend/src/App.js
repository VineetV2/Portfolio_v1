import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import ProjectGallery from './components/sections/ProjectGallery';
import SkillMatrix from './components/sections/SkillMatrix';
import Publications from './components/sections/Publications';
import Experience from './components/sections/Experience';
import Education from './components/sections/Education';
import Certifications from './components/sections/Certifications';
import ContactFooter from './components/sections/ContactFooter';
import ParticleCanvas from './components/ui/ParticleCanvas';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function App() {
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Track page visit
  useEffect(() => {
    const trackVisit = async () => {
      try {
        await fetch(`${BACKEND_URL}/api/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: window.location.pathname,
            referrer: document.referrer || '',
            user_agent: navigator.userAgent,
            screen_width: window.innerWidth,
            screen_height: window.innerHeight,
          }),
        });
      } catch (e) {
        // Silent fail - analytics shouldn't break the site
      }
    };
    trackVisit();
  }, []);

  // Secret key combo: Ctrl+Shift+A opens analytics
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowAnalytics(true);
      }
      if (e.key === 'Escape') {
        setShowAnalytics(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-void font-body text-white" data-testid="app-root">
      <div className="grain-overlay" />
      <CustomCursor />
      <ParticleCanvas />
      <ScrollProgress />
      <Navbar onOpenAnalytics={() => setShowAnalytics(true)} />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectGallery />
        <SkillMatrix />
        <Publications />
        <Experience />
        <Education />
        <Certifications />
        <ContactFooter />
      </main>
      <AnalyticsDashboard isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} />
    </div>
  );
}

export default App;
