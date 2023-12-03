import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Element({ id, type, xPos, yPos, itemName, fontSize, fontWeight, isSelected, onUpdate, onDragStart, onClick, onDeleteElement }) {
  const [modal, setModal] = useState(false);
  const [editedName, setEditedName] = useState(itemName);
  const [editedX, setEditedX] = useState(xPos);
  const [editedY, setEditedY] = useState(yPos);
  const [editedFontSize, setEditedFontSize] = useState(fontSize);
  const [editedFontWeight, setEditedFontWeight] = useState(fontWeight);

  console.log("selectedddddd", isSelected)

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isSelected) {
        if (event.key === 'Enter') {
          openModal()
        }
        else if ((event.metaKey || event.ctrlKey) && event.key === 'Backspace') {
          onDeleteElement()
        }
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener('keydown', handleKeyPress);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSelected]); // Empty dependency array ensures that the effect runs once when the component mounts


  const openModal = () => {
    setModal(true)
  }
  const handleUpdate = () => {
    onUpdate(id, editedName, editedX, editedY, editedFontSize, editedFontWeight);
    setModal(false)
  };



  const getFormData = () => {
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
          border: isSelected ? "1px solid red" : "",
          position: 'absolute',
          left: xPos,
          top: yPos,
          padding: '10px',
          cursor: 'pointer',
          fontSize: `${fontSize}px`,
          fontWeight: `${fontWeight}`
        }}
        id={id}
        draggable
        onDragStart={(e) => onDragStart(id)}
        onClick={(e) => onClick(id)}
      >
        {getFormData()}
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
              <label>X</label>
              <input
                className='form-control mt-1'
                type="number"
                value={editedX}
                onChange={(e) => setEditedX(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Y</label>
              <input
                className='form-control mt-1'
                type="number"
                value={editedY}
                onChange={(e) => setEditedY(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label>Font Size (px)</label>
              <input
                type="number"
                className='form-control mt-1'
                value={editedFontSize}
                onChange={(e) => setEditedFontSize(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label>Font Weight (100-900)</label>
              <input
                type="number"
                className='form-control mt-1'
                value={editedFontWeight}
                onChange={(e) => setEditedFontWeight(e.target.value)}
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
