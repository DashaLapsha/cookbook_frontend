import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { createRecipe, updateRecipe } from '../../services/recipes';
import '../../css/create_edit_recipe.scss';

interface Ingredient {
  ingredient: string;
  amount: number;
  measure: string;
}

interface Step {
  step_number: number;
  description: string;
  step_img?: string | File;
}

interface RecipeData {
  user_id?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string | File;
  ingredients: Ingredient[];
  steps: Step[];
}

interface CreateRecipeProps {
  recipeData?: RecipeData;
  isEditMode?: boolean;
  recipeId?: number;
  onCancel?: () => void;
}

const CreateRecipe: React.FC<CreateRecipeProps> = ({ recipeData: initialRecipeData, isEditMode = false, recipeId, onCancel }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.session);

  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: '',
    prep_time: 0,
    diff_lvl: '',
    title_img: undefined,
    ingredients: [{ ingredient: '', amount: 0, measure: '' }],
    steps: [{ step_number: 1, description: '', step_img: undefined }],
  });

  useEffect(() => {
    if (initialRecipeData) {
      setRecipeData(initialRecipeData);
    }
  }, [initialRecipeData]);


  const handleInputChange = (field: keyof RecipeData, value: string | number | File | undefined) => {
    setRecipeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleIngredientNameChange = (index: number, value: string) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index].ingredient = value;
    setRecipeData((prevData) => ({ ...prevData, ingredients: newIngredients }));
  };

  const handleAmountChange = (index: number, value: number) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index].amount = value;
    setRecipeData((prevData) => ({ ...prevData, ingredients: newIngredients }));
  };

  const handleMeasureChange = (index: number, value: string) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index].measure = value;
    setRecipeData((prevData) => ({ ...prevData, ingredients: newIngredients }));
  };

  const handleStepDescriptionChange = (index: number, value: string) => {
    const newSteps = [...recipeData.steps];
    newSteps[index].description = value;
    setRecipeData((prevData) => ({ ...prevData, steps: newSteps }));
  };

  const handleStepImageChange = (index: number, file: File | undefined) => {
    const newSteps = [...recipeData.steps];
    newSteps[index].step_img = file;
    setRecipeData((prevData) => ({ ...prevData, steps: newSteps }));
  };

  const handleDifficultyChange = (difficulty: string) => {
    setRecipeData((prevData) => ({ ...prevData, diff_lvl: difficulty }));
  };

  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { ingredient: '', amount: 0, measure: '' }],
    }));
  };

  const addStep = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, { step_number: prevData.steps.length + 1, description: '', step_img: undefined }],
    }));
  };

  const handleImageClear = (field: keyof RecipeData | keyof Step, index?: number) => {
    if (index !== undefined) {
      const newSteps = [...recipeData.steps];
      newSteps[index].step_img = undefined;
      setRecipeData((prevData) => ({ ...prevData, steps: newSteps }));
    } else {
      setRecipeData((prevData) => ({ ...prevData, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!isAuthenticated || !user || !user.id) {
        throw new Error("User is not logged in or missing userId");
      }
      const formData = new FormData();

      formData.append('user', user.id.toString());
      formData.append('title', recipeData.title);
      formData.append('prep_time', recipeData.prep_time.toString());
      formData.append('diff_lvl', recipeData.diff_lvl);

      if (recipeData.title_img && typeof recipeData.title_img !== 'string') {
        formData.append('title_img', recipeData.title_img);
      }

      recipeData.ingredients.forEach((ingredient, index) => {
        formData.append(`ingredients[${index}]ingredient_name`, ingredient.ingredient);
        formData.append(`ingredients[${index}]amount`, ingredient.amount.toString());
        formData.append(`ingredients[${index}]measure`, ingredient.measure);
      });

      recipeData.steps.forEach((step, index) => {
        formData.append(`steps[${index}]step_number`, step.step_number.toString());
        formData.append(`steps[${index}]description`, step.description);
        if (step.step_img && typeof step.step_img !== 'string') {
          formData.append(`steps[${index}]step_img`, step.step_img);
        }
      });

      Array.from(formData.entries()).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });

      if (isEditMode && recipeId) {
        const response = await updateRecipe(recipeId, formData);
        console.log("Response from backend:", response);
      } else {
        const response = await createRecipe(formData);
        console.log("Response from backend:", response);
      }

      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  return (
    <div className="create-recipe-container">
      {isAuthenticated ? (
        <div style={{ width: '80%' }}>
          <h2>{isEditMode ? 'Update Recipe' : 'Create Recipe'}</h2>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>Title:</label>
            <input type="text" value={recipeData.title} onChange={(e) => handleInputChange('title', e.target.value)} />

            <label>Preparation Time (mins):</label>
            <input
              type="number"
              value={recipeData.prep_time}
              onChange={(e) => handleInputChange('prep_time', parseInt(e.target.value, 10))}
            />

            <label>Difficulty Level:</label>
            <div className="difficulty-container">
              <div
                className={`difficulty-card ${recipeData.diff_lvl === 'Easy' ? 'selected' : ''}`}
                onClick={() => handleDifficultyChange('Easy')}
              >
                Easy
              </div>
              <div
                className={`difficulty-card ${recipeData.diff_lvl === 'Intermediate' ? 'selected' : ''}`}
                onClick={() => handleDifficultyChange('Intermediate')}
              >
                Intermediate
              </div>
              <div
                className={`difficulty-card ${recipeData.diff_lvl === 'Difficult' ? 'selected' : ''}`}
                onClick={() => handleDifficultyChange('Difficult')}
              >
                Difficult
              </div>
            </div>

            <label htmlFor="title_img">Title Image:</label>
            {recipeData.title_img ? (
              <div className="image-preview">
                <img
                  src={typeof recipeData.title_img === 'string' ? recipeData.title_img : URL.createObjectURL(recipeData.title_img)}
                  alt="Title"
                />
                <button type="button" onClick={() => handleImageClear('title_img')}>Clear</button>
              </div>
            ) : (
              <div className="custom-file-upload">
                <input 
                  type="file"
                  id="title_img"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleInputChange('title_img', e.target.files[0]);
                    }
                  }}
                />
                <p>Drag your image here or click in this area.</p>
              </div>
            )}

            <h3>Ingredients:</h3>
            {recipeData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient">
                <div>
                  <label>Ingredient:</label>
                  <input
                    type="text"
                    value={ingredient.ingredient}
                    onChange={(e) => handleIngredientNameChange(index, e.target.value)}
                  />
                </div>

                <div>
                  <label>Amount:</label>
                  <input
                    type="number"
                    value={ingredient.amount}
                    onChange={(e) => handleAmountChange(index, parseInt(e.target.value, 10))}
                  />
                </div>

                <div>
                  <label>Measure:</label>
                  <input
                    type="text"
                    className="measure"
                    value={ingredient.measure}
                    onChange={(e) => handleMeasureChange(index, e.target.value)}
                  />
                </div>
              </div>
            ))}
            <button type="button" className="add-button" onClick={addIngredient}>
              Add Ingredient
            </button>

            <h3>Steps:</h3>
            {recipeData.steps.map((step, index) => (
              <div key={index} className="step">
                <label>Step {step.step_number}:</label>
                <textarea
                  value={step.description}
                  onChange={(e) => handleStepDescriptionChange(index, e.target.value)}
                />
                {step.step_img ? (
                  <div className="image-preview">
                    <img 
                    src={typeof step.step_img === 'string' ? step.step_img : URL.createObjectURL(step.step_img)}
                    alt={`Step ${step.step_number}`} 
                  />
                    <button type="button" onClick={() => handleImageClear('step_img', index)}>Clear</button>
                  </div>
                ) : (
                  <div className="custom-file-upload">
                    <input 
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleStepImageChange(index, e.target.files[0]);
                        }
                      }}
                    />
                    <p>Drag your image here or click in this area.</p>
                  </div>
                )}
              </div>
            ))}
            <button type="button" className="add-button" onClick={addStep}>
              Add Step
            </button>
            <div className="bottom-buttons">
              <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
              <button type="submit" className="submit-button">{isEditMode ? 'Update Recipe' : 'Create Recipe'}</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="login-prompt">
          <p>If you want to add a recipe, please <Link to="/auth">log in</Link>.</p>
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;
