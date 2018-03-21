const Promise = require('bluebird');
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

// pokemon with id = [1, 4, 7]

Promise.any([
  axios.get('http://pokeapi.co/api/v2/pokemon/1'),
  axios.get('http://pokeapi.co/api/v2/pokemon/4'),
  axios.get('http://pokeapi.co/api/v2/pokemon/7')
])
  .then((result) => {
    console.log(`first is: ${result.data.name}`);
  })
  .catch((err) => {
    console.log('error in any')
    console.error(err);
  })

  //10 pokemons, items and locations

Promise.props({
    pokemons: axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=10`),
    items: axios.get(`https://pokeapi.co/api/v2/item/?limit=10`),
    locations: axios.get(`https://pokeapi.co/api/v2/location/?limit=10`)
  })
  .then((result) => {
    console.log("POKEMONS");
    result["pokemons"].data.results.forEach((val) => {
      console.log(val.name);
    });
    console.log("ITEMS");
    result["items"].data.results.forEach((val) => {
      console.log(val.name);
    });
    console.log("LOCATIONS");
    result["locations"].data.results.forEach((val) => {
      console.log(val.name);
    });
  })
  .catch((err) => {
    console.log('error in pokemons/items/locations')
    console.error(err);
})

//get 4 berries

Promise.map([1, 2, 3, 4], (i) => {
    return axios.get(`http://pokeapi.co/api/v2/pokemon/${i}`)
  })
  .then((result) => {
    result.forEach((val) => {
      console.log(val.data.name);
    })
  })
  .catch((err) => {
    console.log('error in berries');
    console.error(err);
  })
