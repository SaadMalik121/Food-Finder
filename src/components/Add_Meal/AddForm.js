import React, { useState } from "react";
import "./AddForm.css";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
function AddForm() {
  const [formData, setFormData] = useState({
    contact: "",
    description: "",
    imageUrl: "",
    title: "",
    category: "",
    ingredients: "",
  });

  const [errors, setErrors] = useState();

  const navigation = useNavigate();

  const hasError = (specificFieldName) => {
    const newErrors = {};
    let hasErrors = false;

    if (!specificFieldName) {
      for (const field in formData) {
        if (formData[field].trim() === "") {
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
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Validation
    if (!hasError()) {
      try {
        const docRef = await addDoc(collection(db, "FoodFinder"), {
          ...formData,
        });
        console.log("Document written with ID: ", docRef.id);
        console.log(formData);
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
        Add<span className="meal">Meal</span>
      </h1>
      <p>Add your meal to the account which will avilable to everyone</p>
      <form method="post" className="add-form" onSubmit={formSubmitHandler}>
        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Enter meal title"
            id="title"
            name="title"
            value={formData?.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            onBlur={() => hasError("title")}
          />
          {errors?.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="description">Description</label>
          <input
            placeholder="Enter meal description"
            id="description"
            name="description"
            value={formData?.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            onBlur={() => hasError("description")}
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
            value={formData?.category}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, category: e.target.value }))
            }
            onBlur={() => hasError("category")}
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
            value={formData?.ingredients}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, ingredients: e.target.value }))
            }
            onBlur={() => hasError("ingredients")}
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
            value={formData?.contact}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, contact: e.target.value }))
            }
            onBlur={() => hasError("contact")}
          />
          {errors?.contact && <span className="error">{errors.contact}</span>}
        </div>

        <div className="form-control">
          <label htmlFor="image_url">Image URL</label>
          <input
            placeholder="Enter your image_url"
            id="image_url"
            name="image_url"
            value={formData?.imageUrl}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
            }
            onBlur={() => hasError("image_url")}
          />
          {errors?.imageUrl && <span className="error">{errors.imageUrl}</span>}
        </div>

        <button className="add-btn">Add Meal</button>
      </form>
    </div>
  );
}

export default AddForm;
