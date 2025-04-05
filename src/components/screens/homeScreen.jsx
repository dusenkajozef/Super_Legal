import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPrompt } from '../../redux/promptSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = () => {
    dispatch(setPrompt(inputValue));
    navigate('/battle');
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
