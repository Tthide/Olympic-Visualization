import React from 'react';
import '../styles/Header.css';
import OlympicLogo from '../assets/Olympic_Logo.png';

function Header() {
  return (
    <header className="header">
      <div className="container-fluid">
        <div class="row">
        <div class="col-md-2"></div>
          <div class="col-xs-4">

            <h1 className="header-title fs-1 text-center">Olympic Games Medal Visualization</h1>

            <img src={OlympicLogo} className="img-responsive" alt="Olympic flag" />
          </div>
          <div class="col-md-2"></div>
        </div>

      </div>
    </header>
  );
}

export default Header;
