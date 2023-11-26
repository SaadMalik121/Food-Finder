import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddMeal from "../pages/AddMeal";
import EditMeal from "../pages/EditMeal";
import MealDetail from "../pages/MealDetail";
import NotFound from "../pages/NotFound";
import Navbar from "../components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/add-meal", element: <AddMeal /> },
      { path: "/edit-meal/:mealId", element: <EditMeal /> },
      { path: "/meal-detail/:mealId", element: <MealDetail /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
