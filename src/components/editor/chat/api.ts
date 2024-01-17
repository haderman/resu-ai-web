import { ChatResponse, Message } from './types';
import { tools } from './tools';

const URL_BASE = 'https://api.openai.com';
const ENDPOINT = '/v1/chat/completions';

export async function send(messages: Message[]): Promise<Message> {
  const url = new URL(ENDPOINT, URL_BASE);

  const body = JSON.stringify({
    messages,
    model: 'gpt-4-1106-preview', // 'gpt-3.5-turbo-1106'
    tools,
  });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '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',
    },
    body,
  }).then(response => response.json())
    .then(data => data.choices[0].message)
    .catch(error => { throw error; });
}
