const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

html = html.replace(`      // --- SINGULARITY TIER ENGINE ---
      const bodyEl = document.body;
      const spotlight = document.querySelector('.singularity-spotlight');
      
      
        }
      });`, '');

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Fixed JS syntax error.');
