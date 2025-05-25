import { createFileRoute } from "@tanstack/react-router";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import RecipeLazyCard from "../components/RecipeLazyCard";
import { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  servings: string;
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const API_KEY = "WDdsGQAk1N5Sr52RM7H0uw==aEm11stJM79Vha2e";
  const API_KEY_2 = "048c790e4f5e4b56bd8c6d9b0bb1d091";
  const { recipes, setRecipes } = useRecipes();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("recipe"); // domyślne zapytanie
  const [filters, setFilters] = useState([]);
  let [cuisine, setCuisine] = useState("");

  const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_2}&number=100&offset=0`;

  const cuisines = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern US",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setFilters((prevFilters) => [...prevFilters, value]);
    } else {
      setFilters((prevFilters) =>
        prevFilters.filter((filter) => filter !== value)
      );
    }
  };

  const searchQueryFunction = (event) => {
    setSearchQuery(event.target.value);
    if (searchQuery) {
      setUsedURL(URL + `&query=${searchQuery}`);
    } else {
      setUsedURL(URL);
    }
  };

  const isLastComa = () => {
    if (cuisine[cuisine.length - 1] === ",") {
      setCuisine(cuisine.slice(0, -1));
    }
  };

  const handleCusineChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCuisine((prevCuisine) => prevCuisine + value + ",");
    } else {
      setCuisine((prevCusine) => prevCusine.replace(value + ",", ""));
    }
  };

  // 🔁 Fetchuj dane przy każdej zmianie `searchQuery`
  useEffect(() => {
    setLoading(true);

    let cuisineStr = cuisine.endsWith(",") ? cuisine.slice(0, -1) : cuisine;
    let url = `${URL}&query=${searchQuery}`;
    if (cuisineStr) {
      url += `&cuisine=${cuisineStr}`;
    }
    if (searchQuery.trim() !== "") {
      url += `&query=${searchQuery}`;
    }

    axios
      .get(url)
      .then((response) => {
        setRecipes(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd API:", error);
        setLoading(false);
      });
  }, [searchQuery, cuisine, setRecipes]);

  return (
    <main className="container mx-auto p-4 flex flex-col items-center bg-green-100">
      <h2 className="text-4xl uppercase font-bold">Home Page</h2>

      <input
        type="text"
        placeholder="Search for recipes"
        onChange={(event) => searchQueryFunction(event)}
        className="text-center mt-6 border-1 rounded-full w-72 h-8 md:w-100 md:h-10"
      />

      <div className="flex flex-wrap gap-5 justify-center items-center mt-6 bg-green-100 p-10 rounded-full">
        {cuisines.map((cuisine) => (
          <div className="h-8 flex items-center">
            <input
              type="checkbox"
              value={cuisine}
              name="cuisine"
              onChange={handleCusineChange}
              className="mr-2 w-6 h-6"
            ></input>
            <label>{cuisine} Cuisine</label>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap md:gap-x-20 md:gap-y-6 md:justify-center items-center mt-12">
        {loading ? (
          <div>Loading...</div>
        ) : recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <RecipeLazyCard
              key={`${recipe.title}-${index}`}
              title={recipe.title}
              image={recipe.image}
              extendedIngredients={recipe.extendedIngredients}
            />
            // <RecipeCard
            //   key={`${recipe.title}-${index}`}
            //   title={recipe.title}
            //   image={recipe.image}
            // ></RecipeCard>
          ))
        ) : (
          <p className="text-gray-500">Brak wyników.</p>
        )}
      </div>
    </main>
  );
}
