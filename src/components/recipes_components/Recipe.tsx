import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRecipe, getRecipeIngredients, getRecipeSteps, deleteRecipe } from '../../services/recipes';
import { getUserDetails } from '../../services/authn';
import { AuthContext } from '../../contexts/AuthContext';
import '../../css/recipes.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faStopwatch, faGauge } from '@fortawesome/free-solid-svg-icons';
import CreateRecipe from './CreateEditRecipe';

interface Ingredient {
  id?: number;
  ingredient: string;
  amount: number;
  measure: string;
}

interface Step {
  id?: number;
  step_number: number;
  description: string;
  step_img?: string | File;
}

interface RecipeData {
  id: number;
  user_id?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string | File;
  ingredients: Ingredient[];
  steps: Step[];
}

const Recipe: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext) || { isAuthenticated: false, user: null };
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id === undefined) {
        console.error('Recipe ID is undefined.');
        return;
      }

      try {
        const [recipeResponse, ingredientsResponse, stepsResponse] = await Promise.all([
          getRecipe(parseInt(id, 10)),
          getRecipeIngredients(parseInt(id, 10)),
          getRecipeSteps(parseInt(id, 10))
        ]);

        const recipeData = recipeResponse.data;

        if (recipeData.user_id) {
          const userResponse = await getUserDetails(recipeData.user_id);
          setUsername(userResponse.data.username);
        }

        setRecipe({
          ...recipeData,
          ingredients: ingredientsResponse.data,
          steps: stepsResponse.data,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Failed to fetch recipe data.');
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);  

  const handleDeleteRecipe = async () => {
    if (!id || !isAuthenticated || !user || !user.id) {
      return;
    }
  
    try {
      await deleteRecipe(recipe?.id);
      navigate('/recipes');
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!recipe) {
    return null;
  }

  return (
    <div>
      {/* EDIT MODE */}
      {editMode ? (
        <CreateRecipe 
          recipeData={recipe} 
          isEditMode={true} 
          recipeId={recipe.id} 
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div className="recipe-container">
          {/* RECIPE HEADER */}
          <div className="recipe-header">
            <div className="recipe-header-actions">
              {isAuthenticated && user && recipe.user_id === user.id && (
                <>
                  <button onClick={handleDeleteRecipe} className="delete-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <button onClick={() => setEditMode(true)} className="edit-button">
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                </>
              )}
            </div>
            <h1 className="recipe-title">{recipe.title}</h1>
            {username && (
              <p className="recipe-author">
                created by{' '}
                <Link to={`/users/${recipe.user_id}`} className="recipe-author-link">
                  {username}
                </Link>
              </p>
            )}
            <div className="recipe-title-image-container">
              {recipe.title_img && (
                <img
                  src={typeof recipe.title_img === 'string' ? recipe.title_img : (recipe.title_img instanceof File ? URL.createObjectURL(recipe.title_img) : '')}
                  alt={recipe.title}
                  className="recipe-title-image"
                />
              )}
            </div>
            <div className="recipe-info">
              <span className="recipe-time">
                <FontAwesomeIcon icon={faStopwatch} /> 
                {recipe.prep_time} mins
              </span>
              <span className="recipe-diff">
                <FontAwesomeIcon icon={faGauge} /> 
                {recipe.diff_lvl}
              </span>
            </div>
          </div>
          <div className="recipe-details">
            <div className="recipe-content">
              {/* INGREDIENTS */}
              <div className="ingredient-section">
                <h2 className="ingredient-header">Ingredients</h2>
                <div className="ingredient-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                      <span className="ingredient-name">{ingredient.ingredient}</span>
                      <span className="ingredient-amount">{ingredient.amount} {ingredient.measure}</span>
                    </div>
                  ))}
                </div>
              </div>
  
              {/* STEPS */}
              <div className='step-section'>
                <h2 className="step-header">Steps</h2>
                <ol className="step-list">
                  {recipe.steps.map((step, index) => (
                    <li key={index} className="step-item">
                      <div className="step-content">
                        <div className="step-description">
                          <h3>Step {index + 1}</h3>
                          <p>{step.description}</p>
                        </div>
                        {step.step_img && (
                          <div className="step-image-container">
                            <img
                              src={typeof step.step_img === 'string' ? step.step_img : (step.step_img instanceof File ? URL.createObjectURL(step.step_img) : '')}
                              alt={`Step ${step.step_number}`}
                              className="step-image"
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}  

export default Recipe;
