import React , { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className ="formContainer">
        <div className = "formWrapper">
        <span className="logo">Hope Buddy</span>
        <span className="title">Log In</span>
            <form onSubmit={handleSubmit}>
                
                <input type="email"placeholder="Email"></input>
                <input type="password"placeholder="Password"></input>
                <button>Login</button>

                {err && <span>Something went wrong</span>}
            </form>
            <p> Don't have an account ? <a href="/register">Register Here </a>  </p>
<p> Forgot Password? <Link to="/resetpassword"><b>Click Here!</b></Link></p>

        </div>
    </div>
  )
}

export default Login;
