import { ChatResponse, Message } from './types';
import { tools } from './tools';
import { getHost } from '@/shared/helpers';

const URL_BASE = 'https://api.openai.com';
const ENDPOINT = '/api/chat'; // '/v1/chat/completions';

export async function send(messages: Message[]): Promise<Message> {
  const url = new URL(ENDPOINT, getHost());
  const body = JSON.stringify({ messages });

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  }).then(response => response.json())
    .catch(error => { throw error; });
}
