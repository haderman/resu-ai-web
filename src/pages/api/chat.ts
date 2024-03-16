import type { NextApiRequest, NextApiResponse } from 'next';
import { Session } from 'next-auth';

import { protectedHandler } from '@/server/protected-api-handler';
import { ChatResponse, Message } from '@/components/editor/chat/types';
import { ErrorResponse, Field } from '@/shared/types';
import { system } from '@/shared/helpers/prompt';

export default protectedHandler(handler);

type Response = ChatResponse | Message | ErrorResponse;

export async function handler(req: NextApiRequest, res: NextApiResponse<Response>, session: Session) {
  if (req.method === 'POST') {
    try {
      // Extract messages from the request body
      const { messages }: { messages: Message[] } = req.body;

      // Call the send function to get a response from the OpenAI API
      const responseMessage = await send([
        { role: 'system', content: system },
        ...messages,
      ]);

      // Respond with the message received from the OpenAI API
      res.status(200).json(responseMessage);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ msg: `Error processing chat request: ${error.message}` });
    }
  } else {
    // Handle unsupported methods
    res.status(405).json({ msg: 'Method not allowed' });
  }
}

// Function to send messages to the OpenAI API
async function send(messages: Message[]): Promise<Message> {
  const URL_BASE = 'https://api.openai.com';
  const ENDPOINT = '/v1/chat/completions';

  const url = new URL(ENDPOINT, URL_BASE);

  const body = JSON.stringify({
    messages,
    model: 'gpt-4-turbo-preview', // Adjust the model as needed
    tools,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body,
  }).then(response => response.json())
    .then(data => data.choices[0].message)
    .catch(error => { throw error; });
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'update_fields',
      description: 'Use this function to update the fields of the resume.',
      parameters: {
        type: 'object',
        properties: {
          field: Field.toToolCallString(),
          value: {
            type: 'string',
            description: 'New value of the field.',
          },
        },
        required: ['field', 'value'],
      },
    }
  },
];
