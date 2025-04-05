import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BattleScreen() {
    const prompt = useSelector((state) => state.prompt.prompt);
    const goodMessages = useSelector((state) => state.goodMessages.messages);
    const badMessages = useSelector((state) => state.badMessages.messages);

    const [areAIsBattling, setAreAIsBattling] = useState(false);

    const handleStartBattleClick = () => {
        setAreAIsBattling(!areAIsBattling);
    }

    return (
        <div className="battle-screen">
          <h2>Battle Screen</h2>
    
          <div className="prompt-container">
            <h3>Current Prompt:</h3>
            <p>{prompt}</p>
          </div>
    
          <button
            className={`btn ${areAIsBattling ? 'btn-danger' : 'btn-success'}`}
            onClick={handleStartBattleClick}
          >
            {areAIsBattling ? 'End Battle' : 'Start Battle'}
          </button>
    

          <div className="message-container">
            <div className="left-chat">
              <h3>Good Messages</h3>
              <ul>
                {goodMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
            <div className="right-chat">
              <h3>Bad Messages</h3>
              <ul>
                {badMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
}
