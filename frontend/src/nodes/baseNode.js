// baseNode.js
// Generic configurable node component for React Flow nodes

import { Handle, Position } from 'reactflow';

const positionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

/**
 * props:
 * - id: node id
 * - data: node data object from React Flow
 * - config: {
 *     title: string,
 *     width?: number,
 *     height?: number,
 *     backgroundColor?: string,
 *     borderColor?: string,
 *     headerColor?: string,
 *     fields?: [
 *       {
 *         key: string,
 *         label: string,
 *         type: 'text' | 'select' | 'textarea' | 'number',
 *         options?: string[],
 *         placeholder?: string,
 *         defaultValue?: any,
 *       }
 *     ],
 *     handles?: [
 *       {
 *         id: string,             // suffix, will be combined with node id
 *         type: 'source' | 'target',
 *         position: 'left' | 'right' | 'top' | 'bottom',
 *         style?: object,
 *       }
 *     ]
 *   }
 */
export const BaseNode = ({ id, data = {}, config }) => {
  const {
    title,
    width = 220,
    height = 'auto',
    backgroundColor = '#0B1120',
    borderColor = '#4B5563',
    headerColor = '#111827',
    fields = [],
    handles = [],
  } = config || {};

  const handleFieldChange = (fieldKey, value) => {
    if (data?.updateNodeField) {
      // delegate to global store if provided
      data.updateNodeField(id, fieldKey, value);
    } else {
      // fallback: mutate local data object (works but not persisted globally)
      data[fieldKey] = value;
    }
  };

  const renderFieldInput = (field) => {
    const value =
      data[field.key] !== undefined ? data[field.key] : field.defaultValue || '';

    const commonProps = {
      value,
      onChange: (e) => handleFieldChange(field.key, e.target.value),
      style: {
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 4,
        border: '1px solid #4B5563',
        backgroundColor: '#020617',
        color: '#E5E7EB',
        padding: '4px 6px',
        fontSize: 12,
      },
      placeholder: field.placeholder,
    };

    if (field.type === 'select') {
      return (
        <select {...commonProps}>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }

    if (field.type === 'textarea') {
      const lineCount = String(value || '').split('\n').length;
      const rows = Math.min(10, Math.max(3, lineCount));
      return (
        <textarea
          rows={rows}
          {...commonProps}
          style={{ ...commonProps.style, resize: 'none' }}
        />
      );
    }

    return <input type={field.type || 'text'} {...commonProps} />;
  };

  return (
    <div
      style={{
        width,
        minHeight: typeof height === 'number' ? height : undefined,
        border: `1px solid ${borderColor}`,
        borderRadius: 8,
        backgroundColor,
        color: '#E5E7EB',
        fontSize: 12,
        boxShadow: '0 4px 10px rgba(15,23,42,0.6)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '6px 8px',
          background: headerColor,
          borderBottom: `1px solid ${borderColor}`,
          fontWeight: 600,
        }}
      >
        {title}
      </div>

      {fields.length > 0 && (
        <div style={{ padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {fields.map((field) => (
            <label
              key={field.key}
              style={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{field.label}</span>
              {renderFieldInput(field)}
            </label>
          ))}
        </div>
      )}

      {handles.map((h, index) => (
        <Handle
          key={`${id}-${h.id || index}`}
          type={h.type}
          position={positionMap[h.position] || Position.Right}
          id={`${id}-${h.id}`}
          style={h.style}
        />
      ))}
    </div>
  );
};


