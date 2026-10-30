import { useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Custom hook for safely running GSAP animations with automatic context cleanup
 * @param {Function} callback - Animation logic inside gsap.context
 * @param {Array} dependencies - React dependencies
 * @param {React.RefObject} scopeRef - Optional scope ref to isolate selectors
 */
export const useGsapTimeline = (callback, dependencies = [], scopeRef = null) => {
  const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const scope = scopeRef?.current || undefined;
    const ctx = gsap.context(() => {
      callback(gsap, ScrollTrigger);
    }, scope);

    return () => {
      ctx.revert(); // Complete cleanup preventing duplicate triggers & memory leaks
    };
  }, dependencies);
};

export { gsap, ScrollTrigger };
export default useGsapTimeline;

