import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Menu, X, Youtube } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';

const socials = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/eric-nwankwo/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/aivisionconsulting/' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585002446584' },
  { icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@EricExplainsAI' },
  { icon: TikTokIcon, label: 'TikTok', href: 'https://www.tiktok.com/@aivisionconsultingltd' },
];

const primaryLinks = [
  { label: 'Training', href: '/ai-training-newcastle/' },
  { label: 'Automation', href: '/ai-automation-consultant-newcastle/' },
  { label: 'About', href: '/about-eric-nwankwo/' },
  { label: 'Case Studies', href: '/case-studies/' },
  { label: 'Pricing', href: '/pricing/' },
];

export function Nav({ isHomePage = true }: { isHomePage?: boolean }) {
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30 || !isHomePage);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHomePage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const dialog = mobileDialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  const homeHref = isHomePage ? '#home' : '/';
  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHomePage) return;
    event.preventDefault();
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-6" aria-label="Main navigation" style={{ background: scrolled ? 'rgba(5,13,26,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(0,212,255,0.08)' : '1px solid transparent' }}>
        <div className="max-w-[1200px] mx-auto flex items-center h-[70px] gap-8">
          <a href={homeHref} onClick={handleHomeClick} className="flex items-center gap-2.5 no-underline flex-shrink-0" aria-label="AI Vision Consulting Ltd - Home">
            <img src="/logo.svg" alt="AI Vision Consulting logo" width={40} height={40} style={{ display: 'block', filter: 'drop-shadow(0 0 6px rgba(0,212,255,0.45))' }} />
            <div><div className="font-display font-bold text-[15px] text-[#F0F4FF] tracking-tight leading-none">AI Vision</div><div className="font-display text-[11px] text-[#00D4FF] tracking-[0.08em] leading-none mt-0.5">CONSULTING LTD</div></div>
          </a>
          <div className="hidden lg:flex items-center gap-5 flex-1">
            {primaryLinks.map((item) => <a key={item.href} href={item.href} className="nav-link">{item.label}</a>)}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5">
              {socials.map(({ icon: Icon, label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center justify-center w-8 h-8 rounded-lg text-[#8899AA]" style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.1)' }}><Icon size={14} /></a>)}
            </div>
            <a href="/contact/" className="btn-primary hidden sm:inline-flex" style={{ padding: '10px 18px', fontSize: '13px' }}>Book Free Assessment</a>
            <button ref={menuButtonRef} onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Open menu" className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-[#00D4FF]" style={{ border: '1.5px solid rgba(0,212,255,0.3)' }}><Menu size={20} /></button>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div ref={mobileDialogRef} id="mobile-navigation" key="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[999] flex flex-col items-center justify-start gap-7 overflow-y-auto px-6 py-24" style={{ background: 'rgba(5,13,26,0.98)', backdropFilter: 'blur(20px)' }} role="dialog" aria-modal="true" aria-label="Navigation menu">
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="absolute top-5 right-6 flex items-center justify-center w-10 h-10 rounded-lg text-[#00D4FF]" style={{ border: '1.5px solid rgba(0,212,255,0.3)' }}><X size={20} /></button>
            <a href={homeHref} onClick={handleHomeClick} className="nav-link text-[21px] font-semibold text-[#F0F4FF]">Home</a>
            {primaryLinks.map((item) => <a key={item.href} href={item.href} className="nav-link text-[21px] font-semibold text-[#F0F4FF]">{item.label}</a>)}
            <a href="/contact/" className="btn-primary mt-2">Contact</a>
            <div className="flex items-center gap-3 mt-2">{socials.map(({ icon: Icon, label, href }) => <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center justify-center w-10 h-10 rounded-lg text-[#8899AA]" style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}><Icon size={18} /></a>)}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
