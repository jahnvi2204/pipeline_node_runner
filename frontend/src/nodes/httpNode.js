// httpNode.js

import { BaseNode } from './baseNode';

export const HttpNode = ({ id, data }) => {
  const config = {
    title: 'HTTP Request',
    fields: [
      {
        key: 'method',
        label: 'Method',
        type: 'select',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        defaultValue: 'GET',
      },
      {
        key: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://api.example.com',
      },
      {
        key: 'body',
        label: 'Body (JSON)',
        type: 'textarea',
        placeholder: '{"key": "value"}',
      },
    ],
    handles: [
      {
        id: 'input',
        type: 'target',
        position: 'left',
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


