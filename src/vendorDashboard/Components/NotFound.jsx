import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="errorSection">
        <h1>404 This is Wrong Path </h1>
        <h5>Please use this page Properly</h5>
        <h5> kindly Sign or Login 😊...</h5>
      </div>
      <div className="errBtn">
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
