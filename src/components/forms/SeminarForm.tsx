'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function SeminarForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);

    const payload = {
      service: '進学マネーセミナー',
      name: data.get('name'),
      furigana: data.get('furigana'),
      email: data.get('email'),
      phone: data.get('phone'),
      fields: [
        { label: 'お子さんの状況', value: data.get('child-info') as string || '' },
        { label: '参加形式', value: data.get('format') as string },
        { label: 'ご質問・ご要望', value: data.get('message') as string || '' },
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
        <h3 className="form-success__title">ご登録が完了しました！</h3>
        <p className="form-success__text">
          次回の開催日程が決まり次第、メールにてお知らせします。<br />
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
        <label className="form-label" htmlFor="s-name">
          お名前 <span className="form-required">必須</span>
        </label>
        <input type="text" id="s-name" name="name" required className="form-input" placeholder="例：渡辺 加奈子" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="s-furigana">
          ふりがな <span className="form-required">必須</span>
        </label>
        <input type="text" id="s-furigana" name="furigana" required className="form-input" placeholder="例：わたなべ かなこ" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="s-email">
          メールアドレス <span className="form-required">必須</span>
        </label>
        <input type="email" id="s-email" name="email" required className="form-input" placeholder="例：kanako@example.com" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="s-phone">
          電話番号 <span className="form-optional">任意</span>
        </label>
        <input type="tel" id="s-phone" name="phone" className="form-input" placeholder="例：090-1234-5678" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="s-child">
          お子さんの状況 <span className="form-optional">任意</span>
        </label>
        <input
          type="text"
          id="s-child"
          name="child-info"
          className="form-input"
          placeholder="例：小6・中2の2人 / 中3受験生 / 未就学児"
        />
      </div>

      <div className="form-group">
        <p className="form-label">参加形式 <span className="form-required">必須</span></p>
        <div className="form-radio-group">
          {['オンライン希望', '対面希望（宮城県内）', 'どちらでも可'].map((opt) => (
            <label key={opt} className="form-radio-label">
              <input type="radio" name="format" value={opt} required />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="s-message">
          ご質問・ご要望 <span className="form-optional">任意</span>
        </label>
        <textarea
          id="s-message"
          name="message"
          className="form-textarea"
          rows={4}
          placeholder="「奨学金について詳しく知りたい」「○月ごろに開催してほしい」などご自由にどうぞ。"
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
        {isLoading ? '送信中...' : '開催通知に登録する'}
      </button>
    </form>
  );
}
