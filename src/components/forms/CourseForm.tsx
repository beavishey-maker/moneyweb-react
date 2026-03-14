'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function CourseForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);

    const payload = {
      service: '家計整理アドバイザー2級講座',
      name: data.get('name'),
      furigana: data.get('furigana'),
      email: data.get('email'),
      phone: data.get('phone'),
      fields: [
        { label: '受講形式', value: data.get('format') as string },
        { label: 'ご希望の日程', value: data.get('preferred-dates') as string || '' },
      ],
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
    } catch {
      alert('送信に失敗しました。時間をおいてお試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success">
        <p className="form-success__emoji">✅</p>
        <h3 className="form-success__title">お申し込みが完了しました！</h3>
        <p className="form-success__text">
          2営業日以内にメールにてご連絡いたします。<br />
          迷惑メールフォルダもご確認ください。
        </p>
        <a href="/" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
          トップページへ戻る
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label className="form-label" htmlFor="c-name">
          お名前 <span className="form-required">必須</span>
        </label>
        <input type="text" id="c-name" name="name" required className="form-input" placeholder="例：渡辺 加奈子" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="c-furigana">
          ふりがな <span className="form-required">必須</span>
        </label>
        <input type="text" id="c-furigana" name="furigana" required className="form-input" placeholder="例：わたなべ かなこ" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="c-email">
          メールアドレス <span className="form-required">必須</span>
        </label>
        <input type="email" id="c-email" name="email" required className="form-input" placeholder="例：kanako@example.com" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="c-phone">
          電話番号 <span className="form-optional">任意</span>
        </label>
        <input type="tel" id="c-phone" name="phone" className="form-input" placeholder="例：090-1234-5678" />
      </div>

      <div className="form-group">
        <p className="form-label">受講形式 <span className="form-required">必須</span></p>
        <div className="form-radio-group">
          {['オンライン（全国対応）', '対面（宮城県内）'].map((opt) => (
            <label key={opt} className="form-radio-label">
              <input type="radio" name="format" value={opt} required />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="c-dates">
          ご希望の日程 <span className="form-optional">任意</span>
        </label>
        <textarea
          id="c-dates"
          name="preferred-dates"
          className="form-textarea"
          rows={3}
          placeholder="例：平日14時以降、土曜の午前中など"
        />
      </div>

      <div className="form-group">
        <label className="form-check-label">
          <input type="checkbox" name="privacy" required />
          <span>
            <Link href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</Link>に同意します（必須）
          </span>
        </label>
      </div>

      <button type="submit" className="btn btn-primary btn--lg form-submit" disabled={isLoading}>
        {isLoading ? '送信中...' : '申し込む'}
      </button>
    </form>
  );
}
