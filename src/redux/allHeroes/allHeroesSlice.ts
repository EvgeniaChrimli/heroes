import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllHero } from "../../components/Heroes/heroThunk";
import { Hero } from "../../components/Heroes/heroTypes";

interface HeroState {
  heroes: Hero[];
  loading: boolean;
  error: string | null;
}

const initialState: HeroState = {
  heroes: [],
  loading: false,
  error: null,
};

const allHeroesSlice = createSlice({
  name: "allHero",
  initialState,
  reducers: {
    setHeroes(state, action: PayloadAction<Hero[]>) {
      state.heroes = action.payload;
    },
    removeHero(state, action: PayloadAction<number>) {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllHero.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllHero.fulfilled,
        (state, action: PayloadAction<Hero[]>) => {
          state.loading = false;
          state.heroes = action.payload;
        }
      )
      .addCase(fetchAllHero.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export const { setHeroes, removeHero } = allHeroesSlice.actions;

export default allHeroesSlice.reducer;
