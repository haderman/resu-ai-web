import * as React from 'react';
import { Textarea, TextareaProps } from '../form/core/text-area'; // Adjust the import path as necessary

import { apiState } from '@/state/api';
import { createObjectFromPath } from '@/shared/helpers';

import styles from './chat.module.scss';

const useUpdater = apiState.resume.useResumeContentUpdater;

export function Chat() {
  const [value, setValue] = React.useState<string>('');

  const update = useUpdater();

  function handleOnClick() {
    if (value.trim() === '') {
      return;
    }

    send(value).then(data => {
      const { message } = data;
      try {
        const content = JSON.parse(message.content);
        console.log('chat response -> content: ', content);
        if (content?.function === 'updateField') {
          for (const key in content.args) {
            const value = content.args[key];
            console.log('key, value: ', key, value);
            update(createObjectFromPath(key, value));
          }
        }
      } catch (error) {
        console.error('Error parsing assistant message:', error);
      }

      console.log('chat response -> data: ', data);
    });
  }

  const textAreaProps: TextareaProps = {
    id: 'chat-textarea',
    name: 'chat',
    label: 'Chat',
    value: value,
    onChange: setValue,
    onEnter: handleOnClick // Assuming you want to send the message when Enter is pressed
  };

  return (
    <div className={styles.container}>
      <section data-name="chat" className={styles.chat}>
        <article data-role="user" className={styles.message}>
          <span>User</span>
          <div>Hello</div>
        </article>
        <article data-role="bot" className={styles.message}>
          <span>Assistant</span>
          <div>I am your assistant, how can I help you?</div>
        </article>
      </section>
      <section data-name="prompt">
        <Textarea {...textAreaProps} />
        <button onClick={handleOnClick} className={styles['send-button']}>
          Send
        </button>
      </section>
    </div>
  );
}

const URL_ENDPOINT = 'https://8c34-181-58-39-128.ngrok-free.app/prompt';

const URL = 'https://1b7e-181-58-39-128.ngrok-free.app';

// fetch(URL + '/v1/system', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// }).then(response => response.json())
//   .then(data => console.log('system reponse -> data: ', data))
//   .catch(error => console.error('Error:', error));

function send(prompt: string) {
  return fetch(URL + '/v1/chat', {
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

function transformText(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase();
}
