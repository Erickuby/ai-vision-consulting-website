import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navItems.map(n => n.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6"
        style={{
          background: scrolled ? 'rgba(5,13,26,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center h-[70px] gap-10">
          {/* Logo */}
          <a
            href="#home"
            onClick={e => { e.preventDefault(); scrollTo('#home'); }}
            className="flex items-center gap-2.5 no-underline flex-shrink-0"
            aria-label="AI Vision Consulting Ltd - Home"
          >
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, #00D4FF, #0066AA)',
                boxShadow: '0 0 16px rgba(0,212,255,0.4)',
              }}
            >
              <Brain size={20} color="#050D1A" />
            </div>
            <div>
              <div className="font-display font-bold text-[15px] text-[#F0F4FF] tracking-tight leading-none">
                AI Vision
              </div>
              <div className="font-display font-normal text-[11px] text-[#00D4FF] tracking-[0.08em] leading-none mt-0.5">
                CONSULTING LTD
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 flex-1">
            {navItems.map(item => (
              <a
                key={item.label}
                href={item.href}
                onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                className={`nav-link ${active === item.href.replace('#', '') ? 'active' : ''}`}
                aria-current={active === item.href.replace('#', '') ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <a
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
              className="btn-primary hidden sm:inline-flex"
              style={{ padding: '10px 20px', fontSize: '13px' }}
            >
              Book Free Assessment
            </a>
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#00D4FF]"
              style={{ border: '1.5px solid rgba(0,212,255,0.3)' }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-10"
            style={{ background: 'rgba(5,13,26,0.97)', backdropFilter: 'blur(20px)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="absolute top-5 right-6 flex items-center justify-center w-10 h-10 rounded-lg text-[#00D4FF]"
              style={{ border: '1.5px solid rgba(0,212,255,0.3)' }}
            >
              <X size={20} />
            </motion.button>

            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                href={item.href}
                onClick={e => { e.preventDefault(); scrollTo(item.href); }}
                className="nav-link text-[22px] font-semibold text-[#F0F4FF]"
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.06 }}
              href="#contact"
              onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
              className="btn-primary mt-3"
            >
              Book Free Assessment
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
