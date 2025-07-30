import React from 'react';

import { apiState } from '@/state/api';
import { createObjectFromPath } from '@/shared/helpers';
import { Field, ToolDefinition } from '@/shared/types';
import { RESUME_INSTRUCTIONS, RESUME_TOOLS } from '@/shared/helpers/prompts';

import { AudioChat, AudioChatProps } from '../audio-chat';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type AudioChatContainerProps = React.DataHTMLAttributes<{}>;

export function AudioChatContainer(props: AudioChatContainerProps) {
  const update = useUpdater();

  const handleToolCall: AudioChatProps['onToolCall'] = (toolCall) => {
    console.log('Tool call received:', toolCall);

    // Example of handling the updateFields tool call
    if (toolCall.name === 'updateFields') {
      const args = JSON.parse(toolCall.arguments as any);
      console.log('> args: ', args);
      updateFields(args.field, args.value);
    }
  };

  function updateFields(field: Field, value?: Field['type']) {
    if (value === null) {
      // setField(field);
      return;
    }

    console.log('> update');
    update(createObjectFromPath(field.path, value));
  }

  return (
    <AudioChat
      onToolCall={handleToolCall}
      tools={convertToolsForRealtime(RESUME_TOOLS)}
      systemPrompt={RESUME_INSTRUCTIONS}
      {...props}
    />
  );
}

export function convertToolsForRealtime(tools: typeof RESUME_TOOLS): ToolDefinition[] {
  return tools.map(tool => ({
    type: 'function',
    name: tool.name,
    description: tool.description,
    parameters: tool.parameters
  }));
}