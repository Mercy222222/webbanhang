const fs = require('fs');
let html = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

const newImgUrl = "https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/656361180_1217671007059244_5545171905336345277_n.jpg?stp=dst-jpg_tt6&cstp=mx1446x1429&ctp=s200x200&_nc_cat=102&ccb=1-7&_nc_sid=1d2534&_nc_ohc=G6ckmJz6gZUQ7kNvwEZtsfD&_nc_oc=Adqc9bnkbGaj4ZUNm-i2nDf49m_Hte85kbQbz3XWg3VJeDlLKvLBVsF0xJgtckF6CDo3qm19KJFOlxZVFWiTjEwO&_nc_zt=24&_nc_ht=scontent.fsgn2-8.fna&_nc_gid=0ZWCYjDL0TKrNG4crXkkGw&_nc_ss=7b2a8&oh=00_Af9hvuIjIGo2OV7S8gMRXGXPfBz2qimMgsuTZM7nPmE_Fw&oe=6A31EB40";

// Find the avatar image tag which currently has src="assets/images/vo_huu_tri.jpg"
html = html.replace(/src="assets\/images\/vo_huu_tri\.jpg"/, `src="${newImgUrl}"`);

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', html);
console.log('Successfully updated Avatar image URL.');
