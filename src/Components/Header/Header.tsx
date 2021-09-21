import React from 'react'; 
import './Header.css';

function Header() {
  return (
    <div className="header">
      <div className="header-icons">
        <i className="fas fa-th fa-lg headicon"></i>
      </div>
      <div className="heading">
        To Do
      </div>
      <div className="search-box">
        <i className="fas fa-search lefthead-icon"></i>
      </div>
      <div className="left-icon">
        <i className="fas fa-cog headicon"></i>
      </div>
      <div className="left-icons">
        <i className="fas fa-question headicon"></i>
      </div>
      <div className="left-icons">
        <i className="fas fa-external-link-alt headicon"></i>
      </div>
      <div className="left-icons">
        <i className="far fa-user-circle fa-2x headicon"></i>
      </div>
    </div> 
  );
}

export default Header;
