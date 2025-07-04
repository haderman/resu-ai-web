import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import type { Message, ToolInvocation } from 'ai';

import { apiState } from '@/state/api';
import { createObjectFromPath } from '@/shared/helpers';
import { Field } from '@/shared/types';
import { Adapter } from '../adapter';

import styles from './chat.module.scss';

const CHAT_ID = 'chat-1';

export function Chat() {
  const updateResumeContent = apiState.resume.useResumeContentUpdater();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    addToolResult,
  } = useChat({
    id: CHAT_ID,
    maxSteps: 3,
    async onToolCall({ toolCall }) {
      if (toolCall.toolName === 'updateFields') {
        const { field, value } = toolCall.args as { field: Field; value: string | null };
        if (value !== null) {
          updateResumeContent(createObjectFromPath(field.path, value));
          return 'updated';
        }
        // value is null -> wait for user input via UpdateFieldComponent
      }

      if (toolCall.toolName === 'getLocation') {
        const cities = [
          'New York',
          'Los Angeles',
          'Chicago',
          'San Francisco',
        ];
        return cities[0];
      }
    },
  });

  React.useEffect(() => {
    console.log('messages: ', messages);
  }, [messages]);

  return (
    <div className={styles.container}>
      <section data-name="chat" className={styles.chat}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
      </section>
      <section data-name="prompt-container">
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            id="chat-input"
            name="chat-input"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            className={styles.input}
          />
          <button
            type="submit"
            className={styles['send-button']}
            disabled={status === 'streaming'}
          >
            Send
          </button>
        </form>
        <div className={styles.status}>
          Status: {status}
        </div>
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
    <MessageLayout role={message.role}>
      {message.parts?.map((part, i) => {
        switch (part.type) {
          case 'text':
            return (
              <span key={`${message.id}-${i}`}>
                {part.text}
              </span>
            );
          case 'step-start':
            return null;
          case 'tool-invocation':
            return (
              <ToolInvocationComponent
                key={`${message.id}-${i}`}
                toolInvocation={part.toolInvocation}
              />
            );
          default:
            return null;
        }
      })}
    </MessageLayout>
  );
}

type ToolInvocationComponentProps = {
  toolInvocation: ToolInvocation
}

function ToolInvocationComponent(props: ToolInvocationComponentProps) {
  const { toolInvocation } = props;
  const { args, state, toolName } = toolInvocation;

  if (toolName === 'updateFields') {
    return <UpdateFieldComponent toolInvocation={toolInvocation} />;
  }

  if (toolName === 'askForConfirmation') {
    return (
      <AskForConfirmationComponent toolInvocation={toolInvocation} />
    );
  }

  return (
    <div className={styles.toolCard}>
      <div className={styles.toolHeader}>
        <span className={styles.toolName}>
          {toolName}
        </span>
      </div>
      <pre className={styles.toolArgs}>
        {JSON.stringify(args, null, 2)}
      </pre>
      {state === 'result' && (
        <>
          <span className={styles.toolState}>
            {state}
          </span>
          <pre className={styles.toolResult}>
            {JSON.stringify(toolInvocation.result, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}

type MessageLayoutProps = React.PropsWithChildren<{
  role: Message['role'];
}>;

function MessageLayout(props: MessageLayoutProps) {
  const { role, children } = props;

  return (
    <article data-role={role} className={styles.message}>
      <span className={styles.role}>{role}</span>
      <div className={styles.content}>
        {children}
      </div>
    </article>
  );
}

type UpdateFieldComponentProps = {
  toolInvocation: ToolInvocation;
};

function UpdateFieldComponent(props: UpdateFieldComponentProps) {
  const { addToolResult } = useChat({ id: CHAT_ID });
  const updateResumeContent = apiState.resume.useResumeContentUpdater();
  const { toolInvocation } = props;
  const callId = toolInvocation.toolCallId;
  const { field, value } = toolInvocation.args as { field: Field; value: string | null };

  if (field) {
    return <Adapter field={field} />;
  }

  return null;
}

type AskForConfirmationComponentProps = {
  toolInvocation: ToolInvocation;
};

function AskForConfirmationComponent(props: AskForConfirmationComponentProps) {
  const { addToolResult } = useChat({ id: CHAT_ID });
  const { toolInvocation } = props;
  const callId = toolInvocation.toolCallId;

  switch (toolInvocation.toolName) {
    case 'askForConfirmation': {
      switch (toolInvocation.state) {
        case 'call':
          return (
            <div key={callId}>
              {toolInvocation.args.message}
              <div>
                <button
                  onClick={() =>
                    addToolResult({
                      toolCallId: callId,
                      result: 'Yes, confirmed.',
                    })
                  }
                >
                  Yes
                </button>
                <button
                  onClick={() =>
                    addToolResult({
                      toolCallId: callId,
                      result: 'No, denied',
                    })
                  }
                >
                  No
                </button>
              </div>
            </div>
          );
        case 'result':
          return (
            <div key={callId}>
              Location access allowed:{' '}
              {toolInvocation.result}
            </div>
          );
      }
      break;
    }

    default: {
      switch (toolInvocation.state) {
        // example of pre-rendering streaming tool calls:
        case 'partial-call':
          return (
            <pre key={callId}>
              {JSON.stringify(toolInvocation, null, 2)}
            </pre>
          );
        case 'call':
          return (
            <div key={callId}>
              Getting weather information for{' '}
              {toolInvocation.args.city}...
            </div>
          );
        case 'result':
          return (
            <div key={callId}>
              Weather in {toolInvocation.args.city}:{' '}
              {toolInvocation.result}
            </div>
          );
      }
      break;
    }
  }
}