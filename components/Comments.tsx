'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase/client';
import { PARTICIPANTS } from '@/lib/data';
import { Trash2, Send, PenLine, ChevronUp } from 'lucide-react';

interface Comment {
  id: string;
  schedule_item_id: string;
  author: string;
  body: string;
  created_at: string;
}

interface CommentsProps {
  scheduleItemId: string;
  themeColor: string;
}

const AUTHOR_KEY = 'paris_comment_author';

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ko-KR', {
    timeZone: 'Europe/Paris',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Comments({ scheduleItemId, themeColor }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(AUTHOR_KEY);
    if (saved) setAuthor(saved);
  }, []);

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('paris_comments')
      .select('*')
      .eq('schedule_item_id', scheduleItemId)
      .order('created_at', { ascending: true });
    if (data) setComments(data);
  }, [scheduleItemId]);

  useEffect(() => {
    load();

    const channel = supabase
      .channel(`comments-${scheduleItemId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'paris_comments',
          filter: `schedule_item_id=eq.${scheduleItemId}`,
        },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [scheduleItemId, load]);

  function selectAuthor(name: string) {
    setAuthor(name);
    localStorage.setItem(AUTHOR_KEY, name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author || !body.trim()) return;

    setIsPending(true);
    await supabase.from('paris_comments').insert({
      schedule_item_id: scheduleItemId,
      author,
      body: body.trim(),
    });
    setBody('');
    await load();
    setIsPending(false);
    setFormOpen(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('메모를 삭제할까요?')) return;
    await supabase.from('paris_comments').delete().eq('id', id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  const selectedParticipant = PARTICIPANTS.find((p) => p.name === author);

  return (
    <div className="mt-3 space-y-2">
      {/* 댓글 목록 — 항상 표시 */}
      {comments.length > 0 && (
        <ul className="space-y-1.5">
          {comments.map((c) => {
            const participant = PARTICIPANTS.find((p) => p.name === c.author);
            return (
              <li
                key={c.id}
                className="bg-[#FAF7F2] rounded-xl px-3 py-2.5 flex items-start gap-2"
              >
                {participant && (
                  <span className="text-base flex-shrink-0 mt-0.5">{participant.emoji}</span>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-xs font-semibold text-[#1A2332]">{c.author}</span>
                    <span className="text-[10px] text-[#6B7280]">{formatTime(c.created_at)}</span>
                  </div>
                  <p className="text-sm text-[#1A2332] mt-0.5 leading-snug break-words">{c.body}</p>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-shrink-0 p-1 rounded-lg text-[#6B7280] hover:text-red-400 hover:bg-red-50 transition-colors"
                  aria-label="삭제"
                >
                  <Trash2 size={13} />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {/* 입력 폼 토글 버튼 */}
      <button
        onClick={() => setFormOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150"
        style={{
          color: themeColor,
          borderColor: `${themeColor}50`,
          backgroundColor: `${themeColor}08`,
        }}
      >
        {formOpen ? <ChevronUp size={12} /> : <PenLine size={12} />}
        {formOpen ? '접기' : '메모 쓰기'}
      </button>

      {/* 입력 폼 */}
      {formOpen && (
        <form onSubmit={handleSubmit} className="space-y-2 pt-1">
          <div className="flex gap-2">
            {PARTICIPANTS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => selectAuthor(p.name)}
                className="flex-1 flex flex-col items-center gap-1 py-2 rounded-xl border-2 transition-all duration-150"
                style={
                  author === p.name
                    ? { borderColor: themeColor, backgroundColor: `${themeColor}12` }
                    : { borderColor: '#E8E0D5', backgroundColor: 'white' }
                }
              >
                <span className="text-xl">{p.emoji}</span>
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: author === p.name ? themeColor : '#6B7280' }}
                >
                  {p.name}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={selectedParticipant ? `${selectedParticipant.emoji} 메모를 남겨요` : '먼저 이름을 선택해주세요'}
              maxLength={200}
              className="flex-1 text-sm px-3 py-2 rounded-xl border border-[#E8E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 text-[#1A2332] placeholder:text-[#B0A99F]"
              style={{ '--tw-ring-color': `${themeColor}60` } as React.CSSProperties}
            />
            <button
              type="submit"
              disabled={isPending || !author || !body.trim()}
              className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-white transition-opacity disabled:opacity-40"
              style={{ backgroundColor: themeColor }}
            >
              <Send size={15} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
