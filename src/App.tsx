import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AuthContainer from './components/Authentication/AuthContainer';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthContainer />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

