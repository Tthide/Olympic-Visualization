import React from 'react';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h1 className="header-title text-center ">Olympic Games Medal Visualization</h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
