import Link from 'next/link';
import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import profileData from '@/data/profile.json';

const TIMELINE = [
  {
    phase: 'Phase 1',
    title: '医療の現場で',
    text: '医療機関で20年以上勤務。多様な患者さんの人生と向き合う中で、「お金の知識が人を安心させる力を持つ」ということを深く実感するようになりました。',
  },
  {
    phase: 'Phase 2',
    title: 'FPとして活動開始',
    text: 'AFP資格と投資診断士の資格を取得し、ファイナンシャルプランナーとして活動を開始。老後・住宅・保険・教育費など、一人ひとりのライフプランに寄り添うサポートを始めました。',
  },
  {
    phase: 'Phase 3',
    title: '資格の拡充',
    text: '国家資格キャリアコンサルタントと家計整理アドバイザー認定講師の資格も取得。お金とキャリアの両面から包括的なサポートができる体制を整えました。',
  },
  {
    phase: 'Phase 4',
    title: '現在の活動',
    text: '中高年のキャリア形成に悩む方を対象に、お金とキャリアを組み合わせた全国オンライン相談を提供しています。「寄り添うお金のパートナー」として、あなたの未来を一緒に描きたいと思っています。',
  },
];

const CREDENTIALS = [
  { name: 'AFP（ファイナンシャルプランニング技能士2級）', desc: '日本FP協会認定。家計・老後資金・保険・住宅ローン・教育資金など、総合的なライフプランニングのアドバイスが可能。' },
  { name: '投資診断士', desc: '投資診断協会認定。お客様の状況とリスク許容度に合わせた、中立的な投資アドバイスを提供します。' },
  { name: '家計整理アドバイザー認定講師', desc: '日本家計整理アドバイザー協会認定。整理整頓の考え方をお金に応用した、計算しない家計管理を指導・普及します。' },
  { name: '国家資格キャリアコンサルタント', desc: '厚生労働省認定。転職・復職・副業・ライフプランなど、働き方の選択肢を整理し最適な道を一緒に考えます。' },
];

const FIT_YES = [
  '老後の資金計画が不安な方',
  '住宅購入・ローンの相談をしたい方',
  '保険を見直したい方',
  '教育費の準備を始めたい方',
  '40代以上の女性のライフプランを考えたい方',
  'オンラインで全国から相談したい方',
];

const FIT_NO = [
  '即座に大きな資産運用成果を求める方',
  '特定の金融商品への投資先紹介のみを求める方',
  '即答・断定的な答えだけを求める方',
  '一度の相談で全問題を解決したい方',
];

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <div className="page-hero">
        <p className="page-hero__eyebrow">Profile</p>
        <h1 className="page-hero__title">プロフィール</h1>
        <p className="page-hero__desc">お金とキャリアの伴走プランナー、渡辺加奈子です。</p>
      </div>

      {/* プロフィール基本情報 */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <div className="profile-strip">
              <div className="profile-strip__photo-wrap">
                <Image
                  src={profileData.profileImage}
                  alt="渡辺加奈子"
                  width={200}
                  height={200}
                  className="profile-strip__photo"
                />
                <div className="profile-strip__quals">
                  <span className="tag">AFP</span>
                  <span className="tag tag--green">投資診断士</span>
                  <span className="tag">家計整理アドバイザー認定講師</span>
                  <span className="tag tag--green">国家資格キャリアコンサルタント</span>
                </div>
              </div>
              <div className="profile-strip__body">
                <h2 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: '1.6rem', fontWeight: 400, color: 'var(--col-body)', marginBottom: '0.3rem' }}>
                  渡辺 加奈子
                </h2>
                <p style={{ color: 'var(--col-gold)', fontSize: '0.85rem', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
                  お金とキャリアの伴走プランナー / FP・国家資格キャリアコンサルタント
                </p>
                <p>医療機関で20年以上勤務した後、「お金の知識が人を安心させる力を持つ」ということを実感し、FPとして活動を開始。その後、キャリアコンサルタントの資格も取得しました。</p>
                <p>老後・住宅ローン・保険・教育費など、ライフステージに合わせた幅広い相談に対応。特に40代以上の女性のライフプランニングを得意としています。</p>
                <p>全国オンライン対応で、あなたの未来を一緒に描くパートナーとして伴走します。</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ストーリータイムライン */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="My Story" title="私がここにいる理由" desc="医療の現場からFPへ。お金とキャリアで人を支えるプランナーになるまで。" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="timeline">
              {TIMELINE.map((item, i) => (
                <div key={i} className="timeline__item">
                  <div className="timeline__phase">{item.phase}</div>
                  <div>
                    <h3 className="timeline__title">{item.title}</h3>
                    <p className="timeline__text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 保有資格 */}
      <section className="section section--white">
        <div className="container">
          <FadeIn>
            <SectionHeading label="Credentials" title="保有資格・専門領域" />
          </FadeIn>
          <FadeIn delay={100}>
            <div style={{ overflowX: 'auto' }}>
              <table className="cred-table">
                <tbody>
                  {CREDENTIALS.map((c, i) => (
                    <tr key={i}>
                      <th>{c.name}</th>
                      <td>{c.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 向いている方・向いていない方 */}
      <section className="section section--sub">
        <div className="container">
          <FadeIn>
            <SectionHeading label="For You" title="こんな方に向いています" />
          </FadeIn>
          <FadeIn delay={100}>
            <div className="fit-grid">
              <div className="fit-card fit-card--yes">
                <h3 className="fit-card__title">✅ こんな方におすすめです</h3>
                <ul className="fit-card__list">
                  {FIT_YES.map((item, i) => (
                    <li key={i} className="fit-card__item">
                      <span style={{ color: 'var(--col-gold)', flexShrink: 0 }}>◎</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fit-card fit-card--no">
                <h3 className="fit-card__title">❌ 向いていない方</h3>
                <ul className="fit-card__list">
                  {FIT_NO.map((item, i) => (
                    <li key={i} className="fit-card__item">
                      <span style={{ color: 'var(--col-muted)', flexShrink: 0 }}>×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="section--dark">
        <div className="container">
          <div className="cta-section">
            <FadeIn>
              <span className="cta-section__eyebrow" style={{ color: 'var(--col-gold)' }}>Free Consultation</span>
              <h2 className="cta-section__title" style={{ color: 'rgba(255,255,255,0.95)' }}>まずは、話してみませんか？</h2>
              <p className="cta-section__body" style={{ color: 'rgba(255,255,255,0.5)' }}>
                初回60分は完全無料です。<br />
                どんな小さなお悩みでも、お気軽にご相談ください。<br />
                あなたのペースで、一緒に考えましょう。
              </p>
              <div className="cta-section__btns">
                <Link href="/contact" className="btn btn--primary btn--lg">無料相談を申し込む</Link>
                <Link href="/services" className="btn btn--outline btn--lg" style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}>サービス・料金を見る</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
