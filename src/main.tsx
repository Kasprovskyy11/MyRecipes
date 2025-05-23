import { StrictMode, useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { RecipeContext } from "./context/RecipeContext";

// 👇 Import kontekstu
// Create router
const router = createRouter({ routeTree });

// Register router type
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Tworzymy prosty wrapper z kontekstem
function AppWithContext() {
  const [recipes, setRecipes] = useState([]);
  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      <RouterProvider router={router} />
    </RecipeContext.Provider>
  );
}

// Render app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AppWithContext />
    </StrictMode>
  );
}
