import { firestore } from "../../Firebase/Firebase_Config";
import {getFirestore, collection, doc, setDoc } from "firebase/firestore/lite";

const AddPokemonToFirebaseQuery = async (language, pokemon) => {
    
        console.log(pokemon)
        console.log(language)
    try {
        const db = await getFirestore(firestore)
        const result = await setDoc(doc(db,  `hangman_words/${language}/pokemons`, pokemon.name), {

            'WORD_FIELD': 'WORD_VALUE'
        })
        
        return true

    } catch (error) {

        console.log(error)

        return 'error'
    }
};


export default AddPokemonToFirebaseQuery
