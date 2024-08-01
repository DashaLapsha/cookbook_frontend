import React, { useContext, useEffect } from 'react';
import Register from './Register';
import Login from './Login';
import '../../css/authentication.scss';
import { AuthContext } from '../../contexts/AuthContext';

const AuthContainer = () => {
  const { isAuthenticated } = useContext(AuthContext) ?? { isAuthenticated: false };

  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      const handleSignUpClick = () => {
        container.classList.add('right-panel-active');
      };

      const handleSignInClick = () => {
        container.classList.remove('right-panel-active');
      };

      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);

      return () => {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      };
    }
  }, []);

  return (
    <div className="container" id="container">
      {isAuthenticated ? (
        <p>User is already logged in.</p>
      ) : (
        <>
          <Register />
          <Login />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back, Pumpkin Pie!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button className="ghost" id="signIn">
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Cupcake!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button className="ghost" id="signUp">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthContainer;