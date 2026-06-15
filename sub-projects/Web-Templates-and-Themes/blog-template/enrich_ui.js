const fs = require('fs');

const filePath = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(filePath, 'utf8');

// 1. Add CSS
const cssToInject = `
    /* --- PREMIUM UI ENRICHMENT --- */
    .ambient-glow-1 {
      position: fixed; top: -10%; left: -10%;
      width: 50vw; height: 50vw;
      background: radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%);
      border-radius: 50%; filter: blur(100px);
      pointer-events: none; z-index: 1;
      animation: float1 20s infinite alternate ease-in-out;
    }
    .ambient-glow-2 {
      position: fixed; bottom: -10%; right: -10%;
      width: 60vw; height: 60vw;
      background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%);
      border-radius: 50%; filter: blur(120px);
      pointer-events: none; z-index: 1;
      animation: float2 25s infinite alternate ease-in-out;
    }
    .dot-grid {
      position: fixed; inset: 0;
      background-image: radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 24px 24px;
      pointer-events: none; z-index: 2;
    }
    .premium-glass-card {
      background: rgba(24, 24, 27, 0.6) !important;
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid rgba(255, 255, 255, 0.08) !important;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
      border-radius: 1.25rem !important;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative;
      overflow: hidden;
      z-index: 10;
    }
    .premium-glass-card::before {
      content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
      transform: skewX(-20deg); transition: 0.5s; pointer-events: none;
    }
    .premium-glass-card:hover::before { left: 150%; }
    .premium-glass-card:hover {
      background: rgba(39, 39, 42, 0.75) !important;
      border-color: rgba(16, 185, 129, 0.4) !important;
      transform: translateY(-5px);
      box-shadow: 0 25px 50px -12px rgba(16, 185, 129, 0.15) !important;
    }
    @keyframes float1 { 0% { transform: translate(0, 0); } 100% { transform: translate(5%, 10%); } }
    @keyframes float2 { 0% { transform: translate(0, 0); } 100% { transform: translate(-5%, -10%); } }
`;

if (!html.includes('PREMIUM UI ENRICHMENT')) {
  html = html.replace('</style>', cssToInject + '\n  </style>');
}

// 2. Add Ambient Divs
const ambientDivs = `
  <!-- Ambient UI Layers -->
  <div class="ambient-glow-1"></div>
  <div class="ambient-glow-2"></div>
  <div class="dot-grid"></div>
`;
if (!html.includes('ambient-glow-1')) {
  html = html.replace(
    '<div id="three-bg-container"', 
    ambientDivs + '\n  <div id="three-bg-container"'
  );
}

// 3. Upgrade Cards
// The template uses things like "bg-zinc-900 rounded-2xl", "bg-zinc-800/50", "bg-zinc-800 p-6", etc.
// We will replace common generic background blocks with premium-glass-card.
html = html.replace(/bg-zinc-900\/50/g, 'premium-glass-card p-6');
html = html.replace(/bg-zinc-800\/50/g, 'premium-glass-card');
html = html.replace(/bg-zinc-900/g, 'premium-glass-card');
html = html.replace(/bg-zinc-800/g, 'premium-glass-card');
// Clean up redundant classes if any
html = html.replace(/premium-glass-card rounded-2xl/g, 'premium-glass-card');
html = html.replace(/premium-glass-card rounded-xl/g, 'premium-glass-card');
html = html.replace(/border-zinc-800/g, ''); // Let the glass card handle borders

fs.writeFileSync(filePath, html);
console.log('Successfully enriched UI with glassmorphism and ambient lights.');
