// filterNode.js

import { BaseNode } from './baseNode';

export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    fields: [
      {
        key: 'field',
        label: 'Field',
        type: 'text',
        placeholder: 'path.to.field',
      },
      {
        key: 'operator',
        label: 'Operator',
        type: 'select',
        options: ['==', '!=', '>', '>=', '<', '<=', 'contains'],
        defaultValue: '==',
      },
      {
        key: 'value',
        label: 'Value',
        type: 'text',
      },
    ],
    handles: [
      {
        id: 'input',
        type: 'target',
        position: 'left',
      },
      {
        id: 'passed',
        type: 'source',
        position: 'right',
        style: { top: '35%' },
      },
      {
        id: 'failed',
        type: 'source',
        position: 'right',
        style: { top: '70%' },
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};


