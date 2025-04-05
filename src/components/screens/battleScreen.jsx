import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Button, ListGroup } from 'react-bootstrap';
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
              <h3>Good Messages</h3>
              <div className="border p-3 mb-3" style={{ minHeight: '200px', overflowY: 'auto' }}>
                <ListGroup>
                  {goodMessages.map((message, index) => (
                    <ListGroup.Item key={index}>{message}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
    
            <Col md={6}>
              <h3>Bad Messages</h3>
              <div className="border p-3 mb-3" style={{ minHeight: '200px', overflowY: 'auto' }}>
                <ListGroup>
                  {badMessages.map((message, index) => (
                    <ListGroup.Item key={index}>{message}</ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
        </Container>
    );
}
