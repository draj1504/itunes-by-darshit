import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header" onClick={() => window.scroll(0, 0)}>
      <span>
        <img
          src="https://cdn1.iconfinder.com/data/icons/smallicons-logotypes/32/apple-512.png"
          alt="apple-logo"
          className="appleLogo"
        />
      </span>
      <p className="headername">iTunes</p>
    </div>
  );
};

export default Header;
