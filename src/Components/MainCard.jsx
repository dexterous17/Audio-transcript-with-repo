import React from 'react';
import '../Css/Main.css';

function MainCard({ title, desc, children }) {
  return (
    <div className="main-card">
      {title && <div className="main-card-title">{title}</div>}
      {desc && <div className="main-card-desc">{desc}</div>}
      {children}
    </div>
  );
}

export default MainCard; 