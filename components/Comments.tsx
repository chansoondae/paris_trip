'use client';

import { useEffect, useState, useTransition } from 'react';
import { supabase } from '@/lib/supabase/client';
import { MessageCircle, Trash2, Send } from 'lucide-react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // 저장된 이름 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(AUTHOR_KEY);
    if (saved) setAuthor(saved);
  }, []);

  // 댓글 불러오기
  useEffect(() => {
    if (!isOpen) return;

    async function load() {
      const { data } = await supabase
        .from('paris_comments')
        .select('*')
        .eq('schedule_item_id', scheduleItemId)
        .order('created_at', { ascending: true });
      if (data) setComments(data);
    }

    load();

    // 실시간 구독
    const channel = supabase
      .channel(`comments-${scheduleItemId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comments',
          filter: `schedule_item_id=eq.${scheduleItemId}`,
        },
        () => load()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isOpen, scheduleItemId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!author.trim() || !body.trim()) return;

    localStorage.setItem(AUTHOR_KEY, author.trim());

    startTransition(async () => {
      await supabase.from('paris_comments').insert({
        schedule_item_id: scheduleItemId,
        author: author.trim(),
        body: body.trim(),
      });
      setBody('');
    });
  }

  async function handleDelete(id: string) {
    await supabase.from('paris_comments').delete().eq('id', id);
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors duration-150"
        style={{
          color: themeColor,
          borderColor: `${themeColor}50`,
          backgroundColor: `${themeColor}08`,
        }}
      >
        <MessageCircle size={12} />
        메모 {comments.length > 0 ? `(${comments.length})` : ''}
      </button>

      {isOpen && (
        <div className="mt-3 space-y-3">
          {/* 댓글 목록 */}
          {comments.length > 0 ? (
            <ul className="space-y-2">
              {comments.map((c) => (
                <li
                  key={c.id}
                  className="bg-[#FAF7F2] rounded-xl px-3 py-2.5 flex items-start gap-2"
                >
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
              ))}
            </ul>
          ) : (
            <p className="text-xs text-[#6B7280] px-1">아직 메모가 없어요.</p>
          )}

          {/* 입력 폼 */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름 (예: 경애)"
              maxLength={20}
              className="w-full text-sm px-3 py-2 rounded-xl border border-[#E8E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 text-[#1A2332] placeholder:text-[#B0A99F]"
              style={{ '--tw-ring-color': `${themeColor}60` } as React.CSSProperties}
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="메모를 남겨요"
                maxLength={200}
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-[#E8E0D5] bg-white focus:outline-none focus:ring-2 focus:ring-offset-1 text-[#1A2332] placeholder:text-[#B0A99F]"
                style={{ '--tw-ring-color': `${themeColor}60` } as React.CSSProperties}
              />
              <button
                type="submit"
                disabled={isPending || !author.trim() || !body.trim()}
                className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl text-white transition-opacity disabled:opacity-40"
                style={{ backgroundColor: themeColor }}
              >
                <Send size={15} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
