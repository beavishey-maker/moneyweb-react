'use client';
import { useState } from 'react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';

const STEPS = [
  { title: 'フォームからお問い合わせ', desc: '相談内容は「なんとなく不安」程度で構いません。' },
  { title: 'プランナーからご連絡', desc: '2〜3営業日以内にメールでご連絡します。' },
  { title: '初回無料オンライン相談（60分・Zoom）', desc: '現状ヒアリングとお悩み整理を丁寧に行います。' },
  { title: '今後の流れをご提案', desc: '継続は任意です。無理なおすすめは一切しません。' },
];

const WORRY_CATS = [
  '家計の見直し・節約',
  '老後資金・年金',
  '教育費・子育て',
  '働き方・扶養の壁',
  '転職・副業・キャリア',
  'NISAやiDeCoなど投資',
  '家計整理アドバイザー講座',
  'その他',
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
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
        <h1 className="page-hero__title">お問い合わせ・無料相談のご予約</h1>
        <p className="page-hero__desc">初回60分無料。まずはお気軽にご相談ください。</p>
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
                      2〜3営業日以内にメールにてご連絡いたします。<br />
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

                    {/* 年代 */}
                    <div className="form-group">
                      <p className="form-label">年代</p>
                      <div className="form-radio-group">
                        {['30代', '40代', '50代', '60代以上'].map((age) => (
                          <label key={age} className="form-radio-label">
                            <input type="radio" name="age" value={age} />
                            <span>{age}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* お悩みカテゴリ */}
                    <div className="form-group">
                      <p className="form-label">お悩みカテゴリ（複数選択可）</p>
                      <div className="form-check-group">
                        {WORRY_CATS.map((cat) => (
                          <label key={cat} className="form-check-label">
                            <input type="checkbox" name="category" value={cat} />
                            <span>{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* ご相談内容 */}
                    <div className="form-group">
                      <label className="form-label" htmlFor="message">
                        ご相談内容 <span className="form-optional">任意</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-textarea"
                        rows={5}
                        placeholder="どんな些細なことでもお気軽にどうぞ。"
                      />
                    </div>

                    {/* 希望連絡方法 */}
                    <div className="form-group">
                      <p className="form-label">ご希望の連絡方法</p>
                      <div className="form-radio-group">
                        {['メール', 'ビデオ通話（Zoom等）'].map((method) => (
                          <label key={method} className="form-radio-label">
                            <input type="radio" name="contact-method" value={method} />
                            <span>{method}</span>
                          </label>
                        ))}
                      </div>
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
                  <p>2〜3営業日以内にご返信します。土日祝は翌営業日対応となります。</p>
                </div>
                <div className="contact-info-card">
                  <h3>💻 ビデオ通話</h3>
                  <p>Zoomを使ったオンライン相談に対応しています。全国どこからでもご相談いただけます。</p>
                </div>
                <div className="contact-info-card">
                  <h3>✅ 安心してください</h3>
                  <p>初回60分は完全無料。保険・金融商品の勧誘は一切ありません。怒ったり責めたりすることは、絶対にしません。</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
