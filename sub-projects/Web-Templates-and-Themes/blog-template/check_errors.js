const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('PAGE ERROR:', msg.text());
    }
  });

  page.on('pageerror', error => {
    console.log('PAGE ERROR EVENT:', error.message);
  });

  await page.goto('http://localhost:8080/index-portfolio.html');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
