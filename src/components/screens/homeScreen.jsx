import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPrompt } from '../../redux/promptSlice';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
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
    <Container className="mt-5">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <h1 className="text-center mb-4">Welcome to the Home Screen</h1>

          <Form>
            <Form.Group controlId="formPromptInput" className="mb-3">
              <Form.Label>Enter something</Form.Label>
              <Form.Control
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter something"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleButtonClick} className="w-100">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
