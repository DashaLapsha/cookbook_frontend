import { Route, Routes } from 'react-router-dom';
import AuthContainer from './components/Authentication/AuthContainer';
import Recipes from './components/recipes_components/Recipes';
import Recipe from './components/recipes_components/Recipe';
import CreateRecipe from './components/recipes_components/CreateRecipe';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import UserDetails from './components/Authentication/UserDetails';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/recipes/add" element={<CreateRecipe />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
