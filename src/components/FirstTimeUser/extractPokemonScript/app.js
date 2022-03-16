const data = require('./pokedex.json')

const pokemons = []

for (let i = 0; i < /*151*/ 15; i++) {

    console.log(`"${data[i].name.english}",`)
    // pokemons.push(`"${data[i].name.english}"`)
}

// console.dir(pokemons, {'maxArrayLength': null})


//dataset credits https://github.com/fanzeyi/pokemon.json