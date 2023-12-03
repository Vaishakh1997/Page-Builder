import React from 'react';
import { Button } from 'react-bootstrap';

function ImportButton() {
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          // Parse the JSON data from the file
          const jsonData = JSON.parse(e.target.result);

          // Save the parsed data into localStorage
          localStorage.setItem('elements', JSON.stringify(jsonData));
          window.location.reload()
          console.log('Data imported and saved to localStorage');
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      };

      // Read the file as text
      reader.readAsText(file);
    }
  };

  const handleUpload = () => {
    document.getElementById('file').click()
  }
  

  return (
    <div>
      <input className='export-btn form-control d-none' id='file' type="file" accept=".json" onChange={handleFileChange} />
      <Button className='export-btn mb-0' variant='warning' onClick={handleUpload}>Import</Button>

    </div>
  );
}

export default ImportButton;