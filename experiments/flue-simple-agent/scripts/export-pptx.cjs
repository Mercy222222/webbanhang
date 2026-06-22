const puppeteer = require('puppeteer');
const PptxGenJS = require('pptxgenjs');
const fs = require('fs');

(async () => {
  console.log("Đang khởi động trình duyệt để chụp ảnh...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Đặt kích thước màn hình mặc định là Full HD
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  
  // Mở file HTML với tham số để in
  const path = require('path');
  const fileUrl = 'file://' + path.resolve(__dirname, 'BaoCao_CanvaStyle.html');
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Tắt hiệu ứng chuyển cảnh để chụp ảnh tức thì
  await page.evaluate(() => {
    Reveal.configure({ transition: 'none' });
    
    // Đảm bảo body và html không chặn chiều cao
    document.documentElement.style.height = 'auto';
    document.documentElement.style.overflow = 'visible';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'visible';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    
    // Tắt hoàn toàn auto-scale của Reveal.js để ảnh và nội dung không bị cắt/thu nhỏ
    const reveal = document.querySelector('.reveal');
    const slides = document.querySelector('.reveal .slides');
    if (reveal) { 
      reveal.style.height = 'auto'; 
      reveal.style.overflow = 'visible'; 
    }
    if (slides) { 
      slides.style.width = '1920px'; 
      slides.style.height = 'auto'; 
      slides.style.transform = 'none'; 
      slides.style.margin = '0 auto';
      slides.style.position = 'relative';
      slides.style.top = '0';
      slides.style.left = '0';
    }
    
    // Đảm bảo các section (slide) hiển thị hết chiều cao thực tế
    document.querySelectorAll('.reveal .slides section').forEach(sec => {
      sec.style.height = 'auto';
      sec.style.minHeight = '1080px';
      sec.style.display = 'flex';
      sec.style.flexDirection = 'column';
      sec.style.justifyContent = 'center';
      sec.style.padding = '50px 0';
      sec.style.top = '0';
      sec.style.left = '0';
    });
  });

  const totalSlides = await page.evaluate(() => {
    const slides = [];
    const horizontalSlides = document.querySelectorAll('.reveal .slides > section');
    for (let h = 0; h < horizontalSlides.length; h++) {
      const verticalSlides = horizontalSlides[h].querySelectorAll('section');
      if (verticalSlides.length > 0) {
        for (let v = 0; v < verticalSlides.length; v++) {
          slides.push({h, v});
        }
      } else {
        slides.push({h, v: 0});
      }
    }
    return slides;
  });

  console.log(`Tìm thấy ${totalSlides.length} slide. Đang xử lý...`);
  
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';

  if (!fs.existsSync('slides_img')) {
    fs.mkdirSync('slides_img');
  }

  for (let i = 0; i < totalSlides.length; i++) {
    await page.evaluate((index, totalSlides) => {
      Reveal.slide(totalSlides[index].h, totalSlides[index].v);
      
      // Ẩn tất cả các slide khác để fullPage screenshot không bị dính nội dung khác
      document.querySelectorAll('.reveal .slides > section').forEach(sec => {
        if (sec.classList.contains('present')) {
          sec.style.display = 'flex';
          sec.style.opacity = '1';
          sec.style.visibility = 'visible';
        } else {
          sec.style.display = 'none';
        }
      });
      
      // Đảm bảo background overlay phủ kín
      const presentSec = document.querySelector('.reveal .slides > section.present');
      if (presentSec) {
         presentSec.style.minHeight = Math.max(1080, presentSec.scrollHeight) + 'px';
      }
    }, i, totalSlides);

    // Đợi UI render đầy đủ
    await new Promise(r => setTimeout(r, 600));
    
    const imgPath = `slides_img/slide_${i}.png`;
    
    // Sử dụng fullPage để CHẮC CHẮN chụp hết 100% nội dung trang hiện tại
    await page.screenshot({ path: imgPath, fullPage: true });
    
    const slide = pptx.addSlide();
    slide.addImage({ path: imgPath, x: 0, y: 0, w: '100%', h: '100%', sizing: { type: 'contain' } });
    console.log(`Đã hoàn thành slide ${i + 1}/${totalSlides.length}`);
  }

  await browser.close();
  
  console.log("Đang gộp thành file PowerPoint siêu đẹp...");
  await pptx.writeFile({ fileName: 'BaoCao_Canva_SieuDep.pptx' });
  console.log("✅ Xong! File BaoCao_Canva_SieuDep.pptx đã sẵn sàng.");
})();
