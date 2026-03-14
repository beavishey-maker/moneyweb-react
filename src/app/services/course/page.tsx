import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import CourseForm from '@/components/forms/CourseForm';

const FAQ = [
  {
    q: '金融や家計の知識がなくても受講できますか？',
    a: 'はい、まったく問題ありません。「計算が苦手」「家計簿をつけたことがない」という方を想定した講座設計です。わかりやすい言葉で、実生活に直結する内容をお伝えします。',
  },
  {
    q: '受講はオンライン・対面どちらで受けられますか？',
    a: 'オンライン（Zoom）は全国対応、対面は宮城県内で対応しています。ご都合の良い方法をお選びください。日程はご相談の上で調整します。',
  },
  {
    q: 'テキストや受験料は別途かかりますか？',
    a: 'いいえ、受講料44,000円（税込）にテキスト代と家計整理アドバイザー2級の受験料がすべて含まれています。追加費用はかかりません。',
  },
  {
    q: '資格を取ったあと、どんな場面で活かせますか？',
    a: '自分の家計管理はもちろん、家族へのアドバイス、職場でのFP知識の活用、または家計相談のボランティアや副業への活用など、幅広く役立てていただけます。',
  },
  {
    q: '受講期間はどのくらいですか？',
    a: '全5回のカリキュラムを個別のペースで進められます。週1回ペースであれば約1〜2ヶ月が目安です。忙しい方はスケジュールを柔軟に調整できます。',
  },
  {
    q: '一人で受講できますか？夫婦での参加は可能ですか？',
    a: 'お一人での受講はもちろん、ご夫婦・カップルでの受講も歓迎です。ご家族で受講することで家計の認識を合わせるのにも効果的です。',
  },
];

const CURRICULUM = [
  {
    num: '01',
    title: 'お金の「道」を知る',
    desc: '家計の全体像と収支の流れを「見える化」。数字が苦手な方でもわかるブロック図メソッドで、お金がどこから来てどこへ行くかを把握します。',
  },
  {
    num: '02',
    title: '支出を整理する',
    desc: '固定費・変動費を仕分けし、削れる支出と守るべき支出を整理。無理のない節約とゆとりを生む家計構造を設計します。',
  },
  {
    num: '03',
    title: '貯蓄の仕組みを作る',
    desc: '先取り貯蓄・口座分けなど、「頑張らずに貯まる仕組み」を実装。毎月の収支を自動化して精神的な余裕を生み出します。',
  },
  {
    num: '04',
    title: '保険・投資の基本と優先順位',
    desc: '保険・iDeCo・NISAなどを「いつ・何から・どれくらい」始めるべきか、中立的な視点で整理します。商品の売り込みは一切ありません。',
  },
  {
    num: '05',
    title: '試験対策と実践ロールプレイング',
    desc: '家計整理アドバイザー2級の試験対策と、実生活・職場で使えるアドバイス実践まで。合格後も使い続けられる力を身につけます。',
  },
];

