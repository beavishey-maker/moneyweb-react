import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import SeminarForm from '@/components/forms/SeminarForm';

const FAQ = [
  {
    q: '子どもはまだ小さいですが、参加してもいいですか？',
    a: 'はい、むしろ早いうちから参加されることをおすすめします。教育費は積み立て期間が長いほど負担が少なくなります。子どもが小学生以下でも、今から計画を立てることで大きな安心感を得られます。',
  },
  {
    q: '奨学金について詳しく知りたいのですが、扱っていますか？',
    a: 'はい、給付型・貸与型の違い、返済シミュレーション、利息の試算、奨学金に頼りすぎないための家計計画まで、具体的に解説します。',
  },
  {
    q: 'セミナーはオンラインですか？対面ですか？',
    a: 'オンライン（Zoom）と対面（宮城県内）の両方を予定しています。開催形式や日程はお問い合わせいただくか、開催通知にご登録ください。',
  },
  {
    q: '一人でも参加できますか？夫婦での参加は可能ですか？',
    a: 'どちらも歓迎です。ご夫婦・パートナーと一緒に参加されると、教育費の考え方を共有しやすくなります。',
  },
  {
    q: '個別の状況についても相談できますか？',
    a: 'セミナーはグループ形式のため、個別相談の時間は限られます。より詳しく個別のキャッシュフローを確認したい場合は、家計×キャリア個別相談をご利用ください。',
  },
  {
    q: '金融商品の販売はありますか？',
    a: '一切ありません。特定の教育ローンや保険商品を勧めることはなく、中立的な情報提供のみを行います。',
  },
];

const CONTENTS = [
  {
    title: '教育費の全体像をつかむ',
    desc: '中学・高校・大学の入学金・授業料・生活費を、国公立・私立・理系・文系別に比較。総額がいくらになるか、リアルな数字で把握します。',
    icon: '📊',
  },
  {
    title: '奨学金の種類と賢い活用法',
    desc: '給付型・貸与型（第一種・第二種）の違いと返済シミュレーション。奨学金に過度に頼らないための事前計画も解説します。',
    icon: '🎓',
  },
  {
    title: '教育ローンの活用と注意点',
    desc: '国の教育ローン・民間ローンの比較、金利・返済方法の違い。緊急時の資金としての使い方と、借りすぎないための基準を学びます。',
    icon: '🏦',
  },
  {
    title: '教育費を「積み立てる」仕組み',
    desc: 'ジュニアNISA・学資保険・定期預金などの比較。今の収入でいくらずつ積み立てれば間に合うか、逆算して計算します。',
    icon: '💰',
  },
  {
    title: '老後資金と教育費の両立',
    desc: '教育費のピーク時期と老後の貯蓄をどう並立させるか。家計全体のキャッシュフローを俯瞰して、無理のない計画を立てます。',
    icon: '⚖️',
  },
];

