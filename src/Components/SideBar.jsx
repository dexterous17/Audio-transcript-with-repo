import React from 'react';
import '../Css/SideBar.css'
// Change this function name to whatever you like
function SideBar() {
  return (
    <aside className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </aside>
  );
}

// Change the export name to match your function name
export default SideBar;
