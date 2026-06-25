const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1280, height: 720 });
    
    const fileUrl = 'file://' + path.join(__dirname, 'BaoCao_CanvaStyle.html').replace(/\\/g, '/') + '?print-pdf';
    console.log('Generating PDF from:', fileUrl);
    
    await page.goto(fileUrl, { waitUntil: 'networkidle0' });
    
    // Give Reveal.js extra time to arrange print layout
    await new Promise(r => setTimeout(r, 2000));
  
    await page.pdf({
      path: 'BaoCao_DoAn_CanvaStyle.pdf',
      printBackground: true,
      width: '1280px',
      height: '720px',
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
  
    await browser.close();
    console.log('PDF Generated successfully!');
  } catch (err) {
    console.error('Error generating PDF:', err);
  }
})();
