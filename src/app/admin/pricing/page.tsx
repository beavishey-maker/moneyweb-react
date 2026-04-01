'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsPost, cmsPut, cmsDelete } from '../_lib/api'
import ImageUpload from '../_lib/ImageUpload'
import defaultData from '@/data/pricing.json'

type Plan = (typeof defaultData.plans)[number]

const EMPTY: Omit<Plan, 'id'> = {
  label: '', num: '', name: '', price: 0, priceLabel: '', priceNote: '',
  description: '', notes: [], tags: [], href: '', image: '', published: true,
}

export default function AdminPricingPage() {
  const router = useRouter()
  const [items, setItems] = useState<Plan[]>(defaultData.plans)
  const [editing, setEditing] = useState<Plan | null>(null)
  const [form, setForm] = useState<Omit<Plan, 'id'>>(EMPTY)
  const [tagsStr, setTagsStr] = useState('')
  const [notesStr, setNotesStr] = useState('')
  const [msg, setMsg] = useState('')
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) router.replace('/admin/login')
  }, [router])

  function startNew() {
    setEditing(null); setForm(EMPTY); setTagsStr(''); setNotesStr(''); setIsNew(true)
  }

  function startEdit(item: Plan) {
    setEditing(item)
    setForm({ label: item.label, num: item.num, name: item.name, price: item.price, priceLabel: item.priceLabel, priceNote: item.priceNote, description: item.description, notes: item.notes, tags: item.tags, href: item.href, image: item.image, published: item.published })
    setTagsStr(item.tags.join('、'))
    setNotesStr(item.notes.join('\n'))
    setIsNew(false)
  }

  function cancelForm() { setEditing(null); setIsNew(false) }

  async function save() {
    try {
      const tags = tagsStr.split(/[、,]/).map(s => s.trim()).filter(Boolean)
      const notes = notesStr.split('\n').map(s => s.trim()).filter(Boolean)
      const payload = { ...form, tags, notes }
      if (isNew) {
        const newItem = await cmsPost('pricing', payload)
        setItems(prev => [...prev, newItem])
        setMsg('追加しました。サイトは1〜2分後に反映されます。')
      } else if (editing) {
        const updated = await cmsPut('pricing', { ...payload, id: editing.id })
        setItems(prev => prev.map(p => p.id === editing.id ? updated : p))
        setMsg('更新しました。サイトは1〜2分後に反映されます。')
      }
      setEditing(null); setIsNew(false)
    } catch { setMsg('保存に失敗しました。GITHUB_TOKENが設定されているか確認してください。') }
  }

  async function remove(id: string) {
    if (!confirm('削除しますか？')) return
    try {
      await cmsDelete('pricing', id)
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
          <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>サービス詳細管理</h1>
        </div>

        {msg && <Msg text={msg} onClose={() => setMsg('')} />}
        {!showForm && <button onClick={startNew} style={btnPrimary}>＋ 新規追加</button>}

        {showForm && (
          <div style={formCard}>
            <h2 style={formTitle}>{isNew ? '新規サービス追加' : 'サービス編集'}</h2>
            <ImageUpload
              label="サービス画像"
              currentUrl={form.image}
              onUploaded={url => setForm(f => ({ ...f, image: url }))}
            />
            <FormField label="サービス名" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
            <FormField label="英語ラベル（例: Course）" value={form.label} onChange={v => setForm(f => ({ ...f, label: v }))} />
            <FormField label="料金表示（例: ¥5,500〜（税込））" value={form.priceLabel} onChange={v => setForm(f => ({ ...f, priceLabel: v }))} />
            <FormField label="料金補足（例: 単発60分〜）" value={form.priceNote} onChange={v => setForm(f => ({ ...f, priceNote: v }))} />
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>説明</label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>詳細（1行ごとに箇条書き）</label>
              <textarea value={notesStr} onChange={e => setNotesStr(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
            </div>
            <FormField label="タグ（読点区切り）" value={tagsStr} onChange={setTagsStr} placeholder="例: マンツーマン指導、オンライン全国対応" />
            <FormField label="リンク先（例: /services/course）" value={form.href} onChange={v => setForm(f => ({ ...f, href: v }))} />
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} />
              <label htmlFor="pub" style={{ fontSize: '0.85rem', color: '#555' }}>サービスページに表示する</label>
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
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: '400', marginBottom: '0.25rem' }}>{item.name}</p>
                <p style={{ fontSize: '0.85rem', color: '#C4724A' }}>{item.priceLabel}</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.priceNote}</p>
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

function FormField({ label, value, onChange, placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle as React.CSSProperties} />
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
