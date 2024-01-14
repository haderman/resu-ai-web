import { ChatResponse, Message } from './types';

const URL = 'https://1b7e-181-58-39-128.ngrok-free.app';
const ENDPOINT = '/v1/chat';

export async function send(prompt: string) {
  return fetch(URL + ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: prompt,
        }
      ]
    }),
  }).then(response => response.json())
    .catch(error => { throw error; });
}


export async function sendMocked(messages: Message[]): Promise<ChatResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        error: null,
        reply: 'Hello, world!',
        args: {
          'profile.title.color': null,
          'skills.title.color': 'blue',
        },
        function: 'updateFields',
      });
    }, 1000);
  });
}
