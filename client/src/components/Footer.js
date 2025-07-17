import React from 'react';

const GITHUB_URL = 'https://github.com/yashwanthmk11/Memory-Match-Game';

const Footer = () => (
  <footer
    style={{
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      background: 'rgba(30, 41, 59, 0.7)',
      color: '#fff',
      textAlign: 'center',
      padding: '1rem 0',
      backdropFilter: 'blur(8px)',
      zIndex: 100,
      fontSize: '1rem',
      letterSpacing: '0.03em',
      boxShadow: '0 -2px 16px 0 rgba(0,0,0,0.08)',
      userSelect: 'none',
      transition: 'background 0.3s',
    }}
    aria-label="Footer"
    tabIndex={0}
  >
    <span>
      Built with <span aria-label="love" role="img">❤️</span> by{' '}
      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#00ffc3',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.04em',
          fontSize: '1.05em',
          padding: '0 0.2em',
          borderRadius: '4px',
          transition: 'background 0.2s, color 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,255,195,0.08)'}
        onMouseOut={e => e.currentTarget.style.background = 'none'}
        aria-label="View code source on GitHub"
      >
        YASHWANTH MK
      </a>
    </span>
  </footer>
);

export default Footer; 