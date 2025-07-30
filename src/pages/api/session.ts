import type { NextApiRequest, NextApiResponse } from 'next';

const ENDPOINT = 'https://api.openai.com/v1/realtime/sessions';
const MODEL = 'gpt-4o-mini-realtime-preview-2024-12-17';
const API_KEY = process.env.OPENAI_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res
      .status(405)
      .json({ error: 'Method not allowed' });
  }

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: 'OpenAI API key not configured' });
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        voice: 'coral',
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error('OpenAI error', txt);
      
      return res
        .status(response.status)
        .json({ error: 'Failed to create session' });
    }

    const data = await response.json();
    
    return res
      .status(200)
      .json(data);
  } catch (err) {
    console.error(err);
    
    return res
      .status(500)
      .json({ error: 'Internal server error' });
  }
}
