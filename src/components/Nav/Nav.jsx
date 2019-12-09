import React from 'react';
import YoutubeLogo from './images/youtube-logo.png'
import './Nav.css';

const Nav = props => {
  return (
    <nav id="navigation">
      <h1>
        <a href="/"><img src={YoutubeLogo} alt="youtube"/></a>
      </h1>
      {props.children}
    </nav>
  );
};

export default Nav;