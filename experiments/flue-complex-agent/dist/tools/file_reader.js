import { defineTool } from '@flue/runtime';
import { z } from 'zod';
import * as fs from 'fs/promises';
export const fileReaderTool = defineTool({
    name: 'read_file',
    description: 'Read the contents of a file from the local file system.',
    parameters: z.object({
        filePath: z.string().describe('The absolute or relative path to the file to read'),
    }),
    async execute({ filePath }) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return content;
        }
        catch (error) {
            return `Failed to read file: ${error.message}`;
        }
    },
});
