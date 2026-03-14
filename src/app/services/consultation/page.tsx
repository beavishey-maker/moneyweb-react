import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import ConsultationForm from '@/components/forms/ConsultationForm';

const FAQ = [
  {
    q: 'どんな悩みでも相談できますか？',
    a: 'はい、漠然とした不安でも、具体的な数字の話でも歓迎です。「何から聞いていいかわからない」という状態でも、ヒアリングしながら整理していきますので、安心してお問い合わせください。',
  },
  {
    q: 'FPとキャリアコンサルタント、どちらの相談になりますか？',
    a: '渡辺はFP2級とキャリアコンサルタントの両方の資格を持っています。お金とキャリアは切り離せないことが多いため、ご状況に応じて両方の視点からアドバイスします。',
  },
  {
    q: 'オンラインと対面、どちらがおすすめですか？',
    a: 'どちらも同等の内容でご相談いただけます。書類を一緒に確認したい場合は対面が便利ですが、全国どこからでも参加できるオンラインも非常に人気です。',
  },
  {
    q: '相談前に準備することはありますか？',
    a: '初回は特に準備不要です。「今の状況を話したい」だけでも十分です。2回目以降は保険証券・年金定期便・家計の収支メモなどがあると話が深まりやすくなります。',
  },
  {
    q: 'ライフプラン包括コースとは何ですか？',
    a: 'キャッシュフロー表の作成、包括的なライフプランアドバイス、計3回のセッションが含まれるコースです（33,000円・税込）。一度でまとめて整理したい方に向いています。',
  },
  {
    q: '金融商品を勧められたり、商品を購入しなければいけませんか？',
    a: '一切ありません。特定の金融機関や保険会社とは一切関係なく、中立的な立場からのみアドバイスしています。購入や契約を求めることはありません。',
  },
  {
    q: '夫婦・カップルで参加できますか？',
    a: 'はい、ご夫婦・パートナーとのご参加も大歓迎です。家計や将来設計を二人で整理したい方に特におすすめです。追加料金はかかりません。',
  },
  {
    q: 'アドバイスに従わなければなりませんか？',
    a: 'いいえ、実行するかどうかはご自身の判断に完全に委ねています。相談後に何かを強制されることは一切ありません。',
  },
];

const FLOW = [
  { title: 'お問い合わせ', desc: 'フォームからご相談内容を送ってください。「なんとなく不安」でも大丈夫です。' },
  { title: '日程調整', desc: '2営業日以内にメールでご連絡し、ご都合の良い日時を調整します。' },
  { title: 'セッション実施（60分）', desc: 'オンラインまたは対面で、じっくりヒアリング＆アドバイスします。' },
  { title: 'フォローアップ', desc: '必要に応じてメールで補足資料をお送りします。継続的なサポートも可能です。' },
];

