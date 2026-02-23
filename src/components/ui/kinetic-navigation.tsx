'use client';

import { useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

// ─── 型定義 ────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
  dataShape: number;
}

export interface KineticNavigationProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

// ─── Shape SVG コンポーネント群（money web カラー） ──────────────────────
function Shape1() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="200" cy="200" r="180" fill="rgba(193,123,92,0.12)" />
      <circle cx="200" cy="200" r="120" fill="rgba(193,123,92,0.08)" />
      <circle cx="200" cy="200" r="60" fill="rgba(193,123,92,0.15)" />
      <circle cx="320" cy="80" r="40" fill="rgba(193,123,92,0.10)" />
      <circle cx="80" cy="320" r="50" fill="rgba(193,123,92,0.08)" />
    </svg>
  );
}

function Shape2() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 200 Q100 100 200 200 T400 200" stroke="rgba(122,158,126,0.3)" strokeWidth="3" fill="none" />
      <path d="M0 230 Q100 130 200 230 T400 230" stroke="rgba(122,158,126,0.2)" strokeWidth="2" fill="none" />
      <path d="M0 260 Q100 160 200 260 T400 260" stroke="rgba(122,158,126,0.15)" strokeWidth="1.5" fill="none" />
      <path d="M0 170 Q100 70 200 170 T400 170" stroke="rgba(122,158,126,0.25)" strokeWidth="2" fill="none" />
      <path d="M0 140 Q100 40 200 140 T400 140" stroke="rgba(122,158,126,0.12)" strokeWidth="1" fill="none" />
    </svg>
  );
}

function Shape3() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={30 + col * 50}
            cy={30 + row * 50}
            r="4"
            fill="rgba(61,43,31,0.18)"
          />
        ))
      )}
    </svg>
  );
}

function Shape4() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M200 50 C280 50 350 120 350 200 C350 300 260 360 180 350 C80 335 40 260 50 180 C62 90 120 50 200 50Z"
        fill="rgba(193,123,92,0.10)"
      />
      <path
        d="M200 90 C260 90 310 140 310 200 C310 270 250 320 190 315 C110 305 80 250 88 190 C97 120 140 90 200 90Z"
        fill="rgba(122,158,126,0.12)"
      />
    </svg>
  );
}

function Shape5() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: 10 }).map((_, i) => (
        <line
          key={i}
          x1={-50 + i * 55}
          y1="0"
          x2={i * 55 + 150}
          y2="400"
          stroke="rgba(193,123,92,0.12)"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  );
}

function Shape6() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[
        { cx: 120, cy: 120, r: 55 },
        { cx: 280, cy: 100, r: 40 },
        { cx: 80, cy: 280, r: 35 },
        { cx: 300, cy: 290, r: 60 },
        { cx: 200, cy: 200, r: 30 },
      ].map((c, i) => (
        <circle key={i} cx={c.cx} cy={c.cy} r={c.r} fill="rgba(232,196,176,0.28)" />
      ))}
    </svg>
  );
}

function Shape7() {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="200,30 240,140 360,140 265,210 295,330 200,255 105,330 135,210 40,140 160,140" fill="rgba(122,158,126,0.14)" />
      <polygon points="200,80 228,160 315,160 248,205 272,290 200,238 128,290 152,205 85,160 172,160" fill="rgba(122,158,126,0.10)" />
    </svg>
  );
}

const SHAPES = [Shape1, Shape2, Shape3, Shape4, Shape5, Shape6, Shape7];

