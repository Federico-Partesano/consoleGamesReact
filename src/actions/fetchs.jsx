import axios from "axios";
import { setPokemonsAction } from "../reducer/setPokemonSlice";
import { updateSelectedPokemon } from "../reducer/selectedPokemonSlice";

const url = "https://pokeapi.co/api/v2/";

export const fetchPokemons = (limit) => {
  console.log("response");
  return async function (dispatch, getState) {
    const response = await axios.get(`${url}pokemon?limit=${limit}&offset=0`);
    dispatch(setPokemonsAction(response.data.results));
    //dispatch(actions.SETPOKEMONS(response.data.results));
  };
};

export const fetchSelectedPokemon = (index) => {
  return async function (dispatch, getState) {
    const response = await axios.get(url + "pokemon/" + index);

    dispatch(updateSelectedPokemon(response.data));
  };
};
