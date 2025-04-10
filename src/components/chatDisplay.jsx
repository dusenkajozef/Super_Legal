import { useSelector } from "react-redux";
import { Row, Col, Alert } from "react-bootstrap";
import { useEffect, useRef } from "react";

export default function ChatDisplay() {
  const goodMessages = useSelector((state) => state.goodMessages.messages);
  const badMessages = useSelector((state) => state.badMessages.messages);

  // Start from the second message
  const goodBattleMessagesSlice = goodMessages.slice(1);
  const badBattleMessagesSlice = badMessages.slice(1);
  const maxMessagesLength = Math.max(goodBattleMessagesSlice.length, badBattleMessagesSlice.length);
  const chatContainerRef = useRef(null);
  
  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
            top: chatContainerRef.current.scrollHeight,
            behavior: 'smooth',
          });
    }
  }, [goodMessages, badMessages]);

  return (
    <div 
      ref={chatContainerRef} 
      className="my-4 border border-secondary border-3 p-3 rounded" 
      style={{ height: '50vh', overflowY: 'auto' }}
    >
      {Array.from({ length: maxMessagesLength }).map((_, index) => {
        const goodMessage = goodBattleMessagesSlice[index];
        const badMessage = badBattleMessagesSlice[index];

        return (
          <div key={index}>
            {goodMessage && (
              <Row className="my-1">
                <Col xs={12} className="d-flex justify-content-start">
                  <Alert
                    variant="warning"
                    className="p-3 rounded-3 w-75 mt-2"
                  >
                    {goodMessage}
                  </Alert>
                </Col>
              </Row>
            )}

            {badMessage && (
              <Row className="my-1">
                <Col xs={12} className="d-flex justify-content-end text-end">
                  <Alert
                    variant="danger"
                    className="p-3 rounded-3 w-75 mt-2"
                  >
                    {badMessage}
                  </Alert>
                </Col>
              </Row>
            )}
          </div>
        );
      })}
    </div>
  );
}
