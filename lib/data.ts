import type { DaySchedule } from '@/types/schedule';

export const TRAVEL_START_DATE = '2026-04-24';
export const HOTEL_NAME = 'Hôtel Mercure Paris Centre Tour Eiffel';

export const PARTICIPANTS = [
  { name: '경애', emoji: '🌸' },
  { name: '경숙', emoji: '🌷' },
  { name: '경미', emoji: '🌼' },
  { name: '경화', emoji: '🌺' },
];

export const schedules: DaySchedule[] = [
  {
    dayNumber: 1,
    date: '2026-04-24',
    dayOfWeek: '금요일',
    title: '도착일',
    themeColor: '#C8A97E',
    items: [
      {
        id: 'day1-flight',
        startTime: '10:10',
        endTime: '18:10',
        title: '티웨이항공 TW0401 — 인천 → 파리',
        description: '인천 ICN → 파리 CDG / 비즈니스석 / 직항 15시간',
        placeName: 'Incheon International Airport (ICN)',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Incheon+International+Airport',
        category: 'flight',
        bookingStatus: 'booked',
        note: '티웨이항공 TW0401 · 비즈니스석 · 15시간 직항',
        imageUrl: '/images/incheon-airport.jpg',
      },
      {
        id: 'day1-0',
        startTime: '19:00',
        title: '공항 픽업 서비스',
        description: 'Klook 예약 — "Lee Sisters" 피켓을 들고 있는 기사님을 찾으세요',
        placeName: 'Charles de Gaulle Airport (CDG)',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Charles+de+Gaulle+Airport',
        category: 'car',
        bookingStatus: 'booked',
        note: '"Lee Sisters" 피켓 확인 후 탑승',
        imageUrl: '/images/cdg-airport.jpg',
      },
      {
        id: 'day1-1',
        title: '호텔 체크인 & 휴식',
        description: '파리 도착 후 호텔 체크인',
        placeName: HOTEL_NAME,
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+Mercure+Paris+Centre+Tour+Eiffel',
        category: 'rest',
        bookingStatus: 'booked',
        note: '짐 정리 후 충분한 휴식 취하기',
        imageUrl: '/images/hotel-mercure.jpg',
      },
      {
        id: 'day1-2',
        startTime: '21:00',
        title: '에펠탑 야경 감상',
        description: '파리 첫날 밤, 에펠탑의 황홀한 야경',
        placeName: 'Tour Eiffel',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Tour+Eiffel+Paris',
        category: 'landmark',
        bookingStatus: 'not_required',
        note: '매 정시에 5분간 반짝이는 조명쇼 감상 추천',
        imageUrl: '/images/eiffel-night.jpg',
      },
    ],
  },
  {
    dayNumber: 2,
    date: '2026-04-25',
    dayOfWeek: '토요일',
    title: '미술관의 날',
    themeColor: '#4A6FA5',
    items: [
      {
        id: 'day2-0',
        startTime: '07:00',
        title: '아침 — Maison du Pain',
        description: '오르세 투어 전 아침 식사',
        placeName: 'Maison du Pain',
        googleMapsUrl: 'https://maps.app.goo.gl/gks3qtYuVbrevVGi8',
        category: 'cafe',
        bookingStatus: 'not_required',
        note: '07:00 오픈',
        imageUrl: '/images/maison-du-pain.jpg',
      },
      {
        id: 'day2-1',
        startTime: '08:50',
        title: '오르세 미술관 가이드 투어',
        description: '가이드랩 투어 — 훈장 박물관 정문 앞 집결',
        placeName: 'Musée d\'Orsay',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Mus%C3%A9e+d%27Orsay+Paris',
        category: 'museum',
        bookingStatus: 'booked',
        note: '09:20 훈장 박물관 정문 앞 집결, 티켓 구매 완료 | 준비물: 물과 이어폰(3.5mm 둥근 단자, 미지참시 무상 대여)',
        imageUrl: '/images/musee-dorsay.jpg',
        ticketUrl: '/tickets/orsay-ticket.pdf',
      },
      {
        id: 'day2-2',
        startTime: '12:45',
        title: '투어 종료',
        category: 'transport',
        bookingStatus: 'not_required',
      },
      {
        id: 'day2-3',
        startTime: '13:15',
        title: '점심 — Les Antiquaires',
        description: '오르세 근처 레스토랑',
        placeName: 'Les Antiquaires Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Les+Antiquaires+Paris',
        category: 'meal',
        bookingStatus: 'booked',
        note: '예약 완료',
        imageUrl: '/images/les-antiquaires.jpg',
      },
      {
        id: 'day2-4',
        startTime: '14:30',
        title: '오랑주리 미술관',
        description: '모네의 수련 연작이 있는 미술관',
        placeName: 'Musée de l\'Orangerie',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Mus%C3%A9e+de+l%27Orangerie+Paris',
        category: 'museum',
        bookingStatus: 'not_required',
        imageUrl: '/images/orangerie.jpg',
      },
      {
        id: 'day2-5',
        startTime: '16:00',
        title: '커피 타임 — Verlet',
        description: '1880년부터 이어온 파리의 클래식 커피숍',
        placeName: 'Café Verlet Paris',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Caf%C3%A9+Verlet+Paris',
        category: 'cafe',
        bookingStatus: 'not_required',
        note: '팔레 로얄 바로 옆, 파리에서 가장 오래된 커피숍 중 하나',
        imageUrl: '/images/cafe-verlet.jpg',
      },
      {
        id: 'day2-6',
        startTime: '17:00',
        title: '팔레 로얄 + 루브르 외관',
        description: '팔레 로얄 정원 산책 & 루브르 외관 사진',
        placeName: 'Palais Royal Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Palais+Royal+Paris',
        category: 'landmark',
        bookingStatus: 'not_required',
        note: '루브르는 외관 사진만 (내부 투어 없음)',
        imageUrl: '/images/palais-royal.jpg',
      },
      {
        id: 'day2-7',
        title: '호텔 복귀',
        description: '시차 적응을 위해 일찍 복귀',
        placeName: HOTEL_NAME,
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=H%C3%B4tel+Mercure+Paris+Centre+Tour+Eiffel',
        category: 'rest',
        bookingStatus: 'not_required',
        note: '시차 적응 중 — 충분한 수면 권장',
        imageUrl: '/images/hotel-mercure.jpg',
      },
    ],
  },
  {
    dayNumber: 3,
    date: '2026-04-26',
    dayOfWeek: '일요일',
    title: '파리 클래식',
    themeColor: '#7BA05B',
    items: [
      {
        id: 'day3-1',
        startTime: '09:00',
        title: '생샤펠',
        description: '고딕 양식의 아름다운 스테인드글라스 성당',
        placeName: 'Sainte-Chapelle Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Sainte-Chapelle+Paris',
        category: 'landmark',
        bookingStatus: 'booked',
        note: '티켓 예약 완료',
        imageUrl: '/images/sainte-chapelle.jpg',
        ticketUrl: '/tickets/sainte-chapelle-ticket.pdf',
      },
      {
        id: 'day3-2',
        startTime: '11:30',
        title: '노트르담 대성당',
        description: '2019년 화재 후 재건된 파리의 상징',
        placeName: 'Cathédrale Notre-Dame de Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Cath%C3%A9drale+Notre-Dame+de+Paris',
        category: 'landmark',
        bookingStatus: 'need_booking',
        note: '티켓 예약 2일 전 오픈 — 여행 2일 전 확인 필요',
        imageUrl: '/images/notre-dame.jpg',
      },
      {
        id: 'day3-3',
        startTime: '13:00',
        title: '점심 — L\'Atelier de Joël Robuchon',
        description: '세계적 셰프 조엘 로뷔숑의 레스토랑',
        placeName: 'L\'Atelier de Joël Robuchon Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=L%27Atelier+de+Jo%C3%ABl+Robuchon+Paris',
        category: 'meal',
        bookingStatus: 'booked',
        note: '예약 완료',
        imageUrl: '/images/joel-robuchon.jpg',
      },
      {
        id: 'day3-4',
        startTime: '14:30',
        title: '개선문',
        description: '나폴레옹이 건설한 파리의 상징적 건축물',
        placeName: 'Arc de Triomphe Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Arc+de+Triomphe+Paris',
        category: 'landmark',
        bookingStatus: 'not_required',
        imageUrl: '/images/arc-de-triomphe.jpg',
      },
      {
        id: 'day3-5',
        title: '샹젤리제 거리 산책',
        description: '세계에서 가장 아름다운 거리 중 하나',
        placeName: 'Avenue des Champs-Élysées Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Avenue+des+Champs-%C3%89lys%C3%A9es+Paris',
        category: 'transport',
        bookingStatus: 'not_required',
        note: '쇼핑 & 카페 즐기기',
        imageUrl: '/images/champs-elysees.jpg',
      },
      {
        id: 'day3-7',
        startTime: '15:00',
        title: '파리시립현대미술관',
        description: '현대 미술 작품을 무료로 감상',
        placeName: 'Musée d\'Art Moderne de Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Mus%C3%A9e+d%27Art+Moderne+de+Paris',
        category: 'museum',
        bookingStatus: 'not_required',
        note: '무료 입장',
        imageUrl: '/images/musee-art-moderne.jpg',
      },
    ],
  },
  {
    dayNumber: 4,
    date: '2026-04-27',
    dayOfWeek: '월요일',
    title: '몽마르트 & 현대미술',
    themeColor: '#D97757',
    items: [
      {
        id: 'day4-1',
        startTime: '09:00',
        title: '몽마르트 언덕 가이드 투어 (가이드랩)',
        description: '파리 예술가들의 성지 — 가이드랩 투어',
        placeName: 'Métro Blanche (Ligne 2)',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Blanche+metro+station+Paris',
        category: 'landmark',
        bookingStatus: 'booked',
        note: '집결 장소: 지하철 2호선 Blanche 역 출구 앞 (단일 출구) | 준비물: 3.5mm 둥근단자 이어폰, 물, 개인 간식',
        imageUrl: '/images/montmartre.jpg',
      },
      {
        id: 'day4-2',
        title: '바게트 빵집',
        description: '상 받은 바게트 빵집 — 에클레어가 특히 맛있음',
        placeName: 'Boulangerie Montmartre Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=best+boulangerie+Montmartre+Paris',
        category: 'cafe',
        bookingStatus: 'not_required',
        note: '에클레어 꼭 맛보기!',
        imageUrl: '/images/boulangerie.jpg',
      },
      {
        id: 'day4-3',
        title: '사크레쾨르 성당',
        description: '몽마르트 언덕 정상의 하얀 성당',
        placeName: 'Basilique du Sacré-Cœur Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Basilique+du+Sacr%C3%A9-C%C5%93ur+Paris',
        category: 'landmark',
        bookingStatus: 'not_required',
        note: '도보 이동',
        imageUrl: '/images/sacre-coeur.jpg',
      },
      {
        id: 'day4-4',
        title: '몽마르트 뮤지엄 정원',
        description: '르누아르가 작업했던 곳 — 정원 입장 + 커피',
        placeName: 'Musée de Montmartre Paris',
        googleMapsUrl:
          'https://www.google.com/maps/search/?api=1&query=Mus%C3%A9e+de+Montmartre+Paris',
        category: 'museum',
        bookingStatus: 'not_required',
        note: '정원 입장 + 카페에서 커피 한 잔',
        imageUrl: '/images/musee-montmartre.jpg',
      },
      {
        id: 'day4-5',
        startTime: '13:00',
        title: '점심 — Sanukiya 우동 또는 한식당 Yido',
        description: '당일 분위기에 따라 선택!',
        category: 'meal',
        bookingStatus: 'not_required',
        imageUrl: '/images/restaurant-ido.jpg',
        additionalMaps: [
          { label: 'Sanukiya 우동', url: 'https://maps.app.goo.gl/5ZSGdo31BFLF1A6H7' },
          { label: '한식당 Yido', url: 'https://maps.app.goo.gl/J61mKzDQ7ChWkT318' },
        ],
      },
      {
        id: 'day4-6',
        title: '카페 — Les Deux Magots',
        description: '파리 생제르맹의 전설적인 카페. 바로 옆 Café de Flore도 좋아요 ☕',
        placeName: 'Les Deux Magots',
        googleMapsUrl: 'https://maps.app.goo.gl/Nbd6TS5oJonLo27aA',
        category: 'cafe',
        bookingStatus: 'not_required',
        imageUrl: '/images/les-deux-magots.jpg',
      },
    ],
  },
];

export function getDaySchedule(dayNumber: number): DaySchedule | undefined {
  return schedules.find((s) => s.dayNumber === dayNumber);
}

export function getDDayCount(): number {
  const today = new Date();
  const target = new Date(TRAVEL_START_DATE);
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return diff;
}
