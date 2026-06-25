const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Replace all mangled versions of Võ Hữu Trí
html = html.replace(/V\w*\s+H\w*\s+Tr\w*/g, 'Võ Hữu Trí');
html = html.replace(/VÃµ Há»¯u TrÃ­/g, 'Võ Hữu Trí');
html = html.replace(/Vo H\?u Tr/g, 'Võ Hữu Trí');
html = html.replace(/Vinh Long/ig, 'Vĩnh Long');
html = html.replace(/VÄ©nh Long/ig, 'Vĩnh Long');

// Also ensure we restore "Vo Huu Tri" in English translations if it got replaced
html = html.replace(/"footer.rights": "© 2026 Võ Hữu Trí/g, '"footer.rights": "© 2026 Vo Huu Tri');

// Check the contact section to make sure it exists
let contactMatch = html.match(/HUUTRI\.USER/);
if (!contactMatch) {
  console.log("Contact section is missing social links. Adding them now...");
  // Regex to find the phone block and add the social links after it
  let phoneBlockRegex = /<div class="flex items-start gap-4">\s*<div class="p-2\.5 rounded-lg bg-emerald-100 dark:bg-emerald-900\/30 text-cyan-400 text-lg flex items-center justify-center flex-shrink-0">\s*<i class="fas fa-phone-alt"><\/i>\s*<\/div>\s*<div>\s*<p class="text-sm font-semibold text-zinc-400 ">Phone<\/p>\s*<a href="tel:0979324949" class="text-sm font-semibold hover:underline">0979 324 949<\/a>\s*<\/div>\s*<\/div>/;
  
  if (phoneBlockRegex.test(html)) {
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
                <a href="#" target="_blank" title="Spotify" class="relative w-12 h-12 rounded-full bg-zinc-100/50 dark:bg-zinc-800/40 backdrop-blur-xl border border-zinc-200/50 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_24px_-8px_rgba(0,0,0,0.5)] text-zinc-600 dark:text-zinc-300 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-[#1DB954]/20 hover:border-[#1DB954]/40 hover:text-[#1DB954] hover:shadow-[0_8px_32px_rgba(29,185,84,0.35)] group overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-tr from-[#1DB954]/0 via-[#1DB954]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <i class="fab fa-spotify text-lg relative z-10 transition-transform duration-500 group-hover:scale-110"></i>
                </a>
              </div>
            </div>`;
      html = html.replace(phoneBlockRegex, newContactHtml);
  }
} else {
  console.log("Contact links exist.");
}

// Ensure shader fixes are applied
html = html.replace(/attribute vec3 color;\s*varying vec3 vColor;/g, 'varying vec3 vColor;');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Script completed.');
