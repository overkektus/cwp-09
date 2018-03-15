const axios = require('axios');

// Get data about pokemon with id 42

axios.get('http://pokeapi.co/api/v2/pokemon/42')
  .then(res => {
    console.log(`PokeName: ${res.data.name}, weight: ${res.data.weight}, height: ${res.data.height}`);
  })
  .catch(error => {
    console.error(error.message);
  });