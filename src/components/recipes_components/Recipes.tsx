import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../services/recipes';
import RecipeCard from '../recipes_components/RecipeCard';
import '../../css/recipes.scss';

interface Recipe {
  id: number;
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
      {recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      ) : (
        <div className="loading-container">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default Recipes;


