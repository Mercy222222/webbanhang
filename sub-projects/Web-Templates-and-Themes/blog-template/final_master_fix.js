const fs = require('fs');

// 1. Decoder Function
const win1252 = {
  8364: 128, 129: 129, 8218: 130, 402: 131, 8222: 132, 8230: 133, 8224: 134, 8225: 135,
  710: 136, 8240: 137, 352: 138, 8249: 139, 338: 140, 141: 141, 381: 142, 143: 143,
  144: 144, 8216: 145, 8217: 146, 8220: 147, 8221: 148, 8226: 149, 8211: 150, 8212: 151,
  732: 152, 8482: 153, 353: 154, 8250: 155, 339: 156, 157: 157, 382: 158, 376: 159
};

function decodeMojibake(text) {
  let bytes = [];
  for (let i = 0; i < text.length; i++) {
    let c = text.charCodeAt(i);
    if (c < 256) {
        bytes.push(c);
    } else if (win1252[c]) {
        bytes.push(win1252[c]);
    } else {
        let utf8Bytes = Buffer.from(text[i], 'utf8');
        for (let b of utf8Bytes) bytes.push(b);
    }
  }
  return Buffer.from(bytes).toString('utf8');
}

// 2. Read backup which has the 3D code and the mojibake
let html = fs.readFileSync('index-portfolio.html.bak', 'utf8');

// Decode to pristine UTF-8!
html = decodeMojibake(html);

// 3. Fix shaders (Duplicate attributes)
html = html.replace(/attribute vec3 color;\n\s*varying vec3 vColor;/g, 'varying vec3 vColor;');
html = html.replace(/attribute vec3 color;\s*varying vec3 vColor;/g, 'varying vec3 vColor;');
html = html.replace(/attribute float pRadius;\n\s*varying float vRadius;/g, 'varying float vRadius;');
html = html.replace(/attribute float pRadius;\s*varying float vRadius;/g, 'varying float vRadius;');

// 4. Fix Vite string parse errors (Literal newlines inside strings in W2)
html = html.replace(/"protect\r?\nyour data\r?\nwith securify"/g, '"protect\\\\nyour data\\\\nwith securify"');
html = html.replace(/"Career\r?\nChronicles\."/g, '"Career\\\\nChronicles."');
html = html.replace(/"bảo vệ\r?\ndữ liệu của bạn\r?\nvới securify"/g, '"bảo vệ\\\\ndữ liệu của bạn\\\\nvới securify"');
html = html.replace(/"Biên niên sử\r?\nSự nghiệp\."/g, '"Biên niên sử\\\\nSự nghiệp."');

// 5. Fix the (VI/EN) comment that caused parse5 error
html = html.replace(/\/\*[\s\S]*?DỮ LIỆU ĐA NGÔN NGỮ[\s\S]*?\*\//, '/* DỮ LIỆU ĐA NGÔN NGỮ (VI/EN) */');
html = html.replace(/â”€â”€â”€/g, '---');

// 6. Contact Section Update (Remove Email & Location, Add Socials)
let emailBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Email<\/p>[\s\S]*?<\/div>\s*<\/div>/;
let locBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Location<\/p>[\s\S]*?<\/div>\s*<\/div>/;

html = html.replace(emailBlockRegex, '');
html = html.replace(locBlockRegex, '');

let phoneBlockRegex = /<div class="flex items-start gap-4">[\s\S]*?<p class="text-sm font-semibold text-zinc-400 ">Phone<\/p>[\s\S]*?<\/div>\s*<\/div>/;

let newContactHtml = `            <div class="flex items-start gap-4">
              <div class="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-cyan-400 text-lg flex items-center justify-center flex-shrink-0">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div>
                <p class="text-sm font-semibold text-zinc-400 ">Phone</p>
                <a href="tel:0979324949" class="text-sm font-semibold hover:underline">0979 324 949</a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-6 mt-4 border-t border-zinc-200/50 dark:border-white/10">
              <p class="text-[11px] font-bold text-zinc-400 mb-5 tracking-[0.2em] uppercase">Connect</p>
              <div class="flex gap-3 flex-wrap">
                <!-- Facebook -->
                <a href="https://www.facebook.com/HUUTRI.USER" target="_blank" title="Facebook" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-blue-600/20 hover:border-blue-500/40 hover:text-blue-400 hover:shadow-[0_8px_32px_rgba(37,99,235,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-facebook-f text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
                
                <!-- GitHub -->
                <a href="https://github.com/Mercy222222" target="_blank" title="GitHub" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#333]/90 hover:border-[#333]/40 hover:text-white hover:shadow-[0_8px_32px_rgba(51,51,51,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#333]/0 via-[#333]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-github text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
                
                <!-- Zalo -->
                <a href="https://zalo.me/0979324949" target="_blank" title="Zalo" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#0068FF]/20 hover:border-[#0068FF]/40 hover:text-[#0068FF] hover:shadow-[0_8px_32px_rgba(0,104,255,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#0068FF]/0 via-[#0068FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span class="text-[10px] font-bold relative z-10 transition-transform duration-500 group-hover:scale-110">ZALO</span>
                </a>
                
                <!-- Spotify -->
                <a href="https://open.spotify.com/user/mercy222222" target="_blank" title="Spotify" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#1DB954]/20 hover:border-[#1DB954]/40 hover:text-[#1DB954] hover:shadow-[0_8px_32px_rgba(29,185,84,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#1DB954]/0 via-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-spotify text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
              </div>
            </div>`;
html = html.replace(phoneBlockRegex, newContactHtml);

// 7. Make the ASCII Torus Card smaller!
// Change columns from 7/5 to 8/4
html = html.replace('lg:col-span-7 flex flex-col', 'lg:col-span-8 flex flex-col');
html = html.replace('lg:col-span-5 relative h-[400px]', 'lg:col-span-4 relative h-[300px]');
html = html.replace('lg:h-[500px]', 'lg:h-[350px]');

// Scale down the Torus itself in JS
html = html.replace('const geometry = new THREE.TorusKnotGeometry(2.5, 0.8, 100, 16);', 'const geometry = new THREE.TorusKnotGeometry(1.6, 0.5, 100, 16);');
// Add opacity reduction to Ascii container to make background planets pop even more
html = html.replace("heroEffect.domElement.style.color = '#06b6d4';", "heroEffect.domElement.style.color = 'rgba(6, 182, 212, 0.6)';");

// Make the font size smaller for ASCII
html = html.replace("heroEffect = new THREE.AsciiEffect(heroRenderer, ' .:-+*=%@#', { invert: true, color: false, resolution: 0.2 });", "heroEffect = new THREE.AsciiEffect(heroRenderer, ' .:-+*=%@#', { invert: true, color: false, resolution: 0.25 });");

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Final restoration complete!');
