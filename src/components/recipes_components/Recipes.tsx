import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../../services/recipes';
import './recipes.css';

interface Recipe {
  id: number;
  user?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string;
}

const Recipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getRecipes();
        console.log(response);
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recent-recipes-container">
      {recipes ? (
        recipes.map((recipe) => (
          <Link key={recipe.id} to={`/recipes/${recipe.id}`}>
            <div className="recipe">
              <h2>{recipe.title}</h2>
              <p>Estimated Cooking Time: {recipe.prep_time} mins</p>
              <p>Difficulty: {recipe.diff_lvl}</p>
              {recipe.title_img && <img src={recipe.title_img} alt={recipe.title} />}
            </div>
          </Link>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Recipes;
