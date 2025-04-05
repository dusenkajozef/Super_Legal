import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
import MessageBox from '../messageBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import AngelImage from "../../images/Angel.png";
import DevilImage from "../../images/Devil.png";

export default function BattleScreen() {
    const prompt = useSelector((state) => state.prompt.prompt);
    const goodMessages = useSelector((state) => state.goodMessages.messages);
    const badMessages = useSelector((state) => state.badMessages.messages);

    const [areAIsBattling, setAreAIsBattling] = useState(false);

    const handleStartBattleClick = () => {
        setAreAIsBattling(!areAIsBattling);
    }

    return (
        <Container className="my-4">
          <h2 className="text-center mb-4">Battle Screen</h2>
          
          <div className="mb-4">
            <h3>Current Prompt:</h3>
            <p>{prompt}</p>
          </div>
    
          <Button
            variant={areAIsBattling ? 'danger' : 'success'}
            onClick={handleStartBattleClick}
            className="mb-4"
          >
            {areAIsBattling ? 'End Battle' : 'Start Battle'}
          </Button>
    
          <Row>
            <Col md={6}>
              <MessageBox title="Good Messages" messages={goodMessages} />
            </Col>
    
            <Col md={6}>
              <MessageBox title="Bad Messages" messages={badMessages} />
            </Col>
          </Row>
          <Row>
          <div className="d-flex justify-content-center">

            <div className="container d-flex justify-content-center">
              <img src= {AngelImage} alt="" width="200" height="200" style={{
                display: 'block', // Make image block to allow centering
              }}/>
            </div>

            <div className="container d-flex justify-content-center">
              <img src= {DevilImage} alt="" width="200" height="200" style={{
                display: 'block', // Make image block to allow centering
              }}/>
            </div>
          </div>
            
          </Row>
        </Container>
    );
}
