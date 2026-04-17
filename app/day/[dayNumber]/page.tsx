import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  Palette,
  UtensilsCrossed,
  Landmark,
  Coffee,
  Footprints,
  Hotel,
  MapPin,
  ArrowLeft,
  CalendarDays,
  PlaneTakeoff,
  Car,
  Ticket,
} from 'lucide-react';
import { getDaySchedule, schedules } from '@/lib/data';
import type { Category, BookingStatus, ScheduleItem } from '@/types/schedule';
import Comments from '@/components/Comments';

// Static params for all 4 days
export function generateStaticParams() {
  return schedules.map((day) => ({
    dayNumber: String(day.dayNumber),
  }));
}

function CategoryIcon({ category }: { category: Category }) {
  const iconProps = { size: 18, strokeWidth: 1.8 };
  switch (category) {
    case 'museum':
      return <Palette {...iconProps} />;
    case 'meal':
      return <UtensilsCrossed {...iconProps} />;
    case 'landmark':
      return <Landmark {...iconProps} />;
    case 'cafe':
      return <Coffee {...iconProps} />;
    case 'transport':
      return <Footprints {...iconProps} />;
    case 'rest':
      return <Hotel {...iconProps} />;
    case 'flight':
      return <PlaneTakeoff {...iconProps} />;
    case 'car':
      return <Car {...iconProps} />;
    default:
      return <CalendarDays {...iconProps} />;
  }
}

function BookingBadge({ status }: { status: BookingStatus }) {
  if (status === 'not_required') return null;

  if (status === 'booked') {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#EAF4EB] text-[#5A8A5C] border border-[#C4DEC6]">
        ✓ 예약 완료
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#FEF3E7] text-[#C68642] border border-[#F4D5A8]">
      ! 예약 필요
    </span>
  );
}

function TimelineItem({
  item,
  themeColor,
  isLast,
  dayNumber,
}: {
  item: ScheduleItem;
  themeColor: string;
  isLast: boolean;
  dayNumber: number;
}) {
  const mapsUrl =
    item.googleMapsUrl ||
    (item.placeName
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.placeName)}`
      : null);

  return (
    <div className="flex gap-2">
      {/* Time column */}
      <div className="flex flex-col items-center flex-shrink-0 w-11">
        <span className="text-xs font-semibold text-[#6B7280] leading-tight pt-4 text-right w-full tabular-nums">
          {item.startTime || ''}
        </span>
      </div>

      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="w-2.5 h-2.5 rounded-full mt-4 flex-shrink-0 ring-2 ring-white shadow"
          style={{ backgroundColor: themeColor }}
        />
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-1"
            style={{ backgroundColor: `${themeColor}40`, minHeight: '24px' }}
          />
        )}
      </div>

      {/* Card */}
      <div className="flex-1 pb-5">
        <div className="bg-white rounded-2xl border border-[#F0EAE0] shadow-sm overflow-hidden mt-2">
          {/* Image */}
          {item.imageUrl && (
            <div className="relative w-full h-36">
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 512px) 100vw, 512px"
              />
            </div>
          )}
          <div className="p-4">
          {/* Icon + Title */}
          <div className="flex items-start gap-3 mb-2">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
              style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
            >
              <CategoryIcon category={item.category} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-[#1A2332] leading-snug">{item.title}</h3>
              {item.placeName && (
                <p className="text-xs text-[#6B7280] mt-0.5 flex items-center gap-1">
                  <MapPin size={11} />
                  {item.placeName}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-[#6B7280] mb-2 leading-relaxed">{item.description}</p>
          )}

          {/* Booking badge */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <BookingBadge status={item.bookingStatus} />
          </div>

          {/* Note */}
          {item.note && (
            <div className="bg-[#FAF7F2] rounded-lg px-3 py-2 mt-2">
              <p className="text-xs text-[#6B7280] leading-relaxed">💬 {item.note}</p>
            </div>
          )}

          {/* Ticket download */}
          {item.ticketUrl && (
            <a
              href={item.ticketUrl}
              download
              className="inline-flex items-center gap-1.5 text-xs font-medium mt-3 mr-2 px-3 py-1.5 rounded-lg border transition-colors duration-150 bg-[#EAF4EB] text-[#5A8A5C] border-[#C4DEC6]"
            >
              <Ticket size={12} />
              티켓 다운로드
            </a>
          )}

          {/* Map link */}
          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium mt-3 px-3 py-1.5 rounded-lg border transition-colors duration-150"
              style={{
                color: themeColor,
                borderColor: `${themeColor}50`,
                backgroundColor: `${themeColor}08`,
              }}
            >
              <MapPin size={12} />
              지도 보기
            </a>
          )}

          {/* Comments */}
          <Comments scheduleItemId={`day${dayNumber}-${item.id}`} themeColor={themeColor} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ dayNumber: string }>;
}) {
  const { dayNumber } = await params;
  const day = getDaySchedule(Number(dayNumber));

  if (!day) {
    notFound();
  }

  const dayColors: Record<number, string> = {
    1: '#C8A97E',
    2: '#4A6FA5',
    3: '#7BA05B',
    4: '#D97757',
  };

  const themeColor = dayColors[day.dayNumber] || day.themeColor;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Top nav */}
        <div className="flex items-center gap-3 mb-6">
          <Link
            href="/"
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#F0EAE0] shadow-sm hover:bg-[#FAF7F2] transition-colors"
          >
            <ArrowLeft size={18} className="text-[#1A2332]" />
          </Link>
          <div className="flex-1">
            <p className="text-xs text-[#6B7280]">
              {day.date.slice(5).replace('-', '/')} · {day.dayOfWeek}
            </p>
          </div>
        </div>

        {/* Day header */}
        <div
          className="rounded-2xl p-5 mb-6 text-white shadow-md"
          style={{ backgroundColor: themeColor }}
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm font-medium opacity-80 mb-1">Day {day.dayNumber}</p>
              <h1
                className="text-3xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-playfair-display), serif' }}
              >
                {day.title}
              </h1>
              <p className="text-sm opacity-80 mt-1">
                {day.date} · {day.dayOfWeek}
              </p>
            </div>
            <div className="text-5xl font-bold opacity-20 leading-none" style={{ fontFamily: 'var(--font-playfair-display), serif' }}>
              {day.dayNumber}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div>
          {day.items.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={item}
              themeColor={themeColor}
              isLast={index === day.items.length - 1}
              dayNumber={day.dayNumber}
            />
          ))}
        </div>

      </div>
    </main>
  );
}
