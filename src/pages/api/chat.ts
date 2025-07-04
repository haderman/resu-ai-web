import type { NextApiRequest, NextApiResponse } from 'next';
import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';

import { system } from '@/server/chat/system';
import { tools } from '@/server/chat/tools';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    const result = streamText({
      model: openai('gpt-4o'),
      system,
      messages,
      maxSteps: 3,
      tools,
    });

    // Convert the stream to work with Pages Router
    result.pipeDataStreamToResponse(res);
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
