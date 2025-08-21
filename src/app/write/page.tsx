'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [body,  setBody]  = useState('');
  const [msg,   setMsg]   = useState('');
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setIsAuthed(!!data.user));
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    setMsg('저장 중...');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setMsg('로그인이 필요합니다.'); return; }

    const { error } = await supabase.from('posts').insert({
      user_id: user.id, title, body
    });

    if (error) setMsg('에러: ' + error.message);
    else { setMsg('저장 완료!'); setTitle(''); setBody(''); }
  };

  if (!isAuthed) {
    return (
      <main className="max-w-xl mx-auto p-4">
        <p>글쓰기는 로그인 후 가능합니다. <a href="/login" className="underline">로그인</a></p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">글쓰기</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="border w-full p-2 rounded" placeholder="제목(1~80자)"
               value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea className="border w-full p-2 rounded h-40" placeholder="내용(1~5000자)"
               value={body} onChange={e=>setBody(e.target.value)} />
        <button className="border px-4 py-2 rounded">저장</button>
      </form>
      <div className="text-sm text-gray-600 mt-2">{msg}</div>
    </main>
  );
}
