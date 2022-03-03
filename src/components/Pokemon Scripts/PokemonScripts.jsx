import React from 'react'
import AddPokemonToFirebaseQuery from './AddPokemonToFirebaseQuery'

const PokemonScripts = () => {

    const addPokemonsToFirebase = async () => {

        try {
            
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
            const pokemons = await response.json()
    
            console.log(pokemons)

                const uploadWordsPromise = new Promise((resolve, reject) => {
            
                pokemons.results.forEach(async (pokemon, index) => {
                                        
                    await AddPokemonToFirebaseQuery('spanish', pokemon)

                    if (index === pokemons.results.length -1) resolve();
            })
        })
            
            await uploadWordsPromise.then(() => {})
    
            // await pokemons.results.forEach(async (pokemon) => {
            //     console.log(pokemon.name)
    
            //     await AddPokemonToFirebaseQuery('english', pokemon)
            // });
    
            console.log(pokemons.results.length)
    
        } catch (error) {
            
        }
    }
    

    React.useEffect(() => {

        addPokemonsToFirebase()

    },[])

    return (
        <div>
            
        </div>
    )
}

export default PokemonScripts
