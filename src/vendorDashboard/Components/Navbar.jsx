import React from "react";
import { Link } from "react-router-dom";

const Navbar = (logoutHandle) => {
  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand link">Vendor Dash-Board</Link>
          <form className="d-flex" role="search">
            <button className="btn btn-outline-success login" type="submit">
              <Link to="/login" className="link">Login</Link>
            </button>
            <button className="btn btn-primary" type="submit">
              <Link to="/Register" className="link"> SignIn</Link>
            </button>
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
