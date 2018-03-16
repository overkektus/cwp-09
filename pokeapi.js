const axios = require('axios');

// Get data about pokemon with id 42

axios.get('http://pokeapi.co/api/v2/pokemon/42')
  .then(res => {
    console.log(`PokeName: ${res.data.name}, weight: ${res.data.weight}, height: ${res.data.height}`);
  })
  .catch(error => {
    console.error(error.message);
  });

// Get data about 30 pokemon

const promises = [];

for(let i = 0; i < 3; i++) {
  promises.push(axios.get(`http://pokeapi.co/api/v2/pokemon/?limit=10&offset=${i*10}`));
}

Promise.all(promises)
  .then(res => {
    for(let i = 0; i < promises.length; i++) {
      console.log(`---------Promise[${i}]---------`);
      res[i].data.results.forEach(element => {
        console.log(element.name);
      });
    }
  })
  .catch(error => {
    console.error('Error in fetch 30 pokemon' + error.message);
  })

