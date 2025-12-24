// delayNode.js

import { BaseNode } from './baseNode';

export const DelayNode = ({ id, data }) => {
  const config = {
    title: 'Delay',
    fields: [
      {
        key: 'durationMs',
        label: 'Duration (ms)',
        type: 'number',
        defaultValue: 1000,
      },
    ],
    handles: [
      {
        id: 'in',
        type: 'target',
        position: 'left',
      },
      {
        id: 'out',
        type: 'source',
        position: 'right',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};


