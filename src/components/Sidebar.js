import React, { useState } from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import '../assets/css/App.css'
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import dragImage from '../assets/img/grip-vertical.png'

function Sidebar({ setDraggedItem }) {

  const handleDragStart = (e, type) => {
    setDraggedItem(type);
    e.dataTransfer.setData('text/plain', ''); // for Firefox compatibility
  };

  const [isVisible, setIsVisible] = useState(true)


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
      </SideNav.Nav>
    </SideNav>
  );
}



export default Sidebar;
