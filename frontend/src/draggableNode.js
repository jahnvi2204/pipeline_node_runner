// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        style={{ 
          cursor: 'grab', 
          minWidth: '96px', 
          height: '56px',
          display: 'flex', 
          alignItems: 'center', 
          borderRadius: '999px',
          background: 'linear-gradient(135deg, rgba(55,65,81,0.9), rgba(17,24,39,0.9))',
          justifyContent: 'center', 
          flexDirection: 'column',
          border: '1px solid rgba(75,85,99,0.9)',
          boxShadow: '0 10px 22px rgba(15,23,42,0.9)',
          fontSize: '12px',
          paddingInline: '10px'
        }} 
        draggable
      >
          <span style={{ color: '#fff' }}>{label}</span>
      </div>
    );
  };
  