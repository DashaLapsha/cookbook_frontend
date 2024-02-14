import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/recipes';

interface Ingredient {
  ingredient: {
    ingredient_name: string;
  };
  amount: number;
  measure: string;
}

interface Step {
  step_number: number;
  description: string;
  step_img?: File;
}

interface RecipeData {
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: File;
  ingredients: Ingredient[];
  steps: Step[];
}

const CreateRecipe: React.FC = () => {
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState<RecipeData>({
    title: '',
    prep_time: 0,
    diff_lvl: '',
    title_img: undefined,
    ingredients: [{ ingredient: { ingredient_name: '' }, amount: 0, measure: '' }],
    steps: [{ step_number: 1, description: '', step_img: undefined }],
  });

  const handleInputChange = (field: keyof RecipeData, value: string | number | File | undefined) => {
    setRecipeData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleIngredientNameChange = (index: number, value: string) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index].ingredient.ingredient_name = value;
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
    if (file) {
      const newSteps = [...recipeData.steps];
      newSteps[index].step_img = file;
      setRecipeData((prevData) => ({ ...prevData, steps: newSteps }));
    }
  };
  

  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { ingredient: { ingredient_name: '' }, amount: 0, measure: '' }],
    }));
  };

  const addStep = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, { step_number: prevData.steps.length + 1, description: '', step_img: undefined }],
    }));
  };

  const handleSubmit = async () => {
    try {
      const userDataString = localStorage.getItem('user');
      if (!userDataString) {
        throw new Error("User data not found in localStorage");
      }
      const user = JSON.parse(userDataString);
      if (!user || !user.userId) {
        throw new Error("User is not logged in or missing userId");
      }
      console.log("Sending data to backend:", recipeData); 
      await createRecipe(recipeData, user.userId); // Pass userId to createRecipe
      navigate('/recipes');
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };
  
  

  return (
    <div>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={recipeData.title} onChange={(e) => handleInputChange('title', e.target.value)} />

        <label>Preparation Time (mins):</label>
        <input
          type="number"
          value={recipeData.prep_time}
          onChange={(e) => handleInputChange('prep_time', parseInt(e.target.value, 10))}
        />

        <label>Difficulty Level:</label>
        <input
          type="text"
          value={recipeData.diff_lvl}
          onChange={(e) => handleInputChange('diff_lvl', e.target.value)}
        />

        <label>Title Image:</label>
        <input
          type="file"
          onChange={(e) => handleInputChange('title_img', e.target.files?.[0])}
        />

        <h3>Ingredients:</h3>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>Ingredient:</label>
            <input
              type="text"
              value={ingredient.ingredient.ingredient_name}
              onChange={(e) => handleIngredientNameChange(index, e.target.value)}
            />

            <label>Amount:</label>
            <input
              type="number"
              value={ingredient.amount}
              onChange={(e) => handleAmountChange(index, parseInt(e.target.value, 10))}
            />

            <label>Measure:</label>
            <input
              type="text"
              value={ingredient.measure}
              onChange={(e) => handleMeasureChange(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <h3>Steps:</h3>
        {recipeData.steps.map((step, index) => (
          <div key={index}>
            <label>Step {step.step_number}:</label>
            <textarea
              value={step.description}
              onChange={(e) => handleStepDescriptionChange(index, e.target.value)}
            />
            <input
              type="file"
              onChange={(e) => handleStepImageChange(index, e.target.files?.[0])}
            />
          </div>
        ))}
        <button type="button" onClick={addStep}>
          Add Step
        </button>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
