import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Recipes/Home';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Logout from './components/Authentication/Logout';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

