// This File for global store redux

import { configureStore } from "@reduxjs/toolkit";
import whistlistReducer from "./features/whistlist.slice.js";

export const store = configureStore({
  reducer: { whistlistReducer },
});
