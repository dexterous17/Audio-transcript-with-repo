import React, { useState } from 'react';
import '../Css/SideBar.css';
import Cards from './Cards';

function SideBar({ onCardClick, onCreateNewRecording }) {
  const [search, setSearch] = useState('');

  return (
    <aside className="sidebar">
      <button className="sidebar-title-btn" title="Add New Recording" onClick={onCreateNewRecording}>
        <span className="sidebar-plus-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </span>
        <span>Create New Recording</span>
      </button>
      <div className="sidebar-header">
        <input
          type="text"
          className="sidebar-search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Cards search={search} onCardClick={onCardClick} />

      <ul>
        <li>Dashboard</li>
        {/* Future dynamic items go here */}
      </ul>
    </aside>
  );
}

export default SideBar;