export default function ConsultationPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Service 02</p>
        <h1 className="page-hero__title">家計×キャリア<br />個別相談</h1>
        <p className="page-hero__desc">お金と働き方を同時に整理する、あなただけのオーダーメイドセッション。</p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ width: '100%', maxHeight: '480px', overflow: 'hidden', background: '#F4F3F0' }}>
        <Image
          src="/images/service-consultation.png"
          alt="家計×キャリア個別相談"
          width={1200}
          height={480}
          style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      <div className="container">

        {/* 概要 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Overview" title="このサービスについて" />
          </FadeIn>
          <FadeIn delay={100}>
            <p style={{ fontSize: 'var(--text-base)', fontWeight: '300', lineHeight: '2.2', color: 'var(--col-muted)', maxWidth: '700px' }}>
              扶養の壁・老後資金・転職・子育て費用…。「不安はあるけど、何から手をつければいいかわからない」という方のために、
              FP × キャリアコンサルタントの両方の視点から、あなたの状況に合ったアドバイスをします。
              数字が苦手な方も、知識がない方も、話せば一緒に整理できます。
            </p>
          </FadeIn>
        </section>

        {/* こんな方へ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="For you" title="こんな方へ" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                '「扶養の壁」が気になるが、自分で計算できない',
                '老後の資金が不安だが、何から始めればいいかわからない',
                '転職・起業・パートなど、働き方の変化を考えている',
                '住宅購入のタイミングを迷っている',
                '教育費と老後資金の両立が心配',
                '保険が多すぎて整理したい',
                '年金はいくらもらえるか把握していない',
                'ライフプラン全体を一緒に考えてほしい',
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

        {/* 相談できること */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Topics" title="相談できること" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-detail__inner">
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-gold)' }}>家計・お金の相談</h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>家計の現状分析と課題の整理</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>扶養内・外どちらが得か試算</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>老後資金のキャッシュフロー作成</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>教育費と老後資金の両立プラン</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>保険の見直しと最適化</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>iDeCo・NISAの始め方・活用法</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>住宅ローン・購入タイミングの検討</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-gold)' }}>キャリア・働き方の相談</h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>キャリアの棚卸しと強みの整理</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>働き方（正社員・パート・フリー）の選択肢整理</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>転職・起業時の収支シミュレーション</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ブランク後の復職・再就職プランニング</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>収入増加・副業の家計への影響試算</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>ライフプラン全体の方向性アドバイス</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* 相談の流れ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="How it works" title="相談の流れ" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-flow">
              {FLOW.map((item, i) => (
                <div key={i} className="service-flow__item">
                  <div className="service-flow__step">{String(i + 1).padStart(2, '0')}</div>
                  <div className="service-flow__body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 料金 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Pricing" title="料金" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ overflowX: 'auto' }}>
              <table className="service-compare-table">
                <thead>
                  <tr>
                    <th>プラン</th>
                    <th>内容</th>
                    <th>料金（税込）</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>単発セッション</strong></td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--col-muted)' }}>60分・1テーマに集中してアドバイス</td>
                    <td><strong style={{ fontSize: '1.1rem' }}>5,500 円</strong><span style={{ fontSize: '0.8rem', color: 'var(--col-muted)' }}> / 60分</span></td>
                  </tr>
                  <tr>
                    <td><strong>ライフプラン包括コース</strong></td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--col-muted)' }}>キャッシュフロー表作成＋包括的アドバイス＋3回のセッション込み</td>
                    <td><strong style={{ fontSize: '1.1rem' }}>33,000 円</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--col-muted)' }}>
              ※ 料金はすべて税込表示です。<br />
              ※ オンライン（全国対応）・対面（宮城県内）どちらも同一料金です。
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '220px', background: 'var(--col-neutral)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '1.25rem' }}>
                <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>💻 オンライン相談</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>ZoomまたはGoogle Meet使用。全国どこからでもご参加いただけます。</p>
              </div>
              <div style={{ flex: '1', minWidth: '220px', background: 'var(--col-neutral)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '1.25rem' }}>
                <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>🤝 対面相談</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>宮城県内、お客様ご指定の場所に伺います。</p>
              </div>
              <div style={{ flex: '1', minWidth: '220px', background: 'var(--col-neutral)', border: '1px solid rgba(0,0,0,0.07)', borderRadius: '12px', padding: '1.25rem' }}>
                <p style={{ fontWeight: '500', marginBottom: '0.5rem' }}>🕐 対応時間</p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>応相談。平日・土曜対応可。ご希望の日時をお知らせください。</p>
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
              <Link href="/services/seminar" style={{ textDecoration: 'none' }}>
                <div className="service-link-card">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--col-gold)', display: 'block', marginBottom: '0.5rem' }}>Service 03</span>
                  <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.75rem' }}>進学マネーセミナー</h3>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>子どもの教育費を「見える化」して老後資金と両立する</p>
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
            <SectionHeading label="Apply" title="相談を申し込む" desc="「何を相談すればいいかわからない」でも大丈夫。まずはお気軽にどうぞ。" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <ConsultationForm />
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
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>まずは、話してみませんか。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                「何を相談すればいいかわからない」でも大丈夫です。<br />
                ヒアリングしながら一緒に整理していきます。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">相談を申し込む</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
