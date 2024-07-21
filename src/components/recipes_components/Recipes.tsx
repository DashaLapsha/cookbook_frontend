import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../../services/recipes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../css/recipes.scss';
import placeholderImage from '../../assets/basic-title-image.png';

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
              <p>
                <FontAwesomeIcon icon={faClock} /> {recipe.prep_time} mins
              </p>
              <p>
                <FontAwesomeIcon icon={faTachometerAlt} /> {recipe.diff_lvl}
              </p>
              <div className="recipe-image-container">
                <img
                  src={recipe.title_img || placeholderImage}
                  alt={recipe.title || 'Default Recipe Image'}
                />
              </div>
            </div>
          </Link>
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


