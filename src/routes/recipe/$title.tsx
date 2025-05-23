import { createFileRoute } from "@tanstack/react-router";
import { useRecipes } from "../../context/RecipeContext";
import axios from "axios";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/recipe/$title")({
  component: RecipeDetails,
});

function RecipeDetails() {
  const [details, setDetails] = useState(null);
  const { title } = Route.useParams();
  const { recipes } = useRecipes();

  const recipe = recipes.find(
    (r) => r.title.toLowerCase().trim() === title.toLowerCase().trim()
  );

  const API_KEY_2 = "048c790e4f5e4b56bd8c6d9b0bb1d091";

  useEffect(() => {
    if (recipe?.id) {
      axios
        .get(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY_2}`
        )
        .then((response) => {
          setDetails(response.data);
        });
    }
  }, [recipe]);

  if (!recipe) {
    return <div>Nie znaleziono przepisu o tytule "{title}"</div>;
  }

  if (!details) {
    return <div>Ładowanie szczegółów przepisu...</div>;
  }

  return (
    <div className="flex flex-col items-center container mx-auto p-4">
      <h3 className="text-3xl text-center">{details.title}</h3>
      <img src={details.image} className="w-72 mt-6 rounded-3xl" />
      <h4 className="my-4 text-2xl">Ingredients for 1 portion</h4>
      <ul className="list-disc list-inside px-10">
        {details.extendedIngredients?.map((ingredient, index) => (
          <li key={ingredient.id || index}>{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
}
