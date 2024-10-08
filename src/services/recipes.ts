import { api } from './api';

export interface Recipe {
  id?: number;
  user_id?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: File;
  ingredients: {
    ingredient_name: string;
    amount: number;
    measure: string;
  }[];
  steps: {
    step_number: number;
    description: string;
    step_img?: File;
  }[];
}

export const getRecipes = () => {
  return api.get('/recipes/');
};

export const getRecipe = (id: number) => {
  return api.get(`/recipes/${id}/`);
};

export const getRecipeSteps = (recipe_id: number) => {
  return api.get(`/recipes/${recipe_id}/steps/`);
};

export const getRecipeIngredients = (recipe_id: number) => {
  return api.get(`/recipes/${recipe_id}/ingredients/`);
};

export const createRecipe = (data: FormData) => {
  return api.post('/recipes/', data);
};

export const updateRecipe = (id: number, data: FormData) => {
  return api.put(`/recipes/${id}/`, data);
};

export const deleteRecipe = (id: number | undefined) => {
  return api.delete(`/recipes/${id}/`);
};
