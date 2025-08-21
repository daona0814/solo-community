import Link from 'next/link';
import { supabase } from '@/lib/supabase';

type PostRow = { id: number; title: string; created_at: string };

export default async function Home() {
  const { data, error } = await supabase
    .from('posts')
    .select('id,title,created_at')
    .order('id', { ascending: false })
    .limit(50);

  if (error) {
    return (
      <section className="card p-6">
        <h1 className="text-xl font-semibold">에러</h1>
        <p className="mt-2 text-red-600">{error.message}</p>
      </section>
    );
  }

  const posts = (data ?? []) as PostRow[];

  if (posts.length === 0) {
    return (
      <section className="card p-10 text-center">
        <h1 className="text-2xl font-bold">아직 글이 없어요</h1>
        <p className="muted mt-2">첫 번째 글을 작성해 커뮤니티를 시작해 보세요.</p>
        <div className="mt-6">
          <Link href="/write" className="btn">첫 글 작성하기</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      {posts.map((p) => (
        <article key={p.id} className="card p-5">
          <Link href={`/post/${p.id}`} className="block">
            <h2 className="text-lg font-semibold">{p.title}</h2>
            <div className="muted text-xs mt-1">{new Date(p.created_at).toLocaleString('ko-KR')}</div>
          </Link>
        </article>
      ))}
    </section>
  );
}
