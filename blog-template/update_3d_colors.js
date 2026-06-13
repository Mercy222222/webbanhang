const fs = require('fs');
let data = fs.readFileSync('d:/webbanhang/blog-template/index-portfolio.html', 'utf8');

// Replace sectionColors block
const oldColors = `    const sectionColors = {
      home: { c1: '#3b82f6', c2: '#10b981' },
      about: { c1: '#10b981', c2: '#06b6d4' },
      workExp: { c1: '#06b6d4', c2: '#6366f1' },
      skills: { c1: '#6366f1', c2: '#a855f7' },
      certificates: { c1: '#a855f7', c2: '#ec4899' },
      projects: { c1: '#ec4899', c2: '#f43f5e' },
      contact: { c1: '#f43f5e', c2: '#3b82f6' }
    };`;

const newColors = `    // Taste-Skill Editorial Monochromatic Colors with Emerald Accent
    const sectionColors = {
      home: { c1: '#10b981', c2: '#52525b' },
      about: { c1: '#52525b', c2: '#3f3f46' },
      workExp: { c1: '#3f3f46', c2: '#27272a' },
      skills: { c1: '#27272a', c2: '#059669' },
      certificates: { c1: '#059669', c2: '#10b981' },
      projects: { c1: '#10b981', c2: '#52525b' },
      contact: { c1: '#52525b', c2: '#10b981' }
    };`;

data = data.replace(oldColors, newColors);

// Replace currentC1 and currentC2 initial values
data = data.replace(/let currentC1 = new THREE.Color\('#3b82f6'\);/g, "let currentC1 = new THREE.Color('#10b981');");
data = data.replace(/let currentC2 = new THREE.Color\('#10b981'\);/g, "let currentC2 = new THREE.Color('#52525b');");

// Replace heroUniforms initial values just in case
data = data.replace(/uColor1: { value: new THREE.Color\('#3b82f6'\) }/g, "uColor1: { value: new THREE.Color('#10b981') }");
data = data.replace(/uColor2: { value: new THREE.Color\('#10b981'\) }/g, "uColor2: { value: new THREE.Color('#52525b') }");

// Replace accretion disk orange with emerald
data = data.replace(/color: 0xffa044/g, "color: 0x10b981");

// Replace pure black singularity with deep zinc
data = data.replace(/color: 0x010103/g, "color: 0x09090b");

fs.writeFileSync('d:/webbanhang/blog-template/index-portfolio.html', data);
console.log('3D Colors Updated');
