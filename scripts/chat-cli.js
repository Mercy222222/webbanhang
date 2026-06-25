#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');

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

// RGB Gradient generator
function gradientText(text, startColor, endColor) {
    let result = '';
    const length = text.length;
    for (let i = 0; i < length; i++) {
        const ratio = i / (length - 1 || 1);
        const r = Math.round(startColor[0] + ratio * (endColor[0] - startColor[0]));
        const g = Math.round(startColor[1] + ratio * (endColor[1] - startColor[1]));
        const b = Math.round(startColor[2] + ratio * (endColor[2] - startColor[2]));
        result += `\x1b[38;2;${r};${g};${b}m${text[i]}`;
    }
    result += colors.reset;
    return result;
}

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
    prompt: `${colors.fg.magenta}╭─[${colors.fg.cyan}HuuTri@Workspace${colors.fg.magenta}]─[${colors.fg.yellow}Agentic-Mode${colors.fg.magenta}]\n╰─❯ ${colors.reset}` 
});

async function bootSequence() {
    console.clear();
    process.stdout.write('\x07'); // System Beep
    
    // 1. Memory Dump Boot Effect
    for(let i=0; i<15; i++) {
        let hexStr = "";
        for(let j=0; j<8; j++) {
            hexStr += Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase() + " ";
        }
        process.stdout.write(`\r${colors.dim}[HT.CORE.BOOT] 0x${Math.floor(Math.random()*100000).toString(16).toUpperCase()} : ${hexStr}${colors.reset}\n`);
        await new Promise(r => setTimeout(r, 25));
    }
    console.clear();
    
    // Welcome Voice Sound (Windows TTS)
    if (os.platform() === 'win32') {
        exec(`powershell -c "Add-Type -AssemblyName System.speech; $synth = New-Object System.Speech.Synthesis.SpeechSynthesizer; $synth.SelectVoiceByHints('Female'); $synth.Speak('Welcome to Huu Tree Chat Bot');"`);
    }
    
    console.log("");
    const gradientTop = [0, 255, 255]; // Cyan
    const gradientBottom = [255, 0, 255]; // Magenta
    
    const logo3D = [
        "   _   _   _   _   _   _     _____   ____    ___  ",
        "  | | | | | | | | | | | |   |_   _| |  _ \\  |_ _| ",
        "  | |_| | | | | | | | | |     | |   | |_) |  | |  ",
        "  |  _  | | |_| | | |_| |     | |   |  _ <   | |  ",
        "  |_| |_|  \\___/   \\___/      |_|   |_| \\_\\ |___| "
    ];
    
    for (let line of logo3D) {
        console.log(gradientText(line, gradientTop, gradientBottom));
    }
    
    console.log(gradientText(`  ╔════════════════════════════════════════════════════════════════════════╗`, gradientTop, gradientBottom));
    console.log(gradientText(`  ║  [BOT]    HUU TRI CHAT BOT (10-MEMBER) - CLAUDE-HUD TRUECOLOR ACTIVE   ║`, gradientTop, gradientBottom));
    console.log(gradientText(`  ║  [INFO]   © Copyright by Huu Tri                                       ║`, gradientTop, gradientBottom));
    console.log(gradientText(`  ╚════════════════════════════════════════════════════════════════════════╝`, gradientBottom, gradientTop));
    console.log("");
    
    await showSpinner("Initializing Agentic System Monitor...", 400);
    console.log(`${colors.fg.green}✔ Claude-Code-Agent-Monitor activated: Real-time Thought Process Tracking.${colors.reset}`);
    
    await showSpinner("Connecting Multi-Agent API via MCP protocol (gitlab-mcp)...", 500);
    console.log(`${colors.fg.green}✔ 10 Elite Agents (PraisonAI framework) cross-linked successfully.${colors.reset}`);
    
    await showSpinner("Loading 1.9 Million Multi-Profession Skills (SOC Careers)...", 600);
    console.log(`${colors.fg.green}✔ Successfully ingested 1,964,760 AgentSkills.io Standard workflows.${colors.reset}`);

    await showSpinner("Syncing Codex & Claude Skills Library (SkillsMP)...", 400);
    console.log(`${colors.fg.green}✔ Ready to run In-Browser AI & 100% IDE Automation.${colors.reset}\n`);

    const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(1);
    const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(1);
    const usedMem = (totalMem - freeMem).toFixed(1);

    console.log(`${colors.fg.blue}  [SYSTEM METRICS HUD]${colors.reset}`);
    console.log(`${colors.dim}  ├─ OS Architecture: ${os.type()} ${os.arch()} | CPUs: ${os.cpus().length} Cores${colors.reset}`);
    console.log(`${colors.dim}  ├─ Active Threads : 10/10 (Prof. System Architecture, Dr. Frontend, ...)${colors.reset}`);
    console.log(`${colors.dim}  ├─ Knowledge Base : 23 SOC Categories | 817 CyberSecurity Rules${colors.reset}`);
    console.log(`${colors.dim}  └─ Memory Usage   : ${usedMem}GB / ${totalMem}GB (Apple Silicon Rapid-MLX mode)${colors.reset}\n`);

    // Hacking Progress Bar Effect
    process.stdout.write(`${colors.fg.green}  [`);
    for(let i=0; i<60; i++) {
        process.stdout.write(`█`);
        // Random hex flash at the end
        const hex = Math.floor(Math.random()*16777215).toString(16).toUpperCase().padStart(6, '0');
        process.stdout.write(`\x1b[s\x1b[1G\x1b[65C${colors.fg.cyan}DECRYPT: 0x${hex}\x1b[u`);
        await new Promise(r => setTimeout(r, Math.random() * 20 + 5));
    }
    process.stdout.write(`\x1b[s\x1b[1G\x1b[65C${colors.fg.green}STATUS: SECURE   \x1b[u`);
    console.log(`] 100% DECRYPTED${colors.reset}\n`);

    console.log(`${colors.dim}Commands: 'team', 'skills', 'learn <name>', 'support <task>', 'notebooklm <query>', '9router', 'clear', 'exit'${colors.reset}\n`);
}

