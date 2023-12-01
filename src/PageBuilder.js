import React, { useState } from 'react';
import Element from './Element';
import Sidebar from './Sidebar';

function PageBuilder() {
  const [elements, setElements] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;

    if (draggedItem) {
      const newElement = {
        id: new Date().getTime(),
        type: draggedItem,
        x,
        y,
        configuration: 'Default Configuration',
      };

      const updatedElements = [...elements, newElement];

      // Save updated elements to local storage
      setElements(updatedElements);
      localStorage.setItem('elements', JSON.stringify(updatedElements));
    }

    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpdateElement = (elementId, newConfiguration) => {
    const updatedElements = elements.map((element) =>
      element.id === elementId ? { ...element, configuration: newConfiguration } : element
    );

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  return (
    <div
      style={{ border: '1px solid #ccc', minHeight: '300px', position: 'relative' }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {elements.map((element) => (
        <Element key={element.id} onUpdate={handleUpdateElement} {...element} />
      ))}
      <Sidebar setDraggedItem={setDraggedItem} />
    </div>
  );
}

export default PageBuilder;
