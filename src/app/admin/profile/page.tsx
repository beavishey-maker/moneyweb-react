'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsPut } from '../_lib/api'
import ImageUpload from '../_lib/ImageUpload'
import defaultData from '@/data/profile.json'

export default function AdminProfilePage() {
  const router = useRouter()
  const [form, setForm] = useState(defaultData)
  const [qualsStr, setQualsStr] = useState(defaultData.qualifications.join('\n'))
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) router.replace('/admin/login')
  }, [router])

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const qualifications = qualsStr.split('\n').map(s => s.trim()).filter(Boolean)
      await cmsPut('profile', { ...form, qualifications })
      setMsg('保存しました。サイトは1〜2分後に反映されます。')
    } catch { setMsg('保存に失敗しました。GITHUB_TOKENが設定されているか確認してください。') }
    finally { setSaving(false) }
  }

  const isErr = msg.includes('失敗')

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>プロフィール編集</h1>
        </div>

        {msg && (
          <div style={{ padding: '0.75rem 1rem', background: isErr ? '#fdf0f0' : '#f0faf4', border: `1px solid ${isErr ? '#e0a0a0' : '#a8d5b5'}`, borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: isErr ? '#c0392b' : '#2d7a4f' }}>
            {msg} <button onClick={() => setMsg('')} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>
          </div>
        )}

        <form onSubmit={save} style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '1.75rem' }}>
          <ImageUpload
            label="プロフィール画像"
            currentUrl={form.profileImage}
            onUploaded={url => setForm(f => ({ ...f, profileImage: url }))}
          />
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
          <button type="submit" disabled={saving} style={btnPrimary}>
            {saving ? '保存中…' : '保存する'}
          </button>
        </form>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', color: '#555', marginBottom: '0.35rem' }
const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff' }
const btnPrimary: React.CSSProperties = { padding: '0.6rem 1.5rem', background: '#C4724A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
