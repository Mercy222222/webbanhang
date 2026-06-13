const fs = require('fs');

let html = fs.readFileSync('index-portfolio.html', 'utf8');
let idx1 = html.indexOf('<!-- Social Links -->');
let idx2 = html.indexOf('<!-- Social Links -->', idx1 + 1);

if (idx2 !== -1) {
  // Find the end of the second social links block.
  // It is followed by `</div>\n          </div>\n          \n          <!-- Right: Contact Form -->`
  let rightContactIdx = html.indexOf('<!-- Right: Contact Form -->', idx2);
  if (rightContactIdx !== -1) {
    // Keep everything up to idx2, and everything from rightContactIdx
    let newHtml = html.substring(0, idx2) + '          </div>\n        </div>\n\n        ' + html.substring(rightContactIdx);
    fs.writeFileSync('index-portfolio.html', newHtml, 'utf8');
    console.log('Duplicate social links removed!');
  } else {
    console.log('Could not find Right: Contact Form');
  }
} else {
  console.log('No duplicate found');
}
