'use client';
import Link from 'next/link';
import { Coins, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer__inner">

        {/* ブランド */}
        <div className="footer__brand">
          <div className="footer__logo">
            <Coins style={{ width: '1.2rem', height: '1.2rem', color: '#C17B5C' }} />
            <span className="footer__logo-name">money web</span>
          </div>
          <p className="footer__logo-sub">FP &amp; Career Consultant</p>
          <p className="footer__brand-desc">
            渡辺加奈子（FP＆国家資格キャリアコンサルタント）による<br />
            お金とキャリアの伴走サポートサービス。
          </p>
          <div className="footer__sns">
            <a href="#" className="footer__sns-link" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" className="footer__sns-link" aria-label="X"><Twitter size={16} /></a>
          </div>
        </div>

        {/* Services */}
        <div className="footer__col">
          <p className="footer__col-title">Services</p>
          <ul className="footer__links">
            <li><Link href="/services#consultation">個別相談（初回無料）</Link></li>
            <li><Link href="/services#course">家計整理アドバイザー講座</Link></li>
            <li><Link href="/services#seminar">グループセミナー</Link></li>
          </ul>
        </div>

        {/* Contents */}
        <div className="footer__col">
          <p className="footer__col-title">Contents</p>
          <ul className="footer__links">
            <li><Link href="/quiz">お金タイプ診断</Link></li>
            <li><Link href="/glossary">FP用語集</Link></li>
            <li><Link href="/blog">ブログ</Link></li>
            <li><Link href="/results">お客様の声</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="footer__col">
          <p className="footer__col-title">Legal</p>
          <ul className="footer__links">
            <li><Link href="/about">プロフィール</Link></li>
            <li><Link href="/contact">お問い合わせ</Link></li>
            <li><Link href="/privacy">プライバシーポリシー</Link></li>
            <li><Link href="/legal">特定商取引法</Link></li>
          </ul>
        </div>

      </div>
      <div className="footer__bottom">
        <span>© 2024 money web / 渡辺加奈子. All rights reserved.</span>
        <Link href="/privacy">プライバシーポリシー</Link>
        <Link href="/legal">特定商取引法</Link>
      </div>
    </footer>
  );
}
