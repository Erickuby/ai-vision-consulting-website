import { useEffect, useState } from 'react';

export function useSiteMotion() {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      let override = false;
      try { override = window.localStorage.getItem('avc-motion-preference') === 'enabled'; } catch { /* Storage may be unavailable. */ }
      setEnabled(!media.matches || override);
    };
    update();
    media.addEventListener('change', update);
    window.addEventListener('avc-motion-change', update);
    return () => { media.removeEventListener('change', update); window.removeEventListener('avc-motion-change', update); };
  }, []);
  return enabled;
}
