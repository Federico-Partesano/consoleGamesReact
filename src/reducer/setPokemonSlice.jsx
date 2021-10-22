import { createSlice } from "@reduxjs/toolkit";

const setPokemonsReducer = createSlice({
  name: "SETPOKEMON",
  initialState: [1],
  reducers: {
    setPokemonsAction: (state, action) => (state = action.payload),
  },
});

export const { setPokemonsAction } = setPokemonsReducer.actions;
export default setPokemonsReducer.reducer;
