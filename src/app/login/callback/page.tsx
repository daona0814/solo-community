'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function CallbackPage() {
  const [msg, setMsg] = useState('로그인 처리 중...');

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      setMsg('로그인 완료! 이제 글쓰기를 해보세요.');
    });
  }, []);

  return (
    <main className="max-w-sm mx-auto p-4">
      <h1 className="text-xl font-bold mb-2">로그인</h1>
      <p>{msg}</p>
      <Link href="/" className="underline text-sm mt-4 inline-block">홈으로</Link>
    </main>
  );
}
