const fs = require('fs');
let data = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// Remove uppercase eyebrows
data = data.replace(/uppercase tracking-wider/g, '');
data = data.replace(/uppercase tracking-wide/g, '');

// Increase label sizes from xs to sm
data = data.replace(/text-xs font-bold/g, 'text-sm font-semibold');

// Reduce button padding if it looks too AI default
data = data.replace(/py-3 rounded-md/g, 'py-2 rounded-md');

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', data);
console.log('Done');
