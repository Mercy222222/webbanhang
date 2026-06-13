const fs = require('fs');

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

let html = fs.readFileSync('index-portfolio.html.bak', 'utf8');
let decoded = decodeMojibake(html);
fs.writeFileSync('test_decoded.html', decoded, 'utf8');

console.log("Has Trang chủ?", decoded.includes('Trang chủ'));
console.log("Has Trang chá»§?", decoded.includes('Trang chá»§'));
