import React, { useEffect } from "react";
import FoodItem from "../components/FoodItem";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../store/mealSlice";

function HomePage() {
  // const [mealItems, setMealItems] = useState([]);
  const mealItems = useSelector((state) => state.mealStore.mealList);
  console.log(mealItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "5px",
        }}
      >
        {mealItems.length === 0 && <h2>No meal found.</h2>}
        {mealItems.map((item) => {
          return <FoodItem key={item.id} item={item} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
