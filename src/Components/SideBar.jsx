import React, { useState } from 'react';
import '../Css/SideBar.css';
import Cards from './Cards';

function SideBar() {
  const [search, setSearch] = useState('');

  return (
    <aside className="sidebar">
      Create New Recording
      <div className="sidebar-header">
        <input
          type="text"
          className="sidebar-search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Cards search={search} />

      <ul>
        <li>Dashboard</li>
        {/* Future dynamic items go here */}
      </ul>
    </aside>
  );
}

export default SideBar;
