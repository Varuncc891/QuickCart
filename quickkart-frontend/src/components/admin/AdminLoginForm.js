import React from 'react';

export const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  error,
  onSubmit
}) => (
  <div className="insidebox">
    <h2 className="login">ADMIN LOGIN</h2>
    {error && <div className="error-message">{error}</div>}
    <form onSubmit={onSubmit}>
      <div className="boxone">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />
      </div>
      <div className="boxone">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="boxone">
        <button type="submit" className="login-button">
          Login
        </button>
      </div>
    </form>
  </div>
);