import React from "react";
import "./MealDetailComp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteMeal } from "../../store/mealSlice";
function MealDetailComp({ item, mealId }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handleDelete = () => {
    let text = "Press a button!\nEither OK or Cancel.";
    if (window.confirm(text) === true) {
      text = "You pressed OK!";
      dispatch(deleteMeal(mealId));
      navigation("/");
    } else {
      text = "You canceled!";
    }
  };
  return (
    <div className="details-component">
      <div className="details">
        <img src={item?.imageUrl} alt="meal_img" className="meal-img" />

        <div className="meal-info">
          <h1>{item?.title}</h1>

          <div className="info-row">
            <h4>Category</h4>
            <p>{item?.category}</p>
          </div>

          <div className="info-row">
            <h4>Description</h4>
            <p>{item?.description}</p>
          </div>
          <div className="info-row">
            <h4>Ingredients</h4>
            <p>{item?.ingredients}</p>
          </div>
        </div>
      </div>

      <div className="btn-containers">
        <Link to={`/edit-meal/${mealId}`}>
          <button className="btn btn-edit">Edit Meal</button>
        </Link>
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete Meal
        </button>
      </div>
    </div>
  );
}

export default MealDetailComp;