export default function SeminarPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Service 03</p>
        <h1 className="page-hero__title">進学マネー<br />セミナー</h1>
        <p className="page-hero__desc">子どもの教育費を「見える化」して、老後資金との両立を実現する。</p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ width: '100%', maxHeight: '480px', overflow: 'hidden', background: '#F4F3F0' }}>
        <Image
          src="/images/service-seminar.png"
          alt="進学マネーセミナー"
          width={1200}
          height={480}
          style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      <div className="container">

        {/* こんな悩み、ありませんか？ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="For you" title="こんな不安、ありませんか？" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                '子どもの大学費用が全然足りない気がする',
                '奨学金を使うべきか、借りすぎないか不安',
                '教育費と老後資金、どちらを優先すべきか迷っている',
                '国公立か私立か、費用面でどれくらい違うのか知りたい',
                '毎月いくら積み立てれば大丈夫か計算できない',
                '今から間に合うのか、正直わからない',
              ].map((text, i) => (
                <div key={i} style={{
                  background: 'var(--col-neutral)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '12px',
                  padding: '1.25rem 1.5rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.75rem',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '300',
                  lineHeight: '1.7',
                }}>
                  <span style={{ color: 'var(--col-gold)', fontSize: '1rem', lineHeight: '1.7', flexShrink: 0 }}>✓</span>
                  {text}
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* セミナーで学べること */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Contents" title="セミナーで学べること" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {CONTENTS.map((item, i) => (
                <div key={i} style={{
                  display: 'grid',
                  gridTemplateColumns: '3rem 1fr',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: 'var(--col-neutral)',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '16px',
                }}>
                  <div style={{ fontSize: '1.75rem', lineHeight: '1' }}>{item.icon}</div>
                  <div>
                    <h4 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.5rem' }}>
                      {String(i + 1).padStart(2, '0')}. {item.title}
                    </h4>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.8' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* セミナー概要 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Overview" title="セミナー概要" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-detail__inner">
              <div>
                <div className="service-price-box">
                  <p><strong>開催形式：</strong>少人数制（オンライン・対面）</p>
                  <p><strong>所要時間：</strong>約2時間</p>
                  <p><strong>開催日程：</strong><span style={{ color: 'var(--col-muted)', fontSize: '0.9rem' }}>近日公開予定</span></p>
                  <p><strong>参加費：</strong><span style={{ color: 'var(--col-muted)', fontSize: '0.9rem' }}>近日公開予定</span></p>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                  開催スケジュールは随時更新します。通知をご希望の方はお問い合わせフォームから
                  「進学マネーセミナーの開催通知希望」とお送りください。
                </p>
                <Link href="/contact" className="btn btn-primary">開催通知を受け取る</Link>
              </div>
              <div style={{
                background: 'var(--col-neutral)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(0,0,0,0.07)',
              }}>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-body)' }}>
                  このセミナーを受けると…
                </p>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>子どもの進路別に、いくら必要かがわかる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>今から毎月いくら積み立てれば間に合うかがわかる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>奨学金・教育ローンを正しく理解して選べる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>老後資金との両立プランの考え方が身につく</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>漠然とした不安が、具体的な行動に変わる</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* FAQ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="FAQ" title="よくある質問" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="faq-list">
              {FAQ.map((item, i) => (
                <details key={i} className="faq-item">
                  <summary className="faq-item__question" style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Q. {item.q}</span>
                    <span className="faq-item__icon">+</span>
                  </summary>
                  <div className="faq-item__answer">
                    A. {item.a}
                  </div>
                </details>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 個別相談への誘導 */}
        <section className="section">
          <FadeIn>
            <div style={{
              background: 'linear-gradient(135deg, #F4F3F0 0%, #FAFAF8 100%)',
              border: '1px solid rgba(184,151,90,0.2)',
              borderRadius: '20px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              textAlign: 'center',
            }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--col-gold)', marginBottom: '1rem' }}>
                MORE DETAILS
              </p>
              <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-xl)', fontWeight: '300', marginBottom: '1rem' }}>
                個別の状況を詳しく相談したい方へ
              </h3>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '2', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                セミナーではカバーしきれない個別のキャッシュフロー作成や、
                お子さんの進路に合わせた詳細な費用シミュレーションは、
                「家計×キャリア個別相談」でご対応しています。
              </p>
              <Link href="/services/consultation" className="btn btn-outline">個別相談を見る</Link>
            </div>
          </FadeIn>
        </section>

        {/* 他のサービスへ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Other Services" title="他のサービス" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
              <Link href="/services/course" style={{ textDecoration: 'none' }}>
                <div className="service-link-card">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--col-gold)', display: 'block', marginBottom: '0.5rem' }}>Service 01</span>
                  <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.75rem' }}>家計整理アドバイザー2級講座</h3>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>計算が苦手でも大丈夫。一生使えるお金の管理スキルを習得</p>
                </div>
              </Link>
              <Link href="/services/consultation" style={{ textDecoration: 'none' }}>
                <div className="service-link-card">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--col-gold)', display: 'block', marginBottom: '0.5rem' }}>Service 02</span>
                  <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.75rem' }}>家計×キャリア個別相談</h3>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>お金と働き方を同時に整理するオーダーメイドのセッション</p>
                </div>
              </Link>
            </div>
          </FadeIn>
        </section>

      </div>

      {/* 申し込みフォーム */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Register" title="開催通知に登録する" desc="次回開催が決まり次第、いち早くメールでお知らせします。" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <SeminarForm />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section--dark">
        <div className="container">
          <div className="cta-section">
            <FadeIn>
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Contact</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>開催通知を受け取りましょう。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                次回の進学マネーセミナーの日程が決まり次第、<br />
                ご登録いただいた方にいち早くお知らせします。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">開催通知を受け取る</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
