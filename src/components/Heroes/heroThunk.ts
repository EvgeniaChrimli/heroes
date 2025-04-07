import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllHero = createAsyncThunk("heroes/fetchHeroes", async () => {
  const response = await fetch("https://api.opendota.com/api/heroStats");
  const data = await response.json();
  return data;
});
