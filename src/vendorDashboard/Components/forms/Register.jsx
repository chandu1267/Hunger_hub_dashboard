import React from "react";
import { useState } from "react";
import { API_URL } from "../../data/apiPath";

const Register = () => {

  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const[error,setError]= useState("")
  const[loading,setLoading]=useState(true)

  const handleSubmit = async (e)=>{
  e.preventDefault()
  try{
    const response = await fetch(`${API_URL}/vendor/register`,{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({username,email,password})
    });
    const data = response.json();
    if(response.ok){
      console.log(data)
      alert("Data insert in Vendor");
    }
  }catch(err){
    console.log("Registeration is Failed....",err)
    alert("Registeration is failed");
  }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div class="mb-3 margin_left">
          <label for="exampleInputusername" class="form-label">
            User Name
          </label>
          <input
            type="text"
            class="form-control"
            id="exampleInputusername"
            aria-describedby="emailHelp"
            placeholder="Dharavthu Chandu"
            name="username"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
          />
        </div>
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
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
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
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit" class="btn btn-primary margin_left">
          Submit
        </button>
      </form>
    </>
  );
};

export default Register;
