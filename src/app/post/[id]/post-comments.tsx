'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// 댓글 레코드 타입을 명시합니다.
type CommentRow = { id: number; body: string; created_at: string };

export default function PostComments({ postId }: { postId: number }) {
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [body, setBody] = useState<string>('');
  const [msg, setMsg] = useState<string>('');
  const [user, setUser] = useState<{ id: string } | null>(null);

  // 의존성 경고를 피하려고 useCallback으로 감싸고, deps에 postId만 둡니다.
  const load = useCallback(async (): Promise<void> => {
    const { data, error } = await supabase
      .from('comments')
      .select('id,body,created_at')
      .eq('post_id', postId)
      .order('id', { ascending: false });

    if (!error) setComments((data as CommentRow[]) ?? []);
  }, [postId]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user ?? null);
      await load();
    })();
  }, [load]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!user) { setMsg('로그인이 필요합니다.'); return; }
    if (!body.trim()) return;

    setMsg('저장 중...');
    const { error } = await supabase.from('comments').insert({
      post_id: postId,
      user_id: user.id,
      body
    });
    if (error) setMsg('에러: ' + error.message);
    else {
      setMsg('저장 완료!');
      setBody('');
      await load();
    }
  };

  const onDelete = async (id: number): Promise<void> => {
    setMsg('삭제 중...');
    const { error } = await supabase.from('comments').delete().eq('id', id);
    if (error) setMsg('에러: ' + error.message);
    else {
      setMsg('삭제 완료!');
      await load();
    }
  };

  return (
    <section>
      <h2 className="font-bold mb-2">댓글</h2>
      <form onSubmit={onSubmit} className="space-y-2 mb-4">
        <textarea
          className="border w-full p-2 rounded h-24"
          placeholder="댓글을 입력하세요"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button className="border px-4 py-2 rounded">등록</button>
      </form>
      <div className="text-sm text-gray-600 mb-2">{msg}</div>
      <ul className="space-y-3">
        {comments.map((c: CommentRow) => (
          <li key={c.id} className="border p-3 rounded">
            <div className="whitespace-pre-wrap">{c.body}</div>
            <div className="text-xs text-gray-500 flex justify-between mt-2">
              <span>{new Date(c.created_at).toLocaleString('ko-KR')}</span>
              {user && (
                <button onClick={() => onDelete(c.id)} className="underline">삭제</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
