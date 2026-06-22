const fs = require('fs');
const path = require('path');

let html = fs.readFileSync('BaoCao_CanvaStyle.html', 'utf8');

const imgRegex = /src="assets\/([^"]+)"/g;
let match;
while ((match = imgRegex.exec(html)) !== null) {
    const filename = match[1];
    const filepath = path.join('assets', filename);
    if (fs.existsSync(filepath)) {
        const ext = path.extname(filename).substring(1);
        const mimeType = ext === 'jpeg' || ext === 'jpg' ? 'image/jpeg' : 'image/png';
        const base64 = fs.readFileSync(filepath, 'base64');
        const dataUri = `data:${mimeType};base64,${base64}`;
        html = html.replace(`src="assets/${filename}"`, `src="${dataUri}"`);
    }
}

fs.writeFileSync('BaoCao_DoAn_BanHoanChinh.html', html);
console.log('Single file generated!');
