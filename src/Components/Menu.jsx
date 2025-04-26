import React from 'react';
import '../Css/Menu.css'; 

// Change this function name to whatever you like
function Menu() {
  return (
    <header className="header">
    <div className="logo">MyBrand</div>
    <nav className="nav">
      <ul className="nav-list">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </header>
  );
}

// Change the export name to match your function name
export default Menu;
