import React, { useState } from "react";
import dragImage from '../assets/img/grip-vertical.png'
import ExportButton from "./Export";
import ImportButton from "./Import";
import { Sidebar } from 'react-pro-sidebar'

function SideBar({ setNewDraggedItemType }) {
  // const [isVisible, setIsVisible] = useState(true)

  const handleDragStart = (e, type) => {
    setNewDraggedItemType(type);
  };

  return (
    <Sidebar>
      <h4 className="drag-heading mt-4">Blocks</h4>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Label')}
        className="drag-item"
      >
        <img src={dragImage} alt="drag" className="drag-image" />
        Label
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Input')}
        className="drag-item"
      >
        <img src={dragImage} alt="drag" className="drag-image" />
        Input
      </div>
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, 'Button')}
        className="drag-item"
      >
        <img src={dragImage} alt="drag" className="drag-image" />
        Button
      </div>

      <h4 className="drag-heading mt-5 mb-0">Export/Import</h4>
      <ExportButton />
      <ImportButton />
    </Sidebar>
  );
}



export default SideBar;
