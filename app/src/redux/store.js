import { configureStore } from "@reduxjs/toolkit";
import { ENVIRONMENT } from "../config";
import reducers from "./reducers";

export const store = configureStore({
  reducer: reducers,
  devTools: ENVIRONMENT === "development" ? true : false,
});
