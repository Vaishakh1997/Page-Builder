import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SideNav, { NavItem } from "@trendmicro/react-sidenav";
import dragImage from '../assets/img/grip-vertical.png'
import ExportButton from "./Export";
import ImportButton from "./Import";

function Sidebar({ setNewDraggedItemType }) {
  const [isVisible, setIsVisible] = useState(true)

  const handleDragStart = (e, type) => {
    setNewDraggedItemType(type);
  };

  return (
    <SideNav expanded={isVisible}>
      <SideNav.Toggle
        onClick={() => {
          setIsVisible(!isVisible)
        }}
      />
      <SideNav.Nav defaultSelected="">
        <h4 className="drag-heading">Blocks</h4>

        <NavItem eventKey="label">
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'Label')}
            className="drag-item"
          >
            <img src={dragImage} alt="drag" className="drag-image" />
            Label
          </div>
        </NavItem>
        <NavItem eventKey="input">
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'Input')}
            className="drag-item"
          >
            <img src={dragImage} alt="drag" className="drag-image" />
            Input
          </div>
        </NavItem>
        <NavItem eventKey="button">
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, 'Button')}
            className="drag-item"
          >
            <img src={dragImage} alt="drag" className="drag-image" />
            Button
          </div>
        </NavItem>

        <h4 className="drag-heading mt-5 mb-0">Export/Import</h4>
        <ExportButton />
        <ImportButton />

      </SideNav.Nav>
    </SideNav>
  );
}



export default Sidebar;
