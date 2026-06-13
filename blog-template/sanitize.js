const fs = require('fs');
let c = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html.bak', 'utf8');

// The file was likely corrupted by a Windows-1252 to UTF-8 roundtrip.
// A simpler fix is to just strip control characters (C0 and C1) that break the HTML parser.
// C0: 0x00-0x1F (except \t, \n, \r)
// C1: 0x80-0x9F
c = c.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', c, 'utf8');
console.log('Sanitized HTML written.');