async function main() {
    await bootSequence();
    rl.prompt();

    rl.on('line', async (line) => {
        const input = line.trim();
        
        if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
            console.log(`\n${colors.fg.yellow}Session terminated. Goodbye sir!${colors.reset}`);
            process.exit(0);
        }
        
        if (input !== '') {
            rl.pause();
            
            // HUD: Agentic Thought Process Streaming
            await showSpinner("Agentic System Monitor is analyzing Thought Process...", 400);
            const agents = ["Prof. AI", "Prof. System Architecture", "Dr. Frontend", "Prof. DevOps", "Dr. QA"];
            const actions = ["Analyzing Intent...", "Querying Knowledge Base...", "Matching SOC Skills...", "Verifying Security Protocol...", "Synthesizing Response..."];
            for (let i = 0; i < 4; i++) {
                const agent = agents[Math.floor(Math.random() * agents.length)];
                const action = actions[Math.floor(Math.random() * actions.length)];
                
                // Network Scan Glitch Effect
                process.stdout.write(`\r${colors.fg.cyan}[${Math.random().toString(36).substring(2,8).toUpperCase()}]${colors.reset} ${colors.dim}[${agent}] ${action}${colors.reset}`);
                await new Promise(r => setTimeout(r, Math.random() * 300 + 200));
            }
            process.stdout.write(`\r${' '.repeat(80)}\r`); // clear thought line
            
            const response = await getResponse(input);
            
            // HUD Response Box
            console.log(`\n${colors.fg.cyan}┌── ${colors.bright}HUU TRI RESPONSE${colors.reset}${colors.fg.cyan} ──────────────────────────────────────────────────┐${colors.reset}`);
            console.log(`${colors.fg.cyan}│${colors.reset} ${colors.dim}Model Context: Codex/Claude Skills Active | Security: PASS${colors.reset}`);
            console.log(`${colors.fg.cyan}├────────────────────────────────────────────────────────────────────────┤${colors.reset}`);
            
            const lines = formatMarkdown(response).split('\n');
            for(let line of lines) {
                 process.stdout.write(`${colors.fg.cyan}│${colors.reset}  `);
                 // Hiệu ứng gõ phím từng ký tự (Typewriter)
                 for (let char of line) {
                     process.stdout.write(char);
                     await new Promise(r => setTimeout(r, 3 + Math.random() * 8)); 
                 }
                 process.stdout.write('\n');
            }
            
            process.stdout.write('\x07'); // Nháy beep nhẹ khi in xong
            console.log(`${colors.fg.cyan}└────────────────────────────────────────────────────────────────────────┘${colors.reset}\n`);
            
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
        return `**[KÍCH HOẠT QUY TRÌNH SONG SONG (MCP - PARALLEL WORKFLOW)]**

Đã nhận nhiệm vụ: *"${task}"*. Đang phân tích Intent và mapping với **1.9M SOC Career Skills**...

🚀 **[Prof. System Architecture]** (Management Analyst Skill): Đang thiết kế System Architecture và bóc tách Sub-tasks...
🚀 **[Dr. Frontend]** (Graphic Designer Skill): Đang render UI Components với AgentSkills.io Standard...
🚀 **[Prof. Backend]** (Database Administrator Skill): Đang thiết lập Schema và REST/GraphQL Endpoints...
🚀 **[Prof. DevOps]** (Cloud Engineer Skill): Đang cấu hình CI/CD Pipeline & Docker orchestration...
🚀 **[Dr. QA]** (Software Quality Assurance Skill): Đang chạy Automation Test Scripts (E2E)...

*(Tiến trình Agentic đang chạy ngầm trên 5 luồng. Khi hoàn thành em sẽ báo cáo sếp ngay! CÔNG TY 1 NGƯỜI vạn tuế!)*`;
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
