# 파리 여행 일정 관리 앱 (Paris Trip Planner)

## 1. 프로젝트 개요

### 1.1 목적
어머니(경애)와 이모님들(경숙, 경미, 경화)의 프랑스 파리 4박 5일 여행을 위한 **모바일 친화적 일정 관리 웹 앱**. 일정을 한눈에 보고, 지도로 위치를 확인하며, 여행 중 실시간으로 현재 일정을 추적할 수 있도록 한다.

### 1.2 사용자
- **주 사용자**: 50~60대 여성 4인 (경애, 경숙, 경미, 경화)
- **운영자**: 찬수 (일정 수정 권한)
- **디바이스**: 스마트폰 (iOS/Android) 우선, 데스크톱 보조

### 1.3 핵심 가치
1. **한눈에 보기 쉬움** — 큰 글씨, 명확한 아이콘, 직관적 네비게이션
2. **지도 연동** — 각 장소를 구글맵으로 바로 확인
3. **현지에서 바로 쓰는 도구** — 현재 진행 중인 일정 하이라이트, 다음 일정까지 남은 시간

---

## 2. 여행 기본 정보

| 항목 | 내용 |
|---|---|
| 여행지 | 프랑스 파리 |
| 기간 | 2026년 4월 24일(금) ~ 4월 27일(월) (실제 활동 기준) |
| 참여자 | 경애, 경숙, 경미, 경화 (4인) |
| 숙소 | Hôtel Mercure Paris Centre Tour Eiffel |
| 주요 테마 | 미술관 투어, 파리 랜드마크, 현지 맛집 |

---

## 3. 전체 일정 데이터

### Day 1 — 4/24(금) 도착일
| 시간 | 활동 | 장소 | 비고 |
|---|---|---|---|
| (오후) | 호텔 체크인 & 휴식 | Hôtel Mercure Paris Centre Tour Eiffel | — |
| (저녁) | 에펠탑 야경 감상 | 에펠탑 | — |

### Day 2 — 4/25(토) 미술관의 날
| 시간 | 활동 | 장소 | 비고 |
|---|---|---|---|
| 08:50 | 오르세 미술관 투어 (가이드랩) | 훈장 박물관 정문 앞 집결 (09:20) | 티켓 구매 완료 |
| 12:45 | 투어 종료 | — | — |
| 13:15 | 점심 (4인 예약 완료) | Les Antiquaires | 예약 완료 |
| 14:30 | 오랑주리 미술관 | Musée de l'Orangerie | — |
| 16:00 | 커피 타임 | (지정 카페) | — |
| 17:00 | 팔레 로얄 + 루브르 외관 | Palais Royal / Louvre | 외관 사진만 |
| 저녁 | 호텔 복귀 (시차 적응) | 호텔 | — |

### Day 3 — 4/26(일) 파리 클래식
| 시간 | 활동 | 장소 | 비고 |
|---|---|---|---|
| 09:00 | 생샤펠 | Sainte-Chapelle | 티켓 예약 완료 |
| 11:30 | 노트르담 대성당 | Cathédrale Notre-Dame | 티켓 예약 2일 전 오픈 |
| 13:00 | 점심 (4인 예약 완료) | L'Atelier de Joël Robuchon | 예약 완료 |
| 14:30 | 개선문 (식당 바로 앞) | Arc de Triomphe | — |
| — | 샹젤리제 거리 산책 | Champs-Élysées | — |

### Day 4 — 4/27(월) 몽마르트 & 현대미술
| 시간 | 활동 | 장소 | 비고 |
|---|---|---|---|
| 09:00 | 몽마르트 언덕 | Montmartre | — |
| — | 바게트 빵집 (상 받은 곳) | (지정 빵집) | 에클레어 맛있음 |
| — | 사크레쾨르 성당 | Basilique du Sacré-Cœur | 도보 이동 |
| — | 몽마르트 뮤지엄 (정원) | Musée de Montmartre | 정원 입장 + 커피 |
| 13:00 | 점심 — 한식당 이도 | Restaurant Ido | — |
| 15:00 | 파리시립현대미술관 | Musée d'Art Moderne de Paris | 무료 입장 |

---

## 4. 기술 스택

### 4.1 Frontend
- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS** — 모바일 우선 디자인
- **shadcn/ui** — 기본 컴포넌트
- **Lucide React** — 아이콘
- **Framer Motion** (선택) — 부드러운 전환 효과

### 4.2 Backend / DB
- **Supabase**
  - PostgreSQL DB
  - Row Level Security (RLS)
  - Realtime (일정 변경 실시간 반영)

### 4.3 지도
- **Google Maps Embed API** — 각 장소별 지도 임베드 (API 키 불필요한 iframe 방식 우선)
- **Google Maps JavaScript API** (옵션) — 전체 일정을 한 지도에 마커로 표시할 때

