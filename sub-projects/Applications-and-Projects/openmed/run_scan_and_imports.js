import fs from 'fs';
import path from 'path';

const projectRoot = 'c:\\webbanhang\\openmed';
const rawScanPath = path.join(projectRoot, '.understand-anything', 'intermediate', 'scan-result-raw.json');
const inputPath = path.join(projectRoot, '.understand-anything', 'intermediate', 'import-map-input.json');

// Read raw scan result
const rawScan = JSON.parse(fs.readFileSync(rawScanPath, 'utf8'));

// Format for import-map-input
const inputJson = {
  projectRoot: projectRoot,
  files: rawScan.files
};

fs.writeFileSync(inputPath, JSON.stringify(inputJson, null, 2), 'utf8');
console.log('Created import-map-input.json');
