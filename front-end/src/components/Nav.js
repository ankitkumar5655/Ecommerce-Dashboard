import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo-infinite-mart.png";

const Nav = () => {
  //Code for Logout the page
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div> 
      <img alt="infinite-mart-logo" className="logo" src= {logo} />
      {auth ? <ul className="nav-ul">
          <li><Link to="/show-products">Homepage</Link></li>
          <li><Link to="/add">Add Product</Link></li>
          <li><Link to="/update">Update Product</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
        </ul>
          : 
        <ul className="nav-ul nav-right">
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/login">Log in</Link></li>
        </ul>
      }
    </div>
  );
};

export default Nav;
