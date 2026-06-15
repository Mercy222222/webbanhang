const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Replace literal newlines with escaped newlines inside double-quoted strings in W2
html = html.replace(/"protect\r?\nyour data\r?\nwith securify"/g, '"protect\\\\nyour data\\\\nwith securify"');
html = html.replace(/"Career\r?\nChronicles\."/g, '"Career\\\\nChronicles."');

html = html.replace(/"bảo vệ\r?\ndữ liệu của bạn\r?\nvới securify"/g, '"bảo vệ\\\\ndữ liệu của bạn\\\\nvới securify"');
html = html.replace(/"Biên niên sử\r?\nSự nghiệp\."/g, '"Biên niên sử\\\\nSự nghiệp."');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed literal newlines in strings.');
