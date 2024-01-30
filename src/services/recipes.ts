import { api } from './api';

interface Recipe {
  id?: number,
  user?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: string;
  ingredients: {
    ingredient: {
      ingredient_name: string;
    };
    amount: number;
    measure: string;
  }[];
  steps: {
    step_number: number;
    description: string;
    step_img?: string;
  }[];
}

export const getRecipes = () => {
  return api.get('/recipes/');
};

export const getRecipe = (id: number) => {
  return api.get(`/recipes/${id}/`);
};

export const createRecipe = (data: Recipe) => {
  return api.post('/recipes/', data);
};

export const updateRecipe = (id: number, data: Recipe) => {
  return api.put(`/recipes/${id}/`, data);
};

export const deleteRecipe = (id: number) => {
  return api.delete(`/recipes/${id}/`);
};

// export const getRecipeIngredients = (recipe_id: number) => {
//   return api.delete(`/recipes/${id}/`);
// };

// export const getRecipeSteps = (recipe_id: number) => {
//   return api.delete(`/recipes/${id}/`);
// };