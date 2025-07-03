import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import type { Message } from 'ai';

import styles from './chat.module.scss';

export function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  return (
    <div className={styles.container}>
      <section data-name="chat" className={styles.chat}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </section>
      <section data-name="prompt">
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id="chat-input"
            name="chat-input"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className={styles.input}
          />
          <button type="submit" className={styles['send-button']}>
            Send
          </button>
        </form>
      </section>
    </div>
  );
}

type MessageProps = {
  message: Message;
};

function Message({ message }: MessageProps) {
  // Don't render system messages
  if (message.role === 'system') {
    return null;
  }

  return (
    <article data-role={message.role} className={styles.message}>
      <span className={styles.role}>{message.role}</span>
      <div className={styles.content}>
        {message.parts?.map((part, i) => {
          switch (part.type) {
            case 'text':
              return (
                <span key={`${message.id}-${i}`}>
                  {part.text}
                </span>
              );
            default:
              return null;
          }
        })}
      </div>
    </article>
  );
}