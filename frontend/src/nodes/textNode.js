// textNode.js

import { BaseNode } from './baseNode';

const extractVariables = (rawText) => {
  const text = rawText || '';
  const regex = /\{\{\s*([a-zA-Z_$][0-9a-zA-Z_$]*)\s*\}\}/g;
  const vars = new Set();
  let match;

  while ((match = regex.exec(text)) !== null) {
    vars.add(match[1]);
  }

  return Array.from(vars);
};

export const TextNode = ({ id, data = {} }) => {
  const textValue = data.text !== undefined ? data.text : '{{input}}';

  // Dynamic size based on content
  const lines = String(textValue).split('\n');
  const longestLineLength = lines.reduce(
    (max, line) => Math.max(max, line.length),
    0
  );
  const dynamicWidth = Math.min(480, Math.max(220, 140 + longestLineLength * 4));

  // Dynamic handles based on {{variable}} usage
  const variables = extractVariables(textValue);
  const variableHandles = variables.map((name, index) => {
    const top = 20 + index * 18;
    return {
      id: `var-${name}`,
      type: 'target',
      position: 'left',
      style: { top: `${top}%` },
    };
  });

  const config = {
    title: 'Text',
    width: dynamicWidth,
    fields: [
      {
        key: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        placeholder: 'Enter text, e.g. Hello {{name}}',
      },
    ],
    handles: [
      ...variableHandles,
      {
        id: 'output',
        type: 'source',
        position: 'right',
      },
    ],
  };

  return <BaseNode id={id} data={data} config={config} />;
};

