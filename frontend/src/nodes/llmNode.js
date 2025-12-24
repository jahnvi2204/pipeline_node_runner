// llmNode.js

import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    fields: [
      {
        key: 'model',
        label: 'Model',
        type: 'select',
        options: ['gpt-4', 'gpt-3.5', 'llama-3'],
        defaultValue: 'gpt-4',
      },
      {
        key: 'temperature',
        label: 'Temperature',
        type: 'number',
        defaultValue: 0.7,
      },
    ],
    handles: [
      {
        id: 'system',
        type: 'target',
        position: 'left',
        style: { top: '30%' },
      },
      {
        id: 'prompt',
        type: 'target',
        position: 'left',
        style: { top: '70%' },
      },
      {
        id: 'response',
        type: 'source',
        position: 'right',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};

