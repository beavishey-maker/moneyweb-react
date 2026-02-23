'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import gsap from 'gsap';

export interface NavItem {
  label: string;
  labelEn: string;
  href: string;
}

export interface KineticNavigationProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function KineticNavigation({ items, isOpen, onClose }: KineticNavigationProps) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const itemsRef    = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (isOpen) {
      const els = itemsRef.current.filter(Boolean);
      gsap.fromTo(
        els,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1,
          stagger: 0.06,
          duration: 0.55,
          ease: 'power3.out',
          delay: 0.25,
        }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={overlayRef}
      className={`kinetic-overlay${isOpen ? ' is-open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="ナビゲーションメニュー"
    >
      {/* メニューパネル */}
      <div className="kinetic-panel">
        {/* ヘッダー */}
        <div className="kinetic-header">
          <span className="kinetic-logo">
            money <span style={{ color: 'var(--col-gold)' }}>web</span>
          </span>
          <button className="kinetic-close" onClick={onClose} aria-label="メニューを閉じる">
            <span style={{ fontFamily: 'Cormorant Garamond, serif', letterSpacing: '0.2em', fontSize: '0.8rem' }}>
              CLOSE
            </span>
            <X />
          </button>
        </div>

        {/* ナビリスト */}
        <nav className="kinetic-nav" aria-label="メインナビゲーション">
          {items.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="kinetic-nav-item"
              onClick={onClose}
            >
              <span className="kinetic-nav-item__num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="kinetic-nav-item__label">{item.label}</span>
              <span className="kinetic-nav-item__label-en">{item.labelEn}</span>
            </Link>
          ))}
        </nav>

        {/* フッター */}
        <div className="kinetic-footer">
          <Link href="/contact" className="kinetic-footer__cta" onClick={onClose}>
            <span>無料相談を予約する</span>
            <span>→</span>
          </Link>
          <p className="kinetic-footer__info">
            初回60分無料 / Zoom対応・全国OK<br />
            保険商品の勧誘は一切ありません
          </p>
        </div>
      </div>

      {/* スクリム（クリックで閉じる） */}
      <div className="kinetic-scrim" onClick={onClose} aria-hidden="true" />
    </div>
  );
}
