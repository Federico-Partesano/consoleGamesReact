const reducerPokemonSprites = (state = [], action) => {
  switch (action.type) {
    case "SETPOKEMONSPRITES":
      return action.value;
    default:
      return state;
  }
};

export default reducerPokemonSprites;
