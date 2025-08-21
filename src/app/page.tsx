import { supabase } from '@/lib/supabase';

export default async function Home() {
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id,title,created_at')
    .order('id', { ascending: false })
    .limit(50);

  if (error) {
    return <main className="max-w-xl mx-auto p-4">에러: {error.message}</main>;
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">커뮤니티</h1>
      <div className="flex gap-3 text-sm">
        <a className="underline" href="/login">로그인</a>
        <a className="underline" href="/write">글쓰기</a>
      </div>
      <ul className="space-y-3 mt-4">
        {(posts ?? []).map((p:any) => (
          <li key={p.id} className="border rounded p-3">
            <a href={`/post/${p.id}`} className="font-medium">{p.title}</a>
            <div className="text-xs text-gray-500">
              {new Date(p.created_at).toLocaleString('ko-KR')}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
