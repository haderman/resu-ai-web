export interface ToolDefinition {
    type: 'function';
    name: string;
    description: string;
    parameters: {
      type: string;
      properties: Record<string, any>;
      required?: string[];
    };
  }
  
  export type ToolCall = {
    name: string;
    arguments: Record<string, any>;
  };