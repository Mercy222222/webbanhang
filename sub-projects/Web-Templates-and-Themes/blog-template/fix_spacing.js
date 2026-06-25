const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// Fix the missing space in the GSAP text split
html = html.replace(/span\.innerText = word \+ ' ';\s*span\.style\.display = 'inline-block';/, 
`span.innerHTML = word + '&nbsp;';
          span.style.display = 'inline-block';`);

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Fixed spacing issue in GSAP text scrub!');
