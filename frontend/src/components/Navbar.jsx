import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Publications', href: '#publications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = ({ onOpenAnalytics }) => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Determine active section
      const sections = navItems.map(n => n.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-void/80 backdrop-blur-xl border-b border-white/[0.04]'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            data-testid="nav-logo"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-heading font-bold text-lg tracking-tight text-white hover:text-accent transition-colors duration-300"
          >
            vineet<span className="text-accent">.</span>vora
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.href}
                data-testid={`nav-${item.label.toLowerCase()}`}
                onClick={() => scrollTo(item.href)}
                className={`px-3 py-2 text-[13px] font-mono tracking-wide uppercase transition-all duration-300 rounded-md hoverable ${
                  active === item.href.slice(1)
                    ? 'text-accent bg-accent/[0.08]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://github.com/VineetV2" target="_blank" rel="noreferrer" data-testid="nav-github" className="p-2 text-slate-400 hover:text-accent transition-colors hoverable">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vineetv2/" target="_blank" rel="noreferrer" data-testid="nav-linkedin" className="p-2 text-slate-400 hover:text-accent transition-colors hoverable">
              <Linkedin size={18} />
            </a>
            <a href="mailto:vineet.vora123@gmail.com" data-testid="nav-email" className="p-2 text-slate-400 hover:text-accent transition-colors hoverable">
              <Mail size={18} />
            </a>
            <a
              href="/resume.pdf"
              download="Vineet_Vora_Resume.pdf"
              data-testid="nav-resume-btn"
              className="ml-2 px-4 py-2 text-[13px] font-mono tracking-wide uppercase border border-accent text-accent rounded-full hover:bg-accent hover:text-void-50 transition-all duration-300 flex items-center gap-2 hoverable"
            >
              <Download size={14} />
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            data-testid="nav-mobile-toggle"
            className="lg:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        data-testid="mobile-menu"
        className={`fixed inset-0 z-40 bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 transition-all duration-500 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navItems.map((item, i) => (
          <button
            key={item.href}
            data-testid={`mobile-nav-${item.label.toLowerCase()}`}
            onClick={() => scrollTo(item.href)}
            className="text-2xl font-heading font-semibold text-slate-300 hover:text-accent transition-colors"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.4s ${i * 0.06}s ease-out`,
            }}
          >
            {item.label}
          </button>
        ))}
        <div className="flex gap-4 mt-8">
          <a href="https://github.com/VineetV2" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-accent transition-colors">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/vineetv2/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-accent transition-colors">
            <Linkedin size={22} />
          </a>
          <a href="mailto:vineet.vora123@gmail.com" className="text-slate-400 hover:text-accent transition-colors">
            <Mail size={22} />
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
