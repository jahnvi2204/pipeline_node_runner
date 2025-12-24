// branchNode.js

import { BaseNode } from './baseNode';

export const BranchNode = ({ id, data }) => {
  const config = {
    title: 'Branch',
    fields: [
      {
        key: 'expression',
        label: 'Expression',
        type: 'text',
        placeholder: 'e.g. user.country === "US"',
      },
    ],
    handles: [
      {
        id: 'input',
        type: 'target',
        position: 'left',
      },
      {
        id: 'true',
        type: 'source',
        position: 'right',
        style: { top: '35%' },
      },
      {
        id: 'false',
        type: 'source',
        position: 'right',
        style: { top: '70%' },
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};


