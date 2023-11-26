import React, { useEffect, useState } from "react";
import "./EditMeal.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editMeal, getMeal } from "../store/mealSlice";
function EditForm({ item }) {
  const navigation = useNavigate();
  const [mealItem, setMealItem] = useState();
  const [errors, setErrors] = useState();
  const { mealId } = useParams();
  const dispatch = useDispatch();
  const mealList = useSelector((state) => state.mealStore.mealList);
  useEffect(() => {
    console.log(mealList);
    const data = mealList.find((meal) => meal.id === mealId);
    setMealItem(data);
    setFormData({
      contact: mealItem?.contact,
      description: mealItem?.description,
      imageUrl: mealItem?.imageUrl,
      title: mealItem?.title,
      category: mealItem?.category,
      ingredients: mealItem?.ingredients,
    });
  }, [mealList, mealId, mealItem]);

  useEffect(() => {
    dispatch(getMeal());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    contact: "",
    description: "",
    imageUrl: "",
    title: "",
    category: "",
    ingredients: "",
  });

  const hasError = (specificFieldName) => {
    const newErrors = {};
    let hasErrors = false;

    if (!specificFieldName) {
      for (const field in formData) {
        if (formData[field]?.trim() === "") {
          newErrors[field] = `This ${field} field is required`;
          hasErrors = true;
        } else {
          newErrors[field] = "";
        }
      }
      if (hasErrors) {
        setErrors(newErrors);
        return true;
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Validation
    if (!hasError()) {
      try {
        dispatch(editMeal({ mealId, updatedData: formData }));
        setErrors({});
        navigation("/");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  return (
    <div className="add_container">
      <h1>
        Edit<span className="meal">Meal</span>
      </h1>
      <p>Edit your meal to update the data of meal</p>
      <form method="post" className="add-form" onSubmit={handleUpdate}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Enter meal title"
            id="title"
            name="title"
            value={formData?.title || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          {errors?.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            placeholder="Enter meal description"
            id="description"
            name="description"
            value={formData?.description || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          {errors?.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="categories">Categories</label>
          <select
            name="categories"
            id="categories"
            value={formData?.category || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
          >
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Veg">Non-Veg</option>
            <option value="Fast Food">Fast Food</option>
            <option value="Desi">Desi</option>
          </select>
          {errors?.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="ingredients">Ingredients</label>
          <input
            placeholder="Enter meal ingredients"
            id="ingredients"
            name="ingredients"
            value={formData?.ingredients || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ingredients: e.target.value }))
            }
          />
          {errors?.ingredients && (
            <span className="error">{errors.ingredients}</span>
          )}
        </div>

        <div className="form-control">
          <label htmlFor="contact">Contact</label>
          <input
            placeholder="Enter your contact"
            id="contact"
            name="contact"
            value={formData?.contact || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contact: e.target.value }))
            }
          />
          {errors?.contact && <span className="error">{errors.contact}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="image_url">Image URL</label>
          <input
            placeholder="Enter your image_url"
            id="image_url"
            name="image_url"
            value={formData?.imageUrl || ""}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
          />
          {errors?.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </div>

        <button className="add-btn">Edit Meal</button>
      </form>
    </div>
  );
}

export default EditForm;
