import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../css/recipes.scss';
import placeholderImage from '../../assets/basic-title-image.png';

interface Recipe {
  id: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => {
  return (
    <Link to={`/recipes/${recipe.id}`} className="recipe-link">
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
  );
};

export default RecipeCard;
