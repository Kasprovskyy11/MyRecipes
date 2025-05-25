import "../index.css";
import { Link } from "@tanstack/react-router";
interface recipe {
  title: string;
  image: string;
  extendedIngredients: [{}];
}

function RecipeCard({ title, image, extendedIngredients }: recipe) {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-green-200 via-green-300 to-green-400 p-4 rounded-3xl my-2 w-72 md:w-96 md:h-105 lg:w-100 shadow-xl">
      {/* <img src={recipe.image} alt={recipe.title} /> */}
      <div className="h-20 flex items-center justify-center">
        <h3 className="text-center text-2xl line-clamp-2">{title}</h3>
      </div>
      <img src={image} className="w-72 my-4 rounded-4xl aspect-auto"></img>
      <Link
        to={`/recipe/${encodeURIComponent(title)}`}
        className="border-1 px-6 py-3 rounded-full shadow-md bg-green-300 w-full text-center"
      >
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;
