import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginUser } from '../../services/authn';
import { AuthContext } from '../../contexts/AuthContext';

interface User {
  username: string;
  email: string;
}

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext) ?? { login: (user: User) => {} };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
  
      login(user);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="form-container sign-in-container">
		<form onSubmit={handleLogin}>
			<h1>Sign in</h1>
			<div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div>
			<span>or use your account</span>
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
			<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
			<a href="#">Forgot your password?</a>
			<button type="submit">Sign In</button>
		</form>
	</div>
  );
};

export default Login;