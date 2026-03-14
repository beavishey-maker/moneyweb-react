'use client';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const STEPS = [
  { title: 'フォームからお問い合わせ', desc: '相談内容はざっくりで構いません。「なんとなく不安」でも大丈夫です。' },
  { title: 'メールで日程確認', desc: '2営業日以内にメールでご連絡し、ご都合の良い日時を調整します。' },
  { title: 'セッション・相談', desc: 'オンライン（全国対応）または対面（宮城県内・お客様ご指定の場所）でご相談いただけます。' },
];


export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // チェックボックス（複数選択）を配列で取得
    const payload = {
      name: data.get('name'),
      furigana: data.get('furigana'),
      email: data.get('email'),
      phone: data.get('phone'),
      contactMethod: data.get('contact-method'),
      message: data.get('message'),
      preferredDates: data.get('preferred-dates'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('送信失敗');
      setSubmitted(true);
    } catch (err) {
      console.error('送信エラー:', err);
      alert('送信に失敗しました。時間をおいてお試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Contact</p>
        <h1 className="page-hero__title">お問い合わせ・ご相談のご予約</h1>
        <p className="page-hero__desc">サービスへのお申し込み・ご質問・開催通知のご登録など、お気軽にどうぞ。</p>
      </div>

      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="How it works" title="相談の流れ" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="contact-steps">
              {STEPS.map((step, i) => (
                <div key={i} className="contact-step">
                  <div className="contact-step__num">{i + 1}</div>
                  <div className="contact-step__body">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="contact-layout">
              {/* フォーム */}
              <div>
                {submitted ? (
                  <div className="form-success">
                    <p className="form-success__emoji">✅</p>
                    <h3 className="form-success__title">送信が完了しました！</h3>
                    <p className="form-success__text">
                      2営業日以内にメールにてご連絡いたします。<br />
                      迷惑メールフォルダもご確認ください。
                    </p>
                    <a href="/" className="btn btn-outline" style={{ marginTop: '1.5rem' }}>
                      トップページへ戻る
                    </a>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="contact-form"
                  >
                    <input type="hidden" name="form-name" value="contact" />

                    {/* お名前 */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="name">
                        お名前 <span className="form-required">必須</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="form-input"
                        placeholder="例：渡辺 加奈子"
                      />
                    </div>

                    {/* ふりがな */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="furigana">
                        ふりがな <span className="form-required">必須</span>
                      </label>
                      <input
                        type="text"
                        id="furigana"
                        name="furigana"
                        required
                        className="form-input"
                        placeholder="例：わたなべ かなこ"
                      />
                    </div>

                    {/* メールアドレス */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="email">
                        メールアドレス <span className="form-required">必須</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="form-input"
                        placeholder="例：kanako@example.com"
                      />
                    </div>

                    {/* 電話番号 */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="phone">
                        電話番号 <span className="form-optional">任意</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-input"
                        placeholder="例：090-1234-5678"
                      />
                    </div>

                    {/* ご希望の相談方法 */}
                    <div className="form-group">
                      <p className="form-label">ご希望の相談方法 <span className="form-required">必須</span></p>
                      <div className="form-radio-group">
                        {['オンライン', '対面（宮城県内）', 'どちらでも可'].map((method) => (
                          <label key={method} className="form-radio-label">
                            <input type="radio" name="contact-method" value={method} required />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* ご相談内容・ご質問 */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">
                        ご相談内容・ご質問 <span className="form-optional">任意</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        rows={5}
                        placeholder="どんな些細なことでもお気軽にどうぞ。"
                      />
                    </div>

                    {/* ご希望の日程 */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="preferred-dates">
                        ご希望の日程 <span className="form-optional">任意</span>
                      </label>
                      <textarea
                        id="preferred-dates"
                        name="preferred-dates"
                        className="form-textarea"
                        rows={3}
                        placeholder="例：平日14時以降、土曜の午前中など"
                      />
                    </div>

                    {/* 同意チェック */}
                    <div className="form-group">
                      <label className="form-check-label">
                        <input type="checkbox" name="privacy" required />
                        <span>
                          <a href="/privacy" target="_blank" rel="noopener noreferrer">プライバシーポリシー</a>
                          に同意します（必須）
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary btn--lg form-submit"
                      disabled={isLoading}
                    >
                      {isLoading ? '送信中...' : '送信する'}
                    </button>
                  </form>
                )}
              </div>

              {/* サイドバー */}
              <div className="contact-sidebar">
                <div className="contact-info-card">
                  <h3>📧 メール対応</h3>
                  <p>2営業日以内にご返信します。日曜・祝日は翌営業日対応となります。</p>
                  <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--col-muted)' }}>対応時間：平日10:00〜19:00 / 土曜10:00〜17:00</p>
                </div>
                <div className="contact-info-card">
                  <h3>💻 オンライン相談</h3>
                  <p>ZoomまたはGoogle Meetを使用します。全国どこからでもご相談いただけます。</p>
                </div>
                <div className="contact-info-card">
                  <h3>✅ 安心してください</h3>
                  <p>金融商品の勧誘は一切ありません。お客様の情報はFPの倫理規定に基づき厳重に管理します。</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
