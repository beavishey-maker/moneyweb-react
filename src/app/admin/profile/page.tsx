'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsGet, cmsPut } from '../_lib/api'

type Profile = {
  name: string
  title: string
  bio: string
  qualifications: string[]
  area: string
}

export default function AdminProfilePage() {
  const router = useRouter()
  const [form, setForm] = useState<Profile>({ name: '', title: '', bio: '', qualifications: [], area: '' })
  const [qualsStr, setQualsStr] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) { router.replace('/admin/login'); return }
    cmsGet('profile').then(data => {
      setForm(data)
      setQualsStr((data.qualifications as string[]).join('\n'))
    }).catch(() => setMsg('読み込みに失敗しました'))
  }, [router])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    try {
      const qualifications = qualsStr.split('\n').map(s => s.trim()).filter(Boolean)
      await cmsPut('profile', { ...form, qualifications })
      setMsg('保存しました')
    } catch { setMsg('保存に失敗しました') }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>プロフィール編集</h1>
        </div>

        {msg && (
          <div style={{ padding: '0.75rem 1rem', background: '#f0faf4', border: '1px solid #a8d5b5', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: '#2d7a4f' }}>
            {msg} <button onClick={() => setMsg('')} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>
          </div>
        )}

        <form onSubmit={save} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '1.75rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>氏名</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle as React.CSSProperties} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>肩書き</label>
            <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle as React.CSSProperties} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>活動エリア</label>
            <input type="text" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} style={inputStyle as React.CSSProperties} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={labelStyle}>プロフィール本文</label>
            <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={labelStyle}>資格・認定（1行に1つ）</label>
            <textarea value={qualsStr} onChange={e => setQualsStr(e.target.value)} rows={6} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
          </div>
          <button type="submit" style={btnPrimary}>保存</button>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', color: '#555', marginBottom: '0.35rem' }
const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff' }
const btnPrimary: React.CSSProperties = { padding: '0.6rem 1.5rem', background: '#C4724A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
