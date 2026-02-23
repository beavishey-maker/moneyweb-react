'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { KineticNavigation, type NavItem } from '@/components/ui/kinetic-navigation';

const NAV_ITEMS: NavItem[] = [
  { label: 'トップページ',  labelEn: 'Home',        href: '/'         },
  { label: 'プロフィール',  labelEn: 'About',       href: '/about'    },
  { label: 'サービス',      labelEn: 'Services',    href: '/services' },
  { label: 'お客様の声',    labelEn: 'Results',     href: '/results'  },
  { label: 'ブログ',        labelEn: 'Blog',        href: '/blog'     },
  { label: 'FP用語集',      labelEn: 'Glossary',    href: '/glossary' },
  { label: 'お問い合わせ',  labelEn: 'Contact',     href: '/contact'  },
];

const DESKTOP_NAV = [
  { label: 'プロフィール', href: '/about'    },
  { label: 'サービス',     href: '/services' },
  { label: 'ブログ',       href: '/blog'     },
  { label: 'お客様の声',   href: '/results'  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted,  setIsMounted]  = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const open  = useCallback(() => setIsMenuOpen(true),  []);
  const close = useCallback(() => setIsMenuOpen(false), []);

  return (
    <>
      <div className="site-header-wrapper">
        <header className={`header${isScrolled ? ' scrolled' : ''}`}>

          {/* ロゴ */}
          <Link href="/" className="logo-wrap" aria-label="money web トップへ">
            <span className="logo-main">money <span>web</span></span>
            <span className="logo-tagline">お金とキャリアの伴走プランナー</span>
          </Link>

          {/* デスクトップNav */}
          <nav className="desktop-nav" aria-label="メインナビゲーション">
            {DESKTOP_NAV.map(item => (
              <Link key={item.href} href={item.href} className="desktop-nav-link">
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 右側アクション */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/contact" className="header-cta" aria-label="無料相談を予約する">
              無料相談
            </Link>
            {isMounted && (
              <button
                className="menu-btn"
                onClick={isMenuOpen ? close : open}
                aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
                aria-expanded={isMenuOpen}
              >
                <span className="menu-btn__label">
                  {isMenuOpen ? 'CLOSE' : 'MENU'}
                </span>
                <Menu className="menu-btn__icon" />
              </button>
            )}
          </div>
        </header>
      </div>

      {isMounted && (
        <KineticNavigation
          items={NAV_ITEMS}
          isOpen={isMenuOpen}
          onClose={close}
        />
      )}
    </>
  );
}
