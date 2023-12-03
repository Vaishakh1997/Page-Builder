import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Element({ id, type, xPos, yPos, itemName, fontSize, fontWeight, isSelected, onUpdate, onDragStart, onClickedElement, onDeleteElement }) {
  const [modal, setModal] = useState(false);
  const [editedName, setEditedName] = useState(itemName);
  const [updatedX, setUpdatedX] = useState(xPos);
  const [updatedY, setUpdatedY] = useState(yPos);
  const [updatedFontSize, setUpdatedFontSize] = useState(fontSize);
  const [updatedFontWeight, setUpdatedFontWeight] = useState(fontWeight);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isSelected) {
        if (event.key === 'Enter') {
          setModal(true) // Open Edit modal on Enter Click
        }
        else if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
          onDeleteElement() // Delete specific element on cmd+delete (ctrl+delete on windows)
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress); // Attach the event listener when the component mounts

    return () => {
      document.removeEventListener('keydown', handleKeyPress); // Clean up the event listener when the component unmounts
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]);

  const handleUpdate = () => {
    // collect all the updated values user entered and pass it to onUpdate props
    onUpdate(id, editedName, updatedX, updatedY, updatedFontSize, updatedFontWeight);
    setModal(false)
  };

  const GetSidebarBlocks = () => {
    switch (type) {
      case 'Button':
        return <Button className='inherit-style' variant='primary'>{editedName}</Button>
      case 'Input':
        return <input className='form-control inherit-style' type='text' placeholder='Enter here' value={editedName} />
      case 'Label':
        return <label className='inherit-style' >{editedName}</label>
      default:
        break;
    }
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          padding: '10px',
          cursor: 'pointer',
          border: isSelected ? "1px solid red" : "",
          left: xPos,
          top: yPos,
          fontSize: `${fontSize}px`,
          fontWeight: `${fontWeight}`
        }}
        id={id}
        draggable
        onDragStart={(e) => onDragStart(id)}
        onClick={(e) => onClickedElement(id)}
      >
        {/* get sidebar blocks based on dragged element type from the function */}
        <GetSidebarBlocks />

      </div>

      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='mb-3'>
              <label>Name</label>
              <input
                className='form-control mt-1'
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>X Cordinate</label>
              <input
                className='form-control mt-1'
                type="number"
                value={updatedX}
                onChange={(e) => setUpdatedX(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Y Cordinate</label>
              <input
                className='form-control mt-1'
                type="number"
                value={updatedY}
                onChange={(e) => setUpdatedY(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Font Size</label>
              <input
                type="number"
                className='form-control mt-1'
                value={updatedFontSize}
                onChange={(e) => setUpdatedFontSize(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label>Font Weight (100-900)</label>
              <input
                type="number"
                className='form-control mt-1'
                value={updatedFontWeight}
                onChange={(e) => setUpdatedFontWeight(e.target.value)}
              />
            </div>
            <Button className='inherit-style' variant='primary' onClick={handleUpdate}>Save Changes</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Element;