import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const MessageBox = ({ title, messages }) => (
    <div>
        <h3>{title}</h3>
        <div className="border p-3 mb-3" style={{ minHeight: '200px', overflowY: 'auto' }}>
            <ListGroup>
                {messages.map((message, index) => (
                    <ListGroup.Item key={index}>
                        <ReactMarkdown>{message}</ReactMarkdown>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    </div>
);

export default MessageBox;