### 4.4 배포
- **Vercel** (Next.js 최적화)
- 도메인: 임시로 Vercel 서브도메인 사용 (예: `paris-2026-umma.vercel.app`)

---

## 5. 데이터 모델 (Supabase)

### 5.1 `trips` 테이블
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | — |
| title | text | "2026 파리 여행" |
| start_date | date | 2026-04-24 |
| end_date | date | 2026-04-27 |
| hotel_name | text | — |
| hotel_map_url | text | — |
| created_at | timestamptz | — |

### 5.2 `participants` 테이블
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | — |
| trip_id | uuid (FK) | — |
| name | text | 경애/경숙/경미/경화 |
| avatar_emoji | text | 🌸 🌷 🌼 🌺 |

### 5.3 `days` 테이블
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | — |
| trip_id | uuid (FK) | — |
| date | date | 2026-04-25 |
| day_number | int | 1, 2, 3, 4 |
| title | text | "미술관의 날" |
| theme_color | text | Tailwind 색상 토큰 |

### 5.4 `schedule_items` 테이블 (핵심)
| 컬럼 | 타입 | 설명 |
|---|---|---|
| id | uuid (PK) | — |
| day_id | uuid (FK) | — |
| start_time | time | 08:50 (nullable — 시간 미정일 경우) |
| end_time | time | 12:45 (nullable) |
| title | text | "오르세 미술관 투어" |
| description | text | 상세 설명 |
| place_name | text | "Musée d'Orsay" |
| google_maps_url | text | `https://maps.app.goo.gl/...` |
| latitude | float | (선택) |
| longitude | float | (선택) |
| category | enum | `museum` / `meal` / `landmark` / `cafe` / `transport` / `rest` |
| booking_status | enum | `booked` / `need_booking` / `not_required` |
| note | text | "티켓 예약 2일전 오픈" 등 |
| order_index | int | 정렬용 |

### 5.5 RLS 정책
- **읽기**: 익명 사용자도 가능 (가족만 URL 공유)
- **쓰기**: 찬수 계정(관리자)만 가능 — Supabase Auth 사용

---

## 6. 페이지 구조 & UX

### 6.1 `/` — 홈 (여행 대시보드)
- 헤더: "🇫🇷 파리 2026 · 4박 5일"
- 참여자 아바타 표시 (4명)
- **오늘의 일정** 카드 (여행 중이라면 현재 진행 중 강조)
- **D-Day 카운터** (여행 전이라면)
- 날짜별 카드 4개 (Day 1 ~ Day 4) — 탭하면 해당 날짜 상세로

### 6.2 `/day/[dayNumber]` — 일자별 상세
- 상단: 날짜, 요일, 테마
- 타임라인 형태의 일정 리스트
  - 각 카드: 시간 / 장소명 / 카테고리 아이콘 / 예약 상태 뱃지 / "지도 보기" 버튼
  - 탭하면 확장 — 설명, 임베디드 구글맵, 메모
- 하단 고정 버튼: "전체 지도 보기"

### 6.3 `/map` — 전체 지도
- 구글맵 위에 전체 일정의 장소 마커 표시
- 날짜별 색상 구분 (Day 2: 파랑, Day 3: 초록, Day 4: 주황 등)
- 마커 탭 → 해당 일정 카드 팝업

### 6.4 `/place/[id]` — 장소 상세 (선택)
- 큰 지도
- 장소명, 주소, 설명
- "구글맵 앱에서 열기" 딥링크 버튼
- 이전 / 다음 일정으로 이동

### 6.5 `/admin` — 관리자 (찬수 전용)
- Supabase Auth 로그인
- 일정 추가 / 수정 / 삭제 / 순서 변경
- CSV/JSON 일괄 업로드 (선택)

---

## 7. 디자인 가이드

### 7.1 무드
- **우아하고 차분한 파리 감성** — 크림 화이트 배경, 딥 네이비 강조색, 로즈 골드 포인트
- **큰 글씨** (본문 16px↑, 제목 20~24px) — 어머님 세대 가독성 우선
- **넉넉한 여백** — 터치 영역 최소 44px

### 7.2 컬러 팔레트 (초안)
```
배경        #FAF7F2 (크림)
메인 텍스트  #1A2332 (딥 네이비)
보조 텍스트  #6B7280
강조         #C8A97E (로즈 골드 / 샴페인)
Day 2 색상   #4A6FA5 (블루)
Day 3 색상   #7BA05B (그린)
Day 4 색상   #D97757 (테라코타)
예약 완료    #5A8A5C
예약 필요    #C68642
```

### 7.3 타이포그래피
- 한글: **Pretendard** 또는 **Noto Sans KR**
- 영문/숫자: **Playfair Display** (제목) + **Inter** (본문)
- 시간 표시: 고정폭 숫자 (`tabular-nums`)

