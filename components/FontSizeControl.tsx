'use client';

import { useState, useEffect } from 'react';
import { getFontSize, increaseFontSize, decreaseFontSize, DEFAULT_SIZE } from './FontSizeProvider';

const SIZES = [16, 18, 20, 22];

export default function FontSizeControl() {
  const [size, setSize] = useState(DEFAULT_SIZE);

  useEffect(() => {
    setSize(getFontSize());
  }, []);

  function handleIncrease() {
    const next = increaseFontSize();
    setSize(next);
  }

  function handleDecrease() {
    const next = decreaseFontSize();
    setSize(next);
  }

  const isMin = size <= SIZES[0];
  const isMax = size >= SIZES[SIZES.length - 1];

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={handleDecrease}
        disabled={isMin}
        className="w-8 h-8 rounded-lg border border-[#E8DDD0] bg-white flex items-center justify-center text-sm font-bold text-[#6B7280] disabled:opacity-30 transition-opacity"
        aria-label="글자 작게"
      >
        A<span className="text-[10px]">−</span>
      </button>
      <button
        onClick={handleIncrease}
        disabled={isMax}
        className="w-8 h-8 rounded-lg border border-[#E8DDD0] bg-white flex items-center justify-center text-sm font-bold text-[#6B7280] disabled:opacity-30 transition-opacity"
        aria-label="글자 크게"
      >
        A<span className="text-[12px]">+</span>
      </button>
    </div>
  );
}
