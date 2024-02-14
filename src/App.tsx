import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AuthContainer from './components/Authentication/AuthContainer';
import Logout from './components/Authentication/Logout';
import Recipes from './components/recipes_components/Recipes';
import Recipe from './components/recipes_components/Recipe';
import CreateRecipe from './components/recipes_components/CreateRecipe';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/recipes/add" element={<CreateRecipe />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
