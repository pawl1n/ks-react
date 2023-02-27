import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  cartReducer,
});

export default configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
