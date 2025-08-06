import { tool } from 'ai';
import { z } from 'zod';

// Tool migrated from src/components/editor/chat-old/tools.ts
// Allows the assistant to request updates to one or more fields in the resume
const updateFields = tool({
  description: 'Use this function to update one or more fields of the resume in a single call. When updating multiple fields, include ALL updates in one call rather than making separate calls.',
  parameters: z.object({
    fields: z.array(z.object({
      field: z.object({
        path: z.string().describe('Path to the field to update.'),
        label: z.string().describe('Label of the field.'),
        name: z.string().describe('Name of the field.'),
        type: z.string().describe('Type of the field.'),
      }),
      value: z
        .string()
        .nullable()
        .describe('New value of the field. Pass null to prompt the UI for input.'),
    })).min(1).describe('Array of field updates to perform.'),
  }),
  // No execute implementation – execution happens on the client once the user confirms.
});

export const tools = {
  updateFields,
};