export type Message =
  | { role: 'user'; content: string; }
  | { role: 'assistant'; content: string; }
  | { role: 'assistant'; content: null; tool_calls: Array<any>; }
  | { role: 'system'; content: string; }

export type ChatResponse = {
  error: null
  reply: string
  args: {
    [key: string]: string | string[] | null
  }
  function: 'updateFields'
}
