'use client';

import { useEffect } from 'react';

const FONT_SIZE_KEY = 'paris_font_size';
const SIZES = [16, 18, 20, 22];
export const DEFAULT_SIZE = 18;

export function getFontSize(): number {
  if (typeof window === 'undefined') return DEFAULT_SIZE;
  const saved = localStorage.getItem(FONT_SIZE_KEY);
  return saved ? Number(saved) : DEFAULT_SIZE;
}

export function saveFontSize(size: number) {
  localStorage.setItem(FONT_SIZE_KEY, String(size));
  document.documentElement.style.fontSize = `${size}px`;
}

export function increaseFontSize() {
  const current = getFontSize();
  const next = SIZES[Math.min(SIZES.indexOf(current) + 1, SIZES.length - 1)];
  saveFontSize(next);
  return next;
}

export function decreaseFontSize() {
  const current = getFontSize();
  const next = SIZES[Math.max(SIZES.indexOf(current) - 1, 0)];
  saveFontSize(next);
  return next;
}

export default function FontSizeProvider() {
  useEffect(() => {
    const size = getFontSize();
    document.documentElement.style.fontSize = `${size}px`;
  }, []);

  return null;
}
