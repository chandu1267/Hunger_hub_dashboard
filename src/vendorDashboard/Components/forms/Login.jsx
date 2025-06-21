import React, { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Login Success now go to FIRM");
        setEmail("");
        setPassword("");
        localStorage.setItem("loginToken", data.token);
      }
      const vendorId = data.vendorId;
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      const vendorData = await vendorResponse.json();
      console.log("checking for vendorId",vendorId);
      if (vendorResponse.ok) {
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName = vendorData.vendor.firm[0].firmName
        console.log("my firm name is",vendorFirmName);
        // console.log("checking for firm Id", vendorFirmId);
        localStorage.setItem('firmId',vendorFirmId)
        localStorage.setItem('firmName',vendorFirmName)
        // window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <form onSubmit={handlelogin}>
        <div class="mb-3 margin_left">
          <label for="exampleInputEmail1" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="biriyani@gmail.com"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3 margin_left">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div class="mb-3 form-check margin_left">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" class="btn btn-primary margin_left">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
