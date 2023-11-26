import React from "react";
import "./FoodItem.css";
import { NavLink } from "react-router-dom";

function FoodItem({ item }) {
  console.log(item);
  const DUMMYIMG =
    "https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTB8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=600&q=60";
  return (
    <NavLink to={`meal-detail/${item.id}`}>
      <div className="food_container">
        <img
          src={item?.imageUrl ? item.imageUrl : DUMMYIMG}
          alt="food_image"
          className="food_image"
        />
        <div className="underline"></div>
        <div className="food_information">
          <h2>{item.title}</h2>
          <p>{item.category}</p>
        </div>
      </div>
    </NavLink>
  );
}

export default FoodItem;
