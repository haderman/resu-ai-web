import * as React from 'react';
import { Textarea } from '../form/core/text-area';

import { apiState } from '@/state/api';
import { createObjectFromPath, createObjectFromPaths } from '@/shared/helpers';
import { Field } from '@/shared/types';
import * as prompts from '@/shared/helpers/prompt';

import { Adapter } from '../adapter';
import { ThreeDots } from './three-dots';
import { Message } from './types';
import * as api from './api';
import styles from './chat.module.scss';

const systemMessage: Message = {
  role: 'system',
  content: prompts.system,
};

const useUpdater = apiState.resume.useResumeContentUpdater;

export function Chat() {
  const [value, setValue] = React.useState<string>('');
  const [messages, setMessages] = React.useState<Message[]>([systemMessage]);
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
    setValue('');

    api.send(newMessages)
      .then((message) => {
        if (message.content === null) {
          // const pathsValuePairs = message.tool_calls
          //   .map((tc) => {
          //     if (tc.type === 'function') {
          //       const func = tc.function;
          //       if (func.name === 'update_fields') {
          //         const args = JSON.parse(func.arguments);
          //         return [args.path, args.value];
          //       }
          //     }

          //     return null;
          //   })
          //   .filter((p) => p !== null) as Array<[path: string, value: any]>;

          // updateFields(pathsValuePairs);

          message.tool_calls.forEach((tool_call) => {
            if (tool_call.type === 'function') {
              const func = tool_call.function;
              if (func.name === 'update_fields') {
                const args = JSON.parse(func.arguments);
                updateFields(args.field, args.value);
              }
            }
          });
        } else {
          setMessages((messages) => [...messages, message]);
        }
      })
      .catch((error) => {
        console.error('error: ', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // function updateFields(p: Array<[path: string, value: any]>) {
  //   const fields = p.map(([path, value]) => {
  //     return {
  //       path: path as Field['path'],
  //       label: path,
  //       name: path,
  //       type: 'color',
  //     };
  //   });
  //   const objFromPaths = createObjectFromPaths(p);
  //   console.log('------> p: ', p);
  //   console.log('------> objFromPaths: ', objFromPaths);
  //   update(objFromPaths);
  // }

  function updateFields(field: Field, value?: Field['type']) {
    if (value === null) {
      setField(field);
    } else {
      update(createObjectFromPath(field.path, value));
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
  if (message.role === 'system') {
    return null;
  }

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
