'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsGet, cmsPost, cmsPut, cmsDelete } from '../_lib/api'

type Testimonial = {
  id: string
  name: string
  content: string
  service: string
  rating: number
  published: boolean
}

const EMPTY: Omit<Testimonial, 'id'> = {
  name: '', content: '', service: '', rating: 5, published: true,
}

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Testimonial[]>([])
  const [editing, setEditing] = useState<Testimonial | null>(null)
  const [form, setForm] = useState<Omit<Testimonial, 'id'>>(EMPTY)
  const [msg, setMsg] = useState('')
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) { router.replace('/admin/login'); return }
    load()
  }, [router])

  async function load() {
    try {
      const data = await cmsGet('testimonials')
      setItems(data.testimonials)
    } catch { setMsg('読み込みに失敗しました') }
  }

  function startNew() { setEditing(null); setForm(EMPTY); setIsNew(true) }

  function startEdit(item: Testimonial) {
    setEditing(item)
    setForm({ name: item.name, content: item.content, service: item.service, rating: item.rating, published: item.published })
    setIsNew(false)
  }

  function cancelForm() { setEditing(null); setIsNew(false) }

  async function save() {
    try {
      if (isNew) {
        await cmsPost('testimonials', form)
        setMsg('追加しました')
      } else if (editing) {
        await cmsPut('testimonials', { ...form, id: editing.id })
        setMsg('更新しました')
      }
      setEditing(null); setIsNew(false)
      await load()
    } catch { setMsg('保存に失敗しました') }
  }

  async function togglePublish(item: Testimonial) {
    try {
      await cmsPut('testimonials', { ...item, published: !item.published })
      setMsg(item.published ? '非公開にしました' : '公開しました')
      await load()
    } catch { setMsg('更新に失敗しました') }
  }

  async function remove(id: string) {
    if (!confirm('削除しますか？')) return
    try {
      await cmsDelete('testimonials', id)
      setMsg('削除しました')
      await load()
    } catch { setMsg('削除に失敗しました') }
  }

  const showForm = isNew || editing !== null

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>お客様の声 管理</h1>
        </div>

        {msg && (
          <div style={{ padding: '0.75rem 1rem', background: '#f0faf4', border: '1px solid #a8d5b5', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem', color: '#2d7a4f' }}>
            {msg} <button onClick={() => setMsg('')} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>
          </div>
        )}

        {!showForm && <button onClick={startNew} style={btnPrimary}>＋ 新規追加</button>}

        {showForm && (
          <div style={formCard}>
            <h2 style={formTitle}>{isNew ? '新規追加' : '編集'}</h2>
            <FormField label="お客様の属性（例: 40代 会社員）" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
            <FormField label="利用サービス" value={form.service} onChange={v => setForm(f => ({ ...f, service: v }))} />
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>評価（1〜5）</label>
              <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} style={inputStyle as React.CSSProperties}>
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>お客様の声（本文）</label>
              <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
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
                  <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: '400' }}>{item.name}</p>
                  <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', borderRadius: '20px', background: item.published ? '#e8f5ee' : '#f5f5f5', color: item.published ? '#2d7a4f' : '#888' }}>
                    {item.published ? '公開中' : '非公開'}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '0.25rem' }}>{item.service} · {'★'.repeat(item.rating)}</p>
                <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: '1.7' }}>{item.content}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '80px' }}>
                <button onClick={() => startEdit(item)} style={btnEdit}>編集</button>
                <button onClick={() => togglePublish(item)} style={{ ...btnEdit, background: item.published ? '#888' : '#4A7C59' }}>
                  {item.published ? '非公開' : '公開'}
                </button>
                <button onClick={() => remove(item.id)} style={btnDelete}>削除</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function FormField({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle as React.CSSProperties} />
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
