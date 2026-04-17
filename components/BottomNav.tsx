'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const days = [
  { dayNumber: 1, label: '도착일', date: '4/24', color: '#C8A97E' },
  { dayNumber: 2, label: '미술관', date: '4/25', color: '#4A6FA5' },
  { dayNumber: 3, label: '클래식', date: '4/26', color: '#7BA05B' },
  { dayNumber: 4, label: '몽마르트', date: '4/27', color: '#D97757' },
];

export default function BottomNav() {
  const pathname = usePathname();

  const activeDay = pathname.startsWith('/day/')
    ? Number(pathname.split('/day/')[1])
    : null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8DDD0] shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-lg mx-auto flex">
        {days.map((day) => {
          const isActive = activeDay === day.dayNumber;
          return (
            <Link
              key={day.dayNumber}
              href={`/day/${day.dayNumber}`}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors duration-150"
              style={{
                borderTop: isActive ? `3px solid ${day.color}` : '3px solid transparent',
              }}
            >
              <span
                className="text-[11px] font-bold tabular-nums"
                style={{ color: isActive ? day.color : '#6B7280' }}
              >
                Day {day.dayNumber}
              </span>
              <span
                className="text-[10px]"
                style={{ color: isActive ? day.color : '#9CA3AF' }}
              >
                {day.date}
              </span>
              <span
                className="text-[10px] leading-tight"
                style={{ color: isActive ? day.color : '#9CA3AF' }}
              >
                {day.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