export default function CoursePage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Service 01</p>
        <h1 className="page-hero__title">家計整理アドバイザー<br />2級講座</h1>
        <p className="page-hero__desc">計算が苦手でも大丈夫。「お金の道」を整えて、一生使えるスキルを。</p>
      </div>

      {/* ヒーロー画像 */}
      <div style={{ width: '100%', maxHeight: '480px', overflow: 'hidden', background: '#F4F3F0' }}>
        <Image
          src="/images/service-course.png"
          alt="家計整理アドバイザー2級講座"
          width={1200}
          height={480}
          style={{ width: '100%', height: '480px', objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
      </div>

      <div className="container">

        {/* こんな方へ */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="For you" title="こんな方におすすめ" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                '収入はあるのに、なぜかお金が貯まらない',
                '家計簿をつけても、改善につながらない',
                '将来の不安を漠然と抱えたまま過ごしている',
                'お金の管理を一から学び直したい',
                '保険・投資について正しく理解したい',
                '仕事で家計相談のスキルを活かしたい',
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

        {/* 講座の特長 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Features" title="この講座の特長" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-detail__inner">
              <div>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>計算が苦手でもわかる「ブロック図」独自メソッド</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>テキスト・資格受験料込みの明瞭な料金設定</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>オンライン全国対応・対面（宮城県内）どちらも可</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>個別ペースで進められるマンツーマン指導</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>中立的な立場からのアドバイス（商品販売なし）</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>資格取得後も使い続けられる実践スキル</li>
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-body)' }}>受講後に変わること</h3>
                <ul className="service-feature-list">
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>「どこにお金が消えているか」がはっきりわかる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>無理なく続けられる家計管理の仕組みができる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>保険・投資の適切な優先順位が判断できる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>家計整理アドバイザー2級の資格が取得できる</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>✓</span>家族や周りの人にも的確なアドバイスができる</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* カリキュラム */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Curriculum" title="カリキュラム" desc="全5回・個別ペースで進行" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-flow">
              {CURRICULUM.map((item) => (
                <div key={item.num} className="service-flow__item">
                  <div className="service-flow__step">{item.num}</div>
                  <div className="service-flow__body">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* 受講形式・料金 */}
        <section className="section">
          <FadeIn>
            <SectionHeading label="Pricing" title="受講形式・料金" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="service-detail__inner">
              <div>
                <div className="service-price-box">
                  <p style={{ fontSize: '0.85rem', color: 'var(--col-muted)', marginBottom: '0.5rem' }}>受講料（税込）</p>
                  <p style={{ fontSize: '2rem', fontFamily: "'Cormorant Garamond', serif", fontWeight: '300', color: 'var(--col-body)', lineHeight: '1.2', marginBottom: '0.5rem' }}>
                    ¥32,780
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--col-muted)' }}>テキスト代・家計整理アドバイザー2級受験料を含む</p>
                </div>
                <ul className="service-feature-list" style={{ marginBottom: '1.5rem' }}>
                  <li><span style={{ color: 'var(--col-gold)' }}>💻</span><strong>オンライン：</strong>Zoom使用・全国対応</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>🤝</span><strong>対面：</strong>宮城県内・ご指定の場所</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>📅</span><strong>日程：</strong>応相談（柔軟に調整）</li>
                  <li><span style={{ color: 'var(--col-gold)' }}>👤</span><strong>形式：</strong>マンツーマン指導</li>
                </ul>
                <Link href="/contact" className="btn btn-primary">講座について問い合わせる</Link>
              </div>
              <div style={{
                background: 'var(--col-neutral)',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid rgba(0,0,0,0.07)',
              }}>
                <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1rem', marginBottom: '1rem', color: 'var(--col-body)' }}>
                  講師プロフィール
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', lineHeight: '2', color: 'var(--col-muted)' }}>
                  渡辺加奈子。FP2級・家計整理アドバイザー1級・国家資格キャリアコンサルタント。
                  自身の家計管理の経験から、「計算が苦手な人でもお金と向き合える」メソッドを開発。
                  受講者が「知識」を「実践」につなげられることを最も大切にしています。
                </p>
                <Link href="/about" style={{ fontSize: 'var(--text-sm)', color: 'var(--col-gold)', marginTop: '1rem', display: 'inline-block' }}>
                  プロフィール詳細 →
                </Link>
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
              <Link href="/services/consultation" style={{ textDecoration: 'none' }}>
                <div className="service-link-card">
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.7rem', letterSpacing: '0.3em', color: 'var(--col-gold)', display: 'block', marginBottom: '0.5rem' }}>Service 02</span>
                  <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 'var(--text-base)', fontWeight: '400', marginBottom: '0.75rem' }}>家計×キャリア個別相談</h3>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: '300', color: 'var(--col-muted)', lineHeight: '1.7' }}>お金と働き方を同時に整理するオーダーメイドのセッション</p>
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
            <SectionHeading label="Apply" title="受講申し込み" desc="受講料：¥32,780（税込）テキスト・受験料込み" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <CourseForm />
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
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>受講について、まずはご相談ください。</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                「自分に合っているか不安」でも大丈夫。<br />
                お問い合わせフォームから、気軽にメッセージをお送りください。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">お問い合わせ・受講申し込み</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
