import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

const mealSlice = createSlice({
  name: "mealSlice",
  initialState: {
    formData: [],
    mealList: [],
    specificMeal: null,
  },
  reducers: {
    specificMealFinder(state, action) {
      [state.specificMeal] = state.mealList.filter(
        (meal) => meal.id === action.payload
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(addMeal.fulfilled, (state, action) => {
      console.log(action.payload);
      state.mealList.push(action.payload);
    });
    builder.addCase(getMeal.fulfilled, (state, action) => {
      state.mealList = action.payload;
    });

    builder.addCase(getMealById.fulfilled, (state, action) => {
      console.log(action.payload);
      state.specificMeal = action.payload;
    });

    builder.addCase(editMeal.fulfilled, (state, action) => {
      // Update the meal item in your state
      const { mealId, updatedData } = action.payload;
      const mealIndex = state.mealList.findIndex((meal) => meal.id === mealId);
      if (mealIndex !== -1) {
        state.mealList[mealIndex] = {
          ...state.mealList[mealIndex],
          ...updatedData,
        };
      }
    });

    builder.addCase(deleteMeal.fulfilled, (state, action) => {
      state.mealList = state.mealList.filter(
        (meal) => meal.id !== action.payload
      );
    });
  },
});

const addMeal = createAsyncThunk("mealSlice/addMeal", async () => {});
const getMeal = createAsyncThunk("mealSlice/gwtMeal", async () => {
  const querySnapshot = await getDocs(collection(db, "FoodFinder"));
  const items = [];
  querySnapshot.forEach((doc) => {
    items.push({ id: doc.id, ...doc.data() });
  });
  return items;
});
const getMealById = createAsyncThunk(
  "mealSlice/getMealById",
  async (mealId) => {
    const docRef = doc(db, "FoodFinder", mealId);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        return data;
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return null;
    }
  }
);

const editMeal = createAsyncThunk(
  "mealSlice/editMeal",
  async ({ mealId, updatedData }) => {
    const docRef = doc(db, "FoodFinder", mealId);
    try {
      await updateDoc(docRef, updatedData);
      return { mealId, updatedData };
    } catch (error) {
      console.error("Error updating document:", error);
      throw error;
    }
  }
);

const deleteMeal = createAsyncThunk("mealSlice/deleteMeal", async (mealId) => {
  const mealDocRef = doc(db, "FoodFinder", mealId); // 'FoodFinder' is the collection name
  try {
    await deleteDoc(mealDocRef);
    return mealId; // Return the deleted mealId
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
});

export { addMeal, getMeal, getMealById, editMeal, deleteMeal };
export const { specificMealFinder } = mealSlice.actions;
export default mealSlice.reducer;
