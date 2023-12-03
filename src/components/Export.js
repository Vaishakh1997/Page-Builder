import React from 'react';
import { Button } from 'react-bootstrap';

function ExportButton() {
    const downloadJsonFile = () => {
        // Retrieve the object from localStorage
        const storedData = localStorage.getItem('elements');

        if (storedData) {
            // Convert the object to a JSON string
            const jsonData = JSON.stringify(JSON.parse(storedData), null, 2);

            // Create a Blob with the JSON data
            const blob = new Blob([jsonData], { type: 'application/json' });

            // Create a link with a download attribute
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'data.json';

            // Append the link to the document
            document.body.appendChild(link);

            // Trigger a click event to download the file
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        } else {
            alert('No data found in localStorage');
        }
    };

    return (
        <Button className='export-btn mb-0' variant='info' onClick={downloadJsonFile}>Export Data</Button>
    );
}

export default ExportButton;
