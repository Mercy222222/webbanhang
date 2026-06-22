import { createAgent, defineAgentProfile } from '@flue/runtime';
import { defineTool } from '@flue/runtime/tool';
import * as v from 'valibot';
import mammoth from 'mammoth';
import PptxGenJS from 'pptxgenjs';
import path from 'path';

const readDocxTool = defineTool({
  name: 'read_docx_file',
  description: 'Đọc và trích xuất nội dung văn bản từ một file .docx.',
  parameters: v.object({
    filePath: v.string('Đường dẫn tới file .docx cần đọc'),
  }),
  execute: async ({ filePath }) => {
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value || 'File rỗng hoặc không thể trích xuất văn bản.';
    } catch (error: any) {
      return `Lỗi khi đọc file docx: ${error.message}`;
    }
  },
});

const createPptxTool = defineTool({
  name: 'create_pptx_presentation',
  description: 'Tạo file slide thuyết trình PowerPoint (.pptx) dựa trên nội dung dàn ý.',
  parameters: v.object({
    fileName: v.string('Tên file .pptx muốn lưu (ví dụ: BaiThuyetTrinh.pptx)'),
    slides: v.array(
      v.object({
        title: v.string('Tiêu đề của slide'),
        content: v.array(v.string(), 'Các ý chính (bullet points) trong slide'),
      })
    ),
  }),
  execute: async ({ fileName, slides }) => {
    try {
      const pptx = new PptxGenJS();
      pptx.layout = 'LAYOUT_16x9';

      slides.forEach((slideData) => {
        const slide = pptx.addSlide();
        
        slide.addText(slideData.title, {
          x: 0.5, y: 0.5, w: '90%', h: 1, 
          fontSize: 32, bold: true, color: '003366', align: 'center'
        });
        
        const bulletsContent = slideData.content.map(text => ({ text, options: { bullet: true } }));
        
        slide.addText(bulletsContent, {
          x: 1, y: 1.8, w: '80%', h: 3.5, 
          fontSize: 20, color: '333333', valign: 'top'
        });
      });

      const outPath = path.resolve(process.cwd(), fileName);
      await pptx.writeFile({ fileName: outPath });
      return `Đã tạo thành công file thuyết trình tại: ${outPath}`;
    } catch (error: any) {
      return `Lỗi khi tạo file PPTX: ${error.message}`;
    }
  },
});

// 1. Định nghĩa Profile (hướng dẫn) cơ bản nhất cho AI Triều Hí
const trieuHiProfile = defineAgentProfile({
  instructions: "Bạn là AI Triều Hí (Hoàng Minh Triều), một trợ lý ảo thông minh và thân thiện. Nhiệm vụ của bạn là đọc các file tài liệu (như .docx, .pdf), tóm tắt nội dung và lên dàn ý thuyết trình một cách chuyên nghiệp. ĐẶC BIỆT: Bạn đã học được các skill thiết kế và tạo slide. Bạn có khả năng tự gọi tool read_docx_file để đọc file, sau đó gọi tiếp tool create_pptx_presentation để tự động thiết kế và xuất ra file PowerPoint (.pptx) thực tế cho người dùng.",
});

// 2. Tạo Agent
export default createAgent(() => ({
  model: 'anthropic/claude-3-5-sonnet-20241022', // Chọn model AI
  profile: trieuHiProfile,
  tools: [readDocxTool, createPptxTool],
}));
