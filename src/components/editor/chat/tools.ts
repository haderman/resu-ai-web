export const tools = [
  {
    type: 'function',
    function: {
      name: 'update_fields',
      description: 'Use this function to update the fields of the resume.',
      parameters: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Path to the field to update.',
          },
          value: {
            type: 'string',
            description: 'New value of the field.',
          },
        },
        required: ['path', 'value'],
      },
    }
  },
];
