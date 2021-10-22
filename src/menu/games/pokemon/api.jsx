import axios from "axios";
const url = "https://pokeapi.co/api/v2/";
let limit = 10;
const Api = ({ setPokemon }) => {
  function getPokemonByLimitApi() {
    return new Promise((resolve) => {
      axios.get(url + "pokemon?limit=" + limit + "&offset=0").then((res) => {
        resolve(res.data.results);
      });
    });
  }

  async function asyncCallgetPokemonByLimitApi() {
    console.log("calling");
    const result = await getPokemonByLimitApi();
    setPokemon(result);
  }
};

export default Api;
