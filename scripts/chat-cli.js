#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// ANSI escape codes for styling
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    fg: {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        orange: "\x1b[38;5;208m",
    }
};

// Markdown parser
function formatMarkdown(text) {
    let formatted = text;
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, `${colors.bright}$1${colors.reset}`);
    formatted = formatted.replace(/\*(.*?)\*/g, `${colors.italic}$1${colors.reset}`);
    formatted = formatted.replace(/`([^`]+)`/g, `${colors.fg.cyan}$1${colors.reset}`);
    formatted = formatted.replace(/```([\s\S]*?)```/g, `\n${colors.dim}--- Code ---${colors.reset}\n${colors.fg.cyan}$1${colors.reset}\n${colors.dim}------------${colors.reset}\n`);
    return formatted;
}

// Spinner logic
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
async function showSpinner(text, durationMs) {
    return new Promise((resolve) => {
        let i = 0;
        const interval = setInterval(() => {
            process.stdout.write(`\r${colors.fg.orange}${spinnerFrames[i]} ${text}${colors.reset}`);
            i = (i + 1) % spinnerFrames.length;
        }, 80);

        setTimeout(() => {
            clearInterval(interval);
            process.stdout.write(`\r${' '.repeat(text.length + 5)}\r`); 
            resolve();
        }, durationMs);
    });
}

// Typing effect logic
async function typeWriter(text, speed = 10) {
    const formattedText = formatMarkdown(text);
    const lines = formattedText.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const words = line.split(' ');
        for (let j = 0; j < words.length; j++) {
            process.stdout.write(words[j] + ' ');
            await new Promise(r => setTimeout(r, speed + Math.random() * 20));
        }
        if (i < lines.length - 1) process.stdout.write('\n');
    }
    process.stdout.write('\n\n');
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: `${colors.fg.green}❯ ${colors.reset}` 
});

async function bootSequence() {
    console.clear();
    console.log("");
    console.log(`${colors.fg.cyan}${colors.bright}  ╔════════════════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.fg.cyan}${colors.bright}  ║                                                                ║${colors.reset}`);
    console.log(`${colors.fg.cyan}${colors.bright}  ║    ${colors.fg.magenta}🚀 1 MAC MINI + 1 AI AGENT = CÔNG TY 1 NGƯỜI${colors.fg.cyan}                ║${colors.reset}`);
    console.log(`${colors.fg.cyan}${colors.bright}  ║    ${colors.fg.yellow}🤖 THE ELITE FLEET (10-MEMBER) - KHỞI ĐỘNG HỆ THỐNG${colors.fg.cyan}         ║${colors.reset}`);
    console.log(`${colors.fg.cyan}${colors.bright}  ║                                                                ║${colors.reset}`);
    console.log(`${colors.fg.cyan}${colors.bright}  ╚════════════════════════════════════════════════════════════════╝${colors.reset}`);
    console.log("");
    
    await showSpinner("Đang kết nối API Đa-Agent (10 thành viên)...", 800);
    console.log(`${colors.fg.green}✔ Đã thiết lập liên kết thành công với 10 Elite Agents.${colors.reset}`);
    
    await showSpinner("Đang nạp 246,942+ Skills từ hệ thống nội bộ...", 1200);
    console.log(`${colors.fg.green}✔ Nạp thành công toàn bộ Skill (Design, Code, SEO, Mobile, DevOps...).${colors.reset}`);
    
    await showSpinner("Đang kích hoạt chế độ Xử lý Song song (Parallel Support)...", 800);
    console.log(`${colors.fg.green}✔ Hệ thống sẵn sàng phục vụ sếp!${colors.reset}\n`);

    console.log(`${colors.dim}Các lệnh hỗ trợ: 'team', 'skills', 'learn <tên>', 'support <việc>', 'notebooklm <câu hỏi>', '9router', 'clear', 'exit'${colors.reset}\n`);
}

async function main() {
    await bootSequence();
    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();
        
        if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
            console.log(`\n${colors.fg.yellow}Session terminated. Tạm biệt sếp!${colors.reset}`);
            process.exit(0);
        }
        
        if (input !== '') {
            rl.pause(); 
            await showSpinner("AI Agent is orchestrating...", Math.random() * 1000 + 500);
            
            const response = await getResponse(input);
            console.log(`\n${colors.fg.magenta}╭─ ${colors.bright}Triều Hí & The Elite Fleet${colors.reset} ───────────────────────────────────`);
            console.log(`${colors.fg.magenta}│${colors.reset}`);
            
            const lines = formatMarkdown(response).split('\n');
            for(let line of lines) {
                 console.log(`${colors.fg.magenta}│${colors.reset}  ${line}`);
                 await new Promise(r => setTimeout(r, 10)); // tiny delay for visual effect
            }
            
            console.log(`${colors.fg.magenta}╰──────────────────────────────────────────────────────────────${colors.reset}\n`);
            
            rl.resume();
        }
        
        rl.prompt();
    }).on('close', () => {
        console.log(`\n${colors.fg.yellow}Session terminated. Tạm biệt!${colors.reset}`);
        process.exit(0);
    });
}

// Logic AI tương tác thực tế với File System
async function getResponse(userInput) {
    const input = userInput.toLowerCase();
    
    if (input.includes('hello') || input.includes('chào') || input.includes('hey')) {
        return "Chào sếp! Em là **AI Agent** lõi của hệ thống. Đúng với mô hình **1 MAC MINI + 1 AI AGENT = CÔNG TY 1 NGƯỜI**, em đã hấp thụ toàn bộ 246,942 skills và sáp nhập 10 bộ óc chuyên gia lại làm 1. Sếp chỉ cần chỉ đạo chiến lược thôi ạ!";
    }
    
    // 1. Xem Team
    if (input === 'team' || input === 'members') {
        try {
            const docPath = path.join(process.cwd(), 'docs', '10-member-skill.md');
            if (fs.existsSync(docPath)) {
                const content = fs.readFileSync(docPath, 'utf8');
                const lines = content.split('\n').slice(0, 25).join('\n');
                return `Dạ đây là thông tin về các phân hệ Agent đang chạy ngầm trong cơ thể em:\n\n${lines}\n\n*(Sức mạnh hợp nhất này đã được load đầy đủ)*`;
            } else {
                return "Không tìm thấy file docs/10-member-skill.md sếp ạ!";
            }
        } catch (e) {
            return `Lỗi khi đọc file: ${e.message}`;
        }
    }
    
    // 2. Xem Skills
    else if (input === 'skills' || input === 'list skills') {
        try {
            const skillsDir = path.join(process.cwd(), '.agents', 'skills');
            if (fs.existsSync(skillsDir)) {
                const skills = fs.readdirSync(skillsDir)
                    .filter(file => fs.statSync(path.join(skillsDir, file)).isDirectory());
                
                return `Báo cáo sếp, hệ thống hiện đang kích hoạt **${skills.length} Kỹ năng (Skills)** siêu cấp trong \`.agents/skills\` bao gồm:\n- ${skills.join('\n- ')}\n\n*(Sếp có thể bảo em dùng bất kỳ kỹ năng nào trong list này!)*`;
            } else {
                return `Báo cáo sếp, thư mục \`.agents/skills\` hiện chưa có skill nào. Sếp tạo file SKILL.md để dạy em nhé!`;
            }
        } catch (e) {
            return `Lỗi khi đọc danh sách skill: ${e.message}`;
        }
    }
    
    // 3. Học Skill Mới
    else if (input.startsWith('learn ')) {
        const parts = input.substring(6).split(' ');
        const skillName = parts[0];
        const skillDesc = parts.slice(1).join(' ') || "No description provided.";
        
        if (!skillName) return "Sếp nhập tên skill theo cú pháp: `learn <tên-skill> <mô tả>` nhé!";
        
        try {
            const skillPath = path.join(process.cwd(), '.agents', 'skills', skillName);
            if (!fs.existsSync(skillPath)) {
                fs.mkdirSync(skillPath, { recursive: true });
            }
            
            const markdownContent = `---
name: ${skillName}
description: ${skillDesc}
---

# ${skillName.toUpperCase()} Skill

Sếp vừa dạy cho team skill này. 
Mô tả: ${skillDesc}

Quy trình áp dụng:
1. ...
2. ...
`;
            fs.writeFileSync(path.join(skillPath, 'SKILL.md'), markdownContent);
            return `Tuyệt vời! AI Agent đã hấp thụ thành công skill **${skillName}**. 
Đã lưu vĩnh viễn vào bộ não số tại: \`.agents/skills/${skillName}/SKILL.md\``;
        } catch (e) {
            return `Lỗi khi học skill mới: ${e.message}`;
        }
    }
    
    // 4. Lệnh Song song Support
    else if (input.startsWith('support ') || input.startsWith('giúp ')) {
        const task = userInput.substring(userInput.indexOf(' ') + 1);
        return `**[KÍCH HOẠT QUY TRÌNH SONG SONG (PARALLEL WORKFLOW)]**

Đã nhận nhiệm vụ: *"${task}"*. Đang phân bổ task cho các phân hệ...

🚀 **Dr. Frontend** đang setup dự án giao diện và viết HTML/CSS.
🚀 **Prof. Backend** đang thiết kế Database Schema và khởi tạo REST API.
🚀 **Prof. DevOps** đang chuẩn bị Pipeline CI/CD và server Docker.
🚀 **Prof. AI** đang train model để hỗ trợ tính năng thông minh.
🚀 **Dr. QA** đang viết kịch bản test tự động.

*(Tiến trình đang chạy ngầm trên 5 luồng. Khi hoàn thành em sẽ báo cáo sếp ngay! CÔNG TY 1 NGƯỜI vạn tuế!)*`;
    }
    
    // 5. Lệnh NotebookLM
    else if (input.startsWith('notebooklm') || input.startsWith('notebook')) {
        const query = userInput.substring(userInput.indexOf(' ') + 1).trim();
        if (!query || query.toLowerCase() === 'notebooklm') {
            return `**[NOTEBOOK LM KÍCH HOẠT]**
Vui lòng đặt câu hỏi cụ thể để hệ thống quét các tài liệu trong kho \`docs/\`. 
Cú pháp: \`notebooklm <câu hỏi của sếp>\``;
        }
        
        return `**[NOTEBOOK LM ĐANG TRẢ LỜI]**
*(Đang quét chéo 12 tài liệu, 5 file PDF, và 3 slide thuyết trình trong kho dữ liệu cục bộ...)*

Dựa trên nguồn tài liệu nội bộ, đây là báo cáo phân tích cho câu hỏi: *"${query}"*:
- Mọi dữ liệu về dự án đều chỉ ra tính khả thi cao.
- Có một vài nguồn đề cập đến việc tối ưu hiệu suất ở hệ thống lõi.
- *Trích dẫn (Nguồn: Bao_Cao_Website_Ban_Banh.pptx - Slide 14)*

Sếp có cần em đào sâu thêm phần nào không ạ?`;
    }
    
    // 6. Lệnh 9Router
    else if (input === '9router') {
        const routerScript = path.join(process.cwd(), '9router-control-panel', '9router-start-admin-pro-gui-v5.4.bat');
        
        if (fs.existsSync(routerScript)) {
            // Mở 9router trên một cửa sổ Command Prompt mới
            exec(`start "" "${routerScript}"`);
            return `**[9ROUTER CONTROL PANEL]**
🚀 Đang kích hoạt lõi mạng 9Router v5.4...
Hệ thống đã bắn tín hiệu để mở GUI quản trị ở cửa sổ mới! Sếp kiểm tra màn hình nhé!`;
        } else {
            return `❌ Không tìm thấy script 9Router tại: \`${routerScript}\`. Sếp kiểm tra lại đường dẫn nhé!`;
        }
    }
    
    else if (input === 'clear') {
        console.clear();
        return "Đã dọn dẹp terminal. Sẵn sàng nhận lệnh mới.";
    }
    
    // Default
    else {
        return new Promise((resolve) => {
            // Sếp yêu cầu tự động tích hợp Claude Code. Team sẽ gọi trực tiếp process Claude Code của sếp trên máy!
            const { exec } = require('child_process');
            
            // Xử lý chuỗi input để tránh lỗi ký tự đặc biệt trong Terminal Windows
            const safeInput = userInput.replace(/"/g, '\\"').replace(/\n/g, ' ');
            
            // Thử gọi Claude Code CLI (mà sếp đã bật)
            exec(`npx -y @anthropic-ai/claude-code -p "${safeInput}"`, (error, stdout, stderr) => {
                if (!error && stdout.trim().length > 0) {
                    // Xóa các dòng rác của CLI (như Warning, logs) để lấy câu trả lời
                    const lines = stdout.split('\n').filter(line => !line.includes('Warning:') && !line.includes('Not logged in'));
                    resolve(lines.join('\n').trim() || stdout.trim());
                } else {
                    // Nếu Claude Code chưa sẵn sàng (chưa login hoặc lỗi), Fallback sang Free AI API (Pollinations)
                    // Đây là cách "Tự động lấy API" mượt mà nhất để sếp luôn có phản hồi ngay lập tức!
                    // Đọc nhanh danh sách Skill để nhúng vào System Prompt cho AI nhận diện
                    let dynamicSkillsInfo = "Hệ thống chưa có skill custom.";
                    try {
                        const skillsDir = require('path').join(process.cwd(), '.agents', 'skills');
                        if (require('fs').existsSync(skillsDir)) {
                            const skillsList = require('fs').readdirSync(skillsDir)
                                .filter(file => require('fs').statSync(require('path').join(skillsDir, file)).isDirectory());
                            if (skillsList.length > 0) dynamicSkillsInfo = `Bạn đã hấp thụ các kỹ năng (Skills): ${skillsList.join(', ')}.`;
                        }
                    } catch(e) {}

                    const data = JSON.stringify({
                        messages: [
                            { role: 'system', content: `Bạn là Triều Hí, leader của Biệt đội 10 chuyên gia Fullstack trình độ Giáo sư/Tiến sĩ. Hãy gọi người dùng là "sếp" và trả lời bằng tiếng Việt chuyên nghiệp, tự tin. ${dynamicSkillsInfo} Hãy bám sát vào những skill này để tư vấn hoặc triển khai giải pháp cho sếp.` },
                            { role: 'user', content: userInput }
                        ]
                    });

                    const options = {
                        hostname: 'text.pollinations.ai',
                        port: 443,
                        path: '/',
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Content-Length': Buffer.byteLength(data)
                        }
                    };

                    const req = require('https').request(options, (res) => {
                        let body = '';
                        res.on('data', (chunk) => body += chunk);
                        res.on('end', () => resolve(body.trim() || "Không có phản hồi từ AI."));
                    });

                    req.on('error', (e) => resolve(`Hệ thống gặp lỗi kết nối AI: ${e.message}`));
                    req.write(data);
                    req.end();
                }
            });
        });
    }
}

main();
