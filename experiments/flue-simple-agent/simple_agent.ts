import { createAgent, defineAgentProfile } from '@flue/runtime';

// 1. Định nghĩa Profile (hướng dẫn) cơ bản nhất
const helloProfile = defineAgentProfile({
  instructions: "You are a friendly and helpful AI assistant.",
});

// 2. Tạo Agent (chỉ cần mô hình và profile, không cần Tool hay Skill phức tạp)
export default createAgent(() => ({
  model: 'anthropic/claude-3-5-sonnet-20241022', // Chọn model AI
  profile: helloProfile,
}));
