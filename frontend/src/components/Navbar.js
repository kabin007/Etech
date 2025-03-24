import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">ETech Store</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-light" type="submit"><FaSearch /></button>
          </form>
          <Link className="btn btn-outline-light ms-2" to="/cart">
            <FaShoppingCart /> Cart
          </Link>
          <Link className="btn btn-outline-light ms-2" to="/login">
            <FaUser /> Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
