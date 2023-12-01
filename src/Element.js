import React, { useState } from 'react';

function Element({ id, type, x, y, configuration, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedConfiguration, setEditedConfiguration] = useState(configuration);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(id, editedConfiguration);
    setIsEditing(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        padding: '10px',
        background: '#f0f0f0',
        cursor: 'pointer',
      }}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedConfiguration}
            onChange={(e) => setEditedConfiguration(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <>
          {type.toUpperCase()} - {configuration}
        </>
      )}
    </div>
  );
}

export default Element;