### 7.4 아이콘 (카테고리별)
- 🎨 미술관/박물관
- 🍽️ 식사
- 🏛️ 랜드마크
- ☕ 카페
- 🚶 도보/이동
- 🛏️ 숙소/휴식

---

## 8. 핵심 기능 (MVP)

### Phase 1 (출발 전 완성)
- [x] 일정 데이터 Supabase 입력
- [ ] 홈 대시보드 (날짜별 카드)
- [ ] 일자별 상세 페이지 (타임라인)
- [ ] 장소별 구글맵 임베드
- [ ] 모바일 반응형
- [ ] 기본 디자인 적용

### Phase 2 (있으면 좋음)
- [ ] 전체 지도 페이지 (마커 + 경로)
- [ ] "현재 진행 중" 자동 하이라이트 (파리 현지 시간 기준)
- [ ] 다음 일정까지 남은 시간 카운터
- [ ] 관리자 페이지 (일정 수정)

### Phase 3 (나중에)
- [ ] 사진 업로드 (여행 중 각자 기록)
- [ ] 참여자별 체크인
- [ ] 지출 기록 / 정산
- [ ] 여행 후 "추억 앨범" 뷰

---

## 9. 기술적 고려사항

### 9.1 시간대 처리
- DB는 UTC 저장, 표시는 **파리 현지 시간** (`Europe/Paris`)
- 한국에서 확인할 때도 파리 시간 기준 표시 (혼선 방지)
- 현재 시각 판단 시 `Intl.DateTimeFormat` 사용

### 9.2 오프라인 대응
- 주요 일정 데이터를 `localStorage` 또는 PWA 캐시에 저장
- 구글맵 링크는 오프라인에서도 탭 시 앱으로 연결됨
- **PWA로 설치 가능하게** (홈 화면에 추가) → 어머님들이 아이콘 탭만으로 접근

### 9.3 성능
- 초기 로드 < 2초 (파리 현지 3G 환경 고려)
- 이미지 최적화 (Next.js `Image` 컴포넌트)
- 일정 데이터는 ISR(Incremental Static Regeneration) — 수정이 있을 때만 재생성

### 9.4 접근성
- 최소 글자 크기 16px
- 색상 대비 WCAG AA 준수
- 터치 타겟 최소 44×44px
- 스크린 리더 대응 (`aria-label`)

---

## 10. 프로젝트 구조 (제안)

```
paris-trip/
├── app/
│   ├── page.tsx                 # 홈
│   ├── day/[dayNumber]/page.tsx # 일자별
│   ├── map/page.tsx             # 전체 지도
│   ├── place/[id]/page.tsx      # 장소 상세
│   ├── admin/page.tsx           # 관리자
│   └── layout.tsx
├── components/
│   ├── ScheduleCard.tsx
│   ├── TimelineItem.tsx
│   ├── MapEmbed.tsx
│   ├── DayTab.tsx
│   ├── ParticipantAvatars.tsx
│   └── ui/                      # shadcn
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils/
│       ├── time.ts              # 파리 시간대 처리
│       └── categories.ts
├── types/
│   └── schedule.ts
├── public/
│   └── icons/
├── .env.local
│   ├── NEXT_PUBLIC_SUPABASE_URL
│   ├── NEXT_PUBLIC_SUPABASE_ANON_KEY
│   └── SUPABASE_SERVICE_ROLE_KEY
└── README.md
```

---

## 11. 다음 단계

1. **이 spec.md 리뷰 & 확정** ← 지금 단계
2. Supabase 프로젝트 생성 + 테이블 스키마 배포
3. 일정 데이터 시드 입력 (위 3번 섹션 기반)
4. Next.js 프로젝트 초기화 + shadcn/ui 셋업
5. 홈 + 일자별 페이지 구현
6. 디자인 적용
7. Vercel 배포 + 가족에게 URL 공유
8. (여행 전 최종 테스트)

---

## 12. 열린 질문

- [ ] 4/24 에펠탑 야경은 몇 시쯤으로 잡을지? (4월 말 파리 일몰 약 21:00)
- [ ] 4/26 오후 15:30 이후 일정은 비워둘지, 자유시간으로 표시할지?
- [ ] 4/27 오후 파리시립현대미술관 이후 일정(저녁 / 귀국 준비)은?
- [ ] 4/28 귀국일 일정도 포함할지? (공항 이동 시간 등)
- [ ] 어머님들이 직접 수정할 수 있는 기능도 필요할지? (아니면 찬수가 전담?)
- [ ] 긴급 연락처 / 숙소 주소 / 여권 사진 같은 "여행 필수 정보" 페이지도 만들지?
