const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Change Background and Body colors to Slate
html = html.replace('bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50', 'bg-[#0b1121] text-slate-50');

// 2. Change Aurora Mesh to Deep Slate & Cyan
const newAuroraCSS = `
    /* --- SECURIFY BENTO UI --- */
    body { background-color: #0b1121 !important; color: #f8fafc !important; }
    .aurora-mesh-bg {
      position: fixed; inset: -20%;
      z-index: 1; pointer-events: none;
      background-color: #0b1121;
      background-image: 
        radial-gradient(at 20% 30%, rgba(6, 182, 212, 0.15) 0px, transparent 50%),
        radial-gradient(at 80% 20%, rgba(14, 165, 233, 0.1) 0px, transparent 50%),
        radial-gradient(at 90% 80%, rgba(16, 185, 129, 0.1) 0px, transparent 50%),
        radial-gradient(at 10% 90%, rgba(56, 189, 248, 0.15) 0px, transparent 50%);
      animation: mesh-rotate 30s infinite alternate linear;
    }
    .securify-card {
      position: relative;
      background: rgba(30, 41, 59, 0.6) !important; /* slate-800 */
      backdrop-filter: blur(24px) !important;
      -webkit-backdrop-filter: blur(24px) !important;
      border-radius: 2rem !important;
      border: 1px solid rgba(255,255,255,0.05) !important;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.02), 0 25px 50px -12px rgba(0,0,0,0.5) !important;
      transition: transform 0.2s ease-out, box-shadow 0.3s ease !important;
      z-index: 10;
      overflow: hidden;
    }
    .securify-card:hover {
      box-shadow: inset 0 0 0 1px rgba(6, 182, 212, 0.3), 0 25px 50px -12px rgba(6, 182, 212, 0.15) !important;
      border-color: rgba(6, 182, 212, 0.3) !important;
    }
    .pill-badge {
      display: inline-flex; align-items: center; gap: 0.5rem;
      padding: 0.25rem 1rem; border-radius: 9999px;
      background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.2);
      color: #22d3ee; font-size: 0.75rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;
    }
    .btn-pill-primary {
      background: #06b6d4; color: #083344; font-weight: 700; border-radius: 9999px;
      padding: 0.75rem 2rem; transition: all 0.3s;
    }
    .btn-pill-primary:hover { background: #22d3ee; transform: scale(1.05); box-shadow: 0 0 20px rgba(6,182,212,0.4); }
    .btn-pill-secondary {
      background: transparent; border: 1px solid rgba(255,255,255,0.1); color: #f8fafc; font-weight: 600; border-radius: 9999px;
      padding: 0.75rem 2rem; transition: all 0.3s;
    }
    .btn-pill-secondary:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.2); }
    
    /* Hide the old background grid container if we moved it */
    #three-bg-container {
      position: absolute !important; inset: 0 !important; z-index: 0 !important; border-radius: 2rem; pointer-events: auto !important;
    }
`;

html = html.replace('/* --- BEYOND ULTRA UI --- */', newAuroraCSS + '\n    /* --- BEYOND ULTRA UI --- */');

// 3. Replace the old 3D bg container
html = html.replace('<div id="three-bg-container" style="position:fixed; inset:0; pointer-events:none; z-index:0;"></div>', '');

// 4. Rewrite Hero Section
const heroStartIndex = html.indexOf('<section id="home"');
const heroEndIndex = html.indexOf('</section>', heroStartIndex) + 10;

const newHeroHTML = `
    <!-- ─── SECURIFY BENTO HERO SECTION ─── -->
    <section id="home" class="pt-24 md:pt-32">
      <!-- 2-Column Bento Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        <!-- Left: Typography & CTAs -->
        <div class="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-8">
          <div class="flex items-center gap-2">
            <span class="pill-badge"><i class="fas fa-lock text-[10px]"></i> privacy everywhere</span>
          </div>
          
          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            protect<br/>your data<br/>with <span class="text-cyan-400">securify</span>
          </h1>
          
          <p id="hero-greeting" class="text-lg text-slate-400 max-w-lg leading-relaxed font-medium">
            <!-- Will be populated by JS translation, fallback text below -->
            We safeguard your data with utmost care, empowering you with absolute privacy everywhere.
          </p>
          
          <div class="flex flex-wrap items-center gap-4 pt-4">
            <a href="#projects" id="btn-hero-projects" class="btn-pill-primary">
              Get Started
            </a>
            <a href="#contact" id="btn-hero-contact" class="btn-pill-secondary">
              Learn More
            </a>
          </div>
        </div>

        <!-- Right: The 3D Shield/Torus Bento Card -->
        <div class="lg:col-span-5 relative h-[400px] lg:h-[500px] securify-card flex items-center justify-center p-8 group">
          <!-- Inject the 3D Canvas Here -->
          <div id="three-bg-container" class="absolute inset-0 w-full h-full"></div>
          
          <!-- Inner HUD -->
          <div class="absolute top-6 left-6 flex items-center gap-2 z-10 opacity-60">
            <div class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
            <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">Real-time Monitoring</span>
          </div>
          <div class="absolute bottom-6 right-6 z-10 opacity-60">
            <span class="text-xs font-mono text-slate-400">SYS.CORE // SECURE</span>
          </div>
        </div>

      </div>

      <!-- Bottom Mini Bento Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div class="securify-card p-6 flex flex-col items-center justify-center text-center space-y-1">
          <span class="text-3xl font-bold text-cyan-400">+65k</span>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Active Users</span>
        </div>
        <div class="securify-card p-6 flex flex-col items-center justify-center text-center space-y-1">
          <span class="text-3xl font-bold text-emerald-400">+300k</span>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Downloads</span>
        </div>
        <div class="securify-card p-6 flex flex-col items-center justify-center text-center space-y-1">
          <span class="text-3xl font-bold text-violet-400">99.9%</span>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Uptime</span>
        </div>
        <div class="securify-card p-6 flex flex-col items-center justify-center text-center space-y-1">
          <span class="text-3xl font-bold text-white">0</span>
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-widest">Data Leaks</span>
        </div>
      </div>
    </section>
`;

html = html.substring(0, heroStartIndex) + newHeroHTML + html.substring(heroEndIndex);

// Replace ultra-glass-card with securify-card globally for remaining sections
html = html.replace(/ultra-glass-card/g, 'securify-card');
html = html.replace(/bg-emerald-600/g, 'bg-cyan-500'); // Change button colors globally
html = html.replace(/hover:bg-emerald-700/g, 'hover:bg-cyan-400');
html = html.replace(/text-emerald-500/g, 'text-cyan-400');
html = html.replace(/border-emerald-500/g, 'border-cyan-400');

fs.writeFileSync(path, html);
console.log('Securify Bento UI applied successfully.');
