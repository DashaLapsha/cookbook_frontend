import { api } from './api';
import axios from "axios";

export interface Recipe {
  id?: number,
  user?: number;
  title: string;
  prep_time: number;
  diff_lvl: string;
  title_img?: File;
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
    step_img?: File;
  }[];
}

export const getRecipes = () => {
  return api.get('/recipes/');
};

export const getRecipe = (id: number) => {
  return api.get(`/recipes/${id}/`);
};

export const createRecipe = (data: Recipe, userId: number) => {
  return api.post('/recipes/', {
    data,
    user_id: userId,
  });
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