import React from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AuthContainer from './components/Authentication/AuthContainer';
import Recipes from './components/recipes_components/Recipes';
import Recipe from './components/recipes_components/Recipe';
import CreateRecipe from './components/recipes_components/CreateEditRecipe';
import Header from './components/Header';
import Footer from './components/Footer';
import UserDetails from './components/Authentication/UserDetails';
import SessionManager from './components/Authentication/SessionManager';
import './App.css';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <SessionManager />
      <Header />
      <Routes>
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="/recipes/add" element={<CreateRecipe />} />
        <Route path="/auth" element={<AuthContainer />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;

