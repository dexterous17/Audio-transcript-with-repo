import React from 'react';
import '../Css/SideBar.css';

function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <input
          type="text"
          className="sidebar-search"
          placeholder="Search..."
        />
      </div>

      <ul>
        <li><a href="#dashboard">Dashboard</a></li>
        {/* Future dynamic items go here */}
      </ul>
    </aside>
  );
}

export default SideBar;
