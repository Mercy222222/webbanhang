const fs = require('fs');
const path = 'd:/webbanhang/blog-template/index-portfolio.html';
let html = fs.readFileSync(path, 'utf8');

const marker = '<!-- GLASSMORPHISM DESKTOP UI OVERLAY -->';
const markerIndex = html.indexOf(marker);

if (markerIndex !== -1) {
  // Cắt bỏ toàn bộ phần tử đằng sau marker đầu tiên
  // (trừ đi phần </body></html> vì ta sẽ chèn lại sau)
  html = html.substring(0, markerIndex);
}

// Ensure </body></html> is at the end
html = html.replace(/<\/body>\s*<\/html>/g, '');

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

    /* Custom Slider */
    input[type=range] {
      -webkit-appearance: none;
      background: transparent;
    }
    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 14px;
      width: 14px;
      border-radius: 50%;
      background: #7dd3fc;
      cursor: pointer;
      margin-top: -5px;
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
      height: 100px;
    }

    .vinyl-record {
      animation: spin 8s linear infinite;
    }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    /* Draggable window styling */
    .drag-handle {
      cursor: grab;
    }
    .drag-handle:active {
      cursor: grabbing;
    }
    .desktop-widget {
      position: fixed;
      z-index: 9999;
      transition: transform 0.1s;
    }
  </style>

  <div id="desktop-ui" class="pointer-events-none fixed inset-0 z-[9999] font-sans">
    
    <!-- Music Player Widget -->
    <div id="widget-music" class="desktop-widget glass-panel flex flex-col pointer-events-auto" style="bottom: 40px; left: 40px; width: 340px; transform: scale(0.9); transform-origin: bottom left;">
      <!-- Drag Handle -->
      <div class="drag-handle w-full h-6 flex items-center justify-center border-b border-white/5 opacity-50 hover:opacity-100">
        <div class="w-10 h-1 rounded-full bg-white/20"></div>
      </div>
      <div class="p-5 relative overflow-hidden">
        <div class="flex justify-between items-start">
          <div class="relative w-24 h-24 rounded-full border-2 border-sky-400/50 flex items-center justify-center bg-black/40 shadow-[0_0_20px_rgba(56,189,248,0.3)]">
            <div class="vinyl-record w-20 h-20 rounded-full border border-slate-700 bg-[radial-gradient(circle,rgba(30,41,59,1)_0%,rgba(15,23,42,1)_100%)] flex items-center justify-center overflow-hidden">
              <div class="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 z-10 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-slate-500"></div>
              </div>
              <div class="absolute inset-0 opacity-40 mix-blend-screen bg-center bg-cover" style="background-image: url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'><path d=\\'M20,50 Q40,10 60,50 T90,60\\' stroke=\\'%23fff\\' fill=\\'none\\' stroke-width=\\'2\\'/></svg>');"></div>
            </div>
          </div>
          <div class="flex-1 ml-4 pt-1">
            <h3 class="text-white font-bold text-base leading-tight mb-1">LONOWN, riserayss<br>- worry (Slowed)</h3>
            <p class="text-slate-400 text-[10px] uppercase tracking-wider mb-2">BY LONOWN</p>
            <div class="inline-flex items-center text-[10px] text-sky-200 bg-sky-900/30 px-2 py-1 rounded">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 5a1 1 0 012 0v5h2.5a.5.5 0 010 1h-3a.5.5 0 01-.5-.5V5z"/></svg>
              JBL Tune 720BT
            </div>
          </div>
        </div>
        <div class="mt-4">
          <input type="range" min="0" max="100" value="35" class="w-full">
          <div class="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>00:19</span>
            <span>03:21</span>
          </div>
          <div class="flex justify-center items-center space-x-6 mt-1">
            <button class="text-slate-300 hover:text-white transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z"/></svg></button>
            <button class="w-8 h-8 bg-sky-400 rounded-full flex items-center justify-center text-slate-900 hover:bg-sky-300 transition shadow-[0_0_15px_rgba(56,189,248,0.5)]">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
            </button>
            <button class="text-slate-300 hover:text-white transition"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11.555 14.832A1 1 0 0010 14v-2.798l-5.445 3.63A1 1 0 013 14V6a1 1 0 011.555-.832L10 8.798V6a1 1 0 011.555-.832l6 4a1 1 0 010 1.664l-6 4z"/></svg></button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Equalizer Widget -->
    <div id="widget-eq" class="desktop-widget glass-panel flex flex-col pointer-events-auto" style="bottom: 40px; left: 380px; width: 340px; transform: scale(0.9); transform-origin: bottom left;">
      <div class="drag-handle w-full h-6 flex items-center justify-center border-b border-white/5 opacity-50 hover:opacity-100">
        <div class="w-10 h-1 rounded-full bg-white/20"></div>
      </div>
      <div class="p-5 flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-slate-200 font-semibold text-xs uppercase tracking-widest">Equalizer</h3>
          <div class="flex space-x-2">
            <span class="text-[10px] text-sky-300 bg-sky-900/40 px-2 py-1 rounded">Saved</span>
            <span class="text-[10px] text-white bg-slate-700/50 px-2 py-1 rounded">Bass</span>
          </div>
        </div>
        <div class="flex justify-between items-end h-28 mb-4 px-1 relative">
          <svg class="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
            <path d="M 10 50 Q 30 30 50 40 T 90 40 T 130 50 T 170 60 T 210 55 T 250 40" fill="none" stroke="rgba(125, 211, 252, 0.4)" stroke-width="2"/>
          </svg>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="60"><span class="text-[9px] text-slate-400 mt-1">31</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="70"><span class="text-[9px] text-slate-400 mt-1">63</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="55"><span class="text-[9px] text-slate-400 mt-1">125</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="45"><span class="text-[9px] text-slate-400 mt-1">250</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="40"><span class="text-[9px] text-slate-400 mt-1">500</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="50"><span class="text-[9px] text-slate-400 mt-1">1k</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="65"><span class="text-[9px] text-slate-400 mt-1">2k</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="80"><span class="text-[9px] text-slate-400 mt-1">4k</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="60"><span class="text-[9px] text-slate-400 mt-1">8k</span></div>
          <div class="flex flex-col items-center"><input type="range" class="vertical z-10" min="0" max="100" value="45"><span class="text-[9px] text-slate-400 mt-1">16k</span></div>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <button class="glass-button py-1 text-[10px] rounded">Flat</button>
          <button class="glass-button active py-1 text-[10px] rounded font-semibold shadow-[0_0_10px_rgba(56,189,248,0.3)]">Bass</button>
          <button class="glass-button py-1 text-[10px] rounded">Treble</button>
          <button class="glass-button py-1 text-[10px] rounded">Vocal</button>
          <button class="glass-button py-1 text-[10px] rounded">Pop</button>
          <button class="glass-button py-1 text-[10px] rounded">Rock</button>
        </div>
      </div>
    </div>

    <!-- Notification -->
    <div id="widget-notif" class="desktop-widget glass-panel p-3 w-64 pointer-events-auto" style="top: 80px; right: 20px; transform: scale(0.9); transform-origin: top right;">
      <div class="drag-handle absolute inset-0 z-0"></div>
      <div class="relative z-10 pointer-events-none">
        <div class="absolute left-[-12px] top-[-12px] bottom-[-12px] w-1 bg-sky-400"></div>
        <h4 class="text-white text-[10px] font-bold uppercase mb-1 flex items-center">
          <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          Screen Recorder
        </h4>
        <p class="text-sky-300 text-xs font-semibold mb-1">Recording Started</p>
        <p class="text-slate-400 text-[10px] leading-tight">Press shortcut again to stop.</p>
      </div>
      <!-- Close button -->
      <button onclick="document.getElementById('widget-notif').style.display='none'" class="absolute top-2 right-2 text-slate-400 hover:text-white z-20 pointer-events-auto">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

  </div>

  <!-- Draggable Script -->
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const makeDraggable = (element) => {
        const handle = element.querySelector('.drag-handle') || element;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        handle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
          e.preventDefault();
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
          e.preventDefault();
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          element.style.top = (element.offsetTop - pos2) + "px";
          element.style.left = (element.offsetLeft - pos1) + "px";
          element.style.bottom = "auto"; // Remove bottom constraints once dragged
          element.style.right = "auto";
        }

        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
      };

      makeDraggable(document.getElementById('widget-music'));
      makeDraggable(document.getElementById('widget-eq'));
      makeDraggable(document.getElementById('widget-notif'));
    });
  </script>
`;

html += '\\n' + uiHtml + '\\n</body>\\n</html>';

fs.writeFileSync(path, html);
console.log('Cleaned and successfully appended the new draggable UI.');
