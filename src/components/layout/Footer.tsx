import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* ブランド */}
          <div>
            <div className="footer-brand__logo">
              money <span style={{ color: 'var(--col-terra)' }}>web</span>
            </div>
            <p className="footer-brand__tagline">お金とキャリアの伴走プランナー</p>
            <p className="footer-brand__desc">
              40〜50代女性の「お金の不安」と「キャリアの迷い」に、FP×キャリアコンサルタントの立場から伴走します。
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="footer-col__title">Services</p>
            <ul className="footer-col__links">
              <li><Link href="/services#consultation">個別相談</Link></li>
              <li><Link href="/services#course">家計整理講座</Link></li>
              <li><Link href="/services#seminar">グループセミナー</Link></li>
            </ul>
          </div>

          {/* Contents */}
          <div>
            <p className="footer-col__title">Contents</p>
            <ul className="footer-col__links">
              <li><Link href="/blog">ブログ</Link></li>
              <li><Link href="/quiz">お金タイプ診断</Link></li>
              <li><Link href="/glossary">FP用語集</Link></li>
              <li><Link href="/results">お客様の声</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="footer-col__title">Info</p>
            <ul className="footer-col__links">
              <li><Link href="/about">プロフィール</Link></li>
              <li><Link href="/contact">お問い合わせ</Link></li>
              <li><Link href="/privacy">プライバシーポリシー</Link></li>
              <li><Link href="/legal">特定商取引法</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-bottom__copy">
            &copy; {new Date().getFullYear()} money web — Kanako Watanabe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
