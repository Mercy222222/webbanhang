const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// 1. Fix Three.js duplicated attributes (this caused WebGL compile errors earlier)
html = html.replace(/attribute vec3 color;\n\s*varying vec3 vColor;/g, 'varying vec3 vColor;');
// Also check for any inline variants
html = html.replace(/attribute vec3 color;\s*varying vec3 vColor;/g, 'varying vec3 vColor;');

// 2. Fix the Vite parse5 control character error around line 1248
// The comment string contains invalid characters that break Vite
let viteCommentRegex = /\/\* [^\*]*?\(VI\/EN\)[^\*]*?\*\//;
html = html.replace(viteCommentRegex, '/* MULTILINGUAL DATA (VI/EN) */');

// Remove global invisible control characters that break Vite
html = html.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '');

// 3. Fix the HUD mojibake explicitly
html = html.replace(/Name: V[^\n]*Tr[^\n]*/g, 'Name: Võ Hữu Trí');
html = html.replace(/V[^\n]*nh Long/g, 'Vĩnh Long');

// 4. Fix W2 translation object mojibake
// Instead of replacing the entire object which might truncate, let's replace specific broken properties
html = html.replace(/"footer\.rights": "Â© 2026 V[^\n]*TrÃ\xad\. Báº£o lÆ°u má»i quyá»n\."/, '"footer.rights": "© 2026 Võ Hữu Trí. Bảo lưu mọi quyền."');
html = html.replace(/"footer\.rights": "Ac 2026 Vo H\?u Tr[^\n]*\."/, '"footer.rights": "© 2026 Võ Hữu Trí. Bảo lưu mọi quyền."');

html = html.replace(/name: "V[^\n]*Tr[^\n]*"/g, 'name: "Võ Hữu Trí"');
html = html.replace(/company: "D[^\n]*An Freelance"/g, 'company: "Dự án Freelance"');
html = html.replace(/position: "L[^\n]*p tr[^\n]*nh vi[^\n]*n Web Fullstack"/g, 'position: "Lập trình viên Web Fullstack"');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Surgical fixes applied.');
