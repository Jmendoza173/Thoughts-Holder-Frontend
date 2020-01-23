import React from 'react';

const Header = (props) => {
  return (
    <div className="nav-bar">
      <ul id="header">
        <li className="nav-item"><h2>{props.message}</h2></li>
      </ul>
      {props.message === "Welcome to Thoughts Holder" ? null : <button onClick={props.handleLogOut} id="getOut">Log Out</button>}
    </div>
  );
}

export default Header;
