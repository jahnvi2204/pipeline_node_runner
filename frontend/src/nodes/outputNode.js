// outputNode.js

import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    fields: [
      {
        key: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'output name',
      },
      {
        key: 'outputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'Image'],
        defaultValue: 'Text',
      },
    ],
    handles: [
      {
        id: 'value',
        type: 'target',
        position: 'left',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};

