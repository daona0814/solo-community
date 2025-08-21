import { supabase } from '@/lib/supabase';
import PostComments from './post-comments';

export default async function PostDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const { data: post, error } = await supabase
    .from('posts')
    .select('id,title,body,created_at')
    .eq('id', id)
    .single();

  if (error) {
    return <main className="max-w-xl mx-auto p-4">에러: {error.message}</main>;
  }
  if (!post) {
    return <main className="max-w-xl mx-auto p-4">글을 찾을 수 없습니다.</main>;
  }

  return (
    <main className="max-w-xl mx-auto p-4">
      <a href="/" className="underline text-sm">← 목록</a>
      <h1 className="text-2xl font-bold mt-2">{post.title}</h1>
      <div className="text-xs text-gray-500 mb-4">
        {new Date(post.created_at).toLocaleString('ko-KR')}
      </div>
      <article className="whitespace-pre-wrap">{post.body}</article>
      <hr className="my-6"/>
      <PostComments postId={post.id} />
    </main>
  );
}
