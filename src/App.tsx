import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AuthContainer from './components/Authentication/AuthContainer';
import Recipes from './components/recipes_components/Recipes';
import Recipe from './components/recipes_components/Recipe';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/auth" element={<AuthContainer />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
