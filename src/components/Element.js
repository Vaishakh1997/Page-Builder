import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function Element({ id, type, x, y, configuration, onUpdate }) {
  const [modal, setModal] = useState(false);
  const [editedName, setEditedName] = useState(configuration);
  const [editedX, setEditedX] = useState(x);
  const [editedY, setEditedY] = useState(y);

  const handleDoubleClick = (event) => {
    console.log(event.target.id);
    openModal()
    // var input = document.getElementById(event.target.id);
    // console.log("input",input);
    // input?.addEventListener("keypress", function (event) {
    //   if (event.key === "Enter") {
    //     // event.preventDefault();
    //     openModal()
    //   }
    // });
  };

  const openModal = () => {
    setModal(true)
  }
  const handleUpdate = () => {
    onUpdate(id, editedName, editedX, editedY);
    setModal(false)
  };
  console.log("type", type);

  const getFormData = () => {
    switch (type) {
      case 'Button':
        return <Button variant='primary'>Button</Button>
      case 'Input':
        return <input type='text' placeholder='Input' />
      case 'Label':
        return <p className='h6' >Label</p>
      default:
        break;
    }
  }

  return (
    <>
      <div
        style={{
          position: 'absolute',
          left: x,
          top: y,
          padding: '10px',
          cursor: 'pointer',
        }}
        draggable
        onClick={(e) => handleDoubleClick(e)}
      >
        {/* {type.toUpperCase()} - {configuration} */}
        {getFormData()}
      </div>
      <Modal show={modal} onHide={() => setModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <h5>Name</h5>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div>
              <h5>X</h5>
              <input
                type="text"
                value={editedX}
                onChange={(e) => setEditedX(e.target.value)}
              />
            </div>
            <div>
              <h5>Y</h5>
              <input
                type="text"
                value={editedY}
                onChange={(e) => setEditedY(e.target.value)}
              />
            </div>

            <button onClick={handleUpdate}>Update</button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Element;
