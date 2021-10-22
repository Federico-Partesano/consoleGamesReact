import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/actions";

export const selectedPokemon = createReducer(
  {
    name: "",
    height: "",
    width: "",
    abilities: [],
    id: 0,
  },
  (builder) => {
    builder.addCase(actions.SELECTEDPOKEMON, (state, action) => {
      return (state = action.payload);
    });
  }
);

export default selectedPokemon;
