const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

html = html.replace(`      
          }
        }
      });`, '');

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Fixed hanging brackets.');
