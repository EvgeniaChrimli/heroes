import { configureStore } from "@reduxjs/toolkit";
import allHeroesReducer from "./allHeroes/allHeroesSlice";
import createHeroReducer from "./createHero/createHeroSlice";

export const store = configureStore({
  reducer: {
    allHeroesSlice: allHeroesReducer,
    createHeroSlice: createHeroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
