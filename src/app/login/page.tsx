'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

 const sendMagicLink = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    setMsg('메일 보내는 중...');
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/login/callback`
          : undefined
      }
    });
    if (error) setMsg('에러: ' + error.message);
    else setMsg('메일을 확인하세요. 받은 편지함에서 링크 클릭!');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setMsg('로그아웃 완료');
  };

  return (
    <main className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">로그인</h1>
      <form onSubmit={sendMagicLink} className="space-y-3">
        <input className="border w-full p-2 rounded" placeholder="이메일 입력"
               value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="border px-4 py-2 rounded w-full">로그인 링크 받기</button>
      </form>
      <button onClick={logout} className="mt-4 text-sm underline">로그아웃</button>
      <div className="text-sm text-gray-600 mt-2">{msg}</div>
    </main>
  );
}
