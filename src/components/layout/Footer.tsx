import Link from 'next/link';
import { Instagram } from 'lucide-react';

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
              家計整理・キャリア相談・進学資金など、お金と働き方を一緒に考えるFP相談を全国オンラインで提供しています。
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="footer-col__title">Services</p>
            <ul className="footer-col__links">
              <li><Link href="/services/course">家計整理アドバイザー2級講座</Link></li>
              <li><Link href="/services/consultation">家計×キャリア個別相談</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="footer-col__title">Navigation</p>
            <ul className="footer-col__links">
              <li><Link href="/about">プロフィール</Link></li>
              <li><Link href="/services">サービス・料金</Link></li>
              <li><Link href="/glossary">FP用語集</Link></li>
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
          <a
            href="https://www.instagram.com/rinn_happy_life/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
            aria-label="Instagram"
          >
            <Instagram size={18} />
            <span>@rinn_happy_life</span>
          </a>
          <p className="footer-bottom__copy">
            &copy; {new Date().getFullYear()} money web — Kanako Watanabe. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
