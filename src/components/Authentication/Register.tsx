import React, { useState } from 'react';
import { register } from '../../services/authn';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    register(username, email, password1, password2).then(
      () => {
        setMessage("We have sent an email. Please check your inbox to verify your account.");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="register-form">
      <form onSubmit={handleRegister}>
        <label>Username</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />

        <button type="submit">Register</button>
      </form>

      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;