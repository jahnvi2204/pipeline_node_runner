// inputNode.js

import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    fields: [
      {
        key: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'input name',
      },
      {
        key: 'inputType',
        label: 'Type',
        type: 'select',
        options: ['Text', 'File'],
        defaultValue: 'Text',
      },
    ],
    handles: [
      {
        id: 'value',
        type: 'source',
        position: 'right',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};

