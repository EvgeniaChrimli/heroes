import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HeroFormData } from "../../pages/CreateHero/createHeroTypes";

interface CresteHeroState {
  customHeroes: HeroFormData[];
}
const initialState: CresteHeroState = {
  customHeroes: [],
};

const createHeroSlice = createSlice({
  name: "createHero",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<HeroFormData>) {
      state.customHeroes.push(action.payload);
    },
  },
});

export const { addCard } = createHeroSlice.actions;
export default createHeroSlice.reducer;
