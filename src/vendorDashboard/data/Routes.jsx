import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { API_URL } from './apiPath';

const Routes = () => {
    const [data, setData]=useState([]);
    useEffect(()=>{
        axios.post(`${API_URL}/vendor/register`).then(res=>{setData(res.data)}).catch(err=>{console.log(err)});
        console.log(alert("Login Sucess"))
    },[]);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Routes
