const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

const oldGridRegex = /<div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 bento-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/;

const newGrid = `<div class="mt-16 bento-grid">
          <!-- Avatar Card -->
          <div class="securify-card col-span-12 md:col-span-4 h-[350px] p-0 overflow-hidden flex items-center justify-center gs-reveal-up group relative">
            <div class="glare"></div>
            <img src="assets/images/vo_huu_tri.jpg" onerror="this.src='https://picsum.photos/seed/hacker/600/800'" alt="Võ Hữu Trí" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent"></div>
            <div class="absolute bottom-6 left-6 z-10">
              <h3 class="text-2xl font-bold text-white">Võ Hữu Trí</h3>
              <p class="text-cyan-400 font-mono text-sm mt-1">Fullstack Developer</p>
            </div>
          </div>

          <!-- The Journey / Bio -->
          <div class="securify-card col-span-12 md:col-span-5 p-8 flex flex-col justify-between gs-reveal-up" style="animation-delay: 0.1s">
            <div class="glare"></div>
            <div>
              <h3 class="text-xl text-white font-bold mb-4">Background & Bio</h3>
              <p id="label-about-bio" class="text-slate-400 text-lg leading-relaxed">I am an IT student from University of Science, TP.HCM. With a deep passion for programming, I am constantly learning and adapting to new technologies to build robust and beautiful applications.</p>
            </div>
            <div class="mt-6 flex flex-wrap gap-2">
              <span class="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-300"><i class="fas fa-envelope mr-2 text-cyan-400"></i>vohuuntri@gmail.com</span>
              <span class="px-3 py-1 text-xs rounded-full bg-slate-800/50 text-slate-300"><i class="fas fa-map-marker-alt mr-2 text-emerald-400"></i>Ho Chi Minh City</span>
            </div>
          </div>

          <!-- 100% Commitment -->
          <div class="securify-card col-span-12 md:col-span-3 p-8 flex items-center justify-center gs-reveal-up" style="animation-delay: 0.2s">
            <div class="glare"></div>
            <div class="text-center">
              <span class="block text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-emerald-400">100%</span>
              <span class="block text-xs uppercase text-slate-500 font-mono mt-2">Commitment</span>
            </div>
          </div>
        </div>
      </div>
    </section>`;

html = html.replace(oldGridRegex, newGrid);

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully injected Avatar and Bio into Bento Grid.');
