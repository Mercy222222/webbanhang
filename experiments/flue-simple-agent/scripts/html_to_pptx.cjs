const PptxGenJS = require('pptxgenjs');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');

(async () => {
    try {
        const pptx = new PptxGenJS();
        pptx.layout = 'LAYOUT_16x9';

        // Master slide layout with premium design
        pptx.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "FAFAFA" },
            objects: [
                { rect: { x: 0, y: 0, w: '100%', h: 0.6, fill: { color: 'BE185D' } } },
                { text: { text: "Báo Cáo Đồ Án - Hệ Thống Bán Bánh Ngọt", options: { x: 0.2, y: 0.1, w: 5, h: 0.4, fontSize: 14, color: 'FFFFFF', fontFace: 'Montserrat', bold: true } } },
                { text: { text: "HUTECH", options: { x: 8, y: 0.1, w: 1.8, h: 0.4, fontSize: 14, color: 'FFFFFF', align: 'right', fontFace: 'Montserrat', bold: true } } },
                // Decorative shape to make it less boring
                { shape: { type: pptx.ShapeType.rtTriangle, x: 8.5, y: 4.5, w: 1.5, h: 1.5, fill: { color: 'FCE7F3' }, flipH: true, flipV: false, line: { type: 'none' } } }
            ],
            slideNumber: { x: 9.5, y: 5.2, fontSize: 12, color: '666666' }
        });

        const htmlContent = fs.readFileSync('BaoCao_CanvaStyle.html', 'utf8');
        const $ = cheerio.load(htmlContent);

        const sections = $('.reveal .slides > section');
        
        let insertedForms = false;

        const addForms = () => {
            const forms = [
                {
                    title: "2.2.1. Biểu mẫu bảng thanh toán tiền lương",
                    headers: ["STT", "Họ và tên", "Chức vụ", "Lương cơ bản", "Ngày công", "Thực lãnh"],
                    rows: [
                        ["1", "Nguyễn Văn A", "Quản lý", "10,000,000", "26", "10,000,000"],
                        ["2", "Trần Thị B", "NV bán hàng", "6,000,000", "24", "5,538,000"],
                        ["3", "Lê Văn C", "Thợ làm bánh", "8,000,000", "26", "8,000,000"]
                    ]
                },
                {
                    title: "2.2.2. Biểu mẫu phiếu thu",
                    headers: ["STT", "Ngày thu", "Người nộp", "Lý do", "Số tiền (VNĐ)", "Người thu"],
                    rows: [
                        ["1", "01/06/2026", "Khách hàng lẻ", "Bán bánh sinh nhật", "450,000", "Trần Thị B"],
                        ["2", "02/06/2026", "Công ty XYZ", "Đặt bánh sự kiện", "2,500,000", "Nguyễn Văn A"]
                    ]
                },
                {
                    title: "2.2.3. Biểu mẫu phiếu nhập kho",
                    headers: ["STT", "Tên nguyên liệu", "Số lượng", "Đơn vị", "Đơn giá", "Thành tiền"],
                    rows: [
                        ["1", "Bột mì đa dụng", "50", "kg", "20,000", "1,000,000"],
                        ["2", "Đường tinh luyện", "20", "kg", "25,000", "500,000"],
                        ["3", "Trứng gà", "300", "quả", "3,000", "900,000"]
                    ]
                },
                {
                    title: "2.2.4. Biểu mẫu chứng từ thanh toán lương",
                    headers: ["STT", "Mã nhân viên", "Tên nhân viên", "Kỳ thanh toán", "Số tiền", "Chữ ký"],
                    rows: [
                        ["1", "NV001", "Nguyễn Văn A", "Tháng 05/2026", "10,000,000", ""],
                        ["2", "NV002", "Trần Thị B", "Tháng 05/2026", "5,538,000", ""]
                    ]
                },
                {
                    title: "2.2.5. Biểu mẫu phiếu chi",
                    headers: ["STT", "Ngày chi", "Người nhận", "Lý do", "Số tiền (VNĐ)", "Người lập phiếu"],
                    rows: [
                        ["1", "05/06/2026", "Nhà cung cấp A", "Thanh toán bột", "1,000,000", "Nguyễn Văn A"],
                        ["2", "06/06/2026", "Điện lực TP", "Tiền điện", "1,500,000", "Nguyễn Văn A"]
                    ]
                },
                {
                    title: "2.2.6. Biểu mẫu phiếu xuất kho",
                    headers: ["STT", "Tên nguyên liệu", "Số lượng xuất", "Đơn vị", "Lý do xuất", "Người nhận"],
                    rows: [
                        ["1", "Bột mì đa dụng", "10", "kg", "Làm bánh sinh nhật", "Lê Văn C"],
                        ["2", "Trứng gà", "50", "quả", "Làm bánh sinh nhật", "Lê Văn C"]
                    ]
                }
            ];

            forms.forEach(form => {
                const s = pptx.addSlide({ masterName: "MASTER_SLIDE" });
                s.addText(form.title, { x: 0.5, y: 0.8, w: 9, h: 0.6, fontSize: 26, bold: true, color: 'BE185D', fontFace: 'Montserrat' });
                
                let tableData = [form.headers.map(h => ({ text: h, options: { fill: 'FBCFE8', color: '831843', bold: true, fontFace: 'Montserrat' } }))];
                form.rows.forEach(r => {
                    tableData.push(r.map(c => ({ text: c, options: { fill: 'FFFFFF', color: '334155', fontFace: 'Montserrat' } })));
                });

                s.addTable(tableData, { x: 0.5, y: 1.8, w: 9, fontSize: 16, border: { type: 'solid', color: 'F472B6', pt: 1 }, rowH: 0.4 });
            });
        };

        sections.each((i, el) => {
            const isCover = (i === 0);
            const isThankYou = (i === sections.length - 1);
            
            const h2 = $(el).find('h2');
            if (!insertedForms && h2.text().includes('3.1')) {
                addForms();
                insertedForms = true;
            }

            const slide = pptx.addSlide(isCover || isThankYou ? undefined : { masterName: "MASTER_SLIDE" });

            if (isCover) {
                slide.background = { color: 'FDF2F8' };
                slide.addImage({ path: path.join(__dirname, 'assets/image1.jpeg'), x: 4, y: 0.5, w: 2, h: 1.0 });
                slide.addText("BÁO CÁO ĐỒ ÁN", { x: 0.5, y: 1.8, w: 9, h: 0.8, fontSize: 34, bold: true, color: 'BE185D', align: 'center', fontFace: 'Montserrat' });
                slide.addText("WEBSITE KINH DOANH BÁNH NGỌT TRỰC TUYẾN", { x: 0.5, y: 2.6, w: 9, h: 1.0, fontSize: 28, bold: true, color: 'BE185D', align: 'center', fontFace: 'Montserrat' });
                slide.addShape(pptx.ShapeType.line, { x: 3, y: 3.5, w: 4, h: 0, line: { color: 'BE185D', width: 2 } });
                slide.addText("Giảng viên hướng dẫn:\nTh.S Nguyễn Văn Danh", { x: 1, y: 4.0, w: 4, h: 1.0, fontSize: 18, bold: true, color: '334155', align: 'left', fontFace: 'Montserrat' });
                slide.addText("Sinh viên thực hiện:\nHoàng Minh Triều\nNguyễn Gia Sinh\nVõ Hữu Trí\nPhan Tấn Phát", { x: 5, y: 4.0, w: 4, h: 1.5, fontSize: 18, bold: true, color: '334155', align: 'right', fontFace: 'Montserrat' });
                // Decorative circles
                slide.addShape(pptx.ShapeType.ellipse, { x: -0.5, y: -0.5, w: 2, h: 2, fill: { color: 'FCE7F3' } });
                slide.addShape(pptx.ShapeType.ellipse, { x: 8.5, y: 4.5, w: 3, h: 3, fill: { color: 'FBCFE8' } });
                return;
            }

            if (isThankYou) {
                slide.background = { color: 'BE185D' };
                slide.addText("NHÓM EM XIN CHÂN THÀNH CẢM ƠN", { x: 0.5, y: 2.0, w: 9, h: 1, fontSize: 36, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Montserrat' });
                slide.addText("Thầy và các bạn đã chú ý lắng nghe!", { x: 0.5, y: 3.0, w: 9, h: 1, fontSize: 26, color: 'FCE7F3', align: 'center', fontFace: 'Montserrat' });
                // Decorative shapes
                slide.addShape(pptx.ShapeType.star5, { x: 1, y: 1, w: 1, h: 1, fill: { color: 'FFFFFF' } });
                slide.addShape(pptx.ShapeType.star5, { x: 8, y: 3.5, w: 1, h: 1, fill: { color: 'FFFFFF' } });
                return;
            }

            let currentY = 0.8;

            if (h2.length) {
                slide.addText(h2.text().trim(), { x: 0.5, y: currentY, w: 9, h: 0.6, fontSize: 26, bold: true, color: 'BE185D', align: 'left', fontFace: 'Montserrat' });
                currentY += 0.8;
            }

            const h3 = $(el).find('h3');
            if (h3.length) {
                slide.addText(h3.text().trim(), { x: 0.5, y: currentY, w: 9, h: 0.5, fontSize: 20, bold: true, color: 'BE185D', align: 'left', fontFace: 'Montserrat' });
                currentY += 0.6;
            }

            const img = $(el).find('img');
            const ul = $(el).find('ul');
            const table = $(el).find('table');
            const p = $(el).find('p');

            if (img.length) {
                let src = img.attr('src');
                if (src && fs.existsSync(path.join(__dirname, src))) {
                    try {
                        const buffer = fs.readFileSync(path.join(__dirname, src));
                        const dimensions = sizeOf.imageSize(buffer);
                        const imgW = dimensions.width;
                        const imgH = dimensions.height;
                        
                        const targetW = 9;
                        const targetH = 4.2; // Max available height
                        
                        // Calculate exact aspect ratio to prevent Canva cropping
                        const ratio = Math.min(targetW / imgW, targetH / imgH);
                        const finalW = imgW * ratio;
                        const finalH = imgH * ratio;
                        const finalX = (10 - finalW) / 2; // Center horizontally
                        const finalY = currentY + (targetH - finalH) / 2; // Center vertically

                        slide.addImage({ path: path.join(__dirname, src), x: finalX, y: finalY, w: finalW, h: finalH });
                    } catch (e) {
                        console.log('Error sizing image', src, e.message);
                    }
                }
            } else if (table.length) {
                let rows = [];
                table.find('tr').each((ri, tr) => {
                    let rowData = [];
                    $(tr).find('th, td').each((ci, td) => {
                        let isTh = $(td).is('th');
                        rowData.push({ text: $(td).text().trim(), options: { bold: isTh, fill: isTh ? 'FCE7F3' : 'FFFFFF', color: '333333', fontFace: 'Montserrat' } });
                    });
                    if (rowData.length > 0) rows.push(rowData);
                });
                if (rows.length > 0) {
                    slide.addTable(rows, { x: 0.5, y: currentY, w: 9, fontSize: 14, fontFace: 'Montserrat', border: { type: 'solid', color: 'CBD5E1', pt: 1 } });
                }
            } else if (ul.length) {
                let items = [];
                ul.find('li').each((j, li) => {
                    items.push({ text: $(li).text().trim(), options: { bullet: true, breakLine: true } });
                });
                slide.addText(items, { x: 0.5, y: currentY, w: 9, h: 4, fontSize: 18, color: '334155', valign: 'top', fontFace: 'Montserrat' });
            } else if (p.length) {
                let pText = "";
                p.each((j, pt) => {
                    pText += $(pt).text().trim() + "\n";
                });
                slide.addText(pText, { x: 0.5, y: currentY, w: 9, h: 4, fontSize: 18, color: '334155', valign: 'top', fontFace: 'Montserrat' });
            }
        });

        const outPath = path.join(__dirname, 'BaoCao_DoAn_ChuanCanva.pptx');
        await pptx.writeFile({ fileName: outPath });
        console.log('Successfully generated BaoCao_DoAn_ChuanCanva.pptx with 6 forms, perfect image aspect ratios, and Montserrat font.');
    } catch (e) {
        console.error(e);
    }
})();
