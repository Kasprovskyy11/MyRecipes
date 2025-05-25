import { useState } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function RootComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="hidden md:grid grid-cols-5 items-center h-20 bg-green-400 sticky top-0 z-10">
        <div className="flex justify-center">
          <Link to="/">Home Page</Link>
        </div>
        <div className="flex justify-center"> </div>
        <div className="flex justify-center text-3xl font-bold">
          My<span className="text-white">Recipes</span>
        </div>
      </div>
      <hr />

      <div
        className={`grid md:hidden grid-cols-5 items-center px-4 bg-green-400 h-20 sticky top-0 z-10 ${isMenuOpen ? "" : "rounded-b-xl"} `}
      >
        <FontAwesomeIcon
          icon={faBars}
          onClick={toggleMenu}
          className="text-3xl cursor-pointer"
        />
        <div></div>
        <div className="flex justify-center items-center">
          <h1 className="text-3xl font-bold">
            My<span className="text-white">Recipes</span>
          </h1>
        </div>
      </div>
      <div
        className={`md:hidden bg-green-400 p-4 flex flex-col justify-center items-center sticky top-18 z-10 text-xl transition-all duration-300 rounded-b-4xl ${isMenuOpen ? "max-h-40 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}`}
      >
        {isMenuOpen ? (
          <>
            <Link to="/" className="block py-2">
              Home
            </Link>
            <Link to="/about" className="block py-2">
              About
            </Link>
          </>
        ) : null}
        <hr />
      </div>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
