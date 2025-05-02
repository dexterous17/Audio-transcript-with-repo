import React, { useState } from 'react';
import Modal from './Modal';

const cards = [
  { id: 1, title: 'Meeting Notes', description: 'Notes from the weekly meeting.' },
  { id: 2, title: 'Project Plan', description: 'Outline of the new project.' },
  { id: 3, title: 'Ideas', description: 'Brainstorming session notes.' },
  { id: 4, title: 'Personal Memo', description: 'Quick personal reminder.' },
];

function Cards({ search }) {
  const [openCard, setOpenCard] = useState(null);

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.description.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCards.length === 0) {
    return <div className="sidebar-no-results">No cards found.</div>;
  }

  return (
    <>
      <div className="sidebar-cards">
        {filteredCards.map(card => (
          <div
            className="sidebar-card"
            key={card.id}
            onClick={() => setOpenCard(card)}
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label={`Open ${card.title}`}
          >
            <div className="sidebar-card-title">{card.title}</div>
            <div className="sidebar-card-desc">{card.description}</div>
          </div>
        ))}
      </div>
      <Modal open={!!openCard} onClose={() => setOpenCard(null)}>
        {openCard && (
          <div style={{ padding: '16px 8px' }}>
            <h2 style={{ marginTop: 0 }}>{openCard.title}</h2>
            <p>{openCard.description}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Cards;
