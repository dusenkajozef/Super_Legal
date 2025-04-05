import React, { useState } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { Container, Row, Col, Button } from 'react-bootstrap';
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

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


    const handleStartBattleClick = async () => {
      setAreAIsBattling(true);
      for(let i = 0; i < 4; i++) {
        const goodBattleResponse = await apiGetBattleGoodMessage(prompt, goodMessages, badMessages);
        dispatch(addGoodMessage(goodBattleResponse.response));
        await sleep(1000);
        const badBattleResponse = await apiGetBattleBadMessage(prompt, goodMessages, badMessages);
        dispatch(addBadMessage(badBattleResponse.response));
      }
      setAreAIsBattling(false);
    };

    return (
        <Container className="my-4 position-relative">
            {/* First good message */}
            <div className="mb-4">
                <h3>Current Prompt:</h3>
                <p>{prompt}</p>
            </div>
            <Row className="mb-3">
                <Col xs={12} md={4} className="d-flex justify-content-start">
                    {goodMessages.length > 0 && (
                        <div className="p-3 rounded-3 bg-warning text-dark">
                            {goodMessages[0]}
                        </div>
                    )}
                </Col>

                {/* Angel image, Battle button, and Devil image in the middle */}
                <Col xs={12} md={4} className="d-flex justify-content-center align-items-center">
                    {/* Angel image on the left */}
                    <img
                        src={AngelImage}
                        alt="Angel"
                        style={{
                            maxWidth: '100%', 
                            height: 'auto',  
                            maxHeight: '100px', 
                        }}
                    />

                    <Button
                    variant={areAIsBattling ? 'danger' : 'success'}
                    onClick={handleStartBattleClick}
                    className="mb-4"
                    disabled = {areAIsBattling ? true : false}
                >
                    {areAIsBattling ? 'Battling' : 'Start Battle'}
                    </Button>

                    {/* Devil image on the right */}
                    <img
                        src={DevilImage}
                        alt="Devil"
                        style={{
                            maxWidth: '100%', 
                            height: 'auto', 
                            maxHeight: '100px', 
                        }}
                    />
                </Col>

                {/* First bad message */}
                <Col xs={12} md={4} className="d-flex justify-content-end">
                    {badMessages.length > 0 && (
                        <div className="p-3 rounded-3 bg-danger text-white">
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
        </Container>
    );
}
