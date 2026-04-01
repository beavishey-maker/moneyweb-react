'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/cms/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        sessionStorage.setItem('cms_token', token)
        router.push('/admin')
      } else {
        setError('トークンが正しくありません。')
      }
    } catch {
      setError('接続に失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#faf8f5',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2.5rem',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.3em', color: '#C4724A', marginBottom: '0.5rem' }}>
          ADMIN
        </p>
        <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', marginBottom: '2rem', color: '#2d2d2d' }}>
          管理画面ログイン
        </h1>

        <form onSubmit={handleSubmit}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>
            アクセストークン
          </label>
          <input
            type="password"
            value={token}
            onChange={e => setToken(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: '8px',
              fontSize: '0.9rem',
              marginBottom: '1rem',
              outline: 'none',
              boxSizing: 'border-box',
            }}
          />

          {error && (
            <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: '1rem' }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#C4724A',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontFamily: "'Noto Serif JP', serif",
            }}
          >
            {loading ? '確認中…' : 'ログイン'}
          </button>
        </form>
      </div>
    </div>
  )
}
