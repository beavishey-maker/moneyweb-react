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
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Netlify Forms はデプロイ後に実際に動作します
    setSubmitted(true);
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
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>✅</p>
                    <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.3rem', color: 'var(--color-dark)', marginBottom: '0.75rem' }}>
                      お問い合わせを受け付けました
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-dark)', opacity: 0.7, lineHeight: 1.9 }}>
                      2〜3営業日以内にご連絡いたします。<br />
                      しばらくお待ちください。
                    </p>
                  </div>
                ) : (
                  <form
                    name="contact"
                    method="POST"
                    data-netlify="true"
                    className="contact-form"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />

                    <div className="form-group">
                      <label className="form-label">
                        お名前<span className="req">必須</span>
                      </label>
                      <input type="text" name="name" className="form-input" placeholder="山田 花子" required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        メールアドレス<span className="req">必須</span>
                      </label>
                      <input type="email" name="email" className="form-input" placeholder="example@email.com" required />
                    </div>

                    <div className="form-group">
                      <label className="form-label">年代</label>
                      <div className="form-radio-group">
                        {['30代', '40代', '50代', '60代以上'].map(age => (
                          <label key={age} className="form-radio-label">
                            <input type="radio" name="age" value={age} />
                            {age}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">お悩みのカテゴリ（複数選択可）</label>
                      <div className="form-check-group">
                        {WORRY_CATS.map(cat => (
                          <label key={cat} className="form-check-label">
                            <input type="checkbox" name="category" value={cat} />
                            {cat}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">ご相談内容（任意）</label>
                      <textarea
                        name="message"
                        className="form-textarea"
                        placeholder="「なんとなく不安」「何から始めればいい？」など、どんな内容でも構いません。"
                        rows={5}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">希望連絡方法</label>
                      <div className="form-radio-group">
                        {['メール', 'ビデオ通話（Zoom）'].map(method => (
                          <label key={method} className="form-radio-label">
                            <input type="radio" name="contact_method" value={method} />
                            {method}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-agree-label">
                        <input
                          type="checkbox"
                          required
                          checked={agreed}
                          onChange={e => setAgreed(e.target.checked)}
                        />
                        <span>
                          <a href="/privacy" style={{ color: 'var(--color-primary)' }}>プライバシーポリシー</a>に同意する
                          <span className="req" style={{ marginLeft: '0.4rem' }}>必須</span>
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="form-submit-btn"
                      disabled={!agreed}
                    >
                      送信する
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
