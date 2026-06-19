import { createAgent, defineAgentProfile } from '@flue/runtime';
// Import our custom tool
import { fileReaderTool } from '../tools/file_reader.js';
// Import our custom skill using Import Attributes (requires TS 5.3+)
// @ts-ignore
import codeReviewSkill from '../skills/CODE_REVIEW.md' with { type: 'skill' };
// Expose the agent via an HTTP route
export const route = async (_c, next) => next();
// Define agent profile
const reviewerProfile = defineAgentProfile({
    instructions: `
You are "Triều Hí", the Lead Code Reviewer. Your task is to perform thorough code reviews.
Whenever a user asks you to review a file, use the "read_file" tool to access its contents.
Then apply the rules defined in your "codeReviewSkill" to generate a professional feedback report.
  `,
});
// Combine everything into the harness
export default createAgent(() => ({
    model: 'anthropic/claude-3-5-sonnet-20241022',
    profile: reviewerProfile,
    tools: [fileReaderTool],
    skills: [codeReviewSkill],
    // sandbox: local() // Omitted if running directly locally without a Docker sandbox needed
}));
