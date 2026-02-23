'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="floating-cta">
      <Link href="/contact" className="floating-cta__btn">
        <div className="floating-cta__pulse" />
        <MessageCircle size={16} />
        <span>無料相談</span>
      </Link>
    </div>
  );
}
