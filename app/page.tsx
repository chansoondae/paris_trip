import Link from 'next/link';
import { schedules, TRAVEL_START_DATE } from '@/lib/data';

function getDDayCount(): number {
  const today = new Date();
  const target = new Date(TRAVEL_START_DATE);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const categoryLabels: Record<string, string> = {
  museum: '🎨',
  meal: '🍽️',
  landmark: '🏛️',
  cafe: '☕',
  transport: '🚶',
  rest: '🏨',
};

export default function HomePage() {
  const dday = getDDayCount();

  const ddayLabel =
    dday > 0 ? `D-${dday}` : dday === 0 ? 'D-Day!' : `D+${Math.abs(dday)}`;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm mb-4 border border-[#E8DDD0]">
            <span className="text-sm font-medium text-[#6B7280]">2026.04.24 — 04.27</span>
            <span className="text-xs font-bold text-[#C8A97E]">{ddayLabel}</span>
          </div>
          <h1
            className="text-4xl font-bold text-[#1A2332] mb-2"
            style={{ fontFamily: 'var(--font-playfair-display), serif' }}
          >
            🇫🇷 Voyage à Paris
          </h1>
          <p className="text-[#6B7280] text-sm">경애·경숙·경미·경화의 특별한 여행</p>
        </header>

        {/* Hotel */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+Mercure+Paris+Centre+Tour+Eiffel"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 mb-6 shadow-sm border border-[#F0EAE0] active:opacity-80 transition-opacity"
        >
          <span className="text-xl">🏨</span>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#6B7280] mb-0.5">숙소</p>
            <p className="text-sm font-semibold text-[#1A2332] truncate">Hôtel Mercure Paris Centre Tour Eiffel</p>
          </div>
          <span className="text-xs font-medium text-[#C8A97E] flex-shrink-0">지도 →</span>
        </a>

        {/* Day Cards */}
        <div className="space-y-3">
          {schedules.map((day) => (
            <Link
              key={day.dayNumber}
              href={`/day/${day.dayNumber}`}
              className="block bg-white rounded-2xl shadow-sm border border-[#F0EAE0] overflow-hidden active:opacity-80 transition-opacity"
            >
              {/* Day header bar */}
              <div className="px-4 py-3 flex items-center gap-3" style={{ backgroundColor: `${day.themeColor}15` }}>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
                  style={{ backgroundColor: day.themeColor }}
                >
                  Day {day.dayNumber}
                </span>
                <span className="text-sm font-semibold text-[#1A2332]">{day.title}</span>
                <span className="text-xs text-[#6B7280] ml-auto">
                  {day.date.slice(5).replace('-', '/')} ({day.dayOfWeek.slice(0, 1)})
                </span>
              </div>

              {/* Items */}
              <ul className="px-4 py-3 space-y-2">
                {day.items.map((item) => (
                  <li key={item.id} className="flex items-start gap-2.5">
                    <span className="text-sm mt-0.5 flex-shrink-0">{categoryLabels[item.category]}</span>
                    <div className="flex-1 min-w-0">
                      <span className="text-sm text-[#1A2332] leading-snug">{item.title}</span>
                      {item.placeName && (
                        <span className="text-xs text-[#9CA3AF] ml-1.5">{item.placeName}</span>
                      )}
                    </div>
                    {item.startTime && (
                      <span className="text-xs text-[#6B7280] tabular-nums flex-shrink-0 mt-0.5">{item.startTime}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>

        <footer className="mt-8 text-center text-xs text-[#9CA3AF]">
          <p>좋은 여행 되세요 ✈️</p>
        </footer>
      </div>
    </main>
  );
}
