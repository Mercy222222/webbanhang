const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// Fix Logo text
html = html.replace(/<a href="#" class="([^"]*?cyber-glitch-logo[^"]*?)" data-text="([^"]*)">.*?<\/a>/g, '<a href="#" class="$1" data-text="Võ Hữu Trí ⚡">Võ Hữu Trí ⚡</a>');

// Fix Logo CSS pseudo-elements content
html = html.replace(/content:\s*'[^']*';\s*\/\*\s*cyber-glitch-logo\s*\*\//g, "content: 'Võ Hữu Trí ⚡'; /* cyber-glitch-logo */");
html = html.replace(/\.cyber-glitch-logo::before,\s*\.cyber-glitch-logo::after\s*\{\s*content:\s*'[^']*';/g, ".cyber-glitch-logo::before,\n    .cyber-glitch-logo::after {\n      content: 'Võ Hữu Trí ⚡';");

// Fix i18n data
html = html.replace(/"footer\.madeWith":\s*".*?"/g, '"footer.madeWith": "Được tạo với 🤍 tại Sài Gòn"');
html = html.replace(/name:\s*".*?SMM Panel"/g, 'name: "Võ Hữu Trí SMM Panel"');
html = html.replace(/name:\s*".*?Blogs"/g, 'name: "Võ Hữu Trí Blogs"');

// Fix footer text directly
html = html.replace(/<span class="font-mono opacity-60">.*?<\/span>/g, '<span class="font-mono opacity-60">v3.0 · Powered by HTML5 & Tailwind</span>');
html = html.replace(/Made with .*? in Saigon by <span class="font-bold text-white">.*?<\/span>/g, 'Made with 🤍 in Saigon by <span class="font-bold text-white">Võ Hữu Trí</span>');

// Fix nav dots (HOME â€¢ ABOUT ...)
html = html.replace(/<span>[^<]*?<\/span>\s*<a href="#about"/g, '<span>•</span>\n        <a href="#about"');
html = html.replace(/<span>[^<]*?<\/span>\s*<a href="#projects"/g, '<span>•</span>\n        <a href="#projects"');
html = html.replace(/<span>[^<]*?<\/span>\s*<a href="#contact"/g, '<span>•</span>\n        <a href="#contact"');

// Fix comments (the Mojibake in block comments /* ... */)
html = html.replace(/\/\*\s*.*?\s*\*\//g, (match) => {
    // We can't perfectly recover them but we can just leave them or strip the corrupted prefix
    return match.replace(/\?"?\?"?\?"?\s*/g, '✦ ').replace(/\s*\?"?\?"?\?"?/g, ' ✦');
});

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Fixed text strings.');
