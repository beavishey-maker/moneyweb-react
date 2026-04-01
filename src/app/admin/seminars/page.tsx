'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsPost, cmsPut, cmsDelete } from '../_lib/api'
import defaultData from '@/data/seminars.json'

type Seminar = (typeof defaultData.seminars)[number]

const EMPTY: Omit<Seminar, 'id'> = {
  title: '', date: '', time: '', location: '', capacity: 10,
  currentEnrollment: 0, status: 'open', description: '', price: 0,
}

export default function AdminSeminarsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Seminar[]>(defaultData.seminars)
  const [editing, setEditing] = useState<Seminar | null>(null)
  const [form, setForm] = useState<Omit<Seminar, 'id'>>(EMPTY)
  const [msg, setMsg] = useState('')
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) router.replace('/admin/login')
  }, [router])

  function startNew() { setEditing(null); setForm(EMPTY); setIsNew(true) }

  function startEdit(item: Seminar) {
    setEditing(item)
    setForm({ title: item.title, date: item.date, time: item.time, location: item.location, capacity: item.capacity, currentEnrollment: item.currentEnrollment, status: item.status, description: item.description, price: item.price })
    setIsNew(false)
  }

  function cancelForm() { setEditing(null); setIsNew(false) }

  async function save() {
    try {
      if (isNew) {
        const newItem = await cmsPost('seminars', form)
        setItems(prev => [...prev, newItem])
        setMsg('追加しました。サイトは1〜2分後に反映されます。')
      } else if (editing) {
        const updated = await cmsPut('seminars', { ...form, id: editing.id })
        setItems(prev => prev.map(s => s.id === editing.id ? updated : s))
        setMsg('更新しました。サイトは1〜2分後に反映されます。')
      }
      setEditing(null); setIsNew(false)
    } catch { setMsg('保存に失敗しました。GITHUB_TOKENが設定されているか確認してください。') }
  }

  async function remove(id: string) {
    if (!confirm('削除しますか？')) return
    try {
      await cmsDelete('seminars', id)
      setItems(prev => prev.filter(s => s.id !== id))
      setMsg('削除しました。')
    } catch { setMsg('削除に失敗しました。') }
  }

  const showForm = isNew || editing !== null

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>セミナー管理</h1>
        </div>

        {msg && <Msg text={msg} onClose={() => setMsg('')} />}
        {!showForm && <button onClick={startNew} style={btnPrimary}>＋ 新規追加</button>}

        {showForm && (
          <div style={formCard}>
            <h2 style={formTitle}>{isNew ? '新規セミナー追加' : 'セミナー編集'}</h2>
            <FormField label="タイトル" value={form.title} onChange={v => setForm(f => ({ ...f, title: v }))} />
            <FormField label="日付" value={form.date} onChange={v => setForm(f => ({ ...f, date: v }))} type="date" />
            <FormField label="時間（例: 10:00〜12:00）" value={form.time} onChange={v => setForm(f => ({ ...f, time: v }))} />
            <FormField label="場所" value={form.location} onChange={v => setForm(f => ({ ...f, location: v }))} />
            <FormField label="定員" value={String(form.capacity)} onChange={v => setForm(f => ({ ...f, capacity: Number(v) }))} type="number" />
            <FormField label="現在の申込数" value={String(form.currentEnrollment)} onChange={v => setForm(f => ({ ...f, currentEnrollment: Number(v) }))} type="number" />
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>ステータス</label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} style={inputStyle as React.CSSProperties}>
                <option value="open">受付中</option>
                <option value="closed">受付終了</option>
                <option value="cancelled">中止</option>
              </select>
            </div>
            <FormField label="料金（円）" value={String(form.price)} onChange={v => setForm(f => ({ ...f, price: Number(v) }))} type="number" />
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>説明</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
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
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: '400', marginBottom: '0.25rem' }}>{item.title}</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.date} {item.time} · {item.location} · ¥{item.price.toLocaleString()}</p>
                <p style={{ fontSize: '0.8rem', color: item.status === 'open' ? '#2d7a4f' : '#888', marginTop: '0.25rem' }}>
                  {item.status === 'open' ? '受付中' : item.status === 'closed' ? '受付終了' : '中止'} · {item.currentEnrollment}/{item.capacity}名
                </p>
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
const itemCard: React.CSSProperties = { background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }
const btnPrimary: React.CSSProperties = { padding: '0.6rem 1.5rem', background: '#C4724A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
const btnCancel: React.CSSProperties = { padding: '0.6rem 1.5rem', background: 'transparent', color: '#555', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
const btnEdit: React.CSSProperties = { padding: '0.4rem 1rem', background: '#4A7C59', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }
const btnDelete: React.CSSProperties = { padding: '0.4rem 1rem', background: 'transparent', color: '#c0392b', border: '1px solid #c0392b', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }
