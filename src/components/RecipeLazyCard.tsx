import { useEffect, useRef, useState } from "react";
import "../index.css";
import RecipeCard from "./RecipeCard";

interface recipe {
  title: string;
  image: string;
  extendedIngredients: [{}];
}

function RecipeLazyCard({ title, image, extendedIngredients }: recipe) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ minHeight: 300 }}>
      {isVisible ? (
        <RecipeCard
          title={title}
          image={image}
          extendedIngredients={extendedIngredients}
        />
      ) : null}
    </div>
  );
}

export default RecipeLazyCard;
