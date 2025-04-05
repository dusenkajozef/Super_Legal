import React from 'react';
import { ListGroup } from 'react-bootstrap';

const MessageBox = ({ title, messages }) => (
    <div>
        <h3>{title}</h3>
        <div className="border p-3 mb-3" style={{ minHeight: '200px', overflowY: 'auto' }}>
            <ListGroup>
                {messages.map((message, index) => (
                    <ListGroup.Item key={index}>{message}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    </div>
);

export default MessageBox;
