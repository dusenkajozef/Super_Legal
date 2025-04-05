import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
//import MessageBox from '../messageBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import AngelImage from "../../images/Angel.png";
import DevilImage from "../../images/Devil.png";
import { apiGetBattleGoodMessage } from '../../services/goodMessagesService';
import { apiGetBattleBadMessage } from '../../services/badMessagesService';
import { addGoodMessage } from '../../redux/goodMessagesSlice';
import { addBadMessage } from '../../redux/badMessagesSlice';
import ChatDisplay from '../chatDisplay';

export default function BattleScreen() {
    const prompt = useSelector((state) => state.prompt.prompt);
    const goodMessages = useSelector((state) => state.goodMessages.messages);
    const badMessages = useSelector((state) => state.badMessages.messages);

    const [areAIsBattling, setAreAIsBattling] = useState(false);

    const dispatch = useDispatch();

    const handleStartBattleClick =  async () => {
        setAreAIsBattling(!areAIsBattling);
        const goodBattleResponse = await apiGetBattleGoodMessage(prompt, goodMessages, badMessages)
        dispatch(addGoodMessage(goodBattleResponse.response))
        const badBattleResponse = await apiGetBattleBadMessage(prompt, goodMessages, badMessages)
        dispatch(addBadMessage(badBattleResponse.response))
    }

    return (
        <Container className="my-4">          
          <div className="mb-4">
            <h3>Current Prompt:</h3>
            <p>{prompt}</p>
          </div>
    
          <Row className="mb-3">
                <Col xs={12} md={5} className="d-flex justify-content-start">
                {goodMessages.length > 0 && (
                    <div className="p-3 rounded-3 bg-warning text-dark w-75">
                    {goodMessages[0]}
                    </div>
                )}
                </Col>

                <Col xs={12} md={2} className="d-flex justify-content-center align-items-center">
                <Button
                    variant={areAIsBattling ? 'danger' : 'success'}
                    onClick={handleStartBattleClick}
                    className="mb-4"
                >
                    {areAIsBattling ? 'End Battle' : 'Start Battle'}
                </Button>
                </Col>

                <Col xs={12} md={5} className="d-flex justify-content-end">
                {badMessages.length > 0 && (
                    <div className="p-3 rounded-3 bg-danger text-white w-75">
                    {badMessages[0]}
                    </div>
                )}
                </Col>
            </Row>
          <Row>
            <Col md={12}>
            <ChatDisplay />
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
