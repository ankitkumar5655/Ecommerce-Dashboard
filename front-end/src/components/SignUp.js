import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const auth = localStorage.getItem("user");
    
    if(auth)
    {
      navigate("/homepage");
    }
  })


  //Code for showing the other options if user has logged into the page 
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/home");
    }
  });

  //Code for getting the data from the user and send it to the DB
  const collectData = async () => {
    console.warn(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    //Code to print the data on the console which have been recieved from the user 
    result = await result.json();
    console.warn(result);

    //Code for saving the data of user into the local storage of the browser that allows the user to stay on the page after logged in to the Profile
    localStorage.setItem("user", JSON.stringify(result.result));
    localStorage.setItem("token", JSON.stringify(result.auth));
    navigate("/home");
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        className="inputBox"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />

      <input
        className="inputBox"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />

      <input
        className="inputBox"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />

      <button onClick={collectData} className="app-button" type="button">
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
