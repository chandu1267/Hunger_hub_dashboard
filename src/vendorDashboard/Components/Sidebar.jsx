import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sideSection">
      <ul>
        <li><Link to="/addfirm" className="link"> Add firm </Link></li>
        <li><Link to="/addproduct" className="link">Add Product</Link></li>
        <li><Link to="/allproducts" className="link">All Product</Link></li>
        {/* <li><Link to="/">User Detais</Link></li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
