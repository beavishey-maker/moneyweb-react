'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const INSTAGRAM_USERNAME = 'rinn_happy_life';

declare global {
  interface Window {
    instgrm?: {
      Embeds: { process: () => void };
    };
  }
}

export default function InstagramFeed() {
  useEffect(() => {
    if (window.instgrm) window.instgrm.Embeds.process();
  }, []);

  return (
    <section>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.instgrm) window.instgrm.Embeds.process();
        }}
      />
      <div id="instagramContainer">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`}
          data-instgrm-version="14"
        />
      </div>
    </section>
  );
}
