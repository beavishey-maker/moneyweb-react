'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const SECTIONS = [
  { href: '/admin/seminars', label: 'セミナー', desc: '開催情報の追加・編集・削除' },
  { href: '/admin/pricing', label: '料金プラン', desc: 'サービス料金の追加・編集・削除' },
  { href: '/admin/testimonials', label: 'お客様の声', desc: '口コミの追加・編集・公開管理' },
  { href: '/admin/news', label: 'お知らせ', desc: 'ニュースの追加・編集・削除' },
  { href: '/admin/profile', label: 'プロフィール', desc: 'プロフィール情報の編集' },
]

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) {
      router.replace('/admin/login')
    }
  }, [router])

  function logout() {
    sessionStorage.removeItem('cms_token')
    router.push('/admin/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C4724A', marginBottom: '0.25rem' }}>
              ADMIN
            </p>
            <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.75rem', fontWeight: '300', color: '#2d2d2d' }}>
              管理ダッシュボード
            </h1>
          </div>
          <button
            onClick={logout}
            style={{
              padding: '0.5rem 1.25rem',
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.2)',
              borderRadius: '8px',
              fontSize: '0.85rem',
              cursor: 'pointer',
              color: '#555',
            }}
          >
            ログアウト
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
          {SECTIONS.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#fff',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                padding: '1.75rem',
                transition: 'box-shadow 0.2s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
              >
                <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.1rem', fontWeight: '400', marginBottom: '0.5rem', color: '#2d2d2d' }}>
                  {s.label}
                </h2>
                <p style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.6' }}>{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
