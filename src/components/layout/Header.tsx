'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Coins, Menu, X } from 'lucide-react';
import { KineticNavigation, type NavItem } from '@/components/ui/kinetic-navigation';

// ─── ナビゲーションリンク定義 ─────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: 'トップページ',  href: '/',          dataShape: 1 },
  { label: 'プロフィール',  href: '/about',      dataShape: 2 },
  { label: 'サービス',      href: '/services',   dataShape: 3 },
  { label: 'お客様の声',    href: '/results',    dataShape: 4 },
  { label: 'ブログ',        href: '/blog',       dataShape: 5 },
  { label: 'FP用語集',      href: '/glossary',   dataShape: 6 },
  { label: 'お問い合わせ',  href: '/contact',    dataShape: 7 },
];

// デスクトップナビに表示する主要リンク
const DESKTOP_NAV_ITEMS = [
  { label: 'プロフィール', href: '/about' },
  { label: 'サービス',     href: '/services' },
  { label: 'ブログ',       href: '/blog' },
];

// ─── Header コンポーネント ────────────────────────────────────────────
export default function Header() {
  const [isMenuOpen, setIsMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [isMounted, setIsMounted]     = useState(false);

  // SSRヒドレーション後にマウント
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // スクロール検知（30px超でscrolledクラス付与）
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 初期チェック
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // メニュー開閉時のbodyスクロールロック
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const openMenu  = useCallback(() => setIsMenuOpen(true),  []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      {/* ─── Fixed Header ─────────────────────────────────────── */}
      <div className="site-header-wrapper">
        <header className={`header${isScrolled ? ' scrolled' : ''}`}>
          <div className="container is--full">
            <div className="nav-row">

              {/* ロゴ */}
              <Link href="/" className="nav-logo-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <Coins
                    style={{ width: '1.4rem', height: '1.4rem', color: '#C17B5C', flexShrink: 0 }}
                  />
                  <div className="logo-wordmark">
                    <span className="logo-main">money</span>
                    <span className="logo-sub"> web</span>
                  </div>
                </div>
                <span className="logo-caption">お金とキャリアの伴走プランナー</span>
              </Link>

              {/* 右側：デスクトップNav + ボタン類 */}
              <div className="nav-row__right">

                {/* デスクトップナビ（768px以上） */}
                <nav className="desktop-nav" aria-label="メインナビゲーション">
                  {DESKTOP_NAV_ITEMS.map(item => (
                    <Link key={item.href} href={item.href} className="desktop-nav-link">
                      {item.label}
                    </Link>
                  ))}
                  <Link href="/contact" className="desktop-cta-btn">
                    無料相談を予約する
                  </Link>
                </nav>

                {/* モバイル用ラベル（768px以下） */}
                <span className="nav-toggle-label">
                  <span className="toggle-text">MENU</span>
                </span>

                {/* ハンバーガー / クローズボタン */}
                {isMounted && (
                  <button
                    className="nav-close-btn"
                    onClick={isMenuOpen ? closeMenu : openMenu}
                    aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                    aria-expanded={isMenuOpen}
                  >
                    <div className="menu-button-text">
                      <span className="p-large">
                        {isMenuOpen ? 'CLOSE' : 'MENU'}
                      </span>
                    </div>
                    <div className="icon-wrap">
                      {isMenuOpen
                        ? <X className="menu-button-icon" />
                        : <Menu className="menu-button-icon" />
                      }
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* ─── フルスクリーンメニュー（GSAPキネティックナビ） ──── */}
      {isMounted && (
        <KineticNavigation
          items={NAV_ITEMS}
          isOpen={isMenuOpen}
          onClose={closeMenu}
        />
      )}
    </>
  );
}
