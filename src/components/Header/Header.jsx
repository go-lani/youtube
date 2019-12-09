import React from 'react';
import YoutubeLogo from './images/youtube-logo.png'
import './Header.css';

const Header = props => {
  return (
    <header id="header">
      <div className="header-inner">
        <h1 className="logo">
          <a href="/"><img src={YoutubeLogo} alt="youtube"/></a>
        </h1>
        {props.children}
      </div>
    </header>
  );
};

export default Header;