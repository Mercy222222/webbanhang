const fs = require('fs');

const docXml = fs.readFileSync('extracted_docx/word/document.xml', 'utf8');
const relsXml = fs.readFileSync('extracted_docx/word/_rels/document.xml.rels', 'utf8');

const rels = {};
const relRegex = /Id="([^"]+)" Type="[^"]+" Target="([^"]+)"/g;
let match;
while ((match = relRegex.exec(relsXml)) !== null) {
    rels[match[1]] = match[2];
}

const paragraphs = docXml.split('<w:p ');
let results = [];
let currentTextContext = "";
let recentContexts = [];

for (let p of paragraphs) {
    let text = "";
    let tMatch;
    const tRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
    while ((tMatch = tRegex.exec(p)) !== null) {
        text += tMatch[1];
    }
    text = text.trim();
    if (text.length > 0) {
        recentContexts.push(text);
        if (recentContexts.length > 3) recentContexts.shift();
    }
    
    const imgRegex = /r:embed="([^"]+)"|r:id="([^"]+)"/g;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(p)) !== null) {
        let rId = imgMatch[1] || imgMatch[2];
        if (rels[rId] && rels[rId].includes('image')) {
            results.push(`Image: ${rels[rId]}\nContext: ${recentContexts.join(' || ')}\n`);
        }
    }
}

fs.writeFileSync('accurate_mapping.txt', results.join('\n'));
console.log('Done mapping.');
