import * as React from 'react';
import { Textarea } from '../form/core/text-area';

import { apiState } from '@/state/api';
import { createObjectFromPath } from '@/shared/helpers';
import { Field } from '@/shared/types';

import { Adapter } from '../adapter';
import { ThreeDots } from './three-dots';
import { Message } from './types';
import * as api from './api';
import styles from './chat.module.scss';

const useUpdater = apiState.resume.useResumeContentUpdater;

export function Chat() {
  const [value, setValue] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [field, setField] = React.useState<Field | null>(null);

  const update = useUpdater();

  function handleOnClick() {
    if (value.trim() === '') {
      return;
    }

    const message: Message = {
      role: 'user',
      content: value,
    };

    const newMessages = [...messages, message];

    setMessages(newMessages);
    setIsLoading(true);

    api.sendMocked(newMessages)
      .then((chatResponse) => {
        if (chatResponse.function === 'updateFields') {
          updateFields(chatResponse.args);
          setMessages([...newMessages,
            {
              role: 'assistant',
              content: chatResponse.reply,
            }
          ]);
        }
      })
      .finally(() => {
        setIsLoading(false);
        setValue('');
      });

    // api.send(value).then(processResponse);
  }

  function updateFields(fields: Record<string, any>) {
    for (const key in fields) {
      const value = fields[key];
      if (value === null) {
        setField({
          path: key as Field['path'],
          label: key,
          name: key,
          type: 'color',
        });
      } else {
        update(createObjectFromPath(key, value));
      }
    }
  }

  function processResponse(data: any) {
    const { message } = data;
    try {
      const content = JSON.parse(message.content);
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
  }

  return (
    <div className={styles.container}>
      <section data-name="chat" className={styles.chat}>
        {messages.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
        {isLoading && <MessageLoading />}
        {field && <Adapter field={field} />}
      </section>
      <section data-name="prompt">
        <Textarea
          id="chat-textarea"
          name="chat"
          label="Chat"
          value={value}
          onChange={setValue}
          onEnter={handleOnClick}
        />
        <button onClick={handleOnClick} className={styles['send-button']}>
          Send
        </button>
      </section>
    </div>
  );
}

type MessageProps = {
  message: Message;
};

function Message({ message }: MessageProps) {
  return (
    <article data-role={message.role} className={styles.message}>
      <span>{message.role}</span>
      <div>{message.content}</div>
    </article>
  );
}

function MessageLoading() {
  return (
    <article data-role="assistant" className={styles.message}>
      <span>assistant</span>
      <div>
        <ThreeDots size={24} color="#008cff" />
      </div>
    </article>
  );
}

const mockMessages: Message[] = [
  {
    role: 'user',
    content: 'Hello',
  },
  {
    role: 'assistant',
    content: 'I am your assistant, how can I help you?',
  }
];
