import { createSlice } from "@reduxjs/toolkit";

const selectedPokemonSliceReducer = createSlice({
  name: "SETPOKEMON",
  initialState: {
    name: "",
    height: "",
    width: "",
    abilities: [],
    id: 0,
  },
  reducers: {
    updateSelectedPokemon: (state, action) => (state = action.payload),
  },
});

export const { updateSelectedPokemon } = selectedPokemonSliceReducer.actions;
export default selectedPokemonSliceReducer.reducer;
