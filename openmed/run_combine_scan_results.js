import fs from 'fs';
import path from 'path';

const projectRoot = 'c:\\webbanhang\\openmed';
const rawScanPath = path.join(projectRoot, '.understand-anything', 'intermediate', 'scan-result-raw.json');
const rawImportsPath = path.join(projectRoot, '.understand-anything', 'intermediate', 'import-map-output.json');
const outputPath = path.join(projectRoot, '.understand-anything', 'intermediate', 'scan-result.json');

const rawScan = JSON.parse(fs.readFileSync(rawScanPath, 'utf8'));
const rawImports = JSON.parse(fs.readFileSync(rawImportsPath, 'utf8'));

// Synthesize scan-result
const scanResult = {
  name: "openmed",
  description: "A Python-based toolkit for healthcare AI and clinical natural language processing.",
  readmeHead: "OpenMed is a toolkit for clinical NLP, PII anonymization, and safety sweeps on medical texts.",
  languages: ["python", "markdown", "swift", "yaml", "html", "css", "json", "makefile"],
  frameworks: ["FastAPI", "Typer", "CoreML", "MLX"],
  files: rawScan.files,
  totalFiles: rawScan.totalFiles,
  filteredByIgnore: rawScan.filteredByIgnore,
  estimatedComplexity: rawScan.estimatedComplexity,
  stats: rawScan.stats,
  importMap: rawImports.importMap,
  scriptCompleted: true
};

fs.writeFileSync(outputPath, JSON.stringify(scanResult, null, 2), 'utf8');
console.log('Created scan-result.json');
