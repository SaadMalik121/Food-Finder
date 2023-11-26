import React, { useEffect, useState } from "react";
import MealDetailComp from "../components/Meal_Detail/MealDetailComp";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMeal } from "../store/mealSlice";

function MealDetail() {
  const { mealId } = useParams();
  const dispatch = useDispatch();
  const [mealItem, setMealItem] = useState();
  const mealList = useSelector((state) => state.mealStore.mealList);

  console.log(mealList);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);
  useEffect(() => {
    const data = mealList.find((meal) => meal.id === mealId);
    console.log(data);
    setMealItem(data);
  }, [mealList, mealId]);
  return (
    <div>
      <MealDetailComp item={mealItem} mealId={mealId} />
    </div>
  );
}

export default MealDetail;
