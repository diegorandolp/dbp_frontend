// SignupForm.js
import React, { useState } from 'react';

const SignupForm = ({ onSignupClose }) => {
  const [signupData, setSignupData] = useState({
    username: '',
    email: '',
    name: '',
    lastname: '',
    points: '',
    password: '',
    isAdmin: '',
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  const signup = () => {
    const apiUrl = "http://localhost:8080/api/auth/signup";

    const data = {
      username: signupData.username,
      email: signupData.email,
      name: signupData.name,
      lastname: signupData.lastname,
      points: signupData.points,
      password: signupData.password,
      isAdmin: signupData.isAdmin,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        console.log("Registro exitoso. Token:", response.token);
        onSignupClose();
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
    <h3 style={{ color: '#5d5dff' }}>Sign Up</h3>
    <form id="signup">
      <label htmlFor="signup-username" style={{ display: 'block', marginBottom: '5px', color: '#333' }}>
        Username:
      </label>
      <input
        type="text"
        id="username"
        onChange={handleSignupChange}
        value={signupData.username}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}
      />
        <label htmlFor="signup-email">Email:</label>

        <input
          type="email"
          id="email"
          onChange={handleSignupChange}
          value={signupData.email}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <label htmlFor="signup-name">Name:</label>
        <input
          type="text"
          id="name"
          onChange={handleSignupChange}
          value={signupData.name}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <label htmlFor="signup-lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          onChange={handleSignupChange}
          value={signupData.lastname}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <label htmlFor="points">Points:</label>
        <input
          type="text"
          id="points"
          onChange={handleSignupChange}
          value={signupData.points}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <label htmlFor="signup-password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={handleSignupChange}
          value={signupData.password}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <label htmlFor="signup-isAdmin">isAdmin:</label>
        <input
          type="text"
          id="isAdmin"
          onChange={handleSignupChange}
          value={signupData.isAdmin}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px'}}

        />
        <button
        type="button"
        onClick={signup}
        style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#5d5dff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Sign Up
      </button>
      <button
        type="button"
        onClick={onSignupClose}
        style={{ padding: '10px 20px', backgroundColor: '#ff5d5d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Go Back
    </button>
  </form>
</div>
  );
};

export default SignupForm;
