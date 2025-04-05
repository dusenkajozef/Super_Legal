import React, { useState } from 'react';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');

  const handleButtonClick = () => {
    alert(`You entered: ${inputValue}`);
  };

  return (
    <div className="home-screen">
      <h1>Welcome to the Home Screen</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something"
      />
      <button onClick={handleButtonClick}>Submit</button>
    </div>
  );
}
