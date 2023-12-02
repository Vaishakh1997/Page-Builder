import React, { useEffect, useState } from 'react';
import Element from './Element';
import Sidebar from './Sidebar';

function PageBuilder() {
    const [elements, setElements] = useState(JSON.parse(localStorage.getItem('elements')) || []);
    const [draggedItem, setDraggedItem] = useState(null);


    useEffect(() => {
        setElements(elements)
        // Save data to local storage whenever 'elements' changes
        localStorage.setItem('elements', JSON.stringify(elements));
    }, [elements]);



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
                configuration: 'Enter Name',
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

    const handleUpdateElement = (elementId, newConfiguration, editedX, editedY) => {
        const updatedElements = elements.map((element) =>
            element.id === elementId ? { ...element, configuration: newConfiguration, x: parseInt(editedX), y: parseInt(editedY) } : element
        );

        // Save updated elements to local storage
        setElements(updatedElements);
        localStorage.setItem('elements', JSON.stringify(updatedElements));
    };

    return (
        <div
            style={{ border: '1px solid #ccc', minHeight: '100vh', position: 'relative', background:'aliceBlue' }}
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
