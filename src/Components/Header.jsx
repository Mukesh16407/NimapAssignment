import { React } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
export const Header = () => {
  return (
    <div className="header">
      <div className="logo">MovieDb</div>
      <div className="right">
        <div className="links">
          <NavLink to="/">PoPular</NavLink>
          <NavLink to="/topRated">TopRated</NavLink>
          <NavLink to="/upcoming">UpComing</NavLink>
          <NavLink to="/search">Searching</NavLink>
        </div>
        <div className="search">
          <input
            placeholder="search"
            style={{
              width: "200px",
              height: "40px",
              border: "none",
              marginRight: "0.2rem",
              fontSize: "1rem"
            }}
          />
          <button
            style={{
              height: "44px",
              width: "70px",
              backgroundColor: "gray",
              color: "white",
              border: "none"
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};
