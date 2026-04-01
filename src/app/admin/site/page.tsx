'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { cmsGet, cmsPut } from '../_lib/api'

type SiteData = {
  hero: {
    eyebrow: string
    titleLine1: string
    titleEmphasis: string
    titleLine2: string
    subtitle: string
  }
  whyCards: { num: string; title: string; desc: string }[]
  topServices: {
    num: string
    title: string
    desc: string
    href: string
    badge: string
    comingSoon: boolean
  }[]
}

export default function AdminSitePage() {
  const router = useRouter()
  const [data, setData] = useState<SiteData | null>(null)
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!sessionStorage.getItem('cms_token')) { router.replace('/admin/login'); return }
    cmsGet('site').then(setData).catch(() => setMsg('読み込みに失敗しました'))
  }, [router])

  async function save() {
    if (!data) return
    setSaving(true)
    try {
      await cmsPut('site', data)
      setMsg('保存しました。Vercelが自動でリビルドします（約1〜2分）。')
    } catch { setMsg('保存に失敗しました') }
    finally { setSaving(false) }
  }

  function updateHero(key: keyof SiteData['hero'], value: string) {
    setData(d => d ? { ...d, hero: { ...d.hero, [key]: value } } : d)
  }

  function updateWhyCard(i: number, key: 'title' | 'desc', value: string) {
    setData(d => {
      if (!d) return d
      const cards = [...d.whyCards]
      cards[i] = { ...cards[i], [key]: value }
      return { ...d, whyCards: cards }
    })
  }

  function updateTopService(i: number, key: string, value: string | boolean) {
    setData(d => {
      if (!d) return d
      const svcs = [...d.topServices]
      svcs[i] = { ...svcs[i], [key]: value }
      return { ...d, topServices: svcs }
    })
  }

  if (!data) return <div style={{ padding: '2rem' }}>読み込み中…</div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf8f5', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* ヘッダー */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" style={{ fontSize: '0.85rem', color: '#888', textDecoration: 'none' }}>← ダッシュボード</Link>
            <h1 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.5rem', fontWeight: '300', color: '#2d2d2d' }}>サイト設定</h1>
          </div>
          <button onClick={save} disabled={saving} style={btnPrimary}>
            {saving ? '保存中…' : '保存する'}
          </button>
        </div>

        {msg && (
          <div style={{ padding: '0.75rem 1rem', background: '#f0faf4', border: '1px solid #a8d5b5', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#2d7a4f' }}>
            {msg} <button onClick={() => setMsg('')} style={{ marginLeft: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>×</button>
          </div>
        )}

        {/* ── ヒーローセクション ── */}
        <Section title="ヒーローセクション（トップページ上部）">
          <FormField label="eyebrow（小さい英語テキスト）" value={data.hero.eyebrow} onChange={v => updateHero('eyebrow', v)} />
          <FormField label="タイトル 1行目" value={data.hero.titleLine1} onChange={v => updateHero('titleLine1', v)} />
          <FormField label="強調テキスト（イタリック・中央行）" value={data.hero.titleEmphasis} onChange={v => updateHero('titleEmphasis', v)} />
          <FormField label="タイトル 3行目" value={data.hero.titleLine2} onChange={v => updateHero('titleLine2', v)} />
          <TextareaField
            label="サブタイトル（改行は↵Enterで反映）"
            value={data.hero.subtitle}
            onChange={v => updateHero('subtitle', v)}
            rows={3}
          />
        </Section>

        {/* ── 選ばれる3つの理由 ── */}
        <Section title="選ばれる3つの理由">
          {data.whyCards.map((card, i) => (
            <div key={card.num} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <p style={{ fontSize: '0.75rem', color: '#C4724A', marginBottom: '0.75rem', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.1em' }}>
                {card.num}
              </p>
              <FormField
                label="タイトル（改行は↵Enterで反映）"
                value={card.title}
                onChange={v => updateWhyCard(i, 'title', v)}
              />
              <TextareaField
                label="説明文"
                value={card.desc}
                onChange={v => updateWhyCard(i, 'desc', v)}
                rows={3}
              />
            </div>
          ))}
        </Section>

        {/* ── トップページ サービス一覧 ── */}
        <Section title="トップページ サービス一覧">
          <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.25rem' }}>
            ※ サービスページの詳細内容は「料金プラン管理」から編集できます
          </p>
          {data.topServices.map((svc, i) => (
            <div key={svc.num} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
              <p style={{ fontSize: '0.75rem', color: '#C4724A', marginBottom: '0.75rem', fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.1em' }}>
                {svc.num}
              </p>
              <FormField
                label="タイトル（改行は↵Enterで反映）"
                value={svc.title}
                onChange={v => updateTopService(i, 'title', v)}
              />
              <TextareaField
                label="説明文"
                value={svc.desc}
                onChange={v => updateTopService(i, 'desc', v)}
                rows={3}
              />
              <FormField label="バッジテキスト（例: 資格取得）" value={svc.badge} onChange={v => updateTopService(i, 'badge', v)} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="checkbox"
                  id={`cs-${i}`}
                  checked={svc.comingSoon}
                  onChange={e => updateTopService(i, 'comingSoon', e.target.checked)}
                />
                <label htmlFor={`cs-${i}`} style={{ fontSize: '0.85rem', color: '#555' }}>「準備中」表示にする</label>
              </div>
            </div>
          ))}
        </Section>

        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <button onClick={save} disabled={saving} style={btnPrimary}>
            {saving ? '保存中…' : '保存する'}
          </button>
        </div>

      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '16px', padding: '1.75rem', marginBottom: '1.5rem' }}>
      <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', fontWeight: '400', marginBottom: '1.25rem', color: '#2d2d2d' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function FormField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)} style={inputStyle as React.CSSProperties} />
    </div>
  )
}

function TextareaField({ label, value, onChange, rows = 3 }: { label: string; value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={labelStyle}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={{ ...inputStyle, resize: 'vertical' } as React.CSSProperties} />
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', color: '#555', marginBottom: '0.35rem' }
const inputStyle = { width: '100%', padding: '0.6rem 0.85rem', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '8px', fontSize: '0.9rem', boxSizing: 'border-box', background: '#fff' }
const btnPrimary: React.CSSProperties = { padding: '0.6rem 1.5rem', background: '#C4724A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }
