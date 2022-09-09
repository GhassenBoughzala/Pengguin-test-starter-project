import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme.slice";
import tvshows from "./tv-shows/tvReducer"

const rootReducer = combineReducers({
  theme: themeReducer,
  tvshows
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
