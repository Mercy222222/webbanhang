const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Fix the terminal output mojibake
html = html.replace(/VÃµ Há»¯u TrÃ­/g, 'Võ Hữu Trí');
html = html.replace(/VÄ©nh Long/g, 'Vĩnh Long');

// Replace contact section content
let contactSectionRegex = /<div class="space-y-6">(\s*<!-- Phone -->[\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

let newContactHtml = `
            <!-- Phone -->
            <div class="flex items-start gap-4 group">
              <div class="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center text-cyan-500 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
              </div>
              <div>
                <p class="text-sm text-zinc-500 dark:text-zinc-400 font-medium">Phone</p>
                <a href="tel:0979324949" class="text-zinc-900 dark:text-zinc-100 font-semibold hover:text-cyan-400 transition-colors">0979 324 949</a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <p class="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4">Connect</p>
              <div class="flex gap-4">
                <a href="https://www.facebook.com/HUUTRI.USER" target="_blank" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://github.com/Mercy222222" target="_blank" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#333] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </a>
                <a href="#" target="_blank" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#1DB954] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.394-.751.522-1.146.282-3.139-1.912-7.089-2.341-11.741-1.284-.453.102-.911-.184-1.014-.637-.103-.453.184-.911.637-1.014 5.093-1.155 9.444-.658 12.981 1.506.395.24.522.751.283 1.147zm1.611-3.606c-.302.488-.936.645-1.424.343-3.593-2.21-9.103-2.859-13.111-1.564-.548.176-1.135-.126-1.311-.673-.176-.548.126-1.135.673-1.311 4.606-1.488 10.669-.768 14.83 1.782.488.301.645.936.343 1.423zm.14-3.766c-4.282-2.544-11.332-2.776-15.421-1.536-.66.201-1.349-.173-1.55-.832-.201-.66.173-1.349.832-1.55 4.701-1.426 12.478-1.163 17.411 1.768.599.356.797 1.13.441 1.729-.356.598-1.129.797-1.728.441z"/></svg>
                </a>
                <a href="https://zalo.me/0979324949" target="_blank" class="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-[#0068FF] hover:text-white transition-all duration-300 hover:-translate-y-1">
                  <span class="text-xs font-bold">ZALO</span>
                </a>
              </div>
            </div>`;

if(contactSectionRegex.test(html)) {
  html = html.replace(contactSectionRegex, '<div class="space-y-6">\n' + newContactHtml + '\n</div>\n</div>\n</div>\n</section>');
}

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed contact section and remaining mojibake.');
