import "../index.css";
import { Link } from "@tanstack/react-router";
interface recipe {
  title: string;
  image: string;
  extendedIngredients: [{}];
}

function RecipeCard({ title, image, extendedIngredients }: recipe) {
  return (
    <div className="flex flex-col items-center bg-green-100 p-6 rounded-3xl my-6 w-72 md:w-96 md:h-105 lg:w-100">
      {/* <img src={recipe.image} alt={recipe.title} /> */}
      <div className="h-20 flex items-center justify-center">
        <h3 className="text-center text-xl">{title}</h3>
      </div>
      <img src={image} className="w-72 my-4 rounded-4xl"></img>
      <Link
        to={`/recipe/${encodeURIComponent(title)}`}
        className="border-1 px-6 py-2 rounded-full"
      >
        View Recipe
      </Link>
    </div>
  );
}

export default RecipeCard;
