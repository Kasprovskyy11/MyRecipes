// src/context/RecipeContext.ts
import { createContext, useContext } from "react";

export const RecipeContext = createContext<{
  recipes: any[];
  setRecipes: (recipes: any[]) => void;
}>({
  recipes: [],
  setRecipes: () => {},
});

export const useRecipes = () => useContext(RecipeContext);
