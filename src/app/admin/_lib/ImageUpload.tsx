'use client'

import { useState, useRef } from 'react'
import { getToken } from './api'

type Props = {
  label: string
  currentUrl: string
  onUploaded: (url: string) => void
}

export default function ImageUpload({ label, currentUrl, onUploaded }: Props) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
        body: form,
      })
      if (!res.ok) throw new Error(`upload failed: ${res.status}`)
      const { url } = await res.json()
      onUploaded(url)
    } catch (err: any) {
      setError('アップロードに失敗しました。BLOB_READ_WRITE_TOKENが設定されているか確認してください。')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={{ display: 'block', fontSize: '0.8rem', color: '#555', marginBottom: '0.5rem' }}>
        {label}
      </label>

      {/* プレビュー */}
      {currentUrl && (
        <div style={{ marginBottom: '0.75rem' }}>
          <img
            src={currentUrl}
            alt="現在の画像"
            style={{ width: '100%', maxWidth: '320px', height: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}
          />
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.25rem', wordBreak: 'break-all' }}>
            {currentUrl.startsWith('http') ? '✓ アップロード済み' : '現在のデフォルト画像'}
          </p>
        </div>
      )}

      {/* アップロードボタン */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
          style={{ display: 'none' }}
          id={`upload-${label}`}
        />
        <label
          htmlFor={`upload-${label}`}
          style={{
            padding: '0.5rem 1.25rem',
            background: uploading ? '#ccc' : '#4A7C59',
            color: '#fff',
            borderRadius: '8px',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
            display: 'inline-block',
          }}
        >
          {uploading ? 'アップロード中…' : '画像を選択・変更'}
        </label>
        {uploading && <span style={{ fontSize: '0.8rem', color: '#888' }}>アップロード中…</span>}
      </div>

      {error && (
        <p style={{ fontSize: '0.8rem', color: '#c0392b', marginTop: '0.5rem' }}>{error}</p>
      )}
    </div>
  )
}
