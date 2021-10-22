import reducerPokemon from "./setPokemon";
import selectedPokemon from "./selectedpokemon";
import { combineReducers } from "redux";
import reducerPokemonSprites from "./spritesPokemon";
import setPokemonsReducer from "./setPokemonSlice";
import selectedPokemonSliceReducer from "./selectedPokemonSlice";

// accetta un oggetto con coppia chiave valore, però esiste una abbreviazione, mettendo solo la funzione, la chiave automaticamente è il nome della
// funzione
// E' come se scrivessi
// const rootReducer = combineReducers({
//     cunter: reducerCounter,
//     logged: loginReducer,
//   });

const rootReducer = combineReducers({
  // loginReducer,
  reducerPokemon,
  reducerPokemonSprites,
  selectedPokemon,
  setPokemonsReducer,
  selectedPokemonSliceReducer,
});

export default rootReducer;
