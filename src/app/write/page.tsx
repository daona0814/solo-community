'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [msg, setMsg] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setIsAuthed(!!data.user));
  }, []);

  const titleLeft = Math.max(0, 80 - title.length);
  const bodyLeft = Math.max(0, 5000 - body.length);
  const canSubmit = isAuthed && title.length > 0 && body.length > 0 && title.length <= 80 && body.length <= 5000 && !saving;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSaving(true);
    setMsg('저장 중...');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMsg('로그인이 필요합니다.'); setSaving(false); return; }

    const { error } = await supabase.from('posts').insert({ user_id: user.id, title, body });
    if (error) setMsg('에러: ' + error.message);
    else { setMsg('저장 완료!'); setTitle(''); setBody(''); }
    setSaving(false);
  };

  if (!isAuthed) {
    return (
      <section className="card p-6">
        <p>글쓰기는 로그인 후 가능합니다. <a href="/login" className="underline">로그인</a></p>
      </section>
    );
  }

  return (
    <section className="card p-6">
      <h1 className="text-xl font-semibold">글쓰기</h1>
      <form onSubmit={onSubmit} className="space-y-4 mt-4">
        <div>
          <input
            className="input"
            placeholder="제목(최대 80자)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />
          <div className="muted text-xs mt-1">남은 글자: {titleLeft}</div>
        </div>
        <div>
          <textarea
            className="textarea h-60"
            placeholder="내용(최대 5000자)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={5000}
          />
          <div className="muted text-xs mt-1">남은 글자: {bodyLeft}</div>
        </div>
        <button className="btn disabled:opacity-60" disabled={!canSubmit}>
          {saving ? '저장 중…' : '저장'}
        </button>
      </form>
      <div className="muted text-sm mt-3">{msg}</div>
    </section>
  );
}
