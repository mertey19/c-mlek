'use client';

/**
 * Centralized performance helpers for 3D scenes.
 * Tier + visibility are applied inside Canvas via hooks/use-performance-tier.
 */
export { usePerformanceTier } from '@/hooks/use-performance-tier';
export { useReducedMotion } from '@/hooks/use-reduced-motion';
