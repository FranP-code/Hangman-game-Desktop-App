import { firestore } from '../../../../../../Firebase/Firebase_Config';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const BringTheWordsFromFirebase = async (language, category) => {

    try {
        
        const db = getFirestore(firestore)
        const data = await collection(db, `hangman_words/${language}/${category}`)
        const result = await getDocs(data)

        const words = result.docs.map(doc => doc.id)

        return await words
    } catch (error) {
    }
}

export default BringTheWordsFromFirebase
