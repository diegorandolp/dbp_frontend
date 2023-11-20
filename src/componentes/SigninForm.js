// SigninForm.js
import React, { useState } from 'react';

const SigninForm = ({ onSignin, onGoToSignup }) => {
  const [signinData, setSigninData] = useState({
    username: '',
    password: '',
  });

  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.id]: e.target.value });
  };

  const signin = () => {
    const apiUrl = "http://localhost:8080/api/auth";

    const data = {
      username: signinData.username,
      password: signinData.password,
    };

    fetch(apiUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log("Inicio de sesión exitoso. Token:", response.token);
        onSignin(); 
        const token = response.token;
        localStorage.setItem('token', token);
      })
      .catch(error => {
        if (error.message) {
          console.error("Error:", error.message);
        } else {
          console.error("Error desconocido");
        }
      });
  };

  return (
    <div style={{ margin: '0 auto', width: '300px', textAlign: 'center', padding: '20px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: '#f5f5f5' }}>
  <h3 style={{ color: '#5d5dff' }}>Sign In</h3>
  <form id="signin">
    <label htmlFor="signin-username" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
      Username:
    </label>
    <input
      type="text"
      id="username"
      onChange={handleSigninChange}
      value={signinData.username}
      required
      style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}
    />
    <label htmlFor="signin-password" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
      Password:
    </label>
    <input
      type="password"
      id="password"
      onChange={handleSigninChange}
      value={signinData.password}
      required
      style={{ width: '100%', padding: '10px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px'}}
    />
    <button
      type="button"
      onClick={signin}
      style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#5d5dff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Sign In
    </button>
    <button
      type="button"
      onClick={onGoToSignup}
      style={{ padding: '10px 20px', backgroundColor: '#ff5d5d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
    >
      Sign Up
    </button>
  </form>
</div>
  );
};

export default SigninForm;
