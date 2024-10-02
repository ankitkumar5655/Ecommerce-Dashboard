import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


const Login = ()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async ()=>{
        console.warn(email,password);
        let result = await fetch("http://localhost:5000/login", {
            method : "post",
            body: JSON.stringify({email, password}),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        result = await result.json();
        console.warn(result);
        if(result.auth){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));

            navigate("/homepage");
        }else{
            alert("Please Enter Correct Details");
        }
    }

    return(
        <div className="login">
            <h1>Login</h1>
            <input type="text" className="inputBox" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <input type="text" className="inputBox" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} value={password} />
            <button onClick={handleLogin} className="app-button" type="button">Login</button>
        </div>
    )
}

export default Login;