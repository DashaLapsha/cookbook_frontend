import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipe } from '../../services/recipes';
import './recipes.css';

interface RecipeData {
  id: number;
  user: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string;
}

const Recipe: React.FC = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const [recipe, setRecipe] = useState<RecipeData | null>(null);
  
    useEffect(() => {
      const fetchRecipe = async () => {
        if (id === undefined) {
          console.error('Recipe ID is undefined.');
          return;
        }
  
        try {
          const response = await getRecipe(parseInt(id, 10));
          setRecipe(response.data);
        } catch (error) {
          console.error('Error fetching recipe:', error);
        }
      };
  
      fetchRecipe();
    }, [id]);
  

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h1 className="recipe-title">{recipe.title}</h1>
      <p>Estimated Cooking Time: {recipe.prep_time} mins</p>
      <p>Difficulty: {recipe.diff_lvl}</p>
      {recipe.title_img && <img src={recipe.title_img} alt={recipe.title} />}
    </div>
  );
};

export default Recipe;