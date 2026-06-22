const puppeteer = require('puppeteer');

(async () => {
  console.log("Đang khởi động trình duyệt để xuất PDF...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Mở file HTML với tham số ?print-pdf của reveal.js
  const url = 'file:///d:/webbanhang/experiments/flue-simple-agent/BaoCao_CanvaStyle.html?print-pdf';
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  // Điều chỉnh tỷ lệ trang PDF cho đúng chuẩn 16:9 của slide
  await page.pdf({ 
    path: 'BaoCao_Canva_Import.pdf', 
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log("Xuất PDF thành công! Đã tạo file BaoCao_Canva_Import.pdf");
})();
