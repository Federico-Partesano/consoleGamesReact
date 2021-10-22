import { createReducer } from "@reduxjs/toolkit";
import actions from "../actions/actions";


export const reducerPokemon = createReducer([1], (builder) => {
  builder.addCase(actions.SETPOKEMONS, (state, action) => {
    return (state = action.payload);
  });

  // NOTAZIONE AD Map Object, sintassi piu' corta ma puo' essere utlizzata solo in javascript, in typescript no, oltre a cio' molti IDE non ne supportano bene l'integrazione
  // quindi e' fortemente consogliata la notazione sopra, cioe' a builder callback
  // const counterReducer = createReducer(0, {
  //   increment: (state, action) => state + action.payload,
  //   decrement: (state, action) => state - action.payload
  // })

  //   addMatcher Ti consente di confrontare le tue azioni in entrata con la tua funzione di filtro invece che solo con la action.typeproprietà.

  // Se più riduttori di matcher corrispondono, tutti verranno eseguiti nell'ordine in cui sono
  // stati definiti, anche se un riduttore di case corrisponde già. Tutte le chiamate a builder.addMatcherdevono
  // venire dopo ogni chiamata a builder.addCasee prima di ogni chiamata a builder.addDefaultCase.

  // builder.addDefaultCase per il caso di default
});

export default reducerPokemon;
