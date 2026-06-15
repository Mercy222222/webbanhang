const fs = require('fs');
let html = fs.readFileSync('index-portfolio.html', 'utf8');

// 1. Photon Ring
html = html.replace(
  /\[\[94, 4, 0x00ffff, 1\.0\], \[100, 2\.5, 0xff4400, 0\.7\], \[88, 1\.5, 0xffffff, 0\.8\]\]/g,
  '[[220, 8, 0x00ffff, 1.0], [240, 5, 0xff4400, 0.7], [210, 3, 0xffffff, 0.8]]'
);

// 2. Accretion Disk Size and Count
html = html.replace(/const diskCount = 15000;/g, 'const diskCount = 35000;');
html = html.replace(/const r = 110 \+ Math\.pow\(Math\.random\(\), 0\.5\) \* 420;/g, 'const r = 260 + Math.pow(Math.random(), 0.5) * 800;');
html = html.replace(/const h = \(Math\.random\(\) - 0\.5\) \* 40 \* \(1 - \(r - 110\) \/ 420\);/g, 'const h = (Math.random() - 0.5) * 60 * (1 - (r - 260) / 800);');
// Update shader uniform logic for accretion disk
html = html.replace(/float angle = pAngle \+ time \* pSpeed \* 0\.4 \/ sqrt\(pRadius \/ 110\.0\);/g, 'float angle = pAngle + time * pSpeed * 0.4 / sqrt(pRadius / 260.0);');
html = html.replace(/vAlpha = 1\.0 - smoothstep\(400\.0, 530\.0, pRadius\);/g, 'vAlpha = 1.0 - smoothstep(850.0, 1060.0, pRadius);');
html = html.replace(/const t = \(r - 110\) \/ 420;/g, 'const t = (r - 260) / 800;');

// 3. Planets
let oldPlanets = `      const planetDefs = [
        { r: 18, orbitR: 220, speed: 1.8,  color: 0xaaaaff, emissive: 0x3333aa, name: 'Mercury', inc: 0.05 },
        { r: 28, orbitR: 370, speed: 1.2,  color: 0xffcc88, emissive: 0xaa4400, name: 'Venus',   inc: 0.10 },
        { r: 32, orbitR: 550, speed: 0.9,  color: 0x3399ff, emissive: 0x001166, name: 'Earth',   inc: 0.02, hasMoon: true },
        { r: 22, orbitR: 720, speed: 0.7,  color: 0xff5533, emissive: 0x881100, name: 'Mars',    inc: 0.08 },
        { r: 70, orbitR: 980, speed: 0.45, color: 0xffcc77, emissive: 0x664400, name: 'Jupiter', inc: 0.03, hasRing: true },
        { r: 55, orbitR:1220, speed: 0.32, color: 0xddbb66, emissive: 0x553300, name: 'Saturn',  inc: 0.15, hasRing: true, bigRing: true },
        { r: 40, orbitR:1450, speed: 0.22, color: 0x66bbff, emissive: 0x003366, name: 'Uranus',  inc: 0.20 },
      ];`;

let newPlanets = `      const planetDefs = [
        { r: 45, orbitR: 380, speed: 1.8,  color: 0xaaaaff, emissive: 0x3333aa, name: 'Mercury', inc: 0.05 },
        { r: 70, orbitR: 580, speed: 1.2,  color: 0xffcc88, emissive: 0xaa4400, name: 'Venus',   inc: 0.10 },
        { r: 80, orbitR: 850, speed: 0.9,  color: 0x3399ff, emissive: 0x001166, name: 'Earth',   inc: 0.02, hasMoon: true },
        { r: 55, orbitR: 1100, speed: 0.7, color: 0xff5533, emissive: 0x881100, name: 'Mars',    inc: 0.08 },
        { r: 180, orbitR: 1550, speed: 0.45, color: 0xffcc77, emissive: 0x664400, name: 'Jupiter', inc: 0.03, hasRing: true },
        { r: 140, orbitR: 2050, speed: 0.32, color: 0xddbb66, emissive: 0x553300, name: 'Saturn',  inc: 0.15, hasRing: true, bigRing: true },
        { r: 100, orbitR: 2500, speed: 0.22, color: 0x66bbff, emissive: 0x003366, name: 'Uranus',  inc: 0.20 },
      ];`;
html = html.replace(oldPlanets, newPlanets);

// Make Planet geometries high-res
html = html.replace(/new THREE\.SphereGeometry\(def\.r, 24, 24\)/g, 'new THREE.SphereGeometry(def.r, 64, 64)');
// Make Moon high-res and larger
html = html.replace(/new THREE\.SphereGeometry\(8, 12, 12\)/g, 'new THREE.SphereGeometry(18, 32, 32)');
html = html.replace(/const rGeo = new THREE\.RingGeometry\(ringInner, ringOuter, 64\);/g, 'const rGeo = new THREE.RingGeometry(ringInner, ringOuter, 128);');

// 4. Star (Sun) and Corona
html = html.replace(/new THREE\.SphereGeometry\(65, 48, 48\)/g, 'new THREE.SphereGeometry(150, 64, 64)');
html = html.replace(/\[85, 105, 130\]\.forEach/g, '[190, 230, 280].forEach');

// 5. Asteroid Belt
html = html.replace(/const r = 830 \+ Math\.random\(\) \* 100;/g, 'const r = 1300 + Math.random() * 200;');

// 6. Camera Position
html = html.replace(/const targetY = 1200 - bgMouseY \* 1\.2;/g, 'const targetY = 600 - bgMouseY * 1.5;');
html = html.replace(/const targetZ = 3200 - Math\.min\(scrollY \* 0\.25, 2200\);/g, 'const targetZ = 3800 - Math.min(scrollY * 0.3, 2600);');

fs.writeFileSync('index-portfolio.html', html, 'utf8');
console.log('Updates applied!');
