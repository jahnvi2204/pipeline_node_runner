// loggerNode.js

import { BaseNode } from './baseNode';

export const LoggerNode = ({ id, data }) => {
  const config = {
    title: 'Logger',
    fields: [
      {
        key: 'level',
        label: 'Level',
        type: 'select',
        options: ['debug', 'info', 'warn', 'error'],
        defaultValue: 'info',
      },
      {
        key: 'message',
        label: 'Message',
        type: 'text',
        placeholder: 'Log message template',
      },
    ],
    handles: [
      {
        id: 'input',
        type: 'target',
        position: 'left',
      },
      {
        id: 'output',
        type: 'source',
        position: 'right',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};


