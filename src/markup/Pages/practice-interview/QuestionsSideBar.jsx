
import React from 'react';
import { ListGroup } from 'react-bootstrap';

export default function Sidebar({ questions, currentIndex }) {
  return (
    <ListGroup style={{maxHeight: 'calc(100vh)', overflowY: 'auto', scrollbarWidth:"none"}}>
      {questions.map((q, i) => (
        <ListGroup.Item
          key={i}
          active={i === currentIndex}
          style={{ cursor: 'pointer' }}
        >
          <strong>Q{i + 1}.</strong> {q.question}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
