import React, { useEffect, useState } from 'react';
import Element from './Element';
import Sidebar from './Sidebar';

function PageBuilder() {
  const [elements, setElements] = useState(JSON.parse(localStorage.getItem('elements')) || []);
  const [newDraggedItem, setNewDraggedItem] = useState(null);
  const [draggedElementID, setDraggedElementID] = useState(null);
  const [selectedElementID, setSelectedElemnt] = useState(null);

  useEffect(() => {
    setElements(elements)
    // Save data to local storage whenever 'elements' changes
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  const handleDrop = (e, id) => {
    e.preventDefault();
    const xPos = e.clientX;
    const yPos = e.clientY;

    if (newDraggedItem) {
      const newElement = {
        id: new Date().getTime(),
        type: newDraggedItem,
        xPos,
        yPos,
        itemName: 'Enter Name',
        fontSize: 15,
        fontWeight: 400
      };

      const updatedElements = [...elements, newElement];

      // Save updated elements to local storage
      setElements(updatedElements);
      localStorage.setItem('elements', JSON.stringify(updatedElements));
    }
    else {
      handleUpdateElementOnDrag(draggedElementID, xPos, yPos,)
    }

    setNewDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpdateElementOnDrag = (elementID, editedX, editedY) => {
    const updatedElements = elements?.map((element) =>
      element.id === elementID ? { ...element, xPos: parseInt(editedX), yPos: parseInt(editedY) } : element
    );

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  const handleUpdateElementOnModal = (elementID, updatedName, editedX, editedY, editedFontSize, editedFontWeight) => {
    const updatedElements = elements?.map((element) =>
      element.id === elementID ? { ...element, itemName: updatedName, xPos: parseInt(editedX), yPos: parseInt(editedY), fontSize: editedFontSize, fontWeight: editedFontWeight } : element
    );

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  const onDeleteElement = (e) => {
    const updatedElements = elements?.filter(element => element.id !== selectedElementID);

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  }
  return (
    <div
      style={{ border: '1px solid #ccc', minHeight: '100vh', position: 'relative', background: 'aliceBlue' }}
      onDrop={(e) => {
        handleDrop(e)
      }}
      onDragOver={handleDragOver}

    >
      {elements && elements?.map((element) => (
        <Element key={element.id} id={element.id} onUpdate={handleUpdateElementOnModal} isSelected={selectedElementID === element.id} onDragStart={setDraggedElementID} onClick={setSelectedElemnt} onDeleteElement={onDeleteElement} {...element} />
      ))}
      <Sidebar setNewDraggedItem={setNewDraggedItem} />
    </div>
  );
}

export default PageBuilder;
