import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          {/* ブランド */}
          <div>
            <div className="footer-brand__logo">
              money <span style={{ color: 'var(--col-gold)' }}>web</span>
            </div>
            <p className="footer-brand__tagline">お金とキャリアの伴走プランナー</p>
            <p className="footer-brand__desc">
              老後・住宅ローン・保険・教育費など、ライフステージに合わせたFP相談を全国オンラインで提供しています。
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="footer-col__title">Services</p>
            <ul className="footer-col__links">
              <li><Link href="/services#retirement">老後・年金相談</Link></li>
              <li><Link href="/services#housing">住宅ローン相談</Link></li>
              <li><Link href="/services#insurance">保険見直し相談</Link></li>
              <li><Link href="/services#education">教育費・子育て相談</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-col__title">Navigation</p>
            <ul className="footer-col__links">
              <li><Link href="/about">プロフィール</Link></li>
              <li><Link href="/services">サービス・料金</Link></li>
              <li><Link href="/faq">よくある質問</Link></li>
              <li><Link href="/contact">お問い合わせ</Link></li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <p className="footer-col__title">Info</p>
            <ul className="footer-col__links">
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
