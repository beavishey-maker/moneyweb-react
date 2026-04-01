'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import FadeIn from '@/components/ui/FadeIn'
import SectionHeading from '@/components/ui/SectionHeading'
import newsData from '@/data/news.json'

const TYPE_LABEL: Record<string, string> = {
  news: 'お知らせ',
  seminar: 'セミナー・イベント',
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

  const [openId, setOpenId] = useState<string | null>(null)

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
              const isOpen = openId === post.id

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

              return (
                <div
                  key={post.id}
                  style={{
                    borderBottom: i < posts.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {/* タイトル行（クリッカブル） */}
                  <button
                    onClick={() => setOpenId(isOpen ? null : post.id)}
                    style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: 'auto auto 1fr auto',
                      alignItems: 'center',
                      gap: '1.25rem',
                      padding: '1.25rem 0',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--col-muted)', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                      {post.publishedAt}
                    </span>
                    <span style={badgeStyle}>{TYPE_LABEL[type] ?? type}</span>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-body)', lineHeight: '1.7' }}>
                      {post.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--col-muted)', transition: 'transform 0.2s', display: 'inline-block', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  </button>

                  {/* 本文（アコーディオン） */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="body"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 0 1.5rem 0' }}>
                          <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '2', whiteSpace: 'pre-line' }}>
                            {post.body}
                          </p>
                          {linkUrl && (
                            <Link
                              href={linkUrl}
                              style={{
                                display: 'inline-block',
                                marginTop: '1rem',
                                fontSize: 'var(--text-sm)',
                                color: '#C4724A',
                                textDecoration: 'underline',
                                textUnderlineOffset: '3px',
                                fontWeight: '400',
                              }}
                            >
                              詳しくはこちら →
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
