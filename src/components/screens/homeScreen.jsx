import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPrompt } from '../../redux/promptSlice';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
import Logo from "../../images/Logo.png"
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiGetInitialGoodMessage } from '../../services/goodMessagesService';
import { addGoodMessage } from '../../redux/goodMessagesSlice';
import { apiGetInitialBadMessage } from '../../services/badMessagesService';
import { addBadMessage } from '../../redux/badMessagesSlice';

export default function HomeScreen() {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleButtonClick = async () => {
    setLoading(true);
    try{
        dispatch(setPrompt(inputValue));
        const [goodResponse, badResponse] = await Promise.all([
            apiGetInitialGoodMessage(inputValue),
            apiGetInitialBadMessage(inputValue),
        ]);
        console.log(goodResponse.response);
        console.log(badResponse.response);
        dispatch(addGoodMessage(goodResponse.response));
        dispatch(addBadMessage(badResponse.response));

        navigate('/battle');
    } catch (error) {
        console.error("Error fetching messages", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Row>
        <Col xs={12} md={8} lg={8} >
          <h1 className="text-center mb-4">Welcome to Super Legal</h1>

          <Form>
            <Form.Group controlId="formPromptInput" className="mb-3 w-100">
              <Form.Label>Enter the question</Form.Label>
              <Form.Control
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type here..."
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleButtonClick}
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Loading...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </Form>
        </Col>
        
      </Row>
      <img src= {Logo} alt="" width="200" height="200"/>
    </Container>
  );
}
