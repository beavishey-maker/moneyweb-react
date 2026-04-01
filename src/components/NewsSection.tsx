import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeading from '@/components/ui/SectionHeading'
import newsData from '@/data/news.json'

const TYPE_LABEL: Record<string, string> = {
  news: 'お知らせ',
  seminar: 'セミナー',
}

const TYPE_COLOR: Record<string, React.CSSProperties> = {
  news: { background: 'rgba(196,114,74,0.12)', color: '#C4724A' },
  seminar: { background: 'rgba(74,124,89,0.12)', color: '#4A7C59' },
}

export default function NewsSection() {
  const posts = newsData.posts
    .filter(p => p.published)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 5)

  if (posts.length === 0) return null

  return (
    <section className="section section--white">
      <div className="container">
        <FadeIn>
          <SectionHeading en="News" jp="新着情報" />
        </FadeIn>
        <FadeIn delay={100}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {posts.map((post, i) => {
              const type = (post as { type?: string }).type ?? 'news'
              const linkUrl = (post as { linkUrl?: string }).linkUrl ?? ''
              const badgeStyle: React.CSSProperties = {
                display: 'inline-block',
                fontSize: '0.7rem',
                fontWeight: '400',
                letterSpacing: '0.05em',
                padding: '0.2rem 0.7rem',
                borderRadius: '20px',
                flexShrink: 0,
                ...(TYPE_COLOR[type] ?? TYPE_COLOR.news),
              }
              const inner = (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto auto 1fr',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.25rem 0',
                  borderBottom: i < posts.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--col-muted)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                    {post.publishedAt}
                  </span>
                  <span style={badgeStyle}>{TYPE_LABEL[type] ?? type}</span>
                  <span style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-body)', lineHeight: '1.7', ...(linkUrl ? { textDecoration: 'underline', textUnderlineOffset: '3px' } : {}) }}>
                    {post.title}
                  </span>
                </div>
              )

              return linkUrl ? (
                <Link key={post.id} href={linkUrl} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {inner}
                </Link>
              ) : (
                <div key={post.id}>{inner}</div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
