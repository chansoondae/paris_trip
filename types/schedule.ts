export type Category = 'museum' | 'meal' | 'landmark' | 'cafe' | 'transport' | 'rest' | 'flight' | 'car';
export type BookingStatus = 'booked' | 'need_booking' | 'not_required';

export interface ScheduleItem {
  id: string;
  startTime?: string;
  endTime?: string;
  title: string;
  description?: string;
  placeName?: string;
  googleMapsUrl?: string;
  category: Category;
  bookingStatus: BookingStatus;
  note?: string;
  imageUrl?: string;
  ticketUrl?: string;
  additionalTickets?: { label: string; url: string }[];
  additionalMaps?: { label: string; url: string }[];
}

export interface DaySchedule {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  title: string;
  themeColor: string;
  items: ScheduleItem[];
}
