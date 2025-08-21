import './globals.css';
import Link from 'next/link';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnam = Be_Vietnam_Pro({
  // 베트남어 UI 대비: 베트남어+라틴 서브셋
  subsets: ['latin', 'vietnamese'],
  // 사용할 두께(필요한 것만 고르세요). 최소 1개는 필수!
  weight: ['400', '600', '700'],
  // FOUT 줄이기
  display: 'swap',
  // Tailwind에서 쓸 CSS 변수명
  variable: '--font-sans',
});

export const metadata = {
  title: 'Solo Community',
  description: 'Minimal community MVP (Next.js + Supabase)',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={beVietnam.variable}>
      <body className="bg-gradient-to-b from-slate-50 to-white text-slate-900 antialiased">
        {/* Header */}
        <header className="border-b bg-white/70 backdrop-blur sticky top-0 z-10">
          <div className="mx-auto max-w-3xl px-4 h-14 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight hover:opacity-90">
              Solo Community
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-slate-600 hover:text-slate-900">홈</Link>
              <Link href="/write" className="text-slate-600 hover:text-slate-900">글쓰기</Link>
              <Link href="/login" className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                로그인
              </Link>
            </nav>
          </div>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-3xl px-4 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t py-8 text-sm text-slate-500">
          <div className="mx-auto max-w-3xl px-4 flex items-center justify-between">
            <p>© {new Date().getFullYear()} Solo Community</p>
            <p>
              <a className="underline hover:text-slate-700" href="https://vercel.com">Vercel</a> ·{' '}
              <a className="underline hover:text-slate-700" href="https://supabase.com">Supabase</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

