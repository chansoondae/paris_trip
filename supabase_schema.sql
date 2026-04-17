-- Supabase SQL Editor에 붙여넣어서 실행하세요

create table if not exists paris_comments (
  id uuid primary key default gen_random_uuid(),
  schedule_item_id text not null,   -- lib/data.ts의 ScheduleItem.id
  author text not null,             -- 작성자 이름 (자유 입력)
  body text not null,               -- 댓글 내용
  created_at timestamptz not null default now()
);

-- 읽기: 누구나 가능
alter table paris_comments enable row level security;

create policy "누구나 읽기 가능"
  on paris_comments for select
  using (true);

create policy "누구나 작성 가능"
  on paris_comments for insert
  with check (true);

create policy "본인 댓글 삭제 가능"
  on paris_comments for delete
  using (true);   -- 클라이언트에서 id로 삭제, 별도 인증 없음
