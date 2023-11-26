import { configureStore } from "@reduxjs/toolkit";
import mealSlice from "./mealSlice";

const store = configureStore({
  reducer: {
    mealStore: mealSlice,
  },
});

export default store;
