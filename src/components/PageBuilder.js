import React, { useEffect, useState } from 'react';
import Element from './Element';
import Sidebar from './Sidebar';

function PageBuilder() {
  const [elements, setElements] = useState(JSON.parse(localStorage.getItem('elements')) || []); //get elements from localstorage if presents
  const [newDraggedItemType, setNewDraggedItemType] = useState(null);
  const [draggedElementID, setDraggedElementID] = useState(null);
  const [selectedElementID, setSelectedElementID] = useState(null);

  useEffect(() => {
    setElements(elements)
    // Save data to local storage whenever 'elements' changes
    localStorage.setItem('elements', JSON.stringify(elements));
  }, [elements]);

  const handleDroppedElement = (e, id) => {
    e.preventDefault();
    const xPos = e.clientX; // accessing horizontal cordinate of dragged element
    const yPos = e.clientY; // accessing vertical cordinate of dragged element

    if (newDraggedItemType) { // if executes for newly  dragged elements from the sidebar
      const newElement = {
        id: new Date().getTime(),
        type: newDraggedItemType, // type of newly dragged elements it can be label, input or button
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
    else { // executes for dragging existing elements
      updateExistingElementOnDrag(draggedElementID, xPos, yPos,)
    }
    setNewDraggedItemType(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const updateExistingElementOnDrag = (elementID, updatedX, updatedY) => {
    // find user selected elements using id and update the data received by the function
    const updatedElements = elements?.map((element) =>
      element.id === elementID ? { ...element, xPos: parseInt(updatedX), yPos: parseInt(updatedY) } : element
    );

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  const handleUpdateElementOnModal = (elementID, updatedName, updatedX, updatedY, editedFontSize, editedFontWeight) => {
    // find user selected elements using id and update the data received by the function
    const updatedElements = elements?.map((element) =>
      element.id === elementID ? { ...element, itemName: updatedName, xPos: parseInt(updatedX), yPos: parseInt(updatedY), fontSize: editedFontSize, fontWeight: editedFontWeight } : element
    );

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  };

  const onDeleteElement = (e) => {
    //delete the element from the elements data using selectedElementID
    const updatedElements = elements?.filter(element => element.id !== selectedElementID);

    // Save updated elements to local storage
    setElements(updatedElements);
    localStorage.setItem('elements', JSON.stringify(updatedElements));
  }
  return (
    <div
      className='page-builder'
      onDrop={(e) => handleDroppedElement(e)}
      onDragOver={handleDragOver}
    >
      {elements && elements?.map((element) => (
        <Element
          {...element}
          key={element.id}
          id={element.id}
          onUpdate={handleUpdateElementOnModal}
          isSelected={selectedElementID === element.id}
          onDragStart={setDraggedElementID}
          onClickedElement={setSelectedElementID}
          onDeleteElement={onDeleteElement}
        />
      ))}
      <Sidebar setNewDraggedItemType={setNewDraggedItemType} />
    </div>
  );
}

export default PageBuilder;
