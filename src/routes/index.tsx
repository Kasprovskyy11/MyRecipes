import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import RecipeLazyCard from "../components/RecipeLazyCard";
import { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const API_KEY = "fe1bb062215e4582aaf7cd41214828b3";
  const { recipes, setRecipes } = useRecipes();
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("recipe"); // domyślne zapytanie
  let [cuisineState, setCuisine] = useState([""]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&offset=0`;

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

  const searchQueryFunction = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCusineChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setCuisine((prevCuisine) => [...prevCuisine, value]);
    } else {
      setCuisine((prevCusine) => prevCusine.filter((c) => c !== value));
    }
  };

  const checkService = (cuisine) => {
    if (cuisineState.includes(cuisine)) {
      return true;
    } else {
      return false;
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 🔁 Fetchuj dane przy każdej zmianie `searchQuery`
  useEffect(() => {
    setLoading(true);

    let cuisineStr = cuisineState.filter(Boolean).join(",");
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
  }, [searchQuery, cuisineState, setRecipes]);

  return (
    <main className="container mx-auto p-4 flex flex-col items-center bg-green-100">
      <h2 className="text-4xl uppercase font-bold">Home Page</h2>

      <input
        type="text"
        placeholder="Search for recipes"
        onChange={(event) => searchQueryFunction(event)}
        className="text-center mt-6 border-1 rounded-full w-72 h-8 md:w-100 md:h-10 shadow-sm shadow-slate-600"
      />

      <button
        onClick={toggleMenu}
        className="cursor-pointer py-4 px-6 mt-10 rounded-full shadow-sm shadow-slate-400 text-white font-bold bg-green-400"
      >
        Show Cuisines
      </button>

      {isMenuOpen ? (
        <div className="flex flex-wrap gap-4 justify-center items-center mt-6 bg-green-100 p-10 rounded-xl">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine}
              className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-sm"
            >
              <input
                type="checkbox"
                value={cuisine}
                name="cuisine"
                onChange={handleCusineChange}
                className="w-5 h-5"
                checked={checkService(cuisine) ? true : false}
              />
              <label className="text-gray-800 whitespace-nowrap">
                {cuisine} Cuisine
              </label>
            </div>
          ))}
        </div>
      ) : null}

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
