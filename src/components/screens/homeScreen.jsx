import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the Home Screen</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter something"
        />
      </div>
      <button className="btn btn-primary" onClick={handleButtonClick}>
        Submit
      </button>
    </div>
  );
}
