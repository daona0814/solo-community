import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import PostComments from './post-comments';

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { data: post, error } = await supabase
    .from('posts')
    .select('id,title,body,created_at')
    .eq('id', id)
    .single();

  if (error || !post) {
    return <main className="card p-6">글을 찾을 수 없습니다.</main>;
  }

  return (
    <main className="space-y-4">
      <nav className="text-sm">
        <Link href="/" className="underline">← 목록</Link>
      </nav>

      <article className="card p-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="muted text-xs mt-1">{new Date(post.created_at).toLocaleString('ko-KR')}</div>
        <div className="prose max-w-none mt-4 whitespace-pre-wrap">{post.body}</div>
      </article>

      <article className="card p-6">
        <PostComments postId={post.id} />
      </article>
    </main>
  );
}
