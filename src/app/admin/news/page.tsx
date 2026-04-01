'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsPost, cmsPut, cmsDelete } from '../_lib/api'
import defaultData from '@/data/news.json'

type Post = (typeof defaultData.posts)[number] & { type: string; linkUrl: string }

const EMPTY: Omit<Post, 'id'> = {
  title: '', body: '', publishedAt: new Date().toISOString().slice(0, 10), published: true, type: 'news', linkUrl: '',
}

export default function AdminNewsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Post[]>(defaultData.posts)
  const [editing, setEditing] = useState<Post | null>(null)
  const [form, setForm] = useState<Omit<Post, 'id'>>(EMPTY)
  const [msg, setMsg] = useState('')
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) router.replace('/admin/login')
  }, [router])

  function startNew() {
    setEditing(null)
    setForm({ ...EMPTY, publishedAt: new Date().toISOString().slice(0, 10) })
    setIsNew(true)
  }

  function startEdit(item: Post) {
    setEditing(item)
    setForm({ title: item.title, body: item.body, publishedAt: item.publishedAt, published: item.published, type: (item as Post).type ?? 'news', linkUrl: (item as Post).linkUrl ?? '' })
    setIsNew(false)
  }

  function cancelForm() { setEditing(null); setIsNew(false) }

  async function save() {
    try {
      if (isNew) {
        const newItem = await cmsPost('news', form)
        setItems(prev => [...prev, newItem])
        setMsg('追加しました。サイトは1〜2分後に反映されます。')
      } else if (editing) {
        const updated = await cmsPut('news', { ...form, id: editing.id })
        setItems(prev => prev.map(p => p.id === editing.id ? updated : p))
        setMsg('更新しました。サイトは1〜2分後に反映されます。')
      }
      setEditing(null); setIsNew(false)
    } catch { setMsg('保存に失敗しました。GITHUB_TOKENが設定されているか確認してください。') }
  }

  async function remove(id: string) {
    if (!confirm('削除しますか？')) return
    try {
      await cmsDelete('news', id)
      setItems(prev => prev.filter(p => p.id !== id))
      setMsg('削除しました。')
    } catch { setMsg('削除に失敗しました。') }
  }

  const showForm = isNew || editing !== null

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>お知らせ管理</h1>
        </div>

        {msg && <Msg text={msg} onClose={() => setMsg('')} />}
        {!showForm && <button onClick={startNew} style={btnPrimary}>＋ 新規追加</button>}

        {showForm && (
          <div style={formCard}>
            <h2 style={formTitle}>{isNew ? '新規お知らせ追加' : '編集'}</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>種別</label>
              <select value={(form as Post).type ?? 'news'} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} style={inputStyle as React.CSSProperties}>
                <option value="news">お知らせ</option>
                <option value="seminar">セミナー</option>
              </select>
            </div>
            <FormField label="タイトル" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
            <FormField label="公開日" value={form.publishedAt} onChange={v => setForm(f => ({ ...f, publishedAt: v }))} type="date" />
            <FormField label="リンクURL（任意）" value={(form as Post).linkUrl ?? ''} onChange={v => setForm(f => ({ ...f, linkUrl: v }))} />
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>本文</label>
              <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={5} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
            </div>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
              <label htmlFor="pub" style={{ fontSize: '0.85rem', color: '#555' }}>公開する</label>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={save} style={btnPrimary}>保存</button>
              <button onClick={cancelForm} style={btnCancel}>キャンセル</button>
            </div>
          </div>
        )}

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.map(item => (
            <div key={item.id} style={itemCard}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: '400' }}>{item.title}</p>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: (item as Post).type === 'seminar' ? '#e8f5ee' : '#fdf0e8', color: (item as Post).type === 'seminar' ? '#2d7a4f' : '#C4724A' }}>
                    {(item as Post).type === 'seminar' ? 'セミナー' : 'お知らせ'}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: item.published ? '#e8f5ee' : '#f5f5f5', color: item.published ? '#2d7a4f' : '#888' }}>
                    {item.published ? '公開中' : '非公開'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.publishedAt}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '0.25rem', lineHeight: '1.7' }}>{item.body.slice(0, 80)}{item.body.length > 80 ? '…' : ''}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => startEdit(item)} style={btnEdit}>編集</button>
                <button onClick={() => remove(item.id)} style={btnDelete}>削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={inputStyle as React.CSSProperties} />
    </div>
  )
}

function Msg({ text, onClose }: { text: string; onClose: () => void }) {
  const isErr = text.includes('失敗')
  return (
    <div style={{ padding: '0.75rem 1rem', background: isErr ? '#fdf0f0' : '#f0faf4', border: `1px solid ${isErr ? '#e0a0a0' : '#a8d5b5'}`, borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: isErr ? '#c0392b' : '#2d7a4f' }}>
      {text} <button onClick={onClose} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', color: '#555', marginBottom: '0.35rem' }
const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff' }
const formCard: React.CSSProperties = { background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }
const formTitle: React.CSSProperties = { fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', fontWeight: '400', marginBottom: '1.25rem', color: '#2d2d2d' }
const itemCard: React.CSSProperties = { background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem' }
const btnPrimary: React.CSSProperties = { padding: '0.6rem 1.5rem', background: '#C4724A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
const btnCancel: React.CSSProperties = { padding: '0.6rem 1.5rem', background: 'transparent', color: '#555', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
const btnEdit: React.CSSProperties = { padding: '0.4rem 1rem', background: '#4A7C59', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }
const btnDelete: React.CSSProperties = { padding: '0.4rem 1rem', background: 'transparent', color: '#c0392b', border: '1px solid #c0392b', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }
