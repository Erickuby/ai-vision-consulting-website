import type { CSSProperties, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}

/**
 * Progressive-enhancement wrapper.
 *
 * Content remains visible in server-rendered HTML and when JavaScript is
 * unavailable. Decorative motion must never control access to page content.
 */
export function Reveal({ children, className = '', style }: RevealProps) {
  return <div className={className} style={style}>{children}</div>;
}