// ─── メインコンポーネント ────────────────────────────────────────────────
export function KineticNavigation({ items, isOpen, onClose }: KineticNavigationProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const backdropLayersRef = useRef<HTMLDivElement[]>([]);
  const menuItemsRef = useRef<HTMLLIElement[]>([]);
  const shapeRefs = useRef<HTMLDivElement[]>([]);
  const activeShapeRef = useRef<number>(-1);
  const ctxRef = useRef<gsap.Context | null>(null);
  const isAnimatingRef = useRef(false);

  // open アニメーション
  const openMenu = useCallback(() => {
    if (typeof window === 'undefined') return;
    const overlay = overlayRef.current;
    const content = menuContentRef.current;
    const layers = backdropLayersRef.current;
    const items = menuItemsRef.current;
    if (!overlay || !content) return;

    overlay.style.display = 'block';
    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimatingRef.current = false; },
    });

    // オーバーレイフェードイン
    tl.fromTo(overlay.querySelector('.overlay'), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' });

    // コンテンツパネルをスライドイン
    tl.set(content, { x: '120%' }, '<');
    tl.to(content, { x: '0%', duration: 0.7, ease: 'power3.out' }, '<0.1');

    // 3枚のバックドロップレイヤーを順番にスライドイン→アウト（最後1枚のみ残す）
    layers.forEach((layer, i) => {
      tl.set(layer, { x: '101%' }, '<');
      tl.to(layer, { x: '0%', duration: 0.5, ease: 'power2.inOut' }, `<${i * 0.07}`);
    });
    // 1枚目・2枚目を逆スライドアウト
    if (layers[0]) tl.to(layers[0], { x: '-101%', duration: 0.4, ease: 'power2.in' }, '>-0.2');
    if (layers[1]) tl.to(layers[1], { x: '-101%', duration: 0.4, ease: 'power2.in' }, '<0.06');

    // メニューアイテムをスタガーでフェードイン
    tl.fromTo(
      items,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: 'power3.out' },
      '>-0.2'
    );

    // フッターをフェードイン
    const footer = content.querySelector('.menu-footer');
    if (footer) {
      tl.fromTo(footer, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }, '>-0.1');
    }
  }, []);

  // close アニメーション
  const closeMenu = useCallback(() => {
    if (typeof window === 'undefined') return;
    const overlay = overlayRef.current;
    const content = menuContentRef.current;
    const items = menuItemsRef.current;
    if (!overlay || !content) return;

    isAnimatingRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.display = 'none';
        isAnimatingRef.current = false;
        // shapeをリセット
        shapeRefs.current.forEach(s => { if (s) s.style.opacity = '0'; });
        activeShapeRef.current = -1;
      },
    });

    tl.to(items, { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: 'power2.in' });

    const footer = content.querySelector('.menu-footer');
    if (footer) {
      tl.to(footer, { opacity: 0, duration: 0.2 }, '<');
    }

    tl.to(content, { x: '120%', duration: 0.55, ease: 'power3.in' }, '>-0.1');
    tl.to(overlay.querySelector('.overlay'), { opacity: 0, duration: 0.3, ease: 'power2.in' }, '<0.2');
  }, []);

  // isOpen の変化を監視
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [isOpen, openMenu, closeMenu]);

  // GSAP context セットアップ・クリーンアップ
  useEffect(() => {
    if (typeof window === 'undefined') return;

    ctxRef.current = gsap.context(() => {});

    // ESC キー
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctxRef.current?.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // ホバー時の shape 表示
  const handleItemHover = useCallback((shapeIndex: number) => {
    if (activeShapeRef.current === shapeIndex) return;
    const prev = activeShapeRef.current;
    activeShapeRef.current = shapeIndex;

    if (prev >= 0 && shapeRefs.current[prev]) {
      gsap.to(shapeRefs.current[prev], { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in' });
    }
    const next = shapeRefs.current[shapeIndex];
    if (next) {
      gsap.fromTo(next, { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }
  }, []);

  const handleItemLeave = useCallback(() => {
    const idx = activeShapeRef.current;
    if (idx >= 0 && shapeRefs.current[idx]) {
      gsap.to(shapeRefs.current[idx], { opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in' });
      activeShapeRef.current = -1;
    }
  }, []);

  return (
    <div className="fullscreen-menu-container">
      {/* オーバーレイ全体 */}
      <div
        ref={overlayRef}
        className="nav-overlay-wrapper"
        style={{ display: 'none' }}
      >
        {/* 背景オーバーレイ（クリックで閉じる） */}
        <div className="overlay" onClick={onClose} />

        {/* メニューコンテンツパネル */}
        <div ref={menuContentRef} className="menu-content">
          {/* バックドロップレイヤー（3枚） */}
          <div className="menu-bg">
            {['first', 'second', ''].map((cls, i) => (
              <div
                key={i}
                ref={el => { if (el) backdropLayersRef.current[i] = el; }}
                className={`backdrop-layer ${cls}`}
              />
            ))}
          </div>

          {/* アンビエントシェイプ */}
          <div className="ambient-background-shapes">
            {SHAPES.map((ShapeComp, i) => (
              <div
                key={i}
                ref={el => { if (el) shapeRefs.current[i] = el; }}
                className="bg-shape"
                style={{ opacity: 0 }}
              >
                <ShapeComp />
              </div>
            ))}
          </div>

          {/* ナビゲーションコンテンツ */}
          <div className="menu-content-wrapper">
            <nav>
              <ul className="menu-list">
                {items.map((item, i) => (
                  <li
                    key={item.href}
                    ref={el => { if (el) menuItemsRef.current[i] = el; }}
                    className="menu-list-item"
                    onMouseEnter={() => handleItemHover(item.dataShape - 1)}
                    onMouseLeave={handleItemLeave}
                  >
                    <Link
                      href={item.href}
                      className="nav-link"
                      onClick={onClose}
                    >
                      <div className="nav-link-hover-bg" />
                      <span className="nav-link-text">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* メニューフッター */}
            <div className="menu-footer">
              <Link
                href="/contact"
                className="menu-cta-btn"
                onClick={onClose}
              >
                無料相談を予約する
                <span className="menu-cta-arrow">→</span>
              </Link>
              <div className="menu-footer-divider" />
              <div className="menu-footer-info">
                <p className="menu-footer-email">📧 info@kanako-moneyadvisor.com</p>
                <p className="menu-footer-copy">© 2024 money web / 渡辺加奈子</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
