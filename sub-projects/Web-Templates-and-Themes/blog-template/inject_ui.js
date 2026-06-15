const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

// 1. Vô hiệu hóa script 3D cũ (các hành tinh, mặt trời bị đè)
html = html.replace('initBackgroundThree();', '// initBackgroundThree();');
html = html.replace('animateBackgroundThree();', '// animateBackgroundThree();');
html = html.replace('<canvas id="global-3d-bg" class="fixed inset-0 w-full h-full -z-50"></canvas>', '<!-- <canvas id="global-3d-bg" class="fixed inset-0 w-full h-full -z-50"></canvas> -->');

// 2. Tạo Glassmorphism CSS & HTML
const uiHtml = `
  <!-- GLASSMORPHISM DESKTOP UI OVERLAY -->
  <style>
    .glass-panel {
      background: rgba(15, 20, 30, 0.45);
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.5);
      border-radius: 16px;
    }
    
    .glass-button {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94a3b8;
      transition: all 0.3s ease;
    }
    
    .glass-button:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    .glass-button.active {
      background: #7dd3fc;
      color: #0f172a;
      border: 1px solid #38bdf8;
    }

    .glass-text {
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
    
    /* Custom Slider */
    input[type=range] {
      -webkit-appearance: none;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 16px;
      width: 16px;
      border-radius: 50%;
      background: #7dd3fc;
      cursor: pointer;
      margin-top: -6px;
      box-shadow: 0 0 10px rgba(125, 211, 252, 0.8);
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      background: rgba(255,255,255,0.2);
      border-radius: 2px;
    }
    
    /* Vertical Slider */
    input[type=range].vertical {
      writing-mode: bt-lr;
      -webkit-appearance: slider-vertical;
      width: 8px;
      height: 120px;
    }

    .vinyl-record {
      animation: spin 8s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }
  </style>

  <!-- Absolute Container for the UI Overlay -->
  <div id="desktop-ui" class="fixed inset-0 w-full h-full z-10 pointer-events-none flex flex-col font-sans">
    
    <!-- Top Bar -->
    <div class="w-full h-12 flex justify-between items-center px-6 mt-4 pointer-events-auto">
      <!-- Left side icons -->
      <div class="flex space-x-3 items-center glass-panel px-4 py-2 rounded-full">
        <button class="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-white hover:bg-slate-600">1</button>
        <button class="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-white hover:bg-slate-600">2</button>
        <button class="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-white hover:bg-slate-600">3</button>
        <button class="w-6 h-6 rounded-full bg-sky-400 flex items-center justify-center text-slate-900 font-bold">4</button>
        <span class="text-slate-400 text-sm ml-2 font-mono">LONOWN, risera...</span>
      </div>
      
      <!-- Center Clock -->
      <div class="flex flex-col items-center glass-text">
        <div class="text-white text-lg font-semibold tracking-wide">09:29:58 PM</div>
        <div class="text-slate-300 text-xs">Wednesday, April 15</div>
      </div>

      <!-- Right side controls -->
      <div class="flex space-x-3 items-center">
        <div class="flex items-center text-white text-sm">
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          7.7°C
        </div>
        <div class="glass-panel px-4 py-2 rounded-full flex items-center space-x-4 text-sm text-white">
          <span>EN</span>
          <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg> Fibernet-1A...</span>
          <span class="bg-indigo-500/20 px-2 py-1 rounded text-indigo-200">JBL Tune 72...</span>
          <span class="bg-pink-500/20 px-2 py-1 rounded text-pink-200">54%</span>
          <span class="bg-white/20 px-2 py-1 rounded">100%</span>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex px-8 pt-8 pointer-events-auto">
      
      <!-- Left Panel: Music Player & Equalizer -->
      <div class="w-96 flex flex-col space-y-6">
        
        <!-- Music Player Widget -->
        <div class="glass-panel p-6 flex flex-col relative overflow-hidden">
          <div class="flex justify-between items-start">
            <!-- Vinyl Record -->
            <div class="relative w-28 h-28 rounded-full border-2 border-sky-400/50 flex items-center justify-center bg-black/40 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
              <div class="vinyl-record w-24 h-24 rounded-full border border-slate-700 bg-[radial-gradient(circle,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)] flex items-center justify-center overflow-hidden">
                <div class="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 z-10 flex items-center justify-center">
                  <div class="w-2 h-2 rounded-full bg-slate-500"></div>
                </div>
                <!-- Fake abstract texture for vinyl -->
                <div class="absolute inset-0 opacity-40 mix-blend-screen bg-center bg-cover" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><path d=\\'M20,50 Q40,10 60,50 T90,60\\' stroke=\\'%23fff\\' fill=\\'none\\' stroke-width=\\'2\\'/></svg>');"></div>
              </div>
            </div>
            
            <!-- Song Info -->
            <div class="flex-1 ml-4 pt-2">
              <h3 class="text-white font-bold text-lg leading-tight mb-1">LONOWN, riserayss<br>- worry (Slowed)</h3>
              <p class="text-slate-400 text-xs uppercase tracking-wider mb-2">BY LONOWN</p>
              <div class="inline-flex items-center text-xs text-sky-200 bg-sky-900/30 px-2 py-1 rounded">
                <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 012 0v5h2.5a.5.5 0 010 1h-3a.5.5 0 01-.5-.5V5z"/></svg>
                JBL Tune 720BT
                <span class="text-slate-500 ml-2">VIA Firefox</span>
              </div>
            </div>
          </div>
          
          <!-- Progress Bar & Controls -->
          <div class="mt-6">
            <input type="range" min="0" max="100" value="35" class="w-full">
            <div class="flex justify-between text-xs text-slate-400 mt-2 font-mono">
              <span>00:19</span>
              <span>03:21</span>
            </div>
            
            <div class="flex justify-center items-center space-x-6 mt-2">
              <button class="text-slate-300 hover:text-white transition"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/></svg></button>
              <button class="w-10 h-10 bg-sky-400 rounded-full flex items-center justify-center text-slate-900 hover:bg-sky-300 transition shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
              </button>
              <button class="text-slate-300 hover:text-white transition"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 14.832A1 1 0 0010 14v-2.798l-5.445 3.63A1 1 0 013 14V6a1 1 0 011.555-.832L10 8.798V6a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4z"/></svg></button>
            </div>
          </div>
        </div>
        
        <!-- Equalizer Widget -->
        <div class="glass-panel p-6 flex flex-col">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-slate-200 font-semibold text-sm uppercase tracking-widest">Equalizer</h3>
            <div class="flex space-x-2">
              <span class="text-xs text-sky-300 bg-sky-900/40 px-2 py-1 rounded">Saved</span>
              <span class="text-xs text-white bg-slate-700/50 px-2 py-1 rounded">Bass</span>
            </div>
          </div>
          
          <!-- EQ Sliders -->
          <div class="flex justify-between items-end h-32 mb-6 px-2 relative">
            <!-- connecting line fake -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
              <path d="M 15 60 Q 40 40 65 50 T 115 50 T 165 60 T 215 70 T 265 65 T 315 50" fill="none" stroke="rgba(125, 211, 252, 0.4)" stroke-width="2"/>
            </svg>
            
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="60"><span class="text-[10px] text-slate-400 mt-2">31</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="70"><span class="text-[10px] text-slate-400 mt-2">63</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="55"><span class="text-[10px] text-slate-400 mt-2">125</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="45"><span class="text-[10px] text-slate-400 mt-2">250</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="40"><span class="text-[10px] text-slate-400 mt-2">500</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="50"><span class="text-[10px] text-slate-400 mt-2">1k</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="65"><span class="text-[10px] text-slate-400 mt-2">2k</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="80"><span class="text-[10px] text-slate-400 mt-2">4k</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="60"><span class="text-[10px] text-slate-400 mt-2">8k</span></div>
            <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="45"><span class="text-[10px] text-slate-400 mt-2">16k</span></div>
          </div>
          
          <!-- EQ Presets -->
          <div class="grid grid-cols-3 gap-2">
            <button class="glass-button py-2 text-xs rounded">Flat</button>
            <button class="glass-button active py-2 text-xs rounded font-semibold shadow-[0_0_10px_rgba(56,189,248,0.3)]">Bass</button>
            <button class="glass-button py-2 text-xs rounded">Treble</button>
            <button class="glass-button py-2 text-xs rounded">Vocal</button>
            <button class="glass-button py-2 text-xs rounded">Pop</button>
            <button class="glass-button py-2 text-xs rounded">Rock</button>
          </div>
        </div>

      </div>

      <!-- Right Side Notifications -->
      <div class="absolute top-16 right-6">
        <div class="glass-panel p-4 w-72 relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1 bg-sky-400"></div>
          <h4 class="text-white text-xs font-bold uppercase mb-1 flex items-center">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
            Screen Recorder
          </h4>
          <p class="text-sky-300 text-sm font-semibold mb-1">Recording Started</p>
          <p class="text-slate-400 text-xs">Press your screenshot shortcut again to stop.</p>
        </div>
      </div>

    </div>
  </div>
`;

// Chèn UI Overlay vào cuối thẻ body, ngay trước script Hố đen
html = html.replace('<!-- GLASSMORPHISM DESKTOP UI OVERLAY -->', ''); // Remove old if exists
// Cut the UI part up to the end tag
let uiHtmlRegex = /<style>[\s\S]*?id="desktop-ui"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
html = html.replace(uiHtmlRegex, '');

html = html.replace('</body>', uiHtml + '\n</body>');

fs.writeFileSync(path, html);
console.log('Successfully injected Glassmorphism UI and fixed overlaps.');
