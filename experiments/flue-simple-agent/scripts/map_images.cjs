const fs = require('fs');

const docXml = fs.readFileSync('extracted_docx/word/document.xml', 'utf8');
const relsXml = fs.readFileSync('extracted_docx/word/_rels/document.xml.rels', 'utf8');

// Parse rels
const rels = {};
const relRegex = /Id="([^"]+)" Type="[^"]+" Target="([^"]+)"/g;
let match;
while ((match = relRegex.exec(relsXml)) !== null) {
    rels[match[1]] = match[2];
}

// Find text before images
const imageRegex = /<a:blip r:embed="([^"]+)"/g;
let results = [];
let imgMatch;
while ((imgMatch = imageRegex.exec(docXml)) !== null) {
    let rId = imgMatch[1];
    let imagePath = rels[rId];
    
    // Find some text before this image (e.g. 200 characters of text)
    let index = imgMatch.index;
    let beforeXml = docXml.substring(Math.max(0, index - 800), index);
    
    // strip tags
    let textBefore = beforeXml.replace(/<[^>]+>/g, '').trim();
    // take last 50 words
    let words = textBefore.split(/\s+/);
    let context = words.slice(Math.max(0, words.length - 20)).join(' ');
    
    results.push(`Image: ${imagePath} | Context: ${context}`);
}

fs.writeFileSync('image_mapping.txt', results.join('\n'));
console.log('Image mapping done.');
