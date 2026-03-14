'use client';
import { useState } from 'react';
import Link from 'next/link';

const TOPICS = [
  '家計管理の見直し',
  '扶養・働き方の検討',
  '老後・年金の準備',
  '教育費・子育て',
  'ライフプラン総合',
  'キャリアの方向性',
  'その他',
];

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const data = new FormData(e.currentTarget);
    const topics = data.getAll('topic') as string[];

    const payload = {
      service: '家計×キャリア個別相談',
      name: data.get('name'),
      furigana: data.get('furigana'),
      email: data.get('email'),
      phone: data.get('phone'),
      fields: [
        { label: 'ご相談テーマ', value: topics.join('、') || 'なし' },
        { label: '希望プラン', value: data.get('plan') as string },
        { label: '相談方法', value: data.get('method') as string },
        { label: 'ご希望の日程', value: data.get('preferred-dates') as string || '' },
        { label: 'ご相談内容・ご質問', value: data.get('message') as string || '' },
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
        <label className="form-label" htmlFor="co-name">
          お名前 <span className="form-required">必須</span>
        </label>
        <input type="text" id="co-name" name="name" required className="form-input" placeholder="例：渡辺 加奈子" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="co-furigana">
          ふりがな <span className="form-required">必須</span>
        </label>
        <input type="text" id="co-furigana" name="furigana" required className="form-input" placeholder="例：わたなべ かなこ" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="co-email">
          メールアドレス <span className="form-required">必須</span>
        </label>
        <input type="email" id="co-email" name="email" required className="form-input" placeholder="例：kanako@example.com" />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="co-phone">
          電話番号 <span className="form-optional">任意</span>
        </label>
        <input type="tel" id="co-phone" name="phone" className="form-input" placeholder="例：090-1234-5678" />
      </div>

      <div className="form-group">
        <p className="form-label">ご相談テーマ <span className="form-optional">任意</span>（複数選択可）</p>
        <div className="form-check-group">
          {TOPICS.map((t) => (
            <label key={t} className="form-check-label">
              <input type="checkbox" name="topic" value={t} />
              <span>{t}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <p className="form-label">希望プラン <span className="form-required">必須</span></p>
        <div className="form-radio-group">
          <label className="form-radio-label">
            <input type="radio" name="plan" value="単発セッション（¥5,500 / 60分）" required />
            <span>単発セッション（¥5,500 / 60分）</span>
          </label>
          <label className="form-radio-label">
            <input type="radio" name="plan" value="ライフプラン包括コース（¥33,000）" />
            <span>ライフプラン包括コース（¥33,000・3回セッション込み）</span>
          </label>
          <label className="form-radio-label">
            <input type="radio" name="plan" value="まだ決めていない" />
            <span>まだ決めていない</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <p className="form-label">相談方法 <span className="form-required">必須</span></p>
        <div className="form-radio-group">
          {['オンライン（全国対応）', '対面（宮城県内）', 'どちらでも可'].map((opt) => (
            <label key={opt} className="form-radio-label">
              <input type="radio" name="method" value={opt} required />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="co-dates">
          ご希望の日程 <span className="form-optional">任意</span>
        </label>
        <textarea
          id="co-dates"
          name="preferred-dates"
          className="form-textarea"
          rows={3}
          placeholder="例：平日14時以降、土曜の午前中など"
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="co-message">
          ご相談内容・ご質問 <span className="form-optional">任意</span>
        </label>
        <textarea
          id="co-message"
          name="message"
          className="form-textarea"
          rows={4}
          placeholder="どんな些細なことでもお気軽にどうぞ。「なんとなく不安」でも大丈夫です。"
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
        {isLoading ? '送信中...' : '相談を申し込む'}
      </button>
    </form>
  );
}
