import axios from "axios";
import actions from "./actions";
import { Spinner } from "react-bootstrap";
const url = "https://pokeapi.co/api/v2/";

export const fetchPokemons = (limit) => {
  console.log("response");
  return async function (dispatch, getState) {
    //  dispatch({ type: actions.SETPOKEMONS, value: [{ name: "ciao" }] });
    const response = await axios.get(`${url}pokemon?limit=${limit}&offset=0`);

    // dispatch({ type: actions.SETPOKEMONS.type, payload: response.data.results });
    // Dentro le parentesi tonde si definisce il
    dispatch(actions.SETPOKEMONS(response.data.results));
  };
};

export const fetchSelectedPokemon = (index) => {
  return async function (dispatch, getState) {
    //  dispatch({ type: actions.SETPOKEMONS, payload: [{ name: "ciao" }] });
    const response = await axios.get(url + "pokemon/" + index);

    //dispatch({ type: actions.SELECTEDPOKEMONS, payload: response.data });
    dispatch(actions.SELECTEDPOKEMON(response.data));
  };
};

//   const response = await axios.get(`${url}pokemon?limit=${limit}&offset=0`);
//   console.log();
//   return response;
// };
