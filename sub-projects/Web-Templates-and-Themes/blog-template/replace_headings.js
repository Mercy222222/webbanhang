const fs = require('fs');
let data = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// Replace standard headings with text-balance
data = data.replace(/text-3xl font-bold/g, 'text-3xl font-bold text-balance');
data = data.replace(/class="text-lg font-bold text-zinc-800/g, 'class="text-lg font-bold text-zinc-900 text-balance');

// Clean up some redundant borders or backgrounds if any
data = data.replace(/border-zinc-200 dark:border-zinc-800/g, 'border-zinc-200/50 dark:border-zinc-800/50');

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', data);
console.log('Done');
