import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to store error messages
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Make a POST request to your login API
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to session storage
        sessionStorage.setItem('token', data.token);

        // Redirect to the admin page
        router.push('/admin');
      } else {
        // Display an error message
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div id="login-section" className={`d-flex align-items-center justify-content-center ${styles.loginWrapper}`}>
      <div className={`card ${styles.card}`}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <div className="form-group mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
