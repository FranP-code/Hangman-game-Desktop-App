import {firestore} from '../Firebase/Firebase_Config'
import { getFirestore, collection, doc, getDocs, getDoc } from 'firebase/firestore/lite';
import GetRandomCategory from './GetRandomCategory';
import SelectRandomWord from './SelectRandomWord';

const BringTheWords = async (language = 'english', category = false, selectedWord) => {

    if (!selectedWord) {

        if (!category || category === 'false') {

            category = await GetRandomCategory(language)
        }
        
        try {

            const db = getFirestore(firestore)
            const data = collection(db, `hangman_words/${language}/${category}`)
            const result = await getDocs(data)

            const words = await result.docs.map(doc => doc.id)
            
            const word = await SelectRandomWord(words)

            return await word

        } catch (error) {
        }
    }
}

export default BringTheWords
