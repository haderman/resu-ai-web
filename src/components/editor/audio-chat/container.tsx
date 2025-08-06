import React from 'react';
import { useSelector } from 'react-redux';

import { apiState } from '@/state/api';
import { createObjectFromPath, createObjectFromPaths } from '@/shared/helpers';
import { Field, ToolDefinition, ToolCall, Resume } from '@/shared/types';
import { composeSystemPrompt, RESUME_TOOLS } from '@/shared/helpers/prompts';

import { AudioChat } from '../audio-chat';

const useUpdater = apiState.resume.useResumeContentUpdater;

export type AudioChatContainerProps = React.DataHTMLAttributes<{}>;

export function AudioChatContainer(props: AudioChatContainerProps) {
  const updateResumeContent = useUpdater();
  const resume = useSelector(apiState.resume.selectors.selectResume);
  const serializedResume = React.useMemo(() => serializeResumteToLLM(resume), [resume]);

  function handleToolCall(toolCall: ToolCall) {
    console.log('Tool call received:', toolCall);

    // Example of handling the updateFields tool call
    if (toolCall.name === 'updateFields') {
      const args = JSON.parse(toolCall.arguments as any);
      console.log('> args: ', args);
      
      // Handle the new array format (preferred)
      if (args.fields && Array.isArray(args.fields)) {
        const fieldsWithValues = args.fields.filter((f: { field: Field; value: string | null }) => f.value !== null);
        
        console.log('> fieldsWithValues: ', fieldsWithValues);

        if (fieldsWithValues.length > 0) {
          // Use batch processing for multiple updates
          const pathValuePairs = fieldsWithValues.map((f: { field: Field; value: string | null }) => [f.field.path, f.value] as [string, any]);
          const composedObject = createObjectFromPaths(pathValuePairs);
          console.log('> composedObject: ', composedObject);
          updateResumeContent(composedObject);
        }
      } else if (args.field && args.value !== undefined) {
        // Fallback for old single field format
        updateFields(args.field, args.value);
      }
    }
  };

  function updateFields(field: Field, value?: string | null) {
    if (value === null) {
      // setField(field);
      return;
    }

    console.log('> update');
    const objectFromPath = createObjectFromPath(field.path, value);
    console.log('> objectFromPath: ', objectFromPath);
    updateResumeContent(objectFromPath);
  }

  return (
    <AudioChat
      onToolCall={handleToolCall}
      tools={convertToolsForRealtime(RESUME_TOOLS)}
      systemPrompt={composeSystemPrompt(serializedResume)}
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
function serializeResumteToLLM(resume: Resume | undefined): string {
  return JSON.stringify(resume);
}
