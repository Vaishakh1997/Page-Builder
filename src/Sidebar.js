import React from 'react';

function Sidebar({ setDraggedItem }) {
  const handleDragStart = (e, type) => {
    setDraggedItem(type);
    e.dataTransfer.setData('text/plain', ''); // for Firefox compatibility
  };

  return (
    <div style={{ padding: '10px', background: '#e0e0e0' }}>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Label')}
        style={{ cursor: 'move', marginBottom: '10px' }}
      >
        Label
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Input')}
        style={{ cursor: 'move', marginBottom: '10px' }}
      >
        Input
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Button')}
        style={{ cursor: 'move' }}
      >
        Button
      </div>
    </div>
  );
}

export default Sidebar;
