import React from 'react';

const cards = [
  { id: 1, title: 'Meeting Notes', description: 'Notes from the weekly meeting.' },
  { id: 2, title: 'Project Plan', description: 'Outline of the new project.' },
  { id: 3, title: 'Ideas', description: 'Brainstorming session notes.' },
  { id: 4, title: 'Personal Memo', description: 'Quick personal reminder.' },
];

function Cards({ search, onCardClick }) {
  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase()) ||
    card.description.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredCards.length === 0) {
    return <div className="sidebar-no-results">No cards found.</div>;
  }

  return (
    <div className="sidebar-cards">
      {filteredCards.map(card => (
        <div
          className="sidebar-card"
          key={card.id}
          style={{ cursor: 'pointer' }}
          onClick={() => onCardClick && onCardClick(card)}
          aria-label={`Card: ${card.title}`}
        >
          <div className="sidebar-card-title">{card.title}</div>
          <div className="sidebar-card-desc">{card.description}</div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